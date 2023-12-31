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

export function para(text: string): HTMLParagraphElement {
  const p = document.createElement('p');
  p.innerText = text;
  return p;
}

export function overlap1(
  a0: number,
  a1: number,
  b0: number,
  b1: number
): boolean {
  return b0 <= a1 && a0 <= b1;
}

export function overlap(a: DOMRect, b: DOMRect): boolean {
  return (
    overlap1(a.x, a.x + a.width, b.x, b.x + b.width) &&
    overlap1(a.y, a.y + a.height, b.y, b.y + b.height)
  );
}
