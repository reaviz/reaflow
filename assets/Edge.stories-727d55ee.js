import{j as o}from"./jsx-runtime-9c4ae004.js";import{r as i}from"./index-1b03fe98.js";import{C as r,N as h,E as u,M as Z,a as ee,I as oe,L as te,P as ne,R as se,A as C}from"./Icon-0f63e463.js";import"./IntersectionQuery-f6c749c2.js";import{u as X,r as Y}from"./crudHelpers-031fd461.js";import"./index-6fd5a17b.js";import"./index-4b095e7f.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";const pe={title:"Demos/Edges",component:r,subcomponents:{Node:h,Edge:u,MarkerArrow:Z,Arrow:ee,Icon:oe,Label:te,Port:ne,Remove:se,Add:C}},m=()=>{const[n,s]=i.useState([{id:"1",text:"Node 1"},{id:"2",text:"Node 2"}]),[a,g]=i.useState([{id:"1-2",from:"1",to:"2"}]);return o.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:o.jsx(r,{nodes:n,edges:a,edge:o.jsx(u,{add:o.jsx(C,{hidden:!1}),onAdd:(l,c)=>{const e=`node-${Math.random()}`,d=X(n,a,c,{id:e,text:e});s(d.nodes),g(d.edges)}}),onLayoutChange:l=>console.log("Layout",l)})})},p=()=>{const[n,s]=i.useState([{id:"1",text:"Node 1"},{id:"2",text:"Node 2"}]),[a,g]=i.useState([{id:"1-2",from:"1",to:"2"}]);return o.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:o.jsx(r,{nodes:n,edges:a,edge:o.jsx(u,{add:o.jsx(C,{hidden:!1}),upsertable:!1,onAdd:(l,c)=>{const e=`node-${Math.random()}`,d=X(n,a,c,{id:e,text:e});s(d.nodes),g(d.edges)}}),onLayoutChange:l=>console.log("Layout",l)})})},v=()=>{const[n]=i.useState([{id:"1",text:"Node 1"},{id:"2",text:"Node 2"}]),[s]=i.useState([{id:"1-2",from:"1",to:"2"}]);return o.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:o.jsx(r,{nodes:n,edges:s,edge:o.jsx(u,{selectable:!1}),onLayoutChange:a=>console.log("Layout",a)})})},N=()=>{const[n,s]=i.useState(["1","1-2"]),[a,g]=i.useState([{id:"1",text:"Node 1"},{id:"2",text:"Node 2"},{id:"3",text:"Node 3"}]),[l,c]=i.useState([{id:"1-2",from:"1",to:"2"},{id:"2-3",from:"2",to:"3"}]);return o.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:o.jsx(r,{nodes:a,edges:l,selections:n,node:o.jsx(h,{onClick:(e,t)=>{console.log("Selecting Node",e,t),s([t.id])},onRemove:(e,t)=>{console.log("Removing Node",e,t);const d=Y(a,l,t);c(d.edges),g(d.nodes),s([])}}),edge:o.jsx(u,{onClick:(e,t)=>{console.log("Selecting Edge",e,t),s([t.id])},onRemove:(e,t)=>{console.log("Removing Edge",e,t),c(l.filter(d=>d.id!==t.id)),s([])}}),onCanvasClick:e=>{console.log("Canvas Clicked",e),s([])},onLayoutChange:e=>console.log("Layout",e)})})},x=()=>{const[n,s]=i.useState(["1-2"]),[a,g]=i.useState([{id:"1",text:"Node 1"},{id:"2",text:"Node 2"},{id:"3",text:"Node 3"}]),[l,c]=i.useState([{id:"1-2",from:"1",to:"2"},{id:"2-3",from:"2",to:"3"}]);return o.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:o.jsx(r,{nodes:a,edges:l,selections:n,node:o.jsx(h,{removable:!1,onClick:(e,t)=>{console.log("Selecting Node",e,t),s([t.id])},onRemove:(e,t)=>{console.log("Removing Node",e,t);const d=Y(a,l,t);c(d.edges),g(d.nodes),s([])}}),edge:o.jsx(u,{removable:!1,onClick:(e,t)=>{console.log("Selecting Edge",e,t),s([t.id])},onRemove:(e,t)=>{console.log("Removing Edge",e,t),c(l.filter(d=>d.id!==t.id)),s([])}}),onCanvasClick:e=>{console.log("Canvas Clicked",e),s([])},onLayoutChange:e=>console.log("Layout",e)})})},y=()=>o.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:o.jsx(r,{arrow:null,nodes:[{id:"1",text:"1"},{id:"2",text:"2"},{id:"3",text:"3"}],edges:[{id:"1-2",from:"1",to:"2",selectionDisabled:!0},{id:"2-3",from:"2",to:"3",disabled:!0},{id:"1-3",from:"1",to:"3"}],onLayoutChange:n=>console.log("Layout",n)})}),b=()=>o.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:o.jsx(r,{arrow:null,nodes:[{id:"1",text:"1"},{id:"2",text:"2"}],edges:[{id:"1-2",from:"1",to:"2"}],onLayoutChange:n=>console.log("Layout",n)})}),f=()=>o.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:o.jsx(r,{nodes:[{id:"1",text:"Node 1"},{id:"2",text:"Node 2"}],edges:[],onLayoutChange:n=>console.log("Layout",n)})}),S=()=>o.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:o.jsx(r,{nodes:[{id:"1",text:"Node 1"},{id:"2",text:"Node 2"}],edges:[{id:"1-2",from:"1",to:"2",text:"Label 1-2"}],onLayoutChange:n=>console.log("Layout",n)})});var L,E,j;m.parameters={...m.parameters,docs:{...(L=m.parameters)==null?void 0:L.docs,source:{originalSource:`() => {
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
  return <div style={{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }}>
      <Canvas nodes={nodes} edges={edges} edge={<Edge add={<Add hidden={false} />} onAdd={(event, edge) => {
      const id = \`node-\${Math.random()}\`;
      const newNode = {
        id,
        text: id
      };
      const results = upsertNode(nodes, edges, edge, newNode);
      setNodes(results.nodes);
      setEdges(results.edges);
    }} />} onLayoutChange={layout => console.log('Layout', layout)} />
    </div>;
}`,...(j=(E=m.parameters)==null?void 0:E.docs)==null?void 0:j.source}}};var R,k,A;p.parameters={...p.parameters,docs:{...(R=p.parameters)==null?void 0:R.docs,source:{originalSource:`() => {
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
  return <div style={{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }}>
      <Canvas nodes={nodes} edges={edges} edge={<Edge add={<Add hidden={false} />} upsertable={false} onAdd={(event, edge) => {
      const id = \`node-\${Math.random()}\`;
      const newNode = {
        id,
        text: id
      };
      const results = upsertNode(nodes, edges, edge, newNode);
      setNodes(results.nodes);
      setEdges(results.edges);
    }} />} onLayoutChange={layout => console.log('Layout', layout)} />
    </div>;
}`,...(A=(k=p.parameters)==null?void 0:k.docs)==null?void 0:A.source}}};var w,D,M;v.parameters={...v.parameters,docs:{...(w=v.parameters)==null?void 0:w.docs,source:{originalSource:`() => {
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
      <Canvas nodes={nodes} edges={edges} edge={<Edge selectable={false} />} onLayoutChange={layout => console.log('Layout', layout)} />
    </div>;
}`,...(M=(D=v.parameters)==null?void 0:D.docs)==null?void 0:M.source}}};var U,$,_;N.parameters={...N.parameters,docs:{...(U=N.parameters)==null?void 0:U.docs,source:{originalSource:`() => {
  const [selections, setSelections] = useState<string[]>(['1', '1-2']);
  const [nodes, setNodes] = useState<NodeData[]>([{
    id: '1',
    text: 'Node 1'
  }, {
    id: '2',
    text: 'Node 2'
  }, {
    id: '3',
    text: 'Node 3'
  }]);
  const [edges, setEdges] = useState<EdgeData[]>([{
    id: '1-2',
    from: '1',
    to: '2'
  }, {
    id: '2-3',
    from: '2',
    to: '3'
  }]);
  return <div style={{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }}>
      <Canvas nodes={nodes} edges={edges} selections={selections} node={<Node onClick={(event, node) => {
      console.log('Selecting Node', event, node);
      setSelections([node.id]);
    }} onRemove={(event, node) => {
      console.log('Removing Node', event, node);
      const result = removeAndUpsertNodes(nodes, edges, node);
      setEdges(result.edges);
      setNodes(result.nodes);
      setSelections([]);
    }} />} edge={<Edge onClick={(event, edge) => {
      console.log('Selecting Edge', event, edge);
      setSelections([edge.id]);
    }} onRemove={(event, edge) => {
      console.log('Removing Edge', event, edge);
      setEdges(edges.filter(e => e.id !== edge.id));
      setSelections([]);
    }} />} onCanvasClick={event => {
      console.log('Canvas Clicked', event);
      setSelections([]);
    }} onLayoutChange={layout => console.log('Layout', layout)} />
    </div>;
}`,...(_=($=N.parameters)==null?void 0:$.docs)==null?void 0:_.source}}};var I,P,O;x.parameters={...x.parameters,docs:{...(I=x.parameters)==null?void 0:I.docs,source:{originalSource:`() => {
  const [selections, setSelections] = useState<string[]>(['1-2']);
  const [nodes, setNodes] = useState<NodeData[]>([{
    id: '1',
    text: 'Node 1'
  }, {
    id: '2',
    text: 'Node 2'
  }, {
    id: '3',
    text: 'Node 3'
  }]);
  const [edges, setEdges] = useState<EdgeData[]>([{
    id: '1-2',
    from: '1',
    to: '2'
  }, {
    id: '2-3',
    from: '2',
    to: '3'
  }]);
  return <div style={{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }}>
      <Canvas nodes={nodes} edges={edges} selections={selections} node={<Node removable={false} onClick={(event, node) => {
      console.log('Selecting Node', event, node);
      setSelections([node.id]);
    }} onRemove={(event, node) => {
      console.log('Removing Node', event, node);
      const result = removeAndUpsertNodes(nodes, edges, node);
      setEdges(result.edges);
      setNodes(result.nodes);
      setSelections([]);
    }} />} edge={<Edge removable={false} onClick={(event, edge) => {
      console.log('Selecting Edge', event, edge);
      setSelections([edge.id]);
    }} onRemove={(event, edge) => {
      console.log('Removing Edge', event, edge);
      setEdges(edges.filter(e => e.id !== edge.id));
      setSelections([]);
    }} />} onCanvasClick={event => {
      console.log('Canvas Clicked', event);
      setSelections([]);
    }} onLayoutChange={layout => console.log('Layout', layout)} />
    </div>;
}`,...(O=(P=x.parameters)==null?void 0:P.docs)==null?void 0:O.source}}};var q,z,B;y.parameters={...y.parameters,docs:{...(q=y.parameters)==null?void 0:q.docs,source:{originalSource:`() => <div style={{
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}}>
    <Canvas arrow={null} nodes={[{
    id: '1',
    text: '1'
  }, {
    id: '2',
    text: '2'
  }, {
    id: '3',
    text: '3'
  }]} edges={[{
    id: '1-2',
    from: '1',
    to: '2',
    selectionDisabled: true
  }, {
    id: '2-3',
    from: '2',
    to: '3',
    disabled: true
  }, {
    id: '1-3',
    from: '1',
    to: '3'
  }]} onLayoutChange={layout => console.log('Layout', layout)} />
  </div>`,...(B=(z=y.parameters)==null?void 0:z.docs)==null?void 0:B.source}}};var F,G,H;b.parameters={...b.parameters,docs:{...(F=b.parameters)==null?void 0:F.docs,source:{originalSource:`() => <div style={{
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}}>
    <Canvas arrow={null} nodes={[{
    id: '1',
    text: '1'
  }, {
    id: '2',
    text: '2'
  }]} edges={[{
    id: '1-2',
    from: '1',
    to: '2'
  }]} onLayoutChange={layout => console.log('Layout', layout)} />
  </div>`,...(H=(G=b.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};var J,K,Q;f.parameters={...f.parameters,docs:{...(J=f.parameters)==null?void 0:J.docs,source:{originalSource:`() => <div style={{
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}}>
    <Canvas nodes={[{
    id: '1',
    text: 'Node 1'
  }, {
    id: '2',
    text: 'Node 2'
  }]} edges={[]} onLayoutChange={layout => console.log('Layout', layout)} />
  </div>`,...(Q=(K=f.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var T,V,W;S.parameters={...S.parameters,docs:{...(T=S.parameters)==null?void 0:T.docs,source:{originalSource:`() => <div style={{
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}}>
    <Canvas nodes={[{
    id: '1',
    text: 'Node 1'
  }, {
    id: '2',
    text: 'Node 2'
  }]} edges={[{
    id: '1-2',
    from: '1',
    to: '2',
    text: 'Label 1-2'
  }]} onLayoutChange={layout => console.log('Layout', layout)} />
  </div>`,...(W=(V=S.parameters)==null?void 0:V.docs)==null?void 0:W.source}}};const ve=["Adding","NotUpsertable","NotSelectable","Removeable","NotRemoveable","Disabled","NoArrows","NoEdges","Labels"];export{m as Adding,y as Disabled,S as Labels,b as NoArrows,f as NoEdges,x as NotRemoveable,v as NotSelectable,p as NotUpsertable,N as Removeable,ve as __namedExportsOrder,pe as default};
