export class AssertionError extends Error {}

export function assert(
  cond: boolean,
  msg: string = 'assertion failed'
): asserts cond {
  if (!cond) {
    throw new AssertionError(msg);
  }
}

export function expected<T>(
  value: T | undefined | null,
  msg: string = 'expected a defined value'
): T {
  assert(value !== undefined && value !== null, msg);
  return value;
}
