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

define(["dojo/_base/declare","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","../PlayerResizeModes","../PlayerViewModes","esri/dijit/geoenrichment/utils/DomUtil"],(function(e,t,n,r,i,o,a){var s={createContainer:function(e,t){var n=e.getCurrentAnalysisAreaIndex();e.viewMode===o.PANELS_IN_STACK_ALL&&(n=0);var r=t.getContainer(n);if(!r){switch(e.viewMode){case o.PANELS_IN_SLIDES:r=this._createPaginationReportContainer(e);break;case o.PANELS_IN_STACK:case o.PANELS_IN_ROW:r=this._createStackReportContainer(e);break;case o.PANELS_IN_STACK_ALL:r=this._createStackReportContainerAll(e);break;default:r=this._createFullPageReportContainer(e)}r.isCurrentContainer=function(){return e.getCurrentReportContainer()===r},e.own(r)}return t.setContainer(r,n),r},_createPaginationReportContainer:function(e){var t=e._viewModel;return t.layoutBuilder.createElement("reportContainerPagination",{viewModel:t,parentWidget:e,currentFeatureIndex:e.getCurrentAnalysisAreaIndex(),scaleSectionsToFit:e.scaleSlidesToFitWindow,onResized:function(t){e.playerToolbar.update(),e._emitResizedEvent(t)},onPendingDataApplied:function(){e._emitResizedEvent()}},e.reportContainerDiv)},_createStackReportContainer:function(e){var t,n=e._viewModel,r=e.viewMode===o.PANELS_IN_ROW;return(t=e.resizeMode!==i.AUTO?{center:!0,minLeft:r?10:0}:{center:!0,minRight:10,minBottom:10,minLeft:10}).minTop=e.showToolbarInPopup?r?50:43:10,n.layoutBuilder.createElement("reportContainerStack",{viewModel:n,parentWidget:e,currentFeatureIndex:e.getCurrentAnalysisAreaIndex(),isVertical:!r,renderOptions:t,onPendingDataApplied:function(){e._emitResizedEvent()}},e.reportContainerDiv)},_createStackReportContainerAll:function(e){var t,n=e._viewModel;return(t=e.resizeMode!==i.AUTO?{minLeft:0}:{minRight:10,minBottom:10,minLeft:10}).minTop=e.showToolbarInPopup?43:0,n.layoutBuilder.createElement("reportContainerStackAll",{viewModel:n,parentWidget:e,isVertical:!0,renderOptions:t,onPendingDataApplied:function(){e._emitResizedEvent()},onSwitchToSingleAreaView:function(){e.showAnalysisAreaAt(0)}},e.reportContainerDiv)},_createFullPageReportContainer:function(e){var t=e._viewModel,n={viewModel:t,parentWidget:e,currentFeatureIndex:e.getCurrentAnalysisAreaIndex(),onPendingDataApplied:function(){e._emitResizedEvent()}};return e.resizeMode!==i.AUTO?n.renderOptions={center:!0,minTop:10}:n.renderOptions={center:!0,minTop:10,minRight:10,minBottom:10,minLeft:10},t.layoutBuilder.createElement(e.getReportData().reportObject.isGraphicReport?"reportContainerGrid":"reportContainer",n,e.reportContainerDiv)}},l=e(null,{_containerInfos:null,constructor:function(){this._containerInfos=[]},getContainer:function(e){return this._getInfo(e,"container")},getContainers:function(){return this._containerInfos.map((function(e){return e.container}))},getContainerIndex:function(e){return this.getContainers().indexOf(e)},setContainer:function(e,n){t.set(e.domNode,"area-index",n),this._getInfo(n,null,e)},isLoaded:function(e){return this._getInfo(e,"loaded")},setLoaded:function(e){var t=this._getInfo(e);t&&(t.loaded=!0)},resetAllLoaded:function(){this._containerInfos.forEach((function(e){e.loaded=!1}))},destroyAllContainers:function(){this._containerInfos.forEach((function(e){e.container.destroy()})),this._containerInfos.length=0},_getInfo:function(e,t,n){var r=this._containerInfos[e];return!r&&n&&(r=this._containerInfos[e]={container:n,loaded:!1}),t?r&&r[t]:r}}),d=e(null,{_lastVisuals:null,reset:function(){this._lastVisuals=null},rememberCurrentContainerVisuals:function(e){if(e){var t=e;this._lastVisuals={scrollTop:t.getScrollableContainer&&t.getScrollableContainer().scrollTop||0,pageIndex:t.getCurrentPageIndex&&t.getCurrentPageIndex()||0,slideIndex:t.getCurrentSlideIndex&&t.getCurrentSlideIndex()||0,zoomInfo:t.getZoomInfo&&t.getZoomInfo()}}else this._lastVisuals=null},applyCurrentContainerVisuals:function(e){if(this._lastVisuals){var t=e;t.getScrollableContainer&&(t.getScrollableContainer().scrollTop=this._lastVisuals.scrollTop||0),t.showSlideAt&&t.showSlideAt(this._lastVisuals.slideIndex||0),t.showPageAt?t.showPageAt(this._lastVisuals.pageIndex||0):t.notifyShown(),t.setZoomInfo&&t.setZoomInfo(this._lastVisuals.zoomInfo)}}});return e(null,{_containerDict:null,_visualsHelper:null,_initContainerSwither:function(){this._containerDict=new l,this._visualsHelper=new d},getCurrentReportContainer:function(){return this._currentReportContainer},getAllReportContainers:function(){return this._containerDict.getContainers()},_destroyAllContainers:function(){this._containerDict.destroyAllContainers(),this._currentReportContainer=null},_setReportContainer:function(e){return e?this._resetLoadedFlags():this._visualsHelper.rememberCurrentContainerVisuals(this._currentReportContainer),this._switchToCurrentReportContainer(),!(!e&&this._containerDict.isLoaded(this.getCurrentAnalysisAreaIndex()))||(this._resize({isPaginating:!0}),this._visualsHelper.applyCurrentContainerVisuals(this._currentReportContainer),!1)},_switchToCurrentReportContainer:function(){switch(this._currentReportContainer&&this._hideContainer(this._currentReportContainer),this._currentReportContainer=s.createContainer(this,this._containerDict),n.remove(this.domNode,"esriGEReportPlayerFullView esriGEReportPlayerPaginationView esriGEReportPlayerStackView esriGEReportPlayerRowView"),this.viewMode){case o.PANELS_IN_SLIDES:n.add(this.domNode,"esriGEReportPlayerPaginationView");break;case o.PANELS_IN_STACK:n.add(this.domNode,"esriGEReportPlayerStackView");break;case o.PANELS_IN_STACK_ALL:n.add(this.domNode,"esriGEReportPlayerStackAllView");break;case o.PANELS_IN_ROW:n.add(this.domNode,"esriGEReportPlayerRowView");break;default:n.add(this.domNode,"esriGEReportPlayerFullView")}this._showContainer(this._currentReportContainer),this._connectZoomToCurrentContainer(),this.notifyShown()},_hideContainer:function(e){this.isPlayerOnServer||(e.__undoHideContainerHandle=a.hideNodeInBackground(e.domNode,"reportContainer_"+this._containerDict.getContainerIndex(e)),e.own(e.__undoHideContainerHandle))},_showContainer:function(e){this.isPlayerOnServer||e.__undoHideContainerHandle&&(e.__undoHideContainerHandle.undo(),delete e.__undoHideContainerHandle)},_showAllContainers:function(){var e=this;return this.getAllReportContainers().forEach((function(t){e._showContainer(t),e.reportContainerDiv.removeChild(t.domNode),r.place(t.domNode,e.reportContainerDiv)})),{undo:function(){e.getAllReportContainers().forEach((function(t){e._hideContainer(t)})),e._switchToCurrentReportContainer()}}},_resetLoadedFlags:function(){this._visualsHelper.reset(),this._containerDict.resetAllLoaded()},_setCurrentContainerLoaded:function(){this._visualsHelper.applyCurrentContainerVisuals(this._currentReportContainer),this._containerDict.setLoaded(this.getCurrentAnalysisAreaIndex())}})}));
