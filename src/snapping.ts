export type SnapResult = {
  result: number;
  distance?: number;
  reference?: number;
};

function snapIf(
  pos: number,
  moving: number,
  ref: number,
  margin: number
): SnapResult | undefined {
  const dist = ref - moving;
  return Math.abs(dist) < margin
    ? { result: pos + dist, distance: Math.abs(dist), reference: ref }
    : undefined;
}

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

  return combineSnapsMaybe(
    snapIf(x0, x0, rx0, margin),
    snapIf(x0, x1, rx1, margin)
  );
}

export function segmentSnap(
  pos: number,
  size: number,
  snapPos: number,
  snapSize: number,
  margin: number
): SnapResult | undefined {
  const x0 = pos;
  const x1 = pos + size;
  const a0 = snapPos;
  const a1 = snapPos + snapSize;

  return combineSnapsMaybe(
    snapIf(x0, x0, a0, margin),
    snapIf(x0, x1, a0, margin),
    snapIf(x0, x0, a1, margin),
    snapIf(x0, x1, a1, margin)
  );
}

export function combineSnapsMaybe(
  ...snaps: (SnapResult | undefined)[]
): SnapResult | undefined {
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

  return winner;
}

export function combineSnaps(
  pos: number,
  ...snaps: (SnapResult | undefined)[]
): SnapResult {
  return combineSnapsMaybe(...snaps) ?? { result: pos };
}
