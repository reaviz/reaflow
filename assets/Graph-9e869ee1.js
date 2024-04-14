import{j as e}from"./jsx-runtime-9c4ae004.js";import"./blocks-2646952b.js";import{u as a}from"./index-2ef8b458.js";import{M as d}from"./index-6e044484.js";import"./index-1b03fe98.js";import"./iframe-5999dd3f.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./extends-20258d9b.js";import"./index-6fd5a17b.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function o(s){const n=Object.assign({h1:"h1",h2:"h2",p:"p",code:"code",pre:"pre"},a(),s.components);return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:"Docs/Utils/Graph"}),`
`,e.jsx(n.h1,{id:"graph-utils",children:"Graph Utils"}),`
`,e.jsx(n.h2,{id:"detecting-circulars",children:"Detecting Circulars"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"detectCircular"}),` function helps you determine if
the source node will create a circular link if connected
to the target node.`]}),`
`,e.jsx(n.p,{children:"The signature for this looks like:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`detectCircular(
  nodes: NodeData[],
  edges: EdgeData[],
  fromNode: NodeData,
  toNode: NodeData
) => boolean;
`})}),`
`,e.jsx(n.p,{children:"Below is an example usage:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import { detectCircular } from 'reaflow';

const has = detectCircular(nodes, edges, fromNode, toNode);
if (!has) {
  // Do something
}
`})}),`
`,e.jsx(n.h2,{id:"parent-node-traversal",children:"Parent Node Traversal"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"getParentsForNodeId"}),` function helps you find all the
parent nodes for a given node id.`]}),`
`,e.jsx(n.p,{children:"The signature for this looks like:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`getParentsForNodeId(
  nodes: NodeData[],
  edges: EdgeData[],
  nodeId: string
) => NodeData[];
`})}),`
`,e.jsx(n.p,{children:"Below is an example usage:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import { getParentsForNodeId } from 'reaflow';

const nodes = getParentsForNodeId(nodes, edges, node.id);
`})}),`
`,e.jsx(n.h2,{id:"has-link",children:"Has Link"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"hasLink"}),` function helps you determine if
the source node already has a link to the target node.`]}),`
`,e.jsx(n.p,{children:"The signature for this looks like:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`hasLink(
  edges: EdgeData[],
  fromNode: NodeData,
  toNode: NodeData
) => boolean;
`})}),`
`,e.jsx(n.p,{children:"Below is an example usage:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import { hasLink } from 'reaflow';

const has = hasLink(edges, fromNode, toNode);
if (!has) {
  // Do something
}
`})}),`
`,e.jsx(n.h2,{id:"get-edges-given-a-node",children:"Get Edges Given a Node"}),`
`,e.jsxs(n.p,{children:["Similar to ",e.jsx(n.code,{children:"hasLink"})," the ",e.jsx(n.code,{children:"getEdgesByNode"}),` function will
return all the edges given a node.`]}),`
`,e.jsx(n.p,{children:"The signature looks like this:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`getEdgesByNode(
  edges: EdgeData[],
  node: NodeData,
) => { all: EdgeData[], to: EdgeData[], from: EdgeData[] }
`})}),`
`,e.jsx(n.p,{children:"Below is an example usage:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import { getEdgesByNode } from 'reaflow';

const { all, to, from } = getEdgesByNode(edges, node);
if (!all.length) {
  // Do something
}
`})})]})}function f(s={}){const{wrapper:n}=Object.assign({},a(),s.components);return n?e.jsx(n,Object.assign({},s,{children:e.jsx(o,s)})):o(s)}export{f as default};
