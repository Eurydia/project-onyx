import{f as N,n as m,s as A,h as b}from"./property-information-DdDptki-.js";import{p as d}from"./comma-separated-tokens-Dw-VBL9A.js";import{p as h}from"./space-separated-tokens-D7QSIrTI.js";import{p as w}from"./hast-util-parse-selector-TXfch5wI.js";const l={}.hasOwnProperty;function u(t,e,r){const i=r&&S(r);function o(s,n,...a){let p=-1,f;if(s==null){f={type:"root",children:[]};const c=n;a.unshift(c)}else if(f=w(s,e),f.tagName=f.tagName.toLowerCase(),i&&l.call(i,f.tagName)&&(f.tagName=i[f.tagName]),x(n))a.unshift(n);else{let c;for(c in n)l.call(n,c)&&C(t,f.properties,c,n[c])}for(;++p<a.length;)y(f.children,a[p]);return f.type==="element"&&f.tagName==="template"&&(f.content={type:"root",children:f.children},f.children=[]),f}return o}function x(t){if(t===null||typeof t!="object"||Array.isArray(t))return!0;if(typeof t.type!="string")return!1;const e=t,r=Object.keys(t);for(const i of r){const o=e[i];if(o&&typeof o=="object"){if(!Array.isArray(o))return!0;const s=o;for(const n of s)if(typeof n!="number"&&typeof n!="string")return!0}}return!!("children"in t&&Array.isArray(t.children))}function C(t,e,r,i){const o=N(t,r);let s=-1,n;if(i!=null){if(typeof i=="number"){if(Number.isNaN(i))return;n=i}else typeof i=="boolean"?n=i:typeof i=="string"?o.spaceSeparated?n=h(i):o.commaSeparated?n=d(i):o.commaOrSpaceSeparated?n=h(d(i).join(" ")):n=g(o,o.property,i):Array.isArray(i)?n=i.concat():n=o.property==="style"?j(i):String(i);if(Array.isArray(n)){const a=[];for(;++s<n.length;){const p=g(o,o.property,n[s]);a[s]=p}n=a}if(o.property==="className"&&Array.isArray(e.className)){const a=n;n=e.className.concat(a)}e[o.property]=n}}function y(t,e){let r=-1;if(e!=null)if(typeof e=="string"||typeof e=="number")t.push({type:"text",value:String(e)});else if(Array.isArray(e))for(;++r<e.length;)y(t,e[r]);else if(typeof e=="object"&&"type"in e)e.type==="root"?y(t,e.children):t.push(e);else throw new Error("Expected node, nodes, or string, got `"+e+"`")}function g(t,e,r){if(typeof r=="string"){if(t.number&&r&&!Number.isNaN(Number(r)))return Number(r);if((t.boolean||t.overloadedBoolean)&&(r===""||m(r)===m(e)))return!0}return r}function j(t){const e=[];let r;for(r in t)l.call(t,r)&&e.push([r,t[r]].join(": "));return e.join("; ")}function S(t){const e={};let r=-1;for(;++r<t.length;)e[t[r].toLowerCase()]=t[r];return e}const M=["altGlyph","altGlyphDef","altGlyphItem","animateColor","animateMotion","animateTransform","clipPath","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","foreignObject","glyphRef","linearGradient","radialGradient","solidColor","textArea","textPath"],D=u(b,"div"),F=u(A,"g",M);export{D as h,F as s};
//# sourceMappingURL=hastscript-B7lOftd8.js.map