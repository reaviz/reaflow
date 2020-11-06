import { NodeData } from '../types';

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

  if (canLinkNode === false && enteredNode.id === curNode.id) {
    return false;
  }

  return true;
}
