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

define(["dojo/_base/lang","esri/dijit/geoenrichment/promise/all","esri/dijit/geoenrichment/when","../../supportClasses/tableJson/TableJsonUtil","../../supportClasses/tableJson/TableJsonResizeUtil","./AreaDetailsLayouts","../../../dataProvider/supportClasses/attachments/AttributesUtil","../../sections/SectionTypes","esri/dijit/geoenrichment/utils/FieldUtil","dojo/i18n!esri/nls/jsapi"],(function(t,e,n,o,r,a,i,l,s,u){u=u.geoenrichment.dijit.ReportPlayer.AreaDetailsInfographic;var c={buildDataInfo:function(t){return n(c._calcBuildInfo(t),(function(e){if(!e)return null;var n,o=c._createAttributesSectionJsons(e.attributes,t.infographicJson,t.defaultCellStyle),a=c._createNotesSectionJsons(e.notes,t.infographicJson,t.defaultCellStyle);if(e.canFitOnSinglePage)if(o.length)if(a.length){var i=o[0],l=a[0].stack[0];l.style.top=e.attributes.totalHeight,i.stack.push(l),n=[i]}else n=o;else n=a;else(n=(n=(n=[]).concat(o)).concat(a)).forEach((function(n){r.resizeTableJsonToFitWidth(n.stack[0],t.width),t.scaleToFitHeight&&r.resizeTableJsonToFitHeight(n.stack[0],e.contentHeight-t.footerHeight)}));return n.length?{sectionJsons:n,stats:{numAttributesTotal:e.attributes.numTotal,numAttributesShown:e.attributes.numShown,numNotesTotal:e.notes.numTotal,numNotesShown:e.notes.numShown}}:null}))},_calcBuildInfo:function(t){var e=t.infographicJson,r=t.titleHeight,i=t.minRowHeight,l=t.scaleToFitHeight,s=t.footerHeight,u=t.searchTextRe,h=t.forceSinglePage,m=t.width,f=t.height;return n(c._getData(t),(function(t){var n=t.attrs||[],g=t.benchmarkAttrs,d=t.notes||[];if(e.attributesSectionJson||(n=[]),e.notesSectionJson||(d=[]),!n.length&&!d.length)return null;var w,S,b=n.length,T=d.length;u&&(n=n.filter((function(t){return u.test(t.alias)})),d=d.filter((function(t){return u.test(t.text)}))),w=n.length,S=d.length;var y=n.length,A=d.length,p=e.attributesLayout===a.ATTRS_2COLUMNS;function v(t){return(p?Math.round(t.length/2):t.length)+(e.showAttributesTitle?1:0)}var _,J=p?Math.round(n.length/2):n.length,C=v(n),H=d.length,R=H+(e.showNotesTitle?1:0),k=C+R,x=f-r,N=Math.max(i||o.DEFAULT_ROW_HEIGHT,x/k),I=y&&e.showAttributesTitle?N:0,F=y?N:0,P=A&&e.showNotesTitle?N:0,E=A?N:0;l||(y&&(e.showAttributesTitle&&(_=e.attributesSectionJson.stack[0].data.data[0])&&(I=_.style.height),(_=e.attributesSectionJson.stack[0].data.data[e.showAttributesTitle?1:0])&&(F=_.style.height)),A&&(e.showNotesTitle&&(_=e.notesSectionJson.stack[0].data.data[0])&&(P=_.style.height),(_=e.notesSectionJson.stack[0].data.data[e.showNotesTitle?1:0])&&(E=_.style.height)));var D,O,U=h||I+F*J+P+E*H<=x+1;return U?(D=[{attrs:n,numRows:C}],O=[{notes:d,numRows:R}]):(D=c._splitByPages(n,I,F*(p?.5:1),x,s).map((function(t){return{attrs:t,numRows:v(t)}})),O=c._splitByPages(d,P,E,x,s).map((function(t){return{notes:t,numRows:t.length+(e.showNotesTitle?1:0)}}))),{canFitOnSinglePage:U,contentHeight:x,attributes:{attrGroups:D,numColumns:p?4:2,titleRowH:I,dataRowH:F,width:m,numTotal:b,numShown:w,totalHeight:I+F*J,benchmarkAttrs:g},notes:{noteGroups:O,numColumns:1,titleRowH:P,dataRowH:E,width:m,numTotal:T,numShown:S,totalHeight:P+E*H}}}))},_getData:function(t){var o=t.attachmentsStore;return o?(o.supportsMultipleAreas&&o.setCurrentAnalysisAreaIndex(t.currentFeatureIndex),e([o.getAttributes(),o.getNotes()]).then((function(e){var r={attrs:e[0]||[],notes:e[1]||[]};return t.benchmarkController&&t.benchmarkController.getAreaIndex()>=0&&t.benchmarkController.getAreaIndex()!==t.currentFeatureIndex&&o.supportsMultipleAreas?(o.setCurrentAnalysisAreaIndex(t.benchmarkController.getAreaIndex()),n(o.getAttributes(),(function(t){return t&&(r.benchmarkAttrs={},t.forEach((function(t){r.benchmarkAttrs[t.name]=t}))),r}))):r}))):{}},_splitByPages:function(t,e,n,o,r){var a,i=o-r,l=[],s=0;return t.forEach((function(t){a||(a=[],l.push(a),s+=e),a.push(t),(s+=n)+n>i&&(a=null,s=0)})),l},_createAttributesSectionJsons:function(e,n,r){var h=c._getSourceSectionStyle(n.attributesSectionJson,n.showAttributesTitle);return e.attrGroups.map((function(m){var f=m.attrs,g=m.numRows;if(!f.length)return null;var d=o.createTable({numColumns:e.numColumns,numRows:g,style:{width:e.width},useDefaultHeaderTheme:!1}),w=0;function S(t,e,n){return c._getCellStyle(t,e,n,h,r)}var b=n.attributesLayout===a.ATTRS_2COLUMNS;function T(n,r,a){r=r||0,o.modifyTableJson(d,w,0+r,{text:n?n.alias:"",cellStyle:S(!1,0+r,a),height:e.dataRowH});var l=i.formatAttributeValue(n),u=e.benchmarkAttrs&&e.benchmarkAttrs[n.name];if(u&&s.isNumericField(n)){var c=n.value-u.value;l+=" ("+(c>0?"+":"")+i.formatAttributeValue(t.mixin({},n,{value:c,domain:null}))+")"}o.modifyTableJson(d,w,1+r,{text:l,cellStyle:S(!1,1+r,a)})}n.showAttributesTitle&&(o.modifyTableJson(d,w,0,{text:h.title||u.attributes,columnSpan:e.numColumns,cellStyle:S(!0,0,-1),height:e.titleRowH}),w++);for(var y=0,A=0;A<f.length;A++){var p=f[A];T(p,0,y),b&&T(p=f[++A],e.numColumns/2,y),w++,y++}return{type:l.INFOGRAPHIC_ATTRIBUTES,stack:[d]}})).filter((function(t){return!!t}))},_createNotesSectionJsons:function(t,e,n){var r=c._getSourceSectionStyle(e.notesSectionJson,e.showNotesTitle);return t.noteGroups.map((function(a){var i=a.notes,s=a.numRows;if(!i.length)return null;var h=o.createTable({numColumns:t.numColumns,numRows:s,style:{width:t.width},useDefaultHeaderTheme:!1}),m=0;function f(t,e){return c._getCellStyle(t,0,e,r,n)}e.showNotesTitle&&(o.modifyTableJson(h,m,0,{text:r.title||u.notes,cellStyle:f(!0,-1),height:t.titleRowH}),m++);var g=0;return i.forEach((function(e){o.modifyTableJson(h,m,0,{text:e.text,cellStyle:f(!1,g),height:t.dataRowH}),m++,g++})),{type:l.INFOGRAPHIC_NOTES,stack:[h]}})).filter((function(t){return!!t}))},_getSourceSectionStyle:function(t,e){var n={titleStyle:null,title:null};if(t){var o=t.stack[0],r=o.data.columns[0].field,a=0;if(e){var i=o.data.data[a++];i&&(n.titleStyle=i.style.fields[r],n.title=i[r])}for(var l=0;o.data.data[a];){var s=o.data.data[a++];o.data.columns.forEach((function(t,e){n["row"+l+"_column"+e]=s.style.fields[t.field]})),l++}}return n},_getCellStyle:function(e,n,o,r,a){var i,l=o%2!=0,s=n%2!=0;e?i=r.titleStyle:(i=r["row"+o+"_column"+n])||(i=l?r["row1_column"+n]||(s?r.row1_column1:r.row1_column0)||r.row1_column0:r["row0_column"+n]||(s?r.row0_column1:r.row0_column0)||r.row0_column0);var u=t.mixin({verticalAlign:"middle",horizontalAlign:s?"right":void 0,horizontalPadding:e||n>0?5:20},a);return e&&(u.fontSize*=1.2),t.mixin(u,i),u}};return c}));
