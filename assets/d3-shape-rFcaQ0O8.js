import{p}from"./d3-path-BevWroqt.js";function a(t){return function(){return t}}function g(t){return t[0]}function h(t){return t[1]}var m=Array.prototype.slice;function y(t){return t.source}function v(t){return t.target}function k(t){var i=y,u=v,o=g,l=h,c=null;function r(){var n,e=m.call(arguments),f=i.apply(this,e),s=u.apply(this,e);if(c||(c=n=p()),t(c,+o.apply(this,(e[0]=f,e)),+l.apply(this,e),+o.apply(this,(e[0]=s,e)),+l.apply(this,e)),n)return c=null,n+""||null}return r.source=function(n){return arguments.length?(i=n,r):i},r.target=function(n){return arguments.length?(u=n,r):u},r.x=function(n){return arguments.length?(o=typeof n=="function"?n:a(+n),r):o},r.y=function(n){return arguments.length?(l=typeof n=="function"?n:a(+n),r):l},r.context=function(n){return arguments.length?(c=n??null,r):c},r}function x(t,i,u,o,l){t.moveTo(i,u),t.bezierCurveTo(i,u=(u+l)/2,o,u,o,l)}function b(){return k(x)}export{b as l};
//# sourceMappingURL=d3-shape-rFcaQ0O8.js.map
