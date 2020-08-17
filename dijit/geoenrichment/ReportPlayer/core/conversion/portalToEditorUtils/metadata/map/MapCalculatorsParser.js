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

define(["esri/dijit/geoenrichment/utils/JsonXmlConverter","./MetadataToRendererParser","./MapTagsUtil","esri/dijit/geoenrichment/utils/ImageUtil"],(function(e,t,r,a){var s={parseMapCalculators:function(t,r,a){e.queryJson(t,"Maps").forEach((function(t){e.queryJson(t,"Map").forEach((function(e){var o=s._parsePortalLayers(e),i=s._parseStudyAreas(e),u={fieldName:e.attributes.Name,width:Number(e.attributes.Width),height:Number(e.attributes.Height),defaultBasemapId:o.defaultBasemapId,webMapId:o.webMapId,additionalLayerInfos:s._parseAdditionalLayers(e,r),pinSymbolJson:s._parseSiteLayerPinSymbol(e,a),areaSymbolJsons:i.symbolJsons,areaSymbolRamp:i.ramp,mapScale:Number(e.attributes.Scale)||null};r&&(r.metadata.mapImageInfosHash[t.attributes.Name+"."+e.attributes.Name]=u)}))}))},_parsePortalLayers:function(t){var r,a,s=e.queryJson(t,"Layer").filter((function(e){return!!e.attributes.PortalItemId}));return s.length>1&&(r=s.shift()),a=s.shift(),{defaultBasemapId:r&&r.attributes.PortalItemId,webMapId:a&&a.attributes.PortalItemId}},_parseAdditionalLayers:function(r,a){var s=[];return e.queryJson(r,/^(Layer|LocatorResultsLayer|ComparisonResultsLayer)$/).filter((function(e){return!!e.attributes.ServiceUrl||"LocatorResultsLayer"===e.name||"ComparisonResultsLayer"===e.name})).forEach((function(e){if(e.attributes.ServiceUrl)s.push({url:e.attributes.ServiceUrl});else if("LocatorResultsLayer"===e.name){var r=e.tags&&e.tags.filter((function(e){return"Renderer"===e.name}))[0],o=a.metadata.locatorCalculatorsHash[e.attributes.CalculatorName];o.isValid&&s.push({isLocatorLayer:!0,layerName:e.attributes.LayerName,calculatorName:e.attributes.CalculatorName,calculatorInfo:o,rendererJson:r&&t.parseRendererJson(r)})}else if("ComparisonResultsLayer"===e.name){var i=(r=e.tags&&e.tags.filter((function(e){return"Renderer"===e.name}))[0])&&t.parseRendererJson(r);if(i&&"esriTS"===i.uniqueValueInfos[0].symbol.type)s[s.length-1].labelRendererJson=i;else{var u=e.tags&&e.tags.filter((function(e){return"LabelingInfo"===e.name}))[0],n=u&&t.parseLabelRendererJson(u);s.push({isComparisonLayer:!0,calculatorName:e.attributes.CalculatorName,rendererJson:i,labelRendererJson:n})}}})),s.length&&s},_parseSiteLayerPinSymbol:function(t,s){var o,i=e.queryJson(t,"SiteLayer")[0];if(i){var u=e.queryJson(i,"Symbol")[0];if(u&&"Image"===u.attributes.Type){var n=s.getImageData(u.attributes.Name);n&&(o={type:"esriPMS",contentType:a.getContentType(n),imageData:a.base64DataFromDataURL(n),url:u.attributes.Url,width:Number(u.attributes.Width),height:Number(u.attributes.Height),angle:Number(u.attributes.Angle)||0,xoffset:Number(u.attributes.XOffset)||0,yoffset:Number(u.attributes.YOffset)||0})}else if(u&&"Marker"===u.attributes.Type){var l=e.queryJson(u,"Fill")[0],y=l&&e.queryJson(l,"Color")[0],m=e.queryJson(u,"Outline")[0],b=m&&e.queryJson(m,"Color")[0];o={type:"esriSMS",style:"esriSMS"+(u.attributes.Style||"Circle"),size:Number(u.attributes.Size),angle:Number(u.attributes.Angle)||0,xoffset:Number(u.attributes.XOffset)||0,yoffset:Number(u.attributes.YOffset)||0,color:r.parseColorTag(y),outline:m&&{type:"esriSLS",color:r.parseColorTag(b),style:"esriSLS"+(m.attributes.Style||"Solid"),width:void 0===m.attributes.Width?0:Number(m.attributes.Width)}}}}return o},_parseStudyAreas:function(t){var r,a=e.queryJson(t,"StudyAreasLayer")[0],o=a&&e.queryTopJson(a,"SymbolsPalette")[0],i=(o&&e.queryTopJson(o,"Symbol")||[]).map(s._parseAreaSymbol),u=o&&e.queryTopJson(o,"SymbolRamp")[0];if(u){var n=e.queryTopJson(u,"First")[0],l=e.queryTopJson(u,"Last")[0];n=n&&e.queryTopJson(n,"Symbol")[0],l=l&&e.queryTopJson(l,"Symbol")[0],n&&l&&(r=[n,l].map(s._parseAreaSymbol))}return{ramp:r,symbolJsons:i}},_parseAreaSymbol:function(t){var a=e.queryJson(t,"Fill")[0],s=a&&e.queryJson(a,"Color")[0],o=e.queryJson(t,"Outline")[0],i=o&&e.queryJson(o,"Color")[0];return{type:"esriSFS",style:"esriSFSSolid",color:r.parseColorTag(s)||[0,0,0,1],outline:o&&{type:"esriSLS",color:r.parseColorTag(i),style:"esriSLS"+(o.attributes.Style||"Solid"),width:void 0===o.attributes.Width?0:Number(o.attributes.Width)}}}};return s}));
