import{j as e}from"./jsx-runtime-9c4ae004.js";import"./blocks-2646952b.js";import{u as s}from"./index-2ef8b458.js";import{M as r}from"./index-6e044484.js";import"./index-1b03fe98.js";import"./iframe-5999dd3f.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./extends-20258d9b.js";import"./index-6fd5a17b.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function o(n){const t=Object.assign({h1:"h1",p:"p",code:"code",strong:"strong",h2:"h2",a:"a",blockquote:"blockquote",pre:"pre",em:"em",ul:"ul",li:"li"},s(),n.components);return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Docs/Advanced/State Management"}),`
`,e.jsx(t.h1,{id:"state-management",children:"State Management"}),`
`,e.jsxs(t.p,{children:["This Storybook demo showcases ",e.jsx(t.code,{children:"React.useState"})," as state manager, because it's very simple to comprehend and simple apps could actually use it for real."]}),`
`,e.jsxs(t.p,{children:["Although, as your app growths, you might need to have some ",e.jsx(t.strong,{children:"shared state"})," and use a shared State manager (Redux, Recoil, xState, MobX, etc.)."]}),`
`,e.jsx(t.h2,{id:"what-state-manager-should-be-used-with-reaflow",children:"What state manager should be used with reaflow?"}),`
`,e.jsx(t.p,{children:"Reaflow is store-agnostic and doesn't recommend any store manager in particular. The choice is yours."}),`
`,e.jsxs(t.p,{children:["If you're unfamiliar with React State managers, we recommend watching ",e.jsx(t.a,{href:"https://www.youtube.com/watch?v=u_o09PD_qAs&feature=emb_logo&ab_channel=LeeRobinson",target:"_blank",rel:"nofollow noopener noreferrer",children:"What State Management Library Should I Use with React?"}),"."]}),`
`,e.jsxs(t.h2,{id:"immutability-when-using-reactusestate",children:["Immutability when using ",e.jsx(t.code,{children:"React.useState"})]}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:["If you're using ",e.jsx(t.code,{children:"React.useState"}),", be careful about immutability."]}),`
`]}),`
`,e.jsxs(t.p,{children:["While React ",e.jsx(t.code,{children:"useState"})," will not throw when mutate the state directly, it won't actually work."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-tsx",children:`import React, { useState } from 'react';
import { NodeData } from 'reaflow';

const [nodes, setNodes] = useState<NodeData[]>([]);

...

const newNodes = nodes; // DO NOT DO THAT
newNodes[0] = { id: '1' };
console.log('updateCurrentNode new nodes', newNodes); // Will print the expected object

setNodes(newNodes); // Will not crash, but won't actually mutate the state for real

`})}),`
`,e.jsxs(t.p,{children:["You must not mutate the state directly ",e.jsx(t.code,{children:"nodes"}),", but clone it first."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-tsx",children:`import cloneDeep from 'lodash.clonedeep';

const newNodes = nodes; // DO NOT DO THAT
const newNodes = cloneDeep(nodes); // Do that instead
`})}),`
`,e.jsxs(t.p,{children:["You can use the library of your choice to clone the state, ",e.jsx(t.code,{children:"lodash.clonedeep"})," is a good choice."]}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:[e.jsx(t.a,{href:"https://github.com/reaviz/reaflow/issues/43#issuecomment-774012401",target:"_blank",rel:"nofollow noopener noreferrer",children:"This is not a bug, it's expected"}),". Although, it is very confusing because ",e.jsx(t.code,{children:"newNodes"}),` shows the expected value in the console.
It would be a better developer experience for React to throw an exception when mutating the state directly. `,e.jsxs(t.em,{children:["(it's what ",e.jsx(t.code,{children:"recoil"})," does)"]})]}),`
`]}),`
`,e.jsx(t.h2,{id:"community-examples",children:"Community examples"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.a,{href:"https://github.com/Vadorequest/poc-nextjs-reaflow",target:"_blank",rel:"nofollow noopener noreferrer",children:"Vadorequest/poc-nextjs-reaflow"})," uses ",e.jsx(t.strong,{children:e.jsx(t.a,{href:"https://recoiljs.org/",target:"_blank",rel:"nofollow noopener noreferrer",children:"Recoil"})})," as shared State Manager."]}),`
`]})]})}function g(n={}){const{wrapper:t}=Object.assign({},s(),n.components);return t?e.jsx(t,Object.assign({},n,{children:e.jsx(o,n)})):o(n)}export{g as default};
