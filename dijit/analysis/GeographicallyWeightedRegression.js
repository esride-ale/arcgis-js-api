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

define(["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/connect","dojo/_base/json","dojo/_base/fx","dojo/_base/Color","dojo/has","dojo/string","dojo/dom-style","dojo/query","dojo/dom-class","dojo/fx/easing","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/registry","dijit/form/Button","dijit/form/RadioButton","dijit/form/CheckBox","dijit/form/Form","dijit/form/Select","dijit/form/TextBox","dijit/form/ValidationTextBox","dijit/layout/ContentPane","dijit/form/FilteringSelect","dojox/form/CheckedMultiSelect","../../kernel","./AnalysisBase","./_AnalysisOptions","./CreditEstimator","./AnalysisToggleButton","./GroupToggleButton","./utils","./AnalysisRegistry","dojo/i18n!./nls/GeographicallyWeightedRegression","dojo/text!./templates/GeographicallyWeightedRegression.html"],(function(e,t,i,s,n,a,o,r,h,l,d,u,c,p,y,g,m,_,b,f,S,v,L,N,j,x,C,B,I,w,T,P,A,O,F,U,W,D,k){var M=t([p,y,g,m,_,P,T],{declaredClass:"esri.dijit.analysis.GeographicallyWeightedRegression",templateString:k,widgetsInTemplate:!0,outputName:"outputTrainedName",inputLayer:{},inputLayers:[],explanatoryVariables:"",dependentVariable:"",neighborhoodType:"",distanceBand:NaN,distanceBandUnit:"",numberOfNeighbors:NaN,localWeightingScheme:"",outputTrainedName:"",i18n:null,toolName:"GeographicallyWeightedRegression",helpFileName:"GeographicallyWeightedRegression",resultParameter:["outputTrained"],returnProcessInfo:!0,constructor:function(e){this._pbConnects=[],e.containerNode&&(this.container=e.containerNode)},destroy:function(){this.inherited(arguments),this._pbConnects.forEach(s.disconnect),delete this._pbConnects},postMixInProperties:function(){this.inherited(arguments),i.mixin(this.i18n,D)},postCreate:function(){this.inherited(arguments),u.add(this._form.domNode,"esriSimpleForm"),this._outputLayerInput.set("validator",i.hitch(this,this.validateServiceName)),this.filterObjects=[{layer:"inputLayer",select:this._analysisSelect,expressionObj:"attributeExprObj"}],this._buildUI()},startup:function(){},_loadConnections:function(){this.on("start",i.hitch(this,"_onClose",!0)),this._connect(this._closeBtn,"onclick",i.hitch(this,"_onClose",!1))},_connect:function(e,t,i){this._pbConnects.push(s.connect(e,t,i))},_buildUI:function(){this._loadConnections(),this.signInPromise.then(i.hitch(this,U.initHelpLinks,this.domNode,this.showHelp,{analysisGpServer:this.analysisGpServer})),this.showSelectFolder&&this.getFolderStore().then(i.hitch(this,(function(e){this.folderStore=e,U.setupFoldersUI({folderStore:this.folderStore,folderId:this.folderId,folderName:this.folderName,folderSelect:this._webMapFolderSelect,username:this.portalUser?this.portalUser.username:""})}))),l.set(this._chooseExtentDiv,"display",!0===this.showChooseExtent?"inline-block":"none"),U.addReadyToUseLayerOption(this,[this._analysisSelect]),this._setNumberOfNeighborsConstraints(),this._updateDistanceBandConstraints(),this._harmonizeJobParamsAndUI()},_harmonizeJobParamsAndUI:function(){this.inputLayer&&this.inputLayers&&!U.isLayerInLayers(this.inputLayer,this.inputLayers)&&this.inputLayers.push(this.inputLayer),U.populateAnalysisLayers(this,"inputLayer","inputLayers"),this._handleAnalysisLayerChange(this._analysisSelect.get("value")),this.dependentVariable&&this._fieldSelect.set("value",this.dependentVariable),setTimeout(i.hitch(this,(function(){this.explanatoryVariables&&this._explanatoryFieldSelect.set("value",this.explanatoryVariables.split(",")),this.neighborhoodType&&this._neighborhoodSelect.set("value",this.neighborhoodType),this.numberOfNeighbors&&this._neighborsNumberInput.set("value",this.numberOfNeighbors),this.distanceBand&&this._distanceBandInput.set("value",this.distanceBand),this.distanceBandUnit&&this._distanceBandUnitSelect.set("value",this.distanceBandUnit),this.localWeightingScheme&&this._weightSelect.set("value",this.localWeightingScheme),this.outputTrainedName&&this._outputLayerInput.set("value",this.outputTrainedName.serviceProperties.name),this._useExtentCheck&&this._useExtentCheck.set("checked",!1!==this.extentCheck),this._createFilterAndSelections()})),0)},_setNumberOfNeighborsConstraints:function(){var e={min:2,max:5e3};this._neighborsNumberInput.set("constraints",e),this._neighborsNumberInput.set("rangeMessage",h.substitute(this.i18n.numNeighborsWarning,e))},_updateDistanceBandConstraints:function(){var e={Meters:5e5,Kilometers:500,Yards:546806.65,NauticalMiles:269.98,Miles:310.69,Feet:1640419.9},t=this._distanceBandUnitSelect.get("value");this._distanceBandInput.set("constraints",{min:1e-10,max:e[t]}),this._distanceBandInput.set("rangeMessage",h.substitute(this.i18n.distanceBandWarning,{min:0,max:e[t]}))},_setAnalysisGpServerAttr:function(e){e&&(this.analysisGpServer=e,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName))},_setDisableRunAnalysisAttr:function(e){this._saveBtn.set("disabled",e)},_setInputLayerAttr:function(e){this.inputLayer=e,U.addAttributeOptions({selectWidget:this._fieldSelect,layer:this.inputLayer,allowSelectLabel:!1,priorityChange:!0,allowStringType:!1,allowNumericType:!0,allowDateType:!1}),this.inputLayer&&this._outputLayerInput.set("value",h.substitute(this.i18n.outputLayerName,{inputLayerName:this.inputLayer.name}))},_getOutputLayerNameAttr:function(){return this._outputLayerInput.get("value")},_handleAnalysisLayerChange:function(e){"browse"===e||"browselayers"===e?this._createBrowseItems(e,{geometryTypes:[W.GeometryTypes.Point]},this._analysisSelect):this.set("inputLayer",this.inputLayers[e])},_handleBrowseItemsSelect:function(e,t){e&&e.selection&&U.addAnalysisReadyLayer({item:e.selection,layers:this.inputLayers,layersSelect:this._analysisSelect,browseDialog:e.dialog||this._browsedlg,widget:this},t)},_handleFieldChange:function(e){U.addAttributeOptions({selectWidget:this._explanatoryFieldSelect,layer:this.inputLayer,allowSelectLabel:!1,priorityChange:!1,allowStringType:!1,allowNumericType:!0,allowDateType:!1}),this._explanatoryFieldSelect.removeOption({value:e})},_handleNeighborhoodCriteriaChange:function(e){u.toggle(this._distanceBandInputUI,"hide","DistanceBand"!==e),u.toggle(this._neighborsInputUI,"hide","DistanceBand"===e),this._distanceBandUnitSelect.set("required","DistanceBand"===e),this._distanceBandInput.set("required","DistanceBand"===e),this._neighborsNumberInput.set("required","DistanceBand"!==e)},_handleDistanceBandUnitChange:function(){this._updateDistanceBandConstraints()},_buildJobParams:function(){var e={inputLayer:this.inputLayer?n.toJson(this.constructAnalysisInputLyrObj(this.inputLayer)):null,explanatoryVariables:this._explanatoryFieldSelect.get("value").join(","),dependentVariable:this._fieldSelect.get("value"),neighborhoodType:this._neighborhoodSelect.get("value"),localWeightingScheme:this._weightSelect.get("value")};"DistanceBand"===e.neighborhoodType?(e.distanceBand=this._distanceBandInput.get("value"),e.distanceBandUnit=this._distanceBandUnitSelect.get("value")):e.numberOfNeighbors=this._neighborsNumberInput.get("value");var t={};return this.showChooseExtent&&this._useExtentCheck.get("checked")&&(t.extent=this.map.extent._normalize(!0)),this.returnFeatureCollection?t.outSR=this.map.spatialReference:e.outputTrainedName=n.toJson({serviceProperties:{name:this.get("outputLayerName")}}),e.context=n.toJson(t),e.returnProcessInfo=this.returnProcessInfo,this._updateJobFilterAndSelection(e)},_buildExecuteObj:function(){var e={};return e.jobParams=this._buildJobParams(),e.itemParams={description:h.substitute(this.i18n.itemDescription,{inputLayerName:this.inputLayer?this.inputLayer.name:this.i18n.currentExtent}),tags:h.substitute(this.i18n.itemTags,{inputLayerName:this.inputLayer?this.inputLayer.name:this.i18n.currentExtent}),snippet:this.i18n.itemSnippet},this.showSelectFolder&&(e.itemParams.folder=this.get("folderId")),this.showGeoAnalyticsParams&&(e.isSpatioTemporalDataStore=!0),e},_handleSaveBtnClick:function(){var e;this._form.validate()&&(this.set("disableRunAnalysis",!0),e=this._buildExecuteObj(),U.checkPCSforAnalysis({widget:this,jobParams:e.jobParams,hasPCSWarnShown:this._hasPCSWarnShown})||this._hasPCSWarnShown?this.execute(e):this._hasPCSWarnShown=!0)},_handleCloseMsg:function(e){e&&e.preventDefault(),a.fadeOut({node:this._errorMessagePane,easing:c.quadOut,onEnd:i.hitch(this,(function(){l.set(this._errorMessagePane,{display:"none"})}))}).play()},_onClose:function(e){e&&(this._save(),this.emit("save",{save:!0})),this.emit("close",{save:e})},_save:function(){},validateServiceName:function(e){return U.validateServiceName(e,{textInput:this._outputLayerInput,isItem:!this.returnFeatureCollection})}});return r("extend-esri")&&i.setObject("dijit.analysis.GeographicallyWeightedRegression",M,w),M}));
