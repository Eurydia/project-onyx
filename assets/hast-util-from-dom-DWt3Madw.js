import{w as u}from"./web-namespaces-bsVAaBS1.js";import{s as l,h as N}from"./hastscript-B7lOftd8.js";function v(t,n){return i(t,{})||{type:"root",children:[]}}function i(t,n){const e=p(t,n);return e&&n.afterTransform&&n.afterTransform(t,e),e}function p(t,n){switch(t.nodeType){case 1:return w(t,n);case 3:return g(t);case 8:return y(t);case 9:return d(t,n);case 10:return h();case 11:return d(t,n);default:return}}function d(t,n){return{type:"root",children:f(t,n)}}function h(){return{type:"doctype"}}function g(t){return{type:"text",value:t.nodeValue||""}}function y(t){return{type:"comment",value:t.nodeValue||""}}function w(t,n){const e=t.namespaceURI,r=e===u.svg?l:N,o=e===u.html?t.tagName.toLowerCase():t.tagName,c=e===u.html&&o==="template"?t.content:t,s=t.getAttributeNames(),m={};let a=-1;for(;++a<s.length;)m[s[a]]=t.getAttribute(s[a])||"";return r(o,m,f(c,n))}function f(t,n){const e=t.childNodes,r=[];let o=-1;for(;++o<e.length;){const c=i(e[o],n);c!==void 0&&r.push(c)}return r}export{v as f};
//# sourceMappingURL=hast-util-from-dom-DWt3Madw.js.map