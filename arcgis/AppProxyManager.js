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

define(["dojo/_base/declare","dojo/_base/lang","../kernel","dojo/uacss","dojo/Deferred","dojo/promise/all","dojo/json","dojo/Evented","dojo/Stateful","../request","./utils"],(function(e,r,t,s,i,a,o,n,h,p,c){var l=e([n,h],{constructor:function(e){this.defaults={appid:"",referrers:[],proxies:[]};var t=r.mixin({},this.defaults,e);this.set(t),this._init()},updateProxy:function(e){var t=new i;if(!e||!e.proxyId)return t.reject("A proxyId is required to update a proxy"),t.promise;var s={sourceUrl:e.sourceUrl};e.intervalSeconds&&!isNaN(e.intervalSeconds)&&(s.intervalSeconds=e.intervalSeconds),e.hitsPerInterval&&!isNaN(e.hitsPerInterval)&&(s.hitsPerInterval=e.hitsPerInterval);var a=this._sharingBaseUrl+"content/users/"+this._owner+"/";return this._folderId&&(a+=this._folderId+"/"),a+="items/"+this.appid+"/proxies/"+e.proxyId+"/update",p({url:a,content:{proxy:o.stringify(s),f:"json"},callbackParamName:"callback"},{usePost:!0}).then(r.hitch(this,(function(e){var r=e&&e.appProxies||[];this.set("proxies",r),t.resolve(r)})),t.reject),t.promise},createProxies:function(e){var t=new i;return this._registerApp(this._appItem).then(r.hitch(this,(function(){for(var s={referrers:this.referrers},i=[],a=0;a<e.length;a++){var n=e[a],h={sourceUrl:n.sourceUrl};n.intervalSeconds&&!isNaN(n.intervalSeconds)&&(h.intervalSeconds=n.intervalSeconds),n.hitsPerInterval&&!isNaN(n.hitsPerInterval)&&(h.hitsPerInterval=n.hitsPerInterval),i.push(h)}var c=this._sharingBaseUrl+"content/users/"+this._owner+"/";this._folderId&&(c+=this._folderId+"/"),c+="items/"+this.appid+"/createProxies",p({url:c,content:{proxies:o.stringify(i),serviceProxyParams:o.stringify(s),f:"json"},callbackParamName:"callback"},{usePost:!0}).then(r.hitch(this,(function(e){var r=e&&e.appProxies||[];this.set("proxies",r),t.resolve(r)})),t.reject)})),t.reject),t.promise},deleteProxies:function(e){var t=new i,s={f:"json"},a=[];if(e&&e.length)for(var o=0;o<e.length;o++){var n=e[o];a.push(n.proxyId)}a&&a.length&&(s.proxies=a.toString());var h=this._sharingBaseUrl+"content/users/"+this._owner+"/";return this._folderId&&(h+=this._folderId+"/"),h+="items/"+this.appid+"/deleteProxies",p({url:h,content:s,callbackParamName:"callback"},{usePost:!0}).then(r.hitch(this,(function(e){var r=this.proxies.slice(),s=e&&e.results||[];if(r&&r.length&&s&&s.length)for(var i=0;i<r.length;i++)for(var a=r[i],o=a.proxyId,n=0;n<s.length;n++){var h=s[n].proxyId;h&&o&&h===o&&(a.proxied=!1)}this.set("proxies",r),t.resolve(r)})),t.reject),t.promise},_parseUrl:function(e){var r=document.createElement("a");return r.href=e,r},_init:function(){this.appid?c.getItem(this.appid).then(r.hitch(this,(function(e){this._appItem=e,this._folderId=e.item.ownerFolder;var r=this._parseUrl(e.item.url);this._sharingBaseUrl="https://"+r.hostname+"/sharing/rest/";var t=r.pathname.substring(0,r.pathname.lastIndexOf("/"));t="/"===t.charAt(0)?t:"/"+t;var s=r.hostname+t;this.referrers.push("http://"+s,"https://"+s,"http://www.arcgis.com"+t,"https://www.arcgis.com"+t),-1!==r.hostname.indexOf("mapsdevext.arcgis.com")&&this.referrers.push("http://devext.arcgis.com"+t,"https://devext.arcgis.com"+t),-1!==r.hostname.indexOf("mapsqa.arcgis.com")&&this.referrers.push("http://qaext.arcgis.com"+t,"https://qaext.arcgis.com"+t),this._owner=e.item.owner,-1!==e.item.typeKeywords.indexOf("App Proxy")&&e.item.appProxies&&this.set("proxies",e.item.appProxies),this.emit("load",{}),this.set("loaded",!0)}))):console.error("AppProxyManager: appid required.")},_registerApp:function(e){var t=new i,s=e.item.id,a=this._sharingBaseUrl+"oauth2/",n=this.referrers;this._registered&&this._registered===this.appid?t.resolve(e):-1!==e.item.typeKeywords.indexOf("Registered App")?t.resolve(e):p({url:a+"/registerApp",content:{itemId:s,appType:"browser",redirect_uris:o.stringify(n),f:"json"},callbackParamName:"callback"},{usePost:!0}).then(r.hitch(this,(function(e){this._registered=this.appid,t.resolve(e)})),t.reject);return t.promise}});return s("extend-esri")&&r.setObject("arcgis.AppProxyManager",l,t),l}));
