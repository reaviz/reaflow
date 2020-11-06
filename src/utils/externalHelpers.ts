import { EdgeData, NodeData } from '../types';

/**
 * Helper function for upserting a node in a edge.
 */
export function upsertNode(nodes: NodeData[], edges: EdgeData[], edge: EdgeData, newNode: NodeData) {
  return {
    nodes: [
      ...nodes,
      newNode
    ],
    edges: [
      ...edges.filter(e => e.id !== edge.id),
      {
        id: `${edge.from}-${newNode.id}`,
        from: edge.from,
        to: newNode.id
      },
      {
        id: `${newNode.id}-${edge.to}`,
        from: newNode.id,
        to: edge.to
      }
    ]
  };
}

/**
 * Helper function to remove a node and its related edges.
 */
export function removeNode(nodes: NodeData[], edges: EdgeData[], node: NodeData) {
  return {
    nodes: nodes.filter(n => n.id !== node.id),
    edges: edges.filter(e => e.from !== node.id && e.to !== node.id)
  };
}
