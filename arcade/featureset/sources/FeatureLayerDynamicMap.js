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

var __extends=this&&this.__extends||function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(t,r)};return function(t,r){function a(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(a.prototype=r.prototype,new a)}}(),__assign=this&&this.__assign||function(){return(__assign=Object.assign||function(e){for(var t,r=1,a=arguments.length;r<a;r++)for(var i in t=arguments[r])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)};define(["require","exports","dojox/encoding/digests/_base","dojox/encoding/digests/MD5","../../../graphic","../../../request","../../Attachment","../support/FeatureSet","../support/IdSet","../support/shared","../support/sqlUtils","../support/stats","../../polyfill/promiseUtils","../../../geometry/jsonUtils","../../../layers/FeatureLayer","../../../tasks/query","../../../tasks/QueryTask","../../../tasks/StatisticDefinition"],(function(e,t,r,a,i,n,s,l,o,u,d,c,p,y,f,h,_,g){"use strict";return function(e){function t(t){var r=e.call(this,t)||this;if(r.declaredClass="esri.layers.featureset.sources.FeatureLayerDynamic",r._removeGeometry=!1,r._overrideFields=null,r.formulaCredential=null,r._pageJustIds=!1,r._requestStandardised=!1,t.spatialReference&&(r.spatialReference=t.spatialReference),r._transparent=!0,r._maxProcessing=1e3,r._layer=t.layer,r._wset=null,!1===r._layer.loaded)throw new Error("Can only create FeatureSets from Loaded FeatureLayers. Use FeatureLayer or FeatureCollection classes");return void 0!==t.outFields&&(r._overrideFields=t.outFields),void 0!==t.includeGeometry&&(r._removeGeometry=!1===t.includeGeometry),r}return __extends(t,e),t.prototype._maxQueryRate=function(){return u.defaultMaxRecords},t.prototype.convertQueryToLruCacheKey=function(e){var t=u.stableStringify(e.toJson());return a(t,r.outputTypes.String)},t.prototype.end=function(){return this._layer},t.prototype.load=function(){var e=this;return null===this._loadPromise&&(this._loadPromise=p.create((function(t,r){e._initialiseFeatureSet(),t(e)}))),this._loadPromise},t.prototype.optimisePagingFeatureQueries=function(e){this._pageJustIds=e},t.prototype._initialiseFeatureSet=function(){if(!this._layer.getMap())throw new Error("Can only use featuresets with layers attached to map");null==this.spatialReference&&(this.spatialReference=this._layer.getMap().spatialReference),this.geometryType=this._layer.geometryType,this.fields=this._layer.fields.slice(0);var e=this._layer.getOutFields();if(1===e.length&&"*"===e[0]);else{for(var t=[],r=0,a=this.fields;r<a.length;r++){if("esriFieldTypeOID"===(d=a[r]).type)t.push(d);else for(var i=0,n=e;i<n.length;i++){if(n[i].toLowerCase()===d.name.toLowerCase()){t.push(d);break}}}this.fields=t}if(null!==this._overrideFields)if(1===this._overrideFields.length&&"*"===this._overrideFields[0])this._overrideFields=null;else{t=[];for(var s=[],l=0,o=this.fields;l<o.length;l++){var d;if("esriFieldTypeOID"===(d=o[l]).type)t.push(d),s.push(d.name);else for(var c=0,p=this._overrideFields;c<p.length;c++){if(p[c].toLowerCase()===d.name.toLowerCase()){t.push(d),s.push(d.name);break}}}this.fields=t,this._overrideFields=s}if(this._layer){var y=this._layer.version;!0===this._layer.useStandardizedQueries?(this._databaseType=u.FeatureServiceDatabaseType.StandardisedNoInterval,null!=y&&y>=10.61&&(this._databaseType=u.FeatureServiceDatabaseType.Standardised)):null!=y&&(y>=10.5&&(this._databaseType=u.FeatureServiceDatabaseType.StandardisedNoInterval,this._requestStandardised=!0),y>=10.61&&(this._databaseType=u.FeatureServiceDatabaseType.Standardised))}this.objectIdField=this._layer.objectIdField,this.typeIdField=this._layer.typeIdField,this.types=this._layer.types},t.prototype._isInFeatureSet=function(e){return u.IdState.InFeatureSet},t.prototype._refineSetBlock=function(e,t){return p.resolve(e)},t.prototype._candidateIdTransform=function(e){return e},t.prototype._transformSetWithIdChanges=function(e){},t.prototype._getSet=function(e){var t=this;return null===this._wset?this._ensureLoaded().then((function(){return t._getFilteredSet("",null,null,null,e)})).then((function(e){return t._wset=e,e})):p.resolve(this._wset)},t.prototype.nativeCapabilities=function(){return{title:this._layer.name,source:this,canQueryRelated:!0,capabilities:{query:{maxRecordCount:this._layer.maxRecordCount},queryRelated:{supportsOrderBy:this._layer.advancedQueryCapabilities&&this._layer.advancedQueryCapabilities.supportsAdvancedQueryRelated,supportsPagination:this._layer.advancedQueryCapabilities&&this._layer.advancedQueryCapabilities.supportsQueryRelatedPagination}},databaseType:this._databaseType,requestStandardised:this._requestStandardised}},t.prototype._runDatabaseProbe=function(e){var t=this;return p.create((function(r,a){try{t._ensureLoaded().then((function(){try{var i=new h;i.where=e.replace("OBJECTID",t._layer.objectIdField),t.executeQuery(i,"executeForIds").then((function(e){r(!0)}),(function(e){try{r(!1)}catch(e){a(e)}}))}catch(e){a(e)}}))}catch(e){a(e)}}))},t.prototype.pbfSupportedForQuery=function(e){return this._layer._canFetchPBFForQuery(e)&&this._layer.supportsQuantizationEditMode},t.prototype.executeQuery=function(e,t){var r=new _(this._layerUrl()),a="execute"===t&&this.pbfSupportedForQuery(e);a&&(e.quantizationParameters={mode:"edit"});var i=null;if(this.recentlyUsedQueries){var n=this.convertQueryToLruCacheKey(e);(i=this.recentlyUsedQueries.getFromCache(n))&&i.isRejected()&&(i=null,this.recentlyUsedQueries.removeFromCache(n)),null===i&&(i=!0!==a?r[t](e):r[t](e,null,null,{format:"pbf"}),this.recentlyUsedQueries.addToCache(n,i))}return null===i&&(i=!0!==a?r[t](e):r[t](e,null,null,{format:"pbf"})),i},t.prototype._canUsePagination=function(){return void 0!==this._layer.advancedQueryCapabilities&&null!==this._layer.advancedQueryCapabilities&&!0===this._layer.advancedQueryCapabilities.supportsPagination},t.prototype._cacheableFeatureSetSourceKey=function(){return this._layer.url},t.prototype._getFilteredSet=function(e,t,r,a,i){var n=this;return this.databaseType().then((function(s){if(n.isTable()&&t&&null!==e&&""!==e)return new o([],[],!0,null);if(n._canUsePagination())return n._getFilteredSetUsingPaging(e,t,r,a,i);var l="",u=!1;null!==a&&void 0!==n._layer.advancedQueryCapabilities&&null!==n._layer.advancedQueryCapabilities&&!0===n._layer.advancedQueryCapabilities.supportsOrderBy&&(l=a.constructClause(),u=!0);var c=new h;return n._requestStandardised&&(c.sqlFormat="standard"),c.where=null===r?null===t?"1=1":"":d.toWhereClause(r,s),c.spatialRelationship=n._makeRelationshipEnum(e),c.outSpatialReference=n.spatialReference,c.orderByFields=""!==l?l.split(","):null,c.geometry=null===t?"":t,c.relationParam=n._makeRelationshipParam(e),n.executeQuery(c,"executeForIds").then((function(e){return null===e&&(e=[]),n._checkCancelled(i),new o([],e,u,null)}))}))},t.prototype._expandPagedSet=function(e,t,r,a,i){return this._expandPagedSetFeatureSet(e,t,r,a,i)},t.prototype._getFilteredSetUsingPaging=function(e,t,r,a,i){var n=this;try{var s="",l=!1;return null!==a&&void 0!==this._layer.advancedQueryCapabilities&&null!==this._layer.advancedQueryCapabilities&&!0===this._layer.advancedQueryCapabilities.supportsOrderBy&&(s=a.constructClause(),l=!0),this.databaseType().then((function(a){var u=null===r?null===t?"1=1":"":d.toWhereClause(r,a);n._layer.getDefinitionExpression()&&(u=""!==u?"(("+n._layer.getDefinitionExpression()+") AND ("+u+"))":n._layer.getDefinitionExpression());var c=n._maxQueryRate();void 0!==n._layer.maxRecordCount&&n._layer.maxRecordCount<c&&(c=n._layer.maxRecordCount);var p=null;if(!0===n._pageJustIds)p=new o([],["GETPAGES"],l,{spatialRel:n._makeRelationshipEnum(e),relationParam:n._makeRelationshipParam(e),outFields:n._layer.objectIdField,resultRecordCount:c,resultOffset:0,geometry:null===t?"":t,where:u,orderByFields:s,returnGeometry:"false",returnIdsOnly:"false",internal:{set:[],lastRetrieved:0,fullyResolved:!1}});else{var y=!0;!0===n._removeGeometry&&(y=!1);var f=null!==n._overrideFields?n._overrideFields:n._fieldsIncludingObjectId(n._layer.getOutFields());p=new o([],["GETPAGES"],l,{spatialRel:n._makeRelationshipEnum(e),relationParam:n._makeRelationshipParam(e),outFields:f.join(","),resultRecordCount:c,resultOffset:0,geometry:null===t?"":t,where:u,orderByFields:s,returnGeometry:y,returnIdsOnly:"false",internal:{set:[],lastRetrieved:0,fullyResolved:!1}})}return n._expandPagedSet(p,c,0,1,i).then((function(e){return p}))}))}catch(e){return p.reject(e)}},t.prototype._clonePageDefinition=function(e){return null===e?null:!0!==e.groupbypage?{groupbypage:!1,spatialRel:e.spatialRel,relationParam:e.relationParam,outFields:e.outFields,resultRecordCount:e.resultRecordCount,resultOffset:e.resultOffset,geometry:e.geometry,where:e.where,orderByFields:e.orderByFields,returnGeometry:e.returnGeometry,returnIdsOnly:e.returnIdsOnly,internal:e.internal}:{groupbypage:!0,spatialRel:e.spatialRel,relationParam:e.relationParam,outFields:e.outFields,resultRecordCount:e.resultRecordCount,useOIDpagination:e.useOIDpagination,generatedOid:e.generatedOid,groupByFieldsForStatistics:e.groupByFieldsForStatistics,resultOffset:e.resultOffset,outStatistics:e.outStatistics,geometry:e.geometry,where:e.where,orderByFields:e.orderByFields,returnGeometry:e.returnGeometry,returnIdsOnly:e.returnIdsOnly,internal:e.internal}},t.prototype._getPhysicalPage=function(e,t,r){var a=this;try{var i=e.pagesDefinition.internal.lastRetrieved,n=i,s=new h;return this._requestStandardised&&(s.sqlFormat="standard"),s.spatialRelationship=e.pagesDefinition.spatialRel,s.relationParam=e.pagesDefinition.relationParam,s.outFields=e.pagesDefinition.outFields.split(","),s.num=e.pagesDefinition.resultRecordCount,s.start=e.pagesDefinition.internal.lastRetrieved,s.geometry=e.pagesDefinition.geometry,s.where=e.pagesDefinition.where,s.orderByFields=""!==e.pagesDefinition.orderByFields?e.pagesDefinition.orderByFields.split(","):null,s.returnGeometry=e.pagesDefinition.returnGeometry,s.outSpatialReference=this.spatialReference,this.executeQuery(s,"execute").then((function(t){if(a._checkCancelled(r),e.pagesDefinition.internal.lastRetrieved!==i)return"done";for(var s=0;s<t.features.length;s++)void 0===t.features[s].geometry&&(t.features[s].geometry=null),e.pagesDefinition.internal.set[n+s]=t.features[s].attributes[a._layer.objectIdField];if(!1===a._pageJustIds)for(s=0;s<t.features.length;s++)a._featureCache[t.features[s].attributes[a._layer.objectIdField]]=t.features[s];return t.features.length!==e.pagesDefinition.resultRecordCount&&(e.pagesDefinition.internal.fullyResolved=!0),e.pagesDefinition.internal.lastRetrieved=i+e.pagesDefinition.resultRecordCount,"done"}))}catch(e){return p.reject(e)}},t.prototype._fieldsIncludingObjectId=function(e){if(null===e)return[this.objectIdField];var t=e.slice(0);if(t.indexOf("*")>-1)return t;for(var r=!1,a=0,i=t;a<i.length;a++){if(i[a].toUpperCase()===this.objectIdField.toUpperCase()){r=!0;break}}return!1===r&&t.push(this.objectIdField),t},t.prototype._getFeatures=function(e,t,r,a){var i=this,n=[];try{if(-1!==t&&void 0===this._featureCache[t]&&n.push(t),!0===this._checkIfNeedToExpandKnownPage(e,this._maxProcessingRate()))return this._expandPagedSet(e,this._maxProcessingRate(),0,0,a).then((function(n){return i._getFeatures(e,t,r,a)}));for(var s=0,l=e._lastFetchedIndex;l<e._known.length;l++){if(e._lastFetchedIndex+=1,s++,void 0===this._featureCache[e._known[l]]){var o=!1;if(null!==this._layer._mode&&void 0!==this._layer._mode){var u=this._layer._mode;if(void 0!==u._featureMap[e._known[l]]){var d=u._featureMap[e._known[l]];null!==d&&(o=!0,this._featureCache[e._known[l]]=d)}}if(!1===o&&(e._known[l]!==t&&n.push(e._known[l]),n.length>=this._maxProcessingRate()-1))break}if(s>=r&&0===n.length)break}if(0===n.length)return p.resolve("success");try{var c=new h;return this._requestStandardised&&(c.sqlFormat="standard"),c.objectIds=n,c.outFields=null!==this._overrideFields?this._overrideFields:this._fieldsIncludingObjectId(this._layer.getOutFields()),c.returnGeometry=!0,!0===this._removeGeometry&&(c.returnGeometry=!1),c.outSpatialReference=this.spatialReference,this.executeQuery(c,"execute").then((function(e){if(i._checkCancelled(a),void 0!==e.error)return p.reject(new Error(e.error));for(var t=0;t<e.features.length;t++)void 0===e.features[t].geometry&&(e.features[t].geometry=null),i._featureCache[e.features[t].attributes[i._layer.objectIdField]]=e.features[t];return"success"}))}catch(e){return p.reject(e)}}catch(e){return p.reject(e)}},t.prototype._layerUrl=function(){return this._layer.url},t.prototype._getDistinctPages=function(e,t,r,a,i,n,s,l,o){var u=this;return this._ensureLoaded().then((function(){for(var c=r.parseTree.column,y=0;y<u._layer.fields.length;y++)if(u._layer.fields[y].name.toLowerCase()===c.toLowerCase()){c=u._layer.fields[y].name;break}return u.databaseType().then((function(y){var f=new h;u._requestStandardised&&(f.sqlFormat="standard");var _=null===n?null===i?"1=1":"":d.toWhereClause(n,y);return u._layer.getDefinitionExpression()&&(_=""!==_?"(("+u._layer.getDefinitionExpression()+") AND ("+_+"))":u._layer.getDefinitionExpression()),f.where=_,f.spatialRelationship=u._makeRelationshipEnum(a),f.relationParam=u._makeRelationshipParam(a),f.geometry=null===i?null:i,f.returnDistinctValues=!0,f.returnGeometry=!1,f.outFields=[c],u.executeQuery(f,"execute").then((function(d){if(u._checkCancelled(o),!d.hasOwnProperty("features"))return p.reject(new Error("Unnexected Result querying statistics from layer"));for(var y=!1,f=0;f<u._layer.fields.length;f++)if(u._layer.fields[f].name===c){"esriFieldTypeDate"===u._layer.fields[f].type&&(y=!0);break}for(f=0;f<d.features.length;f++){if(y){var h=d.features[f].attributes[c];null!==h?l.push(new Date(h)):l.push(h)}else l.push(d.features[f].attributes[c]);if(l.length>=s)break}return 0===d.features.length?l:d.features.length===u._layer.maxRecordCount&&l.length<s?u._getDistinctPages(e+d.features.length,t,r,a,i,n,s,l,o).then((function(e){return{calculated:!0,result:e}})):l}))}))}))},t.prototype._distinctStat=function(e,t,r,a,i,n,s){return this._getDistinctPages(0,e,t,r,a,i,n,[],s).then((function(e){return{calculated:!0,result:e}}))},t.prototype.isTable=function(){return!1},t.prototype._countstat=function(e,t,r,a,i){var n=this;return this.databaseType().then((function(e){var i=new h;if(n._requestStandardised&&(i.sqlFormat="standard"),n.isTable()&&r&&null!==t&&""!==t)return{calculated:!0,result:0};var s=null===a?null===r?"1=1":"":d.toWhereClause(a,e);n._layer.getDefinitionExpression()&&(s=""!==s?"(("+n._layer.getDefinitionExpression()+") AND ("+s+"))":n._layer.getDefinitionExpression()),i.where=s,i.where=s,i.spatialRelationship=n._makeRelationshipEnum(t),i.relationParam=n._makeRelationshipParam(t),i.geometry=null===r?null:r,i.returnGeometry=!1;new _(n._layerUrl());return n.executeQuery(i,"executeForCount").then((function(e){return{calculated:!0,result:e}}))}))},t.prototype._stats=function(e,t,r,a,i,n,s){var l=this;return this._ensureLoaded().then((function(){var o=l._layer.advancedQueryCapabilities&&!0===l._layer.advancedQueryCapabilities.supportsSqlExpression,u=l._layer.advancedQueryCapabilities&&!0===l._layer.advancedQueryCapabilities.supportsStatistics,y=l._layer.advancedQueryCapabilities&&!0===l._layer.advancedQueryCapabilities.supportsDistinct;return"count"===e?y?l._countstat(e,r,a,i,s):{calculated:!1}:!1===u||!1===d.isSingleField(t)&&!1===o||!1===t.isStandardized?""!==r||null!==i?{calculated:!1}:l._manualStat(e,t,n,s):"distinct"===e?!1===y?""!==r||null!==i?{calculated:!1}:l._manualStat(e,t,n,s):l._distinctStat(e,t,r,a,i,n,s):l.databaseType().then((function(n){if(l.isTable()&&a&&null!==r&&""!==r)return{calculated:!0,result:null};var s=new h;l._requestStandardised&&(s.sqlFormat="standard");var o=null===i?null===a?"1=1":"":d.toWhereClause(i,n);l._layer.getDefinitionExpression()&&(o=""!==o?"(("+l._layer.getDefinitionExpression()+") AND ("+o+"))":l._layer.getDefinitionExpression()),s.where=o,s.spatialRelationship=l._makeRelationshipEnum(r),s.relationParam=l._makeRelationshipParam(r),s.geometry=null===a?null:a;var u=new g;u.statisticType=c.decodeStatType(e),u.onStatisticField=d.toWhereClause(t,n),u.outStatisticFieldName="ARCADE_STAT_RESULT";var y="ARCADE_STAT_RESULT";return s.returnGeometry=!1,s.outStatistics=[u],l.executeQuery(s,"execute").then((function(e){if(!e.hasOwnProperty("features")||0===e.features.length)return p.reject(new Error("Unnexected Result querying statistics from layer"));for(var t=!1,r=0;r<e.fields.length;r++)if("ARCADE_STAT_RESULT"===e.fields[r].name.toUpperCase()){y=e.fields[r].name,"esriFieldTypeDate"===e.fields[r].type&&(t=!0);break}if(t){var a=e.features[0].attributes[y];return null!==a&&(a=new Date(e.features[0].attributes[y])),{calculated:!0,result:a}}return{calculated:!0,result:e.features[0].attributes[y]}}))}))}))},t.prototype._stat=function(e,t,r,a,i,n,s){return this._stats(e,t,r,a,i,n,s)},t.prototype._canDoAggregates=function(e,t,r,a,i){var n=this;return this._ensureLoaded().then((function(e){var r=!1,a=n._layer.advancedQueryCapabilities&&!0===n._layer.advancedQueryCapabilities.supportsSqlExpression;if(void 0!==n._layer.advancedQueryCapabilities&&null!==n._layer.advancedQueryCapabilities&&!0===n._layer.advancedQueryCapabilities.supportsStatistics&&!0===n._layer.advancedQueryCapabilities.supportsOrderBy&&(r=!0),r)for(var i=0;i<t.length-1;i++)null!==t[i].workingexpr&&(!1===t[i].workingexpr.isStandardized?r=!1:!1===d.isSingleField(t[i].workingexpr)&&!1===a&&(r=!1));return!1!==r}))},t.prototype._makeRelationshipEnum=function(e){return e.indexOf("esriSpatialRelRelation")>=0?"esriSpatialRelRelation":e},t.prototype._makeRelationshipParam=function(e){return e.indexOf("esriSpatialRelRelation")>=0?e.split(":")[1]:""},t.prototype._getAggregatePagesDataSourceDefinition=function(e,t,r,a,i,n,s){var l=this;return this._ensureLoaded().then((function(u){return l.databaseType().then((function(u){var c="",p=!1,y=!1;null!==n&&void 0!==l._layer.advancedQueryCapabilities&&null!==l._layer.advancedQueryCapabilities&&!0===l._layer.advancedQueryCapabilities.supportsOrderBy&&(c=n.constructClause(),y=!0),void 0!==l._layer.advancedQueryCapabilities&&null!==l._layer.advancedQueryCapabilities&&!1===l._layer.advancedQueryCapabilities.supportsPagination&&(y=!1,p=!0,c=l._layer.objectIdField);for(var f=[],h=0;h<t.length;h++){var _=new g;_.onStatisticField=null!==t[h].workingexpr?d.toWhereClause(t[h].workingexpr,u):"",_.outStatisticFieldName=t[h].field,_.statisticType=t[h].toStatisticsName(),f.push(_)}""===c&&(c=e.join(","));var m=l._maxQueryRate();void 0!==l._layer.maxRecordCount&&l._layer.maxRecordCount<m&&(m=l._layer.maxRecordCount);var v=null===i?null===a?"1=1":"":d.toWhereClause(i,u);return l._layer.getDefinitionExpression()&&(v=""!==v?"(("+l._layer.getDefinitionExpression()+") AND ("+v+"))":l._layer.getDefinitionExpression()),new o([],["GETPAGES"],y,{groupbypage:!0,spatialRel:l._makeRelationshipEnum(r),relationParam:l._makeRelationshipParam(r),outFields:["*"],useOIDpagination:p,generatedOid:s,resultRecordCount:m,resultOffset:0,groupByFieldsForStatistics:e,outStatistics:f,geometry:null===a?null:a,where:v,orderByFields:c,returnGeometry:!1,returnIdsOnly:!1,internal:{lastMaxId:-1,set:[],lastRetrieved:0,fullyResolved:!1}})}))}))},t.prototype._getAgregagtePhysicalPage=function(e,t,r){var a=this;try{var n=e.pagesDefinition.where;!0===e.pagesDefinition.useOIDpagination&&(n=""!==n?"("+n+") AND ("+e.pagesDefinition.generatedOid+">"+e.pagesDefinition.internal.lastMaxId.toString()+")":e.pagesDefinition.generatedOid+">"+e.pagesDefinition.internal.lastMaxId.toString());var s=e.pagesDefinition.internal.lastRetrieved,l=s,o=new h;return this._requestStandardised&&(o.sqlFormat="standard"),o.where=n,o.spatialRelationship=e.pagesDefinition.spatialRel,o.relationParam=e.pagesDefinition.relationParam,o.outFields=e.pagesDefinition.outFields,o.outStatistics=e.pagesDefinition.outStatistics,o.geometry=e.pagesDefinition.geometry,o.groupByFieldsForStatistics=e.pagesDefinition.groupByFieldsForStatistics,o.num=e.pagesDefinition.resultRecordCount,o.start=e.pagesDefinition.internal.lastRetrieved,o.returnGeometry=e.pagesDefinition.returnGeometry,o.orderByFields=""!==e.pagesDefinition.orderByFields?e.pagesDefinition.orderByFields.split(","):null,this.isTable()&&o.geometry&&o.spatialRelationship?p.resolve([]):this.executeQuery(o,"execute").then((function(t){if(a._checkCancelled(r),!t.hasOwnProperty("features"))return p.reject(new Error("Unnexected Result querying aggregates from layer"));var n=[];if(e.pagesDefinition.internal.lastRetrieved!==s)return[];for(var o=0;o<t.features.length;o++)void 0===t.features[o].geometry&&(t.features[o].geometry=null),e.pagesDefinition.internal.set[l+o]=t.features[o].attributes[e.pagesDefinition.generatedOid];for(o=0;o<t.features.length;o++)n.push(new i({attributes:t.features[o].attributes,geometry:null}));return!0===e.pagesDefinition.useOIDpagination?0===t.features.length?e.pagesDefinition.internal.fullyResolved=!0:e.pagesDefinition.internal.lastMaxId=t.features[t.features.length-1].attributes[e.pagesDefinition.generatedOid]:t.features.length!==e.pagesDefinition.resultRecordCount&&(e.pagesDefinition.internal.fullyResolved=!0),e.pagesDefinition.internal.lastRetrieved=s+e.pagesDefinition.resultRecordCount,n}))}catch(e){return p.reject(e)}},t.create=function(e,r,a){return new t({layer:new f({url:e,outFields:null===r?["*"]:r}),spatialReference:a})},t.prototype._queryAttachments=function(e){var t=this,r=__assign({},e,{f:"json"});return r.objectIds.length>0&&(r.objectIds=r.objectIds.join(",")),r.size&&(r.size=r.size.join(",")),r.attachmentTypes&&(r.attachmentTypes=r.attachmentTypes.join(",")),p.create((function(e,a){n({url:t._layer._url.path+"/queryAttachments",content:r,callbackParamName:"callback",load:function(t){var r={};if(t&&t.attachmentGroups)for(var a=0,i=t.attachmentGroups;a<i.length;a++){var n=i[a];void 0===r[n.parentObjectId]&&(r[n.parentObjectId]=[]);for(var s=0,l=n.attachmentInfos;s<l.length;s++){var o=l[s];r[n.parentObjectId].push({id:o.id,globalId:o.globalId,name:o.name,contentType:o.contentType,size:o.size})}}e(r)},error:function(e){a(e)}})}))},t.prototype.queryAttachments=function(e,t,r,a){var i=this;if(this._layer.hasAttachments){var n={objectIds:[e]};return(t&&t>0||r&&r>0)&&(n.size=[t&&t>0?t:0,r&&r>0?r:t+1]),a&&a.length>0&&(n.attachmentTypes=a),this._queryAttachments(n).then((function(t){var r=[];if(t&&t[e]){var a=i._layer._url.path;t[e].forEach((function(t){var i=a+"/"+e.toString()+"/attachments/"+t.id.toString();r.push(new s(t.id,t.name,t.contentType,t.size,i))}))}return r}))}return p.resolve([])},t.prototype.serviceUrl=function(){return u.extractServiceUrl(this._layer._url.path)},t.prototype.relationshipMetaData=function(){return this._layer.relationships},t.prototype.queryRelatedFeatures=function(e){var t=this,r={f:"json",relationshipId:e.relationshipId.toString(),definitionExpression:e.definitionExpression,outFields:e.outFields.join(","),returnGeometry:e.returnGeometry.toString()};return void 0!==e.resultOffset&&null!==e.resultOffset&&(r.resultOffset=e.resultOffset.toString()),void 0!==e.resultRecordCount&&null!==e.resultRecordCount&&(r.resultRecordCount=e.resultRecordCount.toString()),e.orderByFields&&(r.orderByFields=e.orderByFields.join(",")),e.objectIds.length>0&&(r.objectIds=e.objectIds.join(",")),e.outSpatialReference&&(r.outSR=JSON.stringify(e.outSpatialReference.toJson())),p.create((function(e,a){n({url:t._layer._url.path+"/queryRelatedRecords",content:r,callbackParamName:"callback",load:function(t){var r={};if(t&&t.relatedRecordGroups)for(var a=t.spatialReference,n=0,s=t.relatedRecordGroups;n<s.length;n++){for(var l=s[n],o=l.objectId,u=[],d=0,c=l.relatedRecords;d<c.length;d++){var p=c[d];p.geometry&&(p.geometry.spatialReference=a);var f=new i({geometry:p.geometry?y.fromJson(p.geometry):null,attributes:p.attributes});u.push(f)}r[o]={features:u,exceededTransferLimit:!0===t.exceededTransferLimit}}e(r)},error:function(e){a(e)}})}))},t.prototype.getFeatureByObjectId=function(e,t){var r=new _(this._layerUrl()),a=new h;return a.outFields=t,a.returnGeometry=!1,a.outSpatialReference=this.spatialReference,a.where=this.objectIdField+"="+e.toString(),r.execute(a).then((function(e){return 1===e.features.length?e.features[0]:null}))},t}(l)}));
