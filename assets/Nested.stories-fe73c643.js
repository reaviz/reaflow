import{j as n}from"./jsx-runtime-9c4ae004.js";import{r as f}from"./index-1b03fe98.js";import{C as o,N as h,E as k,M as U,a as F,I,L as _,P as X,R as Y,A as Z}from"./Icon-0f63e463.js";import"./index-6fd5a17b.js";import"./index-4b095e7f.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";const Q={title:"Demos/Nested",component:o,subcomponents:{Node:h,Edge:k,MarkerArrow:U,Arrow:F,Icon:I,Label:_,Port:X,Remove:Y,Add:Z}},r=()=>n.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:n.jsx(o,{nodes:[{id:"1",text:"1"},{id:"2"},{id:"2-1-1",text:"2 > 2.1",parent:"2"},{id:"3",text:"3"}],edges:[{id:"1-2",from:"1",to:"2"},{id:"2-3",from:"2",to:"3"}],onLayoutChange:t=>console.log("Layout",t)})}),s=()=>{const[t,g]=f.useState([{id:"1",text:"1"},{id:"2"},{id:"2.1",text:"2 > 2.1",parent:"2"},{id:"2.2",text:"2 > 2.2",parent:"2"},{id:"3",text:"3"}]),[d,c]=f.useState([{id:"1-2",from:"1",to:"2"},{id:"2-3",from:"2",to:"3"}]);return n.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:n.jsx(o,{nodes:t,edges:d,onNodeLink:(i,e,u)=>{const B=`${e.id}-${u.id}`;c([...d,{id:B,from:e.id,to:u.id,parent:u.parent}])},onLayoutChange:i=>console.log("Layout",i)})})},a=()=>{const t={typeA:{width:190,height:150},typeB:{width:80,height:80}},g=[{id:"1",text:"1"},{id:"2",label:"A",name:"Process XYZ",description:"Description of XYZ",nodePadding:[120,50,50,50],layoutOptions:{portConstraints:"FREE"},...t.typeA},{id:"2.1",parent:"2",label:"B",name:"Task 1",layoutOptions:{portConstraints:"FREE"},...t.typeB},{id:"2.1.1",parent:"2.1",label:"B",name:"Task 1",layoutOptions:{portConstraints:"FREE"},...t.typeB},{id:"2.2",parent:"2",label:"B",name:"Task 2",layoutOptions:{portConstraints:"FREE"},...t.typeB},{id:"3",layoutOptions:{portConstraints:"FREE"},text:"3"}],d=[{id:"1-2.1",from:"1",to:"2.1"},{id:"1-2.1.1",from:"1",to:"2.1.1"},{id:"2.1-2.2",parent:"2",from:"2.1",to:"2.2"},{id:"2.2-3",from:"2.2",to:"3"}];function c(i){const e=i.properties;switch(e.label){case"A":return n.jsx(h,{style:{fill:"#1b1d3c",opacity:.8},children:n.jsxs("div",{style:{textAlign:"center"},children:[n.jsx("h4",{children:e.name}),n.jsx("p",{children:e.description})]})});case"B":return n.jsx(h,{style:{fill:"#0e0f1f"},children:n.jsx("div",{style:{textAlign:"center"},children:n.jsx("h4",{children:e.name})})});default:return n.jsx(h,{})}}return n.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:n.jsx(o,{layoutOptions:{"elk.hierarchyHandling":"INCLUDE_CHILDREN"},direction:"RIGHT",nodes:g,edges:d,node:i=>c(i)})})},p=()=>n.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:n.jsx(o,{nodes:[{id:"1",text:"1"},{id:"2"},{id:"2-1-1",text:"2 > 1.1",parent:"2"},{id:"2-1-2",text:"2 > 1.2",parent:"2"},{id:"2-1-3",text:"2 > 1.3",parent:"2"},{id:"3",text:"3"}],edges:[{id:"1-2",from:"1",to:"2"},{id:"2-1-1>2-1-2",from:"2-1-1",to:"2-1-2",parent:"2"},{id:"2-1-1>2-1-3",from:"2-1-1",to:"2-1-3",parent:"2"},{id:"2-3",from:"2",to:"3"}],onLayoutChange:t=>console.log("Layout",t)})}),l=()=>n.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:n.jsx(o,{nodes:[{id:"1",text:"1",ports:[{id:"1-from",width:10,height:10,side:"SOUTH"},{id:"1-to",width:10,height:10,side:"NORTH",hidden:!0}]},{id:"2",ports:[{id:"2-from",width:10,height:10,side:"SOUTH"},{id:"2-to",width:10,height:10,side:"NORTH",hidden:!0}]},{id:"2-1-1",text:"2 > 1.1",parent:"2",ports:[{id:"211-from",width:10,height:10,side:"SOUTH"}]},{id:"2-1-2",text:"2 > 1.2",parent:"2",ports:[{id:"212-from",width:10,height:10,side:"SOUTH"},{id:"212-to",width:10,height:10,side:"NORTH",hidden:!0}]},{id:"2-1-3",text:"2 > 1.3",parent:"2"},{id:"3",text:"3",ports:[{id:"3-from",width:10,height:10,side:"SOUTH"},{id:"3-to",width:10,height:10,side:"NORTH",hidden:!0}]}],edges:[{id:"1-2",from:"1",to:"2",fromPort:"1-from",toPort:"2-to"},{id:"2-1-1>2-1-2",from:"2-1-1",to:"2-1-2",parent:"2",fromPort:"211-from",toPort:"212-to"},{id:"2-1-1>2-1-3",from:"2-1-1",to:"2-1-3",parent:"2"},{id:"2-3",from:"2",to:"3",fromPort:"2-from",toPort:"3-to"}],onLayoutChange:t=>console.log("Layout",t)})}),m=()=>n.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:n.jsx(o,{nodes:[{id:"1",text:"1"},{id:"2"},{id:"2.1",parent:"2"},{id:"2.1.1",text:"2.1.1",parent:"2.1"},{id:"2.1.2",text:"2.1.2",parent:"2.1"},{id:"2.1.3",text:"2.1.3",parent:"2.1"},{id:"2.2",text:"2.2",parent:"2"},{id:"3",text:"3"}],edges:[{id:"1-2",from:"1",to:"2"},{id:"2-3",from:"2",to:"3"},{id:"2.1>2.2",from:"2.1",to:"2.2",parent:"2"},{id:"2.1.1>2.1.2",from:"2.1.1",to:"2.1.2",parent:"2.1"},{id:"2.1.1>2.1.3",from:"2.1.1",to:"2.1.3",parent:"2.1"}],onLayoutChange:t=>console.log("Layout",t)})});var x,y,b;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`() => <div style={{
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}}>
    <Canvas nodes={[{
    id: '1',
    text: '1'
  }, {
    id: '2'
  }, {
    id: '2-1-1',
    text: '2 > 2.1',
    parent: '2'
  }, {
    id: '3',
    text: '3'
  }]} edges={[{
    id: '1-2',
    from: '1',
    to: '2'
  }, {
    id: '2-3',
    from: '2',
    to: '3'
  }]} onLayoutChange={layout => console.log('Layout', layout)} />
  </div>`,...(b=(y=r.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};var N,E,v;s.parameters={...s.parameters,docs:{...(N=s.parameters)==null?void 0:N.docs,source:{originalSource:`() => {
  const [nodes, setNodes] = useState<NodeData[]>([{
    id: '1',
    text: '1'
  }, {
    id: '2'
  }, {
    id: '2.1',
    text: '2 > 2.1',
    parent: '2'
  }, {
    id: '2.2',
    text: '2 > 2.2',
    parent: '2'
  }, {
    id: '3',
    text: '3'
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
      <Canvas nodes={nodes} edges={edges} onNodeLink={(_event, from: NodeData, to: NodeData) => {
      const id = \`\${from.id}-\${to.id}\`;
      setEdges([...edges, {
        id,
        from: from.id,
        to: to.id,
        parent: to.parent
      }]);
    }} onLayoutChange={layout => console.log('Layout', layout)} />
    </div>;
}`,...(v=(E=s.parameters)==null?void 0:E.docs)==null?void 0:v.source}}};var C,O,L;a.parameters={...a.parameters,docs:{...(C=a.parameters)==null?void 0:C.docs,source:{originalSource:`() => {
  const nodeDimensions: any = {
    typeA: {
      width: 190,
      height: 150
    },
    typeB: {
      width: 80,
      height: 80
    }
  };
  const nodes: NodeData[] = [{
    id: '1',
    text: '1'
  }, {
    id: '2',
    label: 'A',
    name: 'Process XYZ',
    description: 'Description of XYZ',
    // describes padding for nested nodes
    nodePadding: [120, 50, 50, 50],
    layoutOptions: {
      portConstraints: 'FREE'
    },
    ...nodeDimensions.typeA
  }, {
    id: '2.1',
    parent: '2',
    label: 'B',
    name: 'Task 1',
    layoutOptions: {
      portConstraints: 'FREE'
    },
    ...nodeDimensions.typeB
  }, {
    id: '2.1.1',
    parent: '2.1',
    label: 'B',
    name: 'Task 1',
    layoutOptions: {
      portConstraints: 'FREE'
    },
    ...nodeDimensions.typeB
  }, {
    id: '2.2',
    parent: '2',
    label: 'B',
    name: 'Task 2',
    layoutOptions: {
      portConstraints: 'FREE'
    },
    ...nodeDimensions.typeB
  }, {
    id: '3',
    layoutOptions: {
      portConstraints: 'FREE'
    },
    text: '3'
  }];
  const edges: EdgeData[] = [{
    id: '1-2.1',
    from: '1',
    to: '2.1'
  }, {
    id: '1-2.1.1',
    from: '1',
    to: '2.1.1'
  }, {
    id: '2.1-2.2',
    parent: '2',
    from: '2.1',
    to: '2.2'
  }, {
    id: '2.2-3',
    from: '2.2',
    to: '3'
  }];
  function prepareNode(node) {
    const data = node.properties;
    switch (data.label) {
      case 'A':
        return <Node style={{
          fill: '#1b1d3c',
          opacity: 0.8
        }}>
            <div style={{
            textAlign: "center"
          }}>
              <h4>{data.name}</h4>
              <p>{data.description}</p>
            </div>
          </Node>;
      case 'B':
        return <Node style={{
          fill: '#0e0f1f'
        }}>
            <div style={{
            textAlign: "center"
          }}>
              <h4>{data.name}</h4>
            </div>
          </Node>;
      default:
        return <Node />;
    }
  }
  return <div style={{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }}>
      <Canvas
    // required to enable edges from/to nested nodes
    layoutOptions={{
      'elk.hierarchyHandling': 'INCLUDE_CHILDREN'
    }} direction='RIGHT' nodes={nodes} edges={edges} node={(node: NodeProps) => prepareNode(node)} />
    </div>;
}`,...(L=(O=a.parameters)==null?void 0:O.docs)==null?void 0:L.source}}};var w,T,R;p.parameters={...p.parameters,docs:{...(w=p.parameters)==null?void 0:w.docs,source:{originalSource:`() => <div style={{
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}}>
    <Canvas nodes={[{
    id: '1',
    text: '1'
  }, {
    id: '2'
  }, {
    id: '2-1-1',
    text: '2 > 1.1',
    parent: '2'
  }, {
    id: '2-1-2',
    text: '2 > 1.2',
    parent: '2'
  }, {
    id: '2-1-3',
    text: '2 > 1.3',
    parent: '2'
  }, {
    id: '3',
    text: '3'
  }]} edges={[{
    id: '1-2',
    from: '1',
    to: '2'
  }, {
    id: '2-1-1>2-1-2',
    from: '2-1-1',
    to: '2-1-2',
    parent: '2'
  }, {
    id: '2-1-1>2-1-3',
    from: '2-1-1',
    to: '2-1-3',
    parent: '2'
  }, {
    id: '2-3',
    from: '2',
    to: '3'
  }]} onLayoutChange={layout => console.log('Layout', layout)} />
  </div>`,...(R=(T=p.parameters)==null?void 0:T.docs)==null?void 0:R.source}}};var H,j,S;l.parameters={...l.parameters,docs:{...(H=l.parameters)==null?void 0:H.docs,source:{originalSource:`() => <div style={{
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}}>
    <Canvas nodes={[{
    id: '1',
    text: '1',
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
    id: '2-1-1',
    text: '2 > 1.1',
    parent: '2',
    ports: [{
      id: '211-from',
      width: 10,
      height: 10,
      side: 'SOUTH'
    }]
  }, {
    id: '2-1-2',
    text: '2 > 1.2',
    parent: '2',
    ports: [{
      id: '212-from',
      width: 10,
      height: 10,
      side: 'SOUTH'
    }, {
      id: '212-to',
      width: 10,
      height: 10,
      side: 'NORTH',
      hidden: true
    }]
  }, {
    id: '2-1-3',
    text: '2 > 1.3',
    parent: '2'
  }, {
    id: '3',
    text: '3',
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
    id: '2-1-1>2-1-2',
    from: '2-1-1',
    to: '2-1-2',
    parent: '2',
    fromPort: '211-from',
    toPort: '212-to'
  }, {
    id: '2-1-1>2-1-3',
    from: '2-1-1',
    to: '2-1-3',
    parent: '2'
  }, {
    id: '2-3',
    from: '2',
    to: '3',
    fromPort: '2-from',
    toPort: '3-to'
  }]} onLayoutChange={layout => console.log('Layout', layout)} />
  </div>`,...(S=(j=l.parameters)==null?void 0:j.docs)==null?void 0:S.source}}};var P,D,A;m.parameters={...m.parameters,docs:{...(P=m.parameters)==null?void 0:P.docs,source:{originalSource:`() => <div style={{
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}}>
    <Canvas nodes={[{
    id: '1',
    text: '1'
  }, {
    id: '2'
  }, {
    id: '2.1',
    parent: '2'
  }, {
    id: '2.1.1',
    text: '2.1.1',
    parent: '2.1'
  }, {
    id: '2.1.2',
    text: '2.1.2',
    parent: '2.1'
  }, {
    id: '2.1.3',
    text: '2.1.3',
    parent: '2.1'
  }, {
    id: '2.2',
    text: '2.2',
    parent: '2'
  }, {
    id: '3',
    text: '3'
  }]} edges={[{
    id: '1-2',
    from: '1',
    to: '2'
  }, {
    id: '2-3',
    from: '2',
    to: '3'
  }, {
    id: '2.1>2.2',
    from: '2.1',
    to: '2.2',
    parent: '2'
  }, {
    id: '2.1.1>2.1.2',
    from: '2.1.1',
    to: '2.1.2',
    parent: '2.1'
  }, {
    id: '2.1.1>2.1.3',
    from: '2.1.1',
    to: '2.1.3',
    parent: '2.1'
  }]} onLayoutChange={layout => console.log('Layout', layout)} />
  </div>`,...(A=(D=m.parameters)==null?void 0:D.docs)==null?void 0:A.source}}};const V=["Simple","Linking","NestedEdges","Edges","Ports","NestedNesting"];export{p as Edges,s as Linking,a as NestedEdges,m as NestedNesting,l as Ports,r as Simple,V as __namedExportsOrder,Q as default};
