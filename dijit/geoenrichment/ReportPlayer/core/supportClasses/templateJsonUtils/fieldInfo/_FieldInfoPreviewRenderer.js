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

define(["dojo/string","./utils","./FieldInfoPreviewSampleUtil","./FieldInfoPreviewAttributeUtil","../../conditionalStyling/ConditionalStyleUtil","esri/dijit/geoenrichment/utils/ObjectUtil","esri/dijit/geoenrichment/utils/DateUtil","../../../grid/coreUtils/sorting/GridSortUtil","../../../grid/coreUtils/GridDataUtil","esri/dijit/geoenrichment/ReportPlayer/countryConfig","../../../sections/dynamicSettings/supportClasses/FilterUtil","dojo/i18n!esri/nls/jsapi","../../../../_devConfig"],(function(e,r,t,i,a,n,l,u,o,s,m,d,f){d=d.geoenrichment.dijit.ReportPlayer.FieldInfoPreview;var c={percent:[10,15,20,25,33,46,72,90,95],percentSmall:[2,3,4,5,6,7],index:[80,99,105,111,113,118,121,130],number:[1150,2013,5006,10135,20456,36813],numberSep:[1150,2013,5006,10135,20456,36813],numberSmall:[10,5,3,7,15]},v=/^MEDAGE|^AVGHHSZ|^UNEMPRT|ECYHSZAVG|ECYPTAMED/,g={percent:{MP19013a_B:72,MP19014a_B:70,EMP_TO_POP:25,NOHS:10,HSG:20,SC:30,BGPD:40,X9074_A:326},percentSmall:{UNEMPRT_CY:5},index:{},number:{MEDHINC_CY:55650,TOTPOP_CY:20456,TOTHH_CY:8546,MEDDI_CY:38290,S01_BUS:11256,S01_EMP:60382,PCI_CY:30382,MEDNW_CY:88548,MEDVAL_CY:352430,X3004_A:5682,ACSMEDCRNT:1227,X5001_A:1762,X1003_A:4073,X4100_A:543,X8001_A:4538,X1130_A:3465,X7001_A:1568,X9008_A:246,X9073_A:158,X9045_A:42,POPGRWCYCY:1.05,POPGRWCYFY:1.12,ECYPTAPOP:20456,ECYHNIMED:55650},numberSep:{MEDHINC_CY:55650,TOTPOP_CY:20456,TOTHH_CY:8546,MEDDI_CY:38290,S01_BUS:11256,S01_EMP:60382,PCI_CY:30382,MEDNW_CY:88548,MEDVAL_CY:352430,X3004_A:5682,ACSMEDCRNT:1227,X5001_A:1762,X1003_A:4073,X4100_A:543,X8001_A:4538,X1130_A:3465,X7001_A:1568,X9008_A:246,X9073_A:158,X9045_A:42,ECYPTAPOP:20456,ECYHNIMED:55650},numberSmall:{AVGHHSZ_CY:2,MEDAGE_CY:36,ECYHSZAVG:2,ECYPTAMED:36},string:{TSEGNAME:"Bright Young Professionals",TLIFECODE:"L8",TLIFENAME:"Middle Ground",TSEGCODE:"8A",CONAME:"Coffee",NAICS:"1234",SIC:"5678",ADDR:"380 New York St, Redlands, CA",STATE:"CA",STATE_NAME:"California",ZIP:"92373",ZIP4:"92373",CITY:"Redlands",STREET:"New York st.",DIRECTION:"SW",FRNCOD:"24"}},p={"Employee/ Population Ratio":"EMP_TO_POP","No High School Diploma":"NOHS","High School Graduate":"HSG","Some College":"SC","Bachelors/Grad/Prof Degree":"BGPD","Tickets to Movies/Museums/Parks: Average":"X9074_A"};var S={};return{getValuePreview:function(e,r){return o.isVariableLikeFieldCell(e)?this._getVariableOrScriptPreview(e,r):this._getNonVariablePreview(e,r)},_getVariableOrScriptPreview:function(e,r){function a(e){return{formattedValue:e,value:e,formatFunction:null,isUnavailableData:!1}}function u(r,t){function i(r){return e.decimals>0?r+=.5432123456789:r=Math.round(r),n.formatNumber(r,{places:e.decimals||0,noSeparator:!e.useThousandsSeparator,preserveTrailingZeroes:!0})}var a=r;return e.decimals>0?(a+=.5432123456789,a=Number(a.toFixed(e.decimals))):a=Math.round(a),{formattedValue:i(r),value:a,formatFunction:function(e){return i(e)},isUnavailableData:!1}}var o=this._getSampleCacheType(e);if(f.preview.bigValues&&("number"===o||"numberSep"===o))return u(1e12);var s=this._getValueFromPreviewFunction(e,r);if(s)return u(s.value,s.propName);var m=t.findNonEmptySample(e);if("string"==typeof m)return a(m);if("number"==typeof m)return u(m);var v=e.type||e.isSiteAttribute&&e.attribute.type,_=e.isSiteAttribute&&i.getAttributePreviewValue(e.attribute);if("esriFieldTypeDate"===v){var P=new Date;return _&&P.setTime(_),a(l.formatDateShort(P))}if("esriFieldTypeString"===v){var C=e.isDataLayerAttribute?e.attribute.name:e.variableID;return a(g.string[C]||_||d.sampleTextValue)}if("number"==typeof _)return u(_);var A=S[o]=S[o]||{},E=e.name+";"+e.decimals,b=A[E];if(!b){if(!(b=g[o][function(e){return e.variableID?e.variableID:e.script&&p[e.script.alias]}(e)])){var D=c[o];b=D[Math.round((D.length-1)*Math.random())]}b=A[E]=b}return u(b)},_getSampleCacheType:function(e){var r=e.statefulName?"p"===e.statefulName.charAt(0):e.showPercent,t=e.statefulName&&"i"===e.statefulName.charAt(0),i=e.hasVariable&&v.test(e.variableID);return r?i?"percentSmall":"percent":t?"index":i?"numberSmall":e.useThousandsSeparator?"numberSep":"number"},_getValueFromPreviewFunction:function(e,r){var t=r.getPreviewValueFunction&&r.getPreviewValueFunction({fieldInfo:e});if(t){var i=this._getSampleCacheType(e);return i=0===i.indexOf("percent")?"percent":"number",{value:(t=t.fields&&t.fields[e.name]||t)[i]||t.value,propName:i}}return null},_getNonVariablePreview:function(t,i){var a=void 0;if(i.getPreviewValueFunction){var n=i.getPreviewValueFunction({fieldInfo:t});n&&(a=(n=n.fields&&n.fields[t.name]||n).formattedValue||n.value)}if(void 0===a)if("headers.AREA_DESC"===t.name&&i.currentFeatureIndex>-1){var l=1+2*i.currentFeatureIndex;a=1===l?s.getSingleUnits()?"1 "+s.getSingleUnits():e.substitute(d.fieldPreviewAreaDescWithRadiusSingular,{radius:l}):s.getPluralUnits()?l+" "+s.getPluralUnits():e.substitute(d.fieldPreviewAreaDescWithRadiusPlural,{radius:l})}else a=r.fields.getPreview(t.name,i.isGraphicReport,i.isMultiFeature)||t.alias;return{formattedValue:a,value:a,formatFunction:null,isUnavailableData:!1}},getConditionalStylePreview:function(e,r){if(e.triggerJson&&void 0!==r.rowIndex){var t=this._getValueFromPreviewFunction(e,r);if(t)return{style:a.getConditionalStyle(t.value,e.triggerJson),value:t.value};var i=e.triggerJson.cases[r.rowIndex%e.triggerJson.cases.length];if(i){var n,l=a.styleFromSetters(i.setters);if(1===i.compareInfos.length){n=Number(i.compareInfos[0].value);var u=i.compareInfos[0].operator;">"===u?n++:"<"===u&&n--}else 2===i.compareInfos.length&&(n=(Number(i.compareInfos[1].value)+Number(i.compareInfos[0].value))/2);return{style:l,value:n}}return null}return null},getRangeFilterPreview:function(e){if(e.presetFilter&&m.isRangeType(e.presetFilter.method)){if(e.presetFilter.columnIndex!==e.columnIndex)return null;var r=m.getRangeStatistics(e.presetFilter.ranges),t=r.min,i=r.max;isFinite(t)||isFinite(i)?isFinite(i)?isFinite(t)||(t=0===i?0:i>0?i/2:2*i):i=0!==t?Math.abs(2*t):100:(t=0,i=100);var a=(i-t)/e.numRows;return{value:t+a*e.rowIndex,_min:t,_max:i,_step:a}}},getSortingPreview:function(e){var r=e.presetFilter&&this.getRangeFilterPreview(e);if(!e.presetSorting.order||e.presetSorting.field!==e.columnField)return r;var t=100,i=0,a=i+e.numRows*t;return r&&(i=r._min,a=r._max,t=r._step),{value:e.presetSorting.order===u.ORDER_ASC?i+e.rowIndex*t:a-e.rowIndex*t}}}}));
