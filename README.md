# React numeric component

Wraps native input using `Proxy` exposed with `useImperativeHandle`

## Build

`npm i && npm run build`

## Preview

`npm run storybook`

## Sample usage

```
import clsx from 'clsx';
import * as React from 'react';
import { FieldError, FieldValues, get, Path, UseFormReturn } from 'react-hook-form';
import { NumericInput } from '~/components';

export type SmartInputProps<T extends FieldValues = FieldValues> = UseFormReturn<T> & {
  path: Path<T>;
  label?: string;
};

export type NumericSmartInputProps<T extends FieldValues = FieldValues> = SmartInputProps<T> & {
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
          'block w-56 rounded-sm bg-gray-700 outline-none focus:bg-gray-900',
          error && 'border-red-400'
        )}
      />
      <p className="h-4 w-56 text-sm italic text-red-400">{error?.message}</p>
    </div>
  );
};

```
