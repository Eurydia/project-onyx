function l(t){return"children"in t?i(t):"value"in t?t.value:""}function e(t){return t.type==="text"?t.value:"children"in t?i(t):""}function i(t){let n=-1;const r=[];for(;++n<t.children.length;)r[n]=e(t.children[n]);return r.join("")}export{l as t};
//# sourceMappingURL=hast-util-to-string-CAVF9NB8.js.map
