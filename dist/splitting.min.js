!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):n.Splitting=t()}(this,function(){"use strict"
var u=document,a=u.createTextNode.bind(u)
function l(n,t,e){n.style.setProperty(t,e)}function f(n,t){return n.appendChild(t)}function d(n,t,e,r){var o=u.createElement("span")
return t&&(o.className=t),e&&(r||o.setAttribute("data-"+t,e),o.textContent=e),n&&f(n,o)||o}function p(n,t){return n.getAttribute("data-"+t)}function m(n,t){return n&&0!=n.length?n.nodeName?[n]:[].slice.call(n[0].nodeName?n:(t||u).querySelectorAll(n)):[]}function i(n){for(var t=[];n--;)t[n]=[]
return t}function h(n,t){n&&n.some(t)}function o(t){return function(n){return t[n]}}var c={}
function n(n,t,e,r){return{by:n,depends:t,key:e,split:r}}function e(n){return function t(e,n,r){var o=r.indexOf(e)
if(-1==o){r.unshift(e)
var u=c[e]
if(!u)throw new Error("plugin not loaded: "+e)
h(u.depends,function(n){t(n,e,r)})}else u=r.indexOf(n),r.splice(o,1),r.splice(u,0,e)
return r}(n,0,[]).map(o(c))}function t(n){c[n.by]=n}function g(n,e,r,o,u){n.normalize()
var i=[],c=document.createDocumentFragment(),s=(o&&i.push(n.previousSibling),[])
return m(n.childNodes).some(function(n){var t
n.tagName&&!n.hasChildNodes()?s.push(n):n.childNodes&&n.childNodes.length?(s.push(n),i.push.apply(i,g(n,e,r,o,u))):(t=(n=n.wholeText||"").trim()).length&&(" "===n[0]&&s.push(a(" ")),h(""===r&&"function"==typeof Intl.Segmenter?Array.from((new Intl.Segmenter).segment(t)).map(function(n){return n.segment}):t.split(r),function(n,t){t&&u&&s.push(d(c,"whitespace"," ",u))
t=d(c,e,n)
i.push(t),s.push(t)})," "===n[n.length-1])&&s.push(a(" "))}),h(s,function(n){f(c,n)}),n.innerHTML="",f(n,c),i}var v=0
var s="words",r=n(s,v,"word",function(n){return g(n,"word",/\s+/,0,1)}),y="chars",w=n(y,[s],"char",function(n,e,t){var r=[]
return h(t[s],function(n,t){r.push.apply(r,g(n,"char","",e.whitespace&&t))}),r})
function b(t){var a=(t=t||{}).key
return m(t.target||"[data-splitting]").map(function(i){var n,c,s=i["🍌"]
return!t.force&&s||(s=i["🍌"]={el:i},n=e(n=(n=t.by||p(i,"splitting"))&&"true"!=n?n:y),c=function(n,t){for(var e in t)n[e]=t[e]
return n}({},t),h(n,function(n){var t,e,r,o,u
n.split&&(t=n.by,r=(a?"-"+a:"")+n.key,n=n.split(i,c,s),r&&(e=i,u=(r="--"+(r=r))+"-index",h(o=n,function(n,t){Array.isArray(n)?h(n,function(n){l(n,u,t)}):l(n,u,t)}),l(e,r+"-total",o.length)),s[t]=n,i.classList.add(t))}),i.classList.add("splitting")),s})}function N(n,t,e){var t=m(t.matching||n.children,n),r={}
return h(t,function(n){var t=Math.round(n[e]);(r[t]||(r[t]=[])).push(n)}),Object.keys(r).map(Number).sort(x).map(o(r))}function x(n,t){return n-t}b.html=function(n){var t=(n=n||{}).target=d()
return t.innerHTML=n.content,b(n),t.outerHTML}
var S=n("lines",[s],"line",function(n,t,e){return N(n,{matching:e[s]},"offsetTop")}),T=n("items",v,"item",function(n,t){return m(t.matching||n.children,n)}),A=n("rows",v,"row",function(n,t){return N(n,t,"offsetTop")}),L=n("cols",v,"col",function(n,t){return N(n,t,"offsetLeft")}),k=n("grid",["rows","cols"]),C="layout",M=n(C,v,v,function(n,t){for(var e,r=t.rows=+(t.rows||p(n,"rows")||1),o=t.columns=+(t.columns||p(n,"columns")||1),u=(t.image=t.image||p(n,"image")||n.currentSrc||n.src,t.image&&(e=m("img",n)[0],t.image=e&&(e.currentSrc||e.src)),t.image&&l(n,"background-image","url("+t.image+")"),r*o),i=[],c=d(v,"cell-grid");u--;){var s=d(c,"cell")
d(s,"cell-inner"),i.push(s)}return f(n,c),i}),H=n("cellRows",[C],"row",function(n,t,e){var r=t.rows,o=i(r)
return h(e[C],function(n,t,e){o[Math.floor(t/(e.length/r))].push(n)}),o}),O=n("cellColumns",[C],"col",function(n,t,e){var r=t.columns,o=i(r)
return h(e[C],function(n,t){o[t%r].push(n)}),o}),j=n("cells",["cellRows","cellColumns"],"cell",function(n,t,e){return e[C]})
return(b.add=t)(r),t(w),t(S),t(T),t(A),t(L),t(k),t(M),t(H),t(O),t(j),b})
