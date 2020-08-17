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

define(["require","dojo/_base/kernel","dojo/_base/declare","dojo/_base/connect","dojo/_base/lang","dojo/_base/array","dojo/_base/event","dojo/on","dojo/aspect","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dijit/a11yclick","dijit/registry","./kernel","./config","./sniff","./lang","./_coremap","./MapNavigationManager","dojo/i18n!./nls/jsapi"],(function(i,e,t,s,o,n,a,r,l,h,d,c,_,m,u,g,v,p,f,b,S,Z,C,M){var N={up:"panUp",right:"panRight",down:"panDown",left:"panLeft"},D={upperRight:"panUpperRight",lowerRight:"panLowerRight",lowerLeft:"panLowerLeft",upperLeft:"panUpperLeft"},P=s.connect,k=s.disconnect,y=_.create,z=u.set,R=o.hitch,w=m.getMarginBox,L=e.deprecated,x=o.mixin,H="Map.(enable/disable)ShiftDoubleClickZoom deprecated. Shift-Double-Click zoom behavior will not be supported.",W=0,B=t(Z,{declaredClass:"esri.Map",constructor:function(e,t){x(this,{_slider:null,_navDiv:null,_mapParams:x({attributionWidth:.45,slider:!0,nav:!1,logo:!0,sliderStyle:"small",sliderPosition:"top-left",sliderOrientation:"vertical",autoResize:!0},t=t||{})}),x(this,{isMapNavigation:null==t.isMapNavigation||t.isMapNavigation,isDoubleClickZoom:null==t.isDoubleClickZoom||t.isDoubleClickZoom,isClickRecenter:null==t.isClickRecenter||t.isClickRecenter,isPan:null==t.isPan||t.isPan,isRubberBandZoom:null==t.isRubberBandZoom||t.isRubberBandZoom,isPinchZoom:null==t.isPinchZoom||t.isPinchZoom,isKeyboardNavigation:null==t.isKeyboardNavigation||t.isKeyboardNavigation,isScrollWheel:null==t.isScrollWheel||t.isScrollWheel,isShiftDoubleClickZoom:!1,isScrollWheelZoom:!1,isPanArrows:!1,isZoomSlider:!1}),o.isFunction(p._css)&&(p._css=p._css(this._mapParams.force3DTransforms),this.force3DTransforms=this._mapParams.force3DTransforms);var s=b("esri-transforms")&&b("esri-transitions");if(this.navigationMode=this._mapParams.navigationMode||s&&"css-transforms"||"classic","css-transforms"!==this.navigationMode||s||(this.navigationMode="classic"),this.fadeOnZoom=S.isDefined(this._mapParams.fadeOnZoom)?this._mapParams.fadeOnZoom:"css-transforms"===this.navigationMode,"css-transforms"!==this.navigationMode&&(this.fadeOnZoom=!1),this.setMapCursor("default"),this.smartNavigation=t&&t.smartNavigation,!S.isDefined(this.smartNavigation)&&b("mac")&&!b("esri-touch")&&!b("esri-pointer")&&!(b("ff")<=3.5)){var a=navigator.userAgent.match(/Mac\s+OS\s+X\s+([\d]+)(\.|\_)([\d]+)\D/i);if(a&&S.isDefined(a[1])&&S.isDefined(a[3])){var h=parseInt(a[1],10),d=parseInt(a[3],10);this.smartNavigation=h>10||10===h&&d>=6}}var c=!0;this.showAttribution=S.isDefined(this._mapParams.showAttribution)?this._mapParams.showAttribution:c,this._onLoadHandler_connect=P(this,"onLoad",this,"_onLoadInitNavsHandler");var _=y("div",{class:"esriControlsBR"+(this._mapParams.nav?" withPanArrows":"")},this.root);if(this.showAttribution){var m=o.getObject("esri.dijit.Attribution",!1);if(m)this._initAttribution(m,_);else{var u=W++,v=this;this._rids&&this._rids.push(u),i(["./dijit/Attribution"],(function(i){var e=v._rids?n.indexOf(v._rids,u):-1;-1!==e&&(v._rids.splice(e,1),v._initAttribution(i,_))}))}}if(this._mapParams.logo){var f={};6===b("ie")&&(f.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true', sizingMethod='crop', src='"+i.toUrl("./images/map/logo-med.png")+"')"),this._ogol=y("div",{style:f,tabIndex:"0",title:"Esri"},_),this._setLogoSize(),this._onMapResizeLogo_connect=P(this,"onResize",this,"_setLogoSize"),this._ogol_connect=P(this._ogol,g,this,"_openLogoLink")}if(this.navigationManager=new C(this),t&&t.basemap&&(this._onLoadFix=!0,this.setBasemap(t.basemap),this._onLoadFix=!1),this.autoResize=this._mapParams.autoResize,this.autoResize){var Z=this._getEnclosingResizableWidget(this.container)||window,M=this.resize;this._rszSignal=r.pausable(Z,"resize",M),this._oriSignal=r.pausable(window,"orientationchange",M),l.after(Z,"resize",M,!0),this._startResizeTimer()}},_startResizeTimer:function(){clearTimeout(this._persistentTimer),this._persistentTimer=setTimeout(this._timedResize,2*this.resizeDelay)},_getEnclosingResizableWidget:function(i){var e=v.getEnclosingWidget(i);return e?e.resize?e:this._getEnclosingResizableWidget(i.parentNode):e},_setLogoSize:function(){this._ogol&&(this.root.clientWidth*this.root.clientHeight<25e4?(c.remove(this._ogol,"logo-med"),c.add(this._ogol,"logo-sm")):(c.remove(this._ogol,"logo-sm"),c.add(this._ogol,"logo-med")))},_initAttribution:function(i,e){var t=y("span",{class:"esriAttribution"},e,"first");z(t,"maxWidth",Math.floor(this.width*this._mapParams.attributionWidth)+"px"),this._connects.push(P(t,g,(function(){var i="esriAttributionOpen";c.contains(this,i)?c.remove(this,i):this.scrollWidth>this.clientWidth&&c.add(this,i)}))),this.attribution=new i({map:this},t)},_cleanUp:function(){this.disableMapNavigation(),this.navigationManager.destroy();var i=this._slider;i&&i.destroy&&!i._destroyed&&i.destroy();var e=this._navDiv,t=this.attribution;e&&_.destroy(e),t&&t.destroy(),this._connects.push(this._slider_connect,this._ogol_connect,this._rszSignal,this._oriSignal),n.forEach(this._connects,k),clearInterval(this._persistentTimer),this.attribution=this.navigationManager=this._rids=this._connects=this._slider_connect=this._ogol_connect=this._rszSignal=this._oriSignal=this._persistentTimer=null,this.inherited("_cleanUp",arguments)},_isPanningOrZooming:function(){return this.__panning||this.__zooming},_canZoom:function(i){var e=this.getLevel();return!this.__tileInfo||!(e===this.getMinZoom()&&i<0||e===this.getMaxZoom()&&i>0)},_onLoadInitNavsHandler:function(){if(this._evalMapNavigation(),this._createNav(),"small"!==this._mapParams.sliderStyle&&this._createSlider){if(this._mapParams.slider){var e=-1!==this._getSliderClass(!0).indexOf("Horizontal"),t=[e?"dijit.form.HorizontalSlider":"dijit.form.VerticalSlider",e?"dijit.form.HorizontalRule":"dijit.form.VerticalRule",e?"dijit.form.HorizontalRuleLabels":"dijit.form.VerticalRuleLabels"];if(n.some(t,(function(i){return!o.getObject(i,!1)}))){t=n.map(t,(function(i){return i.replace(/\./g,"/")}));var s=W++,a=this;this._rids&&this._rids.push(s),i(t,(function(){var i=a._rids?n.indexOf(a._rids,s):-1;-1!==i&&(a._rids.splice(i,1),a._createSlider.apply(a,arguments))}))}else t=n.map(t,(function(i){return o.getObject(i,!1)})),this._createSlider.apply(this,t)}}else this._createSimpleSlider();k(this._onLoadHandler_connect)},_createNav:function(){if(this._mapParams.nav){var i,e,t,s=c.add,o=this.id;this._navDiv=y("div",{id:o+"_navdiv"},this.root),s(this._navDiv,"navDiv");var n,a=this.width/2,r=this.height/2;for(t in N)e=N[t],s(i=y("div",{id:o+"_pan_"+t},this._navDiv),"fixedPan "+e),"up"===t||"down"===t?(n=parseInt(w(i).w,10)/2,z(i,{left:a-n+"px",zIndex:30})):(n=parseInt(w(i).h,10)/2,z(i,{top:r-n+"px",zIndex:30})),this._connects.push(P(i,"onclick",R(this,this[e])));for(t in this._onMapResizeNavHandler_connect=P(this,"onResize",this,"_onMapResizeNavHandler"),D)e=D[t],s(i=y("div",{id:o+"_pan_"+t,style:{zIndex:30}},this._navDiv),"fixedPan "+e),this._connects.push(P(i,"onclick",R(this,this[e])));this.isPanArrows=!0}},_onMapResizeNavHandler:function(i,e,t){var s,o,n,a=this.id,r=e/2,l=t/2,d=h.byId;for(s in N)o=d(a+"_pan_"+s),"up"===s||"down"===s?(n=parseInt(w(o).w,10)/2,z(o,"left",r-n+"px")):(n=parseInt(w(o).h,10)/2,z(o,"top",l-n+"px"))},_createSimpleSlider:function(){if(this._mapParams.slider){var i=this._slider=y("div",{id:this.id+"_zoom_slider",class:this._getSliderClass(),style:{zIndex:30}}),e=y("div",{class:"esriSimpleSliderIncrementButton",tabIndex:"0",role:"button"},i),t=y("div",{class:"esriSimpleSliderDecrementButton",tabIndex:"0",role:"button"},i);this._addZoomButtonTooltips(e,t),this._incButton=e,this._decButton=t,this._simpleSliderZoomHandler(null,null,null,this.getLevel());var s=M.widgets.zoomSlider;this._addZoomButtonIcon(e,"+",s.zoomIn),this._addZoomButtonIcon(t,"&minus;",s.zoomOut),b("ie")<8&&c.add(t,"dj_ie67Fix"),this._connects.push(P(e,g,this,this._simpleSliderChangeHandler)),this._connects.push(P(t,g,this,this._simpleSliderChangeHandler)),(this.getMaxZoom()>-1||this.getMinZoom()>-1)&&this._connects.push(P(this,"onZoomEnd",this,this._simpleSliderZoomHandler)),b("ie")<10&&h.setSelectable(i,!1),this.root.appendChild(i),this.isZoomSlider=!0}},_simpleSliderChangeHandler:function(i){a.stop(i);var e=-1!==i.currentTarget.className.indexOf("IncrementButton");this._extentUtil({numLevels:e?1:-1})},_simpleSliderZoomHandler:function(i,e,t,s){var o,n,a;n=this._incButton,a=this._decButton,s>-1&&s===this.getMaxZoom()?o=n:s>-1&&s===this.getMinZoom()&&(o=a),o?(c.add(o,"esriSimpleSliderDisabledButton"),c.remove(o===n?a:n,"esriSimpleSliderDisabledButton")):(c.remove(n,"esriSimpleSliderDisabledButton"),c.remove(a,"esriSimpleSliderDisabledButton"))},_getSliderClass:function(i){var e=i?"Large":"Simple",t=this._mapParams.sliderOrientation,s=this._mapParams.sliderPosition||"";if(t=t&&"horizontal"===t.toLowerCase()?"esri"+e+"SliderHorizontal":"esri"+e+"SliderVertical",s)switch(s.toLowerCase()){case"top-left":s="esri"+e+"SliderTL";break;case"top-right":s="esri"+e+"SliderTR";break;case"bottom-left":s="esri"+e+"SliderBL";break;case"bottom-right":s="esri"+e+"SliderBR"}return"esri"+e+"Slider "+t+" "+s},_addZoomButtonIcon:function(i,e,t){_.create("span",{"aria-hidden":"true",role:"presentation",innerHTML:e},i),_.create("span",{class:"esriIconFallbackText",innerHTML:t},i)},_addZoomButtonTooltips:function(i,e){var t=M.widgets.zoomSlider;d.set(i,"title",t.zoomIn),d.set(e,"title",t.zoomOut)},_createSlider:function(i,e,t){if(this._mapParams.slider){var s,o,a,r=y("div",{id:this.id+"_zoom_slider"},this.root),l=f.defaults.map,h=this._getSliderClass(!0),d=-1!==h.indexOf("Horizontal"),c=this.getNumLevels();if(c>0){var _,m,u=this._mapParams.sliderLabels,g=!!u,v=!1!==u;if(v){var p,S=d?"bottomDecoration":"rightDecoration";if(!u)for(u=[],s=0,o=c;s<o;s++)u[s]="";p=[{class:"esriLargeSliderTicks",container:S,count:c,dijitClass:e},{class:g&&"esriLargeSliderLabels",container:S,count:c,labels:u,dijitClass:t}],n.forEach(p,(function(i){var t=y("div"),s=i.dijitClass;delete i.dijitClass,r.appendChild(t),s===e?_=new s(i,t):m=new s(i,t)}))}(a=this._slider=new i({id:r.id,class:h,minimum:this.getMinZoom(),maximum:this.getMaxZoom(),discreteValues:c,value:this.getLevel(),clickSelect:!0,intermediateChanges:!0,style:"z-index:30;"},r)).startup(),v&&(_.startup(),m.startup()),this._slider_connect=P(a,"onChange",this,"_onSliderChangeHandler"),this._connects.push(P(this,"onExtentChange",this,"_onExtentChangeSliderHandler")),this._connects.push(P(a._movable,"onFirstMove",this,"_onSliderMoveStartHandler"))}else{var Z=(a=this._slider=new i({id:r.id,class:h,minimum:0,maximum:2,discreteValues:3,value:1,clickSelect:!0,intermediateChanges:l.sliderChangeImmediate,style:"height:50px; z-index:30;"},r)).domNode.firstChild.childNodes;for(s=1;s<=3;s++)z(Z[s],"visibility","hidden");a.startup(),this._slider_connect=P(a,"onChange",this,"_onDynSliderChangeHandler"),this._connects.push(P(this,"onExtentChange",this,"_onExtentChangeDynSliderHandler"))}var C=a.incrementButton,M=a.decrementButton;d?this._addZoomButtonTooltips(C,M):this._addZoomButtonTooltips(M,C),C.style.outline="none",M.style.outline="none",a.sliderHandle.style.outline="none",a._onKeyPress=function(){};var N=a._movable;if(N){var D=N.onMouseDown;N.onMouseDown=function(i){b("ie")<9&&1!==i.button||D.apply(this,arguments)}}this.isZoomSlider=!0}},_onSliderMoveStartHandler:function(){k(this._slider_connect),k(this._slidermovestop_connect),this._slider_connect=P(this._slider,"onChange",this,"_onSliderChangeDragHandler"),this._slidermovestop_connect=P(this._slider._movable,"onMoveStop",this,"_onSliderMoveEndHandler")},_onSliderChangeDragHandler:function(i){this._extentUtil({targetLevel:i})},_onSliderMoveEndHandler:function(){k(this._slider_connect),k(this._slidermovestop_connect)},_onSliderChangeHandler:function(i){this.setLevel(i)},_updateSliderValue:function(i,e){k(this._slider_connect);var t=this._slider,s=t._onChangeActive;t._onChangeActive=!1,t.set("value",i),t._onChangeActive=s,this._slider_connect=P(t,"onChange",this,e)},_onExtentChangeSliderHandler:function(i,e,t,s){k(this._slidermovestop_connect),this._updateSliderValue(s.level,"_onSliderChangeHandler")},_onDynSliderChangeHandler:function(i){this._extentUtil({numLevels:i>0?1:-1})},_onExtentChangeDynSliderHandler:function(){this._updateSliderValue(1,"_onDynSliderChangeHandler")},_openLogoLink:function(i){window.open(f.defaults.map.logoLink,"_blank"),a.stop(i)},enableMapNavigation:function(){this.isMapNavigation||(this.isMapNavigation=!0,this._evalMapNavigation())},disableMapNavigation:function(){this.isMapNavigation&&(this.isMapNavigation=!1,this._evalMapNavigation())},_evalMapNavigation:function(){this.isMapNavigation?this.navigationManager.enableNavigation():this.navigationManager.disableNavigation()},_evalNavigationFeature:function(i){this.isMapNavigation&&this["is"+i]?this.navigationManager["enable"+i]():this.navigationManager["disable"+i]()},enableDoubleClickZoom:function(){this.isDoubleClickZoom||(this.isDoubleClickZoom=!0,this._evalNavigationFeature("DoubleClickZoom"))},disableDoubleClickZoom:function(){this.isDoubleClickZoom&&(this.isDoubleClickZoom=!1,this._evalNavigationFeature("DoubleClickZoom"))},enableShiftDoubleClickZoom:function(){this.isShiftDoubleClickZoom||(L(this.declaredClass+": "+H,null,"v2.0"),this.navigationManager.enableShiftDoubleClickZoom(),this.isShiftDoubleClickZoom=!0)},disableShiftDoubleClickZoom:function(){this.isShiftDoubleClickZoom&&(L(this.declaredClass+": "+H,null,"v2.0"),this.navigationManager.disableShiftDoubleClickZoom(),this.isShiftDoubleClickZoom=!1)},enableClickRecenter:function(){this.isClickRecenter||(this.isClickRecenter=!0,this._evalNavigationFeature("ClickRecenter"))},disableClickRecenter:function(){this.isClickRecenter&&(this.isClickRecenter=!1,this._evalNavigationFeature("ClickRecenter"))},enablePan:function(){this.isPan||(this.isPan=!0,this._evalNavigationFeature("Pan"))},disablePan:function(){this.isPan&&(this.isPan=!1,this._evalNavigationFeature("Pan"))},enableRubberBandZoom:function(){this.isRubberBandZoom||(this.isRubberBandZoom=!0,this._evalNavigationFeature("RubberBandZoom"))},disableRubberBandZoom:function(){this.isRubberBandZoom&&(this.isRubberBandZoom=!1,this._evalNavigationFeature("RubberBandZoom"))},enablePinchZoom:function(){this.isPinchZoom||(this.isPinchZoom=!0,this._evalNavigationFeature("PinchZoom"))},disablePinchZoom:function(){this.isPinchZoom&&(this.isPinchZoom=!1,this._evalNavigationFeature("PinchZoom"))},enableKeyboardNavigation:function(){this.isKeyboardNavigation||(this.isKeyboardNavigation=!0,this._evalNavigationFeature("KeyboardNavigation"))},disableKeyboardNavigation:function(){this.isKeyboardNavigation&&(this.isKeyboardNavigation=!1,this._evalNavigationFeature("KeyboardNavigation"))},enableScrollWheel:function(){this.isScrollWheel||(this.isScrollWheel=!0,this._evalNavigationFeature("ScrollWheel"))},disableScrollWheel:function(){this.isScrollWheel&&(this.isScrollWheel=!1,this._evalNavigationFeature("ScrollWheel"))},enableScrollWheelZoom:function(){this.isScrollWheelZoom||(this.navigationManager.enableScrollWheelZoom(),this.isScrollWheelZoom=!0)},disableScrollWheelZoom:function(){this.isScrollWheelZoom&&(this.navigationManager.disableScrollWheelZoom(),this.isScrollWheelZoom=!1)},enableScrollWheelPan:function(){this.isScrollWheelPan||this.navigationManager.enableScrollWheelPan()},disableScrollWheelPan:function(){this.isScrollWheelPan&&this.navigationManager.disableScrollWheelPan()},showPanArrows:function(){this._navDiv&&(this._navDiv.style.display="block",this.isPanArrows=!0)},hidePanArrows:function(){this._navDiv&&(this._navDiv.style.display="none",this.isPanArrows=!1)},showZoomSlider:function(){this._slider&&(z(this._slider.domNode||this._slider,"visibility","inherit"),this.isZoomSlider=!0)},hideZoomSlider:function(){this._slider&&(z(this._slider.domNode||this._slider,"visibility","hidden"),this.isZoomSlider=!1)},onClick:function(i){i.graphic||(i.graphic=this.syncHitTestForWebGL(i))}});return b("extend-esri")&&(p.Map=B),B}));
