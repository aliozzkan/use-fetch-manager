/*! For license information please see main.f2b06c63.chunk.js.LICENSE.txt */
(this["webpackJsonpuse-fetch-manager-example"]=this["webpackJsonpuse-fetch-manager-example"]||[]).push([[0],{10:function(e,n,t){"use strict";t.r(n);var r=t(0),u=t.n(r),l=t(1),a=t.n(l);t(9);function i(e,n,t,r){return new(t||(t=Promise))((function(u,l){function a(e){try{o(r.next(e))}catch(n){l(n)}}function i(e){try{o(r.throw(e))}catch(n){l(n)}}function o(e){var n;e.done?u(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,i)}o((r=r.apply(e,n||[])).next())}))}function o(e,n){var t,r,u,l,a={label:0,sent:function(){if(1&u[0])throw u[1];return u[1]},trys:[],ops:[]};return l={next:i(0),throw:i(1),return:i(2)},"function"===typeof Symbol&&(l[Symbol.iterator]=function(){return this}),l;function i(l){return function(i){return function(l){if(t)throw new TypeError("Generator is already executing.");for(;a;)try{if(t=1,r&&(u=2&l[0]?r.return:l[0]?r.throw||((u=r.return)&&u.call(r),0):r.next)&&!(u=u.call(r,l[1])).done)return u;switch(r=0,u&&(l=[2&l[0],u.value]),l[0]){case 0:case 1:u=l;break;case 4:return a.label++,{value:l[1],done:!1};case 5:a.label++,r=l[1],l=[0];continue;case 7:l=a.ops.pop(),a.trys.pop();continue;default:if(!(u=(u=a.trys).length>0&&u[u.length-1])&&(6===l[0]||2===l[0])){a=0;continue}if(3===l[0]&&(!u||l[1]>u[0]&&l[1]<u[3])){a.label=l[1];break}if(6===l[0]&&a.label<u[1]){a.label=u[1],u=l;break}if(u&&a.label<u[2]){a.label=u[2],a.ops.push(l);break}u[2]&&a.ops.pop(),a.trys.pop();continue}l=n.call(e,a)}catch(i){l=[6,i],r=0}finally{t=u=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}([l,i])}}}var c;function s(){return fetch("http://example.com/movies.json").then((function(e){return e.json()}))}!function(e){e.fulfilled="fulfilled",e.rejected="rejected",e.pending="pending"}(c||(c={}));var f=function(){var e=function(e){var n=Object(r.useState)(null),t=n[0],u=n[1],l=Object(r.useState)(null),a=l[0],c=l[1];return{data:t,onReset:function(){return i(this,void 0,void 0,(function(){return o(this,(function(e){return u(null),c(null),[2]}))}))},fetch:function(){for(var n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];return i(this,void 0,void 0,(function(){var t,r;return o(this,(function(l){switch(l.label){case 0:c("pending"),l.label=1;case 1:return l.trys.push([1,3,,4]),[4,e.apply(void 0,n)];case 2:return t=l.sent(),u(t),c("fulfilled"),[2,t];case 3:return r=l.sent(),console.log(r),c("rejected"),[2,r];case 4:return[2]}}))}))},status:a,hasData:!!t,isFullfilled:"fulfilled"===a,isPending:"pending"===a,isRejected:"rejected"===a}}(s),n=(e.data,e.fetch,e.hasData,e.isFullfilled,e.isPending,e.isRejected,e.onReset,e.status);return u.a.createElement("div",null,n)};a.a.render(u.a.createElement(f,null),document.getElementById("root"))},2:function(e,n,t){e.exports=t(10)},9:function(e,n,t){}},[[2,1,2]]]);
//# sourceMappingURL=main.f2b06c63.chunk.js.map