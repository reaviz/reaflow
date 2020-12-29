import { RefObject } from 'react';
import { NodeData } from '../types';
import { ElkRoot } from '../layout';
import { Matrix2D } from 'kld-affine';

/**
 * Checks if the node can be linked or not.
 */
export function checkNodeLinkable(
  curNode: NodeData,
  enteredNode: NodeData | null,
  canLinkNode: boolean | null
) {
  if (canLinkNode === null || !enteredNode) {
    return null;
  }

  // TODO: Revisit how to do self-linking better...
  if (canLinkNode === false && enteredNode.id === curNode.id) {
    return false;
  }

  return true;
}

export interface CoordProps {
  zoom: number;
  scrollXY: [number, number];
  layout: ElkRoot;
  containerWidth: number;
  containerHeight: number;
  containerRef: RefObject<HTMLDivElement | null>;
}

/**
 * Given various dimensions and positions, create a matrix
 * used for determining position.
 */
export function getCoords({
  zoom,
  scrollXY,
  layout,
  containerWidth,
  containerHeight,
  containerRef
}: CoordProps) {
  const { top, left } = containerRef.current.getBoundingClientRect();
  const offsetX = scrollXY[0] - containerRef.current.scrollLeft;
  const offsetY = scrollXY[1] - containerRef.current.scrollTop;

  const tx = (containerWidth - layout.width * zoom) / 2 + offsetX + left;
  const ty = (containerHeight - layout.height * zoom) / 2 + offsetY + top;

  return new Matrix2D()
    .translate(tx, ty)
    .scale(zoom)
    .inverse();
}
