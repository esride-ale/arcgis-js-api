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

define(["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/Color","dojo/_base/json","dojo/has","dojo/json","dojo/string","dojo/dom-style","dojo/dom-attr","dojo/dom-construct","dojo/query","dojo/dom-class","dojo/number","dojo/_base/fx","dojo/fx/easing","dojo/NodeList","dojo/NodeList-dom","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/registry","dijit/form/Button","dijit/form/CheckBox","dijit/Dialog","dijit/form/Form","dijit/form/Select","dijit/form/TextBox","dijit/form/NumberSpinner","dijit/form/NumberTextBox","dijit/form/ValidationTextBox","dijit/layout/ContentPane","dijit/form/FilteringSelect","dijit/form/ToggleButton","dijit/form/DateTextBox","dijit/form/TimeTextBox","dojox/form/CheckedMultiSelect","../../kernel","../../lang","./AnalysisBase","./_AnalysisOptions","../../symbols/SimpleFillSymbol","../../symbols/SimpleLineSymbol","../../toolbars/draw","../PopupTemplate","../../layers/FeatureLayer","../../graphic","./utils","./AnalysisRegistry","./CreditEstimator","../../symbols/PictureMarkerSymbol","dijit/form/HorizontalSlider","dijit/form/HorizontalRule","dijit/form/HorizontalRuleLabels","dojo/i18n!../../nls/jsapi","dojo/text!./templates/CalculateDensity.html"],(function(e,t,i,s,a,n,o,l,r,h,u,d,c,y,p,_,g,m,f,b,L,S,v,w,I,T,A,P,U,C,R,D,M,B,j,x,O,N,k,G,F,E,z,q,H,J,V,W,Z,X,K,Y,Q,$,ee,te,ie,se,ae,ne){var oe=t([L,S,v,w,I,H,q],{declaredClass:"esri.dijit.analysis.CalculateDensity",templateString:ne,widgetsInTemplate:!0,inputLayer:null,field:null,classificationType:"EqualInterval",numClasses:10,boundingPolygonLayer:null,outputLayerName:null,classBreaks:null,radius:null,radiusUnits:null,arealUnits:null,_NOVALUE_:"NOVALUE",map:null,i18n:null,toolName:"CalculateDensity",helpFileName:"CalculateDensity",resultParameter:"resultLayer",constructor:function(e,t){this._pbConnects=[],this._fieldsRows=[],e.containerNode&&(this.container=e.containerNode)},destroy:function(){this.inherited(arguments),s.forEach(this._pbConnects,a.disconnect),delete this._pbConnects},postMixInProperties:function(){this.inherited(arguments),i.mixin(this.i18n,ae.findHotSpotsTool),i.mixin(this.i18n,ae.interpolatePointsTool),i.mixin(this.i18n,ae.calculateDensityTool),this.set("drawLayerName",this.i18n.blayerName),this.set("drawPointLayerName",this.i18n.pointlayerName)},postCreate:function(){this.inherited(arguments),p.add(this._form.domNode,"esriSimpleForm"),u.set(this._fieldsMultiSelect.selectNode,"width","90%"),this._outputLayerInput.set("validator",i.hitch(this,this.validateServiceName)),this._classBreaksInput.set("validator",i.hitch(this,this.validateClassBreaks)),this._bigdataUX=[this._datastoreLabelRow,this._selectDataStore,this._fieldsSelectRow,this._binTypeLabelRow,this._binTypeSelectRow,this._binSizeLabelRow,this._binSizeRow,this._weightLabelRow,this._weightSelectRow,this._neighborhoodLabelRow,this._neighborhoodRow,this._areaLabelRow,this._areaSelectRow,this._timeStepsLabelRow,this._intervalLabelRow,this._intervalRow,this._repeatLabelRow,this._repeatRow,this._timeLabelRow,this._timeRefRow],this._standardUX=[this._fieldSelectRow,this._optionsRow],this._binSizeInput.set("isInRange",i.hitch(this._binSizeInput,Y.isGreaterThanZero)),this._binSizeInput.set("rangeMessage",this.i18n.greaterThanZeroMsg),this._neighborhoodRadiusInput.set("isInRange",i.hitch(this._neighborhoodRadiusInput,Y.isGreaterThanZero)),this._neighborhoodRadiusInput.set("rangeMessage",this.i18n.greaterThanZeroMsg),this._timeIntervalInput.set("isInRange",i.hitch(this._timeIntervalInput,Y.isGreaterThanZero)),this._timeIntervalInput.set("rangeMessage",this.i18n.greaterThanZeroMsg),this._timeRepeatInput.set("isInRange",i.hitch(this._timeIntervalInput,Y.isGreaterThanZero)),this._timeRepeatInput.set("rangeMessage",this.i18n.greaterThanZeroMsg),this.filterObjects=[{layer:"inputLayer",select:this._analysisSelect,expressionObj:"attributeExprObj"}],this._buildUI()},startup:function(){},_handleModeCrumbClick:function(e){e.preventDefault(),this._onClose(!0)},_onClose:function(e){e&&this._featureLayer&&(this.map.removeLayer(this._featureLayer),s.forEach(this.boundingPolygonLayers,(function(e,t){if(e===this._featureLayer)return this._boundingAreaSelect.removeOption({value:t+1,label:this._featureLayer.name}),void this.boundingPolygonLayers.splice(t,1)}),this)),this.showGeoAnalyticsParams&&(this._hasPCSWarnShown=!1),this._handleBoundingBtnChange(!1),this.emit("close",{save:!e})},clear:function(){this._featureLayer&&(this.map.removeLayer(this._featureLayer),s.forEach(this.boundingPolygonLayers,(function(e,t){if(e===this._featureLayer)return this._boundingAreaSelect.removeOption({value:t+1,label:this._featureLayer.name}),void this.boundingPolygonLayers.splice(t,1)}),this)),this._handleBoundingBtnChange(!1)},_handleShowCreditsClick:function(e){e.preventDefault(),this._form.validate()&&this.getCreditsEstimate(this.toolName,this._buildJobParams()).then(i.hitch(this,(function(e){this._usageForm.set("content",e),this._usageDialog.show()})))},_deleteFieldsSelect:function(){this._fieldsMultiSelect.removeOption(this._fieldsMultiSelect.getOptions()),s.forEach(this._fieldsMultiSelect.options,(function(e){this._fieldsMultiSelect.removeOption({value:e.name})}),this)},_createFieldsSelect:function(){var e,t=this.inputLayer,i=t.fields;s.forEach(i,(function(i,a){i.name!==t.objectIdField&&-1!==s.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble"],i.type)&&(e={value:i.name,label:z.isDefined(i.alias)&&""!==i.alias?i.alias:i.name},this.fields&&-1!==this.fields.indexOf(i.name)&&(e.selected="selected",i.name),this._fieldsMultiSelect.addOption(e))}),this)},_buildJobParams:function(){var e,t={};return t.inputLayer=o.toJson(this.constructAnalysisInputLyrObj(this.get("inputLayer"))),this.get("radius")&&(t.radius=this.radius),this.get("areaUnits")&&(t.areaUnits=this.areaUnits),this.get("boundingPolygonLayer")&&(t.boundingPolygonLayer=o.toJson(this.constructAnalysisInputLyrObj(this.boundingPolygonLayer))),this.get("showGeoAnalyticsParams")?(this._fieldsMultiSelect.get("value")&&(t.fields=this._fieldsMultiSelect.get("value").toString()),t.binType=this.get("binType"),this._binSizeInput.get("value")>0&&(t.binSize=this._binSizeInput.get("value")),this._binSizeUnitSelect.get("value")&&(t.binSizeUnit=this._binSizeUnitSelect.get("value")),this._weightSelect.get("value")&&(t.weight=this._weightSelect.get("value")),this._neighborhoodRadiusInput.get("value")>0&&(t.radius=this._neighborhoodRadiusInput.get("value")),this._neighborhoodRadiusUnitSelect.get("value")&&(t.radiusUnit=this._neighborhoodRadiusUnitSelect.get("value")),this._areaUnitSelect.get("value")&&(t.areaUnits=this._areaUnitSelect.get("value")),this._timeIntervalInput.get("value")>0&&(t.timeStepInterval=this._timeIntervalInput.get("value"),this._timeIntervalUnits.get("value")&&(t.timeStepIntervalUnit=this._timeIntervalUnits.get("value"))),this._timeRepeatInput.get("value")>0&&(t.timeStepRepeatInterval=this._timeRepeatInput.get("value"),this._timeRepeatUnits.get("value")&&(t.timeStepRepeatIntervalUnit=this._timeRepeatUnits.get("value"))),this.get("timeReference")&&(t.timeStepReference=this.get("timeReference")),this.resultParameter="output"):(this.radius&&this.get("radiusUnits")&&(t.radiusUnits=this.radiusUnits),this.get("field")&&(t.field=this.get("field")),this.get("classificationType")&&(t.classificationType=this.get("classificationType")),"Manual"!==this.classificationType?t.numClasses=this.get("numClasses"):t.classBreaks=this.get("classBreaks")),this.returnFeatureCollection||(t.OutputName=o.toJson({serviceProperties:{name:this.get("outputLayerName")}})),this.showChooseExtent&&!this.get("DisableExtent")&&this._useExtentCheck.get("checked")&&(t.context=o.toJson({extent:this.map.extent._normalize(!0)})),this.showGeoAnalyticsParams?(e={},this.showChooseExtent&&this._useExtentCheck.get("checked")&&(e.extent=this.map.extent._normalize(!0)),t.context=o.toJson(e)):this.returnFeatureCollection&&(e={outSR:this.map.spatialReference},this.showChooseExtent&&this._useExtentCheck.get("checked")&&(e.extent=this.map.extent._normalize(!0)),t.context=o.toJson(e)),t.returnFeatureCollection=this.returnFeatureCollection,this._updateJobFilterAndSelection(t)},_handleSaveBtnClick:function(e){var t={},i={};this._form.validate()&&(this.showGeoAnalyticsParams&&Y.unitConversion(this._binSizeInput.get("value"),Y.UNITSMAP[this._binSizeUnitSelect.get("value")],Y.UNITSMAP[this._neighborhoodRadiusUnitSelect.get("value")])>=this._neighborhoodRadiusInput.get("value")?this._showMessages(this.i18n.smallBinErrorMsg):(this._saveBtn.set("disabled",!0),i.jobParams=this._buildJobParams(),!this.showGeoAnalyticsParams||(i.isSpatioTemporalDataStore=!0,Y.checkPCSforAnalysis({widget:this,jobParams:t,hasPCSWarnShown:this._hasPCSWarnShown})||this._hasPCSWarnShown)?(i.itemParams={description:this.i18n.itemDescription,tags:h.substitute(this.i18n.itemTags,{layername:this.inputLayer.name,fieldname:t.field?t.field:""}),snippet:this.i18n.itemSnippet},this.showSelectFolder&&(i.itemParams.folder=this.get("folderId")),this.execute(i)):this._hasPCSWarnShown=!0))},_handleBrowseItemsSelect:function(e,t){e&&e.selection&&Y.addAnalysisReadyLayer({item:e.selection,layers:this._isAnalysisSelect?this.inputLayers:this.boundingPolygonLayers,layersSelect:this._isAnalysisSelect?this._analysisSelect:this._boundingAreaSelect,posIncrement:this._isAnalysisSelect?0:1,browseDialog:e.dialog||this._browsedlg,widget:this},t).always(i.hitch(this,this._updateAnalysisLayerUI,!0))},_handleRefTimeChange:function(e){this._timeRefDay.set("required",e&&!this._timeRefDay.get("value"))},_save:function(){},_buildUI:function(){Y.updateDisplay(this._standardUX,!this.get("showGeoAnalyticsParams"),"table-row"),Y.updateDisplay(this._bigdataUX,this.get("showGeoAnalyticsParams"),"table-row"),Y.updateDisplay([this._datastoreLabelRow,this._selectDataStore],!1,"table-row"),this._binSizeInput.set("required",this.get("showGeoAnalyticsParams")),this._binSizeUnitSelect.set("required",this.get("showGeoAnalyticsParams")),this._weightSelect.set("required",this.get("showGeoAnalyticsParams")),this._neighborhoodRadiusInput.set("required",this.get("showGeoAnalyticsParams")),this._neighborhoodRadiusUnitSelect.set("required",this.get("showGeoAnalyticsParams"));var e=!0;if(this._radiusUnitsSelect.addOption([{value:"Miles",label:this.i18n.miles},{value:"Feet",label:this.i18n.feet},{type:"separator"},{value:"Kilometers",label:this.i18n.kilometers},{value:"Meters",label:this.i18n.meters}]),this._areaUnitsSelect.addOption([{value:"SquareMiles",label:this.i18n.sqMiles},{value:"SquareKilometers",label:this.i18n.sqKm}]),this.signInPromise.then(i.hitch(this,Y.initHelpLinks,this.domNode,this.showHelp,{analysisGpServer:this.analysisGpServer})),this.get("showSelectAnalysisLayer")&&(this.inputLayers&&this.inputLayer&&!Y.isLayerInLayers(this.inputLayer,this.inputLayers)&&this.inputLayers.push(this.inputLayer),this.get("inputLayer")||!this.get("inputLayers")||this.rerun||this.set("inputLayer",this.inputLayers[0]),Y.populateAnalysisLayers(this,"inputLayer","inputLayers")),this.boundingPolygonLayers&&this.boundingPolygonLayer&&!Y.isLayerInLayers(this.boundingPolygonLayer,this.boundingPolygonLayers)&&(this.boundingPolygonLayers.push(this.boundingPolygonLayer),-1!==this.boundingPolygonLayer.name.indexOf("Drawn Boundaries")&&(this.map.addLayer(this.boundingPolygonLayer),this._featureLayer=this.boundingPolygonLayer,this._createBoundingPolyFeatColl())),this.outputLayerName&&(this._outputLayerInput.set("value",this.outputLayerName),e=!1),this.inputLayer&&this._updateAnalysisLayerUI(e),this.classificationType&&this._classifySelect.set("value",this.classificationType),this.radius&&this._handleOptionsBtnClick(),this.boundingPolygonLayers){var t=[{value:"-1",label:this.i18n.defaultBoundingOption,selected:!this.boundingPolygonLayer}];s.forEach(this.boundingPolygonLayers,(function(e,i){if(e.geometryType===Q.GeometryTypes.Polygon){var s=this.boundingPolygonLayer&&(this.boundingPolygonLayer.url&&e.url&&this.boundingPolygonLayer.url===e.url||this.boundingPolygonLayer.name===e.name);t.push({value:i+1,label:e.name,selected:s})}}),this),this._boundingAreaSelect.addOption(t)}Y.addReadyToUseLayerOption(this,[this._analysisSelect,this._boundingAreaSelect]),this.classBreaks&&this._classBreaksInput.set("value",this.classBreaks.join().replace(/,/g," ")),this.radius&&this._searchDistanceInput.set("value",this.radius),this.radiusUnits?this._radiusUnitsSelect.set("value",this.radiusUnits):this._radiusUnitsSelect.set("value",this.distanceDefaultUnits),this.areaUnits?this._areaUnitsSelect.set("value",this.areaUnits):this._areaUnitsSelect.set("value","Miles"===this.distanceDefaultUnits?"SquareMiles":"SquareKilometers"),this.showGeoAnalyticsParams?(d.set(this._outputLayerLabel,"innerHTML",this.i18n.nineLabel),d.set(this._analysisFieldHelpLink,"esriHelpTopic","fields"),d.set(this._analysisLayerLabel,"innerHTML",this.i18n.analysisLayerLabelBigData),d.set(this._selectAttributesLbl,"innerHTML",this.i18n.selectAttributesLabelBigData),this._binSizeUnitSelect.set("value",this.distanceDefaultUnits),this._neighborhoodRadiusUnitSelect.set("value",this.distanceDefaultUnits),this._areaUnitSelect.set("value","Miles"===this.distanceDefaultUnits?"SquareMiles":"SquareKilometers"),this.weight&&this._weightSelect.set("value",this.weight),this.binSize&&this._binSizeInput.set("value",this.binSize),this.binSizeUnit&&this._binSizeUnitSelect.set("value",this.binSizeUnit),this.radius&&this._neighborhoodRadiusInput.set("value",this.radius),this.radiusUnit&&this._neighborhoodRadiusUnitSelect.set("value",this.radiusUnit),this.timeStepInterval&&(this._timeIntervalInput.set("value",this.timeStepInterval),this._timeIntervalUnits.set("value",this.timeStepIntervalUnit)),this.timeStepRepeatInterval&&(this._timeRepeatInput.set("value",this.timeStepRepeatInterval),this._timeRepeatUnits.set("value",this.timeStepRepeatIntervalUnit)),this._updateTimeUX()):(d.set(this._outputLayerLabel,"innerHTML",this.i18n.threeLabel),d.set(this._analysisFieldHelpLink,"esriHelpTopic","field"),d.set(this._analysisLayerLabel,"innerHTML",this.i18n.analysisLayerLabel),d.set(this._selectAttributesLbl,"innerHTML",this.i18n.selectAttributesLabel)),u.set(this._chooseFolderRow,"display",!0===this.showSelectFolder?"block":"none"),this.showSelectFolder&&this.getFolderStore().then(i.hitch(this,(function(e){this.folderStore=e,Y.setupFoldersUI({folderStore:this.folderStore,folderId:this.folderId,folderName:this.folderName,folderSelect:this._webMapFolderSelect,username:this.portalUser?this.portalUser.username:""})}))),u.set(this._chooseExtentDiv,"display",!0===this.showChooseExtent?"inline-block":"none"),u.set(this._showCreditsLink,"display",!0===this.showCredits?"block":"none"),this._loadConnections(),this.showGeoAnalyticsParams&&("Hexagon"===this.binType||"Square"===this.binType?this._handleBinTypeChange(this.binType):this._handleBinTypeChange("Square")),this._createFilterAndSelections()},_updateAnalysisLayerUI:function(e){this.inputLayer&&(d.set(this._interpolateToolDescription,"innerHTML",h.substitute(this.i18n.toolDefine,{layername:this.inputLayer.name})),e&&(this.outputLayerName=h.substitute(this.i18n.outputLayerName,{layername:this.inputLayer.name}),this._outputLayerInput.set("value",this.outputLayerName)),this.set("fields",this.inputLayer),this._updateTimeUX())},_updateTimeUX:function(){if(this.showGeoAnalyticsParams){this._isTimeInstantLayer=!!this.inputLayer&&Y.isTimeInstantLayer(this.inputLayer);var e=new f([this._timeStepsLabelRow,this._intervalLabelRow,this._intervalRow,this._repeatLabelRow,this._repeatRow,this._timeRefRow,this._timeLabelRow,this._timeStepLabelNo]),t=[this._timeRefDay,this._timeRefTime,this._timeRepeatUnits,this._timeRepeatInput,this._timeIntervalUnits,this._timeIntervalInput];s.forEach(t,(function(e){e.set("disabled",!this._isTimeInstantLayer)}),this),e.toggleClass("esriAnalysisTextDisabled",!this._isTimeInstantLayer)}},_handleAnalysisLayerChange:function(e){this._isAnalysisSelect=!0,"browse"===e||"browselayers"===e?this.get("showGeoAnalyticsParams")?this._createBrowseItems({browseValue:e,disabledSubResources:[this.inputLayer]},{tags:["point"],geometryTypes:[Q.GeometryTypes.Point]},this._analysisSelect):this._createBrowseItems({browseValue:e},{tags:["point","line"],geometryTypes:[Q.GeometryTypes.Point,Q.GeometryTypes.Line]},this._analysisSelect):(this.inputLayer=this.inputLayers[e],this._updateAnalysisLayerUI(!0))},_handleMethodChange:function(e){"NN"===e?(p.add(this._optionsDiv,"disabled"),p.contains(this._optionsDiv,"optionsOpen")&&(p.remove(this._optionsDiv,"optionsOpen"),p.add(this._optionsDiv,"optionsClose"))):(p.contains(this._optionsDiv,"disabled")&&p.remove(this._optionsDiv,"disabled"),"KG"===e?(u.set(this._barrierLabelRow,"display","none"),u.set(this._barrierSelectRow,"display","none"),u.set(this._speedLabelRow,"display",""),u.set(this._speedSliderRow,"display","")):"LP"===e&&(u.set(this._barrierLabelRow,"display",""),u.set(this._barrierSelectRow,"display",""),u.set(this._speedLabelRow,"display","none"),u.set(this._speedSliderRow,"display","none")))},_handleOptimizeSliderChange:function(e){this.set("interpolateOption",this._optimizeSlider.get("value"))},_handleBinTypeChange:function(e){p.toggle(this._square,"selected","Square"===e),p.toggle(this._hexagon,"selected","Hexagon"===e),this.set("binType",e)},_handleBinSizeUnitChange:function(e){},_handleWeightChange:function(e){},_handleNeighborhoodRadiusUnitChange:function(e){},_handleAreaUnitChange:function(e){},_handleOptionsBtnClick:function(){p.contains(this._optionsDiv,"disabled")||(p.contains(this._optionsDiv,"optionsClose")?(p.remove(this._optionsDiv,"optionsClose"),p.add(this._optionsDiv,"optionsOpen")):p.contains(this._optionsDiv,"optionsOpen")&&(p.remove(this._optionsDiv,"optionsOpen"),p.add(this._optionsDiv,"optionsClose")))},_handleBoundingSelectChange:function(e){this._isAnalysisSelect=!1,"browse"!==e&&"browselayers"!==e||this._createBrowseItems({browseValue:e,disabledSubResources:[this.boundingLayer]},{tags:["polygon"],geometryTypes:[Q.GeometryTypes.Polygon]},this._boundingAreaSelect)},_handleArealUnitsSelectChange:function(e){},_handleBoundingBtnChange:function(e){e?(this.emit("drawtool-activate",{}),this._featureLayer||this._createBoundingPolyFeatColl(),this._toolbar.activate(W.POLYGON)):(this._toolbar.deactivate(),this.emit("drawtool-deactivate",{}))},_handleDistValueChange:function(e){},_handleDistUnitsChange:function(e){},_handleClassifySelectChange:function(e){u.set(this._classifyOtherOptionLabelRow,"display","Manual"===e?"none":"block"),u.set(this._classifyOtherOptionInputRow,"display","Manual"===e?"none":"block"),u.set(this._manualOptionInputRow,"display","Manual"===e?"block":"none"),u.set(this._manualOptionLabelRow,"display","Manual"===e?"block":"none")},_loadConnections:function(){this.on("start",i.hitch(this,"_onClose",!1)),this._connect(this._closeBtn,"onclick",i.hitch(this,"_onClose",!0)),this.showGeoAnalyticsParams&&(this._connect(this._square,"onclick",i.hitch(this,this._handleBinTypeChange,"Square")),this._connect(this._hexagon,"onclick",i.hitch(this,this._handleBinTypeChange,"Hexagon")))},_createBoundingPolyFeatColl:function(){if(!this._featureLayer){var e=Y.createPolygonFeatureCollection(this.drawLayerName);this._featureLayer=new X(e,{id:this.drawLayerName}),this.map.addLayer(this._featureLayer)}a.connect(this._featureLayer,"onClick",i.hitch(this,(function(e){this.map.infoWindow.setFeatures([e.graphic])})))},_addFeatures:function(e){var t=[],i={},a=new K(e);if(i.description="blayer desc",i.title="blayer",a.setAttributes(i),t.push(a),this._featureLayer.applyEdits(t,null,null),0===this.boundingPolygonLayers.length||this.boundingPolygonLayers[this.boundingPolygonLayers.length-1]!==this._featureLayer){var n=this.boundingPolygonLayers.push(this._featureLayer),o=this._boundingAreaSelect.getOptions();this._boundingAreaSelect.removeOption(o),(o=s.map(o,(function(e){return e.selected=!1,e}))).push({value:n,label:this._featureLayer.name,selected:!0}),this._boundingAreaSelect.addOption(o)}},validateServiceName:function(e){return Y.validateServiceName(e,{textInput:this._outputLayerInput,isItem:!this.returnFeatureCollection})},validateClassBreaks:function(){var e,t,a,n=[],o=[];return e=i.trim(this._classBreaksInput.get("value")).split(" "),"Manual"!==this.get("classificationType")||!(!e&&"Manual"===this.get("classificationType"))&&(!(e.length<2||e.length>31)&&(s.some(e,(function(s,l){return s=_.parse(s),isNaN(s)?(n.push(0),!1):o[e[l]]?(o[e[l]]=!1,n.push(0),!1):(o[e[l]]=!0,t=_.format(s,{locale:"root"}),z.isDefined(t)?z.isDefined(t)||(t=_.format(s,{locale:"en-us"})):t=_.format(s,{locale:"en"}),z.isDefined(t)&&(a=i.trim(t).match(/\D/g)),a&&a.length>0?(n.push(0),!1):void 0)})),-1===s.indexOf(n,0)))},_setAnalysisGpServerAttr:function(e){e&&(this.analysisGpServer=e,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName))},_setInputLayerAttr:function(e){this.inputLayer=null,(this.showGeoAnalyticsParams?z.isDefined(e)&&(e.geometryType===Q.GeometryTypes.Point||e.geometryType===Q.GeometryTypes.MultiPoint):z.isDefined(e)&&(e.geometryType===Q.GeometryTypes.Point||e.geometryType===Q.GeometryTypes.MultiPoint||e.geometryType===Q.GeometryTypes.Line))&&(this.inputLayer=e)},_getInputLayerAttr:function(){return this.inputLayer},_setInputLayersAttr:function(e){e||(e=[]),e=s.filter(e,(function(e){return this.showGeoAnalyticsParams?e.geometryType===Q.GeometryTypes.Point||e.geometryType===Q.GeometryTypes.MultiPoint:e.geometryType===Q.GeometryTypes.Point||e.geometryType===Q.GeometryTypes.MultiPoint||e.geometryType===Q.GeometryTypes.Line}),this),this.inputLayers=e},_setFieldsAttr:function(e){if(this.get("showGeoAnalyticsParams"))this._deleteFieldsSelect(),this._createFieldsSelect();else{var t,i,a=e.fields;this._fieldSelect&&this._fieldSelect.removeOption(this._fieldSelect.getOptions()),this._fieldSelect.addOption({value:this._NOVALUE_,label:this.i18n.chooseCountField}),s.forEach(a,(function(a,n){a.name!==e.objectIdField&&-1!==s.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble"],a.type)&&(t={value:a.name,label:z.isDefined(a.alias)&&""!==a.alias?a.alias:a.name},this.field&&t.value===this.field&&(t.selected="selected",i=a.name),this._fieldSelect.addOption(t))}),this),i&&this._fieldSelect.set("value",i)}},_setFieldAttr:function(e){this.field=e},_getFieldAttr:function(){if(!this.get("showGeoAnalyticsParams"))return this._fieldSelect&&(this.field=this._fieldSelect.get("value")!==this._NOVALUE_?this._fieldSelect.get("value"):null),this.field},_setRadiusAttr:function(e){this._set("radius",e)},_getRadiusAttr:function(){return this.get("showGeoAnalyticsParams")?this._neighborhoodRadiusInput&&this.set("radius",this._neighborhoodRadiusInput.get("value")):this._searchDistanceInput&&this.set("radius",this._searchDistanceInput.get("value")),this.radius},_setRadiusUnitsAttr:function(e){this._set("radiusUnits",e)},_getRadiusUnitsAttr:function(){return this.get("showGeoAnalyticsParams")?(this._neighborhoodRadiusUnitSelect&&this.set("radiusUnit",this._neighborhoodRadiusUnitSelect.get("value")),this.radiusUnit):(this._radiusUnitsSelect&&this.set("radiusUnits",this._radiusUnitsSelect.get("value")),this.radiusUnits)},_setAreaUnitsAttr:function(e){this._set("areaUnits",e)},_getAreaUnitsAttr:function(){return this.get("showGeoAnalyticsParams")?this._areaUnitSelect&&this.set("areaUnits",this._areaUnitSelect.get("value")):this._areaUnitsSelect&&this.set("areaUnits",this._areaUnitsSelect.get("value")),this.areaUnits},_setClassificationTypeAttr:function(e){this.classificationType=e},_getClassificationTypeAttr:function(){return this._classifySelect&&!this.get("showGeoAnalyticsParams")&&(this.classificationType=this._classifySelect.get("value")),this.classificationType},_getNumClassesAttr:function(){return this._numClassesInput&&!this.get("showGeoAnalyticsParams")&&(this.numClasses=this._numClassesInput.get("value")),this.numClasses},_setNumClassesAttr:function(e){this.numClasses=e},_getClassBreaksAttr:function(){if(this._classBreaksInput&&!this.get("showGeoAnalyticsParams")){var e=i.trim(this._classBreaksInput.get("value")).split(" "),t=[];s.forEach(e,(function(e){t.push(_.parse(e))})),this.classBreaks=t}return this.classBreaks},_setClassBreaksAttr:function(e){e&&(this.classBreaks=e)},_getBoundingPolygonLayerAttr:function(){return this._boundingAreaSelect&&(this.boundingPolygonLayer=null,"-1"!==this._boundingAreaSelect.get("value")&&""!==this._boundingAreaSelect.get("value")&&(this.boundingPolygonLayer=this.boundingPolygonLayers[this._boundingAreaSelect.get("value")-1])),this.boundingPolygonLayer},_setBoundingPolygonLayerAttr:function(e){this.boundingPolygonLayer=e},_setBoundingPolygonLayersAttr:function(e){this.boundingPolygonLayers=e||[]},_getOutputLayerNameAttr:function(){return this._outputLayerInput&&(this.outputLayerName=this._outputLayerInput.get("value")),this.outputLayerName},_setOutputLayerNameAttr:function(e){this.outputLayerName=e},_setMapAttr:function(e){this.map=e,this._toolbar=new W(this.map),a.connect(this._toolbar,"onDrawEnd",i.hitch(this,this._addFeatures))},_getMapAttr:function(){return this.map},_setDrawLayerNameAttr:function(e){this.drawLayerName=e},_getDrawLayerNameAttr:function(){return this._featureLayer.name},_setDisableRunAnalysisAttr:function(e){this._saveBtn.set("disabled",e)},_getDrawLayerAttr:function(){var e=[];return this._featureLayer&&e.push(this._featureLayer),this._pointfeatureLayer&&e.push(this._pointfeatureLayer),e},_setDisableExtentAttr:function(e){this._useExtentCheck.set("checked",!e),this._useExtentCheck.set("disabled",e)},_getDisableExtentAttr:function(){this._useExtentCheck.get("disabled")},_setBinTypeAttr:function(e){this.binType=e},_getBinTypeAttr:function(){return this.binType},_connect:function(e,t,i){this._pbConnects.push(a.connect(e,t,i))},_showMessages:function(e){d.set(this._bodyNode,"innerHTML",e),g.fadeIn({node:this._errorMessagePane,easing:m.quadIn,onEnd:i.hitch(this,(function(){u.set(this._errorMessagePane,{display:""})}))}).play()},_handleCloseMsg:function(e){e&&e.preventDefault(),g.fadeOut({node:this._errorMessagePane,easing:m.quadOut,onEnd:i.hitch(this,(function(){u.set(this._errorMessagePane,{display:"none"})}))}).play()}});return l("extend-esri")&&i.setObject("dijit.analysis.CalculateDensity",oe,E),oe}));
