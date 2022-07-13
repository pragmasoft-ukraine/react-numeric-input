export class AssertionError extends Error {
  constructor(msg = 'Assertion failed') {
    super(msg);
  }
}

export function assert(condition: boolean, msg?: string): asserts condition {
  if (!condition) {
    throw new AssertionError(msg);
  }
}

export function assertIsDefined<T>(val: T, name = 'variable'): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new AssertionError(`Expected  ${name} to be defined, but received ${val}`);
  }
}
