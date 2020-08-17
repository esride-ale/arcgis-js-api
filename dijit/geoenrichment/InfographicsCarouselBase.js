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

define(["esri/declare","dojo/_base/fx","dojo/_base/lang","dojo/aspect","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/on","dojo/fx","dojo/sniff","dojox/gesture/swipe","dojox/mvc/Templated","../_EventedWidget","./infographicUtils/theme","dojo/text!./templates/InfographicsCarousel.html","./Infographic","dijit/form/Select"],(function(t,e,i,s,n,o,r,h,a,d,l,c,_,u,f,p){var g=t(c.Swipe,{_process:function(t,e,i){i._locking=i._locking||{},i._locking[this.defaultEvent]||this.isLocked(i.currentTarget)||(i._locking[this.defaultEvent]=!0,this[e](t.data,i))}}),m=t(null,{_swipe:null,_node:null,_rtl:null,_ltr:null,_distance:50,constructor:function(t,e,s,n){this._node=t,this._rtl=e,this._ltr=s,n&&(this._distance=n),this._swipe=new g,a(this._node,this._swipe,(function(){})),a(this._node,this._swipe.end,i.hitch(this,"_end"))},_end:function(t){var e=t.dx;Math.abs(e)<this._distance||(e<0&&this._rtl?this._rtl():this._ltr&&this._ltr())}});return t("esri.dijit.geoenrichment.InfographicsCarouselBase",[_,u],{templateString:p,studyArea:null,outSR:null,selectedIndex:0,options:null,expanded:!0,returnGeometry:!1,animDuration:200,infographicsFactory:null,_items:null,_infographic:null,_select:null,_pendingAnimation:null,_pendingReload:!0,_browseDisabled:!1,_eventMap:{resize:["size"],"data-ready":["provider"],"data-error":["error"]},postCreate:function(){this.inherited(arguments),setTimeout(i.hitch(this,this._onResize),0),l("touch")&&new m(this._container,i.hitch(this,"_slideForward"),i.hitch(this,"_slideBack")),l("esri-touch")&&a(this.domNode,"touchmove",(function(t){t.stopPropagation()}))},startup:function(){if(!this._started){this.inherited(arguments),this._infographic.autoTitle=!1,this._infographic.setGeoenrichment(this.infographicsFactory.createGeoenrichment()),this.returnGeometry&&this.set("returnGeometry",this.returnGeometry),this.outSR&&this.set("outSR",this.outSR),this.studyArea&&this.set("studyArea",this.studyArea);var t=this.options||this.infographicsFactory.getOptions();this.set("options",t)}},_setOptionsAttr:function(t){this._set("options",t),this._getReports(),f.set(this.domNode,this.options.theme)},_setStudyAreaAttr:function(t){this._set("studyArea",t),this._started&&(this._infographic.set("studyArea",t),this._getReports())},_setSubtitleAttr:function(t){this._infographic.set("subtitle",t)},_setReturnGeometryAttr:function(t){this._set("returnGeometry",t),this._infographic.set("returnGeometry",t)},_setOutSRAttr:function(t){this._set("outSR",t),this._infographic.set("outSR",t)},_getCountryIDAttr:function(){return this._infographic.get("countryID")},_setCountryIDAttr:function(t){this._infographic.set("countryID",t)},_setExpandedAttr:function(t){this._set("expanded",t),t?n.remove(this.domNode,"Collapsed"):n.add(this.domNode,"Collapsed"),this._infographic.set("expanded",t),this._pendingReload=!0},_setSelectedIndexAttr:function(t){this.selectedIndex!=t&&(this._set("selectedIndex",t),this._updateSelection())},_getReports:function(){if(this.options&&this._started){var t=this._infographic.get("countryID");t&&(this._pendingReload=!0,this._showProgress(),this.options.getItems(t).then(i.hitch(this,this._fillReports),i.hitch(this,this._onDataError)))}},_fillReports:function(t){this._items=[],this._select.removeOption(this._select.getOptions());for(var e=0;e<t.length;e++)if(t[e].isVisible){var i=t[e];this._select.addOption({value:this._items.length.toString(),label:i.title}),this._items.push(i)}this._singleSelect.innerHTML=this._items.length?this._items[0].title:"",this._browseDisabled=this._items.length<=1,this._select.domNode.style.display=this._browseDisabled?"none":"",this._singleSelect.style.display=this._browseDisabled?"":"none",n[this._browseDisabled?"add":"remove"](this._browseBackDiv,"Browser_Disabled"),n[this._browseDisabled?"add":"remove"](this._browseForwardDiv,"Browser_Disabled"),this._infographic.set("cacheLimit",this._items.length),this._titlePane.style.visibility=this._items.length?"":"hidden",this._updateSelection(),this._infographic.set("studyAreaOptions",this.options.studyAreaOptions)},_onDataReady:function(t){var i=!1,n=t.getData();if(n.features.length>0)for(var h=n.features[0],a=0;a<n.fields.length;a++)if(n.fields[a].fullName&&h.attributes[n.fields[a].name]){i=!0;break}return i&&(!function(t,i,n){if(i&&n){var h,a=t.cloneNode(!0);if(t.parentNode.insertBefore(a,t),!r.isBodyLtr())switch(i){case"sf":i="sb";break;case"sb":i="sf"}switch(i){case"f":h=d.combine([l(a,"opacity",1,0),l(t,"opacity",0,1)]);break;case"sf":h=d.combine([l(a,"left",0,-100,"%"),l(t,"left",100,0,"%")]);break;case"sb":h=d.combine([l(a,"left",0,100,"%"),l(t,"left",-100,0,"%")])}s.after(h,"onEnd",(function(){o.destroy(a)})),h.play()}function l(t,i,s,o,r){var h={};return h[i]={start:s,end:o},r&&(h[i].units=r),e.animateProperty({node:t,properties:h,duration:n})}}(this._infographic.domNode,this._pendingAnimation,this.animDuration),this._pendingAnimation=null,this.onDataReady(t)),i},onDataReady:function(t){},_onDataLoad:function(){this._hideProgress(),this.onDataLoad()},onDataLoad:function(){},_onDataError:function(t){this._hideProgress(),this.onDataError(t)},onDataError:function(t){},_updateSelection:function(){if(this._items){this._pendingAnimation||(this._pendingAnimation="f"),this._pendingReload=!0;var t=this._items[this.selectedIndex];this._select.set("value",this.selectedIndex),this._infographic.set("type",t.type),this._infographic.set("variables",t.variables)}},_showProgress:function(){this._pendingReload?(h.set(this._reloadProgress,"display",""),this._pendingReload=!1):h.set(this._updateProgress,"display","")},_hideProgress:function(){h.set(this._reloadProgress,"display","none"),h.set(this._updateProgress,"display","none")},_slideBack:function(){if(!this._browseDisabled){this._pendingAnimation="sb",this._infographic.set("effect","slideBack");var t=this.get("selectedIndex")-1;t<0&&(t=this._items.length-1),this.set("selectedIndex",t)}},_slideForward:function(){if(!this._browseDisabled){this._pendingAnimation="sf";var t=this.get("selectedIndex")+1;t>=this._items.length&&(t=0),this.set("selectedIndex",t)}},_onSelectChange:function(){this.set("selectedIndex",+this._select.get("value"))},_onResize:function(){this.onResize([this.domNode.scrollWidth,this.domNode.scrollHeight])},onResize:function(t){}})}));
