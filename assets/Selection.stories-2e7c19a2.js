import{j as s}from"./jsx-runtime-9c4ae004.js";import{r as C}from"./index-1b03fe98.js";import{C as m,N as S,E as k,M as G,a as Q,I as T,L as V,P as W,R as X,A as Y}from"./Icon-0f63e463.js";import{u as Z}from"./IntersectionQuery-f6c749c2.js";import{b as $,r as D}from"./crudHelpers-031fd461.js";import"./index-6fd5a17b.js";import"./index-4b095e7f.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";const E=({selections:d=[],nodes:c=[],edges:i=[],hotkeys:r=["selectAll","deselect","delete"],disabled:l,onSelection:o,onDataChange:a})=>{const[g,u]=C.useState(d),[e,n]=C.useState(!1),p=t=>{if(!l&&!g.includes(t)){const y=[...g,t];o==null||o(y),u(y)}},w=t=>{if(!l&&g.includes(t)){const y=g.filter(F=>F!==t);o==null||o(y),u(y)}},j=t=>{g.includes(t)?w(t):p(t)},x=(t=[])=>{l||(u(t),o==null||o(t))},q=(t,v)=>{t.preventDefault(),t.stopPropagation(),e?j(v.id):x([v.id]),n(!1)},z=t=>{t.preventDefault(),n(t.metaKey||t.ctrlKey)},B=()=>{x(),n(!1)};return Z([{name:"Select All",keys:"mod+a",disabled:!r.includes("selectAll"),category:"Canvas",description:"Select all nodes and edges",callback:t=>{if(t.preventDefault(),!l){const v=c.map(y=>y.id);a==null||a(c,i),o==null||o(v),u(v)}}},{name:"Delete Selections",category:"Canvas",disabled:!r.includes("delete"),description:"Delete selected nodes and edges",keys:"backspace",callback:t=>{if(!l){t.preventDefault();const v=$(c,i,g);a==null||a(v.nodes,v.edges),o==null||o([]),u([])}}},{name:"Deselect Selections",category:"Canvas",disabled:!r.includes("deselect"),description:"Deselect selected nodes and edges",keys:"escape",callback:t=>{l||(t.preventDefault(),o==null||o([]),u([]))}}]),{onClick:q,onKeyDown:z,onCanvasClick:B,selections:g,clearSelections:x,addSelection:p,removeSelection:w,toggleSelection:j,setSelections:u}},ae={title:"Demos/Selections",component:m,subcomponents:{Node:S,Edge:k,MarkerArrow:G,Arrow:Q,Icon:T,Label:V,Port:W,Remove:X,Add:Y}},h=()=>{const[d,c]=C.useState([{id:"1",text:"Node 1"},{id:"2",text:"Node 2"}]),[i,r]=C.useState([{id:"1-2",from:"1",to:"2"}]),{selections:l,onCanvasClick:o,onClick:a,onKeyDown:g,clearSelections:u}=E({nodes:d,edges:i,onDataChange:(e,n)=>{console.info("Data changed",e,n),c(e),r(n)},onSelection:e=>{console.info("Selection",e)}});return s.jsxs("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:[s.jsxs("pre",{style:{position:"absolute",bottom:15,right:15,background:"rgba(0, 0, 0, .5)",padding:20,color:"white"},children:[s.jsx("h3",{style:{padding:0,margin:0},children:"Selections"}),s.jsx("code",{children:JSON.stringify(l,null,2)})]}),s.jsx(m,{nodes:d,edges:i,selections:l,node:s.jsx(S,{onClick:(e,n)=>{console.log("Selecting Node",e,n),a(e,n)},onKeyDown:(e,n)=>{console.log("Keydown Event",n,e),g(e)},onRemove:(e,n)=>{const p=D(d,i,n);r(p.edges),c(p.nodes),u()}}),edge:s.jsx(k,{onClick:(e,n)=>{console.log("Selecting Edge",e,n),a(e,n)}}),onCanvasClick:e=>{console.log("Canvas Clicked",e),o()},onLayoutChange:e=>console.log("Layout",e)})]})},f=()=>{const[d,c]=C.useState([{id:"1",text:"Node 1"},{id:"3",text:"Node 2",parent:"1"},{id:"2",text:"Node 2"}]),[i,r]=C.useState([{id:"1-2",from:"1",to:"2"}]),{selections:l,onCanvasClick:o,onClick:a,onKeyDown:g,clearSelections:u}=E({nodes:d,edges:i,onDataChange:(e,n)=>{console.info("Data changed",e,n),c(e),r(n)},onSelection:e=>{console.info("Selection",e)}});return s.jsxs("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:[s.jsxs("pre",{style:{position:"absolute",bottom:15,right:15,background:"rgba(0, 0, 0, .5)",padding:20,color:"white"},children:[s.jsx("h3",{style:{padding:0,margin:0},children:"Selections"}),s.jsx("code",{children:JSON.stringify(l,null,2)})]}),s.jsx(m,{nodes:d,edges:i,selections:l,node:s.jsx(S,{onClick:(e,n)=>{console.log("Selecting Node",e,n),a(e,n)},onKeyDown:(e,n)=>{console.log("Keydown Event",n,e),g(e)},onRemove:(e,n)=>{const p=D(d,i,n);r(p.edges),c(p.nodes),u()}}),edge:s.jsx(k,{onClick:(e,n)=>{console.log("Selecting Edge",e,n),a(e,n)}}),onCanvasClick:e=>{console.log("Canvas Clicked",e),o()},onLayoutChange:e=>console.log("Layout",e)})]})},N=()=>{const[d,c]=C.useState([{id:"1",text:"Node 1"},{id:"2",text:"Node 2"}]),[i,r]=C.useState([{id:"1-2",from:"1",to:"2"}]),{selections:l,onCanvasClick:o,onClick:a,onKeyDown:g,clearSelections:u}=E({nodes:d,edges:i,selections:["1"],onDataChange:(e,n)=>{console.info("Data changed",e,n),c(e),r(n)},onSelection:e=>{console.info("Selection",e)}});return s.jsxs("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:[s.jsxs("pre",{style:{position:"absolute",bottom:15,right:15,background:"rgba(0, 0, 0, .5)",padding:20,color:"white"},children:[s.jsx("h3",{style:{padding:0,margin:0},children:"Selections"}),s.jsx("code",{children:JSON.stringify(l,null,2)})]}),s.jsx(m,{nodes:d,edges:i,selections:l,node:s.jsx(S,{onClick:(e,n)=>{console.log("Selecting Node",e,n),a(e,n)},onKeyDown:(e,n)=>{console.log("Keydown Event",n,e),g(e)},onRemove:(e,n)=>{const p=D(d,i,n);r(p.edges),c(p.nodes),u()}}),edge:s.jsx(k,{onClick:(e,n)=>{console.log("Selecting Edge",e,n),a(e,n)}}),onCanvasClick:e=>{console.log("Canvas Clicked",e),o()},onLayoutChange:e=>console.log("Layout",e)})]})},b=()=>{const[d,c]=C.useState([]),[i]=C.useState([{id:"1",text:"Node 1"},{id:"2",text:"Node 2"}]),[r]=C.useState([{id:"1-2",from:"1",to:"2"}]);return s.jsxs("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:[s.jsxs("pre",{style:{position:"absolute",bottom:15,right:15,background:"rgba(0, 0, 0, .5)",padding:20,color:"white"},children:[s.jsx("h3",{style:{padding:0,margin:0},children:"Selections"}),s.jsx("code",{children:JSON.stringify(d,null,2)})]}),s.jsx(m,{nodes:i,edges:r,selections:d,node:s.jsx(S,{onClick:(l,o)=>{console.log("Selecting Node",l,o),c([...d,o.id])}}),edge:s.jsx(k,{onClick:(l,o)=>{console.log("Selecting Edge",l,o),c([...d,o.id])}}),onCanvasClick:l=>{console.log("Canvas Clicked",l),c([])},onLayoutChange:l=>console.log("Layout",l)})]})};var K,L,A;h.parameters={...h.parameters,docs:{...(K=h.parameters)==null?void 0:K.docs,source:{originalSource:`() => {
  const [nodes, setNodes] = useState<NodeData[]>([{
    id: '1',
    text: 'Node 1'
  }, {
    id: '2',
    text: 'Node 2'
  }]);
  const [edges, setEdges] = useState<EdgeData[]>([{
    id: '1-2',
    from: '1',
    to: '2'
  }]);
  const {
    selections,
    onCanvasClick,
    onClick,
    onKeyDown,
    clearSelections
  } = useSelection({
    nodes,
    edges,
    onDataChange: (n, e) => {
      console.info('Data changed', n, e);
      setNodes(n);
      setEdges(e);
    },
    onSelection: s => {
      console.info('Selection', s);
    }
  });
  return <div style={{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }}>
      <pre style={{
      position: 'absolute',
      bottom: 15,
      right: 15,
      background: 'rgba(0, 0, 0, .5)',
      padding: 20,
      color: 'white'
    }}>
        <h3 style={{
        padding: 0,
        margin: 0
      }}>Selections</h3>
        <code>
          {JSON.stringify(selections, null, 2)}
        </code>
      </pre>
      <Canvas nodes={nodes} edges={edges} selections={selections} node={<Node onClick={(event, node) => {
      console.log('Selecting Node', event, node);
      onClick(event, node);
    }} onKeyDown={(event, node) => {
      console.log('Keydown Event', node, event);
      onKeyDown(event);
    }} onRemove={(event, node) => {
      const result = removeAndUpsertNodes(nodes, edges, node);
      setEdges(result.edges);
      setNodes(result.nodes);
      clearSelections();
    }} />} edge={<Edge onClick={(event, edge) => {
      console.log('Selecting Edge', event, edge);
      onClick(event, edge);
    }} />} onCanvasClick={event => {
      console.log('Canvas Clicked', event);
      onCanvasClick();
    }} onLayoutChange={layout => console.log('Layout', layout)} />
    </div>;
}`,...(A=(L=h.parameters)==null?void 0:L.docs)==null?void 0:A.source}}};var O,R,J;f.parameters={...f.parameters,docs:{...(O=f.parameters)==null?void 0:O.docs,source:{originalSource:`() => {
  const [nodes, setNodes] = useState<NodeData[]>([{
    id: '1',
    text: 'Node 1'
  }, {
    id: '3',
    text: 'Node 2',
    parent: '1'
  }, {
    id: '2',
    text: 'Node 2'
  }]);
  const [edges, setEdges] = useState<EdgeData[]>([{
    id: '1-2',
    from: '1',
    to: '2'
  }]);
  const {
    selections,
    onCanvasClick,
    onClick,
    onKeyDown,
    clearSelections
  } = useSelection({
    nodes,
    edges,
    onDataChange: (n, e) => {
      console.info('Data changed', n, e);
      setNodes(n);
      setEdges(e);
    },
    onSelection: s => {
      console.info('Selection', s);
    }
  });
  return <div style={{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }}>
      <pre style={{
      position: 'absolute',
      bottom: 15,
      right: 15,
      background: 'rgba(0, 0, 0, .5)',
      padding: 20,
      color: 'white'
    }}>
        <h3 style={{
        padding: 0,
        margin: 0
      }}>Selections</h3>
        <code>
          {JSON.stringify(selections, null, 2)}
        </code>
      </pre>
      <Canvas nodes={nodes} edges={edges} selections={selections} node={<Node onClick={(event, node) => {
      console.log('Selecting Node', event, node);
      onClick(event, node);
    }} onKeyDown={(event, node) => {
      console.log('Keydown Event', node, event);
      onKeyDown(event);
    }} onRemove={(event, node) => {
      const result = removeAndUpsertNodes(nodes, edges, node);
      setEdges(result.edges);
      setNodes(result.nodes);
      clearSelections();
    }} />} edge={<Edge onClick={(event, edge) => {
      console.log('Selecting Edge', event, edge);
      onClick(event, edge);
    }} />} onCanvasClick={event => {
      console.log('Canvas Clicked', event);
      onCanvasClick();
    }} onLayoutChange={layout => console.log('Layout', layout)} />
    </div>;
}`,...(J=(R=f.parameters)==null?void 0:R.docs)==null?void 0:J.source}}};var M,U,I;N.parameters={...N.parameters,docs:{...(M=N.parameters)==null?void 0:M.docs,source:{originalSource:`() => {
  const [nodes, setNodes] = useState<NodeData[]>([{
    id: '1',
    text: 'Node 1'
  }, {
    id: '2',
    text: 'Node 2'
  }]);
  const [edges, setEdges] = useState<EdgeData[]>([{
    id: '1-2',
    from: '1',
    to: '2'
  }]);
  const {
    selections,
    onCanvasClick,
    onClick,
    onKeyDown,
    clearSelections
  } = useSelection({
    nodes,
    edges,
    selections: ['1'],
    onDataChange: (n, e) => {
      console.info('Data changed', n, e);
      setNodes(n);
      setEdges(e);
    },
    onSelection: s => {
      console.info('Selection', s);
    }
  });
  return <div style={{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }}>
      <pre style={{
      position: 'absolute',
      bottom: 15,
      right: 15,
      background: 'rgba(0, 0, 0, .5)',
      padding: 20,
      color: 'white'
    }}>
        <h3 style={{
        padding: 0,
        margin: 0
      }}>Selections</h3>
        <code>
          {JSON.stringify(selections, null, 2)}
        </code>
      </pre>
      <Canvas nodes={nodes} edges={edges} selections={selections} node={<Node onClick={(event, node) => {
      console.log('Selecting Node', event, node);
      onClick(event, node);
    }} onKeyDown={(event, node) => {
      console.log('Keydown Event', node, event);
      onKeyDown(event);
    }} onRemove={(event, node) => {
      const result = removeAndUpsertNodes(nodes, edges, node);
      setEdges(result.edges);
      setNodes(result.nodes);
      clearSelections();
    }} />} edge={<Edge onClick={(event, edge) => {
      console.log('Selecting Edge', event, edge);
      onClick(event, edge);
    }} />} onCanvasClick={event => {
      console.log('Canvas Clicked', event);
      onCanvasClick();
    }} onLayoutChange={layout => console.log('Layout', layout)} />
    </div>;
}`,...(I=(U=N.parameters)==null?void 0:U.docs)==null?void 0:I.source}}};var P,_,H;b.parameters={...b.parameters,docs:{...(P=b.parameters)==null?void 0:P.docs,source:{originalSource:`() => {
  const [selections, setSelections] = useState<string[]>([]);
  const [nodes] = useState<NodeData[]>([{
    id: '1',
    text: 'Node 1'
  }, {
    id: '2',
    text: 'Node 2'
  }]);
  const [edges] = useState<EdgeData[]>([{
    id: '1-2',
    from: '1',
    to: '2'
  }]);
  return <div style={{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }}>
      <pre style={{
      position: 'absolute',
      bottom: 15,
      right: 15,
      background: 'rgba(0, 0, 0, .5)',
      padding: 20,
      color: 'white'
    }}>
        <h3 style={{
        padding: 0,
        margin: 0
      }}>Selections</h3>
        <code>
          {JSON.stringify(selections, null, 2)}
        </code>
      </pre>
      <Canvas nodes={nodes} edges={edges} selections={selections} node={<Node onClick={(event, node) => {
      console.log('Selecting Node', event, node);
      setSelections([...selections, node.id]);
    }} />} edge={<Edge onClick={(event, edge) => {
      console.log('Selecting Edge', event, edge);
      setSelections([...selections, edge.id]);
    }} />} onCanvasClick={event => {
      console.log('Canvas Clicked', event);
      setSelections([]);
    }} onLayoutChange={layout => console.log('Layout', layout)} />
    </div>;
}`,...(H=(_=b.parameters)==null?void 0:_.docs)==null?void 0:H.source}}};const re=["Simple","Nested","Defaults","ManualSelection"];export{N as Defaults,b as ManualSelection,f as Nested,h as Simple,re as __namedExportsOrder,ae as default};
