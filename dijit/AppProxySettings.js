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

define(["require","dojo/_base/array","dojo/_base/declare","dojo/_base/lang","../kernel","dojo/uacss","dijit/_WidgetBase","../arcgis/AppProxyManager","../arcgis/utils","dojo/i18n!../nls/jsapi","dojo/Deferred","dojo/on","dojo/promise/all","dojo/query","dojo/string","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/store/Memory","dijit/form/CheckBox","dijit/form/Select","dijit/form/NumberSpinner","dgrid/OnDemandGrid","dgrid/editor","dojo/domReady!"],(function(e,i,t,r,s,o,n,a,h,c,d,u,l,p,m,g,_,f,x,y,v,w,b,P){var j=c.widgets.appProxySettings;var S=t([v],{destroy:function(){this._destroyed||this._beingDestroyed?this.closeDropDown():this.inherited(arguments)}}),I=t([n],{declaredClass:"esri.dijit.AppProxySettings",_subscriberDomains:[/demographics\w*\.arcgis\.com/i,/geoenrich\w*\.arcgis\.com/i,/route\w*\.arcgis\.com/i,/logistics\w*\.arcgis\.com/i,/analysis\w*\.arcgis\.com/i,/elevation\w*\.arcgis\.com/i,/sentinel\w*\.arcgis\.com/i,/oceans\w*\.arcgis\.com/i,/tiledbasemaps\w*\.arcgis\.com/i],_premiumDomains:[/traffic\w*\.arcgis\.com/i,/elevation\w*\.arcgis\.com/i,/geoenrich\w*\.arcgis\.com/i,/hydro\w*\.arcgis\.com/i,/naip\w*\.arcgis\.com/i,/livefeeds\w*\.arcgis\.com/i,/demographics\w*\.arcgis\.com/i,/landscape\w*\.arcgis\.com/i,/historical\w*\.arcgis\.com/i,/earthobs\w*\.arcgis\.com/i],defaults:{webmaps:[],proxyManagerOptions:{appid:""},proxies:[]},constructor:function(e){this._editing=!1,this.css={container:"esriAppProxySettings"};var i=r.mixin({},this.defaults,e);this.set(i),this.appProxyManager=new a(this.proxyManagerOptions),this.appProxyManager.loaded?this._init():u.once(this.appProxyManager,"load",r.hitch(this,(function(){this._init()})))},startup:function(){this.inherited(arguments),this.loaded?this._createTable():u.once(this,"load",r.hitch(this,(function(){this._createTable()})))},resize:function(){this._grid&&this._grid.resize()},isSubscriber:function(e){return i.some(this._subscriberDomains,(function(i){return e.search(i)>-1}))},isPremium:function(e){return i.some(this._premiumDomains,(function(i){return e.search(i)>-1}))},_queryForSecureServices:function(e){return h.getItem(e).then(r.hitch(this,this._parseMap)).then(r.hitch(this,(function(e){var t=this._mapsProxies;return i.forEach(e,r.hitch(this,(function(e){t.push(e)}))),e})))},_loaded:function(){this.set("loaded",!0),this.emit("load")},_itemInApp:function(e,t){return i.some(this._mapsProxies,(function(i){if(i[e]===t.url)return i.title=t.title,!0}))},_parseUrl:function(e){var i=document.createElement("a");return i.href=e,i},_checkItem:function(e){var i=new d,t=this._parseUrl(e.url);return this.isPremium(t.host)||this.isSubscriber(t.host)?i.resolve({sourceUrl:e.url,id:e.id,title:e.title,proxyId:null,proxied:!1}):i.resolve(),i.promise},_parseMap:function(e){if(e&&e.itemData){var t=e.itemData.operationalLayers,s=[];return i.forEach(t,r.hitch(this,(function(e){this._itemInApp("sourceUrl",e)||s.push(this._checkItem(e))}))),l(s).then((function(e){var t=[];return i.forEach(e,(function(e){e&&t.push(e)})),t}))}var o=new d;return o.resolve(),o.promise},_getWebmapsProxies:function(){this._mapsProxies=this.proxies;for(var e=[],i=0,t=this.webmaps.length;i<t;i++)e.push(this._queryForSecureServices(this.webmaps[i]));return l(e)},_webmapsChanged:function(){var e=new d;return this.webmaps&&this.webmaps.length?this._getWebmapsProxies().then(r.hitch(this,(function(){this.set("proxies",this._mapsProxies),e.resolve()}))):e.resolve(),e.promise},_init:function(){var e=this.appProxyManager.proxies;i.forEach(e,r.hitch(this,(function(e,i){if(!e.hasOwnProperty("title")){var t=this._parseUrl(e.sourceUrl);t&&t.host&&(e.title=m.substitute(j.untitled,{url:t.host}))}e.hasOwnProperty("proxied")||(e.proxied=!0,e.id="AppProxy"+i)}))),this.proxies=e,this.webmaps&&this.webmaps.length?this._webmapsChanged().then(r.hitch(this,(function(){this._loaded()}))):this._loaded()},_createTable:function(){this._memoryStore=new x({data:this.proxies});var e=f.create("div",{className:this.css.container},this.domNode),i=t([b]);this._grid=new i({store:this._memoryStore,columns:{proxied:P({label:"",field:"proxied",canEdit:r.hitch(this,this._canToggleProxied),editor:y,get:r.hitch(this,this._getProxied),formatter:r.hitch(this,this._getFieldValue),editorArgs:{value:!0}}),title:{label:j.premiumContent,get:this.title},requestLimit:P({label:j.requestLimit,field:"requestLimit",get:this._getHitsPerInterval,formatter:r.hitch(this,this._getFieldValue),canEdit:r.hitch(this,this._canUpdateField),editor:w,editorArgs:{constraints:{min:0},style:"width:75%;"}}),interval:P({label:j.interval,field:"interval",get:this._getInterval,formatter:r.hitch(this,this._getFieldValue),canEdit:r.hitch(this,this._canUpdateField),editor:S,editorArgs:{style:"width:75%;",options:[{value:"none",label:j.intervalNone},{value:"second",label:j.intervalSecond},{value:"minute",label:j.intervalMinute},{value:"hour",label:j.intervalHour},{value:"day",label:j.intervalDay}]}})}},e),this._grid.startup(),this.own(u(this._grid,"dgrid-datachange",r.hitch(this,(function(e){var i=e.cell,t=i&&i.column&&i.column.field,s=e.value,o=i&&i.row&&i.row.data;t&&(o[t]=s);var n,a,h={proxyId:o.proxyId,proxyUrl:o.proxyUrl,sourceUrl:o.sourceUrl,proxied:o.proxied,hitsPerInterval:this._getHitsPerInterval(o),intervalSeconds:(n=o.interval,"second"===n?1:"minute"===n?60:"hour"===n?3600:"day"===n?86400:0)};function c(){this._editing=!1,this._grid.refresh()}a=h.proxied?h.proxyId?this.appProxyManager.updateProxy(h).then(r.hitch(this,(function(e){e&&(this._updateProxy(o,e),this.emit("update-proxy",o))}))):this.appProxyManager.createProxies([h]).then(r.hitch(this,(function(e){e&&(this._updateProxy(o,e),this.emit("create-proxy",o))}))):this.appProxyManager.deleteProxies([h]).then(r.hitch(this,(function(e){e&&(this._updateProxy(o,e),this.emit("delete-proxy",o))}))),this._editing=!0,this._grid.refresh(),a.then(r.hitch(this,c)).otherwise(r.hitch(this,c))}))))},_getFieldValue:function(e){return this._editing?'<span class="esriAppProxyLoading"></span>':e},_canUpdateField:function(e){return!this._editing&&this._getProxied(e)},_canToggleProxied:function(){return!this._editing},_updateProxy:function(e,t){this._memoryStore&&i.some(t,r.hitch(this,(function(i){if(i.sourceUrl===e.sourceUrl){var t=r.mixin(e,{proxied:e.proxied,proxyId:e.proxied?i.proxyId:void 0});return e=t,this._memoryStore.put(t,{overwrite:!0}),!0}})))},_getProxied:function(e){return e&&!!e.proxied},_getInterval:function(e){var i,t=e.interval||(1===(i=e.intervalSeconds)?"second":60===i?"minute":3600===i?"hour":86400===i?"day":"none");return e&&t&&e.proxied?t:"none"},_getHitsPerInterval:function(e){var i="number"==typeof e.requestLimit?e.requestLimit:e.hitsPerInterval;return e&&i&&e.proxied?i:0},_setWebmapsAttr:function(e){var i=e.slice();this._set("webmaps",i),this._created&&this._memoryStore&&this._webmapsChanged()},_setProxiesAttr:function(e){var i=e.slice();this._set("proxies",i),this._created&&this._memoryStore&&(this._memoryStore.setData(this.proxies),this._grid.set("store",this._memoryStore))}});return o("extend-esri")&&r.setObject("dijit.AppProxySettings",I,s),I}));
