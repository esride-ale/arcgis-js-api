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

define([],(function(){var n={UP:"Up",RIGHT:"Right",DOWN:"Down",LEFT:"Left",isHorizontal:function(r){return r===n.LEFT||r===n.RIGHT},isSupported:function(r){for(var t in n)if(n[t]===r)return!0;return!1},toSupportedValue:function(r){return n.isSupported(r)?r:n.RIGHT}};return n}));
