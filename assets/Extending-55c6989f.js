import{j as e}from"./jsx-runtime-9c4ae004.js";import"./blocks-2646952b.js";import{u as d}from"./index-2ef8b458.js";import{M as s}from"./index-6e044484.js";import"./index-1b03fe98.js";import"./iframe-5999dd3f.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./extends-20258d9b.js";import"./index-6fd5a17b.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function t(o){const n=Object.assign({h1:"h1",p:"p",strong:"strong",code:"code",blockquote:"blockquote",em:"em",a:"a",pre:"pre"},d(),o.components);return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Docs/Utils/Extending"}),`
`,e.jsx(n.h1,{id:"extended-utils",children:"Extended utils"}),`
`,e.jsx(n.p,{children:"The basic utils will not cover all use-cases."}),`
`,e.jsxs(n.p,{children:["Below are a few examples of advanced use-cases ",e.jsxs(n.strong,{children:["with first-class support for connecting nodes through their ",e.jsx(n.code,{children:"ports"})]}),", built on top of the default built-in utils."]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:e.jsxs(n.em,{children:["Courtesy of ",e.jsx(n.a,{href:"https://github.com/Vadorequest/poc-nextjs-reaflow/blob/91275644e9c3d0ed8cf7c2c80d49ef526b5e5069/src/utils/nodes.ts",target:"_blank",rel:"nofollow noopener noreferrer",children:"Vadorequest/poc-nextjs-reaflow"}),"."]})}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import BaseEdgeData from '../types/BaseEdgeData';
import BaseNodeData from '../types/BaseNodeData';
import BasePortData from '../types/BasePortData';
import { CanvasDataset } from '../types/CanvasDataset';
import { createEdge } from './edges';
import {
  getDefaultFromPort,
  getDefaultToPort,
} from './ports';

/**
 * Add a node and optional edge, and automatically link their ports.
 *
 * Automatically connects the fromNode (left node) using its EAST port (right side) to the newNode (right node) using it's WEST port (left side).
 *
 * Similar to reaflow.addNodeAndEdge utility.
 */
export function addNodeAndEdgeThroughPorts(
  nodes: BaseNodeData[],
  edges: BaseEdgeData[],
  newNode: BaseNodeData,
  fromNode?: BaseNodeData,
  toNode?: BaseNodeData,
  fromPort?: BasePortData,
  toPort?: BasePortData,
): CanvasDataset {
  // The default destination node is the newly created node
  toNode = toNode || newNode;

  const newEdge: BaseEdgeData = createEdge(
    fromNode,
    toNode,
    getDefaultFromPort(fromNode, fromPort),
    getDefaultToPort(toNode, toPort),
  );

  return {
    nodes: [...nodes, newNode],
    edges: [
      ...edges,
      ...(fromNode ?
        [
          newEdge,
        ]
        : []),
    ],
  };
}

/**
 * Helper function for upserting a node in a edge (split the edge in 2 and put the node in between), and automatically link their ports.
 *
 * Automatically connects the left edge to the newNode using it's WEST port (left side).
 * Automatically connects the right edge to the newNode using it's EAST port (right side).
 *
 * Similar to reaflow.upsertNode utility.
 */
export function upsertNodeThroughPorts(
  nodes: BaseNodeData[],
  edges: BaseEdgeData[],
  edge: BaseEdgeData,
  newNode: BaseNodeData,
): CanvasDataset {
  const oldEdgeIndex = edges.findIndex(e => e.id === edge.id);
  const edgeBeforeNewNode = {
    ...edge,
    id: \`\${edge.from}-\${newNode.id}\`,
    to: newNode.id,
  };
  const edgeAfterNewNode = {
    ...edge,
    id: \`\${newNode.id}-\${edge.to}\`,
    from: newNode.id,
  };

  if (edge.fromPort && edge.toPort) {
    const fromLeftNodeToWestPort: BasePortData | undefined = newNode?.ports?.find((port: BasePortData) => port?.side === 'WEST');
    const fromRightNodeToEastPort: BasePortData | undefined = newNode?.ports?.find((port: BasePortData) => port?.side === 'EAST');

    edgeBeforeNewNode.fromPort = edge.fromPort;
    edgeBeforeNewNode.toPort = fromLeftNodeToWestPort?.id || \`\${newNode.id}-to\`;

    edgeAfterNewNode.fromPort = fromRightNodeToEastPort?.id || \`\${newNode.id}-from\`;
    edgeAfterNewNode.toPort = edge.toPort;
  }

  edges.splice(oldEdgeIndex, 1, edgeBeforeNewNode, edgeAfterNewNode);

  return {
    nodes: [...nodes, newNode],
    edges: [...edges],
  };
}

/**
 * Removes a node between two edges and merges the two edges into one, and automatically link their ports.
 *
 * Similar to reaflow.removeAndUpsertNodes utility.
 */
export function removeAndUpsertNodesThroughPorts(
  nodes: BaseNodeData[],
  edges: BaseEdgeData[],
  removeNodes: BaseNodeData | BaseNodeData[],
  onNodeLinkCheck?: (
    newNodes: BaseNodeData[],
    newEdges: BaseEdgeData[],
    from: BaseNodeData,
    to: BaseNodeData,
    port?: BasePortData,
  ) => undefined | boolean,
): CanvasDataset {
  if (!Array.isArray(removeNodes)) {
    removeNodes = [removeNodes];
  }

  const nodeIds = removeNodes.map((n) => n.id);
  const newNodes = nodes.filter((n) => !nodeIds.includes(n.id));
  const newEdges = edges.filter(
    (e: BaseEdgeData) => !nodeIds.includes(e?.from as string) && !nodeIds.includes(e?.to as string),
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
            targetNode,
          );

          if (canLink === undefined || canLink) {
            const fromPort: BasePortData | undefined = sourceNode?.ports?.find((port: BasePortData) => port?.side === 'EAST');
            const toPort: BasePortData | undefined = targetNode?.ports?.find((port: BasePortData) => port?.side === 'WEST');

            newEdges.push({
              id: \`\${sourceNode.id}-\${targetNode.id}\`,
              from: sourceNode.id,
              to: targetNode.id,
              parent: sourceNode?.parent,
              fromPort: fromPort?.id,
              toPort: toPort?.id,
            });
          }
        }
      }
    }
  }

  return {
    edges: newEdges,
    nodes: newNodes,
  };
}

`})})]})}function w(o={}){const{wrapper:n}=Object.assign({},d(),o.components);return n?e.jsx(n,Object.assign({},o,{children:e.jsx(t,o)})):t(o)}export{w as default};
