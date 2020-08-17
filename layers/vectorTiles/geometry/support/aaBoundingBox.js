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

define(["require","exports","../Extent","./aaBoundingRect"],(function(n,t,i,a){function e(n){return void 0===n&&(n=t.ZERO),[n[0],n[1],n[2],n[3],n[4],n[5]]}function r(n){return n[0]>=n[3]?0:n[3]-n[0]}function u(n){return n[1]>=n[4]?0:n[4]-n[1]}function m(n){return n[2]>=n[5]?0:n[5]-n[2]}function o(n,t){return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n}function f(n){return 6===n.length}Object.defineProperty(t,"__esModule",{value:!0}),t.create=e,t.fromValues=function(n,t,i,a,e,r){return[n,t,i,a,e,r]},t.fromExtent=function(n,t){return void 0===t&&(t=e()),t[0]=n.xmin,t[1]=n.ymin,t[2]=n.zmin,t[3]=n.xmax,t[4]=n.ymax,t[5]=n.zmax,t},t.toExtent=function(n,t){var a=isFinite(n[2])||isFinite(n[5]);return new i(a?{xmin:n[0],xmax:n[3],ymin:n[1],ymax:n[4],zmin:n[2],zmax:n[5],spatialReference:t}:{xmin:n[0],xmax:n[3],ymin:n[1],ymax:n[4],spatialReference:t})},t.fromMinMax=function(n,t,i){return void 0===i&&(i=e()),i[0]=n[0],i[1]=n[1],i[2]=n[2],i[3]=t[0],i[4]=t[1],i[5]=t[2],i},t.expandPointInPlace=function(n,t){t[0]<n[0]&&(n[0]=t[0]),t[0]>n[3]&&(n[3]=t[0]),t[1]<n[1]&&(n[1]=t[1]),t[1]>n[4]&&(n[4]=t[1]),t[2]<n[2]&&(n[2]=t[2]),t[2]>n[5]&&(n[5]=t[2])},t.expand=function(n,t,i){return void 0===i&&(i=n),f(t)?(i[0]=Math.min(n[0],t[0]),i[1]=Math.min(n[1],t[1]),i[2]=Math.min(n[2],t[2]),i[3]=Math.max(n[3],t[3]),i[4]=Math.max(n[4],t[4]),i[5]=Math.max(n[5],t[5])):a.is(t)?(i[0]=Math.min(n[0],t[0]),i[1]=Math.min(n[1],t[1]),i[3]=Math.max(n[3],t[2]),i[4]=Math.max(n[4],t[3])):2===t.length?(i[0]=Math.min(n[0],t[0]),i[1]=Math.min(n[1],t[1]),i[3]=Math.max(n[3],t[0]),i[4]=Math.max(n[4],t[1])):3===t.length&&(i[0]=Math.min(n[0],t[0]),i[1]=Math.min(n[1],t[1]),i[2]=Math.min(n[2],t[2]),i[3]=Math.max(n[3],t[0]),i[4]=Math.max(n[4],t[1]),i[5]=Math.max(n[5],t[2])),i},t.expandWithBuffer=function(n,t,i,a,e){void 0===e&&(e=n);for(var r=n[0],u=n[1],m=n[2],o=n[3],f=n[4],h=n[5],M=0;M<a;M++)r=Math.min(r,t[i+3*M]),u=Math.min(u,t[i+3*M+1]),m=Math.min(m,t[i+3*M+2]),o=Math.max(o,t[i+3*M]),f=Math.max(f,t[i+3*M+1]),h=Math.max(h,t[i+3*M+2]);return e[0]=r,e[1]=u,e[2]=m,e[3]=o,e[4]=f,e[5]=h,e},t.expandWithNestedArray=function(n,t,i,a){void 0===a&&(a=n);var e=t.length,r=n[0],u=n[1],m=n[2],o=n[3],f=n[4],h=n[5];if(i)for(var M=0;M<e;M++){var x=t[M];r=Math.min(r,x[0]),u=Math.min(u,x[1]),m=Math.min(m,x[2]),o=Math.max(o,x[0]),f=Math.max(f,x[1]),h=Math.max(h,x[2])}else for(M=0;M<e;M++){x=t[M];r=Math.min(r,x[0]),u=Math.min(u,x[1]),o=Math.max(o,x[0]),f=Math.max(f,x[1])}return a[0]=r,a[1]=u,a[2]=m,a[3]=o,a[4]=f,a[5]=h,a},t.allFinite=function(n){for(var t=0;t<6;t++)if(!isFinite(n[t]))return!1;return!0},t.width=r,t.depth=u,t.height=m,t.diameter=function(n){var t=r(n),i=m(n),a=u(n);return Math.sqrt(t*t+i*i+a*a)},t.center=function(n,t){return void 0===t&&(t=[0,0,0]),t[0]=n[0]+r(n)/2,t[1]=n[1]+u(n)/2,t[2]=n[2]+m(n)/2,t},t.size=function(n,t){return void 0===t&&(t=[0,0,0]),t[0]=r(n),t[1]=u(n),t[2]=m(n),t},t.maximumDimension=function(n){return Math.max(r(n),m(n),u(n))},t.containsPoint=function(n,t){return t[0]>=n[0]&&t[1]>=n[1]&&t[2]>=n[2]&&t[0]<=n[3]&&t[1]<=n[4]&&t[2]<=n[5]},t.containsPointWithMargin=function(n,t,i){return t[0]>=n[0]-i&&t[1]>=n[1]-i&&t[2]>=n[2]-i&&t[0]<=n[3]+i&&t[1]<=n[4]+i&&t[2]<=n[5]+i},t.contains=function(n,t){return t[0]>=n[0]&&t[1]>=n[1]&&t[2]>=n[2]&&t[3]<=n[3]&&t[4]<=n[4]&&t[5]<=n[5]},t.intersects=function(n,t){return Math.max(t[0],n[0])<=Math.min(t[3],n[3])&&Math.max(t[1],n[1])<=Math.min(t[4],n[4])&&Math.max(t[2],n[2])<=Math.min(t[5],n[5])},t.offset=function(n,t,i,a,e){return void 0===e&&(e=n),e[0]=n[0]+t,e[1]=n[1]+i,e[2]=n[2]+a,e[3]=n[3]+t,e[4]=n[4]+i,e[5]=n[5]+a,e},t.setMin=function(n,t,i){return void 0===i&&(i=n),i[0]=t[0],i[1]=t[1],i[2]=t[2],i!==n&&(i[3]=n[3],i[4]=n[4],i[5]=n[5]),i},t.setMax=function(n,t,i){return void 0===i&&(i=n),i[3]=t[0],i[4]=t[1],i[5]=t[2],i!==n&&(i[0]=n[0],i[1]=n[1],i[2]=n[2]),n},t.set=o,t.empty=function(n){return n?o(n,t.NEGATIVE_INFINITY):e(t.NEGATIVE_INFINITY)},t.toRect=function(n,t){return t||(t=a.create()),t[0]=n[0],t[1]=n[1],t[2]=n[3],t[3]=n[4],t},t.fromRect=function(n,t){return n[0]=t[0],n[1]=t[1],n[3]=t[2],n[4]=t[3],n},t.is=f,t.isPoint=function(n){return 0===r(n)&&0===u(n)&&0===m(n)},t.equals=function(n,t,i){if(null==n||null==t)return n===t;if(!f(n)||!f(t))return!1;if(i){for(var a=0;a<n.length;a++)if(!i(n[a],t[a]))return!1}else for(a=0;a<n.length;a++)if(n[a]!==t[a])return!1;return!0},t.POSITIVE_INFINITY=[-1/0,-1/0,-1/0,1/0,1/0,1/0],t.NEGATIVE_INFINITY=[1/0,1/0,1/0,-1/0,-1/0,-1/0],t.ZERO=[0,0,0,0,0,0]}));
