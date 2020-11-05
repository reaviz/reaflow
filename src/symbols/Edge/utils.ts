/**
 * Center helper.
 * Ref: https://github.com/wbkd/react-flow/blob/main/src/components/Edges/utils.ts#L18
 */
export function getCenter ({
  sourceX,
  sourceY,
  targetX,
  targetY,
}): [number, number, number, number] {
  const xOffset = Math.abs(targetX - sourceX) / 2;
  const centerX = targetX < sourceX ? targetX + xOffset : targetX - xOffset;

  const yOffset = Math.abs(targetY - sourceY) / 2;
  const centerY = targetY < sourceY ? targetY + yOffset : targetY - yOffset;

  return [centerX, centerY, xOffset, yOffset];
};

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
  targetPosition = 'top',
  centerX,
  centerY
}): string {
  const leftAndRight = ['left', 'right'];

  let path = `M${sourceX},${sourceY} C${sourceX},${centerY} ${targetX},${centerY} ${targetX},${targetY}`;

  if (leftAndRight.includes(sourcePosition) && leftAndRight.includes(targetPosition)) {
    path = `M${sourceX},${sourceY} C${centerX},${sourceY} ${centerX},${targetY} ${targetX},${targetY}`;
  } else if (leftAndRight.includes(targetPosition)) {
    path = `M${sourceX},${sourceY} C${sourceX},${targetY} ${sourceX},${targetY} ${targetX},${targetY}`;
  } else if (leftAndRight.includes(sourcePosition)) {
    path = `M${sourceX},${sourceY} C${targetX},${sourceY} ${targetX},${sourceY} ${targetX},${targetY}`;
  }

  return path;
}
