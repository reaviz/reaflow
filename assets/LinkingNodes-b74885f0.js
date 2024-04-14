import{j as n}from"./jsx-runtime-9c4ae004.js";import"./blocks-2646952b.js";import{u as i}from"./index-2ef8b458.js";import{M as s}from"./index-6e044484.js";import"./index-1b03fe98.js";import"./iframe-5999dd3f.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./extends-20258d9b.js";import"./index-6fd5a17b.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function o(t){const e=Object.assign({h1:"h1",p:"p",ul:"ul",li:"li",code:"code",pre:"pre"},i(),t.components);return n.jsxs(n.Fragment,{children:[n.jsx(s,{title:"Docs/Getting Started/Linking Nodes"}),`
`,n.jsx(e.h1,{id:"linking-nodes",children:"Linking Nodes"}),`
`,n.jsx(e.p,{children:`reaflow allows users to edit graphs by adding/removing and
linking nodes together dynamically. There are 2 event handlers
you can subscribe to for checking if a node can be linked
and performing the actual link.`}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"onNodeLinkCheck"})," - Function you can implement to return true/false if node can link"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"onNodeLink"})," - Function you implement to perform the actual link"]}),`
`]}),`
`,n.jsx(e.p,{children:"Below is a example showing how one might use these two functions together:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import React, { useState } from 'react';
import { Canvas, hasLink, NodeData, EdgeData } from 'reaflow';

export default () => {
  const [nodes, setNodes] = useState<NodeData[]>([
    {
      id: '1',
      text: '1'
    },
    {
      id: '2',
      text: '2'
    }
  ]);
  const [edges, setEdges] = useState<EdgeData[]>([]);

  return (
    <Canvas
      nodes={nodes}
      edges={edges}
      onNodeLinkCheck={(event, from: NodeData, to: NodeData) => {
        return !hasLink(edges, from, to);
      }}
      onNodeLink={(event, from, to) => {
        const id = \`\${from.id}-\${to.id}\`;

        setEdges([
          ...edges,
          {
            id,
            from: from.id,
            to: to.id
          }
        ]);
      }}
    />
  )
};
`})}),`
`,n.jsxs(e.p,{children:[`In the example, we take advantage of one of the
helpers in the library called `,n.jsx(e.code,{children:"hasLink"}),` which will
return if the node is already linked.`]}),`
`,n.jsxs(e.p,{children:[`In order to actually add the link, you can
implement the `,n.jsx(e.code,{children:"onNodeLink"}),` which is a function
that should set a new edge with pointers to the
source and target node.`]})]})}function j(t={}){const{wrapper:e}=Object.assign({},i(),t.components);return e?n.jsx(e,Object.assign({},t,{children:n.jsx(o,t)})):o(t)}export{j as default};
