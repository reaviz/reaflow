import{j as n}from"./jsx-runtime-9c4ae004.js";import{r as y}from"./index-1b03fe98.js";import{C as t,N as i,E as s,M as V,a as X,I as ne,L as C,P as v,R as Y,A as oe,b as te}from"./Icon-0f63e463.js";import"./IntersectionQuery-f6c749c2.js";import{c as de}from"./crudHelpers-031fd461.js";import{h as re,d as ie}from"./graphHelpers-fa49f917.js";import"./index-6fd5a17b.js";import"./index-4b095e7f.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";const he={title:"Demos/Basic",component:t,subcomponents:{Node:i,Edge:s,MarkerArrow:V,Arrow:X,Icon:ne,Label:C,Port:v,Remove:Y,Add:oe}},l=()=>n.jsx("div",{style:{height:500},children:n.jsx(t,{nodes:[{id:"1",text:"1"},{id:"2",text:"2"}],edges:[{id:"1-2",from:"1",to:"2"}],onLayoutChange:e=>console.log("Layout",e)})}),g=()=>n.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:n.jsx(t,{animated:!1,nodes:[{id:"1",text:"1"},{id:"2",text:"2"}],edges:[{id:"1-2",from:"1",to:"2"}],onLayoutChange:e=>console.log("Layout",e)})}),m=()=>n.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:n.jsx(t,{readonly:!0,nodes:[{id:"1",text:"1"},{id:"2",text:"2"}],edges:[{id:"1-2",from:"1",to:"2"}],onLayoutChange:e=>console.log("Layout",e)})}),c=()=>n.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:n.jsx(t,{disabled:!0,nodes:[{id:"1",text:"Node 1"},{id:"2",text:"Node 2"}],edges:[{id:"1-2",from:"1",to:"2"}],onLayoutChange:e=>console.log("Layout",e)})}),f=()=>n.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:n.jsx(t,{nodes:[{id:"2",text:"Mother",data:{gender:"female"}},{id:"3",text:"Daughter",data:{gender:"female"}},{id:"4",text:"Son",data:{gender:"male"}}],edges:[{id:"2-3",from:"2",to:"3"},{id:"2-4",from:"2",to:"4"}],node:e=>{var o;return n.jsx(i,{...e,onClick:()=>console.log(e.properties.data),style:{fill:((o=e.properties.data)==null?void 0:o.gender)==="male"?"blue":"red"}})},edge:e=>n.jsx(s,{...e,style:{stroke:e.id==="2-4"?"blue":"red"}}),onLayoutChange:e=>console.log("Layout",e)})}),u=()=>{const e=y.useRef(null);return y.useEffect(()=>{console.log("Reference:",e)},[e]),n.jsxs("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:[n.jsx("button",{style:{position:"absolute",top:10,left:10,zIndex:999},onClick:()=>{var o;return(o=e.current)==null?void 0:o.positionCanvas(te.CENTER)},children:"Center"}),n.jsx(t,{ref:e,nodes:[{id:"1",text:"Node 1"},{id:"2",text:"Node 2"}],edges:[{id:"1-2",from:"1",to:"2"}],onLayoutChange:o=>console.log("Layout",o)})]})},x=()=>n.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:n.jsx(t,{nodes:[{id:"1",text:"Node 1"},{id:"2",text:"Node 2"}],edges:[{id:"1-2",from:"1",to:"2"}],node:n.jsx(i,{port:n.jsx(v,{onEnter:(e,o)=>{console.log("Enter Port",e,o)},onLeave:(e,o)=>{console.log("Leave Port",e,o)}}),onEnter:(e,o)=>{console.log("Enter Node",e,o)},onLeave:(e,o)=>{console.log("Leave Node",e,o)},onKeyDown:(e,o)=>{console.log("Keydown Node",e,o)},onClick:(e,o)=>{console.log("Selecting Node",e,o)},onRemove:(e,o)=>{console.log("Remove Node",e,o)}}),edge:n.jsx(s,{onEnter:(e,o)=>{console.log("Enter Edge",e,o)},onLeave:(e,o)=>{console.log("Leave Edge",e,o)},onKeyDown:(e,o)=>{console.log("Keydown Edge",e,o)},onClick:(e,o)=>{console.log("Selecting Edge",e,o)},onRemove:(e,o)=>{console.log("Removing Edge",e,o)}}),onCanvasClick:e=>{console.log("Canvas Clicked",e)},onLayoutChange:e=>console.log("Layout",e)})}),p=()=>n.jsxs("div",{style:{border:"solid 1px #12131e",height:500,width:700},children:[n.jsx("style",{children:`
        body #root > div {
          background-color: white;
          background-image: -webkit-repeating-radial-gradient(top center,rgba(0,0,0,.2),rgba(0,0,0,.2) 1px,transparent 0,transparent 100%);
        }
        .edge {
          stroke: #b1b1b7;
          stroke-dasharray: 5;
          animation: dashdraw .5s linear infinite;
          stroke-width: 1;
        }
        @keyframes dashdraw {
          0% { stroke-dashoffset: 10; }
        }
      `}),n.jsx(t,{className:"canvas",nodes:[{id:"1",text:"Node 1",ports:[{id:"1-from",width:10,height:10,side:"SOUTH"},{id:"1-to",width:10,height:10,side:"NORTH",hidden:!0}]},{id:"2",text:"Node 2",ports:[{id:"2-from",width:10,height:10,side:"SOUTH"},{id:"2-to",width:10,height:10,side:"NORTH",hidden:!0}]},{id:"3",text:"Node 3",ports:[{id:"3-from",width:10,height:10,side:"SOUTH"},{id:"3-to",width:10,height:10,side:"NORTH",hidden:!0}]}],edges:[{id:"1-2",from:"1",to:"2",fromPort:"1-from",toPort:"2-to"},{id:"1-3",from:"1",to:"3",fromPort:"1-from",toPort:"3-to"}],node:n.jsx(i,{style:{stroke:"#1a192b",fill:"white",strokeWidth:1},label:n.jsx(C,{style:{fill:"black"}}),port:n.jsx(v,{style:{fill:"blue",stroke:"white"},rx:10,ry:10})}),arrow:n.jsx(V,{style:{fill:"#b1b1b7"}}),edge:n.jsx(s,{className:"edge"}),onLayoutChange:e=>console.log("Layout",e)})]}),h=()=>{const[e,o]=y.useState([{id:"1",text:"1"},{id:"2",text:"2"},{id:"3",text:"3"},{id:"4",text:"4"},{id:"5",text:"5"},{id:"6",text:"6"},{id:"7",text:"7"},{id:"8",text:"8"},{id:"9",text:"9"},{id:"10",text:"10"},{id:"11",text:"11"},{id:"12",text:"12"},{id:"13",text:"13"},{id:"14",text:"14"},{id:"15",text:"15"},{id:"16",text:"16"},{id:"17",text:"17"},{id:"18",text:"18"},{id:"19",text:"19"},{id:"20",text:"20"},{id:"21",text:"21"},{id:"22",text:"22"},{id:"23",text:"23"},{id:"24",text:"24"},{id:"25",text:"25"},{id:"26",text:"26"},{id:"27",text:"27"},{id:"28",text:"28"},{id:"29",text:"29"},{id:"30",text:"30"}]),[a,Z]=y.useState([{id:"1-2",from:"1",to:"2"},{id:"1-3",from:"1",to:"3"},{id:"1-4",from:"1",to:"4"},{id:"1-5",from:"1",to:"5"},{id:"1-6",from:"1",to:"6"},{id:"1-7",from:"1",to:"7"},{id:"2-8",from:"2",to:"8"},{id:"2-9",from:"2",to:"9"},{id:"2-10",from:"2",to:"10"},{id:"2-11",from:"2",to:"11"},{id:"2-12",from:"2",to:"12"},{id:"2-13",from:"2",to:"13"},{id:"3-14",from:"3",to:"14"},{id:"3-15",from:"3",to:"15"},{id:"3-16",from:"3",to:"16"},{id:"3-17",from:"3",to:"17"},{id:"3-18",from:"3",to:"18"},{id:"3-19",from:"3",to:"19"},{id:"3-20",from:"3",to:"20"},{id:"10-21",from:"10",to:"21"},{id:"10-22",from:"10",to:"22"},{id:"10-23",from:"10",to:"23"},{id:"10-24",from:"10",to:"24"},{id:"10-25",from:"10",to:"25"},{id:"17-26",from:"17",to:"26"},{id:"17-27",from:"17",to:"27"},{id:"17-28",from:"17",to:"28"},{id:"17-29",from:"17",to:"29"},{id:"17-30",from:"17",to:"30"}]);return n.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:n.jsx(t,{nodes:e,edges:a,onMouseEnter:()=>{},onMouseLeave:()=>{},onCanvasClick:()=>{},dragNode:null,dragEdge:null,arrow:n.jsx(X,{}),node:n.jsx(i,{dragType:"node",remove:n.jsx(Y,{}),port:n.jsx(v,{}),label:n.jsx(C,{})}),edge:n.jsx(s,{}),onLayoutChange:b=>console.log("Layout",b),onNodeLink:(b,d,r)=>{const $=a.filter(ee=>ee.to!==d.id);Z([...$,de(r,d)])},onNodeLinkCheck:(b,d,r)=>!(d.id===r.id||re(a,r,d)||ie(e,a,r,d))})})};var N,L,E;l.parameters={...l.parameters,docs:{...(N=l.parameters)==null?void 0:N.docs,source:{originalSource:`() => <div style={{
  height: 500
}}>
    <Canvas nodes={[{
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
  </div>`,...(E=(L=l.parameters)==null?void 0:L.docs)==null?void 0:E.source}}};var k,w,j;g.parameters={...g.parameters,docs:{...(k=g.parameters)==null?void 0:k.docs,source:{originalSource:`() => <div style={{
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}}>
    <Canvas animated={false} nodes={[{
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
  </div>`,...(j=(w=g.parameters)==null?void 0:w.docs)==null?void 0:j.source}}};var R,S,P;m.parameters={...m.parameters,docs:{...(R=m.parameters)==null?void 0:R.docs,source:{originalSource:`() => <div style={{
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}}>
    <Canvas readonly={true} nodes={[{
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
  </div>`,...(P=(S=m.parameters)==null?void 0:S.docs)==null?void 0:P.source}}};var T,D,O;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`() => <div style={{
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}}>
    <Canvas disabled={true} nodes={[{
    id: '1',
    text: 'Node 1'
  }, {
    id: '2',
    text: 'Node 2'
  }]} edges={[{
    id: '1-2',
    from: '1',
    to: '2'
  }]} onLayoutChange={layout => console.log('Layout', layout)} />
  </div>`,...(O=(D=c.parameters)==null?void 0:D.docs)==null?void 0:O.source}}};var H,M,A;f.parameters={...f.parameters,docs:{...(H=f.parameters)==null?void 0:H.docs,source:{originalSource:`() => <div style={{
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}}>
    <Canvas nodes={[{
    id: '2',
    text: 'Mother',
    data: {
      gender: 'female'
    }
  }, {
    id: '3',
    text: 'Daughter',
    data: {
      gender: 'female'
    }
  }, {
    id: '4',
    text: 'Son',
    data: {
      gender: 'male'
    }
  }]} edges={[{
    id: '2-3',
    from: '2',
    to: '3'
  }, {
    id: '2-4',
    from: '2',
    to: '4'
  }]} node={(node: NodeProps) => <Node {...node} onClick={() => console.log(node.properties.data)} style={{
    fill: node.properties.data?.gender === 'male' ? 'blue' : 'red'
  }} />} edge={(edge: EdgeProps) => <Edge {...edge} style={{
    stroke: edge.id === '2-4' ? 'blue' : 'red'
  }} />} onLayoutChange={layout => console.log('Layout', layout)} />
  </div>`,...(A=(M=f.parameters)==null?void 0:M.docs)==null?void 0:A.source}}};var K,_,U;u.parameters={...u.parameters,docs:{...(K=u.parameters)==null?void 0:K.docs,source:{originalSource:`() => {
  const ref = useRef<CanvasRef | null>(null);
  useEffect(() => {
    console.log('Reference:', ref);
  }, [ref]);
  return <div style={{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }}>
      <button style={{
      position: 'absolute',
      top: 10,
      left: 10,
      zIndex: 999
    }} onClick={() => ref.current?.positionCanvas(CanvasPosition.CENTER)}>
        Center
      </button>
      <Canvas ref={ref} nodes={[{
      id: '1',
      text: 'Node 1'
    }, {
      id: '2',
      text: 'Node 2'
    }]} edges={[{
      id: '1-2',
      from: '1',
      to: '2'
    }]} onLayoutChange={layout => console.log('Layout', layout)} />
    </div>;
}`,...(U=(_=u.parameters)==null?void 0:_.docs)==null?void 0:U.source}}};var I,z,B;x.parameters={...x.parameters,docs:{...(I=x.parameters)==null?void 0:I.docs,source:{originalSource:`() => <div style={{
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
    to: '2'
  }]} node={<Node port={<Port onEnter={(event, port) => {
    console.log('Enter Port', event, port);
  }} onLeave={(event, port) => {
    console.log('Leave Port', event, port);
  }} />} onEnter={(event, node) => {
    console.log('Enter Node', event, node);
  }} onLeave={(event, node) => {
    console.log('Leave Node', event, node);
  }} onKeyDown={(event, node) => {
    console.log('Keydown Node', event, node);
  }} onClick={(event, node) => {
    console.log('Selecting Node', event, node);
  }} onRemove={(event, node) => {
    console.log('Remove Node', event, node);
  }} />} edge={<Edge onEnter={(event, edge) => {
    console.log('Enter Edge', event, edge);
  }} onLeave={(event, edge) => {
    console.log('Leave Edge', event, edge);
  }} onKeyDown={(event, edge) => {
    console.log('Keydown Edge', event, edge);
  }} onClick={(event, edge) => {
    console.log('Selecting Edge', event, edge);
  }} onRemove={(event, edge) => {
    console.log('Removing Edge', event, edge);
  }} />} onCanvasClick={event => {
    console.log('Canvas Clicked', event);
  }} onLayoutChange={layout => console.log('Layout', layout)} />
  </div>`,...(B=(z=x.parameters)==null?void 0:z.docs)==null?void 0:B.source}}};var F,W,q;p.parameters={...p.parameters,docs:{...(F=p.parameters)==null?void 0:F.docs,source:{originalSource:`() => <div style={{
  border: 'solid 1px #12131e',
  height: 500,
  width: 700
}}>
    <style>
      {\`
        body #root > div {
          background-color: white;
          background-image: -webkit-repeating-radial-gradient(top center,rgba(0,0,0,.2),rgba(0,0,0,.2) 1px,transparent 0,transparent 100%);
        }
        .edge {
          stroke: #b1b1b7;
          stroke-dasharray: 5;
          animation: dashdraw .5s linear infinite;
          stroke-width: 1;
        }
        @keyframes dashdraw {
          0% { stroke-dashoffset: 10; }
        }
      \`}
    </style>
    <Canvas className="canvas" nodes={[{
    id: '1',
    text: 'Node 1',
    ports: [{
      id: '1-from',
      width: 10,
      height: 10,
      side: 'SOUTH'
    }, {
      id: '1-to',
      width: 10,
      height: 10,
      side: 'NORTH',
      hidden: true
    }]
  }, {
    id: '2',
    text: 'Node 2',
    ports: [{
      id: '2-from',
      width: 10,
      height: 10,
      side: 'SOUTH'
    }, {
      id: '2-to',
      width: 10,
      height: 10,
      side: 'NORTH',
      hidden: true
    }]
  }, {
    id: '3',
    text: 'Node 3',
    ports: [{
      id: '3-from',
      width: 10,
      height: 10,
      side: 'SOUTH'
    }, {
      id: '3-to',
      width: 10,
      height: 10,
      side: 'NORTH',
      hidden: true
    }]
  }]} edges={[{
    id: '1-2',
    from: '1',
    to: '2',
    fromPort: '1-from',
    toPort: '2-to'
  }, {
    id: '1-3',
    from: '1',
    to: '3',
    fromPort: '1-from',
    toPort: '3-to'
  }]} node={<Node style={{
    stroke: '#1a192b',
    fill: 'white',
    strokeWidth: 1
  }} label={<Label style={{
    fill: 'black'
  }} />} port={<Port style={{
    fill: 'blue',
    stroke: 'white'
  }} rx={10} ry={10} />} />} arrow={<MarkerArrow style={{
    fill: '#b1b1b7'
  }} />} edge={<Edge className="edge" />} onLayoutChange={layout => console.log('Layout', layout)} />
  </div>`,...(q=(W=p.parameters)==null?void 0:W.docs)==null?void 0:q.source}}};var G,J,Q;h.parameters={...h.parameters,docs:{...(G=h.parameters)==null?void 0:G.docs,source:{originalSource:`() => {
  const [nodes, setNodes] = useState<NodeData[]>([{
    id: '1',
    text: '1'
  }, {
    id: '2',
    text: '2'
  }, {
    id: '3',
    text: '3'
  }, {
    id: '4',
    text: '4'
  }, {
    id: '5',
    text: '5'
  }, {
    id: '6',
    text: '6'
  }, {
    id: '7',
    text: '7'
  }, {
    id: '8',
    text: '8'
  }, {
    id: '9',
    text: '9'
  }, {
    id: '10',
    text: '10'
  }, {
    id: '11',
    text: '11'
  }, {
    id: '12',
    text: '12'
  }, {
    id: '13',
    text: '13'
  }, {
    id: '14',
    text: '14'
  }, {
    id: '15',
    text: '15'
  }, {
    id: '16',
    text: '16'
  }, {
    id: '17',
    text: '17'
  }, {
    id: '18',
    text: '18'
  }, {
    id: '19',
    text: '19'
  }, {
    id: '20',
    text: '20'
  }, {
    id: '21',
    text: '21'
  }, {
    id: '22',
    text: '22'
  }, {
    id: '23',
    text: '23'
  }, {
    id: '24',
    text: '24'
  }, {
    id: '25',
    text: '25'
  }, {
    id: '26',
    text: '26'
  }, {
    id: '27',
    text: '27'
  }, {
    id: '28',
    text: '28'
  }, {
    id: '29',
    text: '29'
  }, {
    id: '30',
    text: '30'
  }]);
  const [edges, setEdges] = useState<EdgeData[]>([{
    id: '1-2',
    from: '1',
    to: '2'
  }, {
    id: '1-3',
    from: '1',
    to: '3'
  }, {
    id: '1-4',
    from: '1',
    to: '4'
  }, {
    id: '1-5',
    from: '1',
    to: '5'
  }, {
    id: '1-6',
    from: '1',
    to: '6'
  }, {
    id: '1-7',
    from: '1',
    to: '7'
  }, {
    id: '2-8',
    from: '2',
    to: '8'
  }, {
    id: '2-9',
    from: '2',
    to: '9'
  }, {
    id: '2-10',
    from: '2',
    to: '10'
  }, {
    id: '2-11',
    from: '2',
    to: '11'
  }, {
    id: '2-12',
    from: '2',
    to: '12'
  }, {
    id: '2-13',
    from: '2',
    to: '13'
  }, {
    id: '3-14',
    from: '3',
    to: '14'
  }, {
    id: '3-15',
    from: '3',
    to: '15'
  }, {
    id: '3-16',
    from: '3',
    to: '16'
  }, {
    id: '3-17',
    from: '3',
    to: '17'
  }, {
    id: '3-18',
    from: '3',
    to: '18'
  }, {
    id: '3-19',
    from: '3',
    to: '19'
  }, {
    id: '3-20',
    from: '3',
    to: '20'
  }, {
    id: '10-21',
    from: '10',
    to: '21'
  }, {
    id: '10-22',
    from: '10',
    to: '22'
  }, {
    id: '10-23',
    from: '10',
    to: '23'
  }, {
    id: '10-24',
    from: '10',
    to: '24'
  }, {
    id: '10-25',
    from: '10',
    to: '25'
  }, {
    id: '17-26',
    from: '17',
    to: '26'
  }, {
    id: '17-27',
    from: '17',
    to: '27'
  }, {
    id: '17-28',
    from: '17',
    to: '28'
  }, {
    id: '17-29',
    from: '17',
    to: '29'
  }, {
    id: '17-30',
    from: '17',
    to: '30'
  }]);
  return <div style={{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }}>
      <Canvas nodes={nodes} edges={edges} onMouseEnter={() => undefined} onMouseLeave={() => undefined} onCanvasClick={() => undefined} dragNode={null} dragEdge={null} arrow={<Arrow />} node={<Node dragType="node" remove={<Remove />} port={<Port />} label={<Label />} />} edge={<Edge />} onLayoutChange={layout => console.log('Layout', layout)} onNodeLink={(_event, from, to) => {
      const newEdges = edges.filter(e => e.to !== from.id);
      setEdges([...newEdges, createEdgeFromNodes(to, from)]);
    }} onNodeLinkCheck={(_event, from: NodeData, to: NodeData) => {
      if (from.id === to.id) {
        return false;
      }
      if (hasLink(edges, to, from)) {
        return false;
      }
      if (detectCircular(nodes, edges, to, from)) {
        return false;
      }
      return true;
    }} />
    </div>;
}`,...(Q=(J=h.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};const ye=["Simple","NoAnimation","Readonly","Disabled","CustomElements","Refs","Events","Styling","ManyNodes"];export{f as CustomElements,c as Disabled,x as Events,h as ManyNodes,g as NoAnimation,m as Readonly,u as Refs,l as Simple,p as Styling,ye as __namedExportsOrder,he as default};
