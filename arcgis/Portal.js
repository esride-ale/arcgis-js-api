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

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/kernel","dojo/_base/Deferred","dojo/_base/array","dojo/_base/sniff","require","../kernel","../lang","../request","../urlUtils","../Evented","../IdentityManager"],(function(e,t,r,i,n,s,a,o,l,u,c,h){var m={options:{disableIdentityLookup:!0},requestParams:{f:"json"}},p=function(e){if(!e)return e;function r(t){e[t]||(e[t]=function(){var r=arguments;return i.when(e,(function(e){return Array.prototype.unshift.call(r,e.results||e),p(n[t].apply(n,r))}))})}return e.then&&(e=t.delegate(e)),e.total||(e.total=i.when(e,(function(e){return l.isDefined(e.total)?e.total:e.length||0}))),r("forEach"),r("filter"),r("map"),r("some"),r("every"),e},d={useSSL:function(e,t){var r=m&&m.self||{};if(r&&!r.isPortal)return-1!==e.indexOf("https:")||r.allSSL?t.replace("http:","https:"):t;var i=d.getLocation(t);if(r.portalHostname.toLowerCase().indexOf(i.hostname.toLowerCase())>-1&&i.port&&"80"!==i.port&&"443"!==i.port){var n=i.pathname;return n=0===n.indexOf("/")?n:"/"+n,r.allSSL||e.indexOf("https:")>-1?"https://"+i.hostname+(r.httpsPort&&"443"!==r.httpsPort?":"+r.httpsPort:"")+n+i.search:"http://"+i.hostname+(r.httpPort&&"80"!==r.httpPort?":"+r.httpPort:"")+n+i.search}return-1!==e.indexOf("https:")||r.allSSL?t.replace("http:","https:"):t},formatUrl:function(e){var t=m.currentToken;return-1!==e.indexOf("null")?null:d.useSSL(window.location.protocol,t?e+(-1!==e.indexOf("?")?"&":"?")+"token="+t:e)},getLocation:function(e){var t=document.createElement("a");return t.href=e,{protocol:t.protocol,hostname:t.hostname,port:t.port,pathname:t.pathname,search:t.search,hash:t.hash,host:t.host}},resultsToTypedArray:function(e,r,i){return i=i?i.listings||i.notifications||i.userInvitations||i.tags||i.items||i.groups||i.comments||i.provisions||i.results||i:[],n.map(i,(function(i){return i=t.mixin(i,r||{}),e?new e(i):i}))},clearFieldsFromObject:function(e,r){var i,n,s=e.length;if(t.isArray(e))for(n=0;n<s;n++)delete r[e[n]];else for(i in e)delete r[i];return r},requestToTypedArray:function(e,r,i,n,s){return p(d.request(e,r,i).then(t.partial(d.resultsToTypedArray,n,s)))},request:function(e,r,i){var n,s,a;return r&&r.portal&&delete r.portal,r&&r.form&&(n=r.form,delete r.form),s=t.mixin(t.mixin({},r||{}),m.requestParams),a=t.mixin(i||{},m.options),u({url:d.useSSL(window.location.protocol,e.url||e),content:s,callbackParamName:"callback",timeout:a&&a.timeout||0,form:n},a)},formatQueryParams:function(e,r,i){var n=t.mixin(t.mixin({},e),t.isString(r)?{q:r}:r||{});return n.q=!i&&m.extraQuery?"("+n.q+")"+m.extraQuery:n.q,n}},f=e([],{declaredClass:"esri.arcgis.PortalComment",constructor:function(e){t.mixin(this,e),this.url=this.item.itemUrl+"/comments/"+this.id,this.created=this.created?new Date(this.created):null}}),g=e([],{declaredClass:"esri.arcgis.PortalRating",constructor:function(e){t.mixin(this,e),this.url=this.item.itemUrl+"/rating",this.created=this.created?new Date(this.created):null}}),y=e([],{declaredClass:"esri.arcgis.PortalItem",constructor:function(e){t.mixin(this,e),this.folderId=this.ownerFolder||this.folderId,this.itemUrl=(this.portal&&this.portal.portalUrl)+"content/items/"+this.id,this.userItemUrl=this.hasOwnProperty("ownerFolder")?this.itemUrl.replace("/content/","/content/users/"+this.owner+(this.folderId?"/"+this.folderId:"")+"/"):null,this.itemDataUrl=d.formatUrl(this.itemUrl+"/data"),this.thumbnailUrl=d.formatUrl(this.itemUrl+"/info/"+this.thumbnail),this.displayName=this._getDisplayName(),this.iconUrl=this._getIconUrl(),this.isPremiumContent=this._getIsPremiumContent(),this.created=this.created?new Date(this.created):null,this.uploaded=this.uploaded?new Date(this.uploaded):null,this.modified=this.modified?new Date(this.modified):null},getTypeInfo:function(){var e=this.type,t=this.typeKeywords||[];return{source:n.indexOf(t,"ArcGIS Server")>-1||"Feature Collection"===e?e:null,displayName:this.displayName,iconUrl:this.iconUrl,isPremiumContent:this.isPremiumContent,premiumIconUrl:this._getPremiumIconUrl()}},addComment:function(e){var r=t.isString(e)?{comment:e}:e;return d.request(this.itemUrl+"/addComment",r,{usePost:!0}).then(t.hitch(this,(function(e){return new f(t.mixin(r,{id:e.commentId,item:this}))})))},updateComment:function(e){if(e&&e.url&&e.comment){var t={comment:e.comment};return d.request(e.url+"/update",t,{usePost:!0}).then((function(t){return e.id=t.commentId,e}))}throw new Error},getComments:function(){return d.requestToTypedArray(this.itemUrl+"/comments",null,null,f,{item:this})},deleteComment:function(e){if(e&&e.url)return d.request(e.url+"/delete",null,{usePost:!0});throw new Error},addRating:function(e){var r=t.isObject(e)?e:{rating:parseFloat(e)};return d.request(this.itemUrl+"/addRating",r,{usePost:!0}).then(t.hitch(this,(function(e){return new g(t.mixin(r,{id:e.ratingId,item:this}))})))},getRating:function(){return d.request(this.itemUrl+"/rating").then(t.hitch(this,(function(e){return new g(t.mixin(e,{item:this}))})))},deleteRating:function(){return d.request(this.itemUrl+"/deleteRating",null,{usePost:!0})},_getDisplayName:function(){var e=this.type,t=this.typeKeywords||[],r=e;return"Feature Service"===e||"Feature Collection"===e?r=n.indexOf(t,"Table")>-1?"Table":n.indexOf(t,"Route Layer")>-1?"Route Layer":n.indexOf(t,"Markup")>-1?"Markup":"Feature Layer":"Image Service"===e?r=n.indexOf(t,"Elevation 3D Layer")>-1?"Elevation Layer":n.indexOf(t,"Tiled Imagery")>-1?"Tiled Imagery Layer":"Imagery Layer":"Scene Service"===e?r="Scene Layer":"Scene Package"===e?r="Scene Layer Package":"Stream Service"===e?r="Feature Layer":"Geoprocessing Service"===e&&this.portal&&this.portal.isPortal?r=n.indexOf(t,"Web Tool")>-1?"Tool":"Geoprocessing Service":"Geocoding Service"===e?r="Locator":"Microsoft Powerpoint"===e?r="Microsoft PowerPoint":"GeoJson"===e?(r="GeoJSON",this.type="GeoJSON"):"Globe Service"===e?r="Globe Layer":"Vector Tile Service"===e?r="Tile Layer":"netCDF"===e?r="NetCDF":"Map Service"===e?r=-1===n.indexOf(t,"Spatiotemporal")&&(n.indexOf(t,"Hosted Service")>-1||n.indexOf(t,"Tiled")>-1)&&-1===n.indexOf(t,"Relational")?"Tile Layer":"Map Image Layer":e&&e.toLowerCase().indexOf("add in")>-1?r=e.replace(/(add in)/gi,"Add-In"):"datastore catalog service"===e?r="Big Data File Share":"Compact Tile Package"===e?r="Tile Package (tpkx)":"Raster function template"===e&&(r="Raster Function Template"),r},_getIconUrl:function(){var e,t=this.type&&this.type.toLowerCase()||"",r=this.typeKeywords||[],i=!1,s=!1,o=!1,l=!1,u=!1,c=!1;return t.indexOf("service")>0||"feature collection"===t||"kml"===t||"wms"===t||"wmts"===t||"wfs"===t?(i=n.indexOf(r,"Hosted Service")>-1,"feature service"===t||"feature collection"===t||"kml"===t||"wfs"===t?(l=n.indexOf(r,"Table")>-1,s=n.indexOf(r,"Route Layer")>-1,o=n.indexOf(r,"Markup")>-1,e=(u=-1!==n.indexOf(r,"Spatiotemporal"))&&l?"spatiotemporaltable":l?"table":s?"routelayer":o?"markup":u?"spatiotemporal":i?"featureshosted":"features"):"map service"===t||"wms"===t||"wmts"===t?(u=-1!==n.indexOf(r,"Spatiotemporal"),c=-1!==n.indexOf(r,"Relational"),e=u||c?"mapimages":i||n.indexOf(r,"Tiled")>-1||"wmts"===t?"maptiles":"mapimages"):e="scene service"===t?n.indexOf(r,"Line")>-1?"sceneweblayerline":n.indexOf(r,"3DObject")>-1?"sceneweblayermultipatch":n.indexOf(r,"Point")>-1?"sceneweblayerpoint":n.indexOf(r,"IntegratedMesh")>-1?"sceneweblayermesh":n.indexOf(r,"PointCloud")>-1?"sceneweblayerpointcloud":n.indexOf(r,"Polygon")>-1?"sceneweblayerpolygon":n.indexOf(r,"Building")>-1?"sceneweblayerbuilding":"sceneweblayer":"image service"===t?n.indexOf(r,"Elevation 3D Layer")>-1?"elevationlayer":n.indexOf(r,"Tiled Imagery")>-1?"tiledimagerylayer":"imagery":"stream service"===t?"streamlayer":"vector tile service"===t?"vectortile":"datastore catalog service"===t?"datastorecollection":"geocoding service"===t?"geocodeservice":"geoprocessing service"===t&&n.indexOf(r,"Web Tool")>-1&&this.portal&&this.portal.isPortal?"tool":"layers"):e="web map"===t||"cityengine web scene"===t?"maps":"web scene"===t?n.indexOf(r,"ViewingMode-Local")>-1?"webscenelocal":"websceneglobal":"web mapping application"===t||"mobile application"===t||"application"===t||"operation view"===t||"desktop application"===t?"apps":"map document"===t||"map package"===t||"published map"===t||"scene document"===t||"globe document"===t||"basemap package"===t||"mobile basemap package"===t||"mobile map package"===t||"project package"===t||"project template"===t||"pro map"===t||"layout"===t||"layer"===t&&n.indexOf(r,"ArcGIS Pro")>-1||"explorer map"===t&&n.indexOf(r,"Explorer Document")?"mapsgray":"service definition"===t||"csv"===t||"shapefile"===t||"cad drawing"===t||"geojson"===t||"360 vr experience"===t||"netcdf"===t||"administrative report"===t?"datafiles":"explorer add in"===t||"desktop add in"===t||"windows viewer add in"===t||"windows viewer configuration"===t?"appsgray":"arcgis pro add in"===t||"arcgis pro configuration"===t?"addindesktop":"rule package"===t||"file geodatabase"===t||"sqlite geodatabase"===t||"csv collection"===t||"kml collection"===t||"windows mobile package"===t||"map template"===t||"desktop application template"===t||"gml"===t||"arcpad package"===t||"code sample"===t||"form"===t||"document link"===t||"operations dashboard add in"===t||"rules package"===t||"image"===t||"workflow manager package"===t||"explorer map"===t&&n.indexOf(r,"Explorer Mapping Application")>-1||n.indexOf(r,"Document")>-1?"datafilesgray":"network analysis service"===t||"geoprocessing service"===t||"geodata service"===t||"geometry service"===t||"geoprocessing package"===t||"locator package"===t||"geoprocessing sample"===t||"workflow manager service"===t?"toolsgray":"layer"===t||"layer package"===t||"explorer layer"===t?"layersgray":"scene package"===t?"scenepackage":"mobile scene package"===t?"mobilescenepackage":"tile package"===t||"compact tile package"===t?"tilepackage":"task file"===t?"taskfile":"report template"===t?"report-template":"statistical data collection"===t?"statisticaldatacollection":"insights workbook"===t?"workbook":"insights model"===t?"insightsmodel":"insights page"===t?"insightspage":"insights theme"===t?"insightstheme":"hub initiative"===t?"hubinitiative":"hub page"===t?"hubpage":"hub site application"===t?"hubsite":"relational database connection"===t?"relationaldatabaseconnection":"big data file share"===t?"datastorecollection":"image collection"===t?"imagecollection":"desktop style"===t?"desktopstyle":"style"===t?"style":"dashboard"===t?"dashboard":"raster function template"===t?"rasterprocessingtemplate":"vector tile package"===t?"vectortilepackage":"ortho mapping project"===t?"orthomappingproject":"ortho mapping template"===t?"orthomappingtemplate":"solution"===t?"solutions":"geopackage"===t?"geopackage":"deep learning package"===t?"deeplearningpackage":"real time analytic"===t?"realtimeanalytics":"big data analytic"===t?"bigdataanalytics":"feed"===t?"feed":"excalibur imagery project"===t?"excaliburimageryproject":"notebook"===t?"notebook":"storymap"===t?"storymap":"survey123 add in"===t?"survey123addin":"mission"===t?"mission":"mission report"===t?"missionreport":"quickcapture project"===t?"quickcaptureproject":"pro report"===t?"proreport":"urban model"===t?"urbanmodel":"web experience"===t?"experiencebuilder":"web experience template"===t?"webexperiencetemplate":"workflow"===t?"workflow":"kernel gateway connection"===t?"kernelgatewayconnection":"insights script"===t?"insightsscript":"hub initiative template"===t?"hubinitiativetemplate":"storymap theme"===t?"storymaptheme":"maps",e?a.toUrl("../css/images/item_type_icons/"+e+"16.png"):null},_getIsPremiumContent:function(){var e=this.typeKeywords,t=!1;return(n.indexOf(e,"Requires Subscription")>-1||n.indexOf(e,"Requires Credits")>-1)&&(t=!0),t},_getPremiumIconUrl:function(){var e,t=this.typeKeywords;return this.isPremiumContent&&(e=n.indexOf(t,"Requires Credits")>-1?"premiumcredits":"premiumitem"),e?a.toUrl("../css/images/item_type_icons/"+e+"16.png"):null},getThumbnailUrl:function(e){var t=this.thumbnailUrl;return t&&e&&(t+=(-1===t.indexOf("?")?"?":"&")+"w="+e),t}}),b=e([],{declaredClass:"esri.arcgis.PortalListing",constructor:function(e){for(var r in t.mixin(this,e),this.id=this.itemId,this.url=(this.portal&&this.portal.portalUrl)+"content/"+(this.userItemUrl?"items/":"listings/")+this.itemId,this.commentsUrl=this.url+"/comments",this.created=this.created?new Date(this.created):null,this.banner=this.banner?d.formatUrl(this.url+"/info/"+this.banner):"",this.thumbnail=this.thumbnail?d.formatUrl(this.url+"/info/"+this.thumbnail):"",this.largeThumbnail=this.largeThumbnail?d.formatUrl(this.url+"/info/"+this.largeThumbnail):"",this.avgRating=this.avgRating||0,this.numRatings=this.numRatings||0,this.numComments=this.numComments||0,this.listingProperties=this.listingProperties||{priceDesc:"",creditsPerTransaction:0,licenseType:"free",trialSupported:!1,trialDuration:0,listingAccess:"private"},this.listingProperties)this[r]&&(this.listingProperties[r]=this[r]);this.properties=this.properties||{systemRequirements:"",termsAndConditions:"",version:"1.0"},this.screenshots=n.map(this.screenshots,t.hitch(this,(function(e){return d.formatUrl(this.url+"/info/"+e)}))),this.vendorName=this.vendor.name,this.vendor.thumbnail=this.vendor.thumbnail?this.userItemUrl?d.formatUrl(this.portal.portalUrl+"/portals/self/resources/"+this.vendor.thumbnail):d.formatUrl(this.url+"/vendorinfo/"+this.vendor.thumbnail):""},getComments:function(){return d.requestToTypedArray(this.commentsUrl,null,null,f,{item:this})},getVendor:function(){return this.vendor}}),v=e([],{declaredClass:"esri.arcgis.PortalProvision",constructor:function(e){t.mixin(this,e),this.created=this.created?new Date(this.created):null,this.startDate=this.startDate?new Date(this.startDate):null,this.endDate=this.endDate&&-1!==this.endDate?new Date(this.endDate):null,this.listing=e.listing?new b(t.mixin(e.listing,{portal:this.portal})):null}}),x=e([],{declaredClass:"esri.arcgis.PortalGroup",constructor:function(e){t.mixin(this,e),this.url=(this.portal&&this.portal.portalUrl)+"community/groups/"+this.id,this.thumbnailUrl=d.formatUrl(this.url+"/info/"+this.thumbnail),this.modified=this.modified?new Date(this.modified):null,this.created=this.created?new Date(this.created):null},getMembers:function(){return d.request(this.url+"/users")},queryItems:function(e,t){return(e=d.formatQueryParams({},e,t)).q="group:"+this.id+(e.q?" "+e.q:""),this.portal.queryItems(e)},getThumbnailUrl:function(e){var t=this.thumbnailUrl;return t&&e&&(t+=(-1===t.indexOf("?")?"?":"&")+"w="+e),t}}),w=e([],{declaredClass:"esri.arcgis.PortalFolder",constructor:function(e){t.mixin(this,e),this.url=(this.portal&&this.portal.portalUrl)+"content/users/"+this.username+"/"+this.id,this.created=this.created?new Date(this.created):null},getItems:function(){return d.requestToTypedArray(this.url,null,null,y,{portal:this.portal,folderId:this.id})}}),P=e([],{declaredClass:"esri.arcgis.PortalUser",constructor:function(e){t.mixin(this,e),this.url=(this.portal&&this.portal.portalUrl)+"community/users/"+this.username,this.userContentUrl=(this.portal&&this.portal.portalUrl)+"content/users/"+this.username,this.thumbnailUrl=this.thumbnail?d.formatUrl(this.url+"/info/"+this.thumbnail):null,this.modified=this.modified?new Date(this.modified):null,this.created=this.created?new Date(this.created):null},getGroups:function(){return p(d.request(this.url).then(t.hitch(this,(function(e){return d.resultsToTypedArray(x,{portal:this.portal},e.groups)}))))},getNotifications:function(){return d.requestToTypedArray(this.url+"/notifications",null,null,null,{portal:this.portal})},getGroupInvitations:function(){return d.requestToTypedArray(this.url+"/invitations",null,null,null,{portal:this.portal})},getTags:function(){return d.requestToTypedArray(this.url+"/tags",null,null,null,{portal:this.portal})},getFolders:function(){return p(this.getContent(null,{num:1}).then((function(e){return e.folders})))},getItems:function(e){return p(this.getContent(e).then((function(e){return e.items})))},getItem:function(e){var r=this.portal.portalUrl+"content/items/"+e;return d.request(r).then(t.hitch(this,(function(e){return new y(t.mixin(e,{portal:this.portal}))})))},getContent:function(e,r){var i=this.url.replace("/community/","/content/")+(e?"/"+e:"");return d.request(i,r).then(t.hitch(this,(function(t){return t.folders=d.resultsToTypedArray(w,{portal:this.portal},t.folders),t.items=d.resultsToTypedArray(y,{portal:this.portal,folderId:e},t.items),t})))},getThumbnailUrl:function(e){var t=this.thumbnailUrl;return t&&e&&(t+=(-1===t.indexOf("?")?"?":"&")+"w="+e),t}}),U={Portal:e([h],{declaredClass:"esri.arcgis.Portal",onLoad:function(){},onError:function(){},constructor:function(e){var r,i=t.isObject(e)?e:{url:e};if(this.registerConnectEvents(),m={options:{disableIdentityLookup:!0},requestParams:{f:"json"}},i.self){m.self=i.self,t.mixin(this,{url:i.url||c.getProtocolForWebResource()+"//"+(i.self.urlKey?i.self.urlKey+"."+i.self.customBaseUrl:i.self.portalHostname)});var n=this.url.indexOf("/sharing");this.portalUrl=-1!==n?this.url+"/":this.url+"/sharing/rest/",r=i.self.user?this.signIn():this.init(this.url)}else i.url&&t.mixin(this,{url:i.url}),r=this.init(this.url);r.then(t.hitch(this,(function(){this.emit("ready",this),this.onLoad(this)})))},init:function(e,r){var i=(e=(e||this.portalUrl).replace(/\/+$/,"")).indexOf("/sharing");return this.portalUrl=-1!==i?e+"/":e+"/sharing/rest/",this._getSelf(this.portalUrl).then(t.hitch(this,(function(e){m.self=t.mixin({},e);var i=e.user;return i&&r&&(m.currentToken=r&&r.token,m.loggedInUser=new P(t.mixin(i,{portal:this,credential:r}))),m.self.id&&!1===m.self.canSearchPublic&&(m.extraQuery=" AND orgid:"+m.self.id),t.mixin(this,m.self),this.thumbnailUrl=d.formatUrl(this.portalUrl+"portals/self/resources/"+this.thumbnail),this.isOrganization=!(!this.access||!this.access.length),this.created=this.created?new Date(this.created):null,this.modified=this.modified?new Date(this.modified):null,this})),t.hitch(this,(function(e){throw this.onError(e),e})))},signIn:function(){var e=new i,r=t.hitch(this,(function(){this._onSignIn().then(t.hitch(this,(function(){e.resolve(m.loggedInUser)})),t.hitch(this,(function(t){e.reject(t)})))}));return m&&m.self?m&&m.loggedInUser?setTimeout((function(){e.resolve(m.loggedInUser)}),0):r():this.on("load",t.hitch(this,(function(){r()}))),e},signOut:function(){return m.loggedInUser.credential&&m.loggedInUser.credential.destroy(),m.loggedInUser=null,m.options.disableIdentityLookup=!0,d.clearFieldsFromObject(m.self,this),m.self=null,this.init(this.url)},getPortalUser:function(){return m.loggedInUser},addResource:function(e,t){var r={key:e,text:t};return d.request(this.portalUrl+"portals/self/addResource",r,{usePost:!0})},update:function(e){return d.request(this.portalUrl+"portals/self/update",e,{usePost:!0})},queryGroups:function(e,t){return this._queryPortal(this.portalUrl+"community/groups",d.formatQueryParams({},e,t),x)},queryItems:function(e,t){return this._queryPortal(this.portalUrl+"search",d.formatQueryParams({},e,t),y)},queryListings:function(e){var t=d.formatQueryParams({},e,!0),r="";return t.q&&t.q.toLowerCase().indexOf("mylistings:true")>-1?(t.q=t.q.toLowerCase().replace("mylistings:true",""),r="?mylistings=true"):t.q||(t.q='""'),this._queryPortal(this.portalUrl+"content/listings"+r,t,b)},queryCustomerList:function(e,t){var r=d.formatQueryParams({},e,!0);return this._queryPortal(this.portalUrl+"portals/self/customersList",r)},getProvisions:function(){return this.getCustomers().then(t.hitch(this,(function(e){return e.purchases})))},getInterests:function(){return this.getCustomers().then(t.hitch(this,(function(e){return e.interests})))},getTrials:function(){return this.getCustomers().then(t.hitch(this,(function(e){return e.trials})))},getCustomers:function(e){var t=this.portalUrl+"portals/self/customers",r={status:e||"all"};return d.request(t,r)},getMyPurchases:function(){return this.getPurchases().then((function(e){return e.purchases}))},getMyInterests:function(){return this.getPurchases().then((function(e){return e.interests}))},getPurchases:function(){var e=this.portalUrl+"portals/self/purchases";return d.request(e).then(t.hitch(this,(function(e){return e.interests=n.map(e.interests,(function(e){return t.mixin(e.provision,{listing:e.listing})})),e.purchases=n.map(e.purchases,(function(e){return t.mixin(e.provision,{listing:e.listing})})),e.trials=n.map(e.trials,(function(e){return t.mixin(e.provision,{listing:e.listing})})),e.interests=d.resultsToTypedArray(v,{portal:this},e.interests),e.trials=d.resultsToTypedArray(v,{portal:this},e.trials),e.purchases=d.resultsToTypedArray(v,{portal:this},e.purchases),e})))},queryUsers:function(e,t){return this._queryPortal(this.portalUrl+"community/users",d.formatQueryParams({sortField:"username"},e,t),P)},_onSignIn:function(){return m.options.disableIdentityLookup=!1,m.self=null,o.id.getCredential(this.portalUrl).then(t.hitch(this,"init",this.url)).then((function(){return m.loggedInUser}),t.hitch(this,(function(e){throw m.options.disableIdentityLookup=!0,this.onError(e),e})))},_getSelf:function(e){var t,n=e+"portals/self";return m.self?(t=new i,setTimeout((function(){t.resolve(m.self)}),0)):t=d.request(n,{culture:r.locale}),t},_queryPortal:function(e,r,n){var s=t.mixin({num:10,start:0,sortField:"title",sortOrder:"asc"},r),a=["start","query","num","nextStart"],o=d.request(e,s).then(t.hitch(this,(function(e){return e.results=d.resultsToTypedArray(n,{portal:this},e),e.queryParams=t.mixin({},s),e.nextQueryParams=t.mixin(s,{start:e.nextStart}),d.clearFieldsFromObject(a,e)})));return(o=t.delegate(o)).queryParams=t.mixin({},s),o.nextQueryParams=i.when(o,(function(e){return e.nextQueryParams})),p(o)}}),PortalFolder:w,PortalGroup:x,PortalItem:y,PortalUser:P,PortalComment:f,PortalRating:g,PortalUtil:d,PortalResult:p,PortalListing:b};return s("extend-esri")&&t.mixin(t.getObject("arcgis",!0,o),U),U}));
