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

define(["require","exports","../../../../config","../../../../core/Error","../../../../core/Logger","../../../../core/promiseUtils","./CIMSymbolHelper","./fontUtils","./GlyphMosaic","./GlyphSource","./SDFHelper","./SpriteMosaic","./Utils","../../../3d/support/imageUtils","../../../support/screenshotUtils","./SDFConverter"],(function(e,t,r,i,a,s,n,o,l,p,h,u,c,y,m,f){var d=a.getLogger("esri.views.2d.engine.webgl.TextureManager");return function(){function e(){this._invalidFontsMap=new Map,this._spriteMosaic=new u(1024,1024,500),this._glyphSource=new p(r.fontsUrl+"/{fontstack}/{range}.pbf"),this._glyphMosaic=new l(1024,1024,this._glyphSource),this._sdfConverter=new f.default(126)}return Object.defineProperty(e.prototype,"sprites",{get:function(){return this._spriteMosaic},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"glyphs",{get:function(){return this._glyphMosaic},enumerable:!0,configurable:!0}),e.prototype.dispose=function(){this._spriteMosaic.dispose(),this._glyphMosaic.dispose(),this._rasterizationCanvas=null},e.prototype.rasterizeItem=function(e,t){return void 0===t&&(t=null),e?e.type&&-1!==e.type.toLowerCase().indexOf("3d")?(d.error(new i("mapview-invalid-type","Mapviewer does not support 3d symbol type: "+e.type,e)),s.resolve({glyphMosaicItems:[],spriteMosaicItem:null})):!e.type||"text"!==e.type&&"esriTS"!==e.type?this._rasterizeSpriteSymbol(e).then((function(e){return{spriteMosaicItem:e}})):this._rasterizeTextSymbol(e,t).then((function(e){return{glyphMosaicItems:e}})):(d.error(new i("mapview-null-resource","Unable to rasterize null resource")),s.resolve(null))},e.prototype.bindSpritePage=function(e,t,r,i){i||(i=9729),this._spriteMosaic.bind(e,i,t,r)},e.prototype.bindGlyphsPage=function(e,t,r){this._glyphMosaic.bind(e,9729,t,r)},e.prototype._rasterizeTextSymbol=function(e,t){var r=this,a=o.getFullyQualifiedFontName(e.font),s=this._invalidFontsMap.has(a);return this._glyphMosaic.getGlyphItems(s?"arial-unicode-ms-regular":a,t).catch((function(e){return d.error(new i("mapview-invalid-resource","Couldn't find font "+a+". Falling back to Arial Unicode MS Regular")),r._invalidFontsMap.set(a,!0),r._glyphMosaic.getGlyphItems("arial-unicode-ms-regular",t)}))},e.prototype._rasterizeSpriteSymbol=function(e){var t=this;if(e&&(c.isFillSymbol(e)||c.isLineSymbol(e))&&"style"in e&&("solid"===e.style||"esriSFSSolid"===e.style||"esriSLSSolid"===e.style||"none"===e.style||"esriSFSNull"===e.style||"esriSLSNull"===e.style))return s.resolve(null);var r=function(e){if(e.type){switch(c.normalizeSymbolType(e.type)){case"simple-marker":return e.path?"simple-marker"+e.style+e.path:"simple-marker"+e.style;case"simple-line":return"simple-line"+e.style}if(c.isPictureSymbol(e))return e.url?e.url:e.imageData+""+e.width+e.height}return JSON.stringify(e)}(e);if(this._spriteMosaic.has(r))return s.resolve(this._spriteMosaic.getSpriteItem(r));if("simple-marker"!==e.type&&"esriSMS"!==e.type||!e.path){if(e.url||e.imageData){var i=e.imageData?"data:"+e.contentType+";base64,"+e.imageData:e.url;return y.requestImage(i).then((function(i){var a=t._rasterizeResource(i);return t._addItemToMosaic(r,a.size,a.anchor,a.image,!c.isMarkerSymbol(e),a.sdf)}))}var a=this._rasterizeResource(e);return s.resolve(this._addItemToMosaic(r,a.size,a.anchor,a.image,!c.isMarkerSymbol(e),a.sdf))}var n=[126,126],o=this;return this._sdfConverter.draw(e.path).then((function(e){return o._addItemToMosaic(r,n,[0,0],new Uint32Array(e.buffer),!1,!0)}))},e.prototype._rasterizeResource=function(e){if(e instanceof HTMLImageElement){this._rasterizationCanvas||(this._rasterizationCanvas=document.createElement("canvas"));var t=e;this._rasterizationCanvas.width=t.width,this._rasterizationCanvas.height=t.height;var r=this._rasterizationCanvas.getContext("2d");r.drawImage(t,0,0,t.width,t.height);for(var i=r.getImageData(0,0,t.width,t.height),a=new Uint8Array(i.data),s=void 0,n=0;n<a.length;n+=4)s=a[n+3]/255,a[n]=a[n]*s,a[n+1]=a[n+1]*s,a[n+2]=a[n+2]*s;var o=t.width,l=t.height,p=a;if(o>=500||l>=500){var h=t.width/t.height;h>1?(o=500,l=Math.round(500/h)):(l=500,o=Math.round(500*h)),p=new Uint8Array(4*o*l),m.resampleHermite(a,t.width,t.height,new Uint8ClampedArray(p.buffer),o,l,!1)}return{size:[o,l],anchor:[0,0],image:new Uint32Array(p.buffer),sdf:!1}}return this._rasterizeJSON(e)},e.prototype._addItemToMosaic=function(e,t,r,i,a,s){return this._spriteMosaic.addSpriteItem(e,t,r,i,a,s)},e.prototype._rasterizeJSON=function(e){if(this._rasterizationCanvas||(this._rasterizationCanvas=document.createElement("canvas")),"simple-fill"===e.type||"esriSFS"===e.type){var t=n.SymbolHelper.rasterizeSimpleFill(this._rasterizationCanvas,e.style),r=t[0];return{size:[t[1],t[2]],anchor:[0,0],image:new Uint32Array(r.buffer),sdf:!1}}if("simple-line"===e.type||"esriSLS"===e.type){var i=n.SymbolHelper.rasterizeSimpleLine(this._rasterizationCanvas,e.style);r=i[0];return{size:[i[1],i[2]],anchor:[0,0],image:new Uint32Array(r.buffer),sdf:!0}}var a,s;if("simple-marker"===e.type||"esriSMS"===e.type?(a=n.CIMSymbolHelper.fromSimpleMarker(e),s=!0):(a=e,s=h.SDFHelper.checkSDF(a)),s){var o=(new h.SDFHelper).buildSDF(a);r=o[0];return{size:[o[1],o[2]],anchor:[0,0],image:new Uint32Array(r.buffer),sdf:!0}}var l=n.CIMSymbolHelper.rasterize(this._rasterizationCanvas,a);r=l[0];return{size:[l[1],l[2]],anchor:[l[3],l[4]],image:new Uint32Array(r.buffer),sdf:!1}},e}()}));
