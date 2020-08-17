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

define(["dojo/aspect","dojo/_base/declare","dojo/dom-construct","dijit/_WidgetBase","dijit/_TemplatedMixin","./chart/ChartSettings","./locator/LocatorSettings","./comparison/ComparisonSettings","./map/MapSettings","./table/TableSettings","esri/dijit/geoenrichment/utils/MouseUtil"],(function(t,i,e,s,n,o,a,g,h,r,c){return i([s,n],{templateString:"<div class='esriGEReportPlayer_sectionDynamicSettings'></div>",chartSettings:null,comparisonSettings:null,locatorSettings:null,mapSettings:null,tableSettings:null,_chartSettingsWidget:null,_comparisonSettingsWidget:null,_locatorSettingsWidget:null,_mapSettingsWidget:null,_tableSettingsWidget:null,postCreate:function(){this._tryInitChartSettings(),this._tryInitComparisonSettings(),this._tryInitLocatorSettings(),this._tryInitMapSettings(),this._tryInitTableSettings()},_tryInitChartSettings:function(){this.chartSettings&&(this._chartSettingsWidget=new o({onSortChart:this.onSortChart.bind(this),onChartToTable:this.onChartToTable.bind(this),onTableToChart:this.onTableToChart.bind(this),onCalcStateChanged:this.onCalcStateChanged.bind(this)}).placeAt(e.create("div",{class:"sectionDynamicSettings_row"},this.domNode)),this.own(this._chartSettingsWidget),this._chartSettingsWidget.setSortingOptions(this.chartSettings.sortingOptions,this.chartSettings.sorting),this._chartSettingsWidget.setViewOptions(this.chartSettings.canViewTable),this._chartSettingsWidget.setToggleCalcStateOptions(this.chartSettings.group))},_tryInitLocatorSettings:function(){this.locatorSettings&&(this._locatorSettingsWidget=new a({onLocatorSummaryChanged:this.onLocatorSummaryChanged.bind(this)}).placeAt(e.create("div",{class:"sectionDynamicSettings_row"},this.domNode)),this.own(this._locatorSettingsWidget),this._locatorSettingsWidget.setSummaryInfos(this.locatorSettings.summaryInfos))},_tryInitComparisonSettings:function(){this.comparisonSettings&&(this._comparisonSettingsWidget=new g({onChartToTable:this.onChartToTable.bind(this),onTableToChart:this.onTableToChart.bind(this)}).placeAt(e.create("div",{class:"sectionDynamicSettings_row"},this.domNode)),this.own(this._comparisonSettingsWidget),this._comparisonSettingsWidget.setChartViewOptions(this.comparisonSettings.chartViewOptions))},_tryInitMapSettings:function(){var i=this;function s(){i._mapSettingsWidget.setLegendVisible(i.mapSettings.getLegendVisible())}this.mapSettings&&(this._mapSettingsWidget=new h({onLegendVisibilityChanged:this.onLegendVisibilityChanged.bind(this)}).placeAt(e.create("div",{class:"sectionDynamicSettings_row"},this.domNode)),this.own(this._mapSettingsWidget),s(),this.own(t.after(this.mapSettings,"onLegendVisibilityChanged",s)))},_tryInitTableSettings:function(){this.tableSettings&&(this._tableSettingsWidget=new r({onChartToTable:this.onChartToTable.bind(this),onTableToChart:this.onTableToChart.bind(this)}).placeAt(e.create("div",{class:"sectionDynamicSettings_row"},this.domNode)),this.own(this._tableSettingsWidget),this._tableSettingsWidget.setChartViewOptions(this.tableSettings.chartViewOptions))},setVisualState:function(t){var i=t&&t.stackElements[0]&&t.stackElements[0],e=i&&i.cells&&i.cells[0];this._chartSettingsWidget&&this._chartSettingsWidget.setVisualState(e),this._locatorSettingsWidget&&this._locatorSettingsWidget.setVisualState(e),this._comparisonSettingsWidget&&this._comparisonSettingsWidget.setVisualState(e),this._mapSettingsWidget&&this._mapSettingsWidget.setVisualState(e),this._tableSettingsWidget&&this._tableSettingsWidget.setVisualState(i)},isMouseOver:function(t){return c.isMouseOver(this.domNode,{event:t})||[this._chartSettingsWidget,this._comparisonSettingsWidget,this._locatorSettingsWidget,this._mapSettingsWidget,this._tableSettingsWidget].some((function(i){return i&&i.isMouseOver&&i.isMouseOver(t)}))},onSortChart:function(t){},onCalcStateChanged:function(t){},onChartToTable:function(t,i){},onTableToChart:function(t){},onLocatorSummaryChanged:function(t){},onLegendVisibilityChanged:function(t){},onClosePopup:function(){}})}));
