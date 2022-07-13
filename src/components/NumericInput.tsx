import * as React from "react";
import { assert, assertIsDefined } from "../utils";
import "./NumericInput.css";

type HTMLInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type NumericInputProps = Omit<HTMLInputProps, "type" | "inputMode"> & {
  formatOptions?: Intl.NumberFormatOptions;
};

const ATTR = "raw";

const EXPECTED_REF_MSG = "ref.current is expected";

export const NumericInput = React.forwardRef<
  HTMLInputElement,
  NumericInputProps
>(({ formatOptions, ...props }, forwardedRef) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const locale = props.lang || navigator.language;

  const formatter = React.useMemo(() => {
    const fmt = new Intl.NumberFormat(locale, formatOptions);
    return (num: number) =>
      typeof num !== "number" || isNaN(num) ? "" : fmt.format(num);
  }, [locale, formatOptions]);

  const proxyHandler: ProxyHandler<HTMLInputElement> = React.useMemo(
    () => ({
      get: (target, p: keyof HTMLInputElement) => {
        if (p === "value" && target.type === "text") {
          const raw = target.dataset[ATTR];
          assertIsDefined(raw, "data-raw attribute");
          return raw;
        } else if (p === "type") {
          return "number";
        }
        return target[p];
      },

      set(target, p, val) {
        if (p === "value" && target.type === "text") {
          val = val.toString();
          target.dataset[ATTR] = val;
          val = Number.parseFloat(val);
          target.value = formatter(val);
        } else {
          (target as Record<typeof p, typeof val>)[p] = val;
        }
        return true;
      },
    }),
    [formatter]
  );

  React.useImperativeHandle(
    forwardedRef,
    () => {
      assert(!!ref.current, EXPECTED_REF_MSG);
      return new Proxy<HTMLInputElement>(ref.current, proxyHandler);
    },
    [proxyHandler]
  );

  const onBlur = React.useCallback(() => {
    assert(!!ref.current, EXPECTED_REF_MSG);
    if (ref.current.type === "number") {
      ref.current.type = "text";
      const raw = ref.current.value;
      ref.current.dataset[ATTR] = raw;
      const rawNumber = Number.parseFloat(raw);
      if (!isNaN(rawNumber)) {
        const formatted = formatter(rawNumber);
        ref.current.value = formatted;
        ref.current.setCustomValidity("");
      } else {
        ref.current.value = "";
        if (raw) {
          ref.current.setCustomValidity("Not a number");
        }
      }
    }
  }, [formatter, ref]);

  const onFocus = React.useCallback(() => {
    assert(!!ref.current, EXPECTED_REF_MSG);
    if (ref.current.type === "text") {
      const old = ref.current.dataset[ATTR] || "";
      delete ref.current.dataset[ATTR];
      ref.current.type = "number";
      ref.current.value = old;
    }
  }, [ref]);

  React.useLayoutEffect(() => {
    assert(!!ref.current, EXPECTED_REF_MSG);
    const current = ref.current;
    current.addEventListener("focus", onFocus);
    current.addEventListener("blur", onBlur);
    const isFocused = document.activeElement === ref.current;
    if (!isFocused) {
      onBlur();
    }
    return () => {
      current.removeEventListener("focus", onFocus);
      current.removeEventListener("blur", onBlur);
    };
  }, [onFocus, onBlur, ref]);

  return <input type="number" inputMode="numeric" {...props} ref={ref} />;
});
NumericInput.displayName = "NumericInput";
