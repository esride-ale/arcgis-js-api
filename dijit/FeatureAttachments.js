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

define(["../kernel","../lang","dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/Deferred","dojo/dom-class","dojo/dom-construct","dojo/has","dojo/io-query","dojo/on","dojo/string","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_WidgetBase","dojo/i18n!../nls/jsapi","dojo/text!./FeatureAttachments/templates/FeatureAttachments.html","dijit/form/Button","dijit/layout/BorderContainer","dijit/layout/TabContainer","dijit/layout/ContentPane"],(function(t,e,i,a,n,s,h,o,d,r,c,u,l,m,_,p,f,g,b,w,I){var v=a([_,l,m],{declaredClass:"esri.dijit.FeatureAttachments",baseClass:"esri-feature-attachments",templateString:f,layer:null,featureId:null,attachments:null,editable:!1,_editable:!1,_i18nStrings:p.widgets.FeatureAttachments,_css:{contentContainer:"esri-feature-attachments-container",menuContainer:"esri-feature-attachments-menu-container",tabContainer:"esri-feature-attachments-tab-container",formButton:"esri-feature-attachments-button dijitButton",uploadButton:"esri-feature-attachments-upload-button",deleteButton:"icon-ui-close-circled",feedbackNode:"esri-feature-attachments-feedback",dragDrop:"esri-drag-drop",loadingIndicator:"esri-feature-attachments-loading-indicator",viewPane:"esri-feature-attachments-view-pane",viewPaneContent:"esri-feature-attachments-view-pane-content",addPane:"esri-feature-attachments-add-pane",addPaneContent:"esri-feature-attachments-add-pane-content",attachmentNode:"esri-attachment-node",attachmentNodeTextContainer:"esri-attachment-node-text-container",attachmentNodeTextName:"esri-attachment-node-text-name",attachmentNodeTextSize:"esri-attachment-node-text-size",attachmentNodeDelete:"esri-attachment-node-delete",attachmentNodeIcon:"esri-attachment-node-icon",iconArchive:"esri-attachment-node-icon-archive",iconAudioVideo:"esri-attachment-node-icon-audiovideo",iconDocument:"esri-attachment-node-icon-document",iconImage:"esri-attachment-node-icon-image",iconOther:"esri-attachment-node-icon-other",hidden:"esri-feature-attachments-hidden"},_filetypeInfos:{categories:["archive","audioVideo","document","image","other"],groups:[["zip","7z","gz","gtar","tar","tgz"],["wmf","wps","avi","mpg","mpe","mpeg","mov","wmv","aif","mid","rmi","mp2","mp3","mp4","mpa","mpv2","qt","ra","ram","wav","wma"],["doc","docx","dot","xls","xlsx","xlt","pdf","ppt","pptx","txt"],["bmp","ecw","emf","eps","ps","gif","img","jp2","jpc","j2k","jpf","jpg","jpeg","jpe","png","psd","raw","sid","tif","tiff"],["vrml","gml","json","xml","mdb","gdb","geodatabase"]],styles:null},constructor:function(){this._updateViewContent=n.hitch(this,this._updateViewContent)},postMixInProperties:function(){this.inherited(arguments);var t=this._css;this._filetypeInfos.styles={archive:t.iconArchive,audioVideo:t.iconAudioVideo,document:t.iconDocument,image:t.iconImage,other:t.iconOther},this.attachments&&Array.isArray(this.attachments)||this.set("attachments",[])},startup:function(){this.inherited(arguments);var t=this.layer;t&&t.loaded?this._setUpWidget():this.own(c.once(t,"load",n.hitch(this,this._setUpWidget)),c(t,"error",n.hitch(this,this._showError)))},destroy:function(){this.inherited(arguments)},resize:function(){this._tabContainer.resize()},refresh:function(){this._updateFeedback(),this._getAttachments().then(this._updateViewContent)},showAddPane:function(){this._tabContainer.selectChild(this._addPane)},showViewPane:function(){this._tabContainer.selectChild(this._viewPane)},_setUpWidget:function(){this._wireUpEvents(),this._checkEditability(),this.attachments&&0!==this.attachments.length?this._updateViewContent():this._getAttachments().then(this._updateViewContent)},_wireUpEvents:function(){this.own(c(this._uploadButton,"click",n.hitch(this,this._addAttachment)),c(this._fileInput,"change",n.hitch(this,this._updateUploadButtonState)),this.watch("featureId",n.hitch(this,this._updateFeatureId)),this._tabContainer.watch("selectedChildWidget",n.hitch(this,this._updateUploadButtonDisplay)))},_checkEditability:function(){this.editable&&this.layer.isEditable&&(this.set("_editable",this.layer.isEditable()),this._addPane.set("disabled",!1))},_getAttachments:function(){return this._showLoadingIndicator(),this._queryLayerForAttachments().then(n.hitch(this,(function(t){return this.set("attachments",t),t}))).otherwise(n.hitch(this,(function(t){return this.set("attachements",[]),[]})))},_updateFeatureId:function(){this.refresh()},_updateFeedback:function(t){this._feedbackNode.textContent=t||""},_showError:function(t){t&&e.isDefined(t.code)&&400===t.code?msg=this._i18nStrings.fileNotSupported:msg=t||this._i18nStrings.uploadFail,this.emit("error",{message:msg}),this._updateFeedback(msg),this._hideLoadingIndicator()},_addAttachment:function(){if(this._fileInput.files&&this._fileInput.files[0]){this._showLoadingIndicator(),this._updateFeedback(this._i18nStrings.uploading),this._uploadButton.setDisabled(!0);var t=this._fileInput.files[0],e=new FormData;e.append("attachment",t,t.name),this._addAttachmentToLayer(e).then(n.hitch(this,this._addAttachmentCallback)).otherwise(n.hitch(this,this._showError))}},_addAttachmentCallback:function(t){if(this._fileInput.value="",!t.success)return this._updateFeedback(this._i18nStrings.uploadFail),this._hideLoadingIndicator(),void this._showError(t.error);!0===this._viewPane.disabled&&this._viewPane.set("disabled",!1),this._getAttachments().then(n.hitch(this,(function(){this._updateViewContent(),this.emit("add-complete",{attachments:this.attachments,featureId:t.objectId,attachmentId:t.attachmentId})}))),this._updateFeedback(this._i18nStrings.uploadSuccess),this._hideLoadingIndicator()},_deleteAttachment:function(t,e){this._showLoadingIndicator(),this._updateFeedback(this._i18nStrings.deleting),this._deleteAttachmentFromLayer(t).then(n.hitch(this,this._deleteAttachmentCallback)).otherwise(n.hitch(this,this._showError,null))},_deleteAttachmentCallback:function(t){t[0]&&t[0].success?(this._getAttachments().then(n.hitch(this,(function(){this._updateViewContent(),this.emit("delete-complete",{attachments:this.attachments,featureId:t[0].objectId,attachmentId:t[0].attachmentId})}))),this._updateFeedback(this._i18nStrings.deleteSuccess),this._hideLoadingIndicator()):(this._hideLoadingIndicator(),this._updateFeedback(this._i18nStrings.deleteFail),this._showError(t[0].error))},_updateViewContent:function(){if(this.layer&&!isNaN(this.featureId)&&this.attachments){this.editable&&0===this.attachments.length&&this.showAddPane();var t=this._generateViewContent();this._viewPane.setContent(t),this._hideLoadingIndicator()}},_generateViewContent:function(){var t,e,a,n=this.featureId,s=this.attachments;return t=this.layer._url.path+"/"+n+"/attachments/",e=this._getQueryString(),a=o.create("div",{className:this._css.viewPaneContent}),i.forEach(s,(function(i){this._generateViewNode({attachment:i,baseUrl:t,queryUrl:e,contentNode:a})}),this),a},_generateViewNode:function(t){var e,i,a,n,s,h=t.attachment,d=h.id,r=h.name,u=h.size,l=t.contentNode,m=t.baseUrl,_=t.queryUrl,p=this._css;s=m+d+_,e=o.create("div",{className:p.attachmentNode}),o.create("div",{className:p.attachmentNodeIcon+" "+this._getIconClass(r)},e),i=o.create("div",{className:p.attachmentNodeTextContainer},e),a=o.create("span",{className:p.attachmentNodeTextName},i),o.create("a",{href:s,title:r,innerHTML:r,target:"_blank"},a),o.create("span",{className:p.attachmentNodeTextSize,innerHTML:this._parseFileSize(u)},i),this._editable&&(n=o.create("div",{className:p.attachmentNodeDelete},e),o.create("span",{className:p.deleteButton},n),this.own(c(n,"click",this._deleteAttachment.bind(this,d)))),o.place(e,l)},_showLoadingIndicator:function(){h.remove(this._loadingIndicator,this._css.hidden)},_hideLoadingIndicator:function(){h.add(this._loadingIndicator,this._css.hidden)},_showUploadButton:function(){h.remove(this._uploadButton.domNode,this._css.hidden)},_hideUploadButton:function(){h.add(this._uploadButton.domNode,this._css.hidden)},_updateUploadButtonState:function(){this._updateFeedback(),this._uploadButton.setDisabled(0===this._fileInput.value.length)},_updateUploadButtonDisplay:function(t,e,i){this._updateFeedback(),i===this._addPane?this._showUploadButton():this._hideUploadButton()},_queryLayerForAttachments:function(){var t=this.featureId||0;return this.layer.queryAttachmentInfos(t)},_addAttachmentToLayer:function(t){return this.layer.addAttachment(this.featureId,t)},_deleteAttachmentFromLayer:function(t){return this.layer.deleteAttachments(this.featureId,[t])},_getIconClass:function(t){var e,a=t.substr(t.lastIndexOf(".")+1),n=this._filetypeInfos,s=n.categories,h=n.groups,o=-1;return i.some(h,(function(t,e){if(-1!==t.indexOf(a.toLowerCase()))return o=e,!0})),e=s[o]?s[o]:s[4],n.styles[e]},_parseFileSize:function(t){var e=this._i18nStrings,i=[e.kB,e.MB,e.GB,e.TB],a=-1;if(Math.abs(t)<1e3)return u.substitute(e.B,{fileSize:t});do{t/=1e3,++a}while(Math.abs(t)>=1e3&&a<i.length-1);return u.substitute(i[a],{fileSize:t.toFixed(1)})},_getQueryString:function(){var t=r.objectToQuery({gdbVersion:this.layer.gdbVersion,token:this.layer._getToken()});return t?"?"+t:""}});return d("extend-esri")&&n.setObject("dijit.FeatureAttachments",v,t),v}));
