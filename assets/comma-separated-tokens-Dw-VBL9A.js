function f(n){const e=[],t=String(n||"");let i=t.indexOf(","),s=0,o=!1;for(;!o;){i===-1&&(i=t.length,o=!0);const r=t.slice(s,i).trim();(r||!o)&&e.push(r),s=i+1,i=t.indexOf(",",s)}return e}function p(n,e){const t={};return(n[n.length-1]===""?[...n,""]:n).join((t.padRight?" ":"")+","+(t.padLeft===!1?"":" ")).trim()}export{f as p,p as s};
//# sourceMappingURL=comma-separated-tokens-Dw-VBL9A.js.map
