import{c as p}from"./hast-util-is-element-DyH4pHXM.js";import{f}from"./unist-util-find-after-DoQrf0b7.js";const d=/\n/g,g=/[\t ]+/g,h=p("br"),m=p(N),y=p("p"),x=p("tr"),C=p(["datalist","head","noembed","noframes","noscript","rp","script","style","template","title",E,S]),b=p(["address","article","aside","blockquote","body","caption","center","dd","dialog","dir","dl","dt","div","figure","figcaption","footer","form,","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","legend","li","listing","main","menu","nav","ol","p","plaintext","pre","section","ul","xmp"]);function F(e,a){const l=a||{},n="children"in e?e.children:[],i=b(e),r=A(e,{whitespace:l.whitespace||"normal",breakBefore:!1,breakAfter:!1}),t=[];(e.type==="text"||e.type==="comment")&&t.push(...k(e,{whitespace:r,breakBefore:!0,breakAfter:!0}));let s=-1;for(;++s<n.length;)t.push(...w(n[s],e,{whitespace:r,breakBefore:s?void 0:i,breakAfter:s<n.length-1?h(n[s+1]):i}));const c=[];let o;for(s=-1;++s<t.length;){const u=t[s];typeof u=="number"?o!==void 0&&u>o&&(o=u):u&&(o!==void 0&&o>-1&&c.push(`
`.repeat(o)||" "),o=-1,c.push(u))}return c.join("")}function w(e,a,l){return e.type==="element"?B(e,a,l):e.type==="text"?l.whitespace==="normal"?k(e,l):T(e):[]}function B(e,a,l){const n=A(e,l),i=e.children||[];let r=-1,t=[];if(C(e))return t;let s,c;for(h(e)||x(e)&&f(a,e,x)?c=`
`:y(e)?(s=2,c=2):b(e)&&(s=1,c=1);++r<i.length;)t=t.concat(w(i[r],e,{whitespace:n,breakBefore:r?void 0:s,breakAfter:r<i.length-1?h(i[r+1]):c}));return m(e)&&f(a,e,m)&&t.push("	"),s&&t.unshift(s),c&&t.push(c),t}function k(e,a){const l=String(e.value),n=[],i=[];let r=0;for(;r<=l.length;){d.lastIndex=r;const c=d.exec(l),o=c&&"index"in c?c.index:l.length;n.push(v(l.slice(r,o).replace(/[\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/g,""),r===0?a.breakBefore:!0,o===l.length?a.breakAfter:!0)),r=o+1}let t=-1,s;for(;++t<n.length;)n[t].charCodeAt(n[t].length-1)===8203||t<n.length-1&&n[t+1].charCodeAt(0)===8203?(i.push(n[t]),s=void 0):n[t]?(typeof s=="number"&&i.push(s),i.push(n[t]),s=0):(t===0||t===n.length-1)&&i.push(0);return i}function T(e){return[String(e.value)]}function v(e,a,l){const n=[];let i=0,r;for(;i<e.length;){g.lastIndex=i;const t=g.exec(e);r=t?t.index:e.length,!i&&!r&&t&&!a&&n.push(""),i!==r&&n.push(e.slice(i,r)),i=t?r+t[0].length:r}return i!==r&&!l&&n.push(""),n.join(" ")}function A(e,a){if(e.type==="element"){const l=e.properties||{};switch(e.tagName){case"listing":case"plaintext":case"xmp":return"pre";case"nobr":return"nowrap";case"pre":return l.wrap?"pre-wrap":"pre";case"td":case"th":return l.noWrap?"nowrap":a.whitespace;case"textarea":return"pre-wrap"}}return a.whitespace}function E(e){return!!(e.properties||{}).hidden}function N(e){return e.tagName==="td"||e.tagName==="th"}function S(e){return e.tagName==="dialog"&&!(e.properties||{}).open}export{F as t};
//# sourceMappingURL=hast-util-to-text-YVRn2jrO.js.map
