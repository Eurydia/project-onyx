import{c as A}from"./unist-util-is-D9KQvrmg.js";const g=[],I=!0,m=!1,j="skip";function O(n,o,u,l){let y;typeof o=="function"&&typeof u!="function"?(l=u,u=o):y=o;const b=A(y),p=l?-1:1;a(n,void 0,[])();function a(t,N,s){const i=t&&typeof t=="object"?t:{};if(typeof i.type=="string"){const e=typeof i.tagName=="string"?i.tagName:typeof i.name=="string"?i.name:void 0;Object.defineProperty(h,"name",{value:"node ("+(t.type+(e?"<"+e+">":""))+")"})}return h;function h(){let e=g,c,r,d;if((!o||b(t,N,s[s.length-1]||void 0))&&(e=k(u(t,s)),e[0]===m))return e;if("children"in t&&t.children){const f=t;if(f.children&&e[0]!==j)for(r=(l?f.children.length:-1)+p,d=s.concat(f);r>-1&&r<f.children.length;){const P=f.children[r];if(c=a(P,r,d)(),c[0]===m)return c;r=typeof c[1]=="number"?c[1]:r+p}}return e}}}function k(n){return Array.isArray(n)?n:typeof n=="number"?[I,n]:n==null?g:[n]}export{j as S,O as v};
//# sourceMappingURL=unist-util-visit-parents-C4uo1357.js.map
