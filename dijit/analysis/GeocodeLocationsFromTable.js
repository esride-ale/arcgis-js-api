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

define(["require","dojo/aspect","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/json","dojo/_base/kernel","dojo/has","dojo/json","dojo/string","dojo/dom-style","dojo/dom-attr","dojo/dom-construct","dojo/query","dojo/dom-class","dojo/promise/all","dojo/store/Memory","dojo/store/Observable","dojo/data/ObjectStore","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/registry","dijit/form/Button","dijit/form/CheckBox","dijit/form/Form","dijit/form/Select","dijit/form/TextBox","dijit/form/ValidationTextBox","dijit/layout/ContentPane","dijit/form/FilteringSelect","dijit/Dialog","dgrid1/OnDemandGrid","dgrid1/Editor","dgrid1/Keyboard","dgrid1/Selection","dgrid1/Selector","dgrid1/extensions/ColumnResizer","dgrid1/extensions/DijitRegistry","dstore/Filter","../../kernel","../../lang","../../request","./AnalysisBase","./utils","./CreditEstimator","./_AnalysisOptions","./storeUtils","./ItemTypes","../../tasks/Geoprocessor","dojo/i18n!../../nls/jsapi","dojo/i18n!./nls/countries","dojo/text!./templates/GeocodeLocationsFromTable.html"],(function(t,e,i,s,a,o,n,l,r,h,d,u,c,p,m,b,y,_,f,g,T,w,S,L,v,F,A,C,G,j,P,I,x,N,D,E,R,k,O,U,B,J,z,M,W,X,H,V,q,K,Q,Y,Z,$,tt,et){var it=i([E,R,k,O,U,B,J]),st=i([T,w,S,L,v,K,H],{declaredClass:"esri.dijit.analysis.GeocodeLocationsFromTable",templateString:et,widgetsInTemplate:!0,inputTable:null,inputTables:[],outputLayerName:null,i18n:null,toolName:"BatchGeocode",analyzeToolName:"AnalyzeGeocodeInput",helpFileName:"GeocodeLocationsfromTable",resultParameter:"geocodeResult",checkCreditLimits:!1,allowWorldGeocoder:!0,showChooseExtent:!1,constructor:function(t){this._pbConnects=[],t.containerNode&&(this.container=t.containerNode),t.showGeoAnalyticsParams&&(this.toolName="GeocodeLocations")},destroy:function(){this.inherited(arguments),a.forEach(this._pbConnects,o.disconnect),delete this._pbConnects},postMixInProperties:function(){this.inherited(arguments),s.mixin(this.i18n,$.geocodeFromTableTool),s.mixin(this.i18n,tt)},postCreate:function(){this.inherited(arguments),b.add(this._form.domNode,"esriSimpleForm"),this._outputLayerInput.set("validator",s.hitch(this,this.validateServiceName)),this.filterObjects=[{layer:"inputLayer",layerForTool:"inputTable",select:this._analysisSelect,expressionObj:"attributeExprObj"}],this.inputTable&&this.inputTable.itemid?(this.inputTable.itemId=this.inputTable.itemid,this.signInPromise.then(s.hitch(this,(function(){this.getItemInfo(this.inputTable.itemId).then(s.hitch(this,(function(t){this.inputTable=s.mixin(this.inputTable,t),this.inputTable.name=t.title,this.inputTable&&!V.isLayerInLayers(this.inputTable,this.inputTables)&&this.inputTables.push(this.inputTable),this._buildUI()})),s.hitch(this,(function(t){console.log(t)})))})))):this._buildUI()},startup:function(){},_buildJobParams:function(){var t,e={};return this.showGeoAnalyticsParams?e.inputLayer=this.constructAnalysisInputLyrObj(this.inputTable,!0):this.inputTable.itemId&&-1!==a.indexOf([Y.CSV,Y.XLS],this.inputTable.type)?e.inputFileItem=n.toJson({itemid:this.inputTable.itemId}):e.inputTable=this.constructAnalysisInputLyrObj(this.inputTable,!0),e.geocodeServiceUrl=this.locator.url,e.geocodeParameters=n.toJson(this.get("geocodeParameters")),this.showGeoAnalyticsParams||(e.outputType=this._formatSelect.get("value")),this.showGeoAnalyticsParams&&(e.includeAttributes=this._includeAttributesCheck.get("checked")),V.isEsriWorldGeocoder(e.geocodeServiceUrl)&&(e.sourceCountry="world"===this._countryCodes.get("value")?"":this._countryCodes.get("value")),this.showGeoAnalyticsParams?this.returnFeatureCollection||(e.OutputName=n.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}})):this.returnFeatureCollection||"Feature Service"!==e.outputType?this.returnFeatureCollection||"Feature Service"===e.outputType||(e.OutputName={itemProperties:{title:this._outputLayerInput.get("value"),description:d.substitute(this.i18n.itemDescription,{inputTableName:this.inputTable.name}),tags:d.substitute(this.i18n.itemTags,{inputTableName:this.inputTable.name}),snippet:this.i18n.itemSnippet}},this.showSelectFolder&&(e.OutputName.itemProperties.folderId=this.get("folderId")),e.OutputName=n.toJson(e.OutputName)):e.OutputName=n.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}}),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(e.context=n.toJson({extent:this.map.extent._normalize(!0)})),this.returnFeatureCollection&&(t={outSR:this.map.spatialReference},this.showChooseExtent&&this._useExtentCheck.get("checked")&&(t.extent=this.map.extent._normalize(!0)),e.context=n.toJson(t)),this._updateJobFilterAndSelection(e)},_onClose:function(t){this._aspectHandle&&(this._aspectHandle.remove(),this._aspectHandle=null),t&&(this._save(),this.emit("save",{save:!0})),this.emit("close",{save:t})},_handleSaveBtnClick:function(){var t={};this._form.validate()&&(this.set("disableRunAnalysis",!0),this.showGeoAnalyticsParams&&this.set("analysisGpServer",this.helperServices.geoanalytics&&this.helperServices.geoanalytics.url?this.helperServices.geoanalytics.url:null),t.jobParams=this._buildJobParams(),t.jobParams.OutputName&&n.fromJson(t.jobParams.OutputName).serviceProperties&&(t.itemParams={description:d.substitute(this.i18n.itemDescription,{inputTableName:this.inputTable.name}),tags:d.substitute(this.i18n.itemTags,{inputTableName:this.inputTable.name}),snippet:this.i18n.itemSnippet},this.showSelectFolder&&(t.itemParams.folder=this.get("folderId"))),this.showGeoAnalyticsParams&&(this.resultParameter="output",t.isSpatioTemporalDataStore=!0),this.execute(t))},_handleShowCreditsClick:function(t){t.preventDefault(),this._form.validate()&&this.getCreditsEstimate(this.toolName,this._buildJobParams()).then(s.hitch(this,(function(t){this._usageForm.set("content",t),this._usageDialog.show()})))},_handleBrowseItemsSelect:function(t,e){t&&t.selection&&V.addAnalysisReadyLayer({item:t.selection,layers:this.inputTables,layersSelect:this._analysisSelect,browseDialog:t.dialog||this._browsedlg,widget:this},e).always(s.hitch(this,this._updateAnalysisLayerUI,!0))},_save:function(){},_buildUI:function(){this._standardUX=[this._chooseOutputTypeLblRow,this._chooseOutputTypeRow],this._bigdataUX=[this._includeAttributesLabelRow,this._includeAttributesRow,this._includeAttributesClearRow],V.updateDisplay(this._standardUX,!this.get("showGeoAnalyticsParams"),"table-row"),V.updateDisplay(this._bigdataUX,this.get("showGeoAnalyticsParams"),"table-row"),this._loadConnections();var t=!0,e=0;V.initHelpLinks(this.domNode,this.showHelp),u.set(this._chooseExtentDiv,"display",!0===this.showChooseExtent?"inline-block":"none"),this.get("showSelectAnalysisLayer")&&(this.inputTables&&this.inputTable&&!V.isLayerInLayers(this.inputTable,this.inputTables)&&this.inputTables.push(this.inputTable),this.get("inputTable")||!this.get("inputTables")||this.rerun||this.set("inputTable",this.inputTables[0]),V.populateAnalysisLayers(this,"inputTable","inputTables")),V.addReadyToUseLayerOption(this,[this._analysisSelect]),this.helperServices&&this.helperServices.geocode&&(this.locators=a.filter(this.helperServices.geocode,(function(t){var e=!!t.batch;return this.showGeoAnalyticsParams?!V.isAgoWorldGeocodeServer(t.url)&&(V.isAgoWorldGeocodeServerProxy(t.url)?!t.isEsriBatchGeocoder&&!t.isAGOWorldLocator&&this.allowWorldGeocoder&&e:e):V.isEsriWorldGeocoder(t.url)?this.allowWorldGeocoder&&e:e}),this),a.forEach(this.locators,(function(t,i){var s=this.geocodeServiceUrl&&this.geocodeServiceUrl==t.url;s&&(e=""+i),this._locatorSelect.addOption({value:""+i,label:t.name,selected:s})}),this),this._locatorSelect.set("value",e)),this.outputType&&this._formatSelect.set("value",this.outputType),this.outputLayerName&&(this._outputLayerInput.set("value",this.outputLayerName),t=!1),u.set(this._chooseFolderRow,"display",!0===this.showSelectFolder?"block":"none"),this.showSelectFolder&&this.getFolderStore().then(s.hitch(this,(function(t){this.folderStore=t,V.setupFoldersUI({folderStore:this.folderStore,folderId:this.folderId,folderName:this.folderName,folderSelect:this._webMapFolderSelect,username:this.portalUser?this.portalUser.username:""})}))),u.set(this._showCreditsLink,"display",!0===this.showCredits?"block":"none"),this._outputNumLabel&&this.showGeoAnalyticsParams?(c.set(this._includeAttributesStepsLabel,"innerHTML",this.i18n.threeLabel),c.set(this._outputNumLabel,"innerHTML",this.i18n.fourLabel)):this._outputNumLabel&&!this.showGeoAnalyticsParams&&c.set(this._outputNumLabel,"innerHTML",this.i18n.fourLabel),W.isDefined(this.includeAttributes)&&this._includeAttributesCheck.set("checked",this.includeAttributes),this._buildCountryList(),this._updateAnalysisLayerUI(t),this._createFilterAndSelections()},_buildDataFields:function(t){this._showLoading(!1),this.set("disableRunAnalysis",!1),V.updateDisplay([this._dataFieldErrorRow],!1,"table-row"),V.hideMessages(this._dataErrorMessagePane),V.updateDisplay([this._dataGridRow,this._dataFieldSelectRow],!0,"table-row"),Q.createStore(t),a.forEach(this.inputTable.fields,(function(t){W.isDefined(t.alias)||(t.alias=t.name)}));var e,i={identifier:"name",label:"alias",items:[{name:this.i18n.notUsed,alias:this.i18n.notUsed}].concat(this.inputTable.fields)},s=new g({objectStore:f(new _({data:i})),labelProperty:"alias"}),o=[{label:this.i18n.locatorInputs,field:"locatorField"},{label:this.i18n.dataFields,field:"mappedField",editor:j,editOn:"click",editorArgs:{store:s,style:"width:120px;",maxHeight:-1},autoSave:!0}];e=a.filter(t,(function(t){return this._multipleswitch.checked?!t.isSingle:t.isSingle}),this),this._curdata=t,this.dataFieldGrid?(this.dataFieldGrid.set("columns",o),this.dataFieldGrid.set("collection",Q.createStore(e))):(this.dataFieldGrid=new it({collection:Q.createStore(e),cellNavigation:!1,columns:o,selectionMode:"single"},this._dataGridDiv),this.dataFieldGrid.startup())},_handleSwitchChange:function(t){this._curdata&&this._buildDataFields(this._curdata)},_buildCountryList:function(){var t=[],e={},i=(e.user||{}).region||e.region||e.ipCntryCode||"";for(var s in""===this.sourceCountry&&(this.sourceCountry="world"),this.i18n.countryCodes)t.push({label:this.i18n.countryCodes[s],value:s.toLowerCase(),selected:this.sourceCountry&&this.sourceCountry===s.toLowerCase()});t=t.sort((function(t,e){return t.label<e.label?-1:t.label>e.label?1:0})),this._countryCodes.set("options",t),this._countryCodes.set("value",this.i18n.countryCodes[i]?i.toLowerCase():"world")},_loadConnections:function(){this.on("start",s.hitch(this,"_onClose",!0)),this._connect(this._closeBtn,"onclick",s.hitch(this,"_onClose",!1)),this.own(this.watch("locator",s.hitch(this,this._locatorWatcher)),this.watch("inputTable",s.hitch(this,this.analyzeGeocodeInput)))},_handleAnalysisLayerChange:function(t){if(this._isAnalysisSelect=!0,"browselayers"===t)if(this.showGeoAnalyticsParams)this.set("allowedItemTypes",[Y.CSV,Y.XLS]),this._createBrowseItems(t,{layerTypes:[Y.TABLE,Y.BTABLE]},this._analysisSelect);else{var e=['typekeywords:"'+Y.TABLE+'"','typekeywords:"'+Y.CSV+'"','typekeywords:"'+Y.XLS+'"'];this.set("allowedItemTypes",[Y.CSV,Y.XLS]),this._createBrowseItems(t,{layerTypes:[Y.CSV,Y.XLS,Y.TABLE],custom:e},this._analysisSelect)}else this.set("inputTable",this.inputTables[t]),this._updateAnalysisLayerUI(!0)},_handleLocatorChange:function(t){this.set("locator",this.locators[t])},_updateAnalysisLayerUI:function(t){this.inputTable&&t&&(this.outputLayerName=d.substitute(this.i18n.outputLayerName,{inputTableName:this.inputTable.name}),this._outputLayerInput.set("value",this.outputLayerName))},_locatorWatcher:function(t,e,i){var s=!1;i&&i.url&&(s=V.isWorldGeoLocator(i.url),this._countryRow&&V.updateDisplay([this._countryRow],s,"table-row")),this.analyzeGeocodeInput()},analyzeGeocodeInput:function(){this.locator&&this.inputTable&&this.analysisGpServer&&this.signInPromise.then(s.hitch(this,(function(){var t={geocodeServiceUrl:this.locator.url,locale:l.locale};this.inputTable.itemId&&-1!==a.indexOf([Y.CSV,Y.XLS],this.inputTable.type)?(t.inputFileItem=n.toJson({itemid:this.inputTable.itemId}),t.inputFileParameters=n.toJson({fileType:this.inputTable.type===Y.XLS?"xlsx":this.inputTable.type.toLowerCase(),headerRowExists:"true",columnDelimiter:"",textQualifier:""})):t.inputTable=this.constructAnalysisInputLyrObj(this.inputTable,!0),this.analyzeGP=new Z(this.analysisGpServer+"/"+this.analyzeToolName),this.analyzeGP.setUpdateDelay(1e3),this._showLoading(!0),this.analyzeGP.submitJob(t,s.hitch(this,this._getAnalyzeGeocodeData),s.hitch(this,this._analyzeJobFailed),s.hitch(this,this._analyzeJobFailed))})))},_getAnalyzeGeocodeData:function(t){var e=[];"esriJobSucceeded"===t.jobStatus&&(e.push(X({url:this.locator.url,content:{f:"json"}})),e.push(this.analyzeGP.getResultData(t.jobId,"geocodeParameters")),y(e).then(s.hitch(this,this._handleAnalyzeReponse)))},_analyzeJobFailed:function(t){"esriJobFailed"!==t.jobStatus&&"esriJobCancelled"!==t.jobStatus||(this._showLoading(!1),V.updateDisplay([this._dataGridRow,this._dataFieldSelectRow],!1,"table-row"),V.updateDisplay([this._dataFieldErrorRow],!0,"table-row"),V.showMessages("Mapping locator fields with input data fields failed, please use another locator.",this._bodyNode,this._dataErrorMessagePane),this.set("disableRunAnalysis",!0))},_handleAnalyzeReponse:function(t){var e,i,s={locatorFields:t&&t[0]&&t[0].addressFields?t[0].addressFields:null,fieldMap:t&&t[1].value&&t[1].value.field_mapping?n.fromJson(t[1].value.field_mapping):null},o=[],l=[],r=[];s.locatorFields&&(o=a.map(s.locatorFields,(function(t){return t.name}),this),s.fieldMap&&s.fieldMap.length>0&&(e=this.rerun&&this.geocodeParameters&&this.geocodeParameters.field_mapping?n.fromJson(this.geocodeParameters.field_mapping):s.fieldMap,a.forEach(e,(function(e){var n=-1;e[1]&&(n=a.indexOf(o,e[1])),-1!==n&&(s.locatorFields[n].map=e[0]),this.rerun&&t&&t[0]&&t[0].singleLineAddressField&&e[1]===t[0].singleLineAddressField.name&&(i=e[0]),r.push({name:e[0],alias:e[0]})}),this),l=a.map(s.locatorFields,(function(t){return{locatorField:t.name,mappedField:t.map||this.i18n.notUsed,isSingle:!1}}),this))),t&&t[0]&&t[0].singleLineAddressField&&(l.push({locatorField:t[0].singleLineAddressField.name,mappedField:i||this.i18n.notUsed,isSingle:!0}),i&&(this._singleswitch.checked=!0,this._multipleswitch.checked=!1)),!this.inputTable.fields&&r&&(this.inputTable.fields=r),this.rerun&&this.geocodeParameters&&this.locator.url===this.geocodeServiceUrl?this.set("geocodeParameters",this.geocodeParameters):this.set("geocodeParameters",t[1].value),this._buildDataFields(l)},_checkFieldInDataField:function(t){return!!this._curdata&&a.some(this._curdata,(function(e){return e.mappedField===t}))},_filterLayer:function(t){var e=[Y.CSV,Y.XLS,Y.TABLE,Y.BTABLE];return this.showGeoAnalyticsParams&&(e=[Y.TABLE,Y.BTABLE]),W.isDefined(t)&&(t.type&&-1!==a.indexOf(e,t.type)||!!t.itemid&&this.rerun)},_setAnalysisGpServerAttr:function(t){t&&(this.analysisGpServer=t,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName))},_setInputTableAttr:function(t){this._filterLayer(t)?this._set("inputTable",t):this._set("inputTable",void 0)},_setInputTablesAttr:function(t){t=a.filter(t,(function(t){return this._filterLayer(t)}),this),this._set("inputTables",t)},_setLocatorAttr:function(t){this._set("locator",t)},_setGeocodeParametersAttr:function(t){this._set("geocodeParameters",t)},_getGeocodeParametersAttr:function(){var t,e,i=new z,s=[];return this.geocodeParameters?(this.dataFieldGrid&&(a.forEach(n.fromJson(this.geocodeParameters.field_mapping),(function(a){t=i.eq("mappedField",a[0]),e=this.dataFieldGrid.collection.filter(t);var o=!1;e.forEach((function(t){t&&t.locatorField&&(a[1]=t.locatorField,o=!0)}),this),!o&&this._checkFieldInDataField(a[0])&&""!==a[1]&&(a[1]=""),s.push(a)}),this),this.geocodeParameters.field_mapping=n.toJson(s)),this.geocodeParameters):null},_setDisableRunAnalysisAttr:function(t){this._saveBtn.set("disabled",t)},_setAllowWorldGeocoderAttr:function(t){this._set("allowWorldGeocoder",t)},validateServiceName:function(t){return V.validateServiceName(t,{textInput:this._outputLayerInput,isItem:!this.returnFeatureCollection})},_connect:function(t,e,i){this._pbConnects.push(o.connect(t,e,i))},_showLoading:function(t){V.updateDisplay([this._dataGridRow,this._dataFieldSelectRow,this._dataFieldErrorRow],!t,"table-row"),V.updateDisplay([this._dataLoadingRow],t,"table-row"),this.set("disableRunAnalysis",t),this._locatorSelect.set("disabled",t),this._analysisSelect.set("disabled",t)}});return r("extend-esri")&&s.setObject("dijit.analysis.GeocodeLocationsFromTable",st,M),st}));
