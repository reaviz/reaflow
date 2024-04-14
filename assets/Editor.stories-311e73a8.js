import{j as n}from"./jsx-runtime-9c4ae004.js";import{r as o}from"./index-1b03fe98.js";import{C as v,N as f,E as y,M as S,a as j,I as C,L as M,P as A,R as L,A as I,m as d,c as P}from"./Icon-0f63e463.js";import"./IntersectionQuery-f6c749c2.js";import{a as z}from"./crudHelpers-031fd461.js";import{u as B}from"./use-drag-controls-142bd013.js";import"./index-6fd5a17b.js";import"./index-4b095e7f.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";const K={title:"Demos/Editor",component:v,subcomponents:{Node:f,Edge:y,MarkerArrow:S,Arrow:j,Icon:C,Label:M,Port:A,Remove:L,Add:I}},s=()=>{const i=B(),[D,r]=o.useState(null),[a,c]=o.useState(null),[N,l]=o.useState(!1),[g,E]=o.useState([{id:"1-2",from:"1",to:"2"}]),[u,k]=o.useState([{id:"1",text:"1"},{id:"2",text:"2"}]),p=(e,t)=>{console.log("Start of Dragging",e,t),c(t),i.start(e,{snapToCursor:!0})},w=e=>{if(console.log("End of Dragging",e),N){const t=`${a}-${Math.floor(Math.random()*100)+1}`,m=z(u,g,{id:t,text:t},D);k(m.nodes),E(m.edges)}l(!1),c(null),r(null)};return n.jsxs("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:[n.jsx("style",{children:`
          .left {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            width: 150px;
            background: #272626;
            color: white;
            padding: 20px;
            display: flex;
          }
          .right {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 150px;
            right: 0;
          }
          .block {
            height: 50px;
            width: 50px;
            cursor: grab;
            background: black;
            margin-right: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            flex: 1;
          }
          .dragger {
            z-index: 999;
            pointer-events: none;
            user-select: none;
            cursor: grabbing;
            height: 70px;
            width: 150px;
          }
          .dragInner {
            pointer-events: none;
            margin-left: 80px;
            border-radius: 5px;
            background: black;
            border: solid 1px #00c5be;
            height: 40px;
            width: 40px;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}),n.jsxs("div",{className:"left",children:[n.jsx(d.div,{className:"block",onMouseDown:e=>p(e,"1"),children:"Block 1"}),n.jsx(d.div,{className:"block",onMouseDown:e=>p(e,"2"),children:"Block 2"})]}),n.jsx("div",{className:"right",children:n.jsx(v,{nodes:u,edges:g,node:n.jsx(f,{onEnter:(e,t)=>r(t),onLeave:(e,t)=>r(null)}),onMouseEnter:()=>l(!0),onMouseLeave:()=>l(!1),onLayoutChange:e=>console.log("Layout",e)})}),n.jsx(P,{children:n.jsx(d.div,{drag:!0,dragControls:i,className:"dragger",onDragEnd:w,children:a&&n.jsx("div",{className:"dragInner",children:a})})})]})};var x,b,h;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`() => {
  const dragControls = useDragControls();
  const [enteredNode, setEnteredNode] = useState<NodeData | null>(null);
  const [activeDrag, setActiveDrag] = useState<string | null>(null);
  const [droppable, setDroppable] = useState<boolean>(false);
  const [edges, setEdges] = useState<EdgeData[]>([{
    id: '1-2',
    from: '1',
    to: '2'
  }]);
  const [nodes, setNodes] = useState<NodeData[]>([{
    id: '1',
    text: '1'
  }, {
    id: '2',
    text: '2'
  }]);
  const onDragStart = (event, data) => {
    console.log('Start of Dragging', event, data);
    setActiveDrag(data);
    dragControls.start(event, {
      snapToCursor: true
    });
  };
  const onDragEnd = event => {
    console.log('End of Dragging', event);
    if (droppable) {
      const id = \`\${activeDrag}-\${Math.floor(Math.random() * (100 - 1 + 1)) + 1}\`;
      const result = addNodeAndEdge(nodes, edges, {
        id,
        text: id
      }, enteredNode);
      setNodes(result.nodes);
      setEdges(result.edges);
    }
    setDroppable(false);
    setActiveDrag(null);
    setEnteredNode(null);
  };
  return <div style={{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }}>
      <style>
        {\`
          .left {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            width: 150px;
            background: #272626;
            color: white;
            padding: 20px;
            display: flex;
          }
          .right {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 150px;
            right: 0;
          }
          .block {
            height: 50px;
            width: 50px;
            cursor: grab;
            background: black;
            margin-right: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            flex: 1;
          }
          .dragger {
            z-index: 999;
            pointer-events: none;
            user-select: none;
            cursor: grabbing;
            height: 70px;
            width: 150px;
          }
          .dragInner {
            pointer-events: none;
            margin-left: 80px;
            border-radius: 5px;
            background: black;
            border: solid 1px #00c5be;
            height: 40px;
            width: 40px;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        \`}
      </style>
      <div className="left">
        <motion.div className="block" onMouseDown={event => onDragStart(event, '1')}>
          Block 1
        </motion.div>
        <motion.div className="block" onMouseDown={event => onDragStart(event, '2')}>
          Block 2
        </motion.div>
      </div>
      <div className="right">
        <Canvas nodes={nodes} edges={edges} node={<Node onEnter={(event, node) => setEnteredNode(node)} onLeave={(event, node) => setEnteredNode(null)} />} onMouseEnter={() => setDroppable(true)} onMouseLeave={() => setDroppable(false)} onLayoutChange={layout => console.log('Layout', layout)} />
      </div>
      <Portal>
        <motion.div drag dragControls={dragControls} className="dragger" onDragEnd={onDragEnd}>
          {activeDrag && <div className="dragInner">
              {activeDrag}
            </div>}
        </motion.div>
      </Portal>
    </div>;
}`,...(h=(b=s.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};const Q=["Simple"];export{s as Simple,Q as __namedExportsOrder,K as default};
