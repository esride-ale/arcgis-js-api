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

define(["./common"],(function(a){var t={scalar:{},SIMD:{},create:function(){var t=new a.ARRAY_TYPE(16);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},clone:function(t){var l=new a.ARRAY_TYPE(16);return l[0]=t[0],l[1]=t[1],l[2]=t[2],l[3]=t[3],l[4]=t[4],l[5]=t[5],l[6]=t[6],l[7]=t[7],l[8]=t[8],l[9]=t[9],l[10]=t[10],l[11]=t[11],l[12]=t[12],l[13]=t[13],l[14]=t[14],l[15]=t[15],l},copy:function(a,t){return a[0]=t[0],a[1]=t[1],a[2]=t[2],a[3]=t[3],a[4]=t[4],a[5]=t[5],a[6]=t[6],a[7]=t[7],a[8]=t[8],a[9]=t[9],a[10]=t[10],a[11]=t[11],a[12]=t[12],a[13]=t[13],a[14]=t[14],a[15]=t[15],a},fromValues:function(t,l,o,M,S,I,D,x,F,s,u,r,e,n,i,h){var m=new a.ARRAY_TYPE(16);return m[0]=t,m[1]=l,m[2]=o,m[3]=M,m[4]=S,m[5]=I,m[6]=D,m[7]=x,m[8]=F,m[9]=s,m[10]=u,m[11]=r,m[12]=e,m[13]=n,m[14]=i,m[15]=h,m},set:function(a,t,l,o,M,S,I,D,x,F,s,u,r,e,n,i,h){return a[0]=t,a[1]=l,a[2]=o,a[3]=M,a[4]=S,a[5]=I,a[6]=D,a[7]=x,a[8]=F,a[9]=s,a[10]=u,a[11]=r,a[12]=e,a[13]=n,a[14]=i,a[15]=h,a},identity:function(a){return a[0]=1,a[1]=0,a[2]=0,a[3]=0,a[4]=0,a[5]=1,a[6]=0,a[7]=0,a[8]=0,a[9]=0,a[10]=1,a[11]=0,a[12]=0,a[13]=0,a[14]=0,a[15]=1,a}};return t.scalar.transpose=function(a,t){if(a===t){var l=t[1],o=t[2],M=t[3],S=t[6],I=t[7],D=t[11];a[1]=t[4],a[2]=t[8],a[3]=t[12],a[4]=l,a[6]=t[9],a[7]=t[13],a[8]=o,a[9]=S,a[11]=t[14],a[12]=M,a[13]=I,a[14]=D}else a[0]=t[0],a[1]=t[4],a[2]=t[8],a[3]=t[12],a[4]=t[1],a[5]=t[5],a[6]=t[9],a[7]=t[13],a[8]=t[2],a[9]=t[6],a[10]=t[10],a[11]=t[14],a[12]=t[3],a[13]=t[7],a[14]=t[11],a[15]=t[15];return a},t.SIMD.transpose=function(a,t){var l,o,M,S,I,D,x,F,s,u;return l=SIMD.Float32x4.load(t,0),o=SIMD.Float32x4.load(t,4),M=SIMD.Float32x4.load(t,8),S=SIMD.Float32x4.load(t,12),I=SIMD.Float32x4.shuffle(l,o,0,1,4,5),D=SIMD.Float32x4.shuffle(M,S,0,1,4,5),x=SIMD.Float32x4.shuffle(I,D,0,2,4,6),F=SIMD.Float32x4.shuffle(I,D,1,3,5,7),SIMD.Float32x4.store(a,0,x),SIMD.Float32x4.store(a,4,F),I=SIMD.Float32x4.shuffle(l,o,2,3,6,7),D=SIMD.Float32x4.shuffle(M,S,2,3,6,7),s=SIMD.Float32x4.shuffle(I,D,0,2,4,6),u=SIMD.Float32x4.shuffle(I,D,1,3,5,7),SIMD.Float32x4.store(a,8,s),SIMD.Float32x4.store(a,12,u),a},t.transpose=a.USE_SIMD?t.SIMD.transpose:t.scalar.transpose,t.scalar.invert=function(a,t){var l=t[0],o=t[1],M=t[2],S=t[3],I=t[4],D=t[5],x=t[6],F=t[7],s=t[8],u=t[9],r=t[10],e=t[11],n=t[12],i=t[13],h=t[14],m=t[15],d=l*D-o*I,z=l*x-M*I,f=l*F-S*I,c=o*x-M*D,b=o*F-S*D,w=M*F-S*x,v=s*i-u*n,p=s*h-r*n,E=s*m-e*n,P=u*h-r*i,O=u*m-e*i,L=r*m-e*h,N=d*L-z*O+f*P+c*E-b*p+w*v;return N?(N=1/N,a[0]=(D*L-x*O+F*P)*N,a[1]=(M*O-o*L-S*P)*N,a[2]=(i*w-h*b+m*c)*N,a[3]=(r*b-u*w-e*c)*N,a[4]=(x*E-I*L-F*p)*N,a[5]=(l*L-M*E+S*p)*N,a[6]=(h*f-n*w-m*z)*N,a[7]=(s*w-r*f+e*z)*N,a[8]=(I*O-D*E+F*v)*N,a[9]=(o*E-l*O-S*v)*N,a[10]=(n*b-i*f+m*d)*N,a[11]=(u*f-s*b-e*d)*N,a[12]=(D*p-I*P-x*v)*N,a[13]=(l*P-o*p+M*v)*N,a[14]=(i*z-n*c-h*d)*N,a[15]=(s*c-u*z+r*d)*N,a):null},t.SIMD.invert=function(a,t){var l,o,M,S,I,D,x,F,s,u,r=SIMD.Float32x4.load(t,0),e=SIMD.Float32x4.load(t,4),n=SIMD.Float32x4.load(t,8),i=SIMD.Float32x4.load(t,12);return I=SIMD.Float32x4.shuffle(r,e,0,1,4,5),o=SIMD.Float32x4.shuffle(n,i,0,1,4,5),l=SIMD.Float32x4.shuffle(I,o,0,2,4,6),o=SIMD.Float32x4.shuffle(o,I,1,3,5,7),I=SIMD.Float32x4.shuffle(r,e,2,3,6,7),S=SIMD.Float32x4.shuffle(n,i,2,3,6,7),M=SIMD.Float32x4.shuffle(I,S,0,2,4,6),S=SIMD.Float32x4.shuffle(S,I,1,3,5,7),I=SIMD.Float32x4.mul(M,S),I=SIMD.Float32x4.swizzle(I,1,0,3,2),D=SIMD.Float32x4.mul(o,I),x=SIMD.Float32x4.mul(l,I),I=SIMD.Float32x4.swizzle(I,2,3,0,1),D=SIMD.Float32x4.sub(SIMD.Float32x4.mul(o,I),D),x=SIMD.Float32x4.sub(SIMD.Float32x4.mul(l,I),x),x=SIMD.Float32x4.swizzle(x,2,3,0,1),I=SIMD.Float32x4.mul(o,M),I=SIMD.Float32x4.swizzle(I,1,0,3,2),D=SIMD.Float32x4.add(SIMD.Float32x4.mul(S,I),D),s=SIMD.Float32x4.mul(l,I),I=SIMD.Float32x4.swizzle(I,2,3,0,1),D=SIMD.Float32x4.sub(D,SIMD.Float32x4.mul(S,I)),s=SIMD.Float32x4.sub(SIMD.Float32x4.mul(l,I),s),s=SIMD.Float32x4.swizzle(s,2,3,0,1),I=SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(o,2,3,0,1),S),I=SIMD.Float32x4.swizzle(I,1,0,3,2),M=SIMD.Float32x4.swizzle(M,2,3,0,1),D=SIMD.Float32x4.add(SIMD.Float32x4.mul(M,I),D),F=SIMD.Float32x4.mul(l,I),I=SIMD.Float32x4.swizzle(I,2,3,0,1),D=SIMD.Float32x4.sub(D,SIMD.Float32x4.mul(M,I)),F=SIMD.Float32x4.sub(SIMD.Float32x4.mul(l,I),F),F=SIMD.Float32x4.swizzle(F,2,3,0,1),I=SIMD.Float32x4.mul(l,o),I=SIMD.Float32x4.swizzle(I,1,0,3,2),F=SIMD.Float32x4.add(SIMD.Float32x4.mul(S,I),F),s=SIMD.Float32x4.sub(SIMD.Float32x4.mul(M,I),s),I=SIMD.Float32x4.swizzle(I,2,3,0,1),F=SIMD.Float32x4.sub(SIMD.Float32x4.mul(S,I),F),s=SIMD.Float32x4.sub(s,SIMD.Float32x4.mul(M,I)),I=SIMD.Float32x4.mul(l,S),I=SIMD.Float32x4.swizzle(I,1,0,3,2),x=SIMD.Float32x4.sub(x,SIMD.Float32x4.mul(M,I)),F=SIMD.Float32x4.add(SIMD.Float32x4.mul(o,I),F),I=SIMD.Float32x4.swizzle(I,2,3,0,1),x=SIMD.Float32x4.add(SIMD.Float32x4.mul(M,I),x),F=SIMD.Float32x4.sub(F,SIMD.Float32x4.mul(o,I)),I=SIMD.Float32x4.mul(l,M),I=SIMD.Float32x4.swizzle(I,1,0,3,2),x=SIMD.Float32x4.add(SIMD.Float32x4.mul(S,I),x),s=SIMD.Float32x4.sub(s,SIMD.Float32x4.mul(o,I)),I=SIMD.Float32x4.swizzle(I,2,3,0,1),x=SIMD.Float32x4.sub(x,SIMD.Float32x4.mul(S,I)),s=SIMD.Float32x4.add(SIMD.Float32x4.mul(o,I),s),u=SIMD.Float32x4.mul(l,D),u=SIMD.Float32x4.add(SIMD.Float32x4.swizzle(u,2,3,0,1),u),u=SIMD.Float32x4.add(SIMD.Float32x4.swizzle(u,1,0,3,2),u),I=SIMD.Float32x4.reciprocalApproximation(u),u=SIMD.Float32x4.sub(SIMD.Float32x4.add(I,I),SIMD.Float32x4.mul(u,SIMD.Float32x4.mul(I,I))),(u=SIMD.Float32x4.swizzle(u,0,0,0,0))?(SIMD.Float32x4.store(a,0,SIMD.Float32x4.mul(u,D)),SIMD.Float32x4.store(a,4,SIMD.Float32x4.mul(u,x)),SIMD.Float32x4.store(a,8,SIMD.Float32x4.mul(u,F)),SIMD.Float32x4.store(a,12,SIMD.Float32x4.mul(u,s)),a):null},t.invert=a.USE_SIMD?t.SIMD.invert:t.scalar.invert,t.scalar.adjoint=function(a,t){var l=t[0],o=t[1],M=t[2],S=t[3],I=t[4],D=t[5],x=t[6],F=t[7],s=t[8],u=t[9],r=t[10],e=t[11],n=t[12],i=t[13],h=t[14],m=t[15];return a[0]=D*(r*m-e*h)-u*(x*m-F*h)+i*(x*e-F*r),a[1]=-(o*(r*m-e*h)-u*(M*m-S*h)+i*(M*e-S*r)),a[2]=o*(x*m-F*h)-D*(M*m-S*h)+i*(M*F-S*x),a[3]=-(o*(x*e-F*r)-D*(M*e-S*r)+u*(M*F-S*x)),a[4]=-(I*(r*m-e*h)-s*(x*m-F*h)+n*(x*e-F*r)),a[5]=l*(r*m-e*h)-s*(M*m-S*h)+n*(M*e-S*r),a[6]=-(l*(x*m-F*h)-I*(M*m-S*h)+n*(M*F-S*x)),a[7]=l*(x*e-F*r)-I*(M*e-S*r)+s*(M*F-S*x),a[8]=I*(u*m-e*i)-s*(D*m-F*i)+n*(D*e-F*u),a[9]=-(l*(u*m-e*i)-s*(o*m-S*i)+n*(o*e-S*u)),a[10]=l*(D*m-F*i)-I*(o*m-S*i)+n*(o*F-S*D),a[11]=-(l*(D*e-F*u)-I*(o*e-S*u)+s*(o*F-S*D)),a[12]=-(I*(u*h-r*i)-s*(D*h-x*i)+n*(D*r-x*u)),a[13]=l*(u*h-r*i)-s*(o*h-M*i)+n*(o*r-M*u),a[14]=-(l*(D*h-x*i)-I*(o*h-M*i)+n*(o*x-M*D)),a[15]=l*(D*r-x*u)-I*(o*r-M*u)+s*(o*x-M*D),a},t.SIMD.adjoint=function(a,t){var l,o,M,S,I,D,x,F,s,u=SIMD.Float32x4.load(t,0),r=SIMD.Float32x4.load(t,4),e=SIMD.Float32x4.load(t,8),n=SIMD.Float32x4.load(t,12);return I=SIMD.Float32x4.shuffle(u,r,0,1,4,5),o=SIMD.Float32x4.shuffle(e,n,0,1,4,5),l=SIMD.Float32x4.shuffle(I,o,0,2,4,6),o=SIMD.Float32x4.shuffle(o,I,1,3,5,7),I=SIMD.Float32x4.shuffle(u,r,2,3,6,7),S=SIMD.Float32x4.shuffle(e,n,2,3,6,7),M=SIMD.Float32x4.shuffle(I,S,0,2,4,6),S=SIMD.Float32x4.shuffle(S,I,1,3,5,7),I=SIMD.Float32x4.mul(M,S),I=SIMD.Float32x4.swizzle(I,1,0,3,2),D=SIMD.Float32x4.mul(o,I),x=SIMD.Float32x4.mul(l,I),I=SIMD.Float32x4.swizzle(I,2,3,0,1),D=SIMD.Float32x4.sub(SIMD.Float32x4.mul(o,I),D),x=SIMD.Float32x4.sub(SIMD.Float32x4.mul(l,I),x),x=SIMD.Float32x4.swizzle(x,2,3,0,1),I=SIMD.Float32x4.mul(o,M),I=SIMD.Float32x4.swizzle(I,1,0,3,2),D=SIMD.Float32x4.add(SIMD.Float32x4.mul(S,I),D),s=SIMD.Float32x4.mul(l,I),I=SIMD.Float32x4.swizzle(I,2,3,0,1),D=SIMD.Float32x4.sub(D,SIMD.Float32x4.mul(S,I)),s=SIMD.Float32x4.sub(SIMD.Float32x4.mul(l,I),s),s=SIMD.Float32x4.swizzle(s,2,3,0,1),I=SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(o,2,3,0,1),S),I=SIMD.Float32x4.swizzle(I,1,0,3,2),M=SIMD.Float32x4.swizzle(M,2,3,0,1),D=SIMD.Float32x4.add(SIMD.Float32x4.mul(M,I),D),F=SIMD.Float32x4.mul(l,I),I=SIMD.Float32x4.swizzle(I,2,3,0,1),D=SIMD.Float32x4.sub(D,SIMD.Float32x4.mul(M,I)),F=SIMD.Float32x4.sub(SIMD.Float32x4.mul(l,I),F),F=SIMD.Float32x4.swizzle(F,2,3,0,1),I=SIMD.Float32x4.mul(l,o),I=SIMD.Float32x4.swizzle(I,1,0,3,2),F=SIMD.Float32x4.add(SIMD.Float32x4.mul(S,I),F),s=SIMD.Float32x4.sub(SIMD.Float32x4.mul(M,I),s),I=SIMD.Float32x4.swizzle(I,2,3,0,1),F=SIMD.Float32x4.sub(SIMD.Float32x4.mul(S,I),F),s=SIMD.Float32x4.sub(s,SIMD.Float32x4.mul(M,I)),I=SIMD.Float32x4.mul(l,S),I=SIMD.Float32x4.swizzle(I,1,0,3,2),x=SIMD.Float32x4.sub(x,SIMD.Float32x4.mul(M,I)),F=SIMD.Float32x4.add(SIMD.Float32x4.mul(o,I),F),I=SIMD.Float32x4.swizzle(I,2,3,0,1),x=SIMD.Float32x4.add(SIMD.Float32x4.mul(M,I),x),F=SIMD.Float32x4.sub(F,SIMD.Float32x4.mul(o,I)),I=SIMD.Float32x4.mul(l,M),I=SIMD.Float32x4.swizzle(I,1,0,3,2),x=SIMD.Float32x4.add(SIMD.Float32x4.mul(S,I),x),s=SIMD.Float32x4.sub(s,SIMD.Float32x4.mul(o,I)),I=SIMD.Float32x4.swizzle(I,2,3,0,1),x=SIMD.Float32x4.sub(x,SIMD.Float32x4.mul(S,I)),s=SIMD.Float32x4.add(SIMD.Float32x4.mul(o,I),s),SIMD.Float32x4.store(a,0,D),SIMD.Float32x4.store(a,4,x),SIMD.Float32x4.store(a,8,F),SIMD.Float32x4.store(a,12,s),a},t.adjoint=a.USE_SIMD?t.SIMD.adjoint:t.scalar.adjoint,t.determinant=function(a){var t=a[0],l=a[1],o=a[2],M=a[3],S=a[4],I=a[5],D=a[6],x=a[7],F=a[8],s=a[9],u=a[10],r=a[11],e=a[12],n=a[13],i=a[14],h=a[15];return(t*I-l*S)*(u*h-r*i)-(t*D-o*S)*(s*h-r*n)+(t*x-M*S)*(s*i-u*n)+(l*D-o*I)*(F*h-r*e)-(l*x-M*I)*(F*i-u*e)+(o*x-M*D)*(F*n-s*e)},t.SIMD.multiply=function(a,t,l){var o=SIMD.Float32x4.load(t,0),M=SIMD.Float32x4.load(t,4),S=SIMD.Float32x4.load(t,8),I=SIMD.Float32x4.load(t,12),D=SIMD.Float32x4.load(l,0),x=SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(D,0,0,0,0),o),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(D,1,1,1,1),M),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(D,2,2,2,2),S),SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(D,3,3,3,3),I))));SIMD.Float32x4.store(a,0,x);var F=SIMD.Float32x4.load(l,4),s=SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(F,0,0,0,0),o),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(F,1,1,1,1),M),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(F,2,2,2,2),S),SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(F,3,3,3,3),I))));SIMD.Float32x4.store(a,4,s);var u=SIMD.Float32x4.load(l,8),r=SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(u,0,0,0,0),o),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(u,1,1,1,1),M),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(u,2,2,2,2),S),SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(u,3,3,3,3),I))));SIMD.Float32x4.store(a,8,r);var e=SIMD.Float32x4.load(l,12),n=SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e,0,0,0,0),o),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e,1,1,1,1),M),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e,2,2,2,2),S),SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e,3,3,3,3),I))));return SIMD.Float32x4.store(a,12,n),a},t.scalar.multiply=function(a,t,l){var o=t[0],M=t[1],S=t[2],I=t[3],D=t[4],x=t[5],F=t[6],s=t[7],u=t[8],r=t[9],e=t[10],n=t[11],i=t[12],h=t[13],m=t[14],d=t[15],z=l[0],f=l[1],c=l[2],b=l[3];return a[0]=z*o+f*D+c*u+b*i,a[1]=z*M+f*x+c*r+b*h,a[2]=z*S+f*F+c*e+b*m,a[3]=z*I+f*s+c*n+b*d,z=l[4],f=l[5],c=l[6],b=l[7],a[4]=z*o+f*D+c*u+b*i,a[5]=z*M+f*x+c*r+b*h,a[6]=z*S+f*F+c*e+b*m,a[7]=z*I+f*s+c*n+b*d,z=l[8],f=l[9],c=l[10],b=l[11],a[8]=z*o+f*D+c*u+b*i,a[9]=z*M+f*x+c*r+b*h,a[10]=z*S+f*F+c*e+b*m,a[11]=z*I+f*s+c*n+b*d,z=l[12],f=l[13],c=l[14],b=l[15],a[12]=z*o+f*D+c*u+b*i,a[13]=z*M+f*x+c*r+b*h,a[14]=z*S+f*F+c*e+b*m,a[15]=z*I+f*s+c*n+b*d,a},t.multiply=a.USE_SIMD?t.SIMD.multiply:t.scalar.multiply,t.mul=t.multiply,t.scalar.translate=function(a,t,l){var o,M,S,I,D,x,F,s,u,r,e,n,i=l[0],h=l[1],m=l[2];return t===a?(a[12]=t[0]*i+t[4]*h+t[8]*m+t[12],a[13]=t[1]*i+t[5]*h+t[9]*m+t[13],a[14]=t[2]*i+t[6]*h+t[10]*m+t[14],a[15]=t[3]*i+t[7]*h+t[11]*m+t[15]):(o=t[0],M=t[1],S=t[2],I=t[3],D=t[4],x=t[5],F=t[6],s=t[7],u=t[8],r=t[9],e=t[10],n=t[11],a[0]=o,a[1]=M,a[2]=S,a[3]=I,a[4]=D,a[5]=x,a[6]=F,a[7]=s,a[8]=u,a[9]=r,a[10]=e,a[11]=n,a[12]=o*i+D*h+u*m+t[12],a[13]=M*i+x*h+r*m+t[13],a[14]=S*i+F*h+e*m+t[14],a[15]=I*i+s*h+n*m+t[15]),a},t.SIMD.translate=function(a,t,l){var o=SIMD.Float32x4.load(t,0),M=SIMD.Float32x4.load(t,4),S=SIMD.Float32x4.load(t,8),I=SIMD.Float32x4.load(t,12),D=SIMD.Float32x4(l[0],l[1],l[2],0);t!==a&&(a[0]=t[0],a[1]=t[1],a[2]=t[2],a[3]=t[3],a[4]=t[4],a[5]=t[5],a[6]=t[6],a[7]=t[7],a[8]=t[8],a[9]=t[9],a[10]=t[10],a[11]=t[11]),o=SIMD.Float32x4.mul(o,SIMD.Float32x4.swizzle(D,0,0,0,0)),M=SIMD.Float32x4.mul(M,SIMD.Float32x4.swizzle(D,1,1,1,1)),S=SIMD.Float32x4.mul(S,SIMD.Float32x4.swizzle(D,2,2,2,2));var x=SIMD.Float32x4.add(o,SIMD.Float32x4.add(M,SIMD.Float32x4.add(S,I)));return SIMD.Float32x4.store(a,12,x),a},t.translate=a.USE_SIMD?t.SIMD.translate:t.scalar.translate,t.scalar.scale=function(a,t,l){var o=l[0],M=l[1],S=l[2];return a[0]=t[0]*o,a[1]=t[1]*o,a[2]=t[2]*o,a[3]=t[3]*o,a[4]=t[4]*M,a[5]=t[5]*M,a[6]=t[6]*M,a[7]=t[7]*M,a[8]=t[8]*S,a[9]=t[9]*S,a[10]=t[10]*S,a[11]=t[11]*S,a[12]=t[12],a[13]=t[13],a[14]=t[14],a[15]=t[15],a},t.SIMD.scale=function(a,t,l){var o,M,S,I=SIMD.Float32x4(l[0],l[1],l[2],0);return o=SIMD.Float32x4.load(t,0),SIMD.Float32x4.store(a,0,SIMD.Float32x4.mul(o,SIMD.Float32x4.swizzle(I,0,0,0,0))),M=SIMD.Float32x4.load(t,4),SIMD.Float32x4.store(a,4,SIMD.Float32x4.mul(M,SIMD.Float32x4.swizzle(I,1,1,1,1))),S=SIMD.Float32x4.load(t,8),SIMD.Float32x4.store(a,8,SIMD.Float32x4.mul(S,SIMD.Float32x4.swizzle(I,2,2,2,2))),a[12]=t[12],a[13]=t[13],a[14]=t[14],a[15]=t[15],a},t.scale=a.USE_SIMD?t.SIMD.scale:t.scalar.scale,t.rotate=function(t,l,o,M){var S,I,D,x,F,s,u,r,e,n,i,h,m,d,z,f,c,b,w,v,p,E,P,O,L=M[0],N=M[1],R=M[2],q=Math.sqrt(L*L+N*N+R*R);return Math.abs(q)<a.EPSILON?null:(L*=q=1/q,N*=q,R*=q,S=Math.sin(o),D=1-(I=Math.cos(o)),x=l[0],F=l[1],s=l[2],u=l[3],r=l[4],e=l[5],n=l[6],i=l[7],h=l[8],m=l[9],d=l[10],z=l[11],f=L*L*D+I,c=N*L*D+R*S,b=R*L*D-N*S,w=L*N*D-R*S,v=N*N*D+I,p=R*N*D+L*S,E=L*R*D+N*S,P=N*R*D-L*S,O=R*R*D+I,t[0]=x*f+r*c+h*b,t[1]=F*f+e*c+m*b,t[2]=s*f+n*c+d*b,t[3]=u*f+i*c+z*b,t[4]=x*w+r*v+h*p,t[5]=F*w+e*v+m*p,t[6]=s*w+n*v+d*p,t[7]=u*w+i*v+z*p,t[8]=x*E+r*P+h*O,t[9]=F*E+e*P+m*O,t[10]=s*E+n*P+d*O,t[11]=u*E+i*P+z*O,l!==t&&(t[12]=l[12],t[13]=l[13],t[14]=l[14],t[15]=l[15]),t)},t.scalar.rotateX=function(a,t,l){var o=Math.sin(l),M=Math.cos(l),S=t[4],I=t[5],D=t[6],x=t[7],F=t[8],s=t[9],u=t[10],r=t[11];return t!==a&&(a[0]=t[0],a[1]=t[1],a[2]=t[2],a[3]=t[3],a[12]=t[12],a[13]=t[13],a[14]=t[14],a[15]=t[15]),a[4]=S*M+F*o,a[5]=I*M+s*o,a[6]=D*M+u*o,a[7]=x*M+r*o,a[8]=F*M-S*o,a[9]=s*M-I*o,a[10]=u*M-D*o,a[11]=r*M-x*o,a},t.SIMD.rotateX=function(a,t,l){var o=SIMD.Float32x4.splat(Math.sin(l)),M=SIMD.Float32x4.splat(Math.cos(l));t!==a&&(a[0]=t[0],a[1]=t[1],a[2]=t[2],a[3]=t[3],a[12]=t[12],a[13]=t[13],a[14]=t[14],a[15]=t[15]);var S=SIMD.Float32x4.load(t,4),I=SIMD.Float32x4.load(t,8);return SIMD.Float32x4.store(a,4,SIMD.Float32x4.add(SIMD.Float32x4.mul(S,M),SIMD.Float32x4.mul(I,o))),SIMD.Float32x4.store(a,8,SIMD.Float32x4.sub(SIMD.Float32x4.mul(I,M),SIMD.Float32x4.mul(S,o))),a},t.rotateX=a.USE_SIMD?t.SIMD.rotateX:t.scalar.rotateX,t.scalar.rotateY=function(a,t,l){var o=Math.sin(l),M=Math.cos(l),S=t[0],I=t[1],D=t[2],x=t[3],F=t[8],s=t[9],u=t[10],r=t[11];return t!==a&&(a[4]=t[4],a[5]=t[5],a[6]=t[6],a[7]=t[7],a[12]=t[12],a[13]=t[13],a[14]=t[14],a[15]=t[15]),a[0]=S*M-F*o,a[1]=I*M-s*o,a[2]=D*M-u*o,a[3]=x*M-r*o,a[8]=S*o+F*M,a[9]=I*o+s*M,a[10]=D*o+u*M,a[11]=x*o+r*M,a},t.SIMD.rotateY=function(a,t,l){var o=SIMD.Float32x4.splat(Math.sin(l)),M=SIMD.Float32x4.splat(Math.cos(l));t!==a&&(a[4]=t[4],a[5]=t[5],a[6]=t[6],a[7]=t[7],a[12]=t[12],a[13]=t[13],a[14]=t[14],a[15]=t[15]);var S=SIMD.Float32x4.load(t,0),I=SIMD.Float32x4.load(t,8);return SIMD.Float32x4.store(a,0,SIMD.Float32x4.sub(SIMD.Float32x4.mul(S,M),SIMD.Float32x4.mul(I,o))),SIMD.Float32x4.store(a,8,SIMD.Float32x4.add(SIMD.Float32x4.mul(S,o),SIMD.Float32x4.mul(I,M))),a},t.rotateY=a.USE_SIMD?t.SIMD.rotateY:t.scalar.rotateY,t.scalar.rotateZ=function(a,t,l){var o=Math.sin(l),M=Math.cos(l),S=t[0],I=t[1],D=t[2],x=t[3],F=t[4],s=t[5],u=t[6],r=t[7];return t!==a&&(a[8]=t[8],a[9]=t[9],a[10]=t[10],a[11]=t[11],a[12]=t[12],a[13]=t[13],a[14]=t[14],a[15]=t[15]),a[0]=S*M+F*o,a[1]=I*M+s*o,a[2]=D*M+u*o,a[3]=x*M+r*o,a[4]=F*M-S*o,a[5]=s*M-I*o,a[6]=u*M-D*o,a[7]=r*M-x*o,a},t.SIMD.rotateZ=function(a,t,l){var o=SIMD.Float32x4.splat(Math.sin(l)),M=SIMD.Float32x4.splat(Math.cos(l));t!==a&&(a[8]=t[8],a[9]=t[9],a[10]=t[10],a[11]=t[11],a[12]=t[12],a[13]=t[13],a[14]=t[14],a[15]=t[15]);var S=SIMD.Float32x4.load(t,0),I=SIMD.Float32x4.load(t,4);return SIMD.Float32x4.store(a,0,SIMD.Float32x4.add(SIMD.Float32x4.mul(S,M),SIMD.Float32x4.mul(I,o))),SIMD.Float32x4.store(a,4,SIMD.Float32x4.sub(SIMD.Float32x4.mul(I,M),SIMD.Float32x4.mul(S,o))),a},t.rotateZ=a.USE_SIMD?t.SIMD.rotateZ:t.scalar.rotateZ,t.fromTranslation=function(a,t){return a[0]=1,a[1]=0,a[2]=0,a[3]=0,a[4]=0,a[5]=1,a[6]=0,a[7]=0,a[8]=0,a[9]=0,a[10]=1,a[11]=0,a[12]=t[0],a[13]=t[1],a[14]=t[2],a[15]=1,a},t.fromScaling=function(a,t){return a[0]=t[0],a[1]=0,a[2]=0,a[3]=0,a[4]=0,a[5]=t[1],a[6]=0,a[7]=0,a[8]=0,a[9]=0,a[10]=t[2],a[11]=0,a[12]=0,a[13]=0,a[14]=0,a[15]=1,a},t.fromRotation=function(t,l,o){var M,S,I,D=o[0],x=o[1],F=o[2],s=Math.sqrt(D*D+x*x+F*F);return Math.abs(s)<a.EPSILON?null:(D*=s=1/s,x*=s,F*=s,M=Math.sin(l),I=1-(S=Math.cos(l)),t[0]=D*D*I+S,t[1]=x*D*I+F*M,t[2]=F*D*I-x*M,t[3]=0,t[4]=D*x*I-F*M,t[5]=x*x*I+S,t[6]=F*x*I+D*M,t[7]=0,t[8]=D*F*I+x*M,t[9]=x*F*I-D*M,t[10]=F*F*I+S,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t)},t.fromXRotation=function(a,t){var l=Math.sin(t),o=Math.cos(t);return a[0]=1,a[1]=0,a[2]=0,a[3]=0,a[4]=0,a[5]=o,a[6]=l,a[7]=0,a[8]=0,a[9]=-l,a[10]=o,a[11]=0,a[12]=0,a[13]=0,a[14]=0,a[15]=1,a},t.fromYRotation=function(a,t){var l=Math.sin(t),o=Math.cos(t);return a[0]=o,a[1]=0,a[2]=-l,a[3]=0,a[4]=0,a[5]=1,a[6]=0,a[7]=0,a[8]=l,a[9]=0,a[10]=o,a[11]=0,a[12]=0,a[13]=0,a[14]=0,a[15]=1,a},t.fromZRotation=function(a,t){var l=Math.sin(t),o=Math.cos(t);return a[0]=o,a[1]=l,a[2]=0,a[3]=0,a[4]=-l,a[5]=o,a[6]=0,a[7]=0,a[8]=0,a[9]=0,a[10]=1,a[11]=0,a[12]=0,a[13]=0,a[14]=0,a[15]=1,a},t.fromRotationTranslation=function(a,t,l){var o=t[0],M=t[1],S=t[2],I=t[3],D=o+o,x=M+M,F=S+S,s=o*D,u=o*x,r=o*F,e=M*x,n=M*F,i=S*F,h=I*D,m=I*x,d=I*F;return a[0]=1-(e+i),a[1]=u+d,a[2]=r-m,a[3]=0,a[4]=u-d,a[5]=1-(s+i),a[6]=n+h,a[7]=0,a[8]=r+m,a[9]=n-h,a[10]=1-(s+e),a[11]=0,a[12]=l[0],a[13]=l[1],a[14]=l[2],a[15]=1,a},t.getTranslation=function(a,t){return a[0]=t[12],a[1]=t[13],a[2]=t[14],a},t.getRotation=function(a,t){var l=t[0]+t[5]+t[10],o=0;return l>0?(o=2*Math.sqrt(l+1),a[3]=.25*o,a[0]=(t[6]-t[9])/o,a[1]=(t[8]-t[2])/o,a[2]=(t[1]-t[4])/o):t[0]>t[5]&t[0]>t[10]?(o=2*Math.sqrt(1+t[0]-t[5]-t[10]),a[3]=(t[6]-t[9])/o,a[0]=.25*o,a[1]=(t[1]+t[4])/o,a[2]=(t[8]+t[2])/o):t[5]>t[10]?(o=2*Math.sqrt(1+t[5]-t[0]-t[10]),a[3]=(t[8]-t[2])/o,a[0]=(t[1]+t[4])/o,a[1]=.25*o,a[2]=(t[6]+t[9])/o):(o=2*Math.sqrt(1+t[10]-t[0]-t[5]),a[3]=(t[1]-t[4])/o,a[0]=(t[8]+t[2])/o,a[1]=(t[6]+t[9])/o,a[2]=.25*o),a},t.fromRotationTranslationScale=function(a,t,l,o){var M=t[0],S=t[1],I=t[2],D=t[3],x=M+M,F=S+S,s=I+I,u=M*x,r=M*F,e=M*s,n=S*F,i=S*s,h=I*s,m=D*x,d=D*F,z=D*s,f=o[0],c=o[1],b=o[2];return a[0]=(1-(n+h))*f,a[1]=(r+z)*f,a[2]=(e-d)*f,a[3]=0,a[4]=(r-z)*c,a[5]=(1-(u+h))*c,a[6]=(i+m)*c,a[7]=0,a[8]=(e+d)*b,a[9]=(i-m)*b,a[10]=(1-(u+n))*b,a[11]=0,a[12]=l[0],a[13]=l[1],a[14]=l[2],a[15]=1,a},t.fromRotationTranslationScaleOrigin=function(a,t,l,o,M){var S=t[0],I=t[1],D=t[2],x=t[3],F=S+S,s=I+I,u=D+D,r=S*F,e=S*s,n=S*u,i=I*s,h=I*u,m=D*u,d=x*F,z=x*s,f=x*u,c=o[0],b=o[1],w=o[2],v=M[0],p=M[1],E=M[2];return a[0]=(1-(i+m))*c,a[1]=(e+f)*c,a[2]=(n-z)*c,a[3]=0,a[4]=(e-f)*b,a[5]=(1-(r+m))*b,a[6]=(h+d)*b,a[7]=0,a[8]=(n+z)*w,a[9]=(h-d)*w,a[10]=(1-(r+i))*w,a[11]=0,a[12]=l[0]+v-(a[0]*v+a[4]*p+a[8]*E),a[13]=l[1]+p-(a[1]*v+a[5]*p+a[9]*E),a[14]=l[2]+E-(a[2]*v+a[6]*p+a[10]*E),a[15]=1,a},t.fromQuat=function(a,t){var l=t[0],o=t[1],M=t[2],S=t[3],I=l+l,D=o+o,x=M+M,F=l*I,s=o*I,u=o*D,r=M*I,e=M*D,n=M*x,i=S*I,h=S*D,m=S*x;return a[0]=1-u-n,a[1]=s+m,a[2]=r-h,a[3]=0,a[4]=s-m,a[5]=1-F-n,a[6]=e+i,a[7]=0,a[8]=r+h,a[9]=e-i,a[10]=1-F-u,a[11]=0,a[12]=0,a[13]=0,a[14]=0,a[15]=1,a},t.frustum=function(a,t,l,o,M,S,I){var D=1/(l-t),x=1/(M-o),F=1/(S-I);return a[0]=2*S*D,a[1]=0,a[2]=0,a[3]=0,a[4]=0,a[5]=2*S*x,a[6]=0,a[7]=0,a[8]=(l+t)*D,a[9]=(M+o)*x,a[10]=(I+S)*F,a[11]=-1,a[12]=0,a[13]=0,a[14]=I*S*2*F,a[15]=0,a},t.perspective=function(a,t,l,o,M){var S=1/Math.tan(t/2),I=1/(o-M);return a[0]=S/l,a[1]=0,a[2]=0,a[3]=0,a[4]=0,a[5]=S,a[6]=0,a[7]=0,a[8]=0,a[9]=0,a[10]=(M+o)*I,a[11]=-1,a[12]=0,a[13]=0,a[14]=2*M*o*I,a[15]=0,a},t.perspectiveFromFieldOfView=function(a,t,l,o){var M=Math.tan(t.upDegrees*Math.PI/180),S=Math.tan(t.downDegrees*Math.PI/180),I=Math.tan(t.leftDegrees*Math.PI/180),D=Math.tan(t.rightDegrees*Math.PI/180),x=2/(I+D),F=2/(M+S);return a[0]=x,a[1]=0,a[2]=0,a[3]=0,a[4]=0,a[5]=F,a[6]=0,a[7]=0,a[8]=-(I-D)*x*.5,a[9]=(M-S)*F*.5,a[10]=o/(l-o),a[11]=-1,a[12]=0,a[13]=0,a[14]=o*l/(l-o),a[15]=0,a},t.ortho=function(a,t,l,o,M,S,I){var D=1/(t-l),x=1/(o-M),F=1/(S-I);return a[0]=-2*D,a[1]=0,a[2]=0,a[3]=0,a[4]=0,a[5]=-2*x,a[6]=0,a[7]=0,a[8]=0,a[9]=0,a[10]=2*F,a[11]=0,a[12]=(t+l)*D,a[13]=(M+o)*x,a[14]=(I+S)*F,a[15]=1,a},t.lookAt=function(l,o,M,S){var I,D,x,F,s,u,r,e,n,i,h=o[0],m=o[1],d=o[2],z=S[0],f=S[1],c=S[2],b=M[0],w=M[1],v=M[2];return Math.abs(h-b)<a.EPSILON&&Math.abs(m-w)<a.EPSILON&&Math.abs(d-v)<a.EPSILON?t.identity(l):(r=h-b,e=m-w,n=d-v,I=f*(n*=i=1/Math.sqrt(r*r+e*e+n*n))-c*(e*=i),D=c*(r*=i)-z*n,x=z*e-f*r,(i=Math.sqrt(I*I+D*D+x*x))?(I*=i=1/i,D*=i,x*=i):(I=0,D=0,x=0),F=e*x-n*D,s=n*I-r*x,u=r*D-e*I,(i=Math.sqrt(F*F+s*s+u*u))?(F*=i=1/i,s*=i,u*=i):(F=0,s=0,u=0),l[0]=I,l[1]=F,l[2]=r,l[3]=0,l[4]=D,l[5]=s,l[6]=e,l[7]=0,l[8]=x,l[9]=u,l[10]=n,l[11]=0,l[12]=-(I*h+D*m+x*d),l[13]=-(F*h+s*m+u*d),l[14]=-(r*h+e*m+n*d),l[15]=1,l)},t.str=function(a){return"mat4("+a[0]+", "+a[1]+", "+a[2]+", "+a[3]+", "+a[4]+", "+a[5]+", "+a[6]+", "+a[7]+", "+a[8]+", "+a[9]+", "+a[10]+", "+a[11]+", "+a[12]+", "+a[13]+", "+a[14]+", "+a[15]+")"},t.frob=function(a){return Math.sqrt(Math.pow(a[0],2)+Math.pow(a[1],2)+Math.pow(a[2],2)+Math.pow(a[3],2)+Math.pow(a[4],2)+Math.pow(a[5],2)+Math.pow(a[6],2)+Math.pow(a[7],2)+Math.pow(a[8],2)+Math.pow(a[9],2)+Math.pow(a[10],2)+Math.pow(a[11],2)+Math.pow(a[12],2)+Math.pow(a[13],2)+Math.pow(a[14],2)+Math.pow(a[15],2))},t.add=function(a,t,l){return a[0]=t[0]+l[0],a[1]=t[1]+l[1],a[2]=t[2]+l[2],a[3]=t[3]+l[3],a[4]=t[4]+l[4],a[5]=t[5]+l[5],a[6]=t[6]+l[6],a[7]=t[7]+l[7],a[8]=t[8]+l[8],a[9]=t[9]+l[9],a[10]=t[10]+l[10],a[11]=t[11]+l[11],a[12]=t[12]+l[12],a[13]=t[13]+l[13],a[14]=t[14]+l[14],a[15]=t[15]+l[15],a},t.subtract=function(a,t,l){return a[0]=t[0]-l[0],a[1]=t[1]-l[1],a[2]=t[2]-l[2],a[3]=t[3]-l[3],a[4]=t[4]-l[4],a[5]=t[5]-l[5],a[6]=t[6]-l[6],a[7]=t[7]-l[7],a[8]=t[8]-l[8],a[9]=t[9]-l[9],a[10]=t[10]-l[10],a[11]=t[11]-l[11],a[12]=t[12]-l[12],a[13]=t[13]-l[13],a[14]=t[14]-l[14],a[15]=t[15]-l[15],a},t.sub=t.subtract,t.multiplyScalar=function(a,t,l){return a[0]=t[0]*l,a[1]=t[1]*l,a[2]=t[2]*l,a[3]=t[3]*l,a[4]=t[4]*l,a[5]=t[5]*l,a[6]=t[6]*l,a[7]=t[7]*l,a[8]=t[8]*l,a[9]=t[9]*l,a[10]=t[10]*l,a[11]=t[11]*l,a[12]=t[12]*l,a[13]=t[13]*l,a[14]=t[14]*l,a[15]=t[15]*l,a},t.multiplyScalarAndAdd=function(a,t,l,o){return a[0]=t[0]+l[0]*o,a[1]=t[1]+l[1]*o,a[2]=t[2]+l[2]*o,a[3]=t[3]+l[3]*o,a[4]=t[4]+l[4]*o,a[5]=t[5]+l[5]*o,a[6]=t[6]+l[6]*o,a[7]=t[7]+l[7]*o,a[8]=t[8]+l[8]*o,a[9]=t[9]+l[9]*o,a[10]=t[10]+l[10]*o,a[11]=t[11]+l[11]*o,a[12]=t[12]+l[12]*o,a[13]=t[13]+l[13]*o,a[14]=t[14]+l[14]*o,a[15]=t[15]+l[15]*o,a},t.exactEquals=function(a,t){return a[0]===t[0]&&a[1]===t[1]&&a[2]===t[2]&&a[3]===t[3]&&a[4]===t[4]&&a[5]===t[5]&&a[6]===t[6]&&a[7]===t[7]&&a[8]===t[8]&&a[9]===t[9]&&a[10]===t[10]&&a[11]===t[11]&&a[12]===t[12]&&a[13]===t[13]&&a[14]===t[14]&&a[15]===t[15]},t.equals=function(t,l){var o=t[0],M=t[1],S=t[2],I=t[3],D=t[4],x=t[5],F=t[6],s=t[7],u=t[8],r=t[9],e=t[10],n=t[11],i=t[12],h=t[13],m=t[14],d=t[15],z=l[0],f=l[1],c=l[2],b=l[3],w=l[4],v=l[5],p=l[6],E=l[7],P=l[8],O=l[9],L=l[10],N=l[11],R=l[12],q=l[13],Y=l[14],_=l[15];return Math.abs(o-z)<=a.EPSILON*Math.max(1,Math.abs(o),Math.abs(z))&&Math.abs(M-f)<=a.EPSILON*Math.max(1,Math.abs(M),Math.abs(f))&&Math.abs(S-c)<=a.EPSILON*Math.max(1,Math.abs(S),Math.abs(c))&&Math.abs(I-b)<=a.EPSILON*Math.max(1,Math.abs(I),Math.abs(b))&&Math.abs(D-w)<=a.EPSILON*Math.max(1,Math.abs(D),Math.abs(w))&&Math.abs(x-v)<=a.EPSILON*Math.max(1,Math.abs(x),Math.abs(v))&&Math.abs(F-p)<=a.EPSILON*Math.max(1,Math.abs(F),Math.abs(p))&&Math.abs(s-E)<=a.EPSILON*Math.max(1,Math.abs(s),Math.abs(E))&&Math.abs(u-P)<=a.EPSILON*Math.max(1,Math.abs(u),Math.abs(P))&&Math.abs(r-O)<=a.EPSILON*Math.max(1,Math.abs(r),Math.abs(O))&&Math.abs(e-L)<=a.EPSILON*Math.max(1,Math.abs(e),Math.abs(L))&&Math.abs(n-N)<=a.EPSILON*Math.max(1,Math.abs(n),Math.abs(N))&&Math.abs(i-R)<=a.EPSILON*Math.max(1,Math.abs(i),Math.abs(R))&&Math.abs(h-q)<=a.EPSILON*Math.max(1,Math.abs(h),Math.abs(q))&&Math.abs(m-Y)<=a.EPSILON*Math.max(1,Math.abs(m),Math.abs(Y))&&Math.abs(d-_)<=a.EPSILON*Math.max(1,Math.abs(d),Math.abs(_))},t}));
