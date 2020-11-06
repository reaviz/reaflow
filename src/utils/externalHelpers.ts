import { EdgeData, NodeData } from '../types';

/**
 * Helper function for upserting a node in a edge.
 */
export function upsertNode(
  nodes: NodeData[],
  edges: EdgeData[],
  edge: EdgeData,
  newNode: NodeData
) {
  return {
    nodes: [...nodes, newNode],
    edges: [
      ...edges.filter((e) => e.id !== edge.id),
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
export function removeNode(
  nodes: NodeData[],
  edges: EdgeData[],
  node: NodeData
) {
  return {
    nodes: nodes.filter((n) => n.id !== node.id),
    edges: edges.filter((e) => e.from !== node.id && e.to !== node.id)
  };
}

/**
 * Helper function to determine if edge already has a link.
 */
export function hasLink(edges: EdgeData[], from: NodeData, to: NodeData) {
  return edges.some((e) => e.from === from.id && e.to === to.id);
}

/**
 * Get sources pointing to a node.
 */
function getSourceNodesForTargetId(
  nodes: NodeData[],
  edges: EdgeData[],
  nodeId: string
) {
  const sourceNodeIds = edges.reduce((acc, edge) => {
    if (edge.to === nodeId) {
      acc.push(edge.from);
    }
    return acc;
  }, []);

  const node = nodes.find((n) => n.id === nodeId);

  if (node?.parent) {
    sourceNodeIds.push(node.parent);
  }

  return nodes.filter((n) => sourceNodeIds.includes(n.id));
}

/**
 * Detect if there is a circular reference from the from to the source node.
 */
export function detectCircular(
  nodes: NodeData[],
  edges: EdgeData[],
  fromNode: NodeData,
  toNode: NodeData
) {
  let found = false;

  const traverse = (nodeId: string) => {
    const sourceNodes = getSourceNodesForTargetId(nodes, edges, nodeId);
    for (const node of sourceNodes) {
      if (node.id !== toNode.id) {
        traverse(node.id);
      } else {
        found = true;
        break;
      }
    }
  };

  traverse(fromNode.id);

  return found;
}

/**
 * Given a node id, get all the parent nodes recursively.
 */
export const getParentsForNodeId = (
  nodes: NodeData[],
  edges: EdgeData[],
  startId: string
) => {
  const result = [];

  const traverse = (nodeId: string) => {
    const sourceNodes = getSourceNodesForTargetId(nodes, edges, nodeId);
    for (const node of sourceNodes) {
      const has = result.find((n) => n.id === node.id);
      if (!has) {
        result.push(node);
        traverse(node.id);
      }
    }
  };

  traverse(startId);

  return result;
};
