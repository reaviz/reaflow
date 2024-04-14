import{j as f}from"./jsx-runtime-9c4ae004.js";import{g as k,r}from"./index-1b03fe98.js";import{C as E,N,E as j,M as w,a as z,I as L,L as I,P as A,R as M,A as P}from"./Icon-0f63e463.js";import{d as B,u as D}from"./IntersectionQuery-f6c749c2.js";import"./index-6fd5a17b.js";import"./index-4b095e7f.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";var v=Array.isArray,m=Object.keys,O=Object.prototype.hasOwnProperty,$=function a(t,e){if(t===e)return!0;var _=v(t),c=v(e),n,s,h;if(_&&c){if(s=t.length,s!=e.length)return!1;for(n=0;n<s;n++)if(!a(t[n],e[n]))return!1;return!0}if(_!=c)return!1;var d=t instanceof Date,o=e instanceof Date;if(d!=o)return!1;if(d&&o)return t.getTime()==e.getTime();var l=t instanceof RegExp,p=e instanceof RegExp;if(l!=p)return!1;if(l&&p)return t.toString()==e.toString();if(t instanceof Object&&e instanceof Object){var i=m(t);if(s=i.length,s!==m(e).length)return!1;for(n=0;n<s;n++)if(!O.call(e,i[n]))return!1;for(n=0;n<s;n++)if(h=i[n],!a(t[h],e[h]))return!1;return!0}return!1};const T=B,q=$;let F=class b{constructor(t){Object.defineProperties(this,{_opts:{writable:!0},_history:{writable:!0},_position:{writable:!0},_initialState:{writable:!0},_onUpdate:{writable:!0,value:()=>{}},_onBeforeSave:{writable:!0,value:()=>{}},_onMaxLength:{writable:!0,value:()=>{}},_isExceeded:{writable:!0,value:!1},_suspendSave:{writable:!0,value:!1}}),this._opts=T.copy(t,{provider:null,maxLength:20}),this._initiliaze()}_initiliaze(){this._initialState=void 0,this._history=[],this._isExceeded=!1,this._position=0}_checkMaxLength(){this._history.length>this._opts.maxLength?(this._history=this._history.slice(1,this._history.length),this._isExceeded||(this._onMaxLength.call(null,this.current(),this.history(),this),this._isExceeded=!0)):this._isExceeded=!1}_rejectSave(t,e){return q(t,this.current())||e===!1||this._suspendSave}canUndo(){return this._position>1}canRedo(){return this._position<this._history.length}static callbackError(t){if(typeof t!="function")throw new TypeError("callback must be a function")}import(t=[]){if(!Array.isArray(t))throw new TypeError("Items must be an array");return this._initiliaze(),this._history=t,this._position=this._history.length,this._initialState=t[0],this}history(){return this._history}save(t){typeof t>"u"&&typeof this._opts.provider=="function"&&(t=this._opts.provider());let e=this._onBeforeSave.call(null,t,this);return t=e||t,this._rejectSave(t,e)?this:(this._position<this._history.length&&(this._history=this._history.slice(0,this._position)),typeof t<"u"&&(this._history.push(t),this._initialState===void 0&&(this._initialState=t)),this._checkMaxLength(),this._position=this._history.length,this._onUpdate.call(null,this.current(),"save",this.history(),this),this)}suspendSave(t=!0){return this._suspendSave=t,this}allowedSave(){return!this._suspendSave}clear(){return this._initiliaze(),this._onUpdate.call(null,null,"clear",this.history(),this),this}undo(t){return this.canUndo()&&(this._position--,typeof t=="function"&&t(this.current()),this._onUpdate.call(null,this.current(),"undo",this.history(),this)),this}redo(t){return this.canRedo()&&(this._position++,typeof t=="function"&&t(this.current()),this._onUpdate.call(null,this.current(),"redo",this.history(),this)),this}current(){return this._history.length?this._history[this._position-1]:null}count(){return this._history.length?this._history.length-1:0}initialState(){return this._initialState}onUpdate(t){return b.callbackError(t),this._onUpdate=t,this}onMaxLength(t){return b.callbackError(t),this._onMaxLength=t,this}onBeforeSave(t){return b.callbackError(t),this._onBeforeSave=t,this}};var H=F,G=H;const J=k(G),K=({nodes:a,edges:t,disabled:e,maxHistory:_=20,onUndoRedo:c})=>{const[n,s]=r.useState(!1),[h,d]=r.useState(!1),o=r.useRef(new J({maxLength:_})),l=r.useRef(c);r.useEffect(()=>{l.current=c},[c]),r.useEffect(()=>{o.current.save({nodes:a,edges:t}),s(o.current.canUndo()),d(o.current.canRedo())},[a,t]);const p=r.useCallback(()=>{o.current.undo(u=>{const y=o.current.canUndo(),g=o.current.canRedo();s(y),d(g),l.current({...u,type:"undo",canUndo:y,canRedo:g})})},[]),i=r.useCallback(()=>{o.current.redo(u=>{const y=o.current.canUndo(),g=o.current.canRedo();s(y),d(g),l.current({...u,type:"redo",canUndo:y,canRedo:g})})},[]),C=r.useCallback((u,y)=>{o.current.clear(),s(!1),d(!1),l.current({type:"clear",canUndo:!1,canRedo:!1}),o.current.save({nodes:u,edges:y})},[]);return D([{name:"Undo",keys:"mod+z",category:"Canvas",description:"Undo changes",callback:u=>{u.preventDefault(),!e&&n&&p()}},{name:"Redo",keys:"mod+shift+z",category:"Canvas",description:"Redo changes",callback:u=>{u.preventDefault(),!e&&h&&i()}}]),{canUndo:n,canRedo:h,count:()=>o.current.count(),history:()=>o.current.history(),clear:C,redo:i,undo:p}},nt={title:"Demos/Undo Redo",component:E,subcomponents:{Node:N,Edge:j,MarkerArrow:w,Arrow:z,Icon:L,Label:I,Port:A,Remove:M,Add:P}},x=()=>{const[a,t]=r.useState([{id:"1",text:"Node 1"},{id:"2",text:"Node 2"},{id:"3",text:"Node 3"}]),[e,_]=r.useState([{id:"1-2",from:"1",to:"2"},{id:"1-3",from:"1",to:"3"}]),{undo:c,redo:n,canUndo:s,canRedo:h,history:d,clear:o,count:l}=K({nodes:a,edges:e,onUndoRedo:i=>{console.log("Undo / Redo",i),i.type!=="clear"&&(_(i.edges),t(i.nodes))}}),p=()=>{t([...a,{id:`a${Math.random()}`,text:`Node ${Math.random()}`}])};return f.jsxs("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:[f.jsx("button",{style:{position:"absolute",top:10,left:10,zIndex:999},onClick:p,children:"Add Nodes"}),f.jsx("button",{style:{position:"absolute",top:10,left:100,zIndex:999},onClick:c,disabled:!s,children:"Undo"}),f.jsx("button",{style:{position:"absolute",top:10,left:160,zIndex:999},onClick:n,disabled:!h,children:"Redo"}),f.jsx("button",{style:{position:"absolute",top:10,left:220,zIndex:999},onClick:()=>console.log(d()),children:"Print history"}),f.jsx("button",{style:{position:"absolute",top:10,left:320,zIndex:999},onClick:()=>console.log(l()),disabled:!l(),children:"Print count"}),f.jsx("button",{style:{position:"absolute",top:10,left:410,zIndex:999},onClick:()=>o(a,e),children:"Clear history"}),f.jsx(E,{nodes:a,edges:e,onLayoutChange:i=>console.log("Layout",i)})]})};var U,R,S;x.parameters={...x.parameters,docs:{...(U=x.parameters)==null?void 0:U.docs,source:{originalSource:`() => {
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
  const [edges, setEdges] = useState<any[]>([{
    id: '1-2',
    from: '1',
    to: '2'
  }, {
    id: '1-3',
    from: '1',
    to: '3'
  }]);
  const {
    undo,
    redo,
    canUndo,
    canRedo,
    history,
    clear,
    count
  } = useUndo({
    nodes,
    edges,
    onUndoRedo: (state: UndoRedoEvent) => {
      console.log('Undo / Redo', state);
      if (state.type !== 'clear') {
        setEdges(state.edges);
        setNodes(state.nodes);
      }
    }
  });
  const addNode = () => {
    setNodes([...nodes, {
      id: \`a\${Math.random()}\`,
      text: \`Node \${Math.random()}\`
    }]);
  };
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
    }} onClick={addNode}>
        Add Nodes
      </button>
      <button style={{
      position: 'absolute',
      top: 10,
      left: 100,
      zIndex: 999
    }} onClick={undo} disabled={!canUndo}>
        Undo
      </button>
      <button style={{
      position: 'absolute',
      top: 10,
      left: 160,
      zIndex: 999
    }} onClick={redo} disabled={!canRedo}>
        Redo
      </button>
      <button style={{
      position: 'absolute',
      top: 10,
      left: 220,
      zIndex: 999
    }} onClick={() => console.log(history())}>
        Print history
      </button>
      <button style={{
      position: 'absolute',
      top: 10,
      left: 320,
      zIndex: 999
    }} onClick={() => console.log(count())} disabled={!count()}>
        Print count
      </button>
      <button style={{
      position: 'absolute',
      top: 10,
      left: 410,
      zIndex: 999
    }} onClick={() => clear(nodes, edges)}>
        Clear history
      </button>
      <Canvas nodes={nodes} edges={edges} onLayoutChange={layout => console.log('Layout', layout)} />
    </div>;
}`,...(S=(R=x.parameters)==null?void 0:R.docs)==null?void 0:S.source}}};const ot=["Simple"];export{x as Simple,ot as __namedExportsOrder,nt as default};
