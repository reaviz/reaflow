import{j as e}from"./jsx-runtime-9c4ae004.js";import"./blocks-2646952b.js";import{u as s}from"./index-2ef8b458.js";import{M as r}from"./index-6e044484.js";import"./index-1b03fe98.js";import"./iframe-5999dd3f.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./extends-20258d9b.js";import"./index-6fd5a17b.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function t(o){const n=Object.assign({h1:"h1",p:"p",code:"code",a:"a",blockquote:"blockquote",h2:"h2",pre:"pre",h3:"h3",ul:"ul",li:"li",strong:"strong"},s(),o.components);return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Docs/Advanced/Custom nodes"}),`
`,e.jsx(n.h1,{id:"custom-nodes",children:"Custom nodes"}),`
`,e.jsxs(n.p,{children:["Using HTML within a ",e.jsx(n.code,{children:"Node"})," component relies on the SVG ",e.jsx(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/SVG/Element/foreignObject",target:"_blank",rel:"nofollow noopener noreferrer",children:e.jsx(n.code,{children:"foreignObject"})}),"."]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:["You do not need to use ",e.jsx(n.code,{children:"xmlns"})," (XML NameSpace) in the first ",e.jsx(n.code,{children:"div"})," within ",e.jsx(n.code,{children:"foreignObject"}),", it's only required when the SVG is a whole document."]}),`
`]}),`
`,e.jsx(n.h2,{id:"rendering-different-kindstypes-of-nodes",children:"Rendering different kinds/types of nodes"}),`
`,e.jsxs(n.p,{children:['Most apps will need to render different kinds of nodes. The way to go is to use a Node "',e.jsx(n.a,{href:"https://github.com/Vadorequest/poc-nextjs-reaflow/blob/734018e8135523fccc2c01077294bca0a32ddfbe/src/components/nodes/NodeRouter.tsx#L43",target:"_blank",rel:"nofollow noopener noreferrer",children:"Router"}),`" component, which checks what the node's type is, and renders the related React component.`]}),`
`,e.jsxs(n.h2,{id:"how-does-foreignobject-render-in-html",children:["How does ",e.jsx(n.code,{children:"foreignObject"})," render in HTML?"]}),`
`,e.jsxs(n.p,{children:["While using ",e.jsx(n.code,{children:"foreignObject"})," allows building components using usual HTML/CSS, there are a few quirks to consider."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<!-- "g" is a graph representing a Node "container" -->
<g cursor='initial' opacity='1' style='transform: translateX(1702px) translateY(495.333px) translateZ(0px); transform-origin: 100px 50px;'>
  <!-- "rect" is a rectangle representing the reaflow "Node" component, it's what events are bound to -->
  <rect tabindex='-1' class='Node-module_rect__1Eal3 node-svg-rect node-information-svg-rect' height='100' width='200' rx='2' ry='2' opacity='1' style='stroke-width: 0; fill: white; color: black; cursor: auto;'></rect>

  <!-- "foreignObject" is the root containing your custom HTML for the node -->
  <foreignObject id='node-foreignObject-2ca8efe0-75ed-11eb-8896-7bd259f8797e' class='information-node-container node-container css-1ncbppe-BaseNode' width='200' height='100'>
    <!-- The first div, should use "position: fixed" for children to display properly -->
    <div class='node'>
      Node content
    </div>
  </foreignObject>

  <!-- Ports -->
  <g>
    <rect height='29' width='29' x='-14.5' y='35.5' class='Port-module_clicker__ZivO1'></rect>
    <rect class='Port-module_port__30o1q 2ca8a1c0-75ed-11eb-8896-7bd259f8797e port' height='15' width='15' rx='15' ry='15' opacity='1' style='fill: white; stroke: white; transform: translateX(-7.5px) translateY(42.5px) scale(1) translateZ(0px); transform-origin: 7.5px 7.5px;'></rect>
  </g>
  <g>
    <rect height='29' width='29' x='185.5' y='35.5' class='Port-module_clicker__ZivO1'></rect>
    <rect class='Port-module_port__30o1q 2ca8c8d0-75ed-11eb-8896-7bd259f8797e port' height='15' width='15' rx='15' ry='15' opacity='1' style='fill: white; stroke: white; transform: translateX(192.5px) translateY(42.5px) scale(1) translateZ(0px); transform-origin: 7.5px 7.5px;'></rect>
  </g>
  <g></g>
</g>
`})}),`
`,e.jsx(n.h2,{id:"known-issues-and-workarounds",children:"Known issues and workarounds"}),`
`,e.jsxs(n.h3,{id:"use-position-fixed-in-the-first-div",children:["Use ",e.jsx(n.code,{children:"position: fixed"})," in the first div"]}),`
`,e.jsxs(n.p,{children:["You must apply ",e.jsx(n.code,{children:"position: fixed"})," to the first ",e.jsx(n.code,{children:"div"})," element contained by the ",e.jsx(n.code,{children:"foreignObject"}),", otherwise any child element using ",e.jsx(n.code,{children:"position"})," ",e.jsx(n.a,{href:"https://github.com/reaviz/reaflow/issues/44#issuecomment-776883460",target:"_blank",rel:"nofollow noopener noreferrer",children:"will not be displayed"}),"."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["This issue was the reason why ",e.jsx(n.code,{children:"react-select"})," and ",e.jsx(n.code,{children:"ChakraUI Select"})," components wouldn't display properly."]}),`
`]}),`
`,e.jsx(n.h3,{id:"z-index-doesnt-have-any-effect-on-svg-elements",children:"Z-index doesn't have any effect on SVG elements"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"foreignObject"})," is still a SVG element, and it is displayed on top of the ",e.jsx(n.code,{children:"rect"})," (which represents the Node component created by reaflow)."]}),`
`,e.jsxs(n.p,{children:["It is not possible to re-order SVG elements using ",e.jsx(n.code,{children:"z-index"}),`.
The rule of display on the Z index being "the last element is displayed on top of the other element".`]}),`
`,e.jsxs(n.h3,{id:"the-foreignobject-will-steal-events-onclick-onenter-onleave-etc-that-are-bound-to-the-rect-node",children:["The ",e.jsx(n.code,{children:"foreignObject"})," will steal events (onClick, onEnter, onLeave, etc.) that are bound to the ",e.jsx(n.code,{children:"rect"})," (Node)"]}),`
`,e.jsxs(n.p,{children:["Because the ",e.jsx(n.code,{children:"foreignObject"})," displays on top of the ",e.jsx(n.code,{children:"rect"}),' element, it will "steal" events such as onClick, onEnter/onLeave (mouse).']}),`
`,e.jsxs(n.p,{children:["Those events are provided by default by Reaflow ",e.jsx(n.code,{children:"Canvas"})," to its ",e.jsx(n.code,{children:"Node"}),` components.
Thus, by using `,e.jsx(n.code,{children:"foreignObject"}),", ",e.jsx(n.strong,{children:"none of the built-in Node events will work anymore"}),", ",e.jsxs(n.a,{href:"https://github.com/reaviz/reaflow/discussions/34",target:"_blank",rel:"nofollow noopener noreferrer",children:["unless you set ",e.jsx(n.code,{children:"pointer-events: none"})," to the ",e.jsx(n.code,{children:"foreignObject"})," element"]}),"."]}),`
`,e.jsxs(n.p,{children:["Although, even if you disable ",e.jsx(n.code,{children:"pointer-events"}),", depending on your Node component UI, it might only work for part of the component."]}),`
`,e.jsx(n.p,{children:"Many built-in behaviors will be affected because of this, such as:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Dragging an edge from a node",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Dragging won't work if the click doesn't happen on the ",e.jsx(n.code,{children:"rect"})]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Selecting nodes",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The click won't work it doesn't happen on the ",e.jsx(n.code,{children:"rect"})]}),`
`,e.jsxs(n.li,{children:["Using shortcuts for multiple selection ",e.jsx(n.a,{href:"https://github.com/reaviz/reaflow/issues/50",target:"_blank",rel:"nofollow noopener noreferrer",children:"won't work because keyboard events won't be captured"})]}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.p,{children:["That's why, in addition to disabling ",e.jsx(n.code,{children:"pointer-events"}),", ",e.jsxs(n.strong,{children:["you might also want ",e.jsx(n.a,{href:"https://github.com/Vadorequest/poc-nextjs-reaflow/blob/272a23604e0a11ef0726e19091be58ffd5861d62/src/components/nodes/BaseNode.tsx#L357-L360",target:"_blank",rel:"nofollow noopener noreferrer",children:"to forward the native events"})]})," (onClick, onEnter, onLeave, onKeyPress, etc.) to the main div (",e.jsx(n.code,{children:".node"})," above)."]}),`
`,e.jsxs(n.p,{children:["By forwarding those events to the first ",e.jsx(n.code,{children:"div"}),", you'll work around most of the above-mentioned issues."]}),`
`,e.jsx(n.h3,{id:"enteringleaving-a-node",children:"Entering/leaving a node"}),`
`,e.jsx(n.p,{children:"Depending on how complicated your HTML is within the nodes themselves, it might be tough to detect whether you're in a node or not."}),`
`,e.jsxs(n.p,{children:["When not using ",e.jsx(n.code,{children:"foreignObject"}),", it is really straightforward, but when the ",e.jsx(n.code,{children:"foreignObject"})," contains complex HTML structure, the ",e.jsx(n.code,{children:"onEnter/onLeave"})," events applied to main ",e.jsx(n.code,{children:"div"})," will trigger when hovering other elements within that node, leading to a tons of false-positive events."]}),`
`,e.jsx(n.p,{children:"At this time, there was no viable solution being reported to work around this issue."}),`
`,e.jsx(n.h2,{id:"community-examples",children:"Community examples"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://github.com/Vadorequest/poc-nextjs-reaflow",target:"_blank",rel:"nofollow noopener noreferrer",children:"Vadorequest/poc-nextjs-reaflow"})," uses custom nodes UI, and ",e.jsxs(n.a,{href:"https://github.com/Vadorequest/poc-nextjs-reaflow/blob/287141b94145eec18fb02aab8f00676ae92f1310/src/components/nodes/BaseNode.tsx#L279-L418",target:"_blank",rel:"nofollow noopener noreferrer",children:["all nodes relies on ",e.jsx(n.code,{children:"foreignObject"})]})]}),`
`]})]})}function m(o={}){const{wrapper:n}=Object.assign({},s(),o.components);return n?e.jsx(n,Object.assign({},o,{children:e.jsx(t,o)})):t(o)}export{m as default};
