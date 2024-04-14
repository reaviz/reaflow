import{j as S}from"./jsx-runtime-9c4ae004.js";import{R as W,r as C}from"./index-1b03fe98.js";import{C as z,N as ge,E as be,M as Se,a as we,I as ye,L as Ce,P as Pe,R as Te,A as Ye,b as Xe}from"./Icon-0f63e463.js";import"./index-6fd5a17b.js";import"./index-4b095e7f.js";import"./index-f6b105ee.js";import"./extends-20258d9b.js";var T=function(i,n){return Number(i.toFixed(n))},Ne=function(i,n){return typeof i=="number"?i:n},g=function(i,n,e){e&&typeof e=="function"&&e(i,n)},ze=function(i){return-Math.cos(i*Math.PI)/2+.5},Ae=function(i){return i},Ee=function(i){return i*i},_e=function(i){return i*(2-i)},We=function(i){return i<.5?2*i*i:-1+(4-2*i)*i},De=function(i){return i*i*i},Oe=function(i){return--i*i*i+1},Ze=function(i){return i<.5?4*i*i*i:(i-1)*(2*i-2)*(2*i-2)+1},ke=function(i){return i*i*i*i},Le=function(i){return 1- --i*i*i*i},Be=function(i){return i<.5?8*i*i*i*i:1-8*--i*i*i*i},Me=function(i){return i*i*i*i*i},je=function(i){return 1+--i*i*i*i*i},He=function(i){return i<.5?16*i*i*i*i*i:1+16*--i*i*i*i*i},Qi={easeOut:ze,linear:Ae,easeInQuad:Ee,easeOutQuad:_e,easeInOutQuad:We,easeInCubic:De,easeOutCubic:Oe,easeInOutCubic:Ze,easeInQuart:ke,easeOutQuart:Le,easeInOutQuart:Be,easeInQuint:Me,easeOutQuint:je,easeInOutQuint:He},qi=function(i){typeof i=="number"&&cancelAnimationFrame(i)},X=function(i){i.mounted&&(qi(i.animation),i.animate=!1,i.animation=null,i.velocity=null)};function Ui(i,n,e,o){if(i.mounted){var r=new Date().getTime(),a=1;X(i),i.animation=function(){if(!i.mounted)return qi(i.animation);var t=new Date().getTime()-r,s=t/e,l=Qi[n],d=l(s);t>=e?(o(a),i.animation=null):i.animation&&(o(d),requestAnimationFrame(i.animation))},requestAnimationFrame(i.animation)}}function Re(i){var n=i.scale,e=i.positionX,o=i.positionY;return!(Number.isNaN(n)||Number.isNaN(e)||Number.isNaN(o))}function A(i,n,e,o){var r=Re(n);if(!(!i.mounted||!r)){var a=i.setTransformState,t=i.transformState,s=t.scale,l=t.positionX,d=t.positionY,u=n.scale-s,f=n.positionX-l,m=n.positionY-d;e===0?a(n.scale,n.positionX,n.positionY):Ui(i,o,e,function(v){var p=s+u*v,h=l+f*v,b=d+m*v;a(p,h,b)})}}function Ke(i,n,e){var o=i.offsetWidth,r=i.offsetHeight,a=n.offsetWidth,t=n.offsetHeight,s=a*e,l=t*e,d=o-s,u=r-l;return{wrapperWidth:o,wrapperHeight:r,newContentWidth:s,newDiffWidth:d,newContentHeight:l,newDiffHeight:u}}var Ve=function(i,n,e,o,r,a,t){var s=i>n?e*(t?1:.5):0,l=o>r?a*(t?1:.5):0,d=i-n-s,u=s,f=o-r-l,m=l;return{minPositionX:d,maxPositionX:u,minPositionY:f,maxPositionY:m}},li=function(i,n){var e=i.wrapperComponent,o=i.contentComponent,r=i.setup.centerZoomedOut;if(!e||!o)throw new Error("Components are not mounted");var a=Ke(e,o,n),t=a.wrapperWidth,s=a.wrapperHeight,l=a.newContentWidth,d=a.newDiffWidth,u=a.newContentHeight,f=a.newDiffHeight,m=Ve(t,l,d,s,u,f,!!r);return m},ai=function(i,n,e,o){return o?i<n?T(n,2):i>e?T(e,2):T(i,2):T(i,2)},Z=function(i,n){var e=li(i,n);return i.bounds=e,e};function J(i,n,e,o,r,a,t){var s=e.minPositionX,l=e.minPositionY,d=e.maxPositionX,u=e.maxPositionY,f=0,m=0;t&&(f=r,m=a);var v=ai(i,s-f,d+f,o),p=ai(n,l-m,u+m,o);return{x:v,y:p}}function $(i,n,e,o,r,a){var t=i.transformState,s=t.scale,l=t.positionX,d=t.positionY,u=o-s;if(typeof n!="number"||typeof e!="number")return console.error("Mouse X and Y position were not provided!"),{x:l,y:d};var f=l-n*u,m=d-e*u,v=J(f,m,r,a,0,0,null);return v}function j(i,n,e,o,r){var a=r?o:0,t=n-a;return!Number.isNaN(e)&&i>=e?e:!Number.isNaN(n)&&i<=t?t:i}var gi=function(i,n){var e=i.setup.panning.excluded,o=i.isInitialized,r=i.wrapperComponent,a=n.target,t=r==null?void 0:r.contains(a),s=o&&a&&t;if(!s)return!1;var l=I(a,e);return!l},bi=function(i){var n=i.isInitialized,e=i.isPanning,o=i.setup,r=o.panning.disabled,a=n&&e&&!r;return!!a},Fe=function(i,n){var e=i.transformState,o=e.positionX,r=e.positionY;i.isPanning=!0;var a=n.clientX,t=n.clientY;i.startCoords={x:a-o,y:t-r}},Qe=function(i,n){var e=n.touches,o=i.transformState,r=o.positionX,a=o.positionY;i.isPanning=!0;var t=e.length===1;if(t){var s=e[0].clientX,l=e[0].clientY;i.startCoords={x:s-r,y:l-a}}};function qe(i){var n=i.transformState,e=n.positionX,o=n.positionY,r=n.scale,a=i.setup,t=a.disabled,s=a.limitToBounds,l=a.centerZoomedOut,d=i.wrapperComponent;if(!(t||!d||!i.bounds)){var u=i.bounds,f=u.maxPositionX,m=u.minPositionX,v=u.maxPositionY,p=u.minPositionY,h=e>f||e<m,b=o>v||o<p,y=e>f?d.offsetWidth:i.setup.minPositionX||0,P=o>v?d.offsetHeight:i.setup.minPositionY||0,w=$(i,y,P,r,i.bounds,s||l),E=w.x,Y=w.y;return{scale:r,positionX:h?E:e,positionY:b?Y:o}}}function Ue(i,n,e,o,r){var a=i.setup.limitToBounds,t=i.wrapperComponent,s=i.bounds,l=i.transformState,d=l.scale,u=l.positionX,f=l.positionY;if(!(t===null||s===null||n===u&&e===f)){var m=J(n,e,s,a,o,r,t),v=m.x,p=m.y;i.setTransformState(d,v,p)}}var xe=function(i,n,e){var o=i.startCoords,r=i.transformState,a=i.setup.panning,t=a.lockAxisX,s=a.lockAxisY,l=r.positionX,d=r.positionY;if(!o)return{x:l,y:d};var u=n-o.x,f=e-o.y,m=t?l:u,v=s?d:f;return{x:m,y:v}},G=function(i,n){var e=i.setup,o=i.transformState,r=o.scale,a=e.minScale,t=e.disablePadding;return n>0&&r>=a&&!t?n:0},Ge=function(i){var n=i.mounted,e=i.setup,o=e.disabled,r=e.velocityAnimation,a=i.transformState.scale,t=r.disabled,s=!t||a>1||!o||n;return!!s},Je=function(i){var n=i.mounted,e=i.velocity,o=i.bounds,r=i.setup,a=r.disabled,t=r.velocityAnimation,s=i.transformState.scale,l=t.disabled,d=!l||s>1||!a||n;return!(!d||!e||!o)};function $e(i,n){var e=i.setup.velocityAnimation,o=e.equalToMove,r=e.animationTime,a=e.sensitivity;return o?r*n*a:r}function Si(i,n,e,o,r,a,t,s,l,d){if(r){if(n>t&&e>t){var u=t+(i-t)*d;return u>l?l:u<t?t:u}if(n<a&&e<a){var u=a+(i-a)*d;return u<s?s:u>a?a:u}}return o?n:ai(i,a,t,r)}function Ie(i,n){var e=1;return n?Math.min(e,i.offsetWidth/window.innerWidth):e}function io(i,n){var e=Ge(i);if(e){var o=i.lastMousePosition,r=i.velocityTime,a=i.setup,t=i.wrapperComponent,s=a.velocityAnimation.equalToMove,l=Date.now();if(o&&r&&t){var d=Ie(t,s),u=n.x-o.x,f=n.y-o.y,m=u/d,v=f/d,p=l-r,h=u*u+f*f,b=Math.sqrt(h)/p;i.velocity={velocityX:m,velocityY:v,total:b}}i.lastMousePosition=n,i.velocityTime=l}}function eo(i){var n=i.velocity,e=i.bounds,o=i.setup,r=i.wrapperComponent,a=Je(i);if(!(!a||!n||!e||!r)){var t=n.velocityX,s=n.velocityY,l=n.total,d=e.maxPositionX,u=e.minPositionX,f=e.maxPositionY,m=e.minPositionY,v=o.limitToBounds,p=o.alignmentAnimation,h=o.zoomAnimation,b=o.panning,y=b.lockAxisY,P=b.lockAxisX,w=h.animationType,E=p.sizeX,Y=p.sizeY,k=p.velocityAlignmentTime,_=k,L=$e(i,l),D=Math.max(L,_),O=G(i,E),B=G(i,Y),H=O*r.offsetWidth/100,fi=B*r.offsetHeight/100,ae=d+H,te=u-H,se=f+fi,le=m-fi,mi=i.transformState,ue=new Date().getTime();Ui(i,w,D,function(de){var ii=i.transformState,fe=ii.scale,ei=ii.positionX,oi=ii.positionY,me=new Date().getTime()-ue,ve=me/_,pe=Qi[p.animationType],vi=1-pe(Math.min(1,ve)),pi=1-de,hi=ei+t*pi,ci=oi+s*pi,he=Si(hi,mi.positionX,ei,P,v,u,d,te,ae,vi),ce=Si(ci,mi.positionY,oi,y,v,m,f,le,se,vi);(ei!==hi||oi!==ci)&&i.setTransformState(fe,he,ce)})}}function wi(i,n){var e=i.transformState.scale;X(i),Z(i,e),window.TouchEvent!==void 0&&n instanceof TouchEvent?Qe(i,n):Fe(i,n)}function xi(i){var n=i.transformState.scale,e=i.setup,o=e.minScale,r=e.alignmentAnimation,a=r.disabled,t=r.sizeX,s=r.sizeY,l=r.animationTime,d=r.animationType,u=a||n<o||!t&&!s;if(!u){var f=qe(i);f&&A(i,f,l,d)}}function yi(i,n,e){var o=i.startCoords,r=i.setup,a=r.alignmentAnimation,t=a.sizeX,s=a.sizeY;if(o){var l=xe(i,n,e),d=l.x,u=l.y,f=G(i,t),m=G(i,s);io(i,{x:d,y:u}),Ue(i,d,u,f,m)}}function oo(i){if(i.isPanning){var n=i.setup.panning.velocityDisabled,e=i.velocity,o=i.wrapperComponent,r=i.contentComponent;i.isPanning=!1,i.animate=!1,i.animation=null;var a=o==null?void 0:o.getBoundingClientRect(),t=r==null?void 0:r.getBoundingClientRect(),s=(a==null?void 0:a.width)||0,l=(a==null?void 0:a.height)||0,d=(t==null?void 0:t.width)||0,u=(t==null?void 0:t.height)||0,f=s<d||l<u,m=!n&&e&&(e==null?void 0:e.total)>.1&&f;m?eo(i):xi(i)}}function ui(i,n,e,o){var r=i.setup,a=r.minScale,t=r.maxScale,s=r.limitToBounds,l=j(T(n,2),a,t,0,!1),d=Z(i,l),u=$(i,e,o,l,d,s),f=u.x,m=u.y;return{scale:l,positionX:f,positionY:m}}function Gi(i,n,e){var o=i.transformState.scale,r=i.wrapperComponent,a=i.setup,t=a.minScale,s=a.limitToBounds,l=a.zoomAnimation,d=l.disabled,u=l.animationTime,f=l.animationType,m=d||o>=t;if((o>=1||s)&&xi(i),!(m||!r||!i.mounted)){var v=n||r.offsetWidth/2,p=e||r.offsetHeight/2,h=ui(i,t,v,p);h&&A(i,h,u,f)}}var N=function(){return N=Object.assign||function(n){for(var e,o=1,r=arguments.length;o<r;o++){e=arguments[o];for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a])}return n},N.apply(this,arguments)};function Ci(i,n,e){if(e||arguments.length===2)for(var o=0,r=n.length,a;o<r;o++)(a||!(o in n))&&(a||(a=Array.prototype.slice.call(n,0,o)),a[o]=n[o]);return i.concat(a||Array.prototype.slice.call(n))}var R={previousScale:1,scale:1,positionX:0,positionY:0},M={disabled:!1,minPositionX:null,maxPositionX:null,minPositionY:null,maxPositionY:null,minScale:1,maxScale:8,limitToBounds:!0,centerZoomedOut:!1,centerOnInit:!1,disablePadding:!1,smooth:!0,wheel:{step:.2,disabled:!1,smoothStep:.001,wheelDisabled:!1,touchPadDisabled:!1,activationKeys:[],excluded:[]},panning:{disabled:!1,velocityDisabled:!1,lockAxisX:!1,lockAxisY:!1,activationKeys:[],excluded:[]},pinch:{step:5,disabled:!1,excluded:[]},doubleClick:{disabled:!1,step:.7,mode:"zoomIn",animationType:"easeOut",animationTime:200,excluded:[]},zoomAnimation:{disabled:!1,size:.4,animationTime:200,animationType:"easeOut"},alignmentAnimation:{disabled:!1,sizeX:100,sizeY:100,animationTime:200,velocityAlignmentTime:400,animationType:"easeOut"},velocityAnimation:{disabled:!1,sensitivity:1,animationTime:400,animationType:"easeOut",equalToMove:!0}},Ji=function(i){var n,e,o,r;return{previousScale:(n=i.initialScale)!==null&&n!==void 0?n:R.scale,scale:(e=i.initialScale)!==null&&e!==void 0?e:R.scale,positionX:(o=i.initialPositionX)!==null&&o!==void 0?o:R.positionX,positionY:(r=i.initialPositionY)!==null&&r!==void 0?r:R.positionY}},Pi=function(i){var n=N({},M);return Object.keys(i).forEach(function(e){var o=typeof i[e]<"u",r=typeof M[e]<"u";if(r&&o){var a=Object.prototype.toString.call(M[e]),t=a==="[object Object]",s=a==="[object Array]";t?n[e]=N(N({},M[e]),i[e]):s?n[e]=Ci(Ci([],M[e],!0),i[e],!0):n[e]=i[e]}}),n},$i=function(i,n,e){var o=i.transformState.scale,r=i.wrapperComponent,a=i.setup,t=a.maxScale,s=a.minScale,l=a.zoomAnimation,d=a.smooth,u=l.size;if(!r)throw new Error("Wrapper is not mounted");var f=d?o*Math.exp(n*e):o+n*e,m=j(T(f,3),s,t,u,!1);return m};function Ii(i,n,e,o,r){var a=i.wrapperComponent,t=i.transformState,s=t.scale,l=t.positionX,d=t.positionY;if(!a)return console.error("No WrapperComponent found");var u=a.offsetWidth,f=a.offsetHeight,m=(u/2-l)/s,v=(f/2-d)/s,p=$i(i,n,e),h=ui(i,p,m,v);if(!h)return console.error("Error during zoom event. New transformation state was not calculated.");A(i,h,o,r)}function ie(i,n,e,o){var r=i.setup,a=i.wrapperComponent,t=r.limitToBounds,s=Ji(i.props),l=i.transformState,d=l.scale,u=l.positionX,f=l.positionY;if(a){var m=li(i,s.scale),v=J(s.positionX,s.positionY,m,t,0,0,a),p={scale:s.scale,positionX:v.x,positionY:v.y};d===s.scale&&u===s.positionX&&f===s.positionY||(o==null||o(),A(i,p,n,e))}}function no(i,n,e,o){var r=i.getBoundingClientRect(),a=n.getBoundingClientRect(),t=e.getBoundingClientRect(),s=a.x*o.scale,l=a.y*o.scale;return{x:(r.x-t.x+s)/o.scale,y:(r.y-t.y+l)/o.scale}}function ro(i,n,e){var o=i.wrapperComponent,r=i.contentComponent,a=i.transformState,t=i.setup,s=t.limitToBounds,l=t.minScale,d=t.maxScale;if(!o||!r)return a;var u=o.getBoundingClientRect(),f=n.getBoundingClientRect(),m=no(n,o,r,a),v=m.x,p=m.y,h=f.width/a.scale,b=f.height/a.scale,y=o.offsetWidth/h,P=o.offsetHeight/b,w=j(e||Math.min(y,P),l,d,0,!1),E=(u.width-h*w)/2,Y=(u.height-b*w)/2,k=(u.left-v)*w+E,_=(u.top-p)*w+Y,L=li(i,w),D=J(k,_,L,s,0,0,o),O=D.x,B=D.y;return{positionX:O,positionY:B,scale:w}}var ao=function(i){return function(n,e,o){n===void 0&&(n=.5),e===void 0&&(e=300),o===void 0&&(o="easeOut"),Ii(i,1,n,e,o)}},to=function(i){return function(n,e,o){n===void 0&&(n=.5),e===void 0&&(e=300),o===void 0&&(o="easeOut"),Ii(i,-1,n,e,o)}},so=function(i){return function(n,e,o,r,a){r===void 0&&(r=300),a===void 0&&(a="easeOut");var t=i.transformState,s=t.positionX,l=t.positionY,d=t.scale,u=i.wrapperComponent,f=i.contentComponent,m=i.setup.disabled;if(!(m||!u||!f)){var v={positionX:Number.isNaN(n)?s:n,positionY:Number.isNaN(e)?l:e,scale:Number.isNaN(o)?d:o};A(i,v,r,a)}}},lo=function(i){return function(n,e){n===void 0&&(n=200),e===void 0&&(e="easeOut"),ie(i,n,e)}},uo=function(i){return function(n,e,o){e===void 0&&(e=200),o===void 0&&(o="easeOut");var r=i.transformState,a=i.wrapperComponent,t=i.contentComponent;if(a&&t){var s=ee(n||r.scale,a,t);A(i,s,e,o)}}},fo=function(i){return function(n,e,o,r){o===void 0&&(o=600),r===void 0&&(r="easeOut"),X(i);var a=i.wrapperComponent,t=typeof n=="string"?document.getElementById(n):n;if(a&&t&&a.contains(t)){var s=ro(i,t,e);A(i,s,o,r)}}},ti=function(i){return{instance:i,zoomIn:ao(i),zoomOut:to(i),setTransform:so(i),resetTransform:lo(i),centerView:uo(i),zoomToElement:fo(i)}},mo=function(i){return{instance:i,state:i.transformState}},c=function(i){var n={};return Object.assign(n,mo(i)),Object.assign(n,ti(i)),n},ni=!1;function ri(){try{var i={get passive(){return ni=!0,!1}};return i}catch{return ni=!1,ni}}var I=function(i,n){var e=i.tagName.toUpperCase(),o=n.find(function(a){return a.toUpperCase()===e});if(o)return!0;var r=n.find(function(a){return i.classList.contains(a)});return!!r},si=function(i){i&&clearTimeout(i)},vo=function(i,n,e){return"translate(".concat(i,"px, ").concat(n,"px) scale(").concat(e,")")},ee=function(i,n,e){var o=e.offsetWidth*i,r=e.offsetHeight*i,a=(n.offsetWidth-o)/2,t=(n.offsetHeight-r)/2;return{scale:i,positionX:a,positionY:t}};function po(i){return function(n){i.forEach(function(e){typeof e=="function"?e(n):e!=null&&(e.current=n)})}}var ho=function(i,n){var e=i.setup.wheel,o=e.disabled,r=e.wheelDisabled,a=e.touchPadDisabled,t=e.excluded,s=i.isInitialized,l=i.isPanning,d=n.target,u=s&&!l&&!o&&d;if(!u||r&&!n.ctrlKey||a&&n.ctrlKey)return!1;var f=I(d,t);return!f},co=function(i){return i?i.deltaY<0?1:-1:0};function go(i,n){var e=co(i),o=Ne(n,e);return o}function oe(i,n,e){var o=n.getBoundingClientRect(),r=0,a=0;if("clientX"in i)r=(i.clientX-o.left)/e,a=(i.clientY-o.top)/e;else{var t=i.touches[0];r=(t.clientX-o.left)/e,a=(t.clientY-o.top)/e}return(Number.isNaN(r)||Number.isNaN(a))&&console.error("No mouse or touch offset found"),{x:r,y:a}}var bo=function(i,n,e,o,r){var a=i.transformState.scale,t=i.wrapperComponent,s=i.setup,l=s.maxScale,d=s.minScale,u=s.zoomAnimation,f=s.disablePadding,m=u.size,v=u.disabled;if(!t)throw new Error("Wrapper is not mounted");var p=a+n*e;if(r)return p;var h=o?!1:!v,b=j(T(p,3),d,l,m,h&&!f);return b},So=function(i,n){var e=i.previousWheelEvent,o=i.transformState.scale,r=i.setup,a=r.maxScale,t=r.minScale;return e?o<a||o>t||Math.sign(e.deltaY)!==Math.sign(n.deltaY)||e.deltaY>0&&e.deltaY<n.deltaY||e.deltaY<0&&e.deltaY>n.deltaY||Math.sign(e.deltaY)!==Math.sign(n.deltaY):!1},wo=function(i,n){var e=i.setup.pinch,o=e.disabled,r=e.excluded,a=i.isInitialized,t=n.target,s=a&&!o&&t;if(!s)return!1;var l=I(t,r);return!l},yo=function(i){var n=i.setup.pinch.disabled,e=i.isInitialized,o=i.pinchStartDistance,r=e&&!n&&o;return!!r},Co=function(i,n,e){var o=e.getBoundingClientRect(),r=i.touches,a=T(r[0].clientX-o.left,5),t=T(r[0].clientY-o.top,5),s=T(r[1].clientX-o.left,5),l=T(r[1].clientY-o.top,5);return{x:(a+s)/2/n,y:(t+l)/2/n}},ne=function(i){return Math.sqrt(Math.pow(i.touches[0].pageX-i.touches[1].pageX,2)+Math.pow(i.touches[0].pageY-i.touches[1].pageY,2))},Po=function(i,n){var e=i.pinchStartScale,o=i.pinchStartDistance,r=i.setup,a=r.maxScale,t=r.minScale,s=r.zoomAnimation,l=r.disablePadding,d=s.size,u=s.disabled;if(!e||o===null||!n)throw new Error("Pinch touches distance was not provided");if(n<0)return i.transformState.scale;var f=n/o,m=f*e;return j(T(m,2),t,a,d,!u&&!l)},To=160,Yo=100,Xo=function(i,n){var e=i.props,o=e.onWheelStart,r=e.onZoomStart;i.wheelStopEventTimer||(X(i),g(c(i),n,o),g(c(i),n,r))},No=function(i,n){var e=i.props,o=e.onWheel,r=e.onZoom,a=i.contentComponent,t=i.setup,s=i.transformState,l=s.scale,d=t.limitToBounds,u=t.centerZoomedOut,f=t.zoomAnimation,m=t.wheel,v=t.disablePadding,p=t.smooth,h=f.size,b=f.disabled,y=m.step,P=m.smoothStep;if(!a)throw new Error("Component not mounted");n.preventDefault(),n.stopPropagation();var w=go(n,null),E=p?P*Math.abs(n.deltaY):y,Y=bo(i,w,E,!n.ctrlKey);if(l!==Y){var k=Z(i,Y),_=oe(n,a,l),L=b||h===0||u||v,D=d&&L,O=$(i,_.x,_.y,Y,k,D),B=O.x,H=O.y;i.previousWheelEvent=n,i.setTransformState(Y,B,H),g(c(i),n,o),g(c(i),n,r)}},zo=function(i,n){var e=i.props,o=e.onWheelStop,r=e.onZoomStop;si(i.wheelAnimationTimer),i.wheelAnimationTimer=setTimeout(function(){i.mounted&&(Gi(i,n.x,n.y),i.wheelAnimationTimer=null)},Yo);var a=So(i,n);a&&(si(i.wheelStopEventTimer),i.wheelStopEventTimer=setTimeout(function(){i.mounted&&(i.wheelStopEventTimer=null,g(c(i),n,o),g(c(i),n,r))},To))},Ao=function(i,n){var e=ne(n);i.pinchStartDistance=e,i.lastDistance=e,i.pinchStartScale=i.transformState.scale,i.isPanning=!1,X(i)},Eo=function(i,n){var e=i.contentComponent,o=i.pinchStartDistance,r=i.transformState.scale,a=i.setup,t=a.limitToBounds,s=a.centerZoomedOut,l=a.zoomAnimation,d=l.disabled,u=l.size;if(!(o===null||!e)){var f=Co(n,r,e);if(!(!Number.isFinite(f.x)||!Number.isFinite(f.y))){var m=ne(n),v=Po(i,m);if(v!==r){var p=Z(i,v),h=d||u===0||s,b=t&&h,y=$(i,f.x,f.y,v,p,b),P=y.x,w=y.y;i.pinchMidpoint=f,i.lastDistance=m,i.setTransformState(v,P,w)}}}},_o=function(i){var n=i.pinchMidpoint;i.velocity=null,i.lastDistance=null,i.pinchMidpoint=null,i.pinchStartScale=null,i.pinchStartDistance=null,Gi(i,n==null?void 0:n.x,n==null?void 0:n.y)},re=function(i,n){var e=i.props.onZoomStop,o=i.setup.doubleClick.animationTime;si(i.doubleClickStopEventTimer),i.doubleClickStopEventTimer=setTimeout(function(){i.doubleClickStopEventTimer=null,g(c(i),n,e)},o)},Wo=function(i,n){var e=i.props,o=e.onZoomStart,r=e.onZoom,a=i.setup.doubleClick,t=a.animationTime,s=a.animationType;g(c(i),n,o),ie(i,t,s,function(){return g(c(i),n,r)}),re(i,n)};function Do(i,n){var e=i.setup,o=i.doubleClickStopEventTimer,r=i.transformState,a=i.contentComponent,t=r.scale,s=i.props,l=s.onZoomStart,d=s.onZoom,u=e.doubleClick,f=u.disabled,m=u.mode,v=u.step,p=u.animationTime,h=u.animationType;if(!f&&!o){if(m==="reset")return Wo(i,n);if(!a)return console.error("No ContentComponent found");var b=m==="zoomOut"?-1:1,y=$i(i,b,v);if(t!==y){g(c(i),n,l);var P=oe(n,a,t),w=ui(i,y,P.x,P.y);if(!w)return console.error("Error during zoom event. New transformation state was not calculated.");g(c(i),n,d),A(i,w,p,h),re(i,n)}}}var Oo=function(i,n){var e=i.isInitialized,o=i.setup,r=i.wrapperComponent,a=o.doubleClick,t=a.disabled,s=a.excluded,l=n.target,d=r==null?void 0:r.contains(l),u=e&&l&&d&&!t;if(!u)return!1;var f=I(l,s);return!f},Zo=function(){function i(n){var e=this;this.mounted=!0,this.onChangeCallbacks=new Set,this.onInitCallbacks=new Set,this.wrapperComponent=null,this.contentComponent=null,this.isInitialized=!1,this.bounds=null,this.previousWheelEvent=null,this.wheelStopEventTimer=null,this.wheelAnimationTimer=null,this.isPanning=!1,this.startCoords=null,this.lastTouch=null,this.distance=null,this.lastDistance=null,this.pinchStartDistance=null,this.pinchStartScale=null,this.pinchMidpoint=null,this.doubleClickStopEventTimer=null,this.velocity=null,this.velocityTime=null,this.lastMousePosition=null,this.animate=!1,this.animation=null,this.maxBounds=null,this.pressedKeys={},this.mount=function(){e.initializeWindowEvents()},this.unmount=function(){e.cleanupWindowEvents()},this.update=function(o){Z(e,e.transformState.scale),e.setup=Pi(o)},this.initializeWindowEvents=function(){var o,r=ri(),a=(o=e.wrapperComponent)===null||o===void 0?void 0:o.ownerDocument,t=a==null?void 0:a.defaultView;t==null||t.addEventListener("mousedown",e.onPanningStart,r),t==null||t.addEventListener("mousemove",e.onPanning,r),t==null||t.addEventListener("mouseup",e.onPanningStop,r),a==null||a.addEventListener("mouseleave",e.clearPanning,r),t==null||t.addEventListener("keyup",e.setKeyUnPressed,r),t==null||t.addEventListener("keydown",e.setKeyPressed,r)},this.cleanupWindowEvents=function(){var o,r,a=ri(),t=(o=e.wrapperComponent)===null||o===void 0?void 0:o.ownerDocument,s=t==null?void 0:t.defaultView;s==null||s.removeEventListener("mousedown",e.onPanningStart,a),s==null||s.removeEventListener("mousemove",e.onPanning,a),s==null||s.removeEventListener("mouseup",e.onPanningStop,a),t==null||t.removeEventListener("mouseleave",e.clearPanning,a),s==null||s.removeEventListener("keyup",e.setKeyUnPressed,a),s==null||s.removeEventListener("keydown",e.setKeyPressed,a),document.removeEventListener("mouseleave",e.clearPanning,a),X(e),(r=e.observer)===null||r===void 0||r.disconnect()},this.handleInitializeWrapperEvents=function(o){var r=ri();o.addEventListener("wheel",e.onWheelZoom,r),o.addEventListener("dblclick",e.onDoubleClick,r),o.addEventListener("touchstart",e.onTouchPanningStart,r),o.addEventListener("touchmove",e.onTouchPanning,r),o.addEventListener("touchend",e.onTouchPanningStop,r)},this.handleInitialize=function(o){var r=e.setup.centerOnInit;e.applyTransformation(),e.onInitCallbacks.forEach(function(a){return a(c(e))}),r&&(e.setCenter(),e.observer=new ResizeObserver(function(){var a;e.onInitCallbacks.forEach(function(t){return t(c(e))}),e.setCenter(),(a=e.observer)===null||a===void 0||a.disconnect()}),e.observer.observe(o))},this.onWheelZoom=function(o){var r=e.setup.disabled;if(!r){var a=ho(e,o);if(a){var t=e.isPressingKeys(e.setup.wheel.activationKeys);t&&(Xo(e,o),No(e,o),zo(e,o))}}},this.onPanningStart=function(o){var r=e.setup.disabled,a=e.props.onPanningStart;if(!r){var t=gi(e,o);if(t){var s=e.isPressingKeys(e.setup.panning.activationKeys);s&&(o.preventDefault(),o.stopPropagation(),X(e),wi(e,o),g(c(e),o,a))}}},this.onPanning=function(o){var r=e.setup.disabled,a=e.props.onPanning;if(!r){var t=bi(e);if(t){var s=e.isPressingKeys(e.setup.panning.activationKeys);s&&(o.preventDefault(),o.stopPropagation(),yi(e,o.clientX,o.clientY),g(c(e),o,a))}}},this.onPanningStop=function(o){var r=e.props.onPanningStop;e.isPanning&&(oo(e),g(c(e),o,r))},this.onPinchStart=function(o){var r=e.setup.disabled,a=e.props,t=a.onPinchingStart,s=a.onZoomStart;if(!r){var l=wo(e,o);l&&(Ao(e,o),X(e),g(c(e),o,t),g(c(e),o,s))}},this.onPinch=function(o){var r=e.setup.disabled,a=e.props,t=a.onPinching,s=a.onZoom;if(!r){var l=yo(e);l&&(o.preventDefault(),o.stopPropagation(),Eo(e,o),g(c(e),o,t),g(c(e),o,s))}},this.onPinchStop=function(o){var r=e.props,a=r.onPinchingStop,t=r.onZoomStop;e.pinchStartScale&&(_o(e),g(c(e),o,a),g(c(e),o,t))},this.onTouchPanningStart=function(o){var r=e.setup.disabled,a=e.props.onPanningStart;if(!r){var t=gi(e,o);if(t){var s=e.lastTouch&&+new Date-e.lastTouch<200;if(s&&o.touches.length===1)e.onDoubleClick(o);else{e.lastTouch=+new Date,X(e);var l=o.touches,d=l.length===1,u=l.length===2;d&&(X(e),wi(e,o),g(c(e),o,a)),u&&e.onPinchStart(o)}}}},this.onTouchPanning=function(o){var r=e.setup.disabled,a=e.props.onPanning;if(e.isPanning&&o.touches.length===1){if(r)return;var t=bi(e);if(!t)return;o.preventDefault(),o.stopPropagation();var s=o.touches[0];yi(e,s.clientX,s.clientY),g(c(e),o,a)}else o.touches.length>1&&e.onPinch(o)},this.onTouchPanningStop=function(o){e.onPanningStop(o),e.onPinchStop(o)},this.onDoubleClick=function(o){var r=e.setup.disabled;if(!r){var a=Oo(e,o);a&&Do(e,o)}},this.clearPanning=function(o){e.isPanning&&e.onPanningStop(o)},this.setKeyPressed=function(o){e.pressedKeys[o.key]=!0},this.setKeyUnPressed=function(o){e.pressedKeys[o.key]=!1},this.isPressingKeys=function(o){return o.length?!!o.find(function(r){return e.pressedKeys[r]}):!0},this.setTransformState=function(o,r,a){var t=e.props.onTransformed;if(!Number.isNaN(o)&&!Number.isNaN(r)&&!Number.isNaN(a)){o!==e.transformState.scale&&(e.transformState.previousScale=e.transformState.scale,e.transformState.scale=o),e.transformState.positionX=r,e.transformState.positionY=a,e.applyTransformation();var s=c(e);e.onChangeCallbacks.forEach(function(l){return l(s)}),g(s,{scale:o,positionX:r,positionY:a},t)}else console.error("Detected NaN set state values")},this.setCenter=function(){if(e.wrapperComponent&&e.contentComponent){var o=ee(e.transformState.scale,e.wrapperComponent,e.contentComponent);e.setTransformState(o.scale,o.positionX,o.positionY)}},this.handleTransformStyles=function(o,r,a){return e.props.customTransform?e.props.customTransform(o,r,a):vo(o,r,a)},this.applyTransformation=function(){if(!(!e.mounted||!e.contentComponent)){var o=e.transformState,r=o.scale,a=o.positionX,t=o.positionY,s=e.handleTransformStyles(a,t,r);e.contentComponent.style.transform=s}},this.getContext=function(){return c(e)},this.onChange=function(o){return e.onChangeCallbacks.has(o)||e.onChangeCallbacks.add(o),function(){e.onChangeCallbacks.delete(o)}},this.onInit=function(o){return e.onInitCallbacks.has(o)||e.onInitCallbacks.add(o),function(){e.onInitCallbacks.delete(o)}},this.init=function(o,r){e.cleanupWindowEvents(),e.wrapperComponent=o,e.contentComponent=r,Z(e,e.transformState.scale),e.handleInitializeWrapperEvents(o),e.handleInitialize(r),e.initializeWindowEvents(),e.isInitialized=!0;var a=c(e);g(a,void 0,e.props.onInit)},this.props=n,this.setup=Pi(this.props),this.transformState=Ji(this.props)}return i}(),di=W.createContext(null),ko=function(i,n){return typeof i=="function"?i(n):i},Lo=W.forwardRef(function(i,n){var e=C.useRef(new Zo(i)).current,o=ko(i.children,ti(e));return C.useImperativeHandle(n,function(){return ti(e)},[e]),C.useEffect(function(){e.update(i)},[e,i]),W.createElement(di.Provider,{value:e},o)});W.forwardRef(function(i,n){var e=C.useRef(null),o=C.useContext(di);return C.useEffect(function(){return o.onChange(function(r){if(e.current){var a=0,t=0;e.current.style.transform=o.handleTransformStyles(a,t,1/r.instance.transformState.scale)}})},[o]),W.createElement("div",N({},i,{ref:po([e,n])}))});function Bo(i,n){n===void 0&&(n={});var e=n.insertAt;if(!(!i||typeof document>"u")){var o=document.head||document.getElementsByTagName("head")[0],r=document.createElement("style");r.type="text/css",e==="top"&&o.firstChild?o.insertBefore(r,o.firstChild):o.appendChild(r),r.styleSheet?r.styleSheet.cssText=i:r.appendChild(document.createTextNode(i))}}var Mo=`.transform-component-module_wrapper__SPB86 {
  position: relative;
  width: -moz-fit-content;
  width: fit-content;
  height: -moz-fit-content;
  height: fit-content;
  overflow: hidden;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  margin: 0;
  padding: 0;
}
.transform-component-module_content__FBWxo {
  display: flex;
  flex-wrap: wrap;
  width: -moz-fit-content;
  width: fit-content;
  height: -moz-fit-content;
  height: fit-content;
  margin: 0;
  padding: 0;
  transform-origin: 0% 0%;
}
.transform-component-module_content__FBWxo img {
  pointer-events: none;
}
`,Ti={wrapper:"transform-component-module_wrapper__SPB86",content:"transform-component-module_content__FBWxo"};Bo(Mo);var jo=function(i){var n=i.children,e=i.wrapperClass,o=e===void 0?"":e,r=i.contentClass,a=r===void 0?"":r,t=i.wrapperStyle,s=i.contentStyle,l=i.wrapperProps,d=l===void 0?{}:l,u=i.contentProps,f=u===void 0?{}:u,m=C.useContext(di).init,v=C.useRef(null),p=C.useRef(null);return C.useEffect(function(){var h=v.current,b=p.current;h!==null&&b!==null&&m&&m(h,b)},[]),W.createElement("div",N({},d,{ref:v,className:"react-transform-wrapper ".concat(Ti.wrapper," ").concat(o),style:t}),W.createElement("div",N({},f,{ref:p,className:"react-transform-component ".concat(Ti.content," ").concat(a),style:s}),n))};const Uo={title:"Demos/Controls",component:z,subcomponents:{Node:ge,Edge:be,MarkerArrow:Se,Arrow:we,Icon:ye,Label:Ce,Port:Pe,Remove:Te,Add:Ye}},K=()=>S.jsx("div",{style:{border:"solid 1px #12131e",height:450,width:450,position:"relative"},children:S.jsx(z,{pannable:!1,nodes:[{id:"1",text:"Node 1"},{id:"2",text:"Node 2"},{id:"3",text:"Node 3"}],edges:[{id:"1-2",from:"1",to:"2"},{id:"1-3",from:"1",to:"3"}],onLayoutChange:i=>console.log("Layout",i)})}),V=()=>S.jsx("div",{style:{border:"solid 1px #12131e",height:200,width:200,position:"relative"},children:S.jsx(z,{height:150,width:150,disabled:!0,fit:!0,pannable:!1,arrow:null,nodes:[{id:"1",text:"1"},{id:"2",text:"2"},{id:"3",text:"3"},{id:"4",text:"4"}],edges:[{id:"1-2",from:"1",to:"2"},{id:"1-3",from:"1",to:"3"},{id:"1-4",from:"1",to:"4"}],onLayoutChange:i=>console.log("Layout",i)})}),F=()=>S.jsx("div",{style:{border:"solid 1px #12131e",height:450,width:450,position:"relative"},children:S.jsx(z,{pannable:!1,defaultPosition:null,nodes:[{id:"1",text:"Node 1"},{id:"2",text:"Node 2"},{id:"3",text:"Node 3"}],edges:[{id:"1-2",from:"1",to:"2"},{id:"1-3",from:"1",to:"3"}],onLayoutChange:i=>console.log("Layout",i)})}),Q=()=>S.jsx("div",{style:{border:"solid 1px #12131e",height:450,width:450,position:"relative"},children:S.jsx(z,{pannable:!1,defaultPosition:Xe.TOP,nodes:[{id:"1",text:"Node 1"},{id:"2",text:"Node 2"},{id:"3",text:"Node 3"}],edges:[{id:"1-2",from:"1",to:"2"},{id:"1-3",from:"1",to:"3"}],onLayoutChange:i=>console.log("Layout",i)})}),q=()=>S.jsx("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:S.jsx(z,{fit:!0,nodes:[{id:"1",text:"Node 1"},{id:"2",text:"Node 2"},{id:"3",text:"Node 3"}],edges:[{id:"1-2",from:"1",to:"2"},{id:"1-3",from:"1",to:"3"}],onLayoutChange:i=>console.log("Layout",i)})}),U=()=>{const[i,n]=C.useState(.7),e=C.useRef(null);return S.jsxs("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0},children:[S.jsxs("pre",{style:{zIndex:9,position:"absolute",bottom:15,right:15,background:"rgba(0, 0, 0, .5)",padding:20,color:"white"},children:["Zoom: ",i,S.jsx("br",{}),S.jsx("button",{style:{display:"block",width:"100%",margin:"5px 0"},onClick:()=>e.current.zoomIn(),children:"Zoom In"}),S.jsx("button",{style:{display:"block",width:"100%",margin:"5px 0"},onClick:()=>e.current.zoomOut(),children:"Zoom Out"}),S.jsx("button",{style:{display:"block",width:"100%"},onClick:()=>e.current.fitCanvas(),children:"Fit"})]}),S.jsx(z,{maxZoom:.2,minZoom:-.9,zoom:i,ref:e,nodes:[{id:"1",text:"Node 1"},{id:"2",text:"Node 2"},{id:"3",text:"Node 3"}],edges:[{id:"1-2",from:"1",to:"2"},{id:"1-3",from:"1",to:"3"}],onZoomChange:o=>{console.log("zooming",o),n(o)},onLayoutChange:o=>console.log("Layout",o)})]})},x=()=>{const i=C.useRef(null);return S.jsx(Lo,{wheel:{step:40},options:{maxScale:4,limitToBounds:!1},children:S.jsx(jo,{children:S.jsx(z,{ref:i,zoomable:!1,maxWidth:800,maxHeight:800,fit:!0,nodes:[{id:"1",text:"Node 1"},{id:"2",text:"Node 2"},{id:"3",text:"Node 3"}],edges:[{id:"1-2",from:"1",to:"2"},{id:"1-3",from:"1",to:"3"}]})})})};var Yi,Xi,Ni;K.parameters={...K.parameters,docs:{...(Yi=K.parameters)==null?void 0:Yi.docs,source:{originalSource:`() => <div style={{
  border: 'solid 1px #12131e',
  height: 450,
  width: 450,
  position: 'relative'
}}>
    <Canvas pannable={false} nodes={[{
    id: '1',
    text: 'Node 1'
  }, {
    id: '2',
    text: 'Node 2'
  }, {
    id: '3',
    text: 'Node 3'
  }]} edges={[{
    id: '1-2',
    from: '1',
    to: '2'
  }, {
    id: '1-3',
    from: '1',
    to: '3'
  }]} onLayoutChange={layout => console.log('Layout', layout)} />
  </div>`,...(Ni=(Xi=K.parameters)==null?void 0:Xi.docs)==null?void 0:Ni.source}}};var zi,Ai,Ei;V.parameters={...V.parameters,docs:{...(zi=V.parameters)==null?void 0:zi.docs,source:{originalSource:`() => <div style={{
  border: 'solid 1px #12131e',
  height: 200,
  width: 200,
  position: 'relative'
}}>
    <Canvas height={150} width={150} disabled={true} fit={true} pannable={false} arrow={null} nodes={[{
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
  }]} edges={[{
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
  }]} onLayoutChange={layout => console.log('Layout', layout)} />
  </div>`,...(Ei=(Ai=V.parameters)==null?void 0:Ai.docs)==null?void 0:Ei.source}}};var _i,Wi,Di;F.parameters={...F.parameters,docs:{...(_i=F.parameters)==null?void 0:_i.docs,source:{originalSource:`() => <div style={{
  border: 'solid 1px #12131e',
  height: 450,
  width: 450,
  position: 'relative'
}}>
    <Canvas pannable={false} defaultPosition={null} nodes={[{
    id: '1',
    text: 'Node 1'
  }, {
    id: '2',
    text: 'Node 2'
  }, {
    id: '3',
    text: 'Node 3'
  }]} edges={[{
    id: '1-2',
    from: '1',
    to: '2'
  }, {
    id: '1-3',
    from: '1',
    to: '3'
  }]} onLayoutChange={layout => console.log('Layout', layout)} />
  </div>`,...(Di=(Wi=F.parameters)==null?void 0:Wi.docs)==null?void 0:Di.source}}};var Oi,Zi,ki;Q.parameters={...Q.parameters,docs:{...(Oi=Q.parameters)==null?void 0:Oi.docs,source:{originalSource:`() => <div style={{
  border: 'solid 1px #12131e',
  height: 450,
  width: 450,
  position: 'relative'
}}>
    <Canvas pannable={false} defaultPosition={CanvasPosition.TOP} nodes={[{
    id: '1',
    text: 'Node 1'
  }, {
    id: '2',
    text: 'Node 2'
  }, {
    id: '3',
    text: 'Node 3'
  }]} edges={[{
    id: '1-2',
    from: '1',
    to: '2'
  }, {
    id: '1-3',
    from: '1',
    to: '3'
  }]} onLayoutChange={layout => console.log('Layout', layout)} />
  </div>`,...(ki=(Zi=Q.parameters)==null?void 0:Zi.docs)==null?void 0:ki.source}}};var Li,Bi,Mi;q.parameters={...q.parameters,docs:{...(Li=q.parameters)==null?void 0:Li.docs,source:{originalSource:`() => <div style={{
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}}>
    <Canvas fit={true} nodes={[{
    id: '1',
    text: 'Node 1'
  }, {
    id: '2',
    text: 'Node 2'
  }, {
    id: '3',
    text: 'Node 3'
  }]} edges={[{
    id: '1-2',
    from: '1',
    to: '2'
  }, {
    id: '1-3',
    from: '1',
    to: '3'
  }]} onLayoutChange={layout => console.log('Layout', layout)} />
  </div>`,...(Mi=(Bi=q.parameters)==null?void 0:Bi.docs)==null?void 0:Mi.source}}};var ji,Hi,Ri;U.parameters={...U.parameters,docs:{...(ji=U.parameters)==null?void 0:ji.docs,source:{originalSource:`() => {
  const [zoom, setZoom] = useState<number>(0.7);
  const ref = useRef<CanvasRef | null>(null);
  return <div style={{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }}>
      <pre style={{
      zIndex: 9,
      position: 'absolute',
      bottom: 15,
      right: 15,
      background: 'rgba(0, 0, 0, .5)',
      padding: 20,
      color: 'white'
    }}>
        Zoom: {zoom}<br />
        <button style={{
        display: 'block',
        width: '100%',
        margin: '5px 0'
      }} onClick={() => ref.current.zoomIn()}>Zoom In</button>
        <button style={{
        display: 'block',
        width: '100%',
        margin: '5px 0'
      }} onClick={() => ref.current.zoomOut()}>Zoom Out</button>
        <button style={{
        display: 'block',
        width: '100%'
      }} onClick={() => ref.current.fitCanvas()}>Fit</button>
      </pre>
      <Canvas maxZoom={0.2} minZoom={-0.9} zoom={zoom} ref={ref} nodes={[{
      id: '1',
      text: 'Node 1'
    }, {
      id: '2',
      text: 'Node 2'
    }, {
      id: '3',
      text: 'Node 3'
    }]} edges={[{
      id: '1-2',
      from: '1',
      to: '2'
    }, {
      id: '1-3',
      from: '1',
      to: '3'
    }]} onZoomChange={z => {
      console.log('zooming', z);
      setZoom(z);
    }} onLayoutChange={layout => console.log('Layout', layout)} />
    </div>;
}`,...(Ri=(Hi=U.parameters)==null?void 0:Hi.docs)==null?void 0:Ri.source}}};var Ki,Vi,Fi;x.parameters={...x.parameters,docs:{...(Ki=x.parameters)==null?void 0:Ki.docs,source:{originalSource:`() => {
  const ref = useRef<CanvasRef | null>(null);
  return <TransformWrapper wheel={{
    step: 40
  }} options={{
    maxScale: 4,
    limitToBounds: false
  }}>
      <TransformComponent>
          <Canvas ref={ref} zoomable={false} maxWidth={800} maxHeight={800} fit={true} nodes={[{
        id: '1',
        text: 'Node 1'
      }, {
        id: '2',
        text: 'Node 2'
      }, {
        id: '3',
        text: 'Node 3'
      }]} edges={[{
        id: '1-2',
        from: '1',
        to: '2'
      }, {
        id: '1-3',
        from: '1',
        to: '3'
      }]} />
      </TransformComponent>
   </TransformWrapper>;
}`,...(Fi=(Vi=x.parameters)==null?void 0:Vi.docs)==null?void 0:Fi.source}}};const xo=["FixedPosition","Small","NonCentered","TopPosition","Fit","Zoom","ZoomExternal"];export{q as Fit,K as FixedPosition,F as NonCentered,V as Small,Q as TopPosition,U as Zoom,x as ZoomExternal,xo as __namedExportsOrder,Uo as default};
