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

define(["./common"],(function(t){var n,r={};return r.create=function(){var n=new t.ARRAY_TYPE(4);return n[0]=0,n[1]=0,n[2]=0,n[3]=0,n},r.clone=function(n){var r=new t.ARRAY_TYPE(4);return r[0]=n[0],r[1]=n[1],r[2]=n[2],r[3]=n[3],r},r.fromValues=function(n,r,a,u){var e=new t.ARRAY_TYPE(4);return e[0]=n,e[1]=r,e[2]=a,e[3]=u,e},r.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t},r.set=function(t,n,r,a,u){return t[0]=n,t[1]=r,t[2]=a,t[3]=u,t},r.add=function(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t[2]=n[2]+r[2],t[3]=n[3]+r[3],t},r.subtract=function(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t[2]=n[2]-r[2],t[3]=n[3]-r[3],t},r.sub=r.subtract,r.multiply=function(t,n,r){return t[0]=n[0]*r[0],t[1]=n[1]*r[1],t[2]=n[2]*r[2],t[3]=n[3]*r[3],t},r.mul=r.multiply,r.divide=function(t,n,r){return t[0]=n[0]/r[0],t[1]=n[1]/r[1],t[2]=n[2]/r[2],t[3]=n[3]/r[3],t},r.div=r.divide,r.ceil=function(t,n){return t[0]=Math.ceil(n[0]),t[1]=Math.ceil(n[1]),t[2]=Math.ceil(n[2]),t[3]=Math.ceil(n[3]),t},r.floor=function(t,n){return t[0]=Math.floor(n[0]),t[1]=Math.floor(n[1]),t[2]=Math.floor(n[2]),t[3]=Math.floor(n[3]),t},r.min=function(t,n,r){return t[0]=Math.min(n[0],r[0]),t[1]=Math.min(n[1],r[1]),t[2]=Math.min(n[2],r[2]),t[3]=Math.min(n[3],r[3]),t},r.max=function(t,n,r){return t[0]=Math.max(n[0],r[0]),t[1]=Math.max(n[1],r[1]),t[2]=Math.max(n[2],r[2]),t[3]=Math.max(n[3],r[3]),t},r.round=function(t,n){return t[0]=Math.round(n[0]),t[1]=Math.round(n[1]),t[2]=Math.round(n[2]),t[3]=Math.round(n[3]),t},r.scale=function(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=n[3]*r,t},r.scaleAndAdd=function(t,n,r,a){return t[0]=n[0]+r[0]*a,t[1]=n[1]+r[1]*a,t[2]=n[2]+r[2]*a,t[3]=n[3]+r[3]*a,t},r.distance=function(t,n){var r=n[0]-t[0],a=n[1]-t[1],u=n[2]-t[2],e=n[3]-t[3];return Math.sqrt(r*r+a*a+u*u+e*e)},r.dist=r.distance,r.squaredDistance=function(t,n){var r=n[0]-t[0],a=n[1]-t[1],u=n[2]-t[2],e=n[3]-t[3];return r*r+a*a+u*u+e*e},r.sqrDist=r.squaredDistance,r.length=function(t){var n=t[0],r=t[1],a=t[2],u=t[3];return Math.sqrt(n*n+r*r+a*a+u*u)},r.len=r.length,r.squaredLength=function(t){var n=t[0],r=t[1],a=t[2],u=t[3];return n*n+r*r+a*a+u*u},r.sqrLen=r.squaredLength,r.negate=function(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t[3]=-n[3],t},r.inverse=function(t,n){return t[0]=1/n[0],t[1]=1/n[1],t[2]=1/n[2],t[3]=1/n[3],t},r.normalize=function(t,n){var r=n[0],a=n[1],u=n[2],e=n[3],i=r*r+a*a+u*u+e*e;return i>0&&(i=1/Math.sqrt(i),t[0]=r*i,t[1]=a*i,t[2]=u*i,t[3]=e*i),t},r.dot=function(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]+t[3]*n[3]},r.lerp=function(t,n,r,a){var u=n[0],e=n[1],i=n[2],o=n[3];return t[0]=u+a*(r[0]-u),t[1]=e+a*(r[1]-e),t[2]=i+a*(r[2]-i),t[3]=o+a*(r[3]-o),t},r.random=function(n,a){return a=a||1,n[0]=t.RANDOM(),n[1]=t.RANDOM(),n[2]=t.RANDOM(),n[3]=t.RANDOM(),r.normalize(n,n),r.scale(n,n,a),n},r.transformMat4=function(t,n,r){var a=n[0],u=n[1],e=n[2],i=n[3];return t[0]=r[0]*a+r[4]*u+r[8]*e+r[12]*i,t[1]=r[1]*a+r[5]*u+r[9]*e+r[13]*i,t[2]=r[2]*a+r[6]*u+r[10]*e+r[14]*i,t[3]=r[3]*a+r[7]*u+r[11]*e+r[15]*i,t},r.transformQuat=function(t,n,r){var a=n[0],u=n[1],e=n[2],i=r[0],o=r[1],c=r[2],h=r[3],M=h*a+o*e-c*u,f=h*u+c*a-i*e,s=h*e+i*u-o*a,l=-i*a-o*u-c*e;return t[0]=M*h+l*-i+f*-c-s*-o,t[1]=f*h+l*-o+s*-i-M*-c,t[2]=s*h+l*-c+M*-o-f*-i,t[3]=n[3],t},r.forEach=(n=r.create(),function(t,r,a,u,e,i){var o,c;for(r||(r=4),a||(a=0),c=u?Math.min(u*r+a,t.length):t.length,o=a;o<c;o+=r)n[0]=t[o],n[1]=t[o+1],n[2]=t[o+2],n[3]=t[o+3],e(n,n,i),t[o]=n[0],t[o+1]=n[1],t[o+2]=n[2],t[o+3]=n[3];return t}),r.str=function(t){return"vec4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"},r.exactEquals=function(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]},r.equals=function(n,r){var a=n[0],u=n[1],e=n[2],i=n[3],o=r[0],c=r[1],h=r[2],M=r[3];return Math.abs(a-o)<=t.EPSILON*Math.max(1,Math.abs(a),Math.abs(o))&&Math.abs(u-c)<=t.EPSILON*Math.max(1,Math.abs(u),Math.abs(c))&&Math.abs(e-h)<=t.EPSILON*Math.max(1,Math.abs(e),Math.abs(h))&&Math.abs(i-M)<=t.EPSILON*Math.max(1,Math.abs(i),Math.abs(M))},r}));
