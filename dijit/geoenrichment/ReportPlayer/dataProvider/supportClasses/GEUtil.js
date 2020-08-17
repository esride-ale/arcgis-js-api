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

define(["dojo/_base/declare","dojo/_base/lang","esri/dijit/geoenrichment/Deferred","esri/dijit/geoenrichment/when","esri/dijit/geoenrichment/promise/all","dojox/uuid/generateRandomUuid","esri/kernel","esri/request","esri/urlUtils","esri/dijit/geoenrichment/utils/requests/FileContent","esri/dijit/geoenrichment/utils/requests/UniversalClient","esri/dijit/geoenrichment/utils/UrlUtil","./stdGeographies/StdGeographiesModel"],(function(t,e,n,r,i,s,a,o,u,l,c,h,f){function d(t){if(y)return y;var e=t&&a.id.findCredential(t)||a.id.credentials[0];return e&&e.token}function p(t,n){var r=u.urlToObject(t);for(var i in n=e.mixin({f:"json",token:d(t),langCode:dojo.locale},r.query||{},n)){var s=n[i];s instanceof l||s&&"object"==typeof s&&(n[i]=JSON.stringify("function"==typeof s.toJson?s.toJson():s))}return{url:r.path,taskParams:n}}var m,y,_,g=t(null,{url:null,_geInfo:null,_capabilities:null,_supportedOperations:null,constructor:function(t){this._capabilities={},this._supportedOperations={},this.url=t},_initDfd:null,initialized:!1,initialize:function(){var t=this;return this._initDfd?this._initDfd.promise:(this._initDfd=new n,c.requestPublicFirst(p(this.url).url+"/Geoenrichment",{content:{f:"json"},handleAs:"json"},{retryOnAnyError:!0}).then((function(e){t.initWithJson(e)})),this._initDfd.promise)},initWithJson:function(t){this._geInfo=t,this._capabilities={},this._supportedOperations={},t.capabilities&&t.capabilities.forEach((function(t){this._capabilities[t.toLowerCase()]=!0}),this),t.supportedOperations&&t.supportedOperations.forEach((function(t){this._supportedOperations[t.toLowerCase()]=!0}),this),this._initDfd=this._initDfd||new n,this._initDfd.resolve(),this.initialized=!0},hasCapability:function(t){return!!this._capabilities[t.toLowerCase()]},addCapability:function(t){this._capabilities[t.toLowerCase()]=!0},supportsOperation:function(t){return!!this._supportedOperations[t.toLowerCase()]},enrich:function(t){var e=p(this.url,t);return e.taskParams.AddDerivativeVariables="all",o({url:e.url+"/Geoenrichment/Enrich",content:e.taskParams,handleAs:"json"}).then((function(t){return t.results[0].value.FeatureSet||[]}))},stdGeographyQuery:function(t){var e=p(this.url,t);return o({url:e.url+"/StandardGeographyQuery/execute",content:e.taskParams,handleAs:"json"}).then((function(t){return t.results[0].value.features||[]}))},getDataCollections:function(t,e,n){var r=p(this.url,n);return o({url:r.url+"/Geoenrichment/DataCollections/"+t+(e?"/"+e:""),content:r.taskParams,handleAs:"json"}).then((function(t){return t.DataCollections}))},_contriesCache:{},getCountries:function(){var t=p(this.url);return o({url:t.url+"/Geoenrichment/Countries",content:t.taskParams,handleAs:"json"}).then((function(t){return t.countries}))},getCountryInfo:function(t){var e=this;if(!this._contriesCache[t]){var n=p(this.url);this._contriesCache[t]=o({url:n.url+"/Geoenrichment/Countries/"+t,content:n.taskParams,handleAs:"json"}).then((function(n){var s=n.countries[0],a={};return i(s.hierarchies.map((function(n){return r(e._getStdGeographyModel(t,n.ID),(function(t){a[n.ID]=t}))}))).then((function(){return{country:s,geographiesModels:a}}))}))}return this._contriesCache[t]},_stdModelCache:null,_getStdGeographyModel:function(t,e){this._stdModelCache=this._stdModelCache||{};var n=t+e;if(!this._stdModelCache[n]){var r=p(this.url);this._stdModelCache[n]=o({url:r.url+"/Geoenrichment/StandardGeographyLevels/"+t+"/"+e,content:r.taskParams,handleAs:"json"}).then((function(n){return new f({countryID:t,hierarchyID:e,levels:n.geographyLevels[0].hierarchies[0].levels})}))}return this._stdModelCache[n]},formatReport:function(t){var e=p(this.url,t);return c.request({url:e.url,urlSuffix:"Geoenrichment/FormatReport"},{handleAs:"bin",content:e.taskParams}).then((function(t){return t&&t.data&&"text/plain"===t.data.type?null:t}))},getReports:function(t){var e=p(this.url);return o({url:e.url+"/Geoenrichment/reports/"+t,content:e.taskParams,handleAs:"json"}).then((function(t){return t.reports}))},_tasksHash:{},createReport:function(t){var n=p(this.url,t),r=s();return this._tasksHash[r]={taskName:"createReport",taskParams:e.clone(t)},c.request({url:n.url,urlSuffix:"Geoenrichment/createReport"},{handleAs:"xml"===t.format?"text":"bin",content:n.taskParams}).then((function(t){return{taskID:r,result:t}}))},consumeCredits:function(t){var n=this._tasksHash[t];if(n)return delete(n=e.clone(n)).taskParams.forStorage,this[n.taskName](n.taskParams)},_dataLayersCache:{},getLayerInfos:function(t){return this._dataLayersCache[t]||(this._dataLayersCache[t]=this._getLayerInfos(t)),this._dataLayersCache[t]},_getLayerInfos:function(t){var e=p(this.url);return o({url:e.url+"/Geoenrichment/DataLayers/"+t,content:e.taskParams,handleAs:"json"}).then((function(t){return t&&t.layers||[]})).otherwise((function(t){return console.log(t),[]}))},getLayerInfo:function(t,e){var n=t+"_"+e;return this._dataLayersCache[n]||(this._dataLayersCache[n]=this._getLayerInfo(t,e)),this._dataLayersCache[n]},_getLayerInfo:function(t,e){var n=p(this.url);return o({url:n.url+"/Geoenrichment/DataLayers/"+t+"/"+e,content:n.taskParams,handleAs:"json"}).then((function(t){return t&&t.layer})).otherwise((function(t){return console.log(t),null}))}}),C={},v=new n;function k(t){return _||(_=new g(m)),!t||_.initialized?_:_.initialize()}return C.setGeoenrichmentUrl=function(t,e){(m=t||m)&&h.registerCORS(m),y=e||y,!v.promise.isFulfilled()&&v.resolve()},C.canMakeRequests=function(){return!!m},C.getInitPromise=function(){return v.promise},C.GEClient=g,C.getClient=function(){return k()},C.initialize=function(){return k(!0)},C.initWithJson=function(t,e){C.setGeoenrichmentUrl(t),k().initWithJson(e)},C.enrich=function(t){return k().enrich(t)},C.stdGeographyQuery=function(t){return k().stdGeographyQuery(t)},C.getDataCollections=function(t,e,n){return k().getDataCollections(t,e,n)},C.formatReport=function(t){return k().formatReport(t)},C.createReport=function(t){return k().createReport(t)},C.consumeCredits=function(t){return k().consumeCredits(t)},C.getLayerInfos=function(t){return k().getLayerInfos(t)},C.hasCapability=function(t){return r(k(!0),(function(){return _&&_.hasCapability(t)}))},C.addCapability=function(t){return k().addCapability(t)},C.supportsOperation=function(t){return r(k(!0),(function(){return _&&_.supportsOperation(t)}))},C.getCountryInfo=function(t){return k().getCountryInfo(t)},C}));
