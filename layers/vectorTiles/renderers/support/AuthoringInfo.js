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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/JSONSupport","../../core/kebabDictionary","../../core/lang","../../core/accessorSupport/decorators","./AuthoringInfoVisualVariable"],(function(e,t,i,n,r,s,l,o,a){var u=s({esriClassifyEqualInterval:"equal-interval",esriClassifyManual:"manual",esriClassifyNaturalBreaks:"natural-breaks",esriClassifyQuantile:"quantile",esriClassifyStandardDeviation:"standard-deviation"}),p=s({classedSize:"class-breaks-size",classedColor:"class-breaks-color",univariateColorSize:"univariate-color-size"});return function(e){function t(t){var i=e.call(this)||this;return i.lengthUnit=null,i.visualVariables=null,i}return i(t,e),r=t,Object.defineProperty(t.prototype,"classificationMethod",{get:function(){if("class-breaks-size"===this.type||"class-breaks-color"===this.type){var e=this._get("classificationMethod");return e||"manual"}return null},set:function(e){this._set("classificationMethod",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"fields",{get:function(){return"predominance"===this.type?this._get("fields"):null},set:function(e){this._set("fields",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"field1",{get:function(){return"relationship"===this.type?this._get("field1"):null},set:function(e){this._set("field1",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"field2",{get:function(){return"relationship"===this.type?this._get("field2"):null},set:function(e){this._set("field2",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"focus",{get:function(){return"relationship"===this.type?this._get("focus"):null},set:function(e){this._set("focus",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"numClasses",{get:function(){return"relationship"===this.type?this._get("numClasses"):null},set:function(e){this._set("numClasses",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"standardDeviationInterval",{get:function(){return"standard-deviation"===this.classificationMethod?this._get("standardDeviationInterval"):null},set:function(e){this._set("standardDeviationInterval",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"type",{get:function(){return this._get("type")},set:function(e){var t=e;"classed-size"===e?t="class-breaks-size":"classed-color"===e&&(t="class-breaks-color"),this._set("type",t)},enumerable:!0,configurable:!0}),t.prototype.clone=function(){return new r({classificationMethod:this.classificationMethod,fields:this.fields&&this.fields.slice(0),field1:l.clone(this.field1),field2:l.clone(this.field2),focus:this.focus,numClasses:this.numClasses,lengthUnit:this.lengthUnit,standardDeviationInterval:this.standardDeviationInterval,type:this.type,visualVariables:this.visualVariables&&this.visualVariables.map((function(e){return e.clone()}))})},n([o.property({type:String,value:null,dependsOn:["type"],json:{read:u.read,write:u.write}})],t.prototype,"classificationMethod",null),n([o.property({type:[String],value:null,dependsOn:["type"],json:{write:!0}})],t.prototype,"fields",null),n([o.property({value:null,dependsOn:["type"],json:{write:!0}})],t.prototype,"field1",null),n([o.property({value:null,dependsOn:["type"],json:{write:!0}})],t.prototype,"field2",null),n([o.property({type:String,value:null,dependsOn:["type"],json:{write:!0}})],t.prototype,"focus",null),n([o.property({type:Number,value:null,dependsOn:["type"],json:{write:!0}})],t.prototype,"numClasses",null),n([o.property({type:String,json:{read:!1,write:!1,origins:{"web-scene":{read:!0,write:!0}}}})],t.prototype,"lengthUnit",void 0),n([o.property({type:Number,value:null,dependsOn:["classificationMethod"],json:{write:!0}})],t.prototype,"standardDeviationInterval",null),n([o.property({type:String,value:null,json:{read:p.read,write:p.write}})],t.prototype,"type",null),n([o.property({type:[a],json:{write:!0}})],t.prototype,"visualVariables",void 0),t=r=n([o.subclass("esri.renderers.support.AuthoringInfo")],t);var r}(o.declared(r))}));
