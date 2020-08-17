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

define(["dojo/_base/declare","dojo/_base/lang","dojo/aspect","dojo/on","esri/dijit/geoenrichment/when","dojo/dom-class","dojo/dom-construct","../../comparison/ComparisonSelect","esri/dijit/geoenrichment/utils/DomUtil","esri/dijit/geoenrichment/utils/MouseUtil","esri/dijit/geoenrichment/utils/TooltipUtil","dojo/i18n!esri/nls/jsapi"],(function(e,t,i,o,n,r,l,s,a,d,u,h){return h=h.geoenrichment.dijit.ReportPlayer.ComparisonTableInfographic,e(null,{grid:null,groups:null,fields:null,selectedLevelsCache:null,additionalColumnsCache:null,variablesInColumns:!1,isEditMode:!1,simplifySelectionForSingleGeography:!0,numThisAreas:1,constructor:function(e){t.mixin(this,e),this.grid.own(i.after(this.grid,"refresh",this._initDropDowns.bind(this))),this.grid.canSortCellFunc=function(e){return!d.isMouseOver(e.__geographySelect&&e.__geographySelect.domNode)&&!d.isMouseOver(e.__removeAdditionalColumnOrRowButton)},this._initDropDowns()},_initDropDowns:function(){var e;n(this.grid.getRenderPromise(),function(){if(this.variablesInColumns){var t=this.grid.getSortRowIndexMapping();if(e=this.grid.queryCells({columnIndex:0}),t){var i=[];e.forEach((function(e,o){i[t[o]]=e})),e=i}}else e=this.grid.queryCells({rowIndex:0});e.shift();for(var o=0;o<this.numThisAreas;o++)e.shift();this._addDropDownsToCells(e)}.bind(this))},_addDropDownsToCells:function(e){e.forEach((function(e,t){var i=this.groups[t];this._addDropDownToCell(e,i)}),this)},_addDropDownToCell:function(e,t){var n=this;if(e.__addDropDownCleanUp&&e.__addDropDownCleanUp(),t.features.length){var d=l.create("div",{class:"esriGEComparisonSelectionBuilder_root"}),c=l.create("div",{innerHTML:t.label,class:"esriGEComparisonSelectionBuilder_title TrimWithEllipses"},d),p=l.create("div",{class:"esriGEComparisonSelectionBuilder_select"},d);if(t.features.length>1||!this.simplifySelectionForSingleGeography){var g=new s({class:"esriGEOnDemandSelectNoBackground",fields:this.fields,canAddFeatures:!0,addFeatureMessage:this.variablesInColumns?h.showInSeparateRow:h.showInSeparateColumn,featureIsAlreadyAddedMessage:h.alreadyAdded,onFeatureSelected:function(e,t){n.onFeatureSelected(e,t)},isFeatureAdded:function(e,i){if((n.selectedLevelsCache[t.levelId]||t.features[0].attributes.StdGeographyID)===i)return!0;var o=n.additionalColumnsCache[t.levelId];return o&&-1!==o.indexOf(i)},onAddFeature:function(e,t){n.onAddFeature(e,t)}}).placeAt(p);e.own(g),g.setGroups([t]),g.setValue(t.levelId,this.selectedLevelsCache[t.levelId]||t.features[0].attributes.StdGeographyID);var f=e.getFullStyle().color;g.selectedLabel.style.color=f,g.arrow.style.borderTopColor=f}else if(p.innerHTML=t.features[0].attributes.StdGeographyName,r.add(p,"TrimWithEllipses"),t.isRemovable){p.style.position="relative";var m=l.create("div",{class:"esriGEComparisonTableInfographic_removeButton"},p);u.setTooltipToNode(m,this.variablesInColumns?h.removeRow:h.removeColumn),o(m,"click",(function(e){e.stopPropagation(),n.onRemoveAdditionalFeature(t.levelId,t.additionalFeatureId)})),e.__removeAdditionalColumnOrRowButton=m}var v=[];v.push(i.after(e,"setWidth",C)),v.push(i.after(e,"setHeight",C)),v.push(i.after(this.grid,"renderCell",(function(i){i===e&&n._addDropDownToCell(e,t)}),!0)),v.forEach((function(t){e.own(t)})),a.enableContentAbsolute(p,!this.isEditMode,{isTransparent:!0}),e.setContent(d),e.set("value",""),C(),e.__addDropDownCleanUp=function(){v.forEach((function(e){e.remove()})),g&&g.destroy(),delete e.__addDropDownCleanUp},e.__geographySelect=g,u.autoTooltip(d)}function C(){var t=e.getFullStyle();d.style.paddingLeft=d.style.paddingRight=t.horizontalPadding+"px";var i=e.getContentWidth()-2+"px";c.style.maxWidth=d.style.width=i,g?g.domNode.style.maxWidth=i:p.style.maxWidth=i,d.style.textAlign=t.horizontalAlign,c.style.height=c.style.lineHeight=e.getContentHeight()/2+"px",p.style.height=p.style.lineHeight=e.getContentHeight()/2+"px",m&&(m.style.top=(p.clientHeight-m.clientHeight)/2+"px")}},onFeatureSelected:function(e,t){},onAddFeature:function(e,t){},onRemoveAdditionalFeature:function(e,t){}})}));
