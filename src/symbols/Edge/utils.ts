export interface PointCoords {
  x: number;
  y: number;
}

export interface CenterCoords {
  angle: number;
  x: number;
  y: number;
}

/**
 * Center helper.
 * Ref: https://github.com/wbkd/react-flow/blob/main/src/components/Edges/utils.ts#L18
 */
function getBezierCenter({
  sourceX,
  sourceY,
  targetX,
  targetY
}): [number, number, number, number] {
  const xOffset = Math.abs(targetX - sourceX) / 2;
  const centerX = targetX < sourceX ? targetX + xOffset : targetX - xOffset;

  const yOffset = Math.abs(targetY - sourceY) / 2;
  const centerY = targetY < sourceY ? targetY + yOffset : targetY - yOffset;

  return [centerX, centerY, xOffset, yOffset];
}

/**
 * Path helper utils.
 * Ref: https://github.com/wbkd/react-flow/blob/main/src/components/Edges/BezierEdge.tsx#L19
 */
export function getBezierPath({
  sourceX,
  sourceY,
  sourcePosition = 'bottom',
  targetX,
  targetY,
  targetPosition = 'top'
}): string {
  const leftAndRight = ['left', 'right'];
  const [centerX, centerY] = getBezierCenter({
    sourceX,
    sourceY,
    targetX,
    targetY
  });

  let path = `M${sourceX},${sourceY} C${sourceX},${centerY} ${targetX},${centerY} ${targetX},${targetY}`;

  if (
    leftAndRight.includes(sourcePosition) &&
    leftAndRight.includes(targetPosition)
  ) {
    path = `M${sourceX},${sourceY} C${centerX},${sourceY} ${centerX},${targetY} ${targetX},${targetY}`;
  } else if (leftAndRight.includes(targetPosition)) {
    path = `M${sourceX},${sourceY} C${sourceX},${targetY} ${sourceX},${targetY} ${targetX},${targetY}`;
  } else if (leftAndRight.includes(sourcePosition)) {
    path = `M${sourceX},${sourceY} C${targetX},${sourceY} ${targetX},${sourceY} ${targetX},${targetY}`;
  }

  return path;
}

/**
 * Calculate actual center for a path element.
 */
function getCenter(pathElm: SVGPathElement) {
  const pLength = pathElm.getTotalLength();
  const pieceSize = pLength / 2;
  const { x, y } = pathElm.getPointAtLength(pieceSize);
  const angle = (Math.atan2(x, y) * 180) / Math.PI;
  return { x, y, angle };
}

/**
 * Get the angle for the path.
 */
function getAngle(source: PointCoords, target: PointCoords) {
  const dx = source.x - target.x;
  const dy = source.y - target.y;

  let theta = Math.atan2(-dy, -dx);
  theta *= 180 / Math.PI;
  if (theta < 0) {
    theta += 360;
  }

  return theta;
}

/**
 * Get the center for the path element.
 */
export function getPathCenter(
  pathElm: SVGPathElement,
  firstPoint: PointCoords,
  lastPoint: PointCoords
): CenterCoords {
  if (!pathElm) {
    return null;
  }

  const angle = getAngle(firstPoint, lastPoint);
  const point = getCenter(pathElm);
  return {
    ...point,
    angle
  };
}
