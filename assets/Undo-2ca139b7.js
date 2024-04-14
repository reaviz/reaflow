import{j as n}from"./jsx-runtime-9c4ae004.js";import"./blocks-2646952b.js";import{u as s}from"./index-2ef8b458.js";import{M as d}from"./index-6e044484.js";import"./index-1b03fe98.js";import"./iframe-5999dd3f.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./extends-20258d9b.js";import"./index-6fd5a17b.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function t(o){const e=Object.assign({h1:"h1",hr:"hr",p:"p",code:"code",a:"a",h2:"h2",pre:"pre"},s(),o.components);return n.jsxs(n.Fragment,{children:[n.jsx(d,{title:"Docs/Helpers/Undo Redo"}),`
`,n.jsx(e.h1,{id:"undo-redo",children:"Undo Redo"}),`
`,n.jsx(e.hr,{}),`
`,n.jsxs(e.p,{children:[`Out of the box, reaflow supports undo and redo functionality. This can be
done optionally using the `,n.jsx(e.code,{children:"useUndo"}),` hook. It also supports hotkeys using
`,n.jsx(e.a,{href:"https://github.com/reaviz/reakeys",target:"_blank",rel:"nofollow noopener noreferrer",children:"reakeys"}),"."]}),`
`,n.jsx(e.h2,{id:"getting-started",children:"Getting Started"}),`
`,n.jsxs(e.p,{children:["The ",n.jsx(e.code,{children:"useUndo"}),` hooks will automatically manage the history of the
nodes and edges, all you need to do is manage the current state.
The hook accepts the following arguments:`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-ts",children:`export interface UndoProps {
  /**
   * Current node datas.
   */
  nodes: NodeData[];

  /**
   * Current edge datas.
   */
  edges: EdgeData[];

  /**
   * Max history count.
   */
  maxHistory?: number;

  /**
   * Disabled or not.
   */
  disabled?: boolean;

  /**
   * On undo/redo event handler.
   */
  onUndoRedo: (state: UndoRedoEvent) => void;
}
`})}),`
`,n.jsx(e.p,{children:"To implement the hook all you need to do is import it like:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { useUndo, EdgeData, Canvas, NodeData } from 'reaflow';

const MyApp = () => {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [edges, setEdges] = useState<EdgeData[]>([]);

  const { undo, redo, canUndo, canRedo } = useUndo({
    nodes,
    edges,
    onUndoRedo: (state: UndoRedoEvent) => {
      console.log('Undo / Redo', state);
      // Note: This is where YOUR state comes into play
      setEdges(state.edges);
      setNodes(state.nodes);
    }
  });

  return <Canvas nodes={nodes} edges={edges} />;
}
`})}),`
`,n.jsxs(e.p,{children:["The ",n.jsx(e.code,{children:"UndoRedoEvent"})," interface looks like:"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-ts",children:`export interface UndoRedoEvent {
  /**
   * Updated node datas.
   */
  nodes?: NodeData[];

  /**
   * Updated edge datas.
   */
  edges?: EdgeData[];

  /**
   * Type of change.
   */
  type: 'undo' | 'redo' | 'clear';

  /**
   * Whether you can undo now.
   */
  canUndo: boolean;

  /**
   * Whether you can redo now.
   */
  canRedo: boolean;
}
`})}),`
`,n.jsxs(e.p,{children:["Now anytime you make a change to the ",n.jsx(e.code,{children:"nodes"})," or ",n.jsx(e.code,{children:"edges"}),` the
hook will update the internal history and then you can
call `,n.jsx(e.code,{children:"undo"})," or ",n.jsx(e.code,{children:"redo"})," functions to retrieve those states."]}),`
`,n.jsx(e.p,{children:"The hook returns other properties such as:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-ts",children:`export interface UndoResult {
  /**
   * Can undo or not.
   */
  canUndo: boolean;

  /**
   * Can redo or not.
   */
  canRedo: boolean;

  /**
   * Count of existing changes.
   */
  count: () => number;

  /**
   * Clear state and save first element of new state.
   */
  clear: (nodes: NodeData[]; edges: EdgeData[]) => void;

  /**
   * Get history of state.
   */
  history: () => { nodes: NodeData[]; edges: EdgeData[] }[];

  /**
   * Perform an redo.
   */
  redo: () => void;

  /**
   * Perform a undo.
   */
  undo: () => void;
}
`})})]})}function f(o={}){const{wrapper:e}=Object.assign({},s(),o.components);return e?n.jsx(e,Object.assign({},o,{children:n.jsx(t,o)})):t(o)}export{f as default};
