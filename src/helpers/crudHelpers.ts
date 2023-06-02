import { EdgeData, NodeData, PortData } from '../types';

/**
 * Helper function for upserting a node in a edge.
 */
export function upsertNode(
  nodes: NodeData[],
  edges: EdgeData[],
  edge: EdgeData,
  newNode: NodeData
) {
  const oldEdgeIndex = edges.findIndex((e) => e.id === edge.id);
  const edgeBeforeNewNode = {
    ...edge,
    id: `${edge.from}-${newNode.id}`,
    to: newNode.id
  };
  const edgeAfterNewNode = {
    ...edge,
    id: `${newNode.id}-${edge.to}`,
    from: newNode.id
  };

  if (edge.fromPort && edge.toPort) {
    edgeBeforeNewNode.fromPort = edge.fromPort;
    edgeBeforeNewNode.toPort = `${newNode.id}-to`;

    edgeAfterNewNode.fromPort = `${newNode.id}-from`;
    edgeAfterNewNode.toPort = edge.toPort;
  }

  edges.splice(oldEdgeIndex, 1, edgeBeforeNewNode, edgeAfterNewNode);

  return {
    nodes: [...nodes, newNode],
    edges: [...edges]
  };
}

/**
 * Helper function for removing a node between edges and
 * linking the children.
 */
export function removeAndUpsertNodes(
  nodes: NodeData[],
  edges: EdgeData[],
  removeNodes: NodeData | NodeData[],
  onNodeLinkCheck?: (
    newNodes: NodeData[],
    newEdges: EdgeData[],
    from: NodeData,
    to: NodeData,
    port?: PortData
  ) => undefined | boolean
) {
  if (!Array.isArray(removeNodes)) {
    removeNodes = [removeNodes];
  }

  const nodeIds = removeNodes.map((n) => n.id);
  const newNodes = nodes.filter((n) => !nodeIds.includes(n.id));
  const newEdges = edges.filter(
    (e) => !nodeIds.includes(e.from) && !nodeIds.includes(e.to)
  );

  for (const nodeId of nodeIds) {
    const sourceEdges = edges.filter((e) => e.to === nodeId);
    const targetEdges = edges.filter((e) => e.from === nodeId);

    for (const sourceEdge of sourceEdges) {
      for (const targetEdge of targetEdges) {
        const sourceNode = nodes.find((n) => n.id === sourceEdge.from);
        const targetNode = nodes.find((n) => n.id === targetEdge.to);
        if (sourceNode && targetNode) {
          const canLink = onNodeLinkCheck?.(
            newNodes,
            newEdges,
            sourceNode,
            targetNode
          );
          if (canLink === undefined || canLink) {
            newEdges.push({
              id: `${sourceNode.id}-${targetNode.id}`,
              from: sourceNode.id,
              to: targetNode.id,
              parent: sourceNode?.parent
            });
          }
        }
      }
    }
  }

  return {
    edges: newEdges,
    nodes: newNodes
  };
}

/**
 * Helper function to remove a node and its related edges.
 */
export function removeNode(
  nodes: NodeData[],
  edges: EdgeData[],
  removeNodes: string | string[]
) {
  if (!Array.isArray(removeNodes)) {
    removeNodes = [removeNodes];
  }

  const newNodes = [];
  const newEdges = [];

  for (const node of nodes) {
    const has = removeNodes.some((n) => n === node.id);
    if (!has) {
      newNodes.push(node);
    }
  }

  for (const edge of edges) {
    const has = removeNodes.some((n) => n === edge.from || n === edge.to);
    if (!has) {
      newEdges.push(edge);
    }
  }

  return {
    nodes: newNodes,
    edges: newEdges
  };
}

/**
 * Helper function to remove a node's related edges.
 */
export function removeEdgesFromNode(nodeId: string, edges: EdgeData[]) {
  return edges.filter((edge) => !(edge.to === nodeId || edge.from === nodeId));
}

/**
 * Remove edge(s)
 */
export function removeEdge(edges: EdgeData[], edge: EdgeData | EdgeData[]) {
  const deletions: EdgeData[] = !Array.isArray(edge) ? [edge] : edge;
  const edgeIds = deletions.map((e) => e.id);
  return edges.filter((e) => !edgeIds.includes(e.id));
}

/**
 * Create an edge given 2 nodes.
 */
export function createEdgeFromNodes(fromNode: NodeData, toNode: NodeData) {
  return {
    id: `${fromNode.id}-${toNode.id}`,
    from: fromNode.id,
    to: toNode.id,
    parent: toNode.parent
  };
}

/**
 * Add a node and optional edge.
 */
export function addNodeAndEdge(
  nodes: NodeData[],
  edges: EdgeData[],
  node: NodeData,
  toNode?: NodeData
) {
  return {
    nodes: [...nodes, node],
    edges: [...edges, ...(toNode ? [createEdgeFromNodes(toNode, node)] : [])]
  };
}
