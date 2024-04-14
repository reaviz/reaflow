import{j as e}from"./jsx-runtime-9c4ae004.js";import"./blocks-2646952b.js";import{u as t}from"./index-2ef8b458.js";import{M as l}from"./index-6e044484.js";import"./index-1b03fe98.js";import"./iframe-5999dd3f.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./extends-20258d9b.js";import"./index-6fd5a17b.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function s(o){const n=Object.assign({h1:"h1",hr:"hr",p:"p",a:"a",h2:"h2",code:"code",pre:"pre",ul:"ul",li:"li"},t(),o.components);return e.jsxs(e.Fragment,{children:[e.jsx(l,{title:"Docs/Helpers/Selection"}),`
`,e.jsx(n.h1,{id:"selection",children:"Selection"}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.p,{children:[`Out of the box, reaflow supports selection handled either manually or
semi-automatic with hotkeys using a hook and `,e.jsx(n.a,{href:"https://github.com/reaviz/reakeys",target:"_blank",rel:"nofollow noopener noreferrer",children:"reakeys"}),"."]}),`
`,e.jsx(n.h2,{id:"selection-hook",children:"Selection Hook"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"useSelection"}),` hooks will automatically manage selection state and hotkeys
for you. To set it up, simply import the `,e.jsx(n.code,{children:"useSelection"}),` hook and pass the hook
the `,e.jsx(n.code,{children:"nodes"}),", ",e.jsx(n.code,{children:"edges"})," and any default selections you like."]}),`
`,e.jsx(n.p,{children:"The hook accepts the following:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`export interface SelectionProps {
  /**
   * Current selections.
   */
  selections?: string[];

  /**
   * Node datas.
   */
  nodes?: NodeData[];

  /**
   * Edge datas.
   */
  edges?: EdgeData[];

  /**
   * Hotkey types.
   */
  hotkeys?: HotkeyTypes[];

  /**
   * Disabled or not.
   */
  disabled?: boolean;

  /**
   * On selection change.
   */
  onSelection?: (value: string[]) => void;

  /**
   * On data change.
   */
  onDataChange?: (nodes: NodeData[], edges: EdgeData[]) => void;
}
`})}),`
`,e.jsx(n.p,{children:"and returns the following:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`export interface SelectionResult {
  /**
   * Selections id array.
   */
  selections: string[];

  /**
   * Clear selections method.
   */
  clearSelections: (value?: string[]) => void;

  /**
   * A selection method.
   */
  addSelection: (value: string) => void;

  /**
   * Remove selection method.
   */
  removeSelection: (value: string) => void;

  /**
   * Toggle existing selection on/off method.
   */
  toggleSelection: (value: string) => void;

  /**
   * Set internal selections.
   */
  setSelections: (value: string[]) => void;

  /**
   * On click event pass through.
   */
  onClick?: (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    data: any
  ) => void;

  /**
   * On canvas click event pass through.
   */
  onCanvasClick?: (event?: React.MouseEvent<SVGGElement, MouseEvent>) => void;

  /**
   * On keydown event pass through.
   */
  onKeyDown?: (event: React.KeyboardEvent<SVGGElement>) => void;
}
`})}),`
`,e.jsx(n.p,{children:"The hotkeys that are bound via this hook are:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"ctrl/meta + a"}),": Select all nodes"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"escape"}),": Defoucs selections"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"ctrl/meta + click"}),": Toggle node selection"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"backspace"}),": Remove selected nodes"]}),`
`]}),`
`,e.jsx(n.p,{children:"Below is a typical setup of where you define the selection hook."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`import { NodeData, EdgeData, useSelection } from 'reaflow';

const [nodes, setNodes] = useState<NodeData[]>([
  {
    id: '1',
    text: 'Node 1'
  },
  {
    id: '2',
    text: 'Node 2'
  }
]);

const [edges, setEdges] = useState<EdgeData[]>([
  {
    id: '1-2',
    from: '1',
    to: '2'
  }
]);

const { selections, onCanvasClick, onClick, onKeyDown, clearSelections } = useSelection({
  nodes,
  edges,
  onDataChange: (n, e) => {
    console.info('Data changed', n, e);
    setNodes(n);
    setEdges(e);
  },
  onSelection: (s) => {
    console.info('Selection', s);
  }
});
`})}),`
`,e.jsx(n.p,{children:"Once defined you can pass these onto the canvas like:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`<Canvas
  nodes={nodes}
  edges={edges}
  selections={selections}
  node={
    <Node
      onClick={onClick}
      onKeyDown={onKeyDown}
      onRemove={(event, node) => {
        const result = removeAndUpsertNodes(nodes, edges, node);
        setEdges(result.edges);
        setNodes(result.nodes);
        clearSelections();
      }}
    />
  }
  edge={
    <Edge
      onClick={onClick}
    />
  }
  onCanvasClick={onCanvasClick}
/>
`})}),`
`,e.jsxs(n.p,{children:["and the hook will handle setting the rest up for you. In the ",e.jsx(n.code,{children:"onSelection"}),`
block you can define custom rules for selection as well.`]}),`
`,e.jsx(n.h2,{id:"manual-selection-management",children:"Manual Selection Management"}),`
`,e.jsxs(n.p,{children:["If you don't wish to use the ",e.jsx(n.code,{children:"useSelection"}),` hook you can handle the selections
yourself manually. This is as simple as defining a state for the selections
and just passing it on.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { NodeData, EdgeData } from 'reaflow';

const [selections, setSelections] = useState<string[]>([]);

const [nodes] = useState<NodeData[]>([
  {
    id: '1',
    text: 'Node 1'
  },
  {
    id: '2',
    text: 'Node 2'
  }
]);

const [edges] = useState<EdgeData[]>([
  {
    id: '1-2',
    from: '1',
    to: '2'
  }
]);
`})}),`
`,e.jsx(n.p,{children:`then similar to how we passed the selections with the hook, we do the same
thing with the manual selection state.`}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`<Canvas
  nodes={nodes}
  edges={edges}
  selections={selections}
  node={
    <Node
      onClick={(event, node) => {
        console.log('Selecting Node', event, node);
        setSelections([node.id]);
      }}
    />
  }
  edge={
    <Edge
      onClick={(event, edge) => {
        console.log('Selecting Edge', event, edge);
        setSelections([edge.id]);
      }}
    />
  }
  onCanvasClick={(event) => {
    console.log('Canvas Clicked', event);
    setSelections([]);
  }}
  onLayoutChange={layout => console.log('Layout', layout)}
/>
`})})]})}function v(o={}){const{wrapper:n}=Object.assign({},t(),o.components);return n?e.jsx(n,Object.assign({},o,{children:e.jsx(s,o)})):s(o)}export{v as default};
