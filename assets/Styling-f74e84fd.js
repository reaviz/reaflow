import{j as e}from"./jsx-runtime-9c4ae004.js";import"./chunk-HLWAVYOI-6ac2c24e.js";import{M as s,C as i}from"./index-fb5e7707.js";import{Styling as a}from"./Basic.stories-84c4d4ab.js";import{u as r}from"./index-2ef8b458.js";import"./index-1b03fe98.js";import"./iframe-ce524245.js";import"../sb-preview/runtime.js";import"./react-18-5df836b6.js";import"./index-6fd5a17b.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./_commonjs-dynamic-modules-302442b1.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";import"./Icon-046b6023.js";import"./IntersectionQuery-1c2e7c35.js";import"./crudHelpers-031fd461.js";import"./graphHelpers-fa49f917.js";function n(t){const o=Object.assign({h1:"h1",hr:"hr",p:"p",code:"code",pre:"pre"},r(),t.components);return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Docs/Advanced/Styling"}),`
`,e.jsx(o.h1,{id:"custom-styling",children:"Custom Styling"}),`
`,e.jsx(o.hr,{}),`
`,e.jsx(o.p,{children:`The Nodes, Edges, Arrows and Ports can all be overriden to pass custom attributes
to them to allow for custom styling. Below is an example of some of the possibilities
you can achieve.`}),`
`,e.jsx("br",{}),`
`,e.jsx(i,{of:a}),`
`,e.jsx("br",{}),`
`,e.jsxs(o.p,{children:["In the above example, we override the ",e.jsx(o.code,{children:"node"}),", ",e.jsx(o.code,{children:"edge"})," and ",e.jsx(o.code,{children:"arrow"}),` properties
in the `,e.jsx(o.code,{children:"Canvas"})," component as shown below (abbreviated for demonstration purposes):"]}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-jsx",children:`import { Canvas, Node, Edge, Port, MarkerArrow } from 'reaflow';

export const CustomCanvas: FC = () => (
  <Canvas
    nodes={[]}
    edges={[]}
    node={
      <Node
        style={{ stroke: '#1a192b', fill: 'white', strokeWidth: 1 }}
        label={<Label style={{ fill: 'black' }} />}
        port={<Port style={{ fill: 'blue', stroke: 'white' }} rx={10} ry={10} />}
      />
    }
    arrow={<MarkerArrow style={{ fill: '#b1b1b7' }} />}
    edge={<Edge className="edge" />}
  />
);
`})}),`
`,e.jsx(o.p,{children:`This allows us to set custom properties on these components or even
override them all together with our own component. This allows for
total control over the child components without loosing all the "magic"
under the hood that controls them.`})]})}function N(t={}){const{wrapper:o}=Object.assign({},r(),t.components);return o?e.jsx(o,Object.assign({},t,{children:e.jsx(n,t)})):n(t)}export{N as default};
