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

define(["dojo/date/locale","../../Color","../../core/lang","../../core/numberUtils","dojo/i18n!dojo/cldr/nls/gregorian"],(function(e,t,a,n,o){var i={},r="<",l=">",s="%",m="–",u={millisecond:0,second:1,minute:2,hour:3,day:4,month:5,year:6},c={millisecond:{dateOptions:{formatLength:"long"},timeOptions:{formatLength:"medium"}},second:{dateOptions:{formatLength:"long"},timeOptions:{formatLength:"medium"}},minute:{dateOptions:{formatLength:"long"},timeOptions:{formatLength:"short"}},hour:{dateOptions:{formatLength:"long"},timeOptions:{formatLength:"short"}},day:{selector:"date",dateOptions:{formatLength:"long"}},month:{selector:"date",dateOptions:{formatLength:"long"}},year:{selector:"date",dateOptions:{selector:"year"}}},d={dateOptions:{formatLength:"short",fullYear:!0},timeOptions:{formatLength:"short"}};function p(e,t,a){var n="";return 0===t?n=r+" ":t===a&&(n=l+" "),n+e}return a.mixin(i,{meterIn:{inches:1/.0254,feet:1/.3048,"us-feet":3.28084,yards:1/.9144,miles:1/1609.344,"nautical-miles":1/1852,millimeters:1e3,centimeters:100,decimeters:10,meters:1,kilometers:.001,"decimal-degrees":180/20015077},timelineDateFormatOptions:{selector:"date",dateOptions:{formatLength:"short",fullYear:!0}},formatDate:function(t,n){var i=[];null==t||t instanceof Date||(t=new Date(t)),n=n||{};var r=(n=a.mixin({},n)).selector?n.selector.toLowerCase():null,l=!r||r.indexOf("time")>-1,s=!r||r.indexOf("date")>-1;return l&&(n.timeOptions=n.timeOptions||d.timeOptions,n.timeOptions&&(n.timeOptions=a.mixin({},n.timeOptions),n.timeOptions.selector=n.timeOptions.selector||"time",i.push(n.timeOptions))),s&&(n.dateOptions=n.dateOptions||d.dateOptions,n.dateOptions&&(n.dateOptions=a.mixin({},n.dateOptions),n.dateOptions.selector=n.dateOptions.selector||"date",i.push(n.dateOptions))),i&&i.length?1==(i=i.map((function(a){return e.format(t,a)}))).length?i[0]:o["dateTimeFormat-medium"].replace(/\'/g,"").replace(/\{(\d+)\}/g,(function(e,t){return i[t]})):e.format(t)},createColorStops:function(e){var t=e.values,a=e.colors,o=e.labelIndexes,r=e.isDate,l=e.dateFormatOptions;return t.map((function(e,s){var m,u=null;(!o||o.indexOf(s)>-1)&&((m=r?i.formatDate(e,l):n.format(e))&&(u=p(m,s,t.length-1)));return{value:e,color:a[s],label:u}}))},updateColorStops:function(e){var t,a=e.stops,o=e.changes,r=e.isDate,l=e.dateFormatOptions,s=[],m=a.map((function(e){return e.value}));o.forEach((function(e){s.push(e.index),m[e.index]=e.value})),t=n.round(m,{indexes:s}),a.forEach((function(e,o){if(e.value=m[o],null!=e.label){var s,u=null;(s=r?i.formatDate(t[o],l):n.format(t[o]))&&(u=p(s,o,a.length-1)),e.label=u}}))},createClassBreakLabel:function(e){var t=e.minValue,a=e.maxValue,o=e.isFirstBreak,i=e.normalizationType,r=o?"":l+" ",u="percent-of-total"===i?s:"";return t=null==t?"":n.format(t),a=null==a?"":n.format(a),r+t+u+" "+m+" "+a+u},setLabelsForClassBreaks:function(e){var t=e.classBreakInfos,a=e.classificationMethod,o=e.normalizationType,r=[];t&&t.length&&("standard-deviation"===a?console.log("setLabelsForClassBreaks: cannot set labels for class breaks generated using 'standard-deviation' method."):e.round?(r.push(t[0].minValue),t.forEach((function(e){r.push(e.maxValue)})),r=n.round(r),t.forEach((function(e,t){e.label=i.createClassBreakLabel({minValue:0===t?r[0]:r[t],maxValue:r[t+1],isFirstBreak:0===t,normalizationType:o})}))):t.forEach((function(e,t){e.label=i.createClassBreakLabel({minValue:e.minValue,maxValue:e.maxValue,isFirstBreak:0===t,normalizationType:o})})))},updateClassBreak:function(e){var t,a=e.classBreaks,n=e.classificationMethod,o=e.normalizationType,r=e.change,l=r.index,s=r.value,m=-1,u=-1,c=a.length;"standard-deviation"!==n?(0===l?m=l:l===c?u=l-1:(u=l-1,m=l),m>-1&&m<c&&((t=a[m]).minValue=s,t.label=i.createClassBreakLabel({minValue:t.minValue,maxValue:t.maxValue,isFirstBreak:0===m,normalizationType:o})),u>-1&&u<c&&((t=a[u]).maxValue=s,t.label=i.createClassBreakLabel({minValue:t.minValue,maxValue:t.maxValue,isFirstBreak:0===u,normalizationType:o}))):console.log("updateClassBreak: cannot update labels for class breaks generated using 'standard-deviation' method.")},calculateDateFormatInterval:function(e){var t,a,n,o,i,r,l,s,m,c,d=e.length,p=1/0;for(e=e.map((function(e){return new Date(e)})),t=0;t<d-1;t++){for(n=e[t],i=[],s=1/0,m="",a=t+1;a<d;a++)o=e[a],r=(n.getFullYear()!==o.getFullYear()?"year":n.getMonth()!==o.getMonth()&&"month")||n.getDate()!==o.getDate()&&"day"||n.getHours()!==o.getHours()&&"hour"||n.getMinutes()!==o.getMinutes()&&"minute"||n.getSeconds()!==o.getSeconds()&&"second"||"millisecond",(l=u[r])<s&&(s=l,m=r),i.push(r);s<p&&(p=s,c=m)}return c},createUniqueValueLabel:function(e){var t=e.value,a=e.fieldInfo,o=e.domain,r=e.dateFormatInterval,l=String(t),s=o&&o.codedValues?o.getName(t):null;return s?l=s:"number"==typeof t&&(l=a&&"date"===a.type?i.formatDate(t,r&&c[r]):n.format(t)),l},cloneColorVariable:function(e){var n,o;return e&&((n=a.mixin({},e)).colors=(o=n.colors)&&o.map((function(e){return new t(e)})),n.stops=n.stops&&n.stops.map((function(e){return(e=a.mixin({},e)).color&&(e.color=new t(e.color)),e})),n.legendOptions&&(n.legendOptions=a.mixin({},n.legendOptions))),n},cloneOpacityVariable:function(e){var t;if(e){var n=(t=a.mixin({},e)).opacityValues;n&&(t.opacityValues=n.slice(0)),(n=t.stops)&&(t.stops=n.map((function(e){return a.mixin({},e)}))),(n=t.legendOptions)&&(t.legendOptions=a.mixin({},n))}return t},cloneSizeVariable:function(e){var t;if(e){(t=a.mixin({},e)).stops&&(t.stops=t.stops.map((function(e){return a.mixin({},e)})));var n=t.minSize;n&&"object"==typeof n&&(t.minSize=i.cloneSizeVariable(n)),(n=t.maxSize)&&"object"==typeof n&&(t.maxSize=i.cloneSizeVariable(n)),(n=t.legendOptions)&&(t.legendOptions=a.mixin({},n),(n=n.customValues)&&(t.legendOptions.customValues=n.slice(0)))}return t}}),i}));
