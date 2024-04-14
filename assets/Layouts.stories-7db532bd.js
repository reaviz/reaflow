import{j as e}from"./jsx-runtime-9c4ae004.js";import{C as n,N,E as C,M as k,a as b,I as h,L as v,P as E,R,A as I}from"./Icon-0f63e463.js";import"./index-1b03fe98.js";import"./index-6fd5a17b.js";import"./index-4b095e7f.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";const S={title:"Demos/Layouts",component:n,subcomponents:{Node:N,Edge:C,MarkerArrow:k,Arrow:b,Icon:h,Label:v,Port:E,Remove:R,Add:I}},t=()=>e.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:e.jsx(n,{nodes:[{id:"1",text:"1"},{id:"2",text:"2"}],edges:[{id:"1-2",from:"1",to:"2",text:"1-2"}],direction:"RIGHT",onLayoutChange:o=>console.log("Layout",o)})}),s=()=>e.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:e.jsx(n,{nodes:[{id:"1",text:"1"},{id:"2",text:"2"}],edges:[{id:"1-2",from:"1",to:"2"},{id:"2-2",from:"2",to:"2"},{id:"1-1",from:"1",to:"1"}],onLayoutChange:o=>console.log("Layout",o)})}),i=()=>e.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:e.jsx(n,{nodes:[{id:"1",text:"Node 1"},{id:"2",text:"Node 2"},{id:"3",text:"Node 3"},{id:"4",text:"Node 4"}],edges:[{id:"1-2",from:"1",to:"2"},{id:"1-3",from:"1",to:"3"},{id:"3-4",from:"3",to:"4"},{id:"2-4",from:"2",to:"4"}],onLayoutChange:o=>console.log("Layout",o)})}),a=()=>e.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:e.jsx(n,{layoutOptions:{"elk.nodeLabels.placement":"INSIDE V_CENTER H_RIGHT","elk.algorithm":"org.eclipse.elk.layered","elk.direction":"DOWN",nodeLayering:"INTERACTIVE","org.eclipse.elk.edgeRouting":"ORTHOGONAL","elk.layered.unnecessaryBendpoints":"true","elk.layered.spacing.edgeNodeBetweenLayers":"20","org.eclipse.elk.layered.nodePlacement.bk.fixedAlignment":"BALANCED","org.eclipse.elk.layered.cycleBreaking.strategy":"DEPTH_FIRST","org.eclipse.elk.insideSelfLoops.activate":"true",separateConnectedComponents:"false","spacing.componentComponent":"20",spacing:"25","spacing.nodeNodeBetweenLayers":"20"},nodes:[{id:"1",text:"Node 1"},{id:"2",text:"Node 2"},{id:"3",text:"Node 3"},{id:"4",text:"Node 4"}],edges:[{id:"1-2",from:"1",to:"2"},{id:"1-3",from:"1",to:"3"},{id:"3-4",from:"3",to:"4"},{id:"2-4",from:"2",to:"4"}],onLayoutChange:o=>console.log("Layout",o)})});var r,d,l;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`() => <div style={{
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
    id: '2',
    text: '2'
  }]} edges={[{
    id: '1-2',
    from: '1',
    to: '2',
    text: '1-2'
  }]} direction="RIGHT" onLayoutChange={layout => console.log('Layout', layout)} />
  </div>`,...(l=(d=t.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var c,p,m;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`() => <div style={{
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
    id: '2',
    text: '2'
  }]} edges={[{
    id: '1-2',
    from: '1',
    to: '2'
  }, {
    id: '2-2',
    from: '2',
    to: '2'
  }, {
    id: '1-1',
    from: '1',
    to: '1'
  }]} onLayoutChange={layout => console.log('Layout', layout)} />
  </div>`,...(m=(p=s.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var g,u,y;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`() => <div style={{
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
  }, {
    id: '3',
    text: 'Node 3'
  }, {
    id: '4',
    text: 'Node 4'
  }]} edges={[{
    id: '1-2',
    from: '1',
    to: '2'
  }, {
    id: '1-3',
    from: '1',
    to: '3'
  }, {
    id: '3-4',
    from: '3',
    to: '4'
  }, {
    id: '2-4',
    from: '2',
    to: '4'
  }]} onLayoutChange={layout => console.log('Layout', layout)} />
  </div>`,...(y=(u=i.parameters)==null?void 0:u.docs)==null?void 0:y.source}}};var f,x,L;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`() => <div style={{
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}}>
    <Canvas layoutOptions={{
    'elk.nodeLabels.placement': 'INSIDE V_CENTER H_RIGHT',
    'elk.algorithm': 'org.eclipse.elk.layered',
    'elk.direction': 'DOWN',
    nodeLayering: 'INTERACTIVE',
    'org.eclipse.elk.edgeRouting': 'ORTHOGONAL',
    'elk.layered.unnecessaryBendpoints': 'true',
    'elk.layered.spacing.edgeNodeBetweenLayers': '20',
    'org.eclipse.elk.layered.nodePlacement.bk.fixedAlignment': 'BALANCED',
    'org.eclipse.elk.layered.cycleBreaking.strategy': 'DEPTH_FIRST',
    'org.eclipse.elk.insideSelfLoops.activate': 'true',
    separateConnectedComponents: 'false',
    'spacing.componentComponent': '20',
    spacing: '25',
    'spacing.nodeNodeBetweenLayers': '20'
  }} nodes={[{
    id: '1',
    text: 'Node 1'
  }, {
    id: '2',
    text: 'Node 2'
  }, {
    id: '3',
    text: 'Node 3'
  }, {
    id: '4',
    text: 'Node 4'
  }]} edges={[{
    id: '1-2',
    from: '1',
    to: '2'
  }, {
    id: '1-3',
    from: '1',
    to: '3'
  }, {
    id: '3-4',
    from: '3',
    to: '4'
  }, {
    id: '2-4',
    from: '2',
    to: '4'
  }]} onLayoutChange={layout => console.log('Layout', layout)} />
  </div>`,...(L=(x=a.parameters)==null?void 0:x.docs)==null?void 0:L.source}}};const _=["Direction","Circular","Joins","CustomOptions"];export{s as Circular,a as CustomOptions,t as Direction,i as Joins,_ as __namedExportsOrder,S as default};
