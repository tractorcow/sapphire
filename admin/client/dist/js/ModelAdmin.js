!function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={exports:{},id:i,loaded:!1};return t[i].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}var r=n(1),o=i(r);o["default"].entwine("ss",function(t){t(".cms-content-tools #Form_SearchForm").entwine({onsubmit:function e(t){this.trigger("beforeSubmit")}}),t(".importSpec").entwine({onmatch:function n(){this.find("div.details").hide(),this.find("a.detailsLink").click(function(){return t("#"+t(this).attr("href").replace(/.*#/,"")).slideToggle(),!1}),this._super()},onunmatch:function i(){this._super()}})})},function(t,e){t.exports=jQuery}]);
//# sourceMappingURL=ModelAdmin.js.map