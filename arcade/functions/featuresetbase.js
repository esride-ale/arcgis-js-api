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

define(["require","exports","../ArcadePortal","../Dictionary","../Dictionary","../Feature","../featureSetCollection","../featureSetUtils","../languageUtils","../featureset/actions/Adapted","../featureset/actions/AttributeFilter","../featureset/actions/OrderBy","../featureset/actions/Top","../featureset/sources/Empty","../featureset/sources/FeatureLayerMemory","../featureset/support/OrderbyClause","../featureset/support/shared","../featureset/support/sqlUtils","./fieldStats","../polyfill/promiseUtils","../polyfill/sql/WhereClause","../../layers/FeatureLayer","../../layers/Field"],(function(e,t,r,n,a,i,l,s,o,u,f,d,c,p,m,y,g,h,F,v,S,I,E){"use strict";function A(e,t,r){var n=e.getVariables();if(n.length>0){for(var a=[],i=0;i<n.length;i++){var l={name:n[i]};a.push(t.evaluateIdentifier(r,l))}return v.all(a).then((function(t){for(var r={},a=0;a<n.length;a++)r[n[a]]=t[a];return e.parameters=r,e}))}return v.resolve(e)}function b(e,t,r){for(var n in void 0===r&&(r=null),e)if(n.toLowerCase()===t.toLowerCase())return e[n];return r}function D(e){if(null===e)return null;var t={type:b(e,"type",""),name:b(e,"name","")};if("range"===t.type)t.range=b(e,"range",[]);else{t.codedValues=[];for(var r=0,n=b(e,"codedValues",[]);r<n.length;r++){var a=n[r];t.codedValues.push({name:b(a,"name",""),code:b(a,"code",null)})}}return t}function w(e){if(null===e)return null;var t={},r=b(e,"wkt",null);null!==r&&(t.wkt=r);var n=b(e,"wkid",null);return null!==n&&(t.wkid=n),t}function x(e){if(null===e)return null;var t={hasZ:b(e,"hasz",!1),hasM:b(e,"hasm",!1)},r=b(e,"spatialreference",null);r&&(t.spatialReference=w(r));var n=b(e,"x",null);if(null!==n)return t.x=n,t.y=b(e,"y",null),t;var a=b(e,"rings",null);if(null!==a)return t.rings=a,t;var i=b(e,"paths",null);if(null!==i)return t.paths=i,t;var l=b(e,"points",null);if(null!==l)return t.points=l,t;for(var s=0,o=["xmin","xmax","ymin","ymax","zmin","zmax","mmin","mmax"];s<o.length;s++){var u=o[s],f=b(e,u,null);null!==f&&(t[u]=f)}return t}Object.defineProperty(t,"__esModule",{value:!0}),t.registerFunctions=function(e){"async"===e.mode&&(e.functions.featuresetbyid=function(t,r){return e.standardFunctionAsync(t,r,(function(e,t,r){if(o.pcCheck(r,2,4),r[0]instanceof l){var n=o.toString(r[1]),a=o.defaultUndefined(r[2],null),i=o.toBoolean(o.defaultUndefined(r[3],!0));if(null===a&&(a=["*"]),!1===o.isArray(a))throw new Error("Invalid Parameter");return r[0].featureSetById(n,i,a)}throw new Error("Invalid Parameter")}))},e.signatures.push({name:"featuresetbyid",min:"2",max:"4"}),e.functions.featuresetbyportalitem=function(t,n){return e.standardFunctionAsync(t,n,(function(e,n,a){if(o.pcCheck(a,2,5),null===a[0])throw new Error("Portal is required");if(a[0]instanceof r){var i=o.toString(a[1]),l=o.toString(a[2]),u=o.defaultUndefined(a[3],null),f=o.toBoolean(o.defaultUndefined(a[4],!0));if(null===u&&(u=["*"]),!1===o.isArray(u))throw new Error("Invalid Parameter");var d=null;return t.services&&t.services.portal&&(d=t.services.portal),d=s.getPortal(a[0],d),s.constructFeatureSetFromPortalItem(i,l,t.spatialReference,u,f,d,t.lrucache)}if(!1===o.isString(a[0]))throw new Error("Portal is required");var c=o.toString(a[0]),p=o.toString(a[1]),m=o.defaultUndefined(a[2],null),y=o.toBoolean(o.defaultUndefined(a[3],!0));if(null===m&&(m=["*"]),!1===o.isArray(m))throw new Error("Invalid Parameter");if(t.services&&t.services.portal)return s.constructFeatureSetFromPortalItem(c,p,t.spatialReference,m,y,t.services.portal,t.lrucache);throw new Error("Portal is required")}))},e.signatures.push({name:"featuresetbyportalitem",min:"2",max:"5"}),e.functions.featuresetbyname=function(t,r){return e.standardFunctionAsync(t,r,(function(e,t,r){if(o.pcCheck(r,2,4),r[0]instanceof l){var n=o.toString(r[1]),a=o.defaultUndefined(r[2],null),i=o.toBoolean(o.defaultUndefined(r[3],!0));if(null===a&&(a=["*"]),!1===o.isArray(a))throw new Error("Invalid Parameter");return r[0].featureSetByName(n,i,a)}throw new Error("Invalid Parameter")}))},e.signatures.push({name:"featuresetbyname",min:"2",max:"4"}),e.functions.featureset=function(t,r){return e.standardFunction(t,r,(function(e,r,a){o.pcCheck(a,1,1);var i,l=a[0],s={layerDefinition:{geometryType:"",objectIdField:"",typeIdField:"",fields:[]},featureSet:{geometryType:"",features:[]}};if(o.isString(l))void 0!==(l=JSON.parse(l)).layerDefinition?(s.layerDefinition=l.layerDefinition,s.featureSet=l.featureSet,l.layerDefinition.spatialReference&&(s.layerDefinition.spatialReference=l.layerDefinition.spatialReference)):(s.featureSet.features=l.features,s.featureSet.geometryType=l.geometryType,s.layerDefinition.geometryType=s.featureSet.geometryType,s.layerDefinition.objectIdField=l.objectIdFieldName,s.layerDefinition.typeIdField=l.typeIdFieldName,s.layerDefinition.fields=l.fields,l.spatialReference&&(s.layerDefinition.spatialReference=l.spatialReference));else{if(!(a[0]instanceof n))throw new Error("Invalid Parameter");var u=b(l=JSON.parse(a[0].castToText()),"layerdefinition");if(null!==u){s.layerDefinition.geometryType=b(u,"geometrytype",""),s.featureSet.geometryType=s.layerDefinition.geometryType,s.layerDefinition.objectIdField=b(u,"objectidfield",""),s.layerDefinition.typeIdField=b(u,"typeidfield",""),(A=b(u,"spatialreference",null))&&(s.layerDefinition.spatialReference=w(A));for(var f=0,d=b(u,"fields",[]);f<d.length;f++){var c={name:b(T=d[f],"name",""),alias:b(T,"alias",""),type:b(T,"type",""),nullable:b(T,"nullable",!0),editable:b(T,"editable",!0),length:b(T,"length",null),domain:D(b(T,"domain"))};s.layerDefinition.fields.push(c)}var p=b(l,"featureset",null);if(p){for(var y={},g=0,h=s.layerDefinition.fields;g<h.length;g++){y[(E=h[g]).name.toLowerCase()]=E.name}for(var F=0,v=b(p,"features",[]);F<v.length;F++){var S={},I=b(W=v[F],"attributes",{});for(var E in I)S[y[E.toLowerCase()]]=I[E];s.featureSet.features.push({attributes:S,geometry:x(b(W,"geometry",null))})}}}else{var A;s.layerDefinition.geometryType=b(l,"geometrytype",""),s.featureSet.geometryType=s.layerDefinition.geometryType,s.layerDefinition.objectIdField=b(l,"objectidfieldname",""),s.layerDefinition.typeIdField=b(l,"typeidfieldname",""),(A=b(l,"spatialreference",null))&&(s.layerDefinition.spatialReference=w(A));for(var N=0,C=b(l,"fields",[]);N<C.length;N++){var T;c={name:b(T=C[N],"name",""),alias:b(T,"alias",""),type:b(T,"type",""),nullable:b(T,"nullable",!0),editable:b(T,"editable",!0),length:b(T,"length",null),domain:D(b(T,"domain"))};s.layerDefinition.fields.push(c)}y={};for(var L=0,R=s.layerDefinition.fields;L<R.length;L++){y[(E=R[L]).name.toLowerCase()]=E.name}for(var k=0,O=b(l,"features",[]);k<O.length;k++){var W;S={},I=b(W=O[k],"attributes",{});for(var E in I)S[y[E.toLowerCase()]]=I[E];s.featureSet.features.push({attributes:S,geometry:x(b(W,"geometry",null))})}}}if(!1==(!!(i=s).layerDefinition&&!!i.featureSet&&!1!==function(e,t){for(var r=0,n=t;r<n.length;r++)if(n[r]===e)return!0;return!1}(i.layerDefinition.geometryType,["","esriGeometryPoint","esriGeometryPolyline","esriGeometryPolygon","esriGeometryMultipoint","esriGeometryEnvelope"])&&null!==i.layerDefinition.objectIdField&&""!==i.layerDefinition.objectIdField&&!1!==o.isArray(i.layerDefinition.fields)&&!1!==o.isArray(i.featureSet.features)))throw new Error("Invalid Parameter");return m.create(s,t.spatialReference)}))},e.signatures.push({name:"featureset",min:"1",max:"1"}),e.functions.filter=function(t,r){return e.standardFunctionAsync(t,r,(function(r,n,a){return o.pcCheck(a,2,2),o.isFeatureSet(a[0])?a[0].load().then((function(r){var n=S.WhereClause.create(a[1],r.getFieldsIndex()),i=n.getVariables();if(i.length>0){for(var l=[],s=0;s<i.length;s++){var o={name:i[s]};l.push(e.evaluateIdentifier(t,o))}return v.all(l).then((function(e){for(var t={},r=0;r<i.length;r++)t[i[r]]=e[r];return n.parameters=t,new f({parentfeatureset:a[0],whereclause:n})}))}return v.resolve(new f({parentfeatureset:a[0],whereclause:n}))})):e.failDefferred("Filter cannot accept this parameter type")}))},e.signatures.push({name:"filter",min:"2",max:"2"}),e.functions.orderby=function(t,r){return e.standardFunctionAsync(t,r,(function(t,r,n){if(o.pcCheck(n,2,2),o.isFeatureSet(n[0])){var a=new y(n[1]);return v.resolve(new d({parentfeatureset:n[0],orderbyclause:a}))}return e.failDefferred("Order cannot accept this parameter type")}))},e.signatures.push({name:"orderby",min:"2",max:"2"}),e.functions.top=function(t,r){return e.standardFunctionAsync(t,r,(function(t,r,n){return o.pcCheck(n,2,2),o.isFeatureSet(n[0])?v.resolve(new c({parentfeatureset:n[0],topnum:n[1]})):o.isArray(n[0])?o.toNumber(n[1])>=n[0].length?n[0].slice(0):n[0].slice(0,o.toNumber(n[1])):o.isImmutableArray(n[0])?o.toNumber(n[1])>=n[0].length()?n[0].slice(0):n[0].slice(0,o.toNumber(n[1])):e.failDefferred("Top cannot accept this parameter type")}))},e.signatures.push({name:"top",min:"2",max:"2"}),e.functions.first=function(t,r){return e.standardFunctionAsync(t,r,(function(e,t,r){return o.pcCheck(r,1,1),o.isFeatureSet(r[0])?r[0].first(e.abortSignal).then((function(e){if(null!==e){var t=i.createFromGraphicLikeObject(e.geometry,e.attributes,r[0]);t._underlyingGraphic=e,e=t}return e})):o.isArray(r[0])?0===r[0].length?v.resolve(null):v.resolve(r[0][0]):o.isImmutableArray(r[0])?0===r[0].length()?v.resolve(null):v.resolve(r[0].get(0)):null}))},e.signatures.push({name:"first",min:"1",max:"1"}),e.functions.attachments=function(t,r){return e.standardFunctionAsync(t,r,(function(e,r,a){o.pcCheck(a,1,2);var l={minsize:-1,maxsize:-1,types:null};if(a.length>1)if(a[1]instanceof n){if(a[1].hasField("minsize")&&(l.minsize=o.toNumber(a[1].field("minsize"))),a[1].hasField("maxsize")&&(l.maxsize=o.toNumber(a[1].field("maxsize"))),a[1].hasField("types")){var u=o.toStringArray(a[1].field("types"),!1);u.length>0&&(l.types=u)}}else if(null!==a[1])throw new Error("Invalid Parameter");if(a[0]instanceof i){var f=a[0]._layer;return f instanceof I&&(f=s.constructFeatureSet(f,t.spatialReference,["*"],!0,t.lrucache)),null===f?[]:!1===o.isFeatureSet(f)?[]:f.load().then((function(){return f.queryAttachments(a[0].field(f.objectIdField),l.minsize,l.maxsize,l.types)}))}if(null===a[0])return[];throw new Error("Invalid Parameter")}))},e.signatures.push({name:"attachments",min:"1",max:"2"}),e.functions.featuresetbyrelationshipname=function(t,r){return e.standardFunctionAsync(t,r,(function(e,r,n){o.pcCheck(n,2,4);var a=n[0],l=o.toString(n[1]),u=o.defaultUndefined(n[2],null),f=o.toBoolean(o.defaultUndefined(n[3],!0));if(null===u&&(u=["*"]),!1===o.isArray(u))throw new Error("Invalid Parameter");if(null===n[0])return null;if(!(n[0]instanceof i))throw new Error("Invalid Parameter");var d=a._layer;return d instanceof I&&(d=s.constructFeatureSet(d,t.spatialReference,["*"],!0,t.lrucache)),null===d?null:!1===o.isFeatureSet(d)?null:d.load().then((function(e){var r=e.relationshipMetaData().filter((function(e){return e.name===l}));if(0===r.length)return null;if(void 0!==r[0].relationshipTableId&&null!==r[0].relationshipTableId&&r[0].relationshipTableId>-1)return s.constructFeatureSetFromRelationship(e,r[0],a.field(e.objectIdField),e.spatialReference,u,f,t.lrucache);var n=e.serviceUrl();return n?(n="/"===n.charAt(n.length-1)?n+r[0].relatedTableId.toString():n+"/"+r[0].relatedTableId.toString(),s.constructFeatureSetFromUrl(n,e.spatialReference,u,f,t.lrucache).then((function(t){return t.load().then((function(){return t.relationshipMetaData()})).then((function(n){if(n=n.filter((function(e){return e.id===r[0].id})),!1===a.hasField(r[0].keyField)||null===a.field(r[0].keyField))return e.getFeatureByObjectId(a.field(e.objectIdField),[r[0].keyField]).then((function(e){if(e){var a=S.WhereClause.create(n[0].keyField+"= @id",t.getFieldsIndex());return a.parameters={id:e.attributes[r[0].keyField]},t.filter(a)}return new p({parentfeatureset:t})}));var i=S.WhereClause.create(n[0].keyField+"= @id",t.getFieldsIndex());return i.parameters={id:a.field(r[0].keyField)},t.filter(i)}))}))):null}))}))},e.signatures.push({name:"featuresetbyrelationshipname",min:"2",max:"4"}),e.functions.featuresetbyassociation=function(t,r){return e.standardFunctionAsync(t,r,(function(e,r,n){o.pcCheck(n,2,3);var a=n[0],l=o.toString(o.defaultUndefined(n[1],"")).toLowerCase(),f=o.isString(n[2])?o.toString(n[2]):null;if(null===n[0])return null;if(!(n[0]instanceof i))throw new Error("Invalid Parameter");var d=a._layer;return d instanceof I&&(d=s.constructFeatureSet(d,t.spatialReference,["*"],!0,t.lrucache)),null===d?null:!1===o.isFeatureSet(d)?null:d.load().then((function(){var e=d.serviceUrl();return s.constructAssociationMetaDataFeatureSetFromUrl(e,t.spatialReference)})).then((function(e){var t=null,r=null,n=!1;if(null!==f&&""!==f&&void 0!==f){for(var i=0,s=e.terminals;i<s.length;i++){var c=s[i];c.terminalName===f&&(r=c.terminalId)}null===r&&(n=!0)}for(var p=e.associations.getFieldsIndex(),m=p.get("TOGLOBALID").name,y=p.get("FROMGLOBALID").name,h=p.get("TOTERMINALID").name,F=p.get("FROMTERMINALID").name,v=p.get("FROMNETWORKSOURCEID").name,I=p.get("TONETWORKSOURCEID").name,A=p.get("ASSOCIATIONTYPE").name,b=p.get("ISCONTENTVISIBLE").name,D=p.get("OBJECTID").name,w=0,x=d.fields;w<x.length;w++){var N=x[w];if("esriFieldTypeGlobalID"===N.type){t=a.field(N.name);break}}var C=null,T=new u.SqlExpressionAdapted(new E({name:"percentalong",alias:"percentalong",type:"esrFieldTypeDouble"}),S.WhereClause.create("0",e.associations.getFieldsIndex())),L=new u.SqlExpressionAdapted(new E({name:"side",alias:"side",type:"esrFieldTypeString"}),S.WhereClause.create("''",e.associations.getFieldsIndex())),R={};for(var k in e.lkp)R[k]=e.lkp[k].sourceId;var O=new u.StringToCodeAdapted(new E({name:"classname",alias:"classname",type:"esriFieldTypeString"}),null,R),W="";switch(l){case"midspan":W="(("+m+"='"+t+"') OR ( "+y+"='"+t+"')) AND ("+A+" IN (5))",O.codefield=S.WhereClause.create("CASE WHEN ("+m+"='"+t+"') THEN "+v+" ELSE "+I+" END",e.associations.getFieldsIndex());var P=g.cloneField(u.AdaptedFeatureSet.findField(e.associations.fields,y));P.name="globalid",P.alias="globalid",C=new u.SqlExpressionAdapted(P,S.WhereClause.create("CASE WHEN ("+y+"='"+t+"') THEN "+m+" ELSE "+y+" END",e.associations.getFieldsIndex())),T=e.unVersion>=4?new u.OriginalField(u.AdaptedFeatureSet.findField(e.associations.fields,p.get("PERCENTALONG").name)):new u.SqlExpressionAdapted(new E({name:"percentalong",alias:"percentalong",type:"esrFieldTypeDouble"}),S.WhereClause.create("0",e.associations.getFieldsIndex()));break;case"junctionedge":W="(("+m+"='"+t+"') OR ( "+y+"='"+t+"')) AND ("+A+" IN (4,6))",O.codefield=S.WhereClause.create("CASE WHEN ("+m+"='"+t+"') THEN "+v+" ELSE "+I+" END",e.associations.getFieldsIndex());var M=g.cloneField(u.AdaptedFeatureSet.findField(e.associations.fields,y));M.name="globalid",M.alias="globalid",C=new u.SqlExpressionAdapted(M,S.WhereClause.create("CASE WHEN ("+y+"='"+t+"') THEN "+m+" ELSE "+y+" END",e.associations.getFieldsIndex())),L=new u.SqlExpressionAdapted(new E({name:"side",alias:"side",type:"esrFieldTypeString"}),S.WhereClause.create("CASE WHEN ("+A+"=4) THEN 'from' ELSE 'to' END",e.associations.getFieldsIndex()));break;case"connected":var B=m+"='@T'",G=y+"='@T'";null!==r&&(B+=" AND "+h+"=@A",G+=" AND "+F+"=@A"),W="(("+B+") OR ("+G+"))",W=o.multiReplace(W,"@T",t),B=o.multiReplace(B,"@T",t),null!==r&&(B=o.multiReplace(B,"@A",r.toString()),W=o.multiReplace(W,"@A",r.toString())),O.codefield=S.WhereClause.create("CASE WHEN "+B+" THEN "+v+" ELSE "+I+" END",e.associations.getFieldsIndex());var U=g.cloneField(u.AdaptedFeatureSet.findField(e.associations.fields,y));U.name="globalid",U.alias="globalid",C=new u.SqlExpressionAdapted(U,S.WhereClause.create("CASE WHEN "+B+" THEN "+y+" ELSE "+m+" END",e.associations.getFieldsIndex()));break;case"container":W=m+"='"+t+"' AND "+A+" = 2",null!==r&&(W+=" AND "+h+" = "+r.toString()),O.codefield=v,W="( "+W+" )",C=new u.FieldRename(u.AdaptedFeatureSet.findField(e.associations.fields,y),"globalid","globalid");case"content":W="("+y+"='"+t+"' AND "+A+" = 2)",null!==r&&(W+=" AND "+F+" = "+r.toString()),O.codefield=I,W="( "+W+" )",C=new u.FieldRename(u.AdaptedFeatureSet.findField(e.associations.fields,m),"globalid","globalid");break;case"structure":W="("+m+"='"+t+"' AND "+A+" = 3)",null!==r&&(W+=" AND "+h+" = "+r.toString()),O.codefield=v,W="( "+W+" )",C=new u.FieldRename(u.AdaptedFeatureSet.findField(e.associations.fields,y),"globalid","globalId");break;case"attached":W="("+y+"='"+t+"' AND "+A+" = 3)",null!==r&&(W+=" AND "+F+" = "+r.toString()),O.codefield=I,W="( "+W+" )",C=new u.FieldRename(u.AdaptedFeatureSet.findField(e.associations.fields,m),"globalid","globalId");break;default:throw new Error("Invalid Parameter")}return n&&(W="1 <> 1"),new u.AdaptedFeatureSet({parentfeatureset:e.associations,adaptedFields:[new u.OriginalField(u.AdaptedFeatureSet.findField(e.associations.fields,D)),new u.OriginalField(u.AdaptedFeatureSet.findField(e.associations.fields,b)),C,L,O,T],extraFilter:W?S.WhereClause.create(W,e.associations.getFieldsIndex()):null})}))}))},e.signatures.push({name:"featuresetbyassociation",min:"2",max:"6"}),e.functions.groupby=function(t,r){return e.standardFunctionAsync(t,r,(function(r,n,i){return o.pcCheck(i,3,3),o.isFeatureSet(i[0])?i[0].load().then((function(r){var n=[],l=[],s=!1,u=[];if(o.isString(i[1]))u.push(i[1]);else if(i[1]instanceof a)u.push(i[1]);else if(o.isArray(i[1]))u=i[1];else{if(!o.isImmutableArray(i[1]))return e.failDefferred("Illegal Value: GroupBy");u=i[1].toArray()}for(var f=0,d=u;f<d.length;f++){var c=d[f];if(o.isString(c)){var p=S.WhereClause.create(o.toString(c),r.getFieldsIndex()),m=!0===h.isSingleField(p)?o.toString(c):"%%%%FIELDNAME";n.push({name:m,expression:p}),"%%%%FIELDNAME"===m&&(s=!0)}else{if(!(c instanceof a))return e.failDefferred("Illegal Value: GroupBy");var y=c.hasField("name")?c.field("name"):"%%%%FIELDNAME";p=c.hasField("expression")?c.field("expression"):"";if("%%%%FIELDNAME"===y&&(s=!0),!y)return e.failDefferred("Illegal Value: GroupBy");n.push({name:y,expression:S.WhereClause.create(p||y,r.getFieldsIndex())})}}if(u=[],o.isString(i[2]))u.push(i[2]);else if(o.isArray(i[2]))u=i[2];else if(o.isImmutableArray(i[2]))u=i[2].toArray();else{if(!(i[2]instanceof a))return e.failDefferred("Illegal Value: GroupBy");u.push(i[2])}for(var g=0,F=u;g<F.length;g++){if(!((c=F[g])instanceof a))return e.failDefferred("Illegal Value: GroupBy");var I=c.hasField("name")?c.field("name"):"",E=c.hasField("statistic")?c.field("statistic"):"";p=c.hasField("expression")?c.field("expression"):"";if(!I||!E||!p)return e.failDefferred("Illegal Value: GroupBy");l.push({name:I,statistic:E.toLowerCase(),expression:S.WhereClause.create(p,r.getFieldsIndex())})}if(s){for(var b={},D=0,w=r.fields;D<w.length;D++){b[(O=w[D]).name.toLowerCase()]=1}for(var x=0,N=n;x<N.length;x++){"%%%%FIELDNAME"!==(O=N[x]).name&&(b[O.name.toLowerCase()]=1)}for(var C=0,T=l;C<T.length;C++){"%%%%FIELDNAME"!==(O=T[C]).name&&(b[O.name.toLowerCase()]=1)}for(var L=0,R=0,k=n;R<k.length;R++){var O;if("%%%%FIELDNAME"===(O=k[R]).name){for(;1===b["field_"+L.toString()];)L++;b["field_"+L.toString()]=1,O.name="FIELD_"+L.toString()}}}for(var W=[],P=0,M=n;P<M.length;P++){var B=M[P];W.push(A(B.expression,e,t))}for(var G=0,U=l;G<U.length;G++){B=U[G];W.push(A(B.expression,e,t))}return W.length>0?v.all(W).then((function(){return v.resolve(i[0].groupby(n,l))})):v.resolve(i[0].groupby(n,l))})):e.failDefferred("Illegal Value: GroupBy")}))},e.signatures.push({name:"groupby",min:"3",max:"3"}),e.functions.distinct=function(t,r){return e.standardFunctionAsync(t,r,(function(r,n,i){return o.isFeatureSet(i[0])?(o.pcCheck(i,2,2),i[0].load().then((function(r){var n=[],l=[];if(o.isString(i[1]))l.push(i[1]);else if(i[1]instanceof a)l.push(i[1]);else if(o.isArray(i[1]))l=i[1];else{if(!o.isImmutableArray(i[1]))return e.failDefferred("Illegal Value: GroupBy");l=i[1].toArray()}for(var s=!1,u=0,f=l;u<f.length;u++){var d=f[u];if(o.isString(d)){var c=S.WhereClause.create(o.toString(d),r.getFieldsIndex()),p=!0===h.isSingleField(c)?o.toString(d):"%%%%FIELDNAME";n.push({name:p,expression:c}),"%%%%FIELDNAME"===p&&(s=!0)}else{if(!(d instanceof a))return e.failDefferred("Illegal Value: GroupBy");var m=d.hasField("name")?d.field("name"):"%%%%FIELDNAME";c=d.hasField("expression")?d.field("expression"):"";if("%%%%FIELDNAME"===m&&(s=!0),!m)return e.failDefferred("Illegal Value: GroupBy");n.push({name:m,expression:S.WhereClause.create(c||m,r.getFieldsIndex())})}}if(s){for(var y={},g=0,F=r.fields;g<F.length;g++){y[(x=F[g]).name.toLowerCase()]=1}for(var I=0,E=n;I<E.length;I++){"%%%%FIELDNAME"!==(x=E[I]).name&&(y[x.name.toLowerCase()]=1)}for(var b=0,D=0,w=n;D<w.length;D++){var x;if("%%%%FIELDNAME"===(x=w[D]).name){for(;1===y["field_"+b.toString()];)b++;y["field_"+b.toString()]=1,x.name="FIELD_"+b.toString()}}}for(var N=[],C=0,T=n;C<T.length;C++){var L=T[C];N.push(A(L.expression,e,t))}return N.length>0?v.all(N).then((function(){return v.resolve(i[0].groupby(n,[]))})):v.resolve(i[0].groupby(n,[]))}))):function(e,t,r,n){if(1===n.length){if(o.isArray(n[0]))return F.calculateStat(e,n[0],-1);if(o.isImmutableArray(n[0]))return F.calculateStat(e,n[0].toArray(),-1)}return F.calculateStat(e,n,-1)}("distinct",0,0,i)}))})}}));
