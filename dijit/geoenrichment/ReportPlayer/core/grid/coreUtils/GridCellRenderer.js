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

define(["dojo/_base/declare","dojo/_base/lang","dojo/aspect","esri/dijit/geoenrichment/ReportPlayer/config","esri/dijit/geoenrichment/utils/ObjectUtil","esri/dijit/geoenrichment/utils/WaitingUtil","./GridDataUtil","./GridStyleUtil","./GridCellContentScaler","./GridCellContentSynchronizer","../../supportClasses/conditionalStyling/ConditionalStyleUtil","../../supportClasses/templateJsonUtils/fieldInfo/FieldInfoRenderer","esri/dijit/geoenrichment/ReportPlayer/core/sections/SectionTypes","esri/dijit/geoenrichment/ReportPlayer/core/supportClasses/ElementUsageTypes","esri/dijit/geoenrichment/ReportPlayer/core/supportClasses/ViewModes","esri/dijit/geoenrichment/ReportPlayer/core/supportClasses/SpecificViewModes","./GridQueryUtil","./tooltip/GridCellTooltipBuilder","esri/dijit/geoenrichment/ReportPlayer/config","../../../_devConfig"],(function(e,t,n,i,r,o,a,l,d,s,u,c,g,h,m,C,p,f,v,F){var I={color:"#FF0000"},w={color:"#AAAAAA",fontStyle:"italic",fontSize:13,horizontalAlign:"center",verticalAlign:"middle"};function y(e){return e[e.parentGrid.hasRealBorders?"getContentWidth":"getWidth"]()}function S(e){return e[e.parentGrid.hasRealBorders?"getContentHeight":"getHeight"]()}var _=e(null,{_parentState:null,constructor:function(e,t,i){var r=this;d.fitContentInsideCell(e),this._setParentState(e),i.forEach((function(i){var o=i[0],a=i[1];t.own(n.after(e,o,(function(){r._checkParentChanged(a,e)&&(d.fitContentInsideCell(e),s.syncParentFieldInfoWithElementState(e,t))})))}))},_setParentState:function(e){var t=e.getFullStyle();this._parentState={width:y(e),height:S(e),horizontalAlign:t.horizontalAlign,verticalAlign:t.verticalAlign}},_checkParentChanged:function(e,t){var n;switch(e){case"width":var i=y(t);this._parentState.width!==i&&(this._parentState.width=i,n=!0);break;case"height":var r=S(t);this._parentState.height!==r&&(this._parentState.height=r,n=!0);break;case"horizontalAlign":case"verticalAlign":var o=t.getFullStyle();this._parentState.horizontalAlign===o.horizontalAlign&&this._parentState.verticalAlign===o.verticalAlign||(this._parentState.horizontalAlign=o.horizontalAlign,this._parentState.verticalAlign=o.verticalAlign,n=!0)}return n}});return e(null,{renderCellContent:function(e){var t=e.parentGrid,n=a.getFieldInfo(e);if(F.emulateErrors.reportContainerRenderError)throw new Error("Error test: something crashed when building the UI layout!");try{if(n){if(n.isReportSection)return this._placeReportSectionInCell(t,e);if(n.isInfographic)return this._placeInfographicInCell(t,e);if(n.isChart)return this._placeChartInCell(t,e);if(n.isMap)return this._placeMapInCell(t,e);if(n.isImage)return this._renderCellTooltip(e),this._placeImageInCell(t,e);if(n.isShape)return this._placeShapeInCell(t,e);n.isMissing&&e.setStyle(I),n.isUnsupportedContent&&e.setStyle(w)}this._applyRenderedContent(e,this._getRenderedContent(e)),e.setContent(null),this._renderCellTooltip(e)}catch(e){if(console.log(e),!v.tables.leaveEmptyCellsUponError)throw e}},_renderCellTooltip:function(e){if(e.viewModel.dynamicReportInfo&&!i.isPlayerOnServer){var t=e.viewModel.dynamicReportInfo.templateVariableProvider;f.setDynamicTooltipToCell(e,t)}},updateViewMode:function(e){var t=a.getFieldInfo(e);t&&(t.hasVariable||t.script||t.alias||t.isRichText)&&this._applyRenderedContent(e,this._getRenderedContent(e))},getRenderedContent:function(e){return this._getRenderedContent(e)},_getRenderedContent:function(e,n){var i,r=a.getFieldInfo(e);if(r){var o=this._prepareRenderContextForFieldCell(e);return t.mixin(o,n),r.isImage&&r.triggerJson&&r.triggerJson.fieldInfo&&(r=r.triggerJson.fieldInfo),c.renderFieldInfoInTableCell(r,o)}return{formattedValue:null==(i=e.gridData[e.column.field])||"number"==typeof i&&isNaN(i)?"":i,value:i,formatFunction:null,isUnavailableData:!1,conditionalStyle:null}},_prepareRenderContextForFieldCell:function(e){var t=e.parentGrid,n=t.getViewMode()===m.EDIT,i=this._getCellBenchmarkInfoBuilder(e);return{previewValues:this._isPreviewValues(e),previewConditionalStyle:!n,getPreviewValueFunction:t.getPreviewValueFunction,fieldData:t.viewModel.dynamicReportInfo&&t.viewModel.dynamicReportInfo.fieldData,currentFeatureIndex:t.getFeatureIndexForCell(e),currentFeatureAttributes:t.currentFeatureAttributes,rowIndex:e.gridData&&e.gridData.index,columnIndex:e.column&&e.column.index,columnField:e.column&&e.column.field,numRows:t.store.data.length,isGraphicReport:t.viewModel.isGraphicStyle,isMultiFeature:t.viewModel.dynamicReportInfo&&t.viewModel.dynamicReportInfo.isMultiFeature,presetFilter:!n&&t.presetFilter,presetSorting:!n&&t.presetSorting,isBenchmarked:!!i,getBenchmarkInfo:i&&i.getBenchmarkInfo}},_isPreviewValues:function(e){var t=e.parentGrid,n=a.getFieldInfo(e),i=t.getSpecificViewMode(),r=t.getViewMode()===m.PREVIEW_VALUES;return n&&n.name&&0===n.name.indexOf("SiteNote")&&(r=!0),i&&n&&(i[C.RICH_TEXT]===m.PREVIEW_VALUES&&n.isRichText?r=!0:i[C.VARIABLE]===m.PREVIEW_VALUES&&a.isVariableLikeFieldCell(n)?r=!0:i[C.SPECIAL]===m.PREVIEW_VALUES&&a.isSpecialFieldCell(n)?r=!0:i[C.INFOGRAPHIC]===m.PREVIEW_VALUES&&n.isInfographic&&(r=!0)),r},_applyRenderedContent:function(e,t){t&&(this._setCellFormattedValue(e,t),t.isUnavailableData||("number"!=typeof t.value||isNaN(t.value)||(a.setNumericCellValue(e,t.value),e.setNumberValue(t.value,t.formatFunction,e.parentGrid.enableNumberAnimation)),t.conditionalStyle?(e.setStyle(t.conditionalStyle.style),"string"==typeof t.conditionalStyle.formattedValue&&this._setCellFormattedValue(e,t.conditionalStyle),e.__hasConditionalStyle=!0):!1===t.conditionalStyle||e.__hasConditionalStyle?(delete e.__hasConditionalStyle,e.setStyle(l.combineCellStyle(e.parentGrid,e.gridData,e.column))):t.modifiedValue&&"string"==typeof t.modifiedValue.formattedValue&&this._setCellFormattedValue(e,t.modifiedValue)),e.parentGrid&&e.parentGrid.viewModel.dynamicReportInfo&&e.setUrl(a.getFieldCellUrl(e)))},_setCellFormattedValue:function(e,t){if("number"==typeof t.value&&!isNaN(t.value)){var n=this._getCellBenchmarkInfoBuilder(e);n&&e.setBenchmarkInfo(n.getBenchmarkInfo(t.value))}a.setFieldCellContent(e,t.formattedValue)},_getCellBenchmarkInfoBuilder:function(e){var t=this,n=e.parentGrid;return n.viewModel.isBenchmarkedArea&&n.viewModel.isBenchmarkedArea(n.getFeatureIndexForCell(e))&&{isBenchmarked:!0,getBenchmarkInfo:function(i,o){var a=e;o&&((a={gridData:{fieldInfos:{}},column:e.column,parentGrid:n}).gridData.fieldInfos[a.column.field]=o);var l=t._getRenderedContent(a,{currentFeatureIndex:n.viewModel.getBenchmarkController().getAreaIndex()}),d=i-l.value;return{ownValue:i,isGreater:d>=0,value:Math.abs(d),formattedValue:l.formatFunction?l.formatFunction(Math.abs(d)):r.formatNumber(Math.abs(d)),noTextLimit:n.viewModel.getBenchmarkController().hasNoTextLimit()}}}},_placeReportSectionInCell:function(e,t){var n=this,i={};function r(){if(t.domNode)return n._createReportSectionFromParams(e,t,i)}i.class="adjustableGrid_inCellSection",i.json=a.getFieldInfo(t).sectionJson,i.viewModel=e.viewModel,i.theme=e.theme,i.viewPortContainer=e.viewPortContainer,i.parentWidget=t,i.currentFeatureIndex=e.getFeatureIndexForCell(t),i.currentFeatureAttributes=e.currentFeatureAttributes,i.initialWidth=y(t),i.initialHeight=S(t),i.noContentOffset=p.cellHasFloatingTableParent(t),i.initialViewMode=e.getViewMode(),i.onContentLoadingStart=e.onContentLoadingStart.bind(e),i.onContentLoadingEnd=e.onContentLoadingEnd.bind(e),i.parentGridCell=t,i.elementUsageType=(e.isReportContainerPageGrid||e.parentGrid&&e.parentGrid.isReportContainerPageGrid)&&h.PAGE_PANEL_SECTION;var l=e.viewModel.layoutBuilder.getClass("section");return l.isAsync?o.showProgressPromise(t.domNode,l.loadModules()).then(r):r()},_createReportSectionFromParams:function(e,t,n){var i;return i=!n.json||!n.json.stack||n.json.type===g.EMPTY?e.viewModel.layoutBuilder.createElement("emptySection",n,t.getContentContainerNode()):e.viewModel.layoutBuilder.createElement("section",n,t.getContentContainerNode()),t.setContent(i),new _(t,i,[["onWidthChanged","width"],["onHeightChanged","height"]]),i},_placeInfographicInCell:function(e,t){var n=this,i=a.getFieldInfo(t).infographicJson,r={viewModel:e.viewModel,theme:e.theme,parentWidget:t,currentFeatureIndex:e.getFeatureIndexForCell(t),currentFeatureAttributes:e.currentFeatureAttributes,getPreviewValueFunction:e.getPreviewValueFunction,width:y(t),height:S(t),adjustElementsWhenResized:p.cellHasFloatingTableParent(t),onContentLoadingStart:e.onContentLoadingStart.bind(e),onContentLoadingEnd:e.onContentLoadingEnd.bind(e)};function l(){if(t.domNode)return n._createInfographicFromParams(e,t,i,r)}var d=e.viewModel.layoutBuilder.getClass("infographic");return d.isAsync?o.showProgressPromise(t.domNode,d.loadModules()).then(l):l()},_createInfographicFromParams:function(e,t,n,i){var r=e.viewModel.layoutBuilder.createElement("infographic",{node:t.getContentContainerNode(),placeFunc:function(e){t.setContent(e)},json:n,creationParams:i});return r.setViewMode&&r.setViewMode(e.getViewMode()),new _(t,r,[["onWidthChanged","width"],["onHeightChanged","height"]]),r},_placeChartInCell:function(e,t){var n=this,i={viewModel:e.viewModel,theme:e.theme,currentFeatureIndex:e.getFeatureIndexForCell(t),currentFeatureAttributes:e.currentFeatureAttributes,parentWidget:t,onContentLoadingStart:e.onContentLoadingStart.bind(e),onContentLoadingEnd:e.onContentLoadingEnd.bind(e)},r=a.getFieldInfo(t).chartJson;function l(){if(t.domNode)return n._createChartPageFromParams(e,t,r,i)}r.visualProperties.width=t.getWidth(),r.visualProperties.height=t.getHeight();var d=e.viewModel.layoutBuilder.getClass("chart");return d.isAsync?o.showProgressPromise(t.domNode,d.loadModules()).then(l):l()},_createChartPageFromParams:function(e,t,n,i){var r=e.viewModel.layoutBuilder.createElement("chart",{node:t.getContentContainerNode(),placeFunc:function(e){t.setContent(e)},json:n,creationParams:i});return new _(t,r,[["onWidthChanged","width"],["onHeightChanged","height"]]),r},_placeMapInCell:function(e,t){var n=this,i=a.getFieldInfo(t).mapJson,r=(y(t),S(t),{viewModel:e.viewModel,theme:e.theme,parentWidget:t,currentFeatureIndex:e.getFeatureIndexForCell(t),currentFeatureAttributes:e.currentFeatureAttributes,onContentLoadingStart:e.onContentLoadingStart.bind(e),onContentLoadingEnd:e.onContentLoadingEnd.bind(e)});function l(){if(t.domNode)return n._createMapFromParams(e,t,i,r)}var d=e.viewModel.layoutBuilder.getClass("map");return d.isAsync?o.showProgressPromise(t.domNode,d.loadModules()).then(l):l()},_createMapFromParams:function(e,t,n,i){var r=e.viewModel.layoutBuilder.createElement("map",{node:t.getContentContainerNode(),placeFunc:function(e){t.setContent(e)},json:n,creationParams:i});return new _(t,r,[["onWidthChanged","width"],["onHeightChanged","height"],["setStyle","horizontalAlign"]]),r},_placeImageInCell:function(e,t){var n,i=this,r=a.getFieldInfo(t),o=r.imageJson,l=y(t),d=S(t);if(r.triggerJson)if(e.viewModel.dynamicReportInfo){var s=c.getValueFromFieldData(r.triggerJson.fieldInfo,{fieldData:e.viewModel.dynamicReportInfo.fieldData,currentFeatureIndex:e.getFeatureIndexForCell(t),currentFeatureAttributes:e.currentFeatureAttributes});u.processImageJsonForTrigger(o,s.value,r.triggerJson),s.isUnavailableData||"number"!=typeof s.value||isNaN(s.value)||(a.setNumericCellValue(t,s.value),t.setNumberValue(s.value,s.formatFunction,!1))}else{var g=c.getConditionalStylePreview(r,t.gridData.index);g&&"number"==typeof g.value&&!isNaN(g.value)&&(u.processImageJsonForTrigger(o,g.value,r.triggerJson),a.setNumericCellValue(t,g.value))}o.style.width&&o.style.height&&!1!==o.ownSizeInsideParent&&Math.round(o.style.width)!==Math.round(l)&&Math.round(o.style.height)!==Math.round(d)?o.ownSizeInsideParent=!0:(o.ownSizeInsideParent=!1,o.style.width=l,o.style.height=d);var h={viewModel:e.viewModel,theme:e.theme,parentWidget:t,currentFeatureIndex:e.getFeatureIndexForCell(t),currentFeatureAttributes:e.currentFeatureAttributes,alignParams:t.getFullStyle(),imageTriggerJson:r.triggerJson,onInitialized:function(){if(t.domNode){var e=y(t),i=S(t);n&&n.resize({w:e,h:i},t.getFullStyle())}},onContentLoadingStart:e.onContentLoadingStart.bind(e),onContentLoadingEnd:e.onContentLoadingEnd.bind(e)};function m(){if(t.domNode)return n=i._createImageFromParams(e,t,o,h)}var C=e.viewModel.layoutBuilder.getClass("image");return C.isAsync?C.loadModules().then(m):m()},_createImageFromParams:function(e,t,n,i){var r=e.viewModel.layoutBuilder.createElement("image",{node:t.getContentContainerNode(),placeFunc:function(e){t.setContent(e)},json:n,creationParams:i});return new _(t,r,[["onWidthChanged","width"],["onHeightChanged","height"],["setStyle","horizontalAlign"]]),r},_placeShapeInCell:function(e,t){var n,i=this,r=a.getFieldInfo(t).shapeJson,o=y(t),l=S(t);r.style.width=o,r.style.height=l;var d={viewModel:e.viewModel,theme:e.theme,parentWidget:t,currentFeatureIndex:e.getFeatureIndexForCell(t),currentFeatureAttributes:e.currentFeatureAttributes,alignParams:t.getFullStyle(),getPreviewValueFunction:e.getPreviewValueFunction,applyThemeStyle:e.applyThemeStyle,onInitialized:function(){if(t.domNode){var e=y(t),i=S(t);n&&n.resize({w:e,h:i},t.getFullStyle())}},onContentLoadingStart:e.onContentLoadingStart.bind(e),onContentLoadingEnd:e.onContentLoadingEnd.bind(e)};function s(){if(t.domNode)return n=i._createShapeFromParams(e,t,r,d)}var u=e.viewModel.layoutBuilder.getClass("shape");return u.isAsync?u.loadModules().then(s):s()},_createShapeFromParams:function(e,t,n,i){var r=e.viewModel.layoutBuilder.createElement("shape",{node:t.getContentContainerNode(),placeFunc:function(e){t.setContent(e)},json:n,creationParams:i});return new _(t,r,[["onWidthChanged","width"],["onHeightChanged","height"],["setStyle","horizontalAlign"]]),r}})}));
