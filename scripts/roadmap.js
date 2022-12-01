(()=>{function L(l){return(l||"").replace(/^\d+-/,"")}function R(l){let t=l>>16&255,e=l>>8&255,i=l&255;return`rgb(${t},${e},${i})`}function p(l,t={},e){let i=document.createElementNS("http://www.w3.org/2000/svg",l);for(let o in t)!t.hasOwnProperty(o)||i.setAttribute(o,t[o]);return e&&e.appendChild(i),i}var f=2.7,D=4,A=2,E={black:["#000"],gray:["#000","#333","#666","#999","#ccc","#ddd","#eee"],white:["#fff"],red:["#cf2a27","#ea9999","#eo6666","#cc0000","#990000","#660000"],orange:["#ff9900","#f9cb9c","#f6b26b","#e69138","#b45f06","#783f04"],yellow:["#ffff00","#ffe599","#ffd966","#f1c232","#bf9000","#7f6000"],green:["#009e0f","#b6d7a8","#93c47d","#6aa84f","#38761d","#274e13"],cyan:["#00ffff","#a2c4c9","#76a5af","#45818e","#134f5c","#0c343d"],blue:["#2b78e4","#9fc5f8","#6fa8dc","#597eaa","#085394","#073763"],purple:["#9900ff","#b4a7d6","#8e7cc3","#674ea7","#351c75","#20124d"],pink:["#ff00ff","#d5a6bd","#c27ba0","#a64d79","#741b47","#4c1130"]},v=class{constructor(t,e){this.svgRoot=t,this.fontFamily=e,this.canvasRenderingContext2D=document.createElement("canvas").getContext("2d")}render(t,e){let i=t.typeID;i in this?this[i](t,e):console.log(`'${i}' control type not implemented`)}parseColor(t,e){return t===void 0?`rgb(${e})`:R(t)}parseFontProperties(t){var e,i,o;return{style:(e=t.properties)!=null&&e.italic?"italic":"normal",weight:(i=t.properties)!=null&&i.bold?"bold":"normal",size:(o=t.properties)!=null&&o.size?t.properties.size+"px":"13px",family:this.fontFamily}}measureText(t,e){return this.canvasRenderingContext2D.font=e,this.canvasRenderingContext2D.measureText(t)}drawRectangle(t,e){var i,o,s,n,a,r;p("rect",{x:parseInt(t.x)+f/2,y:parseInt(t.y)+f/2,width:parseInt((i=t.w)!=null?i:t.measuredW)-f,height:parseInt((o=t.h)!=null?o:t.measuredH)-f,rx:A,fill:this.parseColor((s=t.properties)==null?void 0:s.color,"255,255,255"),"fill-opacity":(a=(n=t.properties)==null?void 0:n.backgroundAlpha)!=null?a:1,stroke:this.parseColor((r=t.properties)==null?void 0:r.borderColor,"0,0,0"),"stroke-width":f},e)}addText(t,e,i,o){var s,n;let a=(s=t.properties.text)!=null?s:"",r=parseInt(t.x),d=parseInt(t.y),c=this.parseFontProperties(t),m=this.measureText(a,`${c.style} ${c.weight} ${c.size} ${c.family}`),u=o==="center"?r+((n=t.w)!=null?n:t.measuredW)/2-m.width/2:r,T=d+t.measuredH/2+m.actualBoundingBoxAscent/2,y=p("text",{x:u,y:T,fill:i,"font-style":c.style,"font-weight":c.weight,"font-size":c.size},e);if(!a.includes("{color:")){let g=p("tspan",{},y);g.textContent=a;return}a.split(/{color:|{color}/).forEach(g=>{if(g.includes("}")){let[h,b]=g.split("}");if(!h.startsWith("#")){let x=parseInt(h.slice(-1));h=isNaN(x)?E[h][0]:E[h][x]}let $=p("tspan",{fill:h},y);$.textContent=b}else{let h=p("tspan",{},y);h.textContent=g}})}TextArea(t,e){this.drawRectangle(t,e)}Canvas(t,e){this.drawRectangle(t,e)}Label(t,e){var i;this.addText(t,e,this.parseColor((i=t.properties)==null?void 0:i.color,"0,0,0"),"left")}TextInput(t,e){var i;this.drawRectangle(t,e),this.addText(t,e,this.parseColor((i=t.properties)==null?void 0:i.textColor,"0,0,0"),"center")}Arrow(t,e){var i,o,s;let n=parseInt(t.x),a=parseInt(t.y),{p0:r,p1:d,p2:c}=t.properties,m;((i=t.properties)==null?void 0:i.stroke)==="dotted"?m="0.8 12":((o=t.properties)==null?void 0:o.stroke)==="dashed"&&(m="28 46");let u={x:(c.x-r.x)*d.x,y:(c.y-r.y)*d.x};p("path",{d:`M${n+r.x} ${a+r.y}Q${n+r.x+u.x+u.y*d.y*3.6} ${a+r.y+u.y+-u.x*d.y*3.6} ${n+c.x} ${a+c.y}`,fill:"none",stroke:this.parseColor((s=t.properties)==null?void 0:s.color,"0,0,0"),"stroke-width":D,"stroke-linecap":"round","stroke-linejoin":"round","stroke-dasharray":m},e)}Icon(t,e){var i;let o=parseInt(t.x),s=parseInt(t.y),n=10;p("circle",{cx:o+n,cy:s+n,r:n,fill:this.parseColor((i=t.properties)==null?void 0:i.color,"0,0,0")},e),t.properties.icon.ID==="check-circle"&&p("path",{d:`M${o+4.5} ${s+n}L${o+8.5} ${s+n+4} ${o+15} ${s+n-2.5}`,fill:"none",stroke:"#fff","stroke-width":3.5,"stroke-linecap":"round","stroke-linejoin":"round"},e)}HRule(t,e){var i,o,s,n;let a=parseInt(t.x),r=parseInt(t.y),d;((i=t.properties)==null?void 0:i.stroke)==="dotted"?d="0.8, 8":((o=t.properties)==null?void 0:o.stroke)==="dashed"&&(d="18, 30"),p("path",{d:`M${a} ${r}L${a+parseInt((s=t.w)!=null?s:t.measuredW)} ${r}`,fill:"none",stroke:this.parseColor((n=t.properties)==null?void 0:n.color,"0,0,0"),"stroke-width":f,"stroke-linecap":"round","stroke-linejoin":"round","stroke-dasharray":d},e)}__group__(t,e){var i;let o=(i=t?.properties)==null?void 0:i.controlName,s=L(o),n=localStorage.getItem(s)==="done",a=p("g",{...o?{class:`clickable-group ${n?"done":""}`,"data-group-id":o}:{}},e);t.children.controls.control.sort((r,d)=>r.zOrder-d.zOrder).forEach(r=>{r.x=parseInt(r.x,10)+parseInt(t.x,10),r.y=parseInt(r.y,10)+parseInt(t.y,10),this.render(r,a)})}};async function C(l,t={}){if(t={padding:5,fontFamily:"balsamiq",fontURL:"https://fonts.gstatic.com/s/balsamiqsans/v3/P5sEzZiAbNrN8SB3lQQX7Pncwd4XIA.woff2",...t},t.fontURL){let d=new FontFace(t.fontFamily,`url(${t.fontURL})`);await d.load(),document.fonts.add&&document.fonts.add(d)}let e=l.mockup,i=e.measuredW-e.mockupW-t.padding,o=e.measuredH-e.mockupH-t.padding,s=parseInt(e.mockupW)+t.padding*2,n=parseInt(e.mockupH)+t.padding*2,a=p("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:`${i} ${o} ${s} ${n}`,style:"font-family: balsamiq"}),r=new v(a,t.fontFamily);return e.controls.control.sort((d,c)=>d.zOrder-c.zOrder).forEach(d=>{r.render(d,a)}),a}var I=class{constructor(){this.overlayId="topic-overlay",this.contentId="topic-content",this.loaderId="topic-loader",this.topicBodyId="topic-body",this.topicActionsId="topic-actions",this.markTopicDoneId="mark-topic-done",this.markTopicPendingId="mark-topic-pending",this.closeTopicId="close-topic",this.activeRoadmapId=null,this.activeTopicId=null,this.handleTopicClick=this.handleTopicClick.bind(this),this.close=this.close.bind(this),this.resetDOM=this.resetDOM.bind(this),this.populate=this.populate.bind(this),this.handleOverlayClick=this.handleOverlayClick.bind(this),this.markAsDone=this.markAsDone.bind(this),this.markAsPending=this.markAsPending.bind(this),this.queryRoadmapElementsByTopicId=this.queryRoadmapElementsByTopicId.bind(this),this.init=this.init.bind(this)}get loaderEl(){return document.getElementById(this.loaderId)}get markTopicDoneEl(){return document.getElementById(this.markTopicDoneId)}get markTopicPendingEl(){return document.getElementById(this.markTopicPendingId)}get topicActionsEl(){return document.getElementById(this.topicActionsId)}get contentEl(){return document.getElementById(this.contentId)}get overlayEl(){return document.getElementById(this.overlayId)}resetDOM(t=!1){t?this.overlayEl.classList.add("hidden"):this.overlayEl.classList.remove("hidden"),this.loaderEl.classList.remove("hidden"),this.topicActionsEl.classList.add("hidden"),this.contentEl.replaceChildren("")}close(){this.resetDOM(!0),this.activeRoadmapId=null,this.activeTopicId=null}populate(t){this.contentEl.replaceChildren(t),this.loaderEl.classList.add("hidden"),this.topicActionsEl.classList.remove("hidden");let e=(this.activeTopicId||"").replace(/^\d+-/,"");localStorage.getItem(e)==="done"?(this.markTopicDoneEl.classList.add("hidden"),this.markTopicPendingEl.classList.remove("hidden")):(this.markTopicDoneEl.classList.remove("hidden"),this.markTopicPendingEl.classList.add("hidden"))}fetchTopicHtml(t,e){let i=e.replace(/^\d+-/,"").replaceAll(/:/g,"/"),o=`/${t}/${i}/`;return fetch(o).then(s=>s.text()).then(s=>new DOMParser().parseFromString(s,"text/html").getElementById("main-content"))}handleTopicClick(t){let{roadmapId:e,topicId:i}=t.detail;if(!i||!e){console.log("Missing topic or roadmap: ",t.detail);return}if(this.activeRoadmapId=e,this.activeTopicId=i,/^ext_link/.test(i)){window.open(`https://${i.replace("ext_link:","")}`);return}this.resetDOM(),this.fetchTopicHtml(e,i).then(o=>{this.populate(o)}).catch(o=>{console.error(o),this.populate("Error loading the content!")})}queryRoadmapElementsByTopicId(t){let e=document.querySelectorAll(`[data-group-id$="-${t}"]`),i=[];return e.forEach(o=>{let s=o?.dataset?.groupId||"";new RegExp(`^\\d+-${t}$`).test(s)&&i.push(o)}),i}markAsDone(t){let e=t.replace(/^\d+-/,"");localStorage.setItem(e,"done"),this.queryRoadmapElementsByTopicId(e).forEach(i=>{i?.classList?.add("done")})}markAsPending(t){let e=t.replace(/^\d+-/,"");localStorage.removeItem(e),this.queryRoadmapElementsByTopicId(e).forEach(i=>{i?.classList?.remove("done")})}handleOverlayClick(t){if(!t.target.closest(`#${this.topicBodyId}`)){this.close();return}(t.target.id===this.markTopicDoneId||t.target.closest(`#${this.markTopicDoneId}`))&&(this.markAsDone(this.activeTopicId),this.close()),(t.target.id===this.markTopicPendingId||t.target.closest(`#${this.markTopicPendingId}`))&&(this.markAsPending(this.activeTopicId),this.close()),(t.target.id===this.closeTopicId||t.target.closest(`#${this.closeTopicId}`))&&this.close()}init(){window.addEventListener("topic.click",this.handleTopicClick),window.addEventListener("click",this.handleOverlayClick),window.addEventListener("keydown",t=>{t.key.toLowerCase()==="escape"&&this.close()})}};var k=class{constructor(){this.init=this.init.bind(this),this.onScroll=this.onScroll.bind(this),this.shareIconsId="page-share-icons"}get shareIconsEl(){return document.getElementById(this.shareIconsId)}onScroll(){if(window.scrollY<100||window.innerWidth<1050)return this.shareIconsEl.classList.add("hidden"),null;this.shareIconsEl.classList.remove("hidden")}init(){window.addEventListener("scroll",this.onScroll,{passive:!0})}};var w=class{constructor(t){this.roadmapId=t.roadmapId,this.jsonUrl=t.jsonUrl,this.containerId="roadmap-svg",this.init=this.init.bind(this),this.onDOMLoaded=this.onDOMLoaded.bind(this),this.fetchRoadmapSvg=this.fetchRoadmapSvg.bind(this),this.handleRoadmapClick=this.handleRoadmapClick.bind(this)}fetchRoadmapSvg(t){return t?fetch(t).then(function(e){return e.json()}).then(function(e){return C(e,{fontURL:"/assets/fonts/balsamiq.woff2"})}):(console.error("jsonUrl not defined in frontmatter"),null)}onDOMLoaded(){this.fetchRoadmapSvg(this.jsonUrl).then(t=>{document.getElementById(this.containerId).replaceChildren(t)}).catch(console.error)}handleRoadmapClick(t){let e=t.target.closest("g")||{},i=e.dataset?e.dataset.groupId:"";!i||(t.stopImmediatePropagation(),window.dispatchEvent(new CustomEvent("topic.click",{detail:{topicId:i,roadmapId:this.roadmapId}})))}init(){window.addEventListener("DOMContentLoaded",this.onDOMLoaded),window.addEventListener("click",this.handleRoadmapClick)}};window.initRoadmap=function(l){new w(l).init(),new I().init(),new k().init()};})();
//# sourceMappingURL=roadmap.js.map
