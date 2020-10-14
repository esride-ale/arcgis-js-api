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
// See http://js.arcgis.com/4.17/esri/copyright.txt for details.

define(["require","exports","tslib","../../../geometry","../../../core/arrayUtils","../../../core/lang","../../../core/maybe","../../../core/unitUtils","../../../core/libs/gl-matrix-2/mat2d","../../../core/libs/gl-matrix-2/mat2df64","../../../core/libs/gl-matrix-2/quat","../../../core/libs/gl-matrix-2/quatf64","../../../core/libs/gl-matrix-2/vec3","../../../core/libs/gl-matrix-2/vec3f64","../../../geometry/Circle","../../../geometry/geometryEngine","../../../geometry/support/coordsUtils","../../../geometry/support/spatialReferenceUtils"],(function(e,r,t,a,n,o,i,l,s,c,f,u,p,m,y,d,h,v){"use strict";function x(e,r,t){return void 0===t&&(t=null),i.isSome(t)?[e,r,t]:[e,r]}function g(e,r,t){return void 0===t&&(t=null),i.isSome(t)?{x:e,y:r,z:t}:{x:e,y:r}}Object.defineProperty(r,"__esModule",{value:!0}),r.createEllipse=r.createCircle=r.createRectangle=r.createSquare=r.createPolygon=r.createPolyline=r.createMultipoint=r.createPoint=r.createViewAlignedCoordinateSystem=r.SceneViewCoordinateSystem=r.AffineCoordinateSystem=r.SurfaceCoordinateSystem=r.makeSurfacePoint=r.makeMapPoint=void 0,r.makeMapPoint=x,r.makeSurfacePoint=g;var R=function(){function e(e){this.spatialReference=e}return e.prototype.mapToLocalMultiple=function(e){var r=this;return e.map((function(e){return r.mapToLocal(e)}))},Object.defineProperty(e.prototype,"doUnnormalization",{get:function(){return!1},enumerable:!1,configurable:!0}),e}();r.SurfaceCoordinateSystem=R;var M=function(e){function r(r,t,a){void 0===a&&(a=null);var n=e.call(this,t)||this;return n.defaultZ=a,n.transform=c.mat2df64.create(),n.transformInv=c.mat2df64.create(),n.transform=c.mat2df64.clone(r),s.mat2d.invert(n.transformInv,n.transform),n}return t.__extends(r,e),r.prototype.makeMapPoint=function(e,r){return x(e,r,this.defaultZ)},r.prototype.mapToLocal=function(e){return g(this.transform[0]*e[0]+this.transform[2]*e[1]+this.transform[4],this.transform[1]*e[0]+this.transform[3]*e[1]+this.transform[5])},r.prototype.localToMap=function(e){return x(this.transformInv[0]*e.x+this.transformInv[2]*e.y+this.transformInv[4],this.transformInv[1]*e.x+this.transformInv[3]*e.y+this.transformInv[5],this.defaultZ)},r}(R);r.AffineCoordinateSystem=M;var S=function(e){function r(r,t){var a=e.call(this,r.spatialReference)||this;a.view=r,a.defaultZ=null,a.pWS=m.vec3f64.create(),a.tangentFrameUpWS=m.vec3f64.create(),a.tangentFrameRightWS=m.vec3f64.create(),a.tangentFrameForwardWS=m.vec3f64.create(),a.localFrameRightWS=m.vec3f64.create(),a.localFrameUpWS=m.vec3f64.create(),a.worldToLocalTransform=u.quatf64.create(),a.localToWorldTransform=u.quatf64.create(),a.scale=1,a.scale=r.resolution,a.referenceMapPoint=t,a.defaultZ=t.hasZ?t.z:null;var n=r.state.camera.viewRight;a.view.renderCoordsHelper.toRenderCoords(a.referenceMapPoint,a.pWS),a.view.renderCoordsHelper.worldBasisAtPosition(a.pWS,0,a.tangentFrameRightWS),a.view.renderCoordsHelper.worldBasisAtPosition(a.pWS,1,a.tangentFrameUpWS),a.view.renderCoordsHelper.worldBasisAtPosition(a.pWS,2,a.tangentFrameForwardWS);var o=m.vec3f64.create();return p.vec3.scale(o,a.tangentFrameForwardWS,p.vec3.dot(n,a.tangentFrameForwardWS)),p.vec3.subtract(a.localFrameRightWS,n,o),p.vec3.normalize(a.localFrameRightWS,a.localFrameRightWS),p.vec3.cross(a.localFrameUpWS,a.tangentFrameForwardWS,a.localFrameRightWS),f.quat.rotationTo(a.worldToLocalTransform,a.localFrameRightWS,a.tangentFrameRightWS),f.quat.invert(a.localToWorldTransform,a.worldToLocalTransform),a}return t.__extends(r,e),Object.defineProperty(r.prototype,"doUnnormalization",{get:function(){return"global"===this.view.viewingMode},enumerable:!1,configurable:!0}),r.prototype.makeMapPoint=function(e,r){return x(e,r,this.defaultZ)},r.prototype.mapToLocal=function(e){var r=m.vec3f64.create();this.view.renderCoordsHelper.toRenderCoords(new a.Point({x:e[0],y:e[1],spatialReference:this.spatialReference}),r),p.vec3.transformQuat(r,r,this.worldToLocalTransform);var t=this.view.renderCoordsHelper.fromRenderCoords(r,this.view.spatialReference);return g(t.x/this.scale,t.y/this.scale)},r.prototype.localToMap=function(e){var r=m.vec3f64.create();this.view.renderCoordsHelper.toRenderCoords(new a.Point({x:e.x*this.scale,y:e.y*this.scale,spatialReference:this.spatialReference}),r),p.vec3.transformQuat(r,r,this.localToWorldTransform);var t=this.view.renderCoordsHelper.fromRenderCoords(r,this.view.spatialReference);return x(t.x,t.y,this.defaultZ)},r}(R);function w(e,r){var t=new a.Point({x:e[0],y:e[1],spatialReference:r});return e.length>2&&(t.z=e[2]),t}function T(e,r,t,i){void 0===i&&(i=!0);var l=o.clone(e);l.forEach((function(e){var r=e[0],t=e[e.length-1];n.equals(r,t)&&1!==e.length||e.push(e[0])}));var s=new a.Polygon({rings:l,spatialReference:r});return s.rings.forEach((function(e){h.isClockwise(e,!1,!1)||e.reverse()})),t&&h.unnormalizeGeometryOnDatelineCrossing(s),i&&s.isSelfIntersecting&&v.isValid(r)&&(s=d.simplify(s)),s}r.SceneViewCoordinateSystem=S,r.createViewAlignedCoordinateSystem=function(e,r){if("2d"===e.type)return new M(e.state.transform,e.spatialReference,r.length>2?r[2]:null);if("3d"===e.type){var t=r.length>2?new a.Point({x:r[0],y:r[1],z:r[2],spatialReference:e.spatialReference}):new a.Point({x:r[0],y:r[1],spatialReference:e.spatialReference});return new S(e,t)}return null},r.createPoint=w,r.createMultipoint=function(e,r){return new a.Multipoint({points:e,spatialReference:r})},r.createPolyline=function(e,r,t){var n=new a.Polyline({paths:e,spatialReference:r});return t&&h.unnormalizeGeometryOnDatelineCrossing(n),n},r.createPolygon=T,r.createSquare=function(e,r,t){var a=r.mapToLocalMultiple(e),n=[],o={x:a[0].x,y:a[0].y},i=a[1].x,l=a[1].y,s=Math.round(i-o.x),c=Math.round(l-o.y),f=Math.max(Math.abs(s),Math.abs(c));if(t){var u={x:o.x+f,y:o.y+f},p={x:o.x-f,y:o.y-f};n.push(g(u.x,p.y),g(p.x,p.y),g(p.x,u.y),g(u.x,u.y))}else{var m={x:s>0?o.x+f:o.x-f,y:c>0?o.y+f:o.y-f};n.push(g(o.x,o.y),g(m.x,o.y),g(m.x,m.y),g(o.x,m.y))}return T([n.map((function(e){return r.localToMap(e)}))],r.spatialReference,r.doUnnormalization,!0)},r.createRectangle=function(e,r,t){var a=r.mapToLocalMultiple(e);if(1===a.length){var n=48,o=a[0];a=[g(o.x-n,o.y+n),g(o.x+n,o.y-n),g(o.x+n,o.y-n),g(o.x-n,o.y+n)]}var i=[],l={x:a[0].x,y:a[0].y},s={x:a[1].x,y:a[1].y};if(t){var c=Math.round(s.x-l.x),f=Math.round(s.y-l.y);i.push(g(l.x-c,l.y-f),g(s.x,l.y-f),g(s.x,s.y),g(l.x-c,s.y))}else i.push(g(l.x,l.y),g(s.x,l.y),g(s.x,s.y),g(l.x,s.y));return T([i.map((function(e){return r.localToMap(e)}))],r.spatialReference,r.doUnnormalization,!0)},r.createCircle=function(e,r,t,a){var n=r.mapToLocalMultiple(e),o=null,i=null;if(t)o=n[0],i=n[1];else{var s=n[0],c=n[1],f=Math.round(c.x-s.x),u=Math.round(c.y-s.y),p=Math.max(Math.abs(f),Math.abs(u));o=g(f>0?s.x+p/2:s.x-p/2,u>0?s.y+p/2:s.y-p/2),i=g(Math.abs(f)>Math.abs(u)?o.x-p/2:o.x,Math.abs(f)>Math.abs(u)?o.y:o.y-p/2)}var m=r.localToMap(o),x=r.localToMap(i);r.doUnnormalization&&h.unnormalizeVerticesOnDatelineCrossing([[m,x]],r.spatialReference);var R=w(m,r.spatialReference),M=w(x,r.spatialReference),S=l.getMetersPerUnitForSR(r.spatialReference),P=0;if(v.isValid(r.spatialReference))P=S*d.distance(R,M,null);else{f=o.x-i.x,u=o.y-i.y;P=S*Math.sqrt(f*f+u*u)*(a||1)}var C=new y({center:R,radius:P,radiusUnit:"meters",spatialReference:r.spatialReference});return T(C.rings,C.spatialReference,!1)},r.createEllipse=function(e,r,t){for(var a=r.mapToLocalMultiple(e),n=a[0],o=a[1],i=Math.round(o.x-n.x),l=Math.round(o.y-n.y),s=g(t?n.x:n.x+i/2,t?n.y:n.y+l/2),c=t?i:i/2,f=t?l:l/2,u=[],p=2*Math.PI/60,m=0;m<60;m++){var y=Math.cos(m*p),d=Math.sin(m*p),h=g(c*y+s.x,f*d+s.y);u.push(h)}return u.push(u[0]),T([u.map((function(e){return r.localToMap(e)}))],r.spatialReference,r.doUnnormalization,!1)}}));