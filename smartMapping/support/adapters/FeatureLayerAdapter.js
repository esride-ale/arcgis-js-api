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
// See http://js.arcgis.com/4.17/esri/copyright.txt for details.

define(["require","exports","tslib","../../../geometry","../../../core/arrayUtils","../../../core/Error","../../../core/Logger","../../../core/maybe","../../../core/promiseUtils","../../../core/watchUtils","../../../core/accessorSupport/decorators","../../../geometry/support/quantizationUtils","../../../geometry/support/spatialReferenceUtils","../../../layers/support/arcgisLayerUrl","../../../layers/support/fieldUtils","../../statistics/support/predominanceUtils","../../statistics/support/utils","../utils","./LayerAdapter","./support/utils","../../../tasks/GenerateRendererTask","../../../tasks/support/GenerateRendererParameters","../../../tasks/support/QuantizationParameters","../../../tasks/support/StatisticDefinition","../../../tasks/support/UniqueValueDefinition"],(function(e,t,r,a,i,n,s,o,l,u,c,m,p,d,f,h,y,v,g,F,_,S,x,w,z){"use strict";var E=s.getLogger("esri.smartMapping.support.adapters.FeatureLayerAdapter");return function(e){function t(t){return e.call(this,t)||this}return r.__extends(t,e),t.prototype.destroy=function(){this._hasLocalSource=null},t.prototype._isStatsSupportedOnService=function(){var e=this.layer;return!e.get("capabilities.query.supportsStatistics")||"multipatch"===this.geometryType&&!d.isHostedAgolService(e.url)&&e.version<10.5?l.reject(new n("feature-layer-adapter:not-supported","Layer does not support statistics query")):l.resolve()},t.prototype._fetchFeaturesFromMemory=function(e,t,a){return r.__awaiter(this,void 0,void 0,(function(){var i,s,o;return r.__generator(this,(function(r){switch(r.label){case 0:return i=this.layer,this._hasLocalSource?[4,i.queryFeatures(t)]:[3,2];case 1:return[2,r.sent().features];case 2:if(!e)throw new n("feature-layer-adapter:insufficient-data","layerView is required to fetch the features");return s=l.createAbortController(),o=u.whenFalseOnce(e,"updating",s.signal),[4,l.timeout(o,5e3,s).catch((function(e){throw E.warn("LayerView is taking too long to update. Aborting fetch from layerView."),e}))];case 3:return r.sent(),[4,e.queryFeatures(t,{signal:a})];case 4:return[2,r.sent().features]}}))}))},t.prototype._fetchFeaturesFromService=function(e,t){return this.layer.queryFeatures(e,{signal:t}).then((function(e){return e&&e.features}))},t.prototype._fetchFeaturesForStats=function(e){var t=this;return v.getFieldsList({field:e.field,normalizationField:e.normalizationField,valueExpression:e.valueExpression}).then((function(r){return t.getSampleFeatures({sampleSize:-1,view:e.view,returnGeometry:e.returnGeometry,requiredFields:r,signal:e.signal})}))},t.prototype._summaryStatsFromGenRend=function(e){var t=e.normalizationType,r=e.normalizationField;return this.classBreaks({field:e.field,numClasses:5,classificationMethod:"standard-deviation",standardDeviationInterval:.25,normalizationType:t,normalizationField:"field"===t?r:void 0,minValue:e.minValue,maxValue:e.maxValue,signal:e.signal}).then((function(e){var t,r,a;if(e.classBreakInfos.some((function(e){return e.hasAvg&&(t=e),!!t})),t){var i=t.maxValue-t.minValue;r=t.minValue+i/2,a=4*i}var n={min:e.minValue,max:e.maxValue,avg:r,stddev:a};return F.processSummaryStatisticsResult(n)}))},t.prototype._getSummaryStatsQuery=function(e,t){var r=e.field,a=e.normalizationType,i=e.normalizationField,n=e.normalizationTotal,s=this.supportsSQLExpression&&t?F.msSinceUnixEpochSQL(this,r):e.sqlExpression,o=F.getFieldExpr({field:r,normalizationType:a,normalizationField:i,normalizationTotal:n,layer:this}),l=s||o,u=l?y.getRangeExpr(l,e.minValue,e.maxValue):null,c=y.getSQLFilterForNormalization({field:r,normalizationField:i,normalizationType:a}),m=y.mergeWhereClauses(e.sqlWhere,c),p=y.mergeWhereClauses(m,u),d=this.layer.createQuery();return d.where=y.mergeWhereClauses(d.where,p),d.sqlFormat=s?"standard":null,d.outStatistics=F.statisticTypes.map((function(e){var t=new w;return t.statisticType="variance"===e?"var":e,t.onStatisticField=l,t.outStatisticFieldName=e+"_value",t})),d},t.prototype._summaryStatsFromServiceQuery=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var a,i,n,s;return r.__generator(this,(function(r){switch(r.label){case 0:return[4,this._isStatsSupportedOnService()];case 1:return r.sent(),"percent-of-total"!==e.normalizationType?[3,3]:(a=e,[4,this._getNormalizationTotal(e.field,e.normalizationType)]);case 2:a.normalizationTotal=r.sent(),r.label=3;case 3:return i=this._getSummaryStatsQuery(e,t),[4,this.layer.queryFeatures(i,{signal:e.signal})];case 4:return n=r.sent(),s=F.getSummaryStatisticsFromFeatureSet(n,t),[2,F.processSummaryStatisticsResult(s)]}}))}))},t.prototype._summaryStatsFromClientQuery=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var a,i,n;return r.__generator(this,(function(r){switch(r.label){case 0:return a=this._getSummaryStatsQuery(e,t),[4,this.layer.queryFeatures(a,{signal:e.signal})];case 1:return i=r.sent(),n=F.getSummaryStatisticsFromFeatureSet(i,t),[2,F.processSummaryStatisticsResult(n)]}}))}))},t.prototype._summaryStatsFromMemory=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var a,i,s,o,l,u,c,m,p,d;return r.__generator(this,(function(f){switch(f.label){case 0:return a=e.field,i=e.valueExpression,s=e.view,o={field:a,valueExpression:i,normalizationField:e.normalizationField,view:s,signal:e.signal},(u=e.features)?[3,2]:[4,this._fetchFeaturesForStats(o)];case 1:u=f.sent(),f.label=2;case 2:if(!((l=u)&&l.length))throw new n("feature-layer-adapter:insufficient-data","No features are available to calculate statistics");return"percent-of-total"!==(c=r.__assign({},e)).normalizationType?[3,4]:[4,F.calculateStatsFromMemory({field:a},l)];case 3:if(m=f.sent(),null==(p=m.sum))throw new n("feature-layer-adapter:invalid","invalid normalizationTotal");c.normalizationTotal=p,f.label=4;case 4:return[4,F.calculateStatsFromMemory(c,l,t)];case 5:return d=f.sent(),[2,F.processSummaryStatisticsResult(d)]}}))}))},t.prototype._uvFromGenRenderer=function(e,t){var r=this,a=e.field,i=new z;i.attributeField=a;var n=new S;return n.classificationDefinition=i,this.generateRenderer(n,e.signal).then((function(e){var t={},i=r.getField(a);return e.uniqueValues.forEach((function(e){var r=e.value;null!=r&&""!==r&&("string"!=typeof r||""!==r.trim()&&"<null>"!==r.toLowerCase())||(r=null),null==t[r]?t[r]={count:e.count,data:f.isNumericField(i)&&r?Number(r):r}:t[r].count=t[r].count+e.count})),{count:t}})).then((function(r){return F.createUVResult(r,t,e.returnAllCodedValues)}))},t.prototype._getUVQuery=function(e){var t=e.field,r=e.sqlExpression,a="countOF"+(t||"Expr"),i=new w;i.statisticType="count",i.onStatisticField=r?"1":t,i.outStatisticFieldName=a;var n=this.layer.createQuery();return n.where=y.mergeWhereClauses(n.where,e.sqlWhere),n.sqlFormat=r?"standard":null,n.outStatistics=[i],n.groupByFieldsForStatistics=[t||r],n},t.prototype._uvFromServiceQuery=function(e,t){var r=this;return this._isStatsSupportedOnService().then((function(){return r.layer.queryFeatures(r._getUVQuery(e),{signal:e.signal})})).then((function(t){return F.getUniqueValuesFromFeatureSet(t,r,e.field,null,e.signal)})).then((function(r){return F.createUVResult(r,t,e.returnAllCodedValues)}))},t.prototype._uvFromClientQuery=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var a,i,n,s;return r.__generator(this,(function(r){switch(r.label){case 0:return a=e.signal,i=this._getUVQuery(e),[4,this.layer.queryFeatures(i,{signal:a})];case 1:return n=r.sent(),[4,F.getUniqueValuesFromFeatureSet(n,this,e.field,null,a)];case 2:return s=r.sent(),[2,F.createUVResult(s,t,e.returnAllCodedValues)]}}))}))},t.prototype._uvFromMemory=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var a,i,n,s,o,l,u;return r.__generator(this,(function(r){switch(r.label){case 0:return a=e.field,i=e.valueExpression,n=e.view,s=e.signal,o={field:a,valueExpression:i,view:n,signal:s},e.features?(u=e.features,[3,3]):[3,1];case 1:return[4,this._fetchFeaturesForStats(o)];case 2:u=r.sent(),r.label=3;case 3:return l=u,[2,F.calculateUniqueValuesFromMemory(e,l,t)]}}))}))},t.prototype._calcBinsSQL=function(e,t){var r=[],a=t.length;return t.forEach((function(t,i){var n=t[0],s=t[1],o=y.mergeWhereClauses(e+" >= "+n,e+(i===a-1?" <= ":" < ")+s);r.push("WHEN ("+o+") THEN "+(i+1))})),["CASE",r.join(" "),"ELSE 0","END"].join(" ")},t.prototype._getNormalizationTotal=function(e,t,r){return e&&"percent-of-total"===t?this.summaryStatistics({field:e,signal:r}).then((function(e){return e.sum})):l.resolve(null)},t.prototype._getQueryParamsForExpr=function(e,t){var r=e.valueExpression||e.sqlExpression,a=e.signal;if(!r){var i=e.field,n=i?this.getField(i):null,s=f.isDateField(n),o={field:i,normalizationType:e.normalizationType,normalizationField:e.normalizationField,normalizationTotal:t,layer:this};return{sqlExpression:s?F.msSinceUnixEpochSQL(this,i):F.getFieldExpr(o),sqlWhere:s?null:e.sqlWhere||y.getSQLFilterForNormalization(e),signal:a}}return{valueExpression:e.valueExpression,sqlExpression:e.sqlExpression,sqlWhere:e.sqlWhere,signal:a}},t.prototype._getDataRange=function(e,t,r){return null!=t&&null!=r?l.resolve({min:t,max:r}):this.summaryStatistics(e).then((function(e){return{min:e.min,max:e.max}}))},t.prototype._histogramForExpr=function(e){var t=this;return this._getNormalizationTotal(e.field,e.normalizationType,e.signal).then((function(r){var a=t._getQueryParamsForExpr(e,r);return t._getDataRange(a,e.minValue,e.maxValue).then((function(i){var n=i.min,s=i.max,o=e.numBins||10,l=F.getEqualIntervalBins(n,s,o),u=t._calcBinsSQL(a.sqlExpression,l),c=new w({statisticType:"count",outStatisticFieldName:"countOFExpr",onStatisticField:"1"}),m=t.layer.createQuery();return m.where=y.mergeWhereClauses(m.where,a.sqlWhere),m.sqlFormat="standard",m.outStatistics=[c],m.groupByFieldsForStatistics=[u],m.orderByFields=[u],t._isStatsSupportedOnService().then((function(){return t.layer.queryFeatures(m,{signal:a.signal})})).then((function(e){return F.getHistogramFromFeatureSet(e,n,s,o,r)}))}))}))},t.prototype._histogramForField=function(e){var t=this;return(null!=e.minValue&&null!=e.maxValue?l.resolve({min:e.minValue,max:e.maxValue}):this.summaryStatistics(e).then((function(e){if(!e.count)throw new n("feature-layer-adapter:insufficient-data","Either the layer has no features or none of the features have data for the field");return{min:e.min,max:e.max}}))).then((function(r){return t._getBins({min:r.min,max:r.max},e.field,e.numBins,e.signal)}))},t.prototype._getBins=function(e,t,r,a){void 0===r&&(r=10);var i=e.min,n=e.max,s=e.normTotal,o=e.excludeZerosExpr,l=e.intervals||F.getEqualIntervalBins(i,n,r),u=e.sqlExpr||t;return this._queryBins(l,u,o,a).then((function(e){return{bins:e.map((function(e,t){return{minValue:l[t][0],maxValue:l[t][1],count:e.value}})),minValue:i,maxValue:n,normalizationTotal:s}}))},t.prototype._queryBins=function(e,t,r,a){for(var i=this,n=[],s=e.length,o=0;o<s;o++){var u=y.mergeWhereClauses(r,y.mergeWhereClauses(t+" >= "+e[o][0],null!==e[o][1]?t+(o===s-1?" <= ":" < ")+e[o][1]:""));n.push(u)}return l.eachAlways(n.map((function(e){return i.queryFeatureCount(e,a)})))},t.prototype._binParamsFromGenRend=function(e,t){var r=this,a=e.field,i=e.normalizationType,n=e.normalizationField,s=e.signal,o=y.getSQLFilterForNormalization({field:a,normalizationType:i,normalizationField:n}),l=new S({classificationDefinition:F.createCBDefn({field:a,normalizationType:i,normalizationField:n,classificationMethod:e.classificationMethod,standardDeviationInterval:e.standardDeviationInterval,breakCount:e.numBins||10}),where:y.mergeWhereClauses(o,t)});return this.generateRenderer(l,s).then((function(e){var t=e.normalizationTotal,s=e.classBreaks;return F.generateBinParams({field:a,normalizationType:i,normalizationField:n,normalizationTotal:t,classBreaks:s,where:o,layer:r})}))},t.prototype._histogramFromMemory=function(e){var t=this,a=e.field,i=e.normalizationField,s=e.normalizationType,o=e.valueExpression,u=e.classificationMethod,c=e.minValue,m=e.maxValue,p=e.view,d=e.signal,f={field:a,valueExpression:o,normalizationField:i,view:p,signal:d};return(e.features?l.resolve(e.features):this._fetchFeaturesForStats(f)).then((function(i){if(!(i&&i.length))throw new n("feature-layer-adapter:insufficient-data","No features are available to calculate histogram");var f=null;if((!u||"equal-interval"===u)&&!s)f=null!=c&&null!=m?l.resolve({min:c,max:m,source:"parameters"}):t.summaryStatistics({field:a,valueExpression:o,features:i,view:p,signal:d}).then((function(e){return e.count?{min:e.min,max:e.max}:l.reject(new n("feature-layer-adapter:insufficient-data","No features are available to calculate histogram"))}));else{var h=r.__assign({},e);h.features=i,f=t._getBinParamsFromMemory(h)}return f.then((function(t){return F.calculateHistogramFromMemory(e,t,i)}))}))},t.prototype._getBinParamsFromMemory=function(e){return r.__awaiter(this,void 0,void 0,(function(){var t,a,i,n,s,o,l,u,c,m,p,d=this;return r.__generator(this,(function(r){return t=e.field,a=e.valueExpression,i=e.classificationMethod,n=e.standardDeviationInterval,s=e.normalizationType,o=e.normalizationField,l=e.minValue,u=e.maxValue,c=e.features,m=e.view,p=e.signal,[2,this._classBreaksFromMemory({field:t,valueExpression:a,normalizationType:s,normalizationField:o,classificationMethod:i,standardDeviationInterval:n,minValue:l,maxValue:u,numClasses:e.numBins,features:c,view:m,signal:p}).then((function(e){var r=e.normalizationTotal,a=e.classBreakInfos,i=y.getSQLFilterForNormalization({field:t,normalizationType:s,normalizationField:o});return F.generateBinParams({field:t,normalizationType:s,normalizationField:o,normalizationTotal:r,classBreaks:a,where:i,layer:d})}))]}))}))},t.prototype._classBreaksFromGenRend=function(e){var t=e.field,r=e.normalizationType,a=e.normalizationField,i=e.normalizationTotal,n=e.signal,s=y.getSQLFilterForNormalization({field:t,normalizationType:r,normalizationField:a}),o=F.getFieldExpr({field:t,normalizationType:r,normalizationField:a,normalizationTotal:i,layer:this}),l=y.getRangeExpr(o,e.minValue,e.maxValue),u=F.createCBDefn({field:t,normalizationType:r,normalizationField:a,classificationMethod:e.classificationMethod,standardDeviationInterval:e.standardDeviationInterval,breakCount:e.numClasses||5}),c=new S;return c.classificationDefinition=u,c.where=y.mergeWhereClauses(s,l),this.generateRenderer(c,n).then((function(t){return F.resolveCBResult(e,t)}))},t.prototype._classBreaksFromInterpolation=function(e){for(var t=e.minValue,r=e.maxValue,a=e.numClasses||5,i=[],n=(r-t)/a,s=0;s<a;s++){var o=t+s*n;i.push({minValue:o,maxValue:o+n})}i[a-1].maxValue=r;var u={classBreaks:i,normalizationTotal:e.normalizationTotal},c=F.resolveCBResult(e,u);return l.resolve(c)},t.prototype._classBreaksFromMemory=function(e){return r.__awaiter(this,void 0,void 0,(function(){var t,a,i,s,o,l,u,c,m,p,d;return r.__generator(this,(function(f){switch(f.label){case 0:return t=e.field,a=e.normalizationField,i=e.valueExpression,s=e.view,o=e.signal,l={field:t,valueExpression:i,normalizationField:a,view:s,signal:o},(c=e.features)?[3,2]:[4,this._fetchFeaturesForStats(l)];case 1:c=f.sent(),f.label=2;case 2:if(!((u=c)&&u.length))throw new n("feature-layer-adapter:insufficient-data","No features are available to calculate statistics");return"percent-of-total"!==(m=r.__assign({},e)).normalizationType?[3,4]:[4,F.calculateStatsFromMemory({field:t},u)];case 3:if(p=f.sent(),null==(d=p.sum))throw new n("feature-layer-adapter:invalid","invalid normalizationTotal");m.normalizationTotal=d,f.label=4;case 4:return[2,F.calculateClassBreaksFromMemory(m,u)]}}))}))},t.prototype._heatmapStatsFromMemory=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var a,i,s,o,l,u,c,m,p,d,f,h;return r.__generator(this,(function(r){switch(r.label){case 0:return a=e.blurRadius,i=e.field,s=e.view,o=e.signal,l=s.state,u=l.resolution,c=l.size,m=new x.default({extent:s.extent,tolerance:u}),d=this._quantizeFeatures,(f=e.features)?[3,2]:[4,this._fetchFeaturesForStats({field:i,view:s,returnGeometry:!0,signal:o})];case 1:f=r.sent(),r.label=2;case 2:if(!(p=d.apply(this,[f,m,s]))||!p.length)return[2,{count:0,min:null,max:null,avg:null,stddev:null}];if(h=F.calculateHeatmapStats(p,a,t,i,c[0],c[1]))return[2,{count:h.count,min:h.min,max:h.max,avg:h.mean,stddev:h.stdDev}];throw new n("feature-layer-adapter:invalid","unable to calculate heatmap statistics")}}))}))},t.prototype._quantizeFeatures=function(e,t,r){var i=this,n=m.toQuantizationTransform(t),s=r.spatialReference,l=r.size,u=p.isWrappable(s),c=p.getInfo(s),d=Math.round((c.valid[1]-c.valid[0])/n.scale[0]);return e.map((function(e){var t=new a.Point(o.unwrap(e.geometry));return m.quantizePoint(n,t,t,t.hasZ,t.hasM),e.geometry=u?i._wrapPoint(t,d,l[0]):t,e}))},t.prototype._wrapPoint=function(e,t,r){return e.x<0?e.x+=t:e.x>r&&(e.x-=t),e},t.prototype.getField=function(e){return void 0===e&&(e=""),this.layer.getField(e)},t.prototype.getFieldUsageInfo=function(e){return this.getField(e)?{supportsLabelingInfo:!0,supportsRenderer:!0,supportsPopupTemplate:!0,supportsLayerQuery:!0,supportsStatistics:!0}:null},t.prototype.getFieldDomain=function(e,t){return this.layer.getFieldDomain(e,t)},t.prototype.summaryStatistics=function(e){var t=this,r=e.field,a=r?this.getField(r):null,i=f.isDateField(a),s=e.valueExpression||e.sqlExpression,o=s&&!e.sqlExpression,u=this._hasLocalSource||e.features,c=e.view,m=c&&"3d"===c.type;return u||o?o||e.features||m?this._summaryStatsFromMemory(e,i):this._summaryStatsFromClientQuery(e,i):this.supportsSQLExpression||!i&&!s?(e.normalizationType&&!this.supportsSQLExpression?this._summaryStatsFromGenRend(e):this._summaryStatsFromServiceQuery(e,i)).catch((function(){return l.throwIfAborted(e.signal),t._summaryStatsFromMemory(e,i)})):l.reject(new n("feature-layer-adapter:not-supported","Layer does not support standardized SQL expression for queries"))},t.prototype.uniqueValues=function(e){var t=this,r=e.field,a=e.valueExpression,i=e.sqlExpression,n=e.signal,s=(r?this.getField(r):null)&&this.getFieldDomain(r),o=a&&(!i||!this.supportsSQLExpression),u=this._hasLocalSource||e.features||o,c=e.view,m=c&&"3d"===c.type;return u?o||e.features||m?this._uvFromMemory(e,s):this._uvFromClientQuery(e,s):this._uvFromServiceQuery(e,s).catch((function(r){return l.throwIfAborted(n),e.field?t._uvFromGenRenderer(e,s):r})).catch((function(){return l.throwIfAborted(n),o||e.features||m?t._uvFromMemory(e,s):t._uvFromClientQuery(e,s)}))},t.prototype.histogram=function(e){var t=this,r=e.field,a=e.normalizationType,i=e.normalizationField,s=e.classificationMethod,o=e.signal,u=r?this.getField(r):null,c=f.isDateField(u),m=e.valueExpression||e.sqlExpression,p=m&&!e.sqlExpression,d=this._hasLocalSource||e.features||p,h=this.supportsSQLExpression,v=!s||"equal-interval"===s,g=e.minValue,_=e.maxValue,S=null!=g&&null!=_,x=e.numBins||10;return d?this._histogramFromMemory(e):(m||h)&&v?m&&!h?l.reject(new n("feature-layer-adapter:not-supported","Layer does not support standardized SQL expression for queries")):this._histogramForExpr(e):c&&v?l.reject(new n("feature-layer-adapter:not-supported","Normalization and date field are not allowed when layer does not support standardized SQL expression for queries")):a||!v?this._binParamsFromGenRend(e).then((function(s){if(!S)return t._getBins(s,r,x,o);if(g>s.max||_<s.min)throw new n("histogram:insufficient-data","Range defined by 'minValue' and 'maxValue' does not intersect available data range of the field");if(v)return t._getBins({min:g,max:_,sqlExpr:s.sqlExpr,excludeZerosExpr:s.excludeZerosExpr},r,x,o);var l={field:r,normalizationType:a,normalizationField:i,normalizationTotal:s.normTotal,layer:t},u=F.getFieldExpr(l),c=y.getRangeExpr(u,g,_);return t._binParamsFromGenRend(e,c).then((function(e){return t._getBins(e,r,x,o)}))})):this._histogramForField(e)},t.prototype.classBreaks=function(e){var t=this,r=!1!==e.analyzeData,a=this._hasLocalSource||e.features||e.valueExpression;return r&&a?this._classBreaksFromMemory(e):(r?this._classBreaksFromGenRend(e):this._classBreaksFromInterpolation(e)).catch((function(){return l.throwIfAborted(e.signal),t._classBreaksFromMemory(e)}))},t.prototype.queryFeatureCount=function(e,t){if(this._hasLocalSource)return l.reject(new n("feature-layer-adapter:not-supported","Layer does not support count query"));var r=this.layer,a=r.createQuery();return a.where=y.mergeWhereClauses(a.where,e),r.queryFeatureCount(a,{signal:t})},t.prototype.generateRenderer=function(e,t){var r=this.layer;if(this._hasLocalSource||r.version<10.1)return l.reject(new n("feature-layer-adapter:not-supported","Layer does not support generateRenderer operation (requires ArcGIS Server version 10.1+)"));var a=new _({url:r.parsedUrl.path,source:r.dynamicDataSource,gdbVersion:r.gdbVersion}),i=r.createQuery();return e.where=y.mergeWhereClauses(e.where,i.where),a.execute(e,{signal:t})},t.prototype.heatmapStatistics=function(e){var t=this,a=e.field,i=e.fieldOffset,n=e.signal;return(a&&null==i?this.summaryStatistics({field:a,signal:n}):l.resolve(null)).then((function(a){var n=i||0;if(a){var s=a.count,o=a.min,l=a.max;s?o===l&&0===o?n=1:l<=0?n="abs":o<0&&(n=-1.01*o):n=1}return t._heatmapStatsFromMemory(e,n).then((function(e){return r.__assign(r.__assign({},e),{summaryStatistics:a,fieldOffset:n})}))}))},t.prototype.predominantCategories=function(e){return r.__awaiter(this,void 0,void 0,(function(){var t,a,i,s,o,l,u,c,m,p,d,f,y,v,g;return r.__generator(this,(function(r){switch(r.label){case 0:if(!this._hasLocalSource&&!this.supportsSQLExpression)throw new n("feature-layer-adapter:not-supported","Layer does not support advanced SQL expressions and standardized queries");return t=e.fields,a=e.view,i=e.signal,s=h.getArcadeForPredominantCategory(t),o=h.getSQLForPredominantCategoryName(t),a&&this._hasLocalSource?[4,this._uvFromMemory({valueExpression:s,view:a,signal:i})]:[3,2];case 1:return l=r.sent(),[3,4];case 2:return[4,this._uvFromServiceQuery({sqlExpression:o.expression,valueExpression:s,signal:i})];case 3:l=r.sent(),r.label=4;case 4:for(u=l.uniqueValueInfos,c=u.map((function(e){return e.value})),m=t.filter((function(e){return-1===c.indexOf(e)})),p=0,d=m;p<d.length;p++)f=d[p],u.push({value:f,count:0});for(u.sort((function(e,r){return t.indexOf(e.value)-t.indexOf(r.value)})),y=0,v=u;y<v.length;y++)(g=v[y]).value===h.noDominantCategoryField&&(g.value=null);return[2,{predominantCategoryInfos:u}]}}))}))},t.prototype.getSampleFeatures=function(e){return r.__awaiter(this,void 0,void 0,(function(){var t,a,n,s,o,u,c,m,p,d,f,h,y,v,g,_;return r.__generator(this,(function(r){switch(r.label){case 0:if(t=e.view,a=e.sampleSize,n=e.requiredFields,s=e.returnGeometry,o=e.signal,u=this.layer.createQuery(),c=1,u.outSpatialReference=e.spatialReference||t&&t.spatialReference,u.returnGeometry=!!s,u.outFields=n,m=[],p=!1,!t)return[3,7];r.label=1;case 1:return r.trys.push([1,6,,7]),[4,t.whenLayerView(this.layer)];case 2:return d=r.sent(),[4,F.getMissingFields(this,n,d)];case 3:return f=r.sent(),(p=!f.length)?[4,this._fetchFeaturesFromMemory(d,u,o)]:[3,5];case 4:if((m=r.sent()).length&&a>0&&a<=m.length)return[2,i.pickRandom(m,a,c)];r.label=5;case 5:return[3,7];case 6:return r.sent(),l.throwIfAborted(o),[3,7];case 7:return r.trys.push([7,11,,12]),this._hasLocalSource?[2,p?m:this._fetchFeaturesFromService(u,o)]:[4,this.queryFeatureCount(null,o)];case 8:return h=r.sent(),y=this.layer.capabilities.query.maxRecordCount,v=-1===a?h:a,v=y&&v>y?y:v,h<=m.length||m.length>=y?[2,m]:(g=t.extent.width/t.width/t.scale*4e5,u.maxAllowableOffset=e.resolution||g,h<=v?[2,this._fetchFeaturesFromService(u,o)]:h<=2e4?[4,this.layer.queryObjectIds()]:[3,10]);case 9:return _=r.sent(),u.objectIds=i.pickRandom(_,v,c),[2,this._fetchFeaturesFromService(u,o)];case 10:return this.layer.get("capabilities.query.supportsPagination")&&(u.num=Math.min(v,2e4)),[2,this._fetchFeaturesFromService(u,o)];case 11:return r.sent(),l.throwIfAborted(o),[2,m];case 12:return[2]}}))}))},t.prototype.load=function(e){var t=this,r=this.layer.load(e).then((function(e){t.geometryType=e.geometryType,t.objectIdField=e.objectIdField,t.supportsSQLExpression=e.get("capabilities.query.supportsSqlExpression"),t._hasLocalSource=!e.url&&!!e.source,t.hasQueryEngine=t._hasLocalSource,t.minScale=e.minScale,t.maxScale=e.maxScale,t.fullExtent=e.fullExtent}));return this.addResolvingPromise(r),l.resolve(this)},r.__decorate([c.property({constructOnly:!0})],t.prototype,"layer",void 0),t=r.__decorate([c.subclass("esri.smartMapping.support.adapters.FeatureLayerAdapter")],t)}(g)}));