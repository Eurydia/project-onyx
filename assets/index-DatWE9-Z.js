import{j as a,r as p}from"./react-UHvb0Zaj.js";/* empty css                    */import{k as Z}from"./katex-Bfk5k6kF.js";import{c as oe}from"./react-dom-CCdiEG2k.js";import{T as k,S as j,B as H,P as ae,a as T,b as se,F as le,c as J,d as w,C as W,e as ie,f as S,g as M,D as ce,h as de,R as pe,i as z,u as ee,j as ue,k as Re,l as he,m as Oe,n as Te,o as fe,p as Ee,A as xe,Q as ye,I as Ae,q as Ie,r as ge,s as me,t as Ne,v as Pe,w as be,x as je,y as Se,z as ve,E as _e,G as Ce,H as Fe,J as Ye,K as De}from"./@mui-BvWI4E8z.js";import{G as ne,Z as Le,T as we,L as Me}from"./@visx-GRqt5hvy.js";import{h as ke}from"./d3-hierarchy-B72UHu4D.js";import"./classnames-qFuPRGlX.js";import"./scheduler-DckzrJrc.js";import"./react-is-bRM3snkL.js";import"./@emotion-CfhI8mfL.js";import"./hoist-non-react-statics-c_oXS48o.js";import"./@babel-DuB8yAtz.js";import"./stylis-YPZU7XtI.js";import"./clsx-B-dksMZM.js";import"./react-transition-group-meix6i7u.js";import"./@popperjs-BQBsAJpH.js";import"./prop-types-iDt5XxeR.js";import"./d3-shape-rFcaQ0O8.js";import"./d3-path-BevWroqt.js";import"./@use-gesture-BFO_ApFk.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function t(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=t(o);fetch(o.href,i)}})();const Be=e=>{const{onExecute:n,keyCombinationHint:t}=e,r=t.map((o,i)=>{let c=a.jsx(T,{children:"+"});return i>=t.length-1&&(c=null),a.jsxs(p.Fragment,{children:[o,c]},"key-hint"+i)});return a.jsx(k,{arrow:!0,title:a.jsx(j,{useFlexGap:!0,gap:.5,spacing:.5,direction:"row",alignItems:"center",children:r}),children:a.jsx(H,{disableElevation:!0,variant:"contained",startIcon:a.jsx(ae,{}),onClick:n,children:"คำนวณ"})})},Ue=e=>{const{rows:n,value:t,onChange:r,onKeyDown:o}=e;return a.jsx(se,{fullWidth:!0,multiline:!0,rows:n,value:t,onChange:i=>r(i.target.value),onKeyDown:o,slotProps:{input:{autoComplete:"off",autoCorrect:"off",spellCheck:!1,sx:{fontFamily:"monospace"}}}})};var u=(e=>(e[e.IDENTIFIER=0]="IDENTIFIER",e[e.OPERATOR=1]="OPERATOR",e[e.LEFT_PARENTHESIS=2]="LEFT_PARENTHESIS",e[e.RIGHT_PARENTHESIS=3]="RIGHT_PARENTHESIS",e[e.ERROR=4]="ERROR",e))(u||{}),l=(e=>(e.AND="AND",e.OR="OR",e.IMPLIES="IMPLIES",e.IFF="IFF",e.NOT="NOT",e))(l||{});const He=[l.AND,l.OR,l.IMPLIES,l.IFF],Ge=new Map([[l.AND,"และ"],[l.OR,"หรือ"],[l.IMPLIES,"ถ้า...แล้ว..."],[l.IFF,"...ก็ต่อเมื่อ..."]]),$e=e=>{const{onChange:n,values:t}=e;return a.jsxs(le,{row:!0,sx:{display:"flex",alignItems:"center",gap:1},children:[a.jsx(J,{children:a.jsx(T,{children:"ตัวเชื่อม"})}),a.jsx(w,{disabled:!0,checked:!0,control:a.jsx(W,{}),label:"นิเสธ"}),He.map((r,o)=>a.jsx(w,{control:a.jsx(W,{}),checked:t.get(r)??!1,label:Ge.get(r),onChange:(i,c)=>n(r,c)},"include-op"+o))]})},G=e=>{const{tex:n,options:t}=e,r=p.useRef(null);return p.useEffect(()=>{r.current!==null&&Z.render(n,r.current,t)},[r,n,t]),a.jsx(T,{ref:r,component:"span",overflow:"auto"})},We=[{name:"นิเสธ",label:"\\lnot",insertChar:"¬"},{name:"และ",label:"\\land",insertChar:"∧"},{name:"หรือ",label:"\\lor",insertChar:"∨"},{name:"ถ้า...แล้ว...",label:"\\implies",insertChar:"⇒"},{name:"...ก็ต้องเมื่อ...",label:"\\iff",insertChar:"⇔"}],ze=e=>{const{onInsertChar:n}=e;return a.jsx(ie,{disableElevation:!0,variant:"outlined",children:We.map((t,r)=>a.jsx(k,{title:a.jsx(T,{sx:{userSelect:"none"},children:t.name}),arrow:!0,children:a.jsx(H,{onClick:()=>n(t.insertChar),children:a.jsx(G,{tex:t.label,options:{displayMode:!1,output:"htmlAndMathml"}})})},"btn"+r))})};var s=(e=>(e[e.BINARY_OPERATOR=0]="BINARY_OPERATOR",e[e.UNARY_OPERATOR=1]="UNARY_OPERATOR",e[e.ERROR=2]="ERROR",e[e.IDENTIFIER=3]="IDENTIFIER",e[e.CONSTANT=4]="CONSTANT",e))(s||{});const v=e=>{const{nodeType:n}=e;if(n===s.ERROR)return e.reason;if(n===s.IDENTIFIER)return e.value;if(n===s.UNARY_OPERATOR){if(e.operand.nodeType===s.ERROR)return e.operand.reason;const h=v(e.operand);return e.operand.nodeType===s.IDENTIFIER?`\\lnot ${h}`:`\\lnot (${h})`}const t=e.leftOperand;if(t.nodeType===s.ERROR)return t.reason;const r=e.rightOperand;if(r.nodeType===s.ERROR)return r.reason;let o=v(t);t.nodeType===s.BINARY_OPERATOR&&(o=`(${o})`);let i=v(r);r.nodeType===s.BINARY_OPERATOR&&(i=`(${i})`);let c="";switch(e.operator){case l.AND:c="\\land";break;case l.OR:c="\\lor";break;case l.IMPLIES:c="\\implies";break;case l.IFF:c="\\iff";break}return`${o} ${c} ${i}`},Ke=e=>v(e),_=(e,n)=>{if(e.nodeType===s.ERROR){n.clear();return}if(e.nodeType===s.IDENTIFIER){n.has(e.value)||n.set(e.value,!0);return}if(e.nodeType===s.UNARY_OPERATOR){_(e.operand,n);return}_(e.leftOperand,n),_(e.rightOperand,n)},K=e=>{const n=new Map;return e!==null&&_(e,n),n},re=(e,n)=>{const{children:t,label:r,value:o}=e;if(o===null){n.clear();return}if(t.length===0&&!n.has(r)){n.set(r,!0);return}for(const i of t)re(i,n)},qe=e=>{const n=new Map;return re(e,n),n},C=(e,n)=>{if(e.nodeType===s.ERROR)return{value:null,label:`\\text{${e.reason}}`,children:[]};if(e.nodeType===s.IDENTIFIER)return{label:e.value,value:n.get(e.value)??!1,children:[]};if(e.nodeType===s.UNARY_OPERATOR){const c=C(e.operand,n);return c.value===null?c:{label:"\\lnot",value:!c.value,children:[c]}}const t=C(e.leftOperand,n);if(t.value===null)return t;const r=C(e.rightOperand,n);if(r.value===null)return r;let o,i="";switch(e.operator){case l.AND:i="\\land",o=t.value&&r.value;break;case l.OR:i="\\lor",o=t.value||r.value;break;case l.IMPLIES:i="\\implies",o=!t.value||r.value;break;case l.IFF:i="\\iff",o=t.value===r.value;break}return{value:o,label:i,children:[t,r]}},Ve=(e,n)=>C(e,n),Xe=e=>{const{tree:n,emptyMessage:t}=e;let r=a.jsx(T,{children:t});return n!==null&&(r=n.nodeType===s.ERROR?a.jsx(T,{color:"error",children:n.reason}):a.jsx(G,{tex:Ke(n),options:{displayMode:!0,output:"htmlAndMathml"}})),a.jsx(S,{paddingX:2,paddingY:.5,display:"flex",justifyContent:"center",alignItems:"center",minHeight:100,sx:{borderRadius:o=>o.shape.borderRadius,backgroundColor:o=>M(o.palette.secondary.light,.4)},children:r})},F=e=>{if(e.value===null)return e;const{children:n,label:t,value:r}=e,o=[];switch(e.children.length){case 1:o.push({label:t,value:r,children:[F(n[0])]});break;case 2:o.push({label:t,value:r,children:[F(n[0]),F(n[1])]});break;default:o.push(e)}return{value:r,label:r?"\\text{T}":"\\text{F}",children:o}},Qe=e=>F(e),Ze=e=>{const{symTable:n,onSymChange:t}=e,r=[];return n.forEach((o,i)=>{r.push(a.jsxs(de,{fullWidth:!0,children:[a.jsx(J,{sx:{width:"100%",overflow:"auto"},children:a.jsx(G,{tex:i})}),a.jsxs(pe,{row:!0,value:o?"T":"F",onChange:c=>t(i,c.target.value==="T"),children:[a.jsx(w,{control:a.jsx(z,{disableRipple:!0}),value:"T",label:"จริง"}),a.jsx(w,{control:a.jsx(z,{disableRipple:!0}),value:"F",label:"เท็จ"})]})]},"synbol-"+i))}),a.jsx(j,{useFlexGap:!0,spacing:1,width:"100%",divider:a.jsx(ce,{flexItem:!0,variant:"middle"}),children:r})},Je=e=>{const{node:n,onClick:t}=e,r=ee(),o=p.useRef(null),i=()=>{t(n.data)};return p.useEffect(()=>{o.current!==null&&(o.current.innerHTML=Z.renderToString(n.data.label).replaceAll("span","tspan"))},[o,n.data.label]),a.jsxs(ne,{top:n.y,left:n.x,onClick:i,children:[a.jsx("circle",{r:30,fill:r.palette.secondary.light}),a.jsx("text",{ref:o,fontSize:r.typography.body1.fontSize,dy:"0.33rem",textAnchor:"middle",pointerEvents:"none",style:{userSelect:"none"}})]})},en=e=>{const{exprTree:n,height:t,width:r,onNodeClick:o}=e,i=ee(),c=ke(n),h=Math.max(t/(c.height+1),100),f=Math.max(r/3/(c.leaves().length+1),100);return a.jsx(Le,{width:r,height:t,scaleXMin:1/3,scaleXMax:4,scaleYMin:1/3,scaleYMax:4,children:R=>a.jsxs(p.Fragment,{children:[a.jsx("svg",{width:"100%",height:"100%",ref:R.containerRef,style:{touchAction:"none"},children:a.jsx("g",{onTouchStart:R.dragStart,onTouchMove:R.dragMove,onTouchEnd:R.dragEnd,onMouseDown:R.dragStart,onMouseMove:R.dragMove,onMouseUp:R.dragEnd,onMouseLeave:()=>{R.isDragging&&R.dragEnd()},transform:R.toString(),children:a.jsx(we,{root:c,size:[r,t],nodeSize:[f,h],children:E=>a.jsxs(ne,{children:[E.links().map((I,d)=>a.jsx(Me,{data:I,strokeWidth:"5",stroke:i.palette.primary.light,strokeOpacity:.6,fill:"none"},`cluster-link-${d}`)),E.descendants().map((I,d)=>a.jsx(Je,{node:I,onClick:o},`cluster-node-${d}`))]})})})}),a.jsx(ue,{size:"medium",color:"primary",onClick:R.center,sx:{position:"absolute",left:16,bottom:16},children:a.jsx(k,{placement:"right",title:a.jsx(T,{children:"กลับเข้าศูนย์กลาง"}),children:a.jsx(Re,{})})})]})})},nn=e=>{const{tree:n,emptyText:t}=e,[r,o]=p.useState(!1),[i,c]=p.useState(K(n)),[h,f]=p.useState(i);p.useEffect(()=>{c(K(n))},[n]);const R=p.useRef(null),E=R.current,I=E===null?200:E.getBoundingClientRect().width,d=E===null?200:E.getBoundingClientRect().height,y=()=>{o(x=>!x)},g=x=>{const m=qe(x),A=new Map;m.forEach((N,$)=>{const te=i.get($)??!1;A.set($,te)}),f(A),o(!0)},P=(x,m)=>{c(A=>{const N=new Map(A);return N.set(x,m),N}),f(A=>{const N=new Map(A);return N.set(x,m),N})};return a.jsxs(p.Fragment,{children:[a.jsx(S,{ref:R,sx:{height:"100%",position:"relative",display:"flex",justifyContent:"center",alignItems:"center"},children:n===null?a.jsx(T,{fontStyle:"italic",children:t}):a.jsx(en,{exprTree:Qe(Ve(n,i)),width:I,onNodeClick:g,height:d})}),a.jsxs(he,{onClose:y,open:r,children:[a.jsx(Oe,{children:"แก้ไขค่าความจริง"}),a.jsx(Te,{children:a.jsx(Ze,{symTable:h,onSymChange:P})}),a.jsx(fe,{disableSpacing:!0,children:a.jsx(H,{onClick:y,variant:"text",children:"ปิด"})})]})]})},B=e=>{const{tree:n}=e;return a.jsxs(j,{spacing:1,children:[a.jsx(Xe,{tree:n,emptyMessage:"ไม่มีประพจน์ให้แสดงในขณะนี้"}),a.jsx(S,{sx:{height:"75vh",width:"100%",borderWidth:4,borderStyle:"solid",borderRadius:t=>t.shape.borderRadius,borderColor:t=>M(t.palette.secondary.main,.4)},children:a.jsx(nn,{tree:n,emptyText:"ไม่มีประพจน์ให้แสดงในขณะนี้"})})]})},rn=e=>{const{children:n}=e,[t,r]=p.useState(!1);return a.jsx(Ee,{in:!t,unmountOnExit:!0,children:a.jsx(xe,{severity:"info",variant:"standard",color:"info",icon:a.jsx(ye,{fontSize:"inherit"}),action:a.jsx(k,{title:a.jsx(T,{children:"ปิด"}),children:a.jsx(Ae,{size:"small",onClick:()=>r(!0),children:a.jsx(Ie,{})})}),sx:{borderRadius:o=>o.shape.borderRadius},children:n})})},tn=e=>{const{panels:n,tabLabels:t}=e,[r,o]=p.useState(0);return n.length===0||n.length!==t.length?a.jsx(p.Fragment,{}):a.jsxs(ge,{value:r,children:[a.jsx(S,{sx:{borderBottom:1,borderColor:"divider"},children:a.jsx(me,{onChange:(i,c)=>o(c),variant:"scrollable",children:t.map((i,c)=>a.jsx(Ne,{label:i,value:c},"tab-lable"+c))})}),n.map((i,c)=>a.jsx(Pe,{sx:{padding:0},value:c,children:i},"tab-pane"+c))]})},q={and:l.AND,or:l.OR,implies:l.IMPLIES,iff:l.IFF,not:l.NOT,"∧":l.AND,"∨":l.OR,"⇒":l.IMPLIES,"⇔":l.IFF,"¬":l.NOT},on=/\s+/g,an=/^\w+/m,sn={tokenType:u.LEFT_PARENTHESIS,value:"("},ln={tokenType:u.RIGHT_PARENTHESIS,value:")"},cn=e=>e.replaceAll(on," "),dn=e=>{const n=an.exec(e);return n===null?null:n[0]},pn=e=>{const n=[],t=e.length;let r=0;for(;r<t;){const o=e[r];switch(o){case" ":r++;continue;case"(":r++,n.push(sn);continue;case")":r++,n.push(ln);continue}const i=q[o];i!==void 0&&(r++,n.push({tokenType:u.OPERATOR,value:i}));const c=dn(e.slice(r));if(c===null||c.length===0){n.push({tokenType:u.ERROR,reason:"เกิดข้อผิดพลาด"});break}const h=q[c];if(h!==void 0){r+=c.length,n.push({tokenType:u.OPERATOR,value:h});continue}r+=c.length,n.push({tokenType:u.IDENTIFIER,value:c})}return n},un=e=>{const n=cn(e);return pn(n)},V={[l.NOT]:6,[l.AND]:5,[l.OR]:4,[l.IMPLIES]:3,[l.IFF]:2},Y=e=>{const n=e.pop();if(n===void 0)return{nodeType:s.ERROR,reason:"เกิดข้อผิดพลาด นิพจน์ไม่ถูกต้อง"};switch(n.tokenType){case u.ERROR:return{nodeType:s.ERROR,reason:n.reason};case u.RIGHT_PARENTHESIS:case u.LEFT_PARENTHESIS:return{nodeType:s.ERROR,reason:"เกิดข้อผิดพลาด"};case u.IDENTIFIER:return{nodeType:s.IDENTIFIER,value:n.value}}if(n.value===l.NOT){const o=Y(e);return o.nodeType===s.ERROR?o:{nodeType:s.UNARY_OPERATOR,operator:n.value,operand:o}}const t=Y(e);if(t.nodeType===s.ERROR)return t;const r=Y(e);return r.nodeType===s.ERROR?r:{nodeType:s.BINARY_OPERATOR,operator:n.value,leftOperand:r,rightOperand:t}},Rn=e=>{const n=[],t=[];let r=0;for(;r<e.length;){const o=e[r];switch(r++,o.tokenType){case u.ERROR:return e.push(o),e;case u.IDENTIFIER:n.push(o);break;case u.OPERATOR:{const i=V[o.value];for(;t.length>0;){const c=t[t.length-1];if(c.tokenType===u.LEFT_PARENTHESIS||c.tokenType===u.OPERATOR&&V[c.value]<i)break;t.pop(),n.push(c)}t.push(o);break}case u.LEFT_PARENTHESIS:t.push(o);break;case u.RIGHT_PARENTHESIS:for(;t.length>0;){const i=t.pop();if(i===void 0||i.tokenType===u.LEFT_PARENTHESIS)break;n.push(i)}}}for(;t.length>0;){const o=t.pop();if(o===void 0)break;n.push(o)}return n},hn=e=>{const n=Rn(e);return Y(n)},On=(e,n)=>({nodeType:s.UNARY_OPERATOR,operator:l.NOT,operand:{nodeType:s.BINARY_OPERATOR,operator:l.AND,leftOperand:{nodeType:s.UNARY_OPERATOR,operator:l.NOT,operand:e},rightOperand:{nodeType:s.UNARY_OPERATOR,operator:l.NOT,operand:n}}}),Tn=(e,n)=>({nodeType:s.UNARY_OPERATOR,operator:l.NOT,operand:{nodeType:s.BINARY_OPERATOR,operator:l.AND,leftOperand:e,rightOperand:{nodeType:s.UNARY_OPERATOR,operator:l.NOT,operand:n}}}),fn=(e,n)=>{const t={nodeType:s.BINARY_OPERATOR,operator:l.AND,leftOperand:e,rightOperand:{nodeType:s.UNARY_OPERATOR,operator:l.NOT,operand:n}},r={nodeType:s.BINARY_OPERATOR,operator:l.AND,leftOperand:n,rightOperand:{nodeType:s.UNARY_OPERATOR,operator:l.NOT,operand:e}};return{nodeType:s.BINARY_OPERATOR,operator:l.AND,leftOperand:{nodeType:s.UNARY_OPERATOR,operator:l.NOT,operand:t},rightOperand:{nodeType:s.UNARY_OPERATOR,operator:l.NOT,operand:r}}},D=e=>{if(e.nodeType===s.ERROR||e.nodeType===s.IDENTIFIER)return e;if(e.nodeType===s.UNARY_OPERATOR){const r=D(e.operand);return{nodeType:s.UNARY_OPERATOR,operator:e.operator,operand:r}}const n=D(e.leftOperand),t=D(e.rightOperand);switch(e.operator){case l.AND:return{nodeType:s.BINARY_OPERATOR,operator:l.AND,leftOperand:n,rightOperand:t};case l.OR:return On(n,t);case l.IMPLIES:return Tn(n,t);case l.IFF:return fn(n,t)}},En=e=>e===null?null:D(e),L=(e,n)=>e.nodeType===s.ERROR||n.nodeType===s.ERROR||e.nodeType!==n.nodeType?!1:e.nodeType===s.IDENTIFIER&&n.nodeType===s.IDENTIFIER?e.value===n.value:e.nodeType===s.UNARY_OPERATOR&&n.nodeType===s.UNARY_OPERATOR?L(e.operand,n.operand):e.nodeType===s.BINARY_OPERATOR&&n.nodeType===s.BINARY_OPERATOR?e.operator!==n.operator?!1:L(e.leftOperand,n.leftOperand)&&L(e.rightOperand,n.rightOperand):!1,X=(e,n)=>L(e,n),xn=e=>{const t=e.operand;if(t.nodeType!==s.BINARY_OPERATOR)return null;const r=t.leftOperand;if(r.nodeType!==s.UNARY_OPERATOR)return null;const o=t.rightOperand;return o.nodeType!==s.UNARY_OPERATOR?null:{nodeType:s.BINARY_OPERATOR,operator:l.OR,leftOperand:r.operand,rightOperand:o.operand}},yn=e=>{const t=e.operand;if(t.nodeType!==s.BINARY_OPERATOR)return null;const r=t.rightOperand;return r.nodeType!==s.UNARY_OPERATOR?null:{nodeType:s.BINARY_OPERATOR,operator:l.IMPLIES,leftOperand:t.leftOperand,rightOperand:r.operand}},An=e=>{const n=e,t=n.leftOperand,r=n.rightOperand;if(t.nodeType!==s.UNARY_OPERATOR||r.nodeType!==s.UNARY_OPERATOR)return null;const o=t.operand,i=r.operand;if(o.nodeType!==s.BINARY_OPERATOR||i.nodeType!==s.BINARY_OPERATOR)return null;const c=o.leftOperand,h=i.leftOperand;if(!X(c,h))return null;const f=o.rightOperand,R=i.rightOperand;return X(f,R)?{nodeType:s.BINARY_OPERATOR,operator:l.IFF,leftOperand:c,rightOperand:h}:null},O=(e,n)=>{if(e.nodeType===s.ERROR||e.nodeType===s.IDENTIFIER)return e;if(e.nodeType===s.UNARY_OPERATOR){let r=null;if(n.has(l.OR)?r=xn(e):n.has(l.IMPLIES)&&(r=yn(e)),r===null){const c=O(e.operand,n);return{nodeType:s.UNARY_OPERATOR,operator:l.NOT,operand:c}}const o=O(r.leftOperand,n);if(o.nodeType===s.ERROR)return o;const i=O(r.rightOperand,n);return i.nodeType===s.ERROR?i:{nodeType:s.BINARY_OPERATOR,operator:r.operator,leftOperand:o,rightOperand:i}}let t=null;if(n.has(l.AND)?t=e:n.has(l.IFF)&&(t=An(e)),t!==null){const r=O(t.leftOperand,n);if(r.nodeType===s.ERROR)return r;const o=O(t.rightOperand,n);return o.nodeType===s.ERROR?o:{nodeType:s.BINARY_OPERATOR,operator:t.operator,leftOperand:r,rightOperand:o}}if(n.has(l.OR)){const r={nodeType:s.UNARY_OPERATOR,operator:l.NOT,operand:O(e.leftOperand,n)},o={nodeType:s.UNARY_OPERATOR,operator:l.NOT,operand:O(e.rightOperand,n)};return{nodeType:s.UNARY_OPERATOR,operator:l.NOT,operand:{nodeType:s.BINARY_OPERATOR,operator:l.OR,leftOperand:r,rightOperand:o}}}else if(n.has(l.IMPLIES))return{nodeType:s.UNARY_OPERATOR,operator:l.NOT,operand:{nodeType:s.BINARY_OPERATOR,operator:l.IMPLIES,leftOperand:O(e.leftOperand,n),rightOperand:{nodeType:s.UNARY_OPERATOR,operator:l.NOT,operand:O(e.rightOperand,n)}}};return{nodeType:s.ERROR,reason:"ไม่สามารถแปลงนิพจน์ให้อยู่ในรูปแบบที่ต้องการได้"}},In=(e,n)=>e===null?null:O(e,n),b=e=>{if(e.nodeType===s.ERROR||e.nodeType===s.IDENTIFIER)return e;if(e.nodeType===s.UNARY_OPERATOR){const{operand:r,operator:o}=e;if(r.nodeType===s.UNARY_OPERATOR)return b(r.operand);const i=b(r);return i.nodeType===s.ERROR?i:{nodeType:s.UNARY_OPERATOR,operator:o,operand:i}}const n=b(e.leftOperand);if(n.nodeType===s.ERROR)return n;const t=b(e.rightOperand);return t.nodeType===s.ERROR?t:{nodeType:s.BINARY_OPERATOR,operator:e.operator,leftOperand:n,rightOperand:t}},Q=e=>e===null?null:b(e),gn=()=>{const[e,n]=p.useState("not (p and q) iff (not p) or (not q)"),[t,r]=p.useState(null),[o,i]=p.useState(new Map([[l.AND,!0],[l.OR,!0],[l.IMPLIES,!0],[l.IFF,!0]])),c=p.useMemo(()=>Q(En(t)),[t]),h=p.useMemo(()=>{const d=new Set;return o.forEach((y,g)=>{y&&d.add(g)}),d.size===4?t:Q(In(c,d))},[c,t,o]),f=()=>{const d=un(e);if(d.length===0){r(null);return}r(hn(d))},R=d=>{n(y=>`${y} ${d}`)},E=d=>{d.key==="Enter"&&d.ctrlKey&&f()},I=(d,y)=>{i(g=>{const P=new Map(g);P.set(d,y);const x=new Set;return P.forEach((m,A)=>{m&&x.add(A)}),x.size>=0?P:g})};return a.jsx(be,{maxWidth:"lg",children:a.jsxs(j,{useFlexGap:!0,spacing:1,padding:2,children:[a.jsxs(je,{variant:"dense",disableGutters:!0,sx:{gap:1,display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between"},children:[a.jsx(ze,{onInsertChar:R}),a.jsx(Be,{onExecute:f,keyCombinationHint:["CTRL","ENTER"]})]}),a.jsx(Ue,{value:e,onChange:n,onKeyDown:E,rows:5}),a.jsx(rn,{children:a.jsx(T,{component:"p",children:"แตะที่โหนดของต้นไม้เพื่อแก้ไขค่าความจริง"})}),a.jsx(tn,{tabLabels:["รูปรับเข้า","รูปนิเสธ-และ","รูปอย่างง่าย"],panels:[a.jsx(B,{tree:t},"panel-1"),a.jsx(B,{tree:c},"panel-2"),a.jsxs(j,{spacing:1,children:[a.jsx(S,{sx:{padding:2,borderStyle:"solid",borderRadius:d=>d.shape.borderRadius,borderWidth:4,borderColor:d=>d.palette.primary.light},children:a.jsx($e,{onChange:I,values:o})}),a.jsx(B,{tree:h})]},"panel-3")]})]})})};let U=Se({palette:{mode:"light",primary:{main:ve[600]},secondary:{light:"#abcbad",main:_e[800]}},components:{MuiList:{defaultProps:{disablePadding:!0,dense:!0}},MuiListItem:{defaultProps:{dense:!0}},MuiTooltip:{styleOverrides:{arrow:({theme:e})=>({color:M(e.palette.primary.dark,.87)}),tooltip:({theme:e})=>({backgroundColor:M(e.palette.primary.dark,.87)})}}}});U=Ce(U);const mn=a.jsx(De,{styles:{tableLayout:"auto",borderCollapse:"collapse"}}),Nn=()=>a.jsxs(Fe,{theme:U,children:[a.jsx(Ye,{}),mn,a.jsx(gn,{})]});oe(document.getElementById("root")).render(a.jsx(p.StrictMode,{children:a.jsx(Nn,{})}));
//# sourceMappingURL=index-DatWE9-Z.js.map
