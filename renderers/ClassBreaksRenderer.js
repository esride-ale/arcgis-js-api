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

define(["dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/has","../kernel","../lang","../symbols/jsonUtils","./Renderer","../support/expressionUtils"],(function(e,i,s,t,a,n,o,l,r){var u=e(l,{declaredClass:"esri.renderer.ClassBreaksRenderer",constructor:function(e,s,t){if(this.breaks=[],this._symbols={},this.infos=[],this.isMaxInclusive=!0,e&&!e.declaredClass){var a=e,l=t&&t.geometryType;this.attributeField=a.field,this.setValueExpression(a.valueExpression),this.valueExpressionTitle=a.valueExpressionTitle,this.legendOptions=a.legendOptions,e=a.defaultSymbol,this.defaultSymbol=e&&(e.declaredClass?e:o.fromJson(e,t)),e=a.backgroundFillSymbol,this.backgroundFillSymbol=e&&(e.declaredClass?e:o.fromJson(e,l?{geometryType:"esriGeometryPolygon"}:null)),this._copy(["defaultLabel","classificationMethod:rest","normalizationType:rest","normalizationField","normalizationTotal"],a,this);var r=a.minValue,u=a.classBreakInfos;u&&u[0]&&n.isDefined(u[0].classMaxValue)&&i.forEach(u,(function(e){var i=e.classMaxValue;e.minValue=r,e.maxValue=i,r=i}),this),"esriGeometryPolygon"===l&&(this.hasVisualVariables("sizeInfo",!1)||o.isPointSymbol(o.getFirstSupportedSymbol(i.map(u,(function(e){return e.symbol})))))&&(t={geometryType:"esriGeometryPoint"}),i.forEach(u,(function(e){this._addBreakInfo(e,t)}),this)}else this.defaultSymbol=e,this.attributeField=s},addBreak:function(e,i,t){var a=s.isObject(e)?e:{minValue:e,maxValue:i,symbol:t};this._addBreakInfo(a)},removeBreak:function(e,i){var s,t,a=this.breaks,n=a.length,o=this._symbols;for(t=0;t<n;t++)if((s=a[t])[0]==e&&s[1]==i){a.splice(t,1),delete o[e+"-"+i],this.infos.splice(t,1);break}},clearBreaks:function(){this.breaks=[],this._symbols={},this.infos=[]},getBreakIndex:function(e){var i,t,a,n=this.attributeField,o=e.attributes,l=this.breaks,r=l.length,u=this.isMaxInclusive;if(this.valueExpression)i=this._getDataValue(e,this._cbInfo,null,this._cache.cbInfo);else if(s.isFunction(n))i=n(e);else{i=parseFloat(o[n]);var f,h,d=this.normalizationType;if(d)if(f=parseFloat(this.normalizationTotal),h=parseFloat(o[this.normalizationField]),"log"===d)i=Math.log(i)*Math.LOG10E;else if("percent-of-total"!==d||isNaN(f)){if("field"===d){if(isNaN(i)||isNaN(h))return-1;i/=h}}else i=i/f*100}if(null!=i&&!isNaN(i)&&"number"==typeof i)for(t=0;t<r;t++)if((a=l[t])[0]<=i&&(u?i<=a[1]:i<a[1]))return t;return-1},getBreakInfo:function(e){var i=this.getBreakIndex(e);return-1!==i?this.infos[i]:null},getSymbol:function(e){var i=this.breaks[this.getBreakIndex(e)];return i?this._symbols[i[0]+"-"+i[1]]:this.defaultSymbol},setMaxInclusive:function(e){this.isMaxInclusive=e},setValueExpression:function(e){this.valueExpression=e,this._cbInfo={valueExpression:e},this._cache.cbInfo=this._createCache(this._cbInfo)},getFieldsUsedInExpressions:function(){var e=this.inherited(arguments);return this.valueExpression&&(e=e.concat(r.extractFieldNames(this.valueExpression))),e.sort(),i.filter(e,(function(i,s){return 0===s||e[s-1]!==i}))},isContinuousRenderer:function(){var e=!1;if(this.infos&&1===this.infos.length){var s=this.attributeField,t=this.normalizationField,a=this.valueExpression,n=this.getVisualVariablesForType("colorInfo",!1)||[],o=this.getVisualVariablesForType("sizeInfo",!1)||[],l=this.getVisualVariablesForType("opacityInfo",!1)||[],r=n.concat(o).concat(l);e=i.some(r,(function(e){return(e.field===s||e.valueExpression===a)&&e.normalizationField==t}))}return e},_normalizationTypeEnums:[["field","esriNormalizeByField"],["log","esriNormalizeByLog"],["percent-of-total","esriNormalizeByPercentOfTotal"]],_classificationMethodEnums:[["natural-breaks","esriClassifyNaturalBreaks"],["equal-interval","esriClassifyEqualInterval"],["quantile","esriClassifyQuantile"],["standard-deviation","esriClassifyStandardDeviation"],["geometrical-interval","esriClassifyGeometricalInterval"],["defined-interval","esriClassifyDefinedInterval"]],_copy:function(e,s,t){i.forEach(e,(function(e){var i,a,n,o,l=e.split(":");if(l.length>1&&(i=this["_"+(e=l[0])+"Enums"],"rest"===l[1]?(a="1",n="0"):"sdk"===l[1]&&(a="0",n="1")),void 0!==(o=s[e])&&(t[e]=o,i&&a)){var r,u=i.length;for(r=0;r<u;r++)if(i[r][a]===o){t[e]=i[r][n];break}}}),this)},_addBreakInfo:function(e,i){var s=e.minValue,t=e.maxValue;this.breaks.push([s,t]),this.infos.push(e);var a=e.symbol;a&&(a.declaredClass||(e.symbol=o.fromJson(a,i))),this._symbols[s+"-"+t]=e.symbol},toJson:function(){var e=this.infos||[],t=n.fixJson,a=e[0]&&e[0].minValue,o=this.backgroundFillSymbol,l=s.mixin(this.inherited(arguments),{type:"classBreaks",field:this.attributeField,valueExpression:this.valueExpression,valueExpressionTitle:this.valueExpressionTitle,legendOptions:s.clone(this.legendOptions),defaultSymbol:this.defaultSymbol&&this.defaultSymbol.toJson(),backgroundFillSymbol:o&&o.toJson(),minValue:a===-1/0?-Number.MAX_VALUE:a,classBreakInfos:i.map(e,(function(e){return(e=s.mixin({},e)).symbol=e.symbol&&e.symbol.toJson(),e.classMaxValue=e.maxValue===1/0?Number.MAX_VALUE:e.maxValue,delete e.minValue,delete e.maxValue,t(e)}))});return this._copy(["defaultLabel","classificationMethod:sdk","normalizationType:sdk","normalizationField","normalizationTotal"],this,l),l.hasOwnProperty("normalizationType")&&!l.normalizationType&&delete l.normalizationType,l.hasOwnProperty("classificationMethod")&&!l.classificationMethod&&delete l.classificationMethod,t(l)}});return t("extend-esri")&&s.setObject("renderer.ClassBreaksRenderer",u,a),u}));
