import{j as e}from"./jsx-runtime-9c4ae004.js";import"./blocks-2646952b.js";import{u as o}from"./index-2ef8b458.js";import{M as r}from"./index-6e044484.js";import"./index-1b03fe98.js";import"./iframe-5999dd3f.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./extends-20258d9b.js";import"./index-6fd5a17b.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function s(d){const n=Object.assign({h1:"h1",h2:"h2",p:"p",code:"code",pre:"pre"},o(),d.components);return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Docs/Utils/CRUD"}),`
`,e.jsx(n.h1,{id:"crud-utils",children:"CRUD Utils"}),`
`,e.jsx(n.h2,{id:"upsert-node",children:"Upsert Node"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"upsertNode"}),` function helps you insert a new
node between two other nodes.`]}),`
`,e.jsx(n.p,{children:"The signature for this looks like:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`upsertNode(
  nodes: NodeData[],
  edges: EdgeData[],
  edge: EdgeData,
  newNode: NodeData
) => { nodes: NodeData[]; edges: EdgeData[]; }
`})}),`
`,e.jsx(n.p,{children:"Below is an example usage:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import { upsertNode} from 'reaflow';

const id = \`node-\${Math.random()}\`;
const newNode = {
  id,
  text: id
};

const results = upsertNode(nodes, edges, edge, newNode);
setNodes(results.nodes);
setEdges(results.edges);
`})}),`
`,e.jsx(n.h2,{id:"remove-node",children:"Remove Node"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"removeNode"}),` function helps you remove a node
and all related edges.`]}),`
`,e.jsx(n.p,{children:"The signature for this looks like:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`removeNode(
  nodes: NodeData[],
  edges: EdgeData[],
  removeNodes: string | string[]
) => { nodes: NodeData[]; edges: EdgeData[]; }
`})}),`
`,e.jsx(n.p,{children:"Below is an example usage:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import { removeNode } from 'reaflow';

const results = removeNode(nodes, edges, nodeIds);
setNodes(results.nodes);
setEdges(results.edges);
`})}),`
`,e.jsx(n.h2,{id:"node-removal-and-upsert",children:"Node Removal and Upsert"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"removeAndUpsertNodes"}),` helper allows you to remove a node
that has existing `,e.jsx(n.code,{children:"to"})," and ",e.jsx(n.code,{children:"from"}),` edges and link the child
edges from the node remove to the parent of the node removed.`]}),`
`,e.jsx(n.p,{children:"The signature for this looks like:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`removeAndUpsertNodes(
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
) => { nodes: NodeData[]; edges: EdgeData[]; }
`})}),`
`,e.jsx(n.p,{children:"Below is an example usage:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import { removeAndUpsertNodes } from 'reaflow';

const result = removeAndUpsertNodes(nodes, edges, node);
setNodes(results.nodes);
setEdges(results.edges);
`})}),`
`,e.jsx(n.h2,{id:"add-node-and-optional-edge",children:"Add Node and Optional Edge"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"addNodeAndEdge"}),` helper is a shortcut function to add a
node to a nodes array and a optional edge.`]}),`
`,e.jsx(n.p,{children:"The signature for this looks like:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`addNodeAndEdge(
  nodes: NodeData[],
  edges: EdgeData[],
  node: NodeData,
  toNode?: NodeData
) => { nodes: NodeData[]; edges: EdgeData[]; }
`})}),`
`,e.jsx(n.p,{children:"Below is an example usage:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import { addNodeAndEdge } from 'reaflow';

const result = addNodeAndEdge(
  nodes,
  edges,
  {
    id,
    text: id
  },
  enteredNode
);

setNodes(results.nodes);
setEdges(results.edges);
`})}),`
`,e.jsx(n.h2,{id:"remove-edge",children:"Remove Edge"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"removeEdge"}),` function simplifies removing a single
or array of edges.`]}),`
`,e.jsx(n.p,{children:"The signature for this looks like:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`removeEdge(
  edges: EdgeData[],
  edge: EdgeData | EdgeData[]
) => EdgeData[]
`})}),`
`,e.jsx(n.p,{children:"Below is an example usage:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import { removeEdge } from 'reaflow';

const newEdges = removeEdge(
  edges,
  edgesToRemove
);

setEdges(newEdges);
`})}),`
`,e.jsx(n.h2,{id:"remove-edges-from-node",children:"Remove Edges from Node"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"removeEdgesFromNode"}),` function simplifies removing all
edges from a node.`]}),`
`,e.jsx(n.p,{children:"The signature for this looks like:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`removeEdgesFromNode(
  nodeId: string,
  edges: EdgeData[]
) => EdgeData[]
`})}),`
`,e.jsx(n.p,{children:"Below is an example usage:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import { removeEdgesFromNode } from 'reaflow';

const newEdges = removeEdgesFromNode(
  node.id,
  edges
);

setEdges(newEdges);
`})}),`
`,e.jsx(n.h2,{id:"create-edge-from-nodes",children:"Create Edge from Nodes"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"createEdgeFromNodes"}),` function simplifies creating an
edge between two nodes.`]}),`
`,e.jsx(n.p,{children:"The signature for this looks like:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`createEdgeFromNodes(
  fromNode: NodeData,
  toNode: NodeData
) => EdgeData
`})}),`
`,e.jsx(n.p,{children:"Below is an example usage:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import { createEdgeFromNodes } from 'reaflow';

const newEdge = createEdgeFromNodes(
  fromNode,
  toNode
);

setEdges([...edges, newEdge]);
`})})]})}function u(d={}){const{wrapper:n}=Object.assign({},o(),d.components);return n?e.jsx(n,Object.assign({},d,{children:e.jsx(s,d)})):s(d)}export{u as default};
