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

  if (!enteredNode || !curNode) {
    return false;
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

  return new Matrix2D().translate(tx, ty).scale(zoom).inverse();
}

/**
 * Given a nodeId to find, a list of nodes to check against, and an optional parentId of the node
 * find the node from the list of nodes
 */
export function findNestedNode(
  nodeId: string,
  children: any[],
  parentId?: string
): { [key: string]: any } {
  if (!nodeId || !children) {
    return {};
  }

  const foundNode = children.find(n => n.id === nodeId);
  if (foundNode) {
    return foundNode;
  }

  if (parentId) {
    const parentNode = children.find(n => n.id === parentId);
    if (parentNode?.children) {
      return findNestedNode(nodeId, parentNode.children, parentId);
    }
  }

  // Check for nested children
  const nodesWithChildren = children.filter(
    n => n.children?.length
  );
  // Iterate over all nested nodes and check if any of them contain the node
  for (const n of nodesWithChildren) {
    const foundChild = findNestedNode(nodeId, n.children, parentId);

    if (foundChild && Object.keys(foundChild).length) {
      return foundChild;
    }
  }

  return {};
}

/**
 * Return the layout node that is currently being dragged on the Canvas
 */
export function getDragNodeData(
  dragNode: NodeData,
  children: any[] = []
): { [key: string]: any } {
  if (!dragNode) {
    return {};
  }

  const { parent } = dragNode;
  if (!parent) {
    return children?.find(n => n.id === dragNode.id) || {};
  }

  return findNestedNode(dragNode.id, children, parent);
}
