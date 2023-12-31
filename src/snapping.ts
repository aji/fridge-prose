export type SnapResult = {
  result: number;
  distance?: number;
  reference?: number;
};

export function gridSnap(
  pos: number,
  size: number,
  grid: number,
  margin: number
): SnapResult | undefined {
  const x0 = pos;
  const x1 = pos + size;

  const rx0 = Math.round(x0 / grid) * grid;
  const rx1 = Math.round(x1 / grid) * grid;

  if (Math.abs(x0 - rx0) <= margin)
    return { result: rx0, distance: Math.abs(x0 - rx0), reference: rx0 };
  if (Math.abs(x1 - rx1) <= margin)
    return { result: rx1 - size, distance: Math.abs(x1 - rx1), reference: rx1 };

  return { result: x0 };
}

export function combineSnaps(
  pos: number,
  ...snaps: (SnapResult | undefined)[]
): SnapResult {
  let winner: SnapResult | undefined = undefined;

  for (const snap of snaps) {
    if (
      snap !== undefined &&
      snap.distance !== undefined &&
      (winner === undefined ||
        winner.distance === undefined ||
        snap.distance < winner.distance)
    ) {
      winner = snap;
    }
  }

  return winner ?? { result: pos };
}
