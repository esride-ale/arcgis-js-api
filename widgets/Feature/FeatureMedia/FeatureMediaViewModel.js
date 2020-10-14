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

define(["require","exports","tslib","../../../core/Accessor","../../../core/accessorSupport/decorators","../../../popup/FieldInfo","../../../popup/content/support/ChartMediaInfoValueSeries","../support/featureUtils","../support/relatedFeatureUtils"],(function(e,t,r,a,o,i,n,l,d){"use strict";return function(e){function t(t){var r=e.call(this,t)||this;return r.activeMediaInfoIndex=0,r.attributes=null,r.fieldInfoMap=null,r.formattedAttributes=null,r.layer=null,r.mediaInfos=null,r.popupTemplate=null,r.relatedInfos=null,r}return r.__extends(t,e),Object.defineProperty(t.prototype,"activeMediaInfo",{get:function(){return this.formattedMediaInfos[this.activeMediaInfoIndex]||null},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"formattedMediaInfos",{get:function(){return this._formatMediaInfos()||[]},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"formattedMediaInfoCount",{get:function(){return this.formattedMediaInfos.length},enumerable:!1,configurable:!0}),t.prototype.setActiveMedia=function(e){this._setContentElementMedia(e)},t.prototype.next=function(){this._pageContentElementMedia(1)},t.prototype.previous=function(){this._pageContentElementMedia(-1)},t.prototype._setContentElementMedia=function(e){var t=this.formattedMediaInfoCount,r=(e+t)%t;this.activeMediaInfoIndex=r},t.prototype._pageContentElementMedia=function(e){var t=this.activeMediaInfoIndex+e;this._setContentElementMedia(t)},t.prototype._formatMediaInfos=function(){var e=this,t=this,a=t.attributes,o=t.mediaInfos,i=t.formattedAttributes,n=t.fieldInfoMap,d=t.layer,s=r.__assign(r.__assign({},i),a);return null==o?void 0:o.map((function(t){if(!t)return null;var r=t.title?l.processFieldsInLinks(t.title,s,d):"";t.title=r?l.substituteAttributes({formattedAttributes:i,template:r,fieldInfoMap:n}):"";var o=t.caption?l.processFieldsInLinks(t.caption,s,d):"";t.caption=o?l.substituteAttributes({formattedAttributes:i,template:o,fieldInfoMap:n}):"";var p=t.altText?l.processFieldsInLinks(t.altText,s,d):"";if(t.altText=p?l.substituteAttributes({formattedAttributes:i,template:p,fieldInfoMap:n}):"","image"===t.type){var f=t.value;return e._setImageValue({value:f,formattedAttributes:i,layer:d}),t.value.sourceURL?t:void 0}if("pie-chart"===t.type||"line-chart"===t.type||"column-chart"===t.type||"bar-chart"===t.type){f=t.value;return e._setChartValue({value:f,chartType:t.type,attributes:a,formattedAttributes:i,layer:d}),t}return null})).filter(Boolean)},t.prototype._setImageValue=function(e){var t=this.fieldInfoMap,r=e.value,a=e.formattedAttributes,o=e.layer,i=r.linkURL,n=r.sourceURL;if(n){var d=l.fixTokens(n,o);r.sourceURL=l.substituteAttributes({formattedAttributes:a,template:d,fieldInfoMap:t})}if(i){var s=l.fixTokens(i,o);r.linkURL=l.substituteAttributes({formattedAttributes:a,template:s,fieldInfoMap:t})}},t.prototype._setChartValue=function(e){var t=this,a=e.value,o=e.attributes,i=e.formattedAttributes,n=e.chartType,d=e.layer,s=this.popupTemplate,p=this.relatedInfos,f=a.fields,u=a.normalizeField;if(a.fields=l.getFixedFieldNames(f,d),u&&(a.normalizeField=l.getFixedFieldName(u,d)),f.some((function(e){return!!(null!=i[e]||l.isRelatedField(e)&&p.size)}))){var c=null==s?void 0:s.fieldInfos;f.forEach((function(e){if(l.isRelatedField(e))a.series=r.__spreadArrays(a.series,t._getRelatedChartInfos({fieldInfos:c,fieldName:e,formattedAttributes:i,chartType:n,value:a}));else{var d=t._getChartOption({value:a,attributes:o,chartType:n,formattedAttributes:i,fieldName:e,fieldInfos:c});a.series.push(d)}}))}},t.prototype._getRelatedChartInfos=function(e){var t,r=this,a=e.fieldInfos,o=e.fieldName,i=e.formattedAttributes,n=e.chartType,l=e.value,s=[],p=d.getRelatedFieldInfo(o),f=p.layerId,u=p.fieldName,c=null===(t=this.relatedInfos)||void 0===t?void 0:t.get(f.toString());if(!c)return s;var m=c.relatedFeatures,y=c.relation;if(!y||!m)return s;var v=y.cardinality;return m.forEach((function(e){var t=e.attributes;t&&Object.keys(t).forEach((function(e){e===u&&s.push(r._getChartOption({value:l,attributes:t,formattedAttributes:i,fieldName:o,chartType:n,relatedFieldName:e,fieldInfos:a}))}))})),"one-to-many"===v||"many-to-many"===v?s:[s[0]]},t.prototype._getTooltip=function(e){var t=e.label,r=e.value;return"pie-chart"===e.chartType?t:t+": "+r},t.prototype._getChartOption=function(e){var t,r=e.value,a=e.attributes,o=e.formattedAttributes,s=e.fieldName,p=e.relatedFieldName,f=e.fieldInfos,u=e.chartType,c=this.layer,m=r.normalizeField,y=r.tooltipField,v=m?l.isRelatedField(m)?a[d.getRelatedFieldInfo(m).fieldName]:a[m]:null,I=p&&void 0!==a[p]?a[p]:void 0!==a[s]?a[s]:o[s],b=void 0===I?null:I&&v?I/v:I,h=new n({value:b});if(l.isRelatedField(s)){var _=d.getRelatedFieldInfo(s),M=d.getRelatedFieldInfo(y),g=M?M.fieldName:null,F=l.formatValueToFieldInfo(b,{fieldInfos:f,fieldName:p,layer:c,preventPlacesFormatting:!!v}),A=_?_.label||_.fieldName:p,T=g&&void 0!==a[g]?a[g]:A;return h.tooltip=this._getTooltip({label:T,value:F,chartType:u}),h}var x=l.getFieldInfo(f,s),C=l.getFixedFieldName(s,c),N=y&&void 0!==o[y]?o[y]:l.getFieldInfoLabel(x||new i({fieldName:C}),null===(t=this.popupTemplate)||void 0===t?void 0:t.expressionInfos),R=o[C];return h.tooltip=this._getTooltip({label:N,value:R,chartType:u}),h},r.__decorate([o.property()],t.prototype,"activeMediaInfoIndex",void 0),r.__decorate([o.property({readOnly:!0,dependsOn:["formattedMediaInfos","activeMediaInfoIndex"]})],t.prototype,"activeMediaInfo",null),r.__decorate([o.property()],t.prototype,"attributes",void 0),r.__decorate([o.property()],t.prototype,"fieldInfoMap",void 0),r.__decorate([o.property()],t.prototype,"formattedAttributes",void 0),r.__decorate([o.property({readOnly:!0,dependsOn:["attributes","fieldInfoMap","formattedAttributes","mediaInfos","popupTemplate","layer","relatedInfos"]})],t.prototype,"formattedMediaInfos",null),r.__decorate([o.property()],t.prototype,"layer",void 0),r.__decorate([o.property({readOnly:!0,dependsOn:["formattedMediaInfos"]})],t.prototype,"formattedMediaInfoCount",null),r.__decorate([o.property()],t.prototype,"mediaInfos",void 0),r.__decorate([o.property()],t.prototype,"popupTemplate",void 0),r.__decorate([o.property()],t.prototype,"relatedInfos",void 0),t=r.__decorate([o.subclass("esri.widgets.Feature.FeatureMedia.FeatureMediaViewModel")],t)}(a)}));