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

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/json","dojo/i18n","dojo/has","dojo/Deferred","dojo/sniff","dojo/promise/all","dojox/html/entities","./lang","./kernel","./request","./promiseList","./ArcadeExpression","./tasks/query","./tasks/QueryTask","./tasks/RelationshipQuery","./tasks/StatisticDefinition","./arcadeProfiles/popupProfile","./layers/support/attributeUtils","dojo/i18n!dojo/cldr/nls/number"],(function(e,t,r,i,a,n,s,o,l,d,h,f,c,m,u,p,y,_,M,g,F,E){var P=e(null,{declaredClass:"esri.PopupInfo",_reNewline:/(\n)/gi,_reExprField:/^\s*expression\//i,_reExprFieldPattern:/\{expression\/([^\}]+)\}/gi,_exprPrefix:"expression/",_relatedFieldPrefix:"relationships/",initialize:function(e,i){if(e){t.mixin(this,i),this.info=e,this.title=this.getTitle,this.content=this.getContent,this._exprCache=this._compileExpressions(this.info.expressionInfos);var a=this._fieldLabels={},n=this._fieldsMap={};this.info.fieldInfos&&r.forEach(this.info.fieldInfos,(function(e){var t=e.fieldName.toLowerCase(),r=this._isExpressionField(t)?this.getExpressionInfo(t):null;a[t]=r?r.title:e.label,n[t]=e}),this),this.titleHasRelatedFields=!(!this.info.title||-1===this.info.title.indexOf("{"+this._relatedFieldPrefix)),this.titleHasAsyncExpressions=this._titleHasAsyncExpressions(),this.contentHasAsyncExpressions=this._contentHasAyncExpressions()}},toJson:function(){return i.fromJson(i.toJson(this.info))},getTitle:function(){},getContent:function(){},getFieldInfo:function(e){var t,i=this.info&&this.info.fieldInfos;return r.some(i,(function(r){return r.fieldName===e&&(t=r),!!t})),t},getExpressionInfo:function(e){var t;if(e=this._getExprField(e))return e=e.toLowerCase(),r.some(this.info.expressionInfos,(function(r){return r.name.toLowerCase()===e&&(t=r),!!t})),t},getExpressionFieldsInTitle:function(){return this._getExprFieldsFromTemplatedString(this.info.title)},getExpressionFieldsInContent:function(){var e=this._collectExprFieldsFromTemplatedString(this.info.description,[]);return!!this.info.description||r.forEach(this.info.fieldInfos,(function(t){t.visible&&this._collectExprField(t.fieldName,e)}),this),r.forEach(this.info.mediaInfos,(function(t){this._collectExprFieldsFromTemplatedString(t.title,e),this._collectExprFieldsFromTemplatedString(t.caption,e);var i=t.value;i&&(this._collectExprFieldsFromTemplatedString(i.linkURL,e),this._collectExprFieldsFromTemplatedString(i.sourceURL,e),r.forEach(i.fields,(function(t){this._collectExprField(t,e)}),this),this._collectExprField(i.normalizeField,e),this._collectExprField(i.tooltipField,e))}),this),e},getRequiredExpressionFields:function(){return this.getExpressionFieldsInTitle().concat(this.getExpressionFieldsInContent())},hasGeometryOperations:function(){return r.some(this._getArcadeExpressions(),(function(e){return e.hasGeometryOperations()}))},hasAsyncExpressions:function(){return r.some(this._getArcadeExpressions(),(function(e){return e.async}))},initializeArcadeEngine:function(){return g.initialize(this._getArcadeExpressions())},getComponents:function(e,i){var a=this.info,n={initArcadeEngine:this.initializeArcadeEngine()};if(a.fieldInfos){var s=r.filter(a.fieldInfos,(function(e){return-1!==e.fieldName.indexOf(this._relatedFieldPrefix)}),this);s&&s.length>0&&(n.relatedInfo=this._getRelatedRecords({graphic:e,fieldsInfo:s}))}return this._needFullResolutionFeature(e)&&(n.fullResolutionFeature=this._getFullResolutionFeature(e)),m(n).then(t.hitch(this,(function(r){var a=r.fullResolutionFeature,n=i&&i.evaluateAllExpressions,s=n?null:this.getRequiredExpressionFields(),o=(n?this.hasAsyncExpressions():this._hasAsyncExpressions(s))?this._fetchAttributesAsync(e,a,s):this._fetchAttributes(e,a,s);return m([o]).then(t.hitch(this,(function(t){return this._getPopupValues(e,t[0])})))})))},getAttachments:function(e){var t=e.getSourceLayer(),r=e.attributes;if(this.info.showAttachments&&t&&t.hasAttachments&&t.objectIdField){var i=r&&r[t.objectIdField];if(i)return t.queryAttachmentInfos(i)}},_needFullResolutionFeature:function(e){var t=e.getSourceLayer();return!!t&&("function"==typeof t.getMaxAllowableOffset&&t.getMaxAllowableOffset()>0&&this.hasGeometryOperations())},_getFullResolutionFeature:function(e){var t=e.getSourceLayer(),r=t.objectIdField,i=e.attributes,a=i&&r&&i[r];if(null==a)return null;var n=new p;return n.where=r+"="+a,n.maxAllowableOffset=0,n.outFields=[r],t._enableCacheHint(n),t.queryFeatures(n).then((function(e){return e.features&&e.features[0]}))},_isExpressionField:function(e){return this._reExprField.test(e)},_getExprField:function(e){return this._isExpressionField(e)?e.replace(this._reExprField,""):null},_collectExprField:function(e,t){var r=this._getExprField(e);return r&&t.push(r),t},_collectExprFieldsFromTemplatedString:function(e,t){var r=this._getExprFieldsFromTemplatedString(e);return r.length&&Array.prototype.push.apply(t,r),t},_getExprFieldsFromTemplatedString:function(e){var t=e?e.match(this._reExprFieldPattern):null;return r.map(t,(function(e){return e.replace(this._reExprFieldPattern,"$1")}),this)},_titleHasAsyncExpressions:function(){return this._hasAsyncExpressions(this.getExpressionFieldsInTitle())},_contentHasAyncExpressions:function(){return this._hasAsyncExpressions(this.getExpressionFieldsInContent())},_hasAsyncExpressions:function(e){return r.some(e,(function(e){var t=this._exprCache[e];return!(!t||!t.async)}),this)},_compileExpressions:function(e){var t={};return r.forEach(e,(function(e){var r=e.returnType&&e.returnType.toLowerCase();t[e.name]=new u({expression:e.expression,returnType:"number"===r?"number":"string",profile:g})})),t},_getArcadeExpressions:function(){var e=[];for(var t in this._exprCache)e.push(this._exprCache[t]);return e},_fetchAttributesAsync:function(e,r,i){var a=this._fetchAttributes(e,r,i),n={};for(var s in a){var o=a[s];o&&o.then&&(n[s]=o)}return m(n).then(t.hitch(this,(function(e){for(var t in e){var r=e[t];a[t]=r instanceof Error?null:this._processArcadeResult(r)}return a})))},_processArcadeResult:function(e){return"string"==typeof e&&(e=d.encode(e)),e},_fetchAttributes:function(e,i,a){var n=t.clone(e.attributes)||{},s=i&&i.geometry,o=this._exprPrefix,l=this._exprCache;return a=a||r.map(this.info.expressionInfos,(function(e){return e.name})),r.forEach(a,(function(t){var r=o+t,i=l[t],a=i?e.evaluateExpression(i,this._getEvalOptions(i,e,s)):null;n[r]=this._processArcadeResult(a)}),this),n},_getEvalOptions:function(e,t,r){var i=e.hasGeometryOperations(),a=t.getSourceLayer(),n=a&&(a.getMap()||a.parentLayer&&a.parentLayer.getMap()),s=g.getEvalOptions({expression:e,feature:t,layer:a,map:n,spatialReference:n&&n.spatialReference}),o=s.context.vars.$feature,l=!(!i||!r);return o&&l&&(o._geometry=r),s.skipCache=l,s},_getPopupValues:function(e,i,a){i=i||this._fetchAttributes(e);var n,s,o,l,d,f,c,m=this.info,u=e.getSourceLayer(),p=t.clone(i),y="",_="",M=u&&u._getDateOpts&&u._getDateOpts().properties,g={dateFormat:{properties:M=M&&M.slice(0),formatter:"DateFormat"+this._insertOffset(this._dateFormats.shortDateShortTime)},format:null};if(this._relatedInfo)for(l in this._relatedInfo)if(this._relatedInfo.hasOwnProperty(l)){var F=this._relatedInfo[l],E=this._relatedLayersInfo[l];F&&(r.forEach(F.relatedFeatures,(function(e){for(d in e.attributes)if(e.attributes.hasOwnProperty(d)&&"esriRelCardinalityOneToOne"===E.relation.cardinality){var t=this._toRelatedFieldName([E.relation.id,d]);i[t]=p[t]=e.attributes[d]}}),this),r.forEach(F.relatedStatsFeatures,(function(e){for(d in e.attributes)if(e.attributes.hasOwnProperty(d)){var t=this._toRelatedFieldName([E.relation.id,d]);i[t]=p[t]=e.attributes[d]}}),this))}for(s in p){var P=this._fieldsMap[s.toLowerCase()],x=this._getLayerFieldInfo(u,s);P&&x&&(P.fieldName=x.name);var L=p[s];if(p[s]=this._formatValue(L,s,g),M&&P&&P.format&&P.format.dateFormat){var I=r.indexOf(M,s);I>-1&&M.splice(I,1)}}if(u){var v=u.typeIdField;for(s in i)if(i.hasOwnProperty(s)&&-1===s.indexOf(this._relatedFieldPrefix)&&(o=i[s],h.isDefined(o))){var T=this._getDomainName(u,e,s,o);if(h.isDefined(T))p[s]=T;else if(s===v){var b=this._getTypeName(u,e,o);h.isDefined(b)&&(p[s]=b)}}}return m.title&&(y=this._processFieldsInLinks(this._fixTokens(m.title,u),i),y=t.trim(this._removeEmptyHref(h.substitute(p,y,g)||""))),a?{title:y}:(m.description&&(_=this._processFieldsInLinks(this._fixTokens(m.description,u),i),_=t.trim(this._removeEmptyHref(h.substitute(p,_,g)||""))),m.fieldInfos&&(n=[],r.forEach(m.fieldInfos,(function(e){(s=e.fieldName)&&e.visible&&n.push([this._fieldLabels[s.toLowerCase()]||s,h.substitute(p,"${"+s+"}",g)||""])}),this)),m.mediaInfos&&(f=[],r.forEach(m.mediaInfos,(function(e){switch(c=0,o=e.value,e.type){case"image":var a=o.sourceURL;a=a&&t.trim(this._removeEmptyHref(h.substitute(i,this._fixTokens(a,u)))),c=!!a;break;case"piechart":case"linechart":case"columnchart":case"barchart":var n,s=o.normalizeField;o.fields=r.map(o.fields,(function(e){return(n=this._getLayerFieldInfo(u,e))?n.name:e}),this),s&&(n=this._getLayerFieldInfo(u,s),o.normalizeField=n?n.name:s),c=r.some(o.fields,(function(e){return h.isDefined(i[e])||-1!==e.indexOf(this._relatedFieldPrefix)&&this._relatedInfo}),this);break;default:return}if(c){e=t.clone(e),o=e.value;var l,d,m=e.title?this._processFieldsInLinks(this._fixTokens(e.title,u),i):"",y=e.caption?this._processFieldsInLinks(this._fixTokens(e.caption,u),i):"";if(e.title=m?t.trim(this._removeEmptyHref(h.substitute(p,m,g)||"")):"",e.caption=y?t.trim(this._removeEmptyHref(h.substitute(p,y,g)||"")):"","image"===e.type)o.sourceURL=h.substitute(i,this._fixTokens(o.sourceURL,u)),o.linkURL&&(o.linkURL=t.trim(h.substitute(i,this._fixTokens(o.linkURL,u))||""));else r.forEach(o.fields,(function(e,t){if(-1!==e.indexOf(this._relatedFieldPrefix))(d=this._getRelatedChartInfos(e,o,i,g))instanceof Array?o.fields=d:o.fields[t]=d;else{var r=i[e];r=void 0===r?null:r,l=i[o.normalizeField]||0,r&&l&&(r/=l),o.fields[t]={y:r,tooltip:(this._fieldLabels[e.toLowerCase()]||e)+":<br/>"+this._formatValue(r,e,g,!!l)}}}),this);f.push(e)}}),this)),{title:y,description:_,hasDescription:!!m.description,fields:n&&n.length?n:null,mediaInfos:f&&f.length?f:null,formatted:p,editSummary:!1!==m.showLastEditInfo&&u&&u.getEditSummary?u.getEditSummary(e):""})},_getRelatedChartInfos:function(e,t,i,a){var n,s,o,l,d,f,c;return n=[],d=(c=this._fromRelatedFieldName(e))[0],s=this._relatedInfo[d],f=this._relatedLayersInfo[d],s&&r.forEach(s.relatedFeatures,(function(r){var s,d,f=r.attributes;for(d in f)if(f.hasOwnProperty(d)&&d===c[1]){if(s={},l=f[d],t.normalizeField&&(o=-1!==t.normalizeField.indexOf(this._relatedFieldPrefix)?f[this._fromRelatedFieldName(t.normalizeField)[1]]:i[t.normalizeField]),l&&o&&(l/=o),t.tooltipField)if(-1!==t.tooltipField.indexOf(this._relatedFieldPrefix)){var m=this._fromRelatedFieldName(t.tooltipField)[1],u=h.isDefined(f[m])?this._formatValue(f[m],t.tooltipField,a,!!o):m;s.tooltip=u+":<br/>"+this._formatValue(l,m,a,!!o)}else s.tooltip=(this._fieldLabels[e.toLowerCase()]||e)+":<br/>"+this._formatValue(l,t.tooltipField,a,!!o);else s.tooltip=l;s.y=l,n.push(s)}}),this),"esriRelCardinalityOneToMany"===f.relation.cardinality||"esriRelCardinalityManyToMany"===f.relation.cardinality?n:n[0]},_dateFormats:{shortDate:"(datePattern: 'M/d/y', selector: 'date')",shortDateShortTime:"(datePattern: 'M/d/y', timePattern: 'h:mm a', selector: 'date and time')",shortDateShortTime24:"(datePattern: 'M/d/y', timePattern: 'H:mm', selector: 'date and time')",shortDateLongTime:"(datePattern: 'M/d/y', timePattern: 'h:mm:ss a', selector: 'date and time')",shortDateLongTime24:"(datePattern: 'M/d/y', timePattern: 'H:mm:ss', selector: 'date and time')",shortDateLE:"(datePattern: 'd/M/y', selector: 'date')",shortDateLEShortTime:"(datePattern: 'd/M/y', timePattern: 'h:mm a', selector: 'date and time')",shortDateLEShortTime24:"(datePattern: 'd/M/y', timePattern: 'H:mm', selector: 'date and time')",shortDateLELongTime:"(datePattern: 'd/M/y', timePattern: 'h:mm:ss a', selector: 'date and time')",shortDateLELongTime24:"(datePattern: 'd/M/y', timePattern: 'H:mm:ss', selector: 'date and time')",longMonthDayYear:"(datePattern: 'MMMM d, y', selector: 'date')",longMonthDayYearShortTime:"(datePattern: 'MMMM d, y', timePattern: 'h:mm a', selector: 'date and time')",longMonthDayYearShortTime24:"(datePattern: 'MMMM d, y', timePattern: 'H:mm', selector: 'date and time')",longMonthDayYearLongTime:"(datePattern: 'MMMM d, y', timePattern: 'h:mm:ss a', selector: 'date and time')",longMonthDayYearLongTime24:"(datePattern: 'MMMM d, y', timePattern: 'H:mm:ss', selector: 'date and time')",dayShortMonthYear:"(datePattern: 'd MMM y', selector: 'date')",dayShortMonthYearShortTime:"(datePattern: 'd MMM y', timePattern: 'h:mm a', selector: 'date and time')",dayShortMonthYearShortTime24:"(datePattern: 'd MMM y', timePattern: 'H:mm', selector: 'date and time')",dayShortMonthYearLongTime:"(datePattern: 'd MMM y', timePattern: 'h:mm:ss a', selector: 'date and time')",dayShortMonthYearLongTime24:"(datePattern: 'd MMM y', timePattern: 'H:mm:ss', selector: 'date and time')",longDate:"(datePattern: 'EEEE, MMMM d, y', selector: 'date')",longDateShortTime:"(datePattern: 'EEEE, MMMM d, y', timePattern: 'h:mm a', selector: 'date and time')",longDateShortTime24:"(datePattern: 'EEEE, MMMM d, y', timePattern: 'H:mm', selector: 'date and time')",longDateLongTime:"(datePattern: 'EEEE, MMMM d, y', timePattern: 'h:mm:ss a', selector: 'date and time')",longDateLongTime24:"(datePattern: 'EEEE, MMMM d, y', timePattern: 'H:mm:ss', selector: 'date and time')",longMonthYear:"(datePattern: 'MMMM y', selector: 'date')",shortMonthYear:"(datePattern: 'MMM y', selector: 'date')",year:"(datePattern: 'y', selector: 'date')"},_dateFormatsJson:{shortDate:{datePattern:"M/d/y",selector:"date"},shortDateShortTime:{datePattern:"M/d/y",timePattern:"h:mm a",selector:"date and time"},shortDateShortTime24:{datePattern:"M/d/y",timePattern:"H:mm",selector:"date and time"},shortDateLongTime:{datePattern:"M/d/y",timePattern:"h:mm:ss a",selector:"date and time"},shortDateLongTime24:{datePattern:"M/d/y",timePattern:"H:mm:ss",selector:"date and time"},shortDateLE:{datePattern:"d/M/y",selector:"date"},shortDateLEShortTime:{datePattern:"d/M/y",timePattern:"h:mm a",selector:"date and time"},shortDateLEShortTime24:{datePattern:"d/M/y",timePattern:"H:mm",selector:"date and time"},shortDateLELongTime:{datePattern:"d/M/y",timePattern:"h:mm:ss a",selector:"date and time"},shortDateLELongTime24:{datePattern:"d/M/y",timePattern:"H:mm:ss",selector:"date and time"},longMonthDayYear:{datePattern:"MMMM d, y",selector:"date"},longMonthDayYearShortTime:{datePattern:"MMMM d, y",timePattern:"h:mm a",selector:"date and time"},longMonthDayYearShortTime24:{datePattern:"MMMM d, y",timePattern:"H:mm",selector:"date and time"},longMonthDayYearLongTime:{datePattern:"MMMM d, y",timePattern:"h:mm:ss a",selector:"date and time"},longMonthDayYearLongTime24:{datePattern:"MMMM d, y",timePattern:"H:mm:ss",selector:"date and time"},dayShortMonthYear:{datePattern:"d MMM y",selector:"date"},dayShortMonthYearShortTime:{datePattern:"d MMM y",timePattern:"h:mm a",selector:"date and time"},dayShortMonthYearShortTime24:{datePattern:"d MMM y",timePattern:"H:mm",selector:"date and time"},dayShortMonthYearLongTime:{datePattern:"d MMM y",timePattern:"h:mm:ss a",selector:"date and time"},dayShortMonthYearLongTime24:{datePattern:"d MMM y",timePattern:"H:mm:ss",selector:"date and time"},longDate:{datePattern:"EEEE, MMMM d, y",selector:"date"},longDateShortTime:{datePattern:"EEEE, MMMM d, y",timePattern:"h:mm a",selector:"date and time"},longDateShortTime24:{datePattern:"EEEE, MMMM d, y",timePattern:"H:mm",selector:"date and time"},longDateLongTime:{datePattern:"EEEE, MMMM d, y",timePattern:"h:mm:ss a",selector:"date and time"},longDateLongTime24:{datePattern:"EEEE, MMMM d, y",timePattern:"H:mm:ss",selector:"date and time"},longMonthYear:{datePattern:"MMMM y",selector:"date"},shortMonthYear:{datePattern:"MMM y",selector:"date"},year:{datePattern:"y",selector:"date"}},_reHref:/href\s*=\s*\"([^\"]+)\"/gi,_reHrefApos:/href\s*=\s*\'([^\']+)\'/gi,_fixTokens:function(e,t){var r=this;return e.replace(/(\{([^\{\r\n]+)\})/g,(function(e,i,a){var n=r._getLayerFieldInfo(t,a);return"$"+(n?"{"+n.name+"}":i)}))},_encodeAttributes:function(e){var r,i,a,n=t.clone(e)||{};for(r in n)(i=n[r])&&"string"==typeof i&&(a=encodeURIComponent(i).replace(/\'/g,"&apos;"),n[r]=a);return n},_processFieldsInLinks:function(e,r){var i=this._encodeAttributes(r),a=t.hitch(this,this._addValuesToHref,r,i);return e&&(e=e.replace(this._reHref,a).replace(this._reHrefApos,a)),e},_addValuesToHref:function(e,r,i,a){return a=a&&t.trim(a),i=h.substitute(a&&0===a.indexOf("${")?e:r,i)},_getLayerFieldInfo:function(e,t){return e&&e.getField?e.getField(t):null},_formatValue:function(e,i,a,n){var s=this._fieldsMap[i.toLowerCase()],o=s&&s.format,l=-1!==r.indexOf(a.dateFormat.properties,i),d=!("number"!=typeof e||l||o&&o.dateFormat);if(!h.isDefined(e)||!s||!h.isDefined(o))return this._applyFormatting(e,d);var f,c=o.hasOwnProperty("places")||o.hasOwnProperty("digitSeparator"),m=!o.hasOwnProperty("digitSeparator")||o.digitSeparator;if(c&&!l)f={formatType:"NumberFormat",places:h.isDefined(o.places)&&(!n||o.places>0)?Number(o.places):1/0};else{if(!o.dateFormat)return this._applyFormatting(e,d);f=t.mixin({formatType:"DateFormat",utcOffset:this.utcOffset},this._dateFormatsJson[o.dateFormat]||this._dateFormatsJson.shortDateShortTime)}var u=this._applyFormatFunctions(e,f,a);return c&&e.constructor.toString().indexOf("Array")>-1&&(u="",r.forEach(e,t.hitch(this,(function(e,t){t&&(u+=" "),u+=this._applyFormatFunctions(e,f,a)})))),c&&!m&&E.group&&(u=u.replace(new RegExp("\\"+E.group,"g"),"")),l&&(u='<span class="esriDateValue">'+u+"</span>"),this._applyFormatting(u,d)},_applyFormatFunctions:function(e,t,r){t&&r&&(r.format={myKey:t});var i=h.substitute({myKey:e},"${myKey}",r)||"";return t&&r&&(r.format=null),i},_applyFormatting:function(e,t){return t?this._forceLTR(e):this._applyPreWrap(e)},_forceLTR:function(e){var t=o("ie");return t&&t<=10?e:"<span class='esriNumericValue'>"+e+"</span>"},_applyPreWrap:function(e){return"string"==typeof e?e.replace(this._reNewline,"<span class='charNewLine'>$1</span>"):e},_insertOffset:function(e){return e&&(e=h.isDefined(this.utcOffset)?e.replace(/\)\s*$/,", utcOffset:"+this.utcOffset+")"):e),e},_getDomainName:function(e,t,r,i){var a=e.getDomain&&e.getDomain(r,{feature:t});return a&&a.codedValues?a.getName(i):null},_getTypeName:function(e,t,r){var i=e.getType&&e.getType(t);return i&&i.name},_getRelatedRecords:function(e){var r,i=e.graphic;return this._relatedLayersInfoPromise||(this._relatedLayersInfoPromise=this._getRelatedLayersInfo(e).then(t.hitch(this,(function(e){for(r in e)e.hasOwnProperty(r)&&e[r]&&(this._relatedLayersInfo[r].relatedLayerInfo=e[r])})))),this._relatedLayersInfoPromise.then(t.hitch(this,(function(){return this._queryRelatedLayers(i)}))).then(t.hitch(this,(function(e){return this._setRelatedRecords(i,e),e})))},_getRelatedLayersInfo:function(e){var t,i,a=e.graphic,n=e.fieldsInfo,s={};for(i in t=a.getSourceLayer(),this._relatedLayersInfo||(this._relatedLayersInfo={}),r.forEach(n,(function(e){var i,a,n,s,o;i=this._fromRelatedFieldName(e.fieldName),a=i[0],n=i[1],a&&(!this._relatedLayersInfo[a]&&t&&t.relationships&&(r.some(t.relationships,(function(e){if(e.id==a)return o=e,!0})),o&&(this._relatedLayersInfo[a]={relation:o,relatedFields:[],outStatistics:[]})),this._relatedLayersInfo[a]&&(this._relatedLayersInfo[a].relatedFields.push(n),e.statisticType&&((s=new M).statisticType=e.statisticType,s.onStatisticField=n,s.outStatisticFieldName=n,this._relatedLayersInfo[a].outStatistics.push(s))))}),this),this._relatedLayersInfo){var o,d;if(this._relatedLayersInfo.hasOwnProperty(i))this._relatedLayersInfo[i]&&(o=this._relatedLayersInfo[i].relation,d=t.url.replace(/[0-9]+$/,o.relatedTableId),this._relatedLayersInfo[i].relatedLayerUrl=d,s[i]=c({url:d,content:{f:"json"},callbackParamName:"callback"}))}return l(s)},_queryRelatedLayers:function(e){var t,r={};for(t in this._relatedLayersInfo)this._relatedLayersInfo.hasOwnProperty(t)&&(r[t]=this._queryRelatedLayer({graphic:e,relatedInfo:this._relatedLayersInfo[t]}));return l(r)},_queryRelatedLayer:function(e){var i,a,n,o,d,h,f,c,m,u,_,M,g,F,E;return i=e.graphic,a=i.getSourceLayer(),n=a.url.match(/[0-9]+$/g)[0],M=e.relatedInfo,u=M.relatedLayerInfo,g=M.relatedLayerUrl,F=M.relation,r.some(u.relationships,(function(e){if(e.relatedTableId===parseInt(n,10))return o=e,!0}),this),o&&(d=new p,r.some(u.fields,(function(e){if(e.name===o.keyField)return c=-1!==r.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble"],e.type)?"number":"string",!0})),o.relationshipTableId&&o.keyFieldInRelationshipTable?(E=new s,this._queryRelatedRecords(i,o).then(t.hitch(this,(function(e){var n,s;(n=e[i.attributes[a.objectIdField]])?(s=r.map(n.features,(function(e){return e.attributes[u.objectIdField]}),this),M.outStatistics&&M.outStatistics.length>0&&u.supportsStatistics&&((m=new p).where=this._chunkWhereInClause(u.objectIdField,s,1e3),m.outFields=d.outFields,m.outStatistics=M.outStatistics),m&&(h=new y(g)).execute(m).then(t.hitch(this,(function(e){var t=[];t.push(n),t.push(e),E.resolve(t)})))):E.resolve()})))):(f="string"===c?o.keyField+"='"+i.attributes[F.keyField]+"'":o.keyField+"="+i.attributes[F.keyField],d.where=f,d.outFields=M.relatedFields,M.outStatistics&&M.outStatistics.length>0&&u.supportsStatistics&&((m=new p).where=d.where,m.outFields=d.outFields,m.outStatistics=M.outStatistics),h=new y(g),(_=[]).push(h.execute(d)),m&&_.push(h.execute(m)))),_?l(_):E?E.promise:void 0},_setRelatedRecords:function(e,t){var r;for(r in this._relatedInfo=[],t)if(t.hasOwnProperty(r)&&t[r]){var i=t[r];this._relatedInfo[r]={},this._relatedInfo[r].relatedFeatures=i[0].features,h.isDefined(i[1])&&(this._relatedInfo[r].relatedStatsFeatures=i[1].features)}},_handlerErrorResponse:function(e,t){e.reject(t)},_fromRelatedFieldName:function(e){var t=[];return-1!==e.indexOf(this._relatedFieldPrefix)&&(t=e.split("/").slice(1)),t},_toRelatedFieldName:function(e){var t="";return e&&e.length>0&&(t=this._relatedFieldPrefix+e[0]+"/"+e[1]),t},_queryRelatedRecords:function(e,t){var r=e.getSourceLayer(),i=new _;return i.outFields=["*"],i.relationshipId=t.id,i.objectIds=[e.attributes[r.objectIdField]],r.queryRelatedFeatures(i)},_removeEmptyHref:function(e){return e.replace(/href=(""|'')/gi,"")},_chunkWhereInClause:function(e,t,r){for(var i=0,a=[];i<t.length;)a.push(e+" IN ("+t.slice(i,r+i)+")"),i+=r;return a.join(" OR ")}});return n("extend-esri")&&(f.PopupInfo=f.PopupInfoTemplate=P),P}));
