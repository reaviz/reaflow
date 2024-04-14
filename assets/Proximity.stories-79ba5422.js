import{j as i}from"./jsx-runtime-9c4ae004.js";import{r as s}from"./index-1b03fe98.js";import{g as Y,d as R,C as P,N as I,E as G,M as H,a as J,I as K,L as U,P as V,R as Z,A as nn,m as y,e as W,c as _}from"./Icon-0f63e463.js";import{I as en}from"./IntersectionQuery-f6c749c2.js";import{a as q}from"./crudHelpers-031fd461.js";import{u as O}from"./use-drag-controls-142bd013.js";import"./index-6fd5a17b.js";import"./index-4b095e7f.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";const Q=(r,e)=>{var l;const a=[];if(r!=null&&r.length)for(const o of r){let d=o.x,u=o.y;e&&(d=e.x+d,u=e.y+u);const g=[new R(d,u),new R(d+o.width,u+o.height)];a.push({points:g,node:o}),(l=o.children)!=null&&l.length&&a.push(...Q(o.children,o))}return a},tn=(r,e)=>{const[a,l]=e.points;let o=0,d=0;return r.x<a.x?o=a.x-r.x:r.x>l.x&&(o=l.x-r.x),r.y<a.y?d=a.y-r.y:r.y>l.y&&(d=l.y-r.y),Math.floor(Math.sqrt(o*o+d*d))},on=(r,e,a,l)=>{const o=[],d=new R(r.x,r.y).transform(e);for(const c of a){const h=en.pointInRectangle(d,c.points[0],c.points[1]),f=tn(d,c);o.push({node:c.node,minDist:f,intersects:h})}let u=l,g=null,m=null;for(const c of o)c.minDist<u&&!c.intersects&&(m=c.node.id,u=c.minDist),c.intersects&&(g=c.node.id);return g&&(!m||m===g)&&(m=g,u=0),{intersectedNodeId:g,foundNodeId:m,foundDist:u}},X=({canvasRef:r,disabled:e,minDistance:a=40,...l})=>{const o=s.useRef(null),d=s.useRef(null),u=s.useRef(null),g=s.useRef(0),m=s.useRef(l);s.useEffect(()=>{m.current=l},[l]);const[c,h]=s.useState(null),[f,D]=s.useState(null),[b,v]=s.useState(null),x=s.useCallback(()=>{if(e)return;const n=r.current;D(Y({containerRef:n.containerRef,zoom:n.zoom,layoutXY:n.xy})),v(Q(n.layout.children))},[e]),N=s.useCallback(n=>{if(!f||e)return;const{onMatchChange:t,onIntersects:p,onDistanceChange:A}=m.current,{intersectedNodeId:C,foundNodeId:w,foundDist:j}=on(n,f,b,a),M=j!==a?j:null;w!==d.current&&(t==null||t(w,j)),C!==o.current&&(p==null||p(C)),A&&M!==u.current&&(cancelAnimationFrame(g.current),g.current=requestAnimationFrame(()=>{A(M)})),o.current=C,d.current=w,u.current=M,h(w)},[f,e,a,b]);s.useEffect(()=>()=>cancelAnimationFrame(g.current));const k=s.useCallback(()=>{e||(h(null),D(null),v(null))},[e]);return{match:c,onDragStart:x,onDrag:N,onDragEnd:k}},fn={title:"Demos/Proximity",component:P,subcomponents:{Node:I,Edge:G,MarkerArrow:H,Arrow:J,Icon:K,Label:U,Port:V,Remove:Z,Add:nn}},S=()=>{const r=O(),[e,a]=s.useState(null),[l,o]=s.useState(null),[d,u]=s.useState(!1),[g,m]=s.useState([{id:"1-2",from:"1",to:"2"}]),[c,h]=s.useState([{id:"1",text:"1"},{id:"2",text:"2"}]),f=s.useRef(null),{onDragStart:D,onDrag:b,onDragEnd:v}=X({canvasRef:f,onIntersects:n=>{console.info("Node Intersected",n)},onDistanceChange:n=>{console.info("Distance Changed",n)},onMatchChange:n=>{console.info("Match Changed!",n);let t=null;n&&(t=c.find(p=>p.id===n)),a(t),u(t!==null)}}),x=(n,t)=>{console.info("Start of Dragging",n,t),D(n),o(t),r.start(n,{snapToCursor:!0})},N=n=>{b(n)},k=n=>{if(v(n),d){const t=`${l}-${Math.floor(Math.random()*100)+1}`,p=q(c,g,{id:t,text:t},e);h(p.nodes),m(p.edges)}u(!1),o(null),a(null)};return i.jsxs("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:[i.jsx("style",{children:`
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
          .closest {
            stroke: yellow !important;
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
        `}),i.jsxs("div",{className:"left",children:[i.jsx(y.div,{className:"block",onMouseDown:n=>x(n,"1"),children:"Block 1"}),i.jsx(y.div,{className:"block",onMouseDown:n=>x(n,"2"),children:"Block 2"})]}),i.jsx("div",{className:"right",children:i.jsx(P,{ref:f,nodes:c,edges:g,node:n=>i.jsx(I,{...n,style:{strokeWidth:(e==null?void 0:e.id)===n.id&&d?5:1},className:W({closest:(e==null?void 0:e.id)===n.id}),onEnter:(t,p)=>a(p),onLeave:(t,p)=>a(null)}),onLayoutChange:n=>console.info("Layout",n)})}),i.jsx(_,{children:i.jsx(y.div,{drag:!0,dragControls:r,className:"dragger",onDrag:N,onDragEnd:k,children:l&&i.jsx("div",{className:"dragInner",children:l})})})]})},E=()=>{const r=O(),[e,a]=s.useState(null),[l,o]=s.useState(null),[d,u]=s.useState(!1),[g,m]=s.useState([{id:"1",text:"1"},{id:"2"},{id:"2-1-1",text:"2 > 2.1",parent:"2"},{id:"3",text:"3"}]),[c,h]=s.useState([{id:"1-2",from:"1",to:"2"},{id:"2-3",from:"2",to:"3"}]),f=s.useRef(null),{onDragStart:D,onDrag:b,onDragEnd:v}=X({canvasRef:f,onDistanceChange:n=>{console.info("Distance Changed",n)},onIntersects:n=>{console.info("Node Intersected",n)},onMatchChange:n=>{console.info("Match Changed!",n);let t=null;n&&(t=g.find(p=>p.id===n)),a(t),u(t!==null)}}),x=(n,t)=>{console.info("Start of Dragging",n,t),D(n),o(t),r.start(n,{snapToCursor:!0})},N=n=>{b(n)},k=n=>{if(v(n),d){const t=`${l}-${Math.floor(Math.random()*100)+1}`;if((e==null?void 0:e.id)==="2")m([...g,{id:t,text:t,parent:"2"}]);else{const p=q(g,c,{id:t,text:t,parent:e==null?void 0:e.parent},e);m(p.nodes),h(p.edges)}}u(!1),o(null),a(null)};return i.jsxs("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:[i.jsx("style",{children:`
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
          .closest {
            stroke: yellow !important;
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
        `}),i.jsxs("div",{className:"left",children:[i.jsx(y.div,{className:"block",onMouseDown:n=>x(n,"1"),children:"Block 1"}),i.jsx(y.div,{className:"block",onMouseDown:n=>x(n,"2"),children:"Block 2"})]}),i.jsx("div",{className:"right",children:i.jsx(P,{ref:f,nodes:g,edges:c,node:n=>i.jsx(I,{...n,style:{strokeWidth:(e==null?void 0:e.id)===n.id&&d?5:1},className:W({closest:(e==null?void 0:e.id)===n.id})}),onLayoutChange:n=>console.info("Layout",n)})}),i.jsx(_,{children:i.jsx(y.div,{drag:!0,dragControls:r,className:"dragger",onDrag:N,onDragEnd:k,children:l&&i.jsx("div",{className:"dragInner",children:l})})})]})};var L,z,B;S.parameters={...S.parameters,docs:{...(L=S.parameters)==null?void 0:L.docs,source:{originalSource:`() => {
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
  const canvasRef = useRef<CanvasRef | null>(null);
  const {
    onDragStart: onProximityDragStart,
    onDrag: onProximityDrag,
    onDragEnd: onProximityDragEnd
  } = useProximity({
    canvasRef,
    onIntersects: (match: string) => {
      console.info('Node Intersected', match);
    },
    onDistanceChange: (distance: number | null) => {
      console.info('Distance Changed', distance);
    },
    onMatchChange: (match: string | null) => {
      console.info('Match Changed!', match);
      let matchNode: NodeData | null = null;
      if (match) {
        matchNode = nodes.find(n => n.id === match);
      }
      setEnteredNode(matchNode);
      setDroppable(matchNode !== null);
    }
  });
  const onDragStart = (event, data) => {
    console.info('Start of Dragging', event, data);
    onProximityDragStart(event);
    setActiveDrag(data);
    dragControls.start(event, {
      snapToCursor: true
    });
  };
  const onDrag = event => {
    onProximityDrag(event);
  };
  const onDragEnd = event => {
    onProximityDragEnd(event);
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
          .closest {
            stroke: yellow !important;
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
        <Canvas ref={canvasRef} nodes={nodes} edges={edges} node={n => <Node {...n} style={{
        strokeWidth: enteredNode?.id === n.id && droppable ? 5 : 1
      }} className={classNames({
        closest: enteredNode?.id === n.id
      })} onEnter={(event, node) => setEnteredNode(node)} onLeave={(event, node) => setEnteredNode(null)} />} onLayoutChange={layout => console.info('Layout', layout)} />
      </div>
      <Portal>
        <motion.div drag dragControls={dragControls} className="dragger" onDrag={onDrag} onDragEnd={onDragEnd}>
          {activeDrag && <div className="dragInner">
              {activeDrag}
            </div>}
        </motion.div>
      </Portal>
    </div>;
}`,...(B=(z=S.parameters)==null?void 0:z.docs)==null?void 0:B.source}}};var $,T,F;E.parameters={...E.parameters,docs:{...($=E.parameters)==null?void 0:$.docs,source:{originalSource:`() => {
  const dragControls = useDragControls();
  const [enteredNode, setEnteredNode] = useState<NodeData | null>(null);
  const [activeDrag, setActiveDrag] = useState<string | null>(null);
  const [droppable, setDroppable] = useState<boolean>(false);
  const [nodes, setNodes] = useState<NodeData[]>([{
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
  const canvasRef = useRef<CanvasRef | null>(null);
  const {
    onDragStart: onProximityDragStart,
    onDrag: onProximityDrag,
    onDragEnd: onProximityDragEnd
  } = useProximity({
    canvasRef,
    onDistanceChange: (distance: number | null) => {
      console.info('Distance Changed', distance);
    },
    onIntersects: (match: string) => {
      console.info('Node Intersected', match);
    },
    onMatchChange: (match: string | null) => {
      console.info('Match Changed!', match);
      let matchNode: NodeData | null = null;
      if (match) {
        matchNode = nodes.find(n => n.id === match);
      }
      setEnteredNode(matchNode);
      setDroppable(matchNode !== null);
    }
  });
  const onDragStart = (event, data) => {
    console.info('Start of Dragging', event, data);
    onProximityDragStart(event);
    setActiveDrag(data);
    dragControls.start(event, {
      snapToCursor: true
    });
  };
  const onDrag = event => {
    onProximityDrag(event);
  };
  const onDragEnd = event => {
    onProximityDragEnd(event);
    if (droppable) {
      const id = \`\${activeDrag}-\${Math.floor(Math.random() * (100 - 1 + 1)) + 1}\`;

      // This is for demonstration purposes, you should
      // tweak this to fit your business infoic
      if (enteredNode?.id === '2') {
        setNodes([...nodes, {
          id,
          text: id,
          parent: '2'
        }]);
      } else {
        const result = addNodeAndEdge(nodes, edges, {
          id,
          text: id,
          parent: enteredNode?.parent
        }, enteredNode);
        setNodes(result.nodes);
        setEdges(result.edges);
      }
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
          .closest {
            stroke: yellow !important;
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
        <Canvas ref={canvasRef} nodes={nodes} edges={edges} node={n => <Node {...n} style={{
        strokeWidth: enteredNode?.id === n.id && droppable ? 5 : 1
      }} className={classNames({
        closest: enteredNode?.id === n.id
      })} />} onLayoutChange={layout => console.info('Layout', layout)} />
      </div>
      <Portal>
        <motion.div drag dragControls={dragControls} className="dragger" onDrag={onDrag} onDragEnd={onDragEnd}>
          {activeDrag && <div className="dragInner">
              {activeDrag}
            </div>}
        </motion.div>
      </Portal>
    </div>;
}`,...(F=(T=E.parameters)==null?void 0:T.docs)==null?void 0:F.source}}};const hn=["Simple","Nested"];export{E as Nested,S as Simple,hn as __namedExportsOrder,fn as default};
