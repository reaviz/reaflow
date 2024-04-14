import{j as o}from"./jsx-runtime-9c4ae004.js";import{r as l}from"./index-1b03fe98.js";import{C as e,N as d,E as io,M as ro,a as lo,I as k,L as go,P as co,R as ho,A as po}from"./Icon-0f63e463.js";import"./IntersectionQuery-f6c749c2.js";import{h as mo,d as uo}from"./graphHelpers-fa49f917.js";import"./index-6fd5a17b.js";import"./index-4b095e7f.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";const Co={title:"Demos/Nodes",component:e,subcomponents:{Node:d,Edge:io,MarkerArrow:ro,Arrow:lo,Icon:k,Label:go,Port:co,Remove:ho,Add:po}},c=()=>o.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:o.jsx(e,{nodes:[{id:"1",text:"1",disabled:!0},{id:"2",text:"2",selectionDisabled:!0},{id:"3",text:"3"}],edges:[{id:"1-2",from:"1",to:"2"}],onLayoutChange:t=>console.log("Layout",t),node:t=>o.jsx(d,{...t,dragCursor:"grab",dragType:"all",onClick:()=>{console.log("click")}})})}),h=()=>o.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:o.jsx(e,{nodes:[{id:"1",text:"Node 1",icon:{url:"https://s3.amazonaws.com/img.crft.app/package-slack-logo-bw.svg",height:25,width:25}},{id:"2",text:"Node 2",icon:{url:"https://s3.amazonaws.com/img.crft.app/package-flashpoint-logo-bw.svg",height:25,width:25}},{id:"3",text:"Node 3",icon:{url:"https://s3.amazonaws.com/img.crft.app/package-twitter-logo-bw.svg",height:25,width:25}}],edges:[{id:"1-2",from:"1",to:"2"},{id:"2-3",from:"2",to:"3"}],node:o.jsx(d,{icon:o.jsx(k,{})}),onLayoutChange:t=>console.log("Layout",t)})}),p=()=>o.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:o.jsx(e,{nodes:[{id:"1",height:50,width:50,icon:{url:"https://s3.amazonaws.com/img.crft.app/package-slack-logo-bw.svg",height:25,width:25}},{id:"2",height:50,width:50,icon:{url:"https://s3.amazonaws.com/img.crft.app/package-flashpoint-logo-bw.svg",height:25,width:25}},{id:"3",height:50,width:50,icon:{url:"https://s3.amazonaws.com/img.crft.app/package-twitter-logo-bw.svg",height:25,width:25}}],edges:[{id:"1-2",from:"1",to:"2"},{id:"2-3",from:"2",to:"3"}],node:o.jsx(d,{icon:o.jsx(k,{})}),onLayoutChange:t=>console.log("Layout",t)})}),m=()=>{const[t]=l.useState([{id:"1",text:"Node 1"},{id:"2",text:"Node 2"},{id:"3",text:"Node 3"}]),[s,r]=l.useState([{id:"1-2",from:"1",to:"2"}]);return o.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:o.jsx(e,{nodes:t,edges:s,onNodeLinkCheck:(i,a,n)=>!(a.id===n.id||n.id==="3"||mo(s,a,n)||uo(t,s,a,n)),onNodeLink:(i,a,n)=>{const g=`${a.id}-${n.id}`;r([...s,{id:g,from:a.id,to:n.id}])},onLayoutChange:i=>console.log("Layout",i)})})},u=()=>{const[t]=l.useState([{id:"1",text:"Node 1"},{id:"2",text:"Node 2"},{id:"3",text:"Node 3"}]),[s,r]=l.useState([{id:"1-2",from:"1",to:"2"}]);return o.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:o.jsx(e,{nodes:t,edges:s,onNodeLink:(i,a,n)=>{const g=`${a.id}-${n.id}`;r([...s,{id:g,from:a.id,to:n.id}])},onLayoutChange:i=>console.log("Layout",i)})})},f=()=>{const[t,s]=l.useState([{id:"1",text:"Node 1"},{id:"2",text:"Node 2"},{id:"3",text:"Node 3"}]);return o.jsxs("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:[o.jsx("button",{style:{position:"absolute",top:10,left:10,zIndex:999},onClick:()=>s([...t,{id:`a${Math.random()}`,text:`Node ${Math.random()}`}]),children:"Add Nodes"}),o.jsx(e,{nodes:t,edges:[{id:"1-2",from:"1",to:"2"},{id:"1-3",from:"1",to:"3"}],onLayoutChange:r=>console.log("Layout",r)})]})},b=()=>o.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:o.jsx(e,{nodes:[{id:"1",height:125,width:250,data:{value:50}},{id:"2",height:125,width:250,data:{value:25}}],edges:[{id:"1-2",from:"1",to:"2"}],node:o.jsx(d,{children:t=>o.jsx("foreignObject",{height:t.height,width:t.width,x:0,y:0,children:o.jsxs("div",{style:{padding:10,textAlign:"center"},children:[o.jsx("h3",{style:{color:"white"},children:"Age"}),o.jsx("input",{type:"range",min:"1",max:"100",value:t.node.data.value})]})})}),onLayoutChange:t=>console.log("Layout",t)})}),x=()=>o.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:o.jsx(e,{nodes:[{id:"1",text:"Node 1",height:50,width:50},{id:"2",text:"Node 2",height:80,width:250}],edges:[{id:"1-2",from:"1",to:"2"}],onLayoutChange:t=>console.log("Layout",t)})}),y=()=>o.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:o.jsx(e,{nodes:[{id:"1",text:"Node 1",icon:{url:"https://s3.amazonaws.com/img.crft.app/package-slack-logo-bw.svg",height:25,width:25}},{id:"2",icon:{url:"https://s3.amazonaws.com/img.crft.app/package-flashpoint-logo-bw.svg",height:25,width:25}},{id:"3",text:"Node 3 with a long label for testing",icon:{url:"https://s3.amazonaws.com/img.crft.app/package-twitter-logo-bw.svg",height:25,width:25}},{id:"4",text:"Node4withalongnobreakingspacelabel",icon:{url:"https://s3.amazonaws.com/img.crft.app/package-twitter-logo-bw.svg",height:25,width:25}},{id:"5",text:"asdf asdf asdfddd dssss asdfdsds sdssd"},{id:"6",text:"normal label"},{id:"7",height:70,width:70,icon:{url:"https://s3.amazonaws.com/img.crft.app/package-slack-logo-bw.svg",height:42,width:42}},{id:"8",icon:{url:"https://s3.amazonaws.com/img.crft.app/package-slack-logo-bw.svg",height:42,width:42}}],edges:[{id:"1-2",from:"1",to:"2"},{id:"2-3",from:"2",to:"3"},{id:"2-7",from:"2",to:"7"},{id:"2-4",from:"2",to:"4"},{id:"4-5",from:"4",to:"5"},{id:"4-6",from:"4",to:"6"},{id:"4-8",from:"4",to:"8"}],node:o.jsx(d,{icon:o.jsx(k,{})})})}),w=()=>o.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:o.jsx(e,{nodes:[{id:"1",text:"1"},{id:"2",text:"2"},{id:"3",text:"3"}],edges:[{id:"1-2",from:"1",to:"2"}],onLayoutChange:t=>console.log("Layout",t),node:t=>o.jsx(d,{...t,dragCursor:"grab",dragType:"all",draggable:!1,onClick:()=>{console.log("click")}})})}),v=()=>{const[t]=l.useState([{id:"1",text:"Node 1"},{id:"2",text:"Node 2"},{id:"3",text:"Node 3"}]),[s,r]=l.useState([{id:"1-2",from:"1",to:"2"}]);return o.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:o.jsx(e,{nodes:t,edges:s,node:i=>o.jsx(d,{...i,linkable:!1}),onNodeLink:(i,a,n)=>{const g=`${a.id}-${n.id}`;r([...s,{id:g,from:a.id,to:n.id}])},onLayoutChange:i=>console.log("Layout",i)})})},N=()=>o.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:o.jsx(e,{nodes:[{id:"1",text:"1"},{id:"2",text:"2",selectionDisabled:!0},{id:"3",text:"3"}],edges:[{id:"1-2",from:"1",to:"2"}],onLayoutChange:t=>console.log("Layout",t),node:t=>o.jsx(d,{...t,dragCursor:"grab",dragType:"all",onClick:()=>{console.log("click")}})})});var L,C,j;c.parameters={...c.parameters,docs:{...(L=c.parameters)==null?void 0:L.docs,source:{originalSource:`() => <div style={{
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}}>
    <Canvas nodes={[{
    id: '1',
    text: '1',
    disabled: true
  }, {
    id: '2',
    text: '2',
    selectionDisabled: true
  }, {
    id: '3',
    text: '3'
  }]} edges={[{
    id: '1-2',
    from: '1',
    to: '2'
  }]} onLayoutChange={layout => console.log('Layout', layout)} node={(node: NodeProps) => <Node {...node} dragCursor="grab" dragType="all" onClick={() => {
    console.log('click');
  }} />} />
  </div>`,...(j=(C=c.parameters)==null?void 0:C.docs)==null?void 0:j.source}}};var S,z,D;h.parameters={...h.parameters,docs:{...(S=h.parameters)==null?void 0:S.docs,source:{originalSource:`() => <div style={{
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}}>
    <Canvas nodes={[{
    id: '1',
    text: 'Node 1',
    icon: {
      url: 'https://s3.amazonaws.com/img.crft.app/package-slack-logo-bw.svg',
      height: 25,
      width: 25
    }
  }, {
    id: '2',
    text: 'Node 2',
    icon: {
      url: 'https://s3.amazonaws.com/img.crft.app/package-flashpoint-logo-bw.svg',
      height: 25,
      width: 25
    }
  }, {
    id: '3',
    text: 'Node 3',
    icon: {
      url: 'https://s3.amazonaws.com/img.crft.app/package-twitter-logo-bw.svg',
      height: 25,
      width: 25
    }
  }]} edges={[{
    id: '1-2',
    from: '1',
    to: '2'
  }, {
    id: '2-3',
    from: '2',
    to: '3'
  }]} node={<Node icon={<Icon />} />} onLayoutChange={layout => console.log('Layout', layout)} />
  </div>`,...(D=(z=h.parameters)==null?void 0:z.docs)==null?void 0:D.source}}};var $,E,A;p.parameters={...p.parameters,docs:{...($=p.parameters)==null?void 0:$.docs,source:{originalSource:`() => <div style={{
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}}>
    <Canvas nodes={[{
    id: '1',
    height: 50,
    width: 50,
    icon: {
      url: 'https://s3.amazonaws.com/img.crft.app/package-slack-logo-bw.svg',
      height: 25,
      width: 25
    }
  }, {
    id: '2',
    height: 50,
    width: 50,
    icon: {
      url: 'https://s3.amazonaws.com/img.crft.app/package-flashpoint-logo-bw.svg',
      height: 25,
      width: 25
    }
  }, {
    id: '3',
    height: 50,
    width: 50,
    icon: {
      url: 'https://s3.amazonaws.com/img.crft.app/package-twitter-logo-bw.svg',
      height: 25,
      width: 25
    }
  }]} edges={[{
    id: '1-2',
    from: '1',
    to: '2'
  }, {
    id: '2-3',
    from: '2',
    to: '3'
  }]} node={<Node icon={<Icon />} />} onLayoutChange={layout => console.log('Layout', layout)} />
  </div>`,...(A=(E=p.parameters)==null?void 0:E.docs)==null?void 0:A.source}}};var I,_,M;m.parameters={...m.parameters,docs:{...(I=m.parameters)==null?void 0:I.docs,source:{originalSource:`() => {
  const [nodes] = useState<any[]>([{
    id: '1',
    text: 'Node 1'
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
    to: '2'
  }]);
  return <div style={{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }}>
      <Canvas nodes={nodes} edges={edges} onNodeLinkCheck={(_event, from: NodeData, to: NodeData) => {
      if (from.id === to.id || to.id === '3') {
        return false;
      }
      if (hasLink(edges, from, to)) {
        return false;
      }
      if (detectCircular(nodes, edges, from, to)) {
        return false;
      }
      return true;
    }} onNodeLink={(_event, from, to) => {
      const id = \`\${from.id}-\${to.id}\`;
      setEdges([...edges, {
        id,
        from: from.id,
        to: to.id
      }]);
    }} onLayoutChange={layout => console.log('Layout', layout)} />
    </div>;
}`,...(M=(_=m.parameters)==null?void 0:_.docs)==null?void 0:M.source}}};var O,P,T;u.parameters={...u.parameters,docs:{...(O=u.parameters)==null?void 0:O.docs,source:{originalSource:`() => {
  const [nodes] = useState<any[]>([{
    id: '1',
    text: 'Node 1'
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
    to: '2'
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
        to: to.id
      }]);
    }} onLayoutChange={layout => console.log('Layout', layout)} />
    </div>;
}`,...(T=(P=u.parameters)==null?void 0:P.docs)==null?void 0:T.source}}};var R,F,V;f.parameters={...f.parameters,docs:{...(R=f.parameters)==null?void 0:R.docs,source:{originalSource:`() => {
  const [nodes, setNodes] = useState<any[]>([{
    id: '1',
    text: 'Node 1'
  }, {
    id: '2',
    text: 'Node 2'
  }, {
    id: '3',
    text: 'Node 3'
  }]);
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
    }} onClick={() => setNodes([...nodes, {
      id: \`a\${Math.random()}\`,
      text: \`Node \${Math.random()}\`
    }])}>
        Add Nodes
      </button>
      <Canvas nodes={nodes} edges={[{
      id: '1-2',
      from: '1',
      to: '2'
    }, {
      id: '1-3',
      from: '1',
      to: '3'
    }]} onLayoutChange={layout => console.log('Layout', layout)} />
    </div>;
}`,...(V=(F=f.parameters)==null?void 0:F.docs)==null?void 0:V.source}}};var q,B,G;b.parameters={...b.parameters,docs:{...(q=b.parameters)==null?void 0:q.docs,source:{originalSource:`() => <div style={{
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}}>
    <Canvas nodes={[{
    id: '1',
    height: 125,
    width: 250,
    data: {
      value: 50
    }
  }, {
    id: '2',
    height: 125,
    width: 250,
    data: {
      value: 25
    }
  }]} edges={[{
    id: '1-2',
    from: '1',
    to: '2'
  }]} node={<Node>
          {event => <foreignObject height={event.height} width={event.width} x={0} y={0}>
              <div style={{
        padding: 10,
        textAlign: 'center'
      }}>
                <h3 style={{
          color: 'white'
        }}>Age</h3>
                <input type="range" min="1" max="100" value={event.node.data.value} />
              </div>
            </foreignObject>}
        </Node>} onLayoutChange={layout => console.log('Layout', layout)} />
  </div>`,...(G=(B=b.parameters)==null?void 0:B.docs)==null?void 0:G.source}}};var H,J,K;x.parameters={...x.parameters,docs:{...(H=x.parameters)==null?void 0:H.docs,source:{originalSource:`() => <div style={{
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}}>
    <Canvas nodes={[{
    id: '1',
    text: 'Node 1',
    height: 50,
    width: 50
  }, {
    id: '2',
    text: 'Node 2',
    height: 80,
    width: 250
  }]} edges={[{
    id: '1-2',
    from: '1',
    to: '2'
  }]} onLayoutChange={layout => console.log('Layout', layout)} />
  </div>`,...(K=(J=x.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,U,W;y.parameters={...y.parameters,docs:{...(Q=y.parameters)==null?void 0:Q.docs,source:{originalSource:`() => <div style={{
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}}>
    <Canvas nodes={[{
    id: '1',
    text: 'Node 1',
    icon: {
      url: 'https://s3.amazonaws.com/img.crft.app/package-slack-logo-bw.svg',
      height: 25,
      width: 25
    }
  }, {
    id: '2',
    icon: {
      url: 'https://s3.amazonaws.com/img.crft.app/package-flashpoint-logo-bw.svg',
      height: 25,
      width: 25
    }
  }, {
    id: '3',
    text: 'Node 3 with a long label for testing',
    icon: {
      url: 'https://s3.amazonaws.com/img.crft.app/package-twitter-logo-bw.svg',
      height: 25,
      width: 25
    }
  }, {
    id: '4',
    text: 'Node4withalongnobreakingspacelabel',
    icon: {
      url: 'https://s3.amazonaws.com/img.crft.app/package-twitter-logo-bw.svg',
      height: 25,
      width: 25
    }
  }, {
    id: '5',
    text: 'asdf asdf asdfddd dssss asdfdsds sdssd'
  }, {
    id: '6',
    text: 'normal label'
  }, {
    id: '7',
    height: 70,
    width: 70,
    icon: {
      url: 'https://s3.amazonaws.com/img.crft.app/package-slack-logo-bw.svg',
      height: 42,
      width: 42
    }
  }, {
    id: '8',
    icon: {
      url: 'https://s3.amazonaws.com/img.crft.app/package-slack-logo-bw.svg',
      height: 42,
      width: 42
    }
  }]} edges={[{
    id: '1-2',
    from: '1',
    to: '2'
  }, {
    id: '2-3',
    from: '2',
    to: '3'
  }, {
    id: '2-7',
    from: '2',
    to: '7'
  }, {
    id: '2-4',
    from: '2',
    to: '4'
  }, {
    id: '4-5',
    from: '4',
    to: '5'
  }, {
    id: '4-6',
    from: '4',
    to: '6'
  }, {
    id: '4-8',
    from: '4',
    to: '8'
  }]} node={<Node icon={<Icon />} />} />
  </div>`,...(W=(U=y.parameters)==null?void 0:U.docs)==null?void 0:W.source}}};var X,Y,Z;w.parameters={...w.parameters,docs:{...(X=w.parameters)==null?void 0:X.docs,source:{originalSource:`() => <div style={{
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
  }, {
    id: '3',
    text: '3'
  }]} edges={[{
    id: '1-2',
    from: '1',
    to: '2'
  }]} onLayoutChange={layout => console.log('Layout', layout)} node={(node: NodeProps) => <Node {...node} dragCursor="grab" dragType="all" draggable={false} onClick={() => {
    console.log('click');
  }} />} />
  </div>`,...(Z=(Y=w.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var oo,to,no;v.parameters={...v.parameters,docs:{...(oo=v.parameters)==null?void 0:oo.docs,source:{originalSource:`() => {
  const [nodes] = useState<any[]>([{
    id: '1',
    text: 'Node 1'
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
    to: '2'
  }]);
  return <div style={{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }}>
      <Canvas nodes={nodes} edges={edges} node={(node: NodeProps) => <Node {...node} linkable={false} />} onNodeLink={(_event, from: NodeData, to: NodeData) => {
      const id = \`\${from.id}-\${to.id}\`;
      setEdges([...edges, {
        id,
        from: from.id,
        to: to.id
      }]);
    }} onLayoutChange={layout => console.log('Layout', layout)} />
    </div>;
}`,...(no=(to=v.parameters)==null?void 0:to.docs)==null?void 0:no.source}}};var eo,so,ao;N.parameters={...N.parameters,docs:{...(eo=N.parameters)==null?void 0:eo.docs,source:{originalSource:`() => <div style={{
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
    text: '2',
    selectionDisabled: true
  }, {
    id: '3',
    text: '3'
  }]} edges={[{
    id: '1-2',
    from: '1',
    to: '2'
  }]} onLayoutChange={layout => console.log('Layout', layout)} node={(node: NodeProps) => <Node {...node} dragCursor="grab" dragType="all" onClick={() => {
    console.log('click');
  }} />} />
  </div>`,...(ao=(so=N.parameters)==null?void 0:so.docs)==null?void 0:ao.source}}};const jo=["Disabled","LabelsAndIcons","Icons","LinkingNodeRestrictions","LinkingNodes","DynamicNodes","ForeignObjects","VariableSizes","LongLabels","NotDraggable","NotLinkable","NotSelectable"];export{c as Disabled,f as DynamicNodes,b as ForeignObjects,p as Icons,h as LabelsAndIcons,m as LinkingNodeRestrictions,u as LinkingNodes,y as LongLabels,w as NotDraggable,v as NotLinkable,N as NotSelectable,x as VariableSizes,jo as __namedExportsOrder,Co as default};
