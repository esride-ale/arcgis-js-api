// COPYRIGHT © 201 Esri
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
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/when","dojo/string","../paginatableTable/PaginatableTableInfographic","../paginatableTable/SectionJsonsBuilder","./ExportToExcelUtil","esri/dijit/geoenrichment/utils/InvokeUtil","esri/dijit/geoenrichment/utils/RegExpUtil","esri/dijit/geoenrichment/utils/WaitingUtil","dojo/i18n!esri/nls/jsapi"],function(t,e,o,i,n,r,s,a,l,h){h=h.geoenrichment.dijit.ReportPlayer.LocatorTableInfographic;var c=t(i,{noDataText:h.noLocatorData,_locatorPointsController:null,_areaName:null,_areaShortName:null,_stats:null,_unitedSectionJson:null,updateInfographic:function(t){if(this.domNode)return t.locatorCalculatorInfo&&this.viewModel.dynamicReportInfo&&(this.viewModel.dynamicReportInfo.isMultiFeature?(this._areaName=this.viewModel.dynamicReportInfo.combinedAreasInfo.name,this._areaShortName=this.viewModel.dynamicReportInfo.combinedAreasInfo.shortName):(this._areaName=this.viewModel.dynamicReportInfo.analysisAreas[this.currentFeatureIndex].name,this._areaShortName=this.viewModel.dynamicReportInfo.analysisAreas[this.currentFeatureIndex].shortName),this._locatorPointsController=this.viewModel.getLocatorPointsController(t.locatorCalculatorInfo,this.currentFeatureIndex),this.own(this._locatorPointsController)),this.inherited(arguments)},_doUpdateContent:function(){this.domNode&&this.width&&(this.inherited(arguments),this._registerLocatorPointsController())},_buildSectionJsonsAndStat:function(){var t=this,e=n.buildSectionJsonsAndStat({headerSectionJson:this._currentInfographicJson.headerSectionJson,dataSectionJson:this._currentInfographicJson.dataSectionJson,calculatorDataArray:this._getCalculatorDataArray(),filterRanges:this._filterRanges,searchTextRe:this._searchTextRe,sorting:this._sorting,minRowHeight:this.minRowHeight,scaleToFitHeight:this._currentInfographicJson.scaleToFitHeight,height:this.height,width:this.width,hasTitle:!!this._currentInfographicJson.titleSectionJson,titleHeight:this._getTitleHeight(),hasFooter:this._currentInfographicJson.showNumberOfLocations,footerHeight:i.BOTTOM_AREA_HEIGHT,setAttributeVisibleAt:function(e,o){t._locatorPointsController&&t._locatorPointsController.setPointVisibleAt(e,o)}});return this._stats=e&&e.stats,this._unitedSectionJson=e&&e.unitedSectionJson,e},_resizeSection:function(t){this.isEditMode&&this.inherited(arguments);var e=t.getTables()[0];this._locatorPointsController&&this._locatorPointsController.registerLocatorTable(e)},_getCalculatorDataArray:function(){return this._locatorPointsController.getCalculatorDataArray()},_renderFootNote:function(){var t=this.getNumPointsShown()||0;this.footnoteDiv.innerHTML=this._currentInfographicJson.showNumberOfLocations&&t?1===t?h.oneClosestLocations:o.substitute(h.numClosestLocations,{numPoints:t}):""},_getFooterHeight:function(){return!this._isSinglePage||this._currentInfographicJson.showNumberOfLocations?i.BOTTOM_AREA_HEIGHT:0},_registerLocatorPointsController:function(){this._locatorPointsController&&this._locatorPointsController.setLocatorTableCallbacks({getCellForPointAtFunc:this._getCellForPointAt.bind(this),getPointIndexForCellFunc:this._getPointIndexForCellFunc.bind(this)})},_getPointIndexForCellFunc:function(t){return t&&n.getAttributeIndexForGridData(t.gridData)},_getCellForPointAt:function(t){var e,o=-1;if(this._sectionJsons.some(function(i,r){return i.stack[0].data.data.some(function(s){if(n.getAttributeIndexForGridData(s)===t)return o=r,e=i,!0})}),-1!==o){this.pagination.set("currentPage",o,!0);var i,r=this._getSectionByJson(e);return r.getTables()[0].getFieldCells().some(function(e){if(n.getAttributeIndexForGridData(e.gridData)===t)return i=e,!0}),i}},_filterRanges:null,_searchText:null,_searchTextRe:null,getStatRanges:function(){return e(this._updatePromise,function(){return this._stats&&this._stats.ranges}.bind(this))},setFilterRanges:function(t){this._filterRanges=t,s.invoke(this,"_doUpdateContent",50)},setSearchText:function(t){this._searchText=t,this._searchTextRe=t&&a.createRegExp(t,"i",!0),s.invoke(this,"_doUpdateContent",50)},getNumPointsTotal:function(){return this._stats&&this._stats.numAttributesTotal},getNumPointsShown:function(){return this._stats&&this._stats.numAttributesShown},getVisualState:function(){return this._filterRanges||this._searchText||this._sorting||this._columnWidths?{filterRanges:this._filterRanges,searchText:this._searchText,sorting:this._sorting,columnWidths:this._columnWidths}:null},setVisualState:function(t){t&&(t.filterRanges&&this.setFilterRanges(t.filterRanges),t.searchText&&this.setSearchText(t.searchText),t.sorting&&this._setSorting(t.sorting),t.columnWidths&&(this._columnWidths=t.columnWidths,s.invoke(this,"_doUpdateContent",50)))},canExportToExcel:function(){return this.viewModel.canExportToExcel()},exportToExcel:function(){var t=this;return e(this._updatePromise,function(){return e(t.viewModel.pepareExportToExcelParameters({layerID:t._locatorPointsController.getLayerID(),hasMaps:t._locatorPointsController.getMapInfos()&&t._locatorPointsController.getMapInfos().length}),function(o){return l.showProgressPromise(t.domNode,e(t.prepareExportToExcelParameters(o),function(e){return t.viewModel.exportToExcel(e)}))})})},prepareExportToExcelParameters:function(t){return t=t||{},r.prepareExportParameters({areaName:this._areaName,areaShortName:this._areaShortName,layerName:this._locatorPointsController.getLayerName(),layerID:this._locatorPointsController.getLayerID(),sectionJson:this._unitedSectionJson,mapInfos:this._locatorPointsController.getMapInfos(),exportMaps:t.exportMaps})},_destroySections:function(){this.inherited(arguments),this._stats=null}});return c.MIN_ROW_HEIGHT=i.MIN_ROW_HEIGHT,c});