import{j as e}from"./jsx-runtime-9c4ae004.js";import"./blocks-2646952b.js";import{u as a}from"./index-2ef8b458.js";import{M as i}from"./index-6e044484.js";import"./index-1b03fe98.js";import"./iframe-5999dd3f.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./extends-20258d9b.js";import"./index-6fd5a17b.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function r(o){const n=Object.assign({h1:"h1",p:"p",h2:"h2",blockquote:"blockquote",a:"a",code:"code",ul:"ul",li:"li",pre:"pre"},a(),o.components);return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Docs/Advanced/Plugins"}),`
`,e.jsx(n.h1,{id:"plugins",children:"Plugins"}),`
`,e.jsx(n.p,{children:"Below is a list of some libraries and examples to further enhance reaflow."}),`
`,e.jsx(n.h2,{id:"zooming-and-panning",children:"Zooming and panning"}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:"Super fast and light react npm package for zooming, panning and pinching html elements in easy way"}),`
`]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.a,{href:"https://github.com/prc5/react-zoom-pan-pinch",target:"_blank",rel:"nofollow noopener noreferrer",children:"React-zoom-pan-pinch"}),`: By wrapping
the Reaflow graph in the `,e.jsx(n.code,{children:"TransformWrapper"}),` of this library Mobile gestures,
touchpad gestures and desktop mouse events are enabled. The graph can be
scrolled via the mouse wheel and panned by dragging the canvas. The library
provides a rich interface for interaction events.`]}),`
`,e.jsx(n.p,{children:"Properties:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"wheel={{step: 40}}"})," - Define the zoom steps for each mouse wheel step"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"minScale"})," and ",e.jsx(n.code,{children:"maxScale"})," - Define the minimum and maximum zoom"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"limitToBounds"})," - Define if the graph should be allowed to be pannable out of the view"]}),`
`]}),`
`,e.jsxs(n.p,{children:[`To mitigate complications, make sure to deactivate the reaflow native
zoom feature by setting `,e.jsx(n.code,{children:"zoomable={false}"}),"."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
...
<TransformWrapper
  wheel={{ step: 40 }}
  options={{
    maxScale: 4,
    limitToBounds: false
  }}
>
  <TransformComponent>
    <Canvas
      zoomable={false}
      fit={true}
      nodes={...}
      edges={...}
    />
  </TransformComponent>
</TransformWrapper>
`})})]})}function j(o={}){const{wrapper:n}=Object.assign({},a(),o.components);return n?e.jsx(n,Object.assign({},o,{children:e.jsx(r,o)})):r(o)}export{j as default};
