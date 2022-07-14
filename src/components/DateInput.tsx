import * as React from "react";
import { assert } from "../utils";

export const htmlDateFormat = (date: Date = new Date()) =>
  date.toISOString().split("T")[0];

type HTMLInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type DateInputProps = Omit<HTMLInputProps, "type" | "inputMode">;

const EXPECTED_REF_MSG = "ref.current is expected";

export const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  (props, forwardedRef) => {
    const ref = React.useRef<HTMLInputElement>(null);

    const proxyHandler: ProxyHandler<HTMLInputElement> = React.useMemo(
      () => ({
        get(target, p) {
          return target[p as keyof HTMLInputElement];
        },
        set(target, p, val) {
          if (p === "value" && val instanceof Date) {
            target.valueAsDate = val;
          } else {
            (target as Record<typeof p, typeof val>)[p] = val;
          }
          return true;
        },
      }),
      []
    );

    React.useImperativeHandle(
      forwardedRef,
      () => {
        assert(!!ref.current, EXPECTED_REF_MSG);
        return new Proxy(ref.current, proxyHandler);
      },
      [proxyHandler]
    );

    return <input type="date" {...props} ref={ref} />;
  }
);
DateInput.displayName = "DateInput";
