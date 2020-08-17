// COPYRIGHT © 2020 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.33/esri/copyright.txt for details.

define(["esri/declare","dojo/_base/lang","dojo/_base/array","dojox/mvc/Templated","dojo/dom-class","dojo/dom-geometry","dojo/dom-construct","dojo/dom-style","dojo/on","dojo/sniff","dijit/layout/_LayoutWidget","./utils/animation/AnimationHelper","dojo/text!./templates/Pagination.html"],(function(t,e,i,n,a,o,s,r,h,d,l,c,g){return t("esri.dijit.geoenrichment.Pagination",[n,l],{templateString:g,autoCenter:!1,scrollAnimation:!0,cyclicPagination:!1,alwaysShowArrows:!1,detachChildrenUponHiding:!1,items:null,currentPage:0,_pageCount:0,_pageSize:0,_animation:null,_itemMargins:null,clickEventType:null,constructor:function(){var t=this;this._animation=new c,this._animation.onNodePreDestroy=function(e){t._onNodePreDestroy(e),t.onNodePreDestroy(e)},this.clickEventType=d("touch")?"touchstart, click":"click"},createItemContainer:function(){},updateItemContainer:function(t,e){},onNodePreDestroy:function(t){},onNodePlaced:function(t,e){},onSelect:function(t){},onPageChanged:function(){},onPageChangedManually:function(){},layout:function(){this._animation.finish();var t=this.items;if(t&&t.length){var i=this.itemsNode.parentNode;if(i&&i.clientHeight){var n=this._parseAutoCenterOption(this.autoCenter);n.type&&r.set(i,"padding","0px");var d=this.itemsNode.firstChild;d||(d=s.create("div",null,this.itemsNode),a.add(d,"PaginationItemsNodeChildDiv")),"stretch"==n.type&&(this._itemMargins={},this._emptyNode(d));for(var l=d.children;!I()&&(n.type||l.length<t.length);){var c=this.createItemContainer();h(c,this.clickEventType,e.hitch(this,this._onItemClick,c)),d.appendChild(c)}for(;I()&&l.length>1;)this._destroyNode(d.lastChild);var g=l.length;if(n.type){c=d.firstChild;var u=r.getComputedStyle(c),m=o.getMarginBox(c,u);if("stretch"==n.type)var f=o.getMarginExtents(c,u);var p=Math.max(1,Math.floor(d.clientHeight/m.h)),_=d.clientHeight/p;p=Math.max(Math.floor(i.clientHeight/_),p);var y=Math.max(1,g/p);n.heightLimit&&p>n.heightLimit&&(p=n.heightLimit),n.widthLimit&&y>n.widthLimit&&(y=n.widthLimit),g=p*y,_=m.h;var C=Math.max(i.clientWidth-y*m.w,0),v=Math.max(i.clientHeight-p*m.h,0)}var P=this._pageSize=Math.min(g,t.length),N=this._pageCount=Math.ceil(this.items.length/P);if(n.type&&n.height){if("stretch"==n.type){var w=Math.floor(v/p);v-=w*p,this._itemMargins.marginTop=(Math.floor(w/2)+f.t).toString()+"px",this._itemMargins.marginBottom=(Math.ceil(w/2)+f.b).toString()+"px",_+=w}if(1===N&&n.allowVerticallyCenter){var M=Math.floor((P-1)/y)+1;M<p&&(v+=_*(p-M))}r.set(i,{paddingTop:Math.floor(v/2).toString()+"px",paddingBottom:"0"})}this.currentPage=this._coerceCurrentPage(this.currentPage);for(var b=0,A=P*this.currentPage;b<P&&A<t.length;){c=l[b++];var x=t[A++];this._onNodePreDestroy(c),this.updateItemContainer(c,x),this.onNodePlaced(c,x)}for(;b<l.length;)this._destroyNode(d.lastChild);for(n.type&&n.width&&("stretch"==n.type?(C-=(w=Math.floor(C/y))*y,this._itemMargins.marginLeft=(Math.floor(w/2)+f.l).toString()+"px",this._itemMargins.marginRight=(Math.ceil(w/2)+f.r-1).toString()+"px"):w=0,1===N&&P<y&&!n.preventSingleRowCenter&&(C=Math.max(i.clientWidth-(m.w+w)*P,0)),C=Math.floor(C/2).toString()+"px",r.set(i,{paddingLeft:C,paddingRight:C})),b=this._itemMargins?0:l.length;b<l.length;)r.set(l[b++],this._itemMargins);if(this.bulletsNode&&(this.bulletsNode.innerHTML="",N>1))for(var S=0;S<N;S++){var k=s.create("span",{class:"Pagination_Bullet",innerHTML:"&nbsp;"},this.bulletsNode);h(k,this.clickEventType,e.hitch(this,(function(t){this._started=!0,this.set("currentPage",t),this.onPageChangedManually()}),S))}this._updateNavigationControls()}}else this.set("items",[]);function I(){return i.scrollHeight-2>i.clientHeight}},_parseAutoCenterOption:function(t){if(!t)return{};var e={type:"center"};"string"!=typeof t&&(t="");for(var n=!0;n;){switch(t.charAt(0)){case"$":e.preventSingleRowCenter=!0;break;case"@":e.allowVerticallyCenter=!0;break;default:n=!1}n&&(t=t.substr(1))}switch(t){case"width":return e.width=!0,e;case"height":return e.height=!0,e;default:if(0!=t.indexOf("stretch"))return e.width=e.height=!0,e}e.type="stretch";var a=(t=t.substr(7)).indexOf(":"),o=a<0?t:t.substr(0,a);switch(t=a<0?"":t.substr(a+1),o){case"-width":e.width=!0;break;case"-height":e.height=!0;break;default:e.width=e.height=!0}return t?(t=t.split(","),a=0,i.forEach(["width","height"],(function(i){if(e[i]){var n=Number(t[a++]);!isNaN(n)&&n>0&&(e[i+"Limit"]=n)}})),e):e},_onItemClick:function(t){this.onSelect(t)},_coerceCurrentPage:function(t){return t>=this._pageCount&&(t=this._pageCount-1),t<0&&(t=0),t},_updateNavigationControls:function(){var t=this.currentPage,e=this._pageCount<=1,i=e&&!this.alwaysShowArrows?"none":"",n=["Pagination_TriangleDisabled","Pagination_TriangleEnabled"];if(this.backNode){var o=e||0==t&&!this.cyclicPagination?0:1;a.replace(this.backNode,n[o],n[1-o]),this.backNode.style.display=i}if(this.forwardNode&&(o=e||t==this._pageCount-1&&!this.cyclicPagination?0:1,a.replace(this.forwardNode,n[o],n[1-o]),this.forwardNode.style.display=i),this.bulletsNode)for(var s=this.bulletsNode.children,r=0;r<s.length;r++)r==t?a.add(s[r],"Pagination_BulletCurrent"):a.remove(s[r],"Pagination_BulletCurrent")},_setItemsAttr:function(t){this.items=t,this._emptyNode(this.itemsNode),this.bulletsNode&&(this.bulletsNode.innerHTML=""),this.currentPage=0,this._pageCount=0,this._updateNavigationControls()},selectPageByItemIndex:function(t,e){t<0||!this.items||t>=this.items.length||this._pageCount<=1||this.set("currentPage",Math.floor(t/this._pageSize),e)},selectItem:function(t){var e=i.indexOf(this.items,t);if(-1!=e&&!(e<0||!this.items||e>=this.items.length||this._pageCount<=1)){var n=this.items.length%this._pageSize,a=this.itemsNode.firstChild.children[n];a&&this.onSelect(a)}},navigateToItem:function(t){var e=i.indexOf(this.items,t);this.selectPageByItemIndex(e,!0)},_setCurrentPageAttr:function(t,i){var n;if(this._animation.finish(),"next"==t?(n="forward",t=this.currentPage+1,this.cyclicPagination&&t==this._pageCount&&(t=0)):"prev"==t?(n="backward",t=this.currentPage-1,this.cyclicPagination&&-1==t&&(t=this._pageCount-1)):n=!0===this.scrollAnimation?"fade1":this.scrollAnimation,!0===i&&(n=""),t=this._coerceCurrentPage(t),this.currentPage!=t){var o=this.items||[],d=this.itemsNode,l=0,c=this._pageSize*t,g=this.itemsNode.firstChild,u=s.create("div");a.add(u,"PaginationItemsNodeChildDiv");for(var m=[];l++<this._pageSize&&c<o.length;){var f=this.createItemContainer();h(f,this.clickEventType,e.hitch(this,this._onItemClick,f)),this._itemMargins&&r.set(f,this._itemMargins),u.appendChild(f);var p=o[c++];this._onNodePreDestroy(f),this.updateItemContainer(f,p),m.push({node:f,item:p})}switch(n){case"forward":this._slideAnimation(d,g,u,!0,m);break;case"backward":this._slideAnimation(d,g,u,!1,m);break;default:if(n&&"function"==typeof this[n=n?"_"+n+"Animation":null]){this[n](d,g,u,t>this.currentPage,m);break}this._emptyNode(d),d.appendChild(u),this._notifyNodesPlaced(m)}this.currentPage=t,this._updateNavigationControls(),this.onPageChanged()}},_notifyNodesPlaced:function(t){i.forEach(t,(function(t){this.onNodePlaced(t.node,t.item)}),this)},_slideAnimation:function(t,e,i,n,a){n?t.appendChild(i):t.insertBefore(i,t.firstChild),this._notifyNodesPlaced(a),this.isLeftToRight()||(n=!n),t.parentNode.style.overflow="hidden",this._animation.start([{node:t,classes:["Pagination_SlideAnim",n?"Anim_SlideLeft":"Anim_SlideRight"]}],e).then((function(){t.parentNode.style.overflow=""}))},_fade1Animation:function(t,e,i,n,a){t.appendChild(i),this._notifyNodesPlaced(a),this._animation.start([{node:e,classes:["Pagination_FadeAnim","Anim_FadeOut"]},{node:i,classes:["Pagination_FadeAnim","Anim_FadeIn"]}],e)},_fade2Animation:function(t,e,i,n,a){var o=this,s=this._animation;s.start([{node:e,classes:["Pagination_FadeAnim","Anim_FadeOut"]}],e).then((function(){t.appendChild(i),o._notifyNodesPlaced(a),s.start([{node:i,classes:["Pagination_FadeAnim","Anim_FadeIn"]}],e)}))},_backward:function(){this.set("currentPage","prev")},_forward:function(){this.set("currentPage","next")},_onNodePreDestroy:function(t){if(this.detachChildrenUponHiding&&t&&t.children)for(;t.children.length;)t.removeChild(t.children[0])},_destroyNode:function(t){t&&t.parentNode&&t.parentNode.removeChild(t)},_emptyNode:function(t){t&&(this._onNodePreDestroy(t),t.innerHTML="")}})}));
