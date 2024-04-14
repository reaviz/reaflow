import{j as n}from"./jsx-runtime-9c4ae004.js";import"./blocks-2646952b.js";import{u as r}from"./index-2ef8b458.js";import{M as s}from"./index-6e044484.js";import"./index-1b03fe98.js";import"./iframe-5999dd3f.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./extends-20258d9b.js";import"./index-6fd5a17b.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function o(t){const e=Object.assign({h1:"h1",p:"p",code:"code",pre:"pre"},r(),t.components);return n.jsxs(n.Fragment,{children:[n.jsx(s,{title:"Docs/Advanced/Refs"}),`
`,n.jsx(e.h1,{id:"refs",children:"Refs"}),`
`,n.jsxs(e.p,{children:["You can get a reference to the ",n.jsx(e.code,{children:"Canvas"}),` instance to perform various
functions externally.`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`export const MyCanvas: FC = () => {
  const ref = useRef<CanvasRef | null>(null);

  useEffect(() => {
    // Refs give you ability to do things like:
    // ref.current?.centerCanvas()
  }, [ref]);

  return <Canvas ref={ref} />;
};
`})}),`
`,n.jsxs(e.p,{children:["The ",n.jsx(e.code,{children:"ref"})," will expose the following interface:"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-ts",children:`export interface CanvasRef {
  /**
   * Canvas SVG ref.
   */
  svgRef: RefObject<SVGSVGElement>;

  /**
   * X/Y offset.
   */
  xy: [number, number];

  /**
   * Scroll offset.
   */
  scrollXY: [number, number];

  /**
   * ELK Layout object.
   */
  layout: ElkRoot;

  /**
   * Ref to container div.
   */
  containerRef: RefObject<HTMLDivElement | null>;

  /**
   * Height of the svg.
   */
  canvasHeight?: number;

  /**
   * Width of the svg.
   */
  canvasWidth?: number;

  /**
   * Width of the container div.
   */
  containerWidth?: number;

  /**
   * Height of the container div.
   */
  containerHeight?: number;

  /**
   * Center the canvas to the viewport.
   */
  centerCanvas?: () => void;

  /**
   * Fit the canvas to the viewport.
   */
  fitCanvas?: () => void;

  /**
   * Set a zoom factor of the canvas.
   */
  setZoom?: (factor: number) => void;

  /**
   * Zoom in on the canvas.
   */
  zoomIn?: () => void;

  /**
   * Zoom out on the canvas.
   */
  zoomOut?: () => void;
}
`})})]})}function j(t={}){const{wrapper:e}=Object.assign({},r(),t.components);return e?n.jsx(e,Object.assign({},t,{children:n.jsx(o,t)})):o(t)}export{j as default};
