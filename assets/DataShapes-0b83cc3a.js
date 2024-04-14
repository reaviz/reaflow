import{j as n}from"./jsx-runtime-9c4ae004.js";import"./blocks-2646952b.js";import{u as a}from"./index-2ef8b458.js";import{M as i}from"./index-6e044484.js";import"./index-1b03fe98.js";import"./iframe-5999dd3f.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./extends-20258d9b.js";import"./index-6fd5a17b.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function o(t){const e=Object.assign({h1:"h1",p:"p",ul:"ul",li:"li",code:"code",h2:"h2",pre:"pre"},a(),t.components);return n.jsxs(n.Fragment,{children:[n.jsx(i,{title:"Docs/Getting Started/Data Shapes"}),`
`,n.jsx(e.h1,{id:"data-shapes",children:"Data Shapes"}),`
`,n.jsx(e.p,{children:`The graph is made up of 3 basic data shape objects you
can pass to the graph.`}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"NodeData"})," - The element block which renders"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"EdgeData"})," - The link between Nodes"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"PortData"})," - A specific enter/exit block to link between Nodes"]}),`
`]}),`
`,n.jsx(e.h2,{id:"node",children:"Node"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-ts",children:`export interface NodeData<T = any> {
  /**
   * Unique ID for the node.
   */
  id: string;

  /**
   * Whether the node is disabled or not.
   */
  disabled?: boolean;

  /**
   * Text label for the node.
   */
  text?: any;

  /**
   * Optional height attribute. If not passed with calculate
   * default sizes using text.
   */
  height?: number;

  /**
   * Optional width attribute. If not passed with calculate
   * default sizes using text.
   */
  width?: number;

  /**
   * Parent node id for nesting.
   */
  parent?: string;

  /**
   * List of ports.
   */
  ports?: PortData[];

  /**
   * Icon for the node.
   */
  icon?: IconData;

  /**
   * Padding for the node.
   */
  nodePadding?: number | [number, number] | [number, number, number, number];

  /**
   * Data for the node.
   */
  data?: T;

  /**
   * CSS classname for the node.
   */
  className?: string;

  /**
   * ELK layout options.
   */
  layoutOptions?: ElkNodeLayoutOptions;

  /**
   * Whether the node can be clicked.
   */
  selectionDisabled?: boolean;
}
`})}),`
`,n.jsxs(e.p,{children:["The node also has a ",n.jsx(e.code,{children:"IconData"})," shape:"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-ts",children:`export interface IconData {
  /**
   * URL for the icon.
   */
  url: string;

  /**
   * Height of the icon.
   */
  height: number;

  /**
   * Width of the icon.
   */
  width: number;
}
`})}),`
`,n.jsx(e.h2,{id:"edge",children:"Edge"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-ts",children:`export interface EdgeData<T = any> {
  /**
   * Unique ID of the edge.
   */
  id: string;

  /**
   * Whether the edge is disabled or not.
   */
  disabled?: boolean;

  /**
   * Text label for the edge.
   */
  text?: any;

  /**
   * ID of the from node.
   */
  from?: string;

  /**
   * ID of the to node.
   */
  to?: string;

  /**
   * Optional ID of the from port.
   */
  fromPort?: string;

  /**
   * Optional ID of the to port.
   */
  toPort?: string;

  /**
   * Data about the edge.
   */
  data?: T;

  /**
   * CSS Classname for the edge.
   */
  className?: string;

  /**
   * Optional arrow head type.
   */
  arrowHeadType?: any;

  /**
   * Parent of the edge for nesting.
   */
  parent?: string;

  /**
   * Whether the edge can be clicked.
   */
  selectionDisabled?: boolean;
}
`})}),`
`,n.jsx(e.h2,{id:"port",children:"Port"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-ts",children:`export interface PortData {
  /**
   * Unique ID of the port.
   */
  id: string;

  /**
   * Height of the port.
   */
  height: number;

  /**
   * Width of the port.
   */
  width: number;

  /**
   * Whether the port is visually hidden or not.
   */
  hidden?: boolean;

  /**
   * Classname for the port.
   */
  className?: string;

  /**
   * Alignment of the port.
   */
  alignment?: 'CENTER';

  /**
   * Side the port is located.
   */
  side: 'NORTH' | 'SOUTH' | 'EAST' | 'WEST';

  /**
   * Port is disabled.
   */
  disabled?: boolean;
}
`})})]})}function x(t={}){const{wrapper:e}=Object.assign({},a(),t.components);return e?n.jsx(e,Object.assign({},t,{children:n.jsx(o,t)})):o(t)}export{x as default};
