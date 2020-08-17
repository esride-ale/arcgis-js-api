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

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/has","./etc/elementRepeater","./Templated","./LabelMixin","dojo/text!./templates/MultiplicityHeader.html","./MultiplicityTools","./MultiplicityTabs","../../../kernel"],(function(e,t,i,s,o,n,a,l,d,r,h,c,u,m){var b=e([d,r],{_currentIndex:-1,_isGxeMultiplicityHeader:!0,_tablessElement:null,templateString:h,label:null,target:null,minOccurs:1,maxOccurs:1,preferOpen:!1,showHeader:!0,useTabs:!0,postCreate:function(){this.inherited(arguments)},adoptElement:function(e,t){if(this.useTabs){e.showHeader=!1,e.trackMultiplicity=!1,e._adoptedForMultiplicity=!0,o.place(e.domNode,this.containerNode,"last"),e._started||e.startup(),this.tabs.ensureTabButton();var i=this.tabs.addTabButton();t?this.tabs.activateTab(i):e.domNode.style.display="none"}else this._adoptElementTabless(e)},_adoptElementTabless:function(e){var t=this._tablessElement.getParent(),s=t.containerNode,n="last";i.forEach(t.getChildren(),(function(e){this._isMatchingElement(e)&&(s=e.domNode,n="after")}),this),o.place(e.domNode,s,n),e._started||e.startup();var a=this.getElements();this.tools.updateUI(a),this.tools.updateSiblings(a)},ensureActiveTab:function(e){if(this.useTabs){var t,s=this.getElements();i.some(s,(function(i,s){if(i===e){try{t=this.tabs.getTabButton(s),this.tabs.activateTab(t)}catch(e){console.error(e)}return!0}}),this)}},getCurrentIndex:function(e){if(this.useTabs)return this._currentIndex;var t=-1,s=this._tablessElement;return i.some(e,(function(e,i){if(e===s)return t=i,!0})),t},getElements:function(){if(this.useTabs)return this.getChildren();var e=this._tablessElement.getParent(),t=[];return i.forEach(e.getChildren(),(function(e){this._isMatchingElement(e)&&t.push(e)}),this),t},getMultiplicityInfo:function(e){e||(e=this.getElements());var t=this.getCurrentIndex(e),i=e.length,s=i-1,o=this.isElementRepeatable(),n={canAdd:!1,canRemove:!1,canMoveUp:!1,canMoveDown:!1,currentIndex:t,elements:e,numElements:i,isRepeatable:o};return o&&("unbounded"===this.maxOccurs||this.maxOccurs>i)&&(n.canAdd=!0),-1!==t&&(t>0&&(n.canMoveUp=!0),t<s&&(n.canMoveDown=!0),i>1&&i>this.minOccurs&&(n.canRemove=!0)),n},initialize:function(e){var t=this.containerNode,i=0===e.minOccurs;this.useTabs?(o.place(this.domNode,e.domNode,"before"),o.place(e.domNode,this.containerNode,"first"),s.add(this.domNode,"tabbed gxeIndent"),i||s.add(this.domNode,"open")):(t=e.containerNode,this._tablessElement=e,o.place(this.domNode,e.containerNode,"before"),o.destroy(this.containerNode),s.add(this.domNode,"tabless"),s.add(e.domNode,"tabless gxeIndent"),s.remove(this.tools.moveElementUpNode,"gxeIconMoveLeft"),s.add(this.tools.moveElementUpNode,"gxeIconMoveUp"),s.remove(this.tools.moveElementDownNode,"gxeIconMoveRight"),s.add(this.tools.moveElementDownNode,"gxeIconMoveDown"),this.containerNode=null),this.tools.initialize(this),this.useTabs?this.tabs.initialize(this):(this.tabs.destroyRecursive(!1),this.tabs=null);var a=e.preferOpen,l=this.labelNode;!e.noToggle&&i?this.initializeLabel(this.label,i,a,l,t):(this.labelNode.innerHTML=this.label,i?s.add(this.labelNode,"gxeOptionalLabel"):s.add(this.labelNode,"gxeMandatoryLabel"),s.add(this.domNode,"open"),n.set(this.labelNode,"display","inline-block"))},_isMatchingElement:function(e){return!(!e||!e._isGxeElement)&&this.target===e.target},isElementRepeatable:function(){return"unbounded"===this.maxOccurs||this.maxOccurs>1},repeatElement:function(e,t){return l.repeatElement(this,e,t)},whenOptionalContentToggled:function(e){this.useTabs||(this._tablessElement._isOptionallyOff=e),e?(s.remove(this.domNode,"open"),s.add(this.domNode,"closed"),this.tools&&(this.tools.domNode.style.visibility="hidden"),this.tabs&&(this.tabs.domNode.style.visibility="hidden")):(s.remove(this.domNode,"closed"),s.add(this.domNode,"open"),this.tools&&(this.tools.domNode.style.visibility="visible"),this.tabs&&(this.tabs.domNode.style.visibility="visible"))}});return a("extend-esri")&&t.setObject("dijit.metadata.base.MultiplicityHeader",b,m),b}));
