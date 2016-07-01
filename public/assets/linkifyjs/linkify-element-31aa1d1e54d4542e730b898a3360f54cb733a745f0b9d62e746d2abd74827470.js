"use strict";!function(e,t){var n=function(t){function n(e,t,n){var r=n[n.length-1];e.replaceChild(r,t);for(var i=n.length-2;i>=0;i--)e.insertBefore(n[i],r),r=n[i]}function r(e,t,n){for(var r=[],i=0;i<e.length;i++){var o=e[i],a=o.isLink&&s.resolve(t.validate,o.toString(),o.type);if(o.isLink&&a){var u=o.toHref(t.defaultProtocol),c=s.resolve(t.format,o.toString(),o.type),l=s.resolve(t.formatHref,u,o.type),p=s.resolve(t.attributes,u,o.type),h=s.resolve(t.tagName,u,o.type),d=s.resolve(t.linkClass,u,o.type),f=s.resolve(t.target,u,o.type),m=s.resolve(t.events,u,o.type),g=n.createElement(h);if(g.setAttribute("href",l),g.setAttribute("class",d),f&&g.setAttribute("target",f),p)for(var v in p)g.setAttribute(v,p[v]);if(m)for(var y in m)g.addEventListener?g.addEventListener(y,m[y]):g.attachEvent&&g.attachEvent("on"+y,m[y]);g.appendChild(n.createTextNode(c)),r.push(g)}else"nl"===o.type&&t.nl2br?r.push(n.createElement("br")):r.push(n.createTextNode(o.toString()))}return r}function i(e,t,o){if(!e||e.nodeType!==u)throw new Error("Cannot linkify "+e+" - Invalid DOM Node type");var l=t.ignoreTags;if("A"===e.tagName||s.contains(l,e.tagName))return e;for(var p=e.firstChild;p;){switch(p.nodeType){case u:i(p,t,o);break;case c:var h=p.nodeValue,d=a(h),f=r(d,t,o);n(e,p,f),p=f[f.length-1]}p=p.nextSibling}return e}function o(t,n){var r=arguments.length<=2||void 0===arguments[2]?null:arguments[2];try{r=r||e&&e.document||global&&global.document}catch(o){}if(!r)throw new Error("Cannot find document implementation. If you are in a non-browser environment like Node.js, pass the document implementation as the third argument to linkifyElement.");return n=s.normalize(n),i(t,n,r)}var a=t.tokenize,s=t.options,u=1,c=3;return o.helper=i,o.normalize=s.normalize,o}(t);e.linkifyElement=n}(window,linkify);