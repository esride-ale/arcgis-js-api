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

define(["dojo/_base/declare","dojo/_base/lang","dojo/dom-class","dojo/dom-construct","esri/dijit/geoenrichment/TriStateItem","esri/dijit/geoenrichment/ToggleButton","esri/dijit/geoenrichment/lists/FlowListDefaultItemRenderer","../PlayerViewModes","./Select","./ComparisonSettings","../dataProvider/supportClasses/areas/AnalysisAreaUtil","esri/dijit/geoenrichment/utils/DeviceUtil","esri/dijit/geoenrichment/utils/PopupUtil","esri/dijit/geoenrichment/utils/TooltipUtil","dojo/i18n!esri/nls/jsapi"],(function(e,i,t,n,o,s,r,a,l,c,d,p,u,h,f){f=f.geoenrichment.dijit.ReportPlayer.PlayerToolbar;var m=e(r,{canRemoveAreas:!1,canMoveAreas:!1,wrapInCards:!1,nls:null,createPresentation:function(e,i,r,a){var l=this,c=this.inherited(arguments);if(e.isSeparator)return c;if(c.innerHTML="","all"===e.value){c.style.cursor="pointer";var d=n.create("div",{class:"dijitInline esriGEReportPlayerToolbar_checkboxRoot"},c),p=new s(d,{mode:"toggle"});return p.set("checked",this.isCompareAll()),n.create("div",{class:"dijitInline",innerHTML:e.label},c),c.addEventListener("click",(function(){l.isCompareAll()?l.onStopComparison():l.onCompareAreasSideBySide()})),h.setTooltipToNode(c,this.isCompareAll()?this.nls.compareAreasSideBySideTooltipOff:this.nls.compareAreasSideBySideTooltipOn,{position:["before","after"]}),c}if("addAreas"===e.value)return c.style.cursor="pointer",n.create("div",{class:"dijitInline esriGESpaceAfterBig esriGEReportPlayerToolbar_addMoreAreasIcon"},c),n.create("div",{class:"dijitInline",innerHTML:e.label},c),c.addEventListener("click",(function(){l.onAddMoreAreas()})),c;if(e.isAdditional){if(c.style.cursor="pointer",e.buttonInfo.imageClass&&n.create("div",{class:"dijitInline esriGESpaceAfterBig "+e.buttonInfo.imageClass},c),n.create("div",{class:"dijitInline",innerHTML:e.label},c),c.addEventListener("click",(function(i){e.buttonInfo.callback(i),l.onClosePopup()})),e.buttonInfo.tooltip){var u=n.create("div",{class:"dijitInline esriGESpaceBeforeBig esriGEInfoIcon"},c);h.setTooltipToNode(u,e.buttonInfo.tooltip,e.buttonInfo.tooltipParams)}return e.buttonInfo.onCreated&&e.buttonInfo.onCreated(c),c}if(e.canSelect){var f=n.create("div",{class:"dijitInline esriGEReportPlayerToolbar_checkboxRoot"},c),m=new o(f);m.autoToggle=!1,m.set("checked",e.selected),c.addEventListener("click",(function(){e.selected=!e.selected,m.set("checked",e.selected),e.isGroup?e.children.forEach((function(i){i.selected=e.selected})):e.parent&&(e.parent.selected=e.parent.children.some((function(e){return e.selected}))),l.onVisibilityChanged()}))}if(this.canRemoveAreas&&e.isHost){var A=n.create("div",{class:"esriGEFloatEnd esriGESpaceBeforeBig esriGEReportPlayerToolbar_removeAreaButton"},c);A.addEventListener("click",(function(i){i.stopPropagation(),l.onRemoveAreas(e.isArea?[e.analysisArea]:e.analysisAreas)})),h.setTooltipToNode(A,e.isGroup?this.nls.removeAreasFromInfographic:this.nls.removeAreaFromInfographic)}if(this.canMoveAreas&&e.isHost&&this.isCompareAll()){var g=n.create("div",{class:"esriGEFloatEnd upDownArrowsBlock"},c);if(e.hostIndex>0){var S=n.create("div",{class:"dijitInline upArrow"},g);S.addEventListener("click",(function(i){i.stopPropagation(),l.onMoveUp(e)}))}if(e.hostIndex<this.getNumHostItems()-1){var v=n.create("div",{class:"dijitInline downArrow"},g);v.addEventListener("click",(function(i){i.stopPropagation(),l.onMoveDown(e)}))}}var y=n.create("div",{class:"dijitInline",innerHTML:e.label},c);return e.parent&&(y.style.paddingLeft="20px"),this.wrapInCards&&(e.isArea&&!e.parent?t.add(c,"areaCard_only"):e.isGroup?t.add(c,"areaCard_groupTop"):e.isArea&&t.add(c,e.parent.children.indexOf(e)===e.parent.children.length-1?"areaCard_groupBottom":"areaCard_groupMiddle")),this.selectPresentation(c,i,e),c},isCompareAll:function(){return!1},getNumHostItems:function(){return 0},onAddMoreAreas:function(){},onRemoveAreas:function(e){},onVisibilityChanged:function(){},onMoveUp:function(e){},onMoveDown:function(e){},onCompareAreasSideBySide:function(){},onStopComparison:function(){},onClosePopup:function(){}});return e(l,{class:"dijitInline esriGEOnDemandSelectNoBackground",listClass:"esriGEOnDemandSelectVeryTallList800 esriGEOnDemandSelectSpacedOut esriGEReportPlayerToolbar_areasSelectList",player:null,canAddMoreAreas:!1,areasSelectButtons:null,comparisonSettingsBlock:null,comparisonSettings:null,_nls:null,buildRendering:function(){var e=this;this.inherited(arguments),this._nls=i.mixin({},f,this.player.nlsMap),this.itemRenderer=new m({nls:this._nls,onAddMoreAreas:function(){e.onAddMoreAreas(),e.closePopup()},onRemoveAreas:function(i){var t=e._getNumHostItems()<=2;e.onRemoveAreas(i,t),t&&e.closePopup()},isCompareAll:function(){return e.player.viewMode===a.PANELS_IN_STACK_ALL},getNumHostItems:function(){return e._getNumHostItems()},onVisibilityChanged:function(){var i={};e.get("options").forEach((function(e){e.isArea&&(i[e.analysisArea.index]=e.selected)})),e.refresh(),e.player.getCurrentReportContainer().setAreasVisibilityState(i,{append:!0})},onMoveUp:function(e){},onMoveDown:function(e){},onCompareAreasSideBySide:function(){e.onCompareAreasSideBySide(),e.closePopup()},onStopComparison:function(){var i=-1;e.get("options").some((function(e){if(e.analysisArea&&!e.analysisArea.hidden)return i=e.analysisArea.index,!0})),e.onStopComparison(i),e.closePopup()},onClosePopup:function(){e.closePopup()}})},_buildAdditionalPopupListProperties:function(){var e=this;return{selectionValidator:function(i){return e.player.viewMode!==a.PANELS_IN_STACK_ALL&&!!i&&!i.isSeparator&&!1!==i.enabled}}},buildAreaOptions:function(e){var i=d.groupAreas(e),t=i.groupInfos.length>1&&!i.isOnlyAreasInOnlyGroup;this.itemRenderer.wrapInCards=t,this.itemRenderer.canRemoveAreas=t&&!p.isMobileDevice(),this.itemRenderer.canMoveAreas=!1;var n=[],o=0;i.groupInfos.forEach((function(e,i){var t;e.isRealGroup&&(t={isGroup:!0,isHost:!0,hostIndex:o++,label:e.label,value:"group_"+i,enabled:!1,analysisAreas:e.areas,children:[]},n.push(t)),e.areas.forEach((function(e){var i={isArea:!0,label:e.shortName||e.name||"",value:e.index,analysisArea:e,parent:t,isHost:!t};i.isHost&&(i.hostIndex=o++),n.push(i),t&&t.children.push(i)}))}));var s={isSeparator:!0};(n.push(s),this.player.viewMode!==a.PANELS_IN_SLIDES)&&(!p.isMobileDevice()&&e.analysisAreas.filter((function(e){return!e.hidden})).length>1&&n.push({label:this._nls.compareAreasSideBySide,value:"all"}),this.canAddMoreAreas&&n.push({label:this._nls.addMoreAreas,value:"addAreas"}));this.areasSelectButtons&&this.areasSelectButtons.forEach((function(e){(!e.isVisible||e.isVisible())&&n.push({label:e.label,value:e.id,isAdditional:!0,buttonInfo:e})})),n[n.length-1]===s&&n.pop(),this._updateTreeSelection(n),this.set("options",n),this._updateComparisonSettings()},_getNumHostItems:function(){var e=0;return this.get("options").some((function(i){i.isHost&&e++})),e},onPopupListPreBuild:function(){this._updateTreeSelection()},_updateTreeSelection:function(e){if(this.player.viewMode===a.PANELS_IN_STACK_ALL){var i=this.player.getCurrentReportContainer().getAreasVisibilityState();(e=e||this.get("options")).forEach((function(e){(e.isGroup||e.isArea)&&(e.canSelect=!0,e.isGroup?(e.children.forEach((function(e){e.selected=i[e.analysisArea.index]})),e.selected=e.children.some((function(e){return e.selected}))):e.selected=i[e.analysisArea.index])}))}},_updateComparisonSettings:function(){var e=this;this.comparisonSettings&&this.comparisonSettings.destroy(),this.comparisonSettings=null,this.comparisonSettingsBlock&&n.destroy(this.comparisonSettingsBlock),this.comparisonSettingsBlock=null,this.player.viewMode===a.PANELS_IN_STACK_ALL&&(this.comparisonSettingsBlock=n.create("div",{class:"dijitInline esriGEClickable"},this.domNode.parentNode),n.create("div",{class:"dijitInline esriGESpaceBeforeBig esriGEIcon16 esriGEReportPlayerToolbar_comparisonSettingsIcon"},this.comparisonSettingsBlock),u.makePopup((function(){return e.comparisonSettings||(e.comparisonSettings=new c({player:e.player,onChange:function(){e.player.getCurrentReportContainer().setComparisonSettings(e.comparisonSettings.getSettings())}})),e.comparisonSettings.setSettings(e.player.getCurrentReportContainer().getComparisonSettings()),e.comparisonSettings}),this,this.comparisonSettingsBlock))},onAddMoreAreas:function(){},onRemoveAreas:function(e,i){},onCompareAreasSideBySide:function(){},onStopComparison:function(e){},destroy:function(){this.comparisonSettings&&this.comparisonSettings.destroy(),this.inherited(arguments)}})}));
