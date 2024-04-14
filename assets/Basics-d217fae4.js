import{j as e}from"./jsx-runtime-9c4ae004.js";import"./chunk-HLWAVYOI-a65e4626.js";import{M as r,C as i}from"./index-6e044484.js";import{Simple as a}from"./Basic.stories-9e2732ce.js";import{u as o}from"./index-2ef8b458.js";import"./index-1b03fe98.js";import"./iframe-5999dd3f.js";import"../sb-preview/runtime.js";import"./react-18-5df836b6.js";import"./index-6fd5a17b.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./extends-20258d9b.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";import"./Icon-0f63e463.js";import"./index-4b095e7f.js";import"./index-f6b105ee.js";import"./IntersectionQuery-f6c749c2.js";import"./crudHelpers-031fd461.js";import"./graphHelpers-fa49f917.js";function t(s){const n=Object.assign({h1:"h1",h2:"h2",p:"p",code:"code",pre:"pre"},o(),s.components);return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Docs/Getting Started/Basics"}),`
`,e.jsx(n.h1,{id:"basics",children:"Basics"}),`
`,e.jsx(n.h2,{id:"your-first-diagram",children:"Your First Diagram"}),`
`,e.jsxs(n.p,{children:["Let's build our first diagram by defining some ",e.jsx(n.code,{children:"nodes"})," and ",e.jsx(n.code,{children:"edges"}),`.
Nodes are the blocks and edges are the relationships between the blocks.`]}),`
`,e.jsxs(n.p,{children:["The data shapes require one property of ",e.jsx(n.code,{children:"id"})," but you can pass ",e.jsx(n.code,{children:"text"}),`
or `,e.jsx(n.code,{children:"icon"}),` to them to show some sort of indication what it represents.
The `,e.jsx(n.code,{children:"id"})," property can be any ",e.jsx(n.code,{children:"string"}),` but for demonstration purposes
we are going to use some basic strings.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`const nodes = [
  {
    id: '1',
    text: '1'
  },
  {
    id: '2',
    text: '2'
  }
];

const edges = [
  {
    id: '1-2',
    from: '1',
    to: '2'
  }
];
`})}),`
`,e.jsxs(n.p,{children:["These shapes above will create two elements ",e.jsx(n.code,{children:"1"})," and ",e.jsx(n.code,{children:"2"}),` and create
a relationship between them. Once we have this defined, we can simply
pass these properties to the `,e.jsx(n.code,{children:"Canvas"})," and it will do the rest!"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import React from 'react';
import { Canvas } from 'reaflow';

export const MyDiagram = () => (
  <Canvas
    nodes={nodes}
    edges={edges}
  />
);
`})}),`
`,e.jsx(n.p,{children:"This will render a graph like this:"}),`
`,e.jsx(i,{of:a})]})}function k(s={}){const{wrapper:n}=Object.assign({},o(),s.components);return n?e.jsx(n,Object.assign({},s,{children:e.jsx(t,s)})):t(s)}export{k as default};
