import{j as t}from"./jsx-runtime-9c4ae004.js";import{r as p}from"./index-1b03fe98.js";import{C as i,N as f,E as j,M as E,a as D,I as _,L as $,P as u,R as A,A as I}from"./Icon-0f63e463.js";import"./index-6fd5a17b.js";import"./index-4b095e7f.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";const K={title:"Demos/Ports",component:i,subcomponents:{Node:f,Edge:j,MarkerArrow:E,Arrow:D,Icon:_,Label:$,Port:u,Remove:A,Add:I}},s=()=>t.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:t.jsx(i,{nodes:[{id:"1",text:"Node 1",ports:[{id:"1-from",width:10,height:10,side:"SOUTH"},{id:"1-to",width:10,height:10,side:"NORTH"}]},{id:"2",text:"Node 2",ports:[{id:"2-from",width:10,height:10,side:"SOUTH"},{id:"2-to",width:10,height:10,side:"NORTH"}]}],edges:[{id:"1-2",from:"1",to:"2",fromPort:"1-from",toPort:"2-to"}],node:t.jsx(f,{port:t.jsx(u,{onClick:(o,e)=>{console.log("onClick port: ",e)},onEnter:(o,e)=>{console.log("onEnter port: ",e)},onLeave:(o,e)=>{console.log("onLeave port: ",e)},style:{fill:"blue",stroke:"white"},rx:10,ry:10})}),onLayoutChange:o=>console.log("Layout",o)})}),h=()=>t.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:t.jsx(i,{nodes:[{id:"1",text:"Node 1",ports:[{id:"1-from",width:10,height:10,side:"SOUTH",disabled:!0},{id:"1-to",width:10,height:10,side:"NORTH"}]},{id:"2",text:"Node 2",ports:[{id:"2-from",width:10,height:10,side:"SOUTH",disabled:!0},{id:"2-to",width:10,height:10,side:"NORTH"}]}],edges:[{id:"1-2",from:"1",to:"2",fromPort:"1-from",toPort:"2-to"}],node:t.jsx(f,{port:t.jsx(u,{onClick:(o,e)=>{console.log("onClick port: ",e)},onEnter:(o,e)=>{console.log("onEnter port: ",e)},onLeave:(o,e)=>{console.log("onLeave port: ",e)},style:{fill:"blue",stroke:"white"},rx:10,ry:10})}),onLayoutChange:o=>console.log("Layout",o)})}),a=()=>t.jsxs("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:[t.jsx("style",{children:`
        .blue {
          fill: blue;
        }
        .green {
          fill: green;
        }
      `}),t.jsx(i,{nodes:[{id:"1",text:"Node 1",ports:[{id:"1-from",width:10,height:10,side:"SOUTH"},{id:"1-to",width:10,height:10,side:"NORTH"}]},{id:"2",text:"Node 2",ports:[{id:"2-from",width:10,height:10,side:"SOUTH",className:"green"},{id:"2-to",width:10,height:10,side:"NORTH",className:"blue"}]}],edges:[{id:"1-2",from:"1",to:"2",fromPort:"1-from",toPort:"2-to"}],onLayoutChange:o=>console.log("Layout",o)})]}),l=()=>t.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:t.jsx(i,{nodes:[{id:"1",text:"Node 1",ports:[{id:"1-from-1",width:10,height:10,side:"SOUTH"},{id:"1-from-2",width:10,height:10,side:"SOUTH"},{id:"1-from-3",width:10,height:10,side:"SOUTH"},{id:"1-to",width:10,height:10,hidden:!0,side:"NORTH"}]},{id:"2",text:"Node 2",ports:[{id:"2-from",width:10,height:10,side:"SOUTH"},{id:"2-to",width:10,height:10,hidden:!0,side:"NORTH"}]},{id:"3",text:"Node 3",ports:[{id:"3-from",width:10,height:10,side:"SOUTH"},{id:"3-to",width:10,height:10,hidden:!0,side:"NORTH"}]}],edges:[{id:"1-2",from:"1",to:"2",fromPort:"1-from-1",toPort:"2-to"},{id:"1-3",from:"1",to:"3",fromPort:"1-from-3",toPort:"3-to"}],onLayoutChange:o=>console.log("Layout",o)})}),m=()=>{const[o]=p.useState([{id:"1",text:"Node 1",ports:[{id:"1-from-1",width:10,height:10,side:"SOUTH"},{id:"1-from-2",width:10,height:10,side:"SOUTH"},{id:"1-to",width:10,height:10,hidden:!0,side:"NORTH"}]},{id:"2",text:"Node 2"},{id:"3",text:"Node 3"}]),[e,R]=p.useState([{id:"1-2",from:"1",to:"2",fromPort:"1-from-1",toPort:"2-to"}]);return t.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:t.jsx(i,{nodes:o,edges:e,onNodeLinkCheck:(g,r,n,d)=>!(r.id===n.id||n.id==="1"||(d==null?void 0:d.id)==="1-from-2"&&n.id==="3"),onNodeLink:(g,r,n,d)=>{const k=`${r.id}-${n.id}`;R([...e,{id:k,from:r.id,to:n.id,fromPort:d.id,toPort:`${n.id}-to`}])},onLayoutChange:g=>console.log("Layout",g)})})};var c,N,y;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`() => <div style={{
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}}>
    <Canvas nodes={[{
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
      side: 'NORTH'
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
      side: 'NORTH'
    }]
  }]} edges={[{
    id: '1-2',
    from: '1',
    to: '2',
    fromPort: '1-from',
    toPort: '2-to'
  }]} node={<Node port={<Port onClick={(e, node) => {
    console.log('onClick port: ', node);
  }} onEnter={(e, node) => {
    console.log('onEnter port: ', node);
  }} onLeave={(e, node) => {
    console.log('onLeave port: ', node);
  }} style={{
    fill: 'blue',
    stroke: 'white'
  }} rx={10} ry={10} />} />} onLayoutChange={layout => console.log('Layout', layout)} />
  </div>`,...(y=(N=s.parameters)==null?void 0:N.docs)==null?void 0:y.source}}};var w,x,O;h.parameters={...h.parameters,docs:{...(w=h.parameters)==null?void 0:w.docs,source:{originalSource:`() => <div style={{
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}}>
    <Canvas nodes={[{
    id: '1',
    text: 'Node 1',
    ports: [{
      id: '1-from',
      width: 10,
      height: 10,
      side: 'SOUTH',
      disabled: true
    }, {
      id: '1-to',
      width: 10,
      height: 10,
      side: 'NORTH'
    }]
  }, {
    id: '2',
    text: 'Node 2',
    ports: [{
      id: '2-from',
      width: 10,
      height: 10,
      side: 'SOUTH',
      disabled: true
    }, {
      id: '2-to',
      width: 10,
      height: 10,
      side: 'NORTH'
    }]
  }]} edges={[{
    id: '1-2',
    from: '1',
    to: '2',
    fromPort: '1-from',
    toPort: '2-to'
  }]} node={<Node port={<Port onClick={(e, node) => {
    console.log('onClick port: ', node);
  }} onEnter={(e, node) => {
    console.log('onEnter port: ', node);
  }} onLeave={(e, node) => {
    console.log('onLeave port: ', node);
  }} style={{
    fill: 'blue',
    stroke: 'white'
  }} rx={10} ry={10} />} />} onLayoutChange={layout => console.log('Layout', layout)} />
  </div>`,...(O=(x=h.parameters)==null?void 0:x.docs)==null?void 0:O.source}}};var H,T,P;a.parameters={...a.parameters,docs:{...(H=a.parameters)==null?void 0:H.docs,source:{originalSource:`() => <div style={{
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}}>
    <style>
      {\`
        .blue {
          fill: blue;
        }
        .green {
          fill: green;
        }
      \`}
    </style>
    <Canvas nodes={[{
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
      side: 'NORTH'
    }]
  }, {
    id: '2',
    text: 'Node 2',
    ports: [{
      id: '2-from',
      width: 10,
      height: 10,
      side: 'SOUTH',
      className: 'green'
    }, {
      id: '2-to',
      width: 10,
      height: 10,
      side: 'NORTH',
      className: 'blue'
    }]
  }]} edges={[{
    id: '1-2',
    from: '1',
    to: '2',
    fromPort: '1-from',
    toPort: '2-to'
  }]} onLayoutChange={layout => console.log('Layout', layout)} />
  </div>`,...(P=(T=a.parameters)==null?void 0:T.docs)==null?void 0:P.source}}};var S,b,L;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`() => <div style={{
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}}>
    <Canvas nodes={[{
    id: '1',
    text: 'Node 1',
    ports: [{
      id: '1-from-1',
      width: 10,
      height: 10,
      side: 'SOUTH'
    }, {
      id: '1-from-2',
      width: 10,
      height: 10,
      side: 'SOUTH'
    }, {
      id: '1-from-3',
      width: 10,
      height: 10,
      side: 'SOUTH'
    }, {
      id: '1-to',
      width: 10,
      height: 10,
      hidden: true,
      side: 'NORTH'
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
      hidden: true,
      side: 'NORTH'
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
      hidden: true,
      side: 'NORTH'
    }]
  }]} edges={[{
    id: '1-2',
    from: '1',
    to: '2',
    fromPort: '1-from-1',
    toPort: '2-to'
  }, {
    id: '1-3',
    from: '1',
    to: '3',
    fromPort: '1-from-3',
    toPort: '3-to'
  }]} onLayoutChange={layout => console.log('Layout', layout)} />
  </div>`,...(L=(b=l.parameters)==null?void 0:b.docs)==null?void 0:L.source}}};var v,C,U;m.parameters={...m.parameters,docs:{...(v=m.parameters)==null?void 0:v.docs,source:{originalSource:`() => {
  const [nodes] = useState<any[]>([{
    id: '1',
    text: 'Node 1',
    ports: [{
      id: '1-from-1',
      width: 10,
      height: 10,
      side: 'SOUTH'
    }, {
      id: '1-from-2',
      width: 10,
      height: 10,
      side: 'SOUTH'
    }, {
      id: '1-to',
      width: 10,
      height: 10,
      hidden: true,
      side: 'NORTH'
    }]
  }, {
    id: '2',
    text: 'Node 2'
  }, {
    id: '3',
    text: 'Node 3'
  }]);
  const [edges, setEdges] = useState<any[]>([{
    id: '1-2',
    from: '1',
    to: '2',
    fromPort: '1-from-1',
    toPort: '2-to'
  }]);
  return <div style={{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }}>
      <Canvas nodes={nodes} edges={edges} onNodeLinkCheck={(_event, from: NodeData, to: NodeData, port: PortData) => {
      if (from.id === to.id || to.id === '1') {
        return false;
      }
      if (port?.id === '1-from-2' && to.id === '3') {
        return false;
      }
      return true;
    }} onNodeLink={(_event, from: NodeData, to: NodeData, port: PortData) => {
      const id = \`\${from.id}-\${to.id}\`;
      setEdges([...edges, {
        id,
        from: from.id,
        to: to.id,
        fromPort: port.id,
        toPort: \`\${to.id}-to\`
      }]);
    }} onLayoutChange={layout => console.log('Layout', layout)} />
    </div>;
}`,...(U=(C=m.parameters)==null?void 0:C.docs)==null?void 0:U.source}}};const Q=["Simple","Disabled","Styled","ComplexPorts","LinkingPortRestrictions"];export{l as ComplexPorts,h as Disabled,m as LinkingPortRestrictions,s as Simple,a as Styled,Q as __namedExportsOrder,K as default};
