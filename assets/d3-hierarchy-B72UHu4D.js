function S(n){var e=0,r=n.children,i=r&&r.length;if(!i)e=1;else for(;--i>=0;)e+=r[i].value;n.value=e}function C(){return this.eachAfter(S)}function R(n){var e=this,r,i=[e],h,c,u;do for(r=i.reverse(),i=[];e=r.pop();)if(n(e),h=e.children,h)for(c=0,u=h.length;c<u;++c)i.push(h[c]);while(i.length);return this}function W(n){for(var e=this,r=[e],i,h;e=r.pop();)if(n(e),i=e.children,i)for(h=i.length-1;h>=0;--h)r.push(i[h]);return this}function j(n){for(var e=this,r=[e],i=[],h,c,u;e=r.pop();)if(i.push(e),h=e.children,h)for(c=0,u=h.length;c<u;++c)r.push(h[c]);for(;e=i.pop();)n(e);return this}function D(n){return this.eachAfter(function(e){for(var r=+n(e.data)||0,i=e.children,h=i&&i.length;--h>=0;)r+=i[h].value;e.value=r})}function H(n){return this.eachBefore(function(e){e.children&&e.children.sort(n)})}function L(n){for(var e=this,r=O(e,n),i=[e];e!==r;)e=e.parent,i.push(e);for(var h=i.length;n!==r;)i.splice(h,0,n),n=n.parent;return i}function O(n,e){if(n===e)return n;var r=n.ancestors(),i=e.ancestors(),h=null;for(n=r.pop(),e=i.pop();n===e;)h=n,n=r.pop(),e=i.pop();return h}function T(){for(var n=this,e=[n];n=n.parent;)e.push(n);return e}function q(){var n=[];return this.each(function(e){n.push(e)}),n}function E(){var n=[];return this.eachBefore(function(e){e.children||n.push(e)}),n}function F(){var n=this,e=[];return n.each(function(r){r!==n&&e.push({source:r.parent,target:r})}),e}function N(n,e){var r=new y(n),i=+n.value&&(r.value=n.value),h,c=[r],u,g,_,t;for(e==null&&(e=I);h=c.pop();)if(i&&(h.value=+h.data.value),(g=e(h.data))&&(t=g.length))for(h.children=new Array(t),_=t-1;_>=0;--_)c.push(u=h.children[_]=new y(g[_])),u.parent=h,u.depth=h.depth+1;return r.eachBefore(K)}function G(){return N(this).eachBefore(J)}function I(n){return n.children}function J(n){n.data=n.data.data}function K(n){var e=0;do n.height=e;while((n=n.parent)&&n.height<++e)}function y(n){this.data=n,this.depth=this.height=0,this.parent=null}y.prototype=N.prototype={constructor:y,count:C,each:R,eachAfter:j,eachBefore:W,sum:D,sort:H,path:L,ancestors:T,descendants:q,leaves:E,links:F,copy:G};function M(n,e){return n.parent===e.parent?1:2}function B(n){var e=n.children;return e?e[0]:n.t}function k(n){var e=n.children;return e?e[e.length-1]:n.t}function P(n,e,r){var i=r/(e.i-n.i);e.c-=i,e.s+=r,n.c+=i,e.z+=r,e.m+=r}function Q(n){for(var e=0,r=0,i=n.children,h=i.length,c;--h>=0;)c=i[h],c.z+=e,c.m+=e,e+=c.s+(r+=c.c)}function U(n,e,r){return n.a.parent===e.parent?n.a:r}function A(n,e){this._=n,this.parent=null,this.children=null,this.A=null,this.a=this,this.z=0,this.m=0,this.c=0,this.s=0,this.t=null,this.i=e}A.prototype=Object.create(y.prototype);function V(n){for(var e=new A(n,0),r,i=[e],h,c,u,g;r=i.pop();)if(c=r._.children)for(r.children=new Array(g=c.length),u=g-1;u>=0;--u)i.push(h=r.children[u]=new A(c[u],u)),h.parent=r;return(e.parent=new A(null,0)).children=[e],e}function X(){var n=M,e=1,r=1,i=null;function h(t){var f=V(t);if(f.eachAfter(c),f.parent.m=-f.z,f.eachBefore(u),i)t.eachBefore(_);else{var d=t,a=t,l=t;t.eachBefore(function(s){s.x<d.x&&(d=s),s.x>a.x&&(a=s),s.depth>l.depth&&(l=s)});var o=d===a?1:n(d,a)/2,p=o-d.x,w=e/(a.x+o+p),z=r/(l.depth||1);t.eachBefore(function(s){s.x=(s.x+p)*w,s.y=s.depth*z})}return t}function c(t){var f=t.children,d=t.parent.children,a=t.i?d[t.i-1]:null;if(f){Q(t);var l=(f[0].z+f[f.length-1].z)/2;a?(t.z=a.z+n(t._,a._),t.m=t.z-l):t.z=l}else a&&(t.z=a.z+n(t._,a._));t.parent.A=g(t,a,t.parent.A||d[0])}function u(t){t._.x=t.z+t.parent.m,t.m+=t.parent.m}function g(t,f,d){if(f){for(var a=t,l=t,o=f,p=a.parent.children[0],w=a.m,z=l.m,s=o.m,m=p.m,x;o=k(o),a=B(a),o&&a;)p=B(p),l=k(l),l.a=t,x=o.z+s-a.z-w+n(o._,a._),x>0&&(P(U(o,t,d),t,x),w+=x,z+=x),s+=o.m,w+=a.m,m+=p.m,z+=l.m;o&&!k(l)&&(l.t=o,l.m+=s-z),a&&!B(p)&&(p.t=a,p.m+=w-m,d=t)}return d}function _(t){t.x*=e,t.y=t.depth*r}return h.separation=function(t){return arguments.length?(n=t,h):n},h.size=function(t){return arguments.length?(i=!1,e=+t[0],r=+t[1],h):i?null:[e,r]},h.nodeSize=function(t){return arguments.length?(i=!0,e=+t[0],r=+t[1],h):i?[e,r]:null},h}export{X as d,N as h};
//# sourceMappingURL=d3-hierarchy-B72UHu4D.js.map
