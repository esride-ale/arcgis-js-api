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

define(["dojo/_base/declare","dojo/_base/lang","dojo/dom-construct","dijit/_WidgetBase","dijit/_TemplatedMixin","./_ScrollSupport","./_ZoomSupport","../supportClasses/templateJsonUtils/query/TemplateJsonQueryUtil","../themes/ReportThemes","./utils/MobileGesturesUtil","esri/dijit/geoenrichment/utils/DeviceUtil","esri/dijit/geoenrichment/utils/DomUtil","dojo/text!../templates/ReportContainerStack.html","dojo/i18n!esri/nls/jsapi"],(function(t,e,i,n,o,s,a,h,r,l,c,u,d,g){return t([n,o,s,a],{templateString:d,nls:g=g.geoenrichment.dijit.ReportPlayer.ReportPlayer,isReportContainerStack:!0,viewModel:null,theme:null,parentWidget:null,currentFeatureIndex:null,isVertical:!0,isScalable:!0,canShowEmptyState:!0,renderOptions:null,sectionJsonsProcessor:null,documentOptions:null,hideBackgroundImage:!1,infographicPage:null,_isEmpty:!1,postCreate:function(){var t=this;this.inherited(arguments),this.renderOptions=e.mixin({center:!1,minTop:0,minRight:0,minBottom:0,minLeft:0},this.renderOptions),this.infographicPageDiv=i.create("div",null,this.isScalable?this.scalableContainer:this.domNode),this.isScalable||(i.destroy(this.fillerContainer),this.fillerContainer=null,this.scalableContainer=null),this.infographicPage=this.viewModel.layoutBuilder.createElement("infographicPageStack",{viewModel:this.viewModel,theme:this.theme,parentWidget:this,currentFeatureIndex:this.currentFeatureIndex,isVertical:this.isVertical,hideBackgroundImage:this.hideBackgroundImage,onSectionCreated:function(e){t._notifySectionAboutScale(e)}},this.infographicPageDiv),this.own(this.infographicPage),this._setEmptyState(!1),c.isMobileDevice()&&l.enableMobileGestures(this)},resize:function(t,e){this.domNode.style.width=t?t+"px":"auto",this.domNode.style.height=e?e+"px":"auto"},setMaxWidth:function(t){this.domNode.style.maxWidth=t+"px"},setMaxHeight:function(t){this.domNode.style.maxHeight=t+"px"},notifyShown:function(){this._pendingJson?(this.fromJson(this._pendingJson),!this._pendingJson&&this.onPendingDataApplied()):this.infographicPage.notifyShown()},_maxPanelWidth:null,_maxPanelHeight:null,getCurrentPageDim:function(){return this.isVertical?{w:this._maxPanelWidth,h:1e6}:{w:1e6,h:this._maxPanelHeight}},_calcMaxPanelSize:function(t){this._maxPanelWidth=0,this._maxPanelHeight=0,t.forEach((function(t){var e=h.getParentBox(t);e&&(this._maxPanelWidth=Math.max(this._maxPanelWidth,e.w),this._maxPanelHeight=Math.max(this._maxPanelHeight,e.h))}),this)},refresh:function(t){return void 0!==(t=t||{}).hideBackgroundImage&&(this.hideBackgroundImage=t.hideBackgroundImage,this.infographicPage.hideBackgroundImage=t.hideBackgroundImage),t&&t.rebuildStack?this._setSectionJson(this._originalSectionsJsons):this.infographicPage.refresh()},getVisualState:function(){return this.infographicPage.getVisualState()},setVisualState:function(t){return this.infographicPage.setVisualState(t)},_pendingJson:null,_originalSectionsJsons:null,fromJson:function(t){if(this._canApplyJson()){this._pendingJson=null,this.documentOptions=t.documentOptions;var e=t.theme&&t.theme.id!==r.GRAPHIC?t.theme:null;this.theme=this.infographicPage.theme=e;var i=this._originalSectionsJsons=h.collectSectionJsons(t,{backgroundForeground:!1,populateWithFloatingElementsBehind:!0,topFirst:this.documentOptions.revisionVersion<1.8});return this._setSectionJson(i)}this._pendingJson=t},_setSectionJson:function(t){return this.sectionJsonsProcessor&&(t=this.sectionJsonsProcessor(t)),this._setEmptyState(!t.length),this._calcMaxPanelSize(t),this.infographicPage.setItems(t)},_canApplyJson:function(){return u.isNodeInLayout(this.domNode)},isEmpty:function(){return this._isEmpty},_setEmptyState:function(t){this._isEmpty=t,u.hide([this.fillerContainer,this.emptyPlaceholder]),u.show(t&&this.canShowEmptyState?this.emptyPlaceholder:this.fillerContainer)},getSections:function(){return this.infographicPage.getSections()},_sectionToInfographicPage:function(t){return this.infographicPage},resizePanelsToShowContent:function(){return this.infographicPage.resizePanelsToShowContent()},onPendingDataApplied:function(){}})}));
