/**
 * @license csBuild 0.4.0 Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/require-cs for details
 */
/**
 * @license RequireJS text 1.0.8 Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
define("cs",{pluginBuilder:"csBuild",load:function(){throw new Error("Cannot dynamically load CoffeeScript")}}),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}};define("cs!lib/controller",[],function(){var b;return b=function(){function b(b){this.el=b,this.refreshElements=a(this.refreshElements,this)}return b.prototype.elements={},b.prototype.refreshElements=function(){var a,b,c;c=this.elements;for(a in c)b=c[a],this[a]=this.el.find(b).first();return null},b}(),window.Controller=b})}.call(this),function(){var a=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],b=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,c=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,d=typeof location!="undefined"&&location.href,e=d&&location.protocol&&location.protocol.replace(/\:/,""),f=d&&location.hostname,g=d&&(location.port||undefined),h=[];define("text",[],function(){var i,j;return i={version:"1.0.8",strip:function(a){if(a){a=a.replace(b,"");var d=a.match(c);d&&(a=d[1])}else a="";return a},jsEscape:function(a){return a.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r")},createXhr:function(){var b,c,d;if(typeof XMLHttpRequest!="undefined")return new XMLHttpRequest;if(typeof ActiveXObject!="undefined")for(c=0;c<3;c++){d=a[c];try{b=new ActiveXObject(d)}catch(e){}if(b){a=[d];break}}return b},parseName:function(a){var b=!1,c=a.indexOf("."),d=a.substring(0,c),e=a.substring(c+1,a.length);return c=e.indexOf("!"),c!==-1&&(b=e.substring(c+1,e.length),b=b==="strip",e=e.substring(0,c)),{moduleName:d,ext:e,strip:b}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(a,b,c,d){var e=i.xdRegExp.exec(a),f,g,h;return e?(f=e[2],g=e[3],g=g.split(":"),h=g[1],g=g[0],(!f||f===b)&&(!g||g===c)&&(!h&&!g||h===d)):!0},finishLoad:function(a,b,c,d,e){c=b?i.strip(c):c,e.isBuild&&(h[a]=c),d(c)},load:function(a,b,c,h){if(h.isBuild&&!h.inlineText){c();return}var j=i.parseName(a),k=j.moduleName+"."+j.ext,l=b.toUrl(k),m=h&&h.text&&h.text.useXhr||i.useXhr;!d||m(l,e,f,g)?i.get(l,function(b){i.finishLoad(a,j.strip,b,c,h)}):b([k],function(a){i.finishLoad(j.moduleName+"."+j.ext,j.strip,a,c,h)})},write:function(a,b,c,d){if(h.hasOwnProperty(b)){var e=i.jsEscape(h[b]);c.asModule(a+"!"+b,"define(function () { return '"+e+"';});\n")}},writeFile:function(a,b,c,d,e){var f=i.parseName(b),g=f.moduleName+"."+f.ext,h=c.toUrl(f.moduleName+"."+f.ext)+".js";i.load(g,c,function(b){var c=function(a){return d(h,a)};c.asModule=function(a,b){return d.asModule(a,h,b)},i.write(a,g,c,e)},e)}},i.createXhr()?i.get=function(a,b){var c=i.createXhr();c.open("GET",a,!0),c.onreadystatechange=function(a){c.readyState===4&&b(c.responseText)},c.send(null)}:typeof process!="undefined"&&process.versions&&!!process.versions.node?(j=require.nodeRequire("fs"),i.get=function(a,b){var c=j.readFileSync(a,"utf8");c.indexOf("﻿")===0&&(c=c.substring(1)),b(c)}):typeof Packages!="undefined"&&(i.get=function(a,b){var c="utf-8",d=new java.io.File(a),e=java.lang.System.getProperty("line.separator"),f=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(d),c)),g,h,i="";try{g=new java.lang.StringBuffer,h=f.readLine(),h&&h.length()&&h.charAt(0)===65279&&(h=h.substring(1)),g.append(h);while((h=f.readLine())!==null)g.append(e),g.append(h);i=String(g.toString())}finally{f.close()}b(i)}),i})}(),define("text!app/book/template.micro",[],function(){return'<div class="verses"></div>'}),define("text!app/book/verses.micro",[],function(){return'<% for (var i=0; i<verses.length; i++) { %>\n  <% var verse = verses[i]; %>\n  <% if (verse.target) { %>\n    <div class="target"></div>\n  <% } %>\n  <% if (verse.v === 1) { %>\n    <div class="c"><%= verse.c %></div>\n  <% } %>\n  <div class="v">\n    <span class="n"><%= verse.v %></span>\n    <%= verse.t %>\n  </div>\n<% } %>'}),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},b=Object.prototype.hasOwnProperty,c=function(a,c){function e(){this.constructor=a}for(var d in c)b.call(c,d)&&(a[d]=c[d]);return e.prototype=c.prototype,a.prototype=new e,a.__super__=c.prototype,a};define("cs!app/book/book",["cs!lib/controller","text!./template.micro","text!./verses.micro"],function(b,d,e){var f;return f=function(b){function f(){this.data_loaded=a(this.data_loaded,this),this.onScroll=a(this.onScroll,this),this._adjustHeight=a(this._adjustHeight,this),f.__super__.constructor.apply(this,arguments)}return c(f,b),f.prototype.tagetTopOffset=20,f.prototype.loadMargin=600,f.prototype.elements={versesEl:".verses",targetEl:".target"},f.prototype._adjustHeight=function(){return this.el.height(window.innerHeight)},f.prototype._scrollToTarget=function(){return this.el.scrollTop(this.el.scrollTop()+this.targetEl.position().top-this.tagetTopOffset)},f.prototype._measureTopScrollSpace=function(){return this.el.scrollTop()},f.prototype._measureBottomScrollSpace=function(){return this.versesEl.height()-this.el.scrollTop()-this.el.height()},f.prototype.init=function(){return this.mainTmpl=tmpl(d),this.versesTmpl=tmpl(e),$(window).resize(this._adjustHeight),this._adjustHeight(),this.el.scroll(this.onScroll.debounce(200)),this.el.html(this.mainTmpl({})),this.refreshElements(),$.subscribe("server/data_loaded",this.data_loaded)},f.prototype.onScroll=function(){this._measureTopScrollSpace()<this.loadMargin&&$.publish("book/top_reached");if(this._measureBottomScrollSpace()<this.loadMargin)return $.publish("book/bottom_reached")},f.prototype.data_loaded=function(a,b){var c;b.reload&&(this.versesEl.html(this.versesTmpl(b)),this.refreshElements(),this._scrollToTarget()),b.append&&this.versesEl.append(this.versesTmpl(b));if(b.prepend)return c=this.versesEl.height(),this.versesEl.prepend(this.versesTmpl(b)),this.el.scrollTop(this.el.scrollTop()+this.versesEl.height()-c)},f}(b)})}.call(this),function(){define("cs!app/toc",[],function(){var a;return a=function(){function a(){}return a}()})}.call(this),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}};define("cs!app/server",[],function(){var b;return b=function(){function b(){this.bookBottomReached=a(this.bookBottomReached,this),this.bookTopReached=a(this.bookTopReached,this),this.tocGotoVerse=a(this.tocGotoVerse,this)}return b.prototype.init=function(){return $.subscribe("toc/goto_verse",this.tocGotoVerse),$.subscribe("book/top_reached",this.bookTopReached),$.subscribe("book/bottom_reached",this.bookBottomReached)},b.prototype._getTestData=function(a,b,c){var d,e;a==null&&(a=100),b==null&&(b="gen"),c==null&&(c=1),e=[];for(d=1;1<=a?d<=a:d>=a;1<=a?d++:d--)e.push({b:b,c:c,v:d,t:"Verse text for verse number "+d+" of book '"+b+c+"' and some more text."});return e},b.prototype.tocGotoVerse=function(){var a;return a={verses:this._getTestData(100),reload:!0},a.verses[39].target=!0,$.publish("server/data_loaded",a)},b.prototype.bookTopReached=function(){var a;return a={verses:this._getTestData(100),prepend:!0},$.publish("server/data_loaded",a)},b.prototype.bookBottomReached=function(){var a;return a={verses:this._getTestData(100),append:!0},$.publish("server/data_loaded",a)},b}()})}.call(this),function(){define("cs!app/index",["cs!app/book/book","cs!app/toc","cs!app/server"],function(a,b,c){return{run:function(){var b,d;return b=new a($("#book")),d=new c,b.init(),d.init(),$.publish("toc/goto_verse")}}})}.call(this),function(a,b){b=a({}),a.subscribe=function(a,c){b.on.call(b,a,c)},a.unsubscribe=function(a,c){b.off.call(b,a,c)},a.publish=function(a,c){b.trigger.call(b,a,c)}}(jQuery),define("lib/jquery.xxspubsub",function(){}),function(){var a={};this.tmpl=function b(c,d){var e=/\W/.test(c)?new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+c.replace(/[\r\t\n]/g," ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"):a[c]=a[c]||b(document.getElementById(c).innerHTML);return d?e(d):e}}(),define("lib/tmpl",function(){}),Function.prototype.debounce=function(a,b){var c=this,d;return function(){function h(){b||c.apply(f,g),d=null}var f=this,g=arguments;d?clearTimeout(d):b&&c.apply(f,g),d=setTimeout(h,a||100)}},define("lib/debounce",function(){}),require({paths:{app:"/app",lib:"/lib"}},["cs!app/index","lib/jquery.xxspubsub","lib/tmpl","lib/debounce"],function(a){a.run()}),define("main",function(){})