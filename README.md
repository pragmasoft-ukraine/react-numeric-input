# React numeric input component

Designed to work seamlessly with [react-hook-form](https://react-hook-form.com/)

Wraps native input using `Proxy` exposed with `useImperativeHandle`

Unstyled, like the native html input. Add `className='no-spinner'` to suppress native numeric input spinner controls

# React date input component

Also wraps native date input, allowing to set component's value with the `Date` in addition to the 'yyyy-mm-dd' formatted string, like `input.valueAsDate = new Date()` does. This allows hook form binding to models containing date values.

## Install

`npm install @pragmasoft-ukraine/react-numeric-input`

## Build

`npm i && npm run build`

## Preview

`npm run storybook`

## Publish

`npm publish`

## Sample usage

```tsx
import clsx from "clsx";
import * as React from "react";
import {
  FieldError,
  FieldValues,
  get,
  Path,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { NumericInput } from "@pragmasoft-ukraine/react-numeric-input";

export type SmartInputProps<T extends FieldValues = FieldValues> =
  UseFormReturn<T> & {
    path: Path<T>;
    label?: string;
  };

export type NumericSmartInputProps<T extends FieldValues = FieldValues> =
  SmartInputProps<T> & {
    placeholder?: string;
    formatOptions?: Intl.NumberFormatOptions;
  };

export const NumericSmartInput = <T extends FieldValues = FieldValues>({
  register,
  path,
  label,
  placeholder,
  formatOptions,
  formState: { errors },
}: NumericSmartInputProps<T>) => {
  const error = get(errors, path) as FieldError | undefined;
  return (
    <div>
      {label && <label htmlFor={path}>{label}</label>}
      <NumericInput
        id={path}
        aria-label={label || path}
        {...register(path, { valueAsNumber: true })}
        placeholder={placeholder}
        formatOptions={formatOptions}
        className={clsx(
          "block w-56 rounded-sm bg-gray-700 outline-none focus:bg-gray-900",
          error && "border-red-400"
        )}
      />
      <p className="h-4 w-56 text-sm italic text-red-400">{error?.message}</p>
    </div>
  );
};

const DEFAULT_VALUES = { myNumber: 100 };

export const SampleForm = () => {
  const form = useForm({
    mode: "onBlur",
    defaultValues: DEFAULT_VALUES,
  });
  const { handleSubmit } = form;

  const onSubmit = async (form: typeof DEFAULT_VALUES) => {
    console.log(JSON.stringify(form));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <NumericSmartInput {...form} path="myNumber" label="Enter number:" />
    </form>
  );
};
```
