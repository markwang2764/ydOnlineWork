webpackJsonp([1],{4:function(i,t,n){i.exports=n(5)},5:function(i,t,n){"use strict";var e=n(0),s=new e.Thumb;xtag.register("x-praise",{content:'<div id="thumb" class="hand"><div class="arm"></div><div class="finger"></div><div class="finger"></div></div><span class="total">0</span><span id="animation" class="hide">+1</span>',lifecycle:{created:function(){},inserted:function(){},removed:function(){},attributeChanged:function(){}},methods:{praise:function(){var i=this;s.clickAction();var t=i.querySelector("#animation");t.className="hide num",setTimeout(function(){t.className="hide"},800)}},accessors:{someAccessor:{attribute:{},set:function(){},get:function(){}}},events:{tap:function(){},focus:function(){},click:function(i){var t=this;if("thumb"==i.target.id){var n="";n&&clearTimeout(n),n=setTimeout(function(){t.praise()},500)}}}})}},[4]);