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

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/Deferred","dojo/has","../../request","../../urlUtils","../../kernel","../Task","./ReviewerSession"],(function(e,r,s,t,i,n,a,o,c,u){var l=e(c,{declaredClass:"esri.tasks.datareviewer.DRSBaseTask",_url:null,_queryParams:null,_reviewerMapServerUrl:null,constructor:function(e){"/"==e[e.length-1]&&(e=e.slice(0,-1));var s=a.urlToObject(e);this._url=s.path,this._queryParams=s.query;var t=this._url.toLowerCase().lastIndexOf("/exts/");t>0&&(this._reviewerMapServerUrl=this._url.substring(0,t)),this._successHandler=r.hitch(this,this._successHandler),this._errorHandler=r.hitch(this,this._errorHandler),this._appendQueryParams=r.hitch(this,this._appendQueryParams),this.onError=r.hitch(this,this.onError)},_appendQueryParams:function(e){if(this._queryParams)for(var r in this._queryParams){a.urlToObject(e).query?e+="&"+r+"="+this._queryParams[r]:e+="?"+r+"="+this._queryParams[r]}return e},_successHandler:function(e,r,s){r&&this[r].apply(this,[e]),s&&s.resolve(e)},_errorHandler:function(e,r){null===e&&((e=new Error("Unexpected response received from server")).code=500),this.onError(e),r&&r.reject(e)},getReviewerMapServerUrl:function(){var e=null;if(e=this._reviewerMapServerUrl){if(this._queryParams)for(var r in this._queryParams){a.urlToObject(e).query?e+="&"+r+"="+this._queryParams[r]:e+="?"+r+"="+this._queryParams[r]}return e}return null},getLifecycleStatusStrings:function(){var e=this._successHandler,i=this._errorHandler,a=this._appendQueryParams,o=this._url+"/Utilities/getLifecycleStatusStrings";o=a(o);var c=new t;return n({callbackParamName:"callback",url:o,content:{f:"json"}}).then(r.hitch(this,(function(r,t){if(void 0!==r.error){var n=new Error;return n.message=r.error.message,n.code=r.error.code,void i(n,c)}try{var a=r.lifecycleStatusString;if(void 0===a)i(null,c);else{var o=[];s.forEach(a,(function(e,r){o[e.descriptionCode]=e.descriptionString})),e({lifecycleStatusStrings:o},"onGetLifecycleStatusStringsComplete",c)}}catch(e){i(e,c)}})),(function(e,r){i(e,c)})),c},createReviewerSession:function(e,s){var i=this._successHandler,a=this._errorHandler,o=this._appendQueryParams,c=this._url+"/Utilities/createReviewerSession";c=o(c);var l=new t;return n({callbackParamName:"callback",url:c,content:{sessionName:e,sessionProperties:s.toJsonSessionOptions(),f:"json"}}).then(r.hitch(this,(function(e,r){if(void 0!==e.error){var s=new Error;return s.message=e.error.message,s.code=e.error.code,void a(s,l)}try{if(void 0===e.sessionAttributes)a(null,l);else{var t=e.sessionAttributes,n=new u(t.sessionId,t.sessionName,t.userName,t.versionName);i({reviewerSession:n},"onCreateReviewerSessionComplete",l)}}catch(e){a(e,l)}})),(function(e,r){a(e,l)})),l},getReviewerSessions:function(){var e=this._successHandler,i=this._errorHandler,a=this._appendQueryParams,o=this._url+"/Utilities/getReviewerSessions";o=a(o);var c=new t;return n({callbackParamName:"callback",url:o,content:{f:"json"}}).then(r.hitch(this,(function(r,t){if(void 0!==r.error){var n=new Error;return n.message=r.error.message,n.code=r.error.code,void i(n,c)}try{var a=r.sessionAttributes;if(void 0===a)i(null,c);else{var o=[];s.forEach(a,(function(e,r){o[r]=new u(e.sessionId,e.sessionName,e.userName,e.versionName)})),e({reviewerSessions:o},"onGetReviewerSessionsComplete",c)}}catch(e){i(e,c)}})),(function(e,r){i(e,c)})),c},getCustomFieldNames:function(){var e=this._successHandler,i=this._errorHandler,a=["BATCHJOBCHECKGROUP","CHECKTITLE","FEATUREOBJECTCLASS","LIFECYCLEPHASE","LIFECYCLESTATUS","SESSIONID","SEVERITY","SUBTYPE"],o=this._appendQueryParams,c=this._url+"/Dashboard";c=o(c);var u=new t;return n({callbackParamName:"callback",url:c,content:{f:"json"}}).then(r.hitch(this,(function(r,t){if(void 0!==r.error){var n=new Error;return n.message=r.error.message,n.code=r.error.code,void i(n,u)}try{var o=[];void 0===r.reviewerResultsBy&&i(null,u),s.forEach(r.reviewerResultsBy,(function(e,r){-1===a.indexOf(e.name)&&o.push(e.name)})),e({customFieldNames:o},"onGetCustomFieldNamesComplete",u)}catch(e){i(e,u)}})),(function(e,r){i(e,u)})),u},onGetLifecycleStatusStringsComplete:function(e){},onGetReviewerSessionsComplete:function(e){},onCreateReviewerSessionComplete:function(e){},onGetCustomFieldNamesComplete:function(e){},onError:function(e){}});return i("extend-esri")&&r.setObject("tasks.datareviewer.DRSBaseTask",l,o),l}));
