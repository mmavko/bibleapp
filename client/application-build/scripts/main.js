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
define("cs",{pluginBuilder:"csBuild",load:function(){throw new Error("Cannot dynamically load CoffeeScript")}}),function(){define("cs!lib/controller",[],function(){var a;return a=function(){function a(a){this.el=a,this.events&&this.delegateEvents(this.events),this.elements&&this.refreshElements()}return a.prototype.delegateEvents=function(a){var b,c,d,e,f,g,h,i=this;c=/^(\S+)\s*(.*)$/,h=[];for(d in a)f=a[d],typeof f=="function"?f=function(a){return function(){return a.apply(i,arguments),!0}}(f):f=function(a){return function(){return i[a].apply(i,arguments),!0}}(f),e=d.match(c),b=e[1],g=e[2],g===""?h.push(this.el.bind(b,f)):h.push(this.el.delegate(g,b,f));return h},a.prototype.refreshElements=function(){var a,b,c;c=this.elements;for(a in c)b=c[a],this[a]=this.el.find(b).first();return null},a}(),window.Controller=a})}.call(this),function(){var a=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],b=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,c=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,d=typeof location!="undefined"&&location.href,e=d&&location.protocol&&location.protocol.replace(/\:/,""),f=d&&location.hostname,g=d&&(location.port||undefined),h=[];define("text",[],function(){var i,j;return i={version:"1.0.8",strip:function(a){if(a){a=a.replace(b,"");var d=a.match(c);d&&(a=d[1])}else a="";return a},jsEscape:function(a){return a.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r")},createXhr:function(){var b,c,d;if(typeof XMLHttpRequest!="undefined")return new XMLHttpRequest;if(typeof ActiveXObject!="undefined")for(c=0;c<3;c++){d=a[c];try{b=new ActiveXObject(d)}catch(e){}if(b){a=[d];break}}return b},parseName:function(a){var b=!1,c=a.indexOf("."),d=a.substring(0,c),e=a.substring(c+1,a.length);return c=e.indexOf("!"),c!==-1&&(b=e.substring(c+1,e.length),b=b==="strip",e=e.substring(0,c)),{moduleName:d,ext:e,strip:b}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(a,b,c,d){var e=i.xdRegExp.exec(a),f,g,h;return e?(f=e[2],g=e[3],g=g.split(":"),h=g[1],g=g[0],(!f||f===b)&&(!g||g===c)&&(!h&&!g||h===d)):!0},finishLoad:function(a,b,c,d,e){c=b?i.strip(c):c,e.isBuild&&(h[a]=c),d(c)},load:function(a,b,c,h){if(h.isBuild&&!h.inlineText){c();return}var j=i.parseName(a),k=j.moduleName+"."+j.ext,l=b.toUrl(k),m=h&&h.text&&h.text.useXhr||i.useXhr;!d||m(l,e,f,g)?i.get(l,function(b){i.finishLoad(a,j.strip,b,c,h)}):b([k],function(a){i.finishLoad(j.moduleName+"."+j.ext,j.strip,a,c,h)})},write:function(a,b,c,d){if(h.hasOwnProperty(b)){var e=i.jsEscape(h[b]);c.asModule(a+"!"+b,"define(function () { return '"+e+"';});\n")}},writeFile:function(a,b,c,d,e){var f=i.parseName(b),g=f.moduleName+"."+f.ext,h=c.toUrl(f.moduleName+"."+f.ext)+".js";i.load(g,c,function(b){var c=function(a){return d(h,a)};c.asModule=function(a,b){return d.asModule(a,h,b)},i.write(a,g,c,e)},e)}},i.createXhr()?i.get=function(a,b){var c=i.createXhr();c.open("GET",a,!0),c.onreadystatechange=function(a){c.readyState===4&&b(c.responseText)},c.send(null)}:typeof process!="undefined"&&process.versions&&!!process.versions.node?(j=require.nodeRequire("fs"),i.get=function(a,b){var c=j.readFileSync(a,"utf8");c.indexOf("﻿")===0&&(c=c.substring(1)),b(c)}):typeof Packages!="undefined"&&(i.get=function(a,b){var c="utf-8",d=new java.io.File(a),e=java.lang.System.getProperty("line.separator"),f=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(d),c)),g,h,i="";try{g=new java.lang.StringBuffer,h=f.readLine(),h&&h.length()&&h.charAt(0)===65279&&(h=h.substring(1)),g.append(h);while((h=f.readLine())!==null)g.append(e),g.append(h);i=String(g.toString())}finally{f.close()}b(i)}),i})}(),define("text!app/book/template.micro",[],function(){return'<div class="verses"></div>'}),define("text!app/book/verses.micro",[],function(){return'<% for (var i=0; i<verses.length; i++) { %>\n  <% var verse = verses[i]; %>\n  <% if (verse.target) { %>\n    <div class="target"></div>\n  <% } %>\n  <% if (verse.titles) for (var j=0; j<verse.titles.length; j++) {%>\n    <% var title = verse.titles[j]; %>\n    <h<%= title.level %>><%= title.t %></h<%= title.level %>>\n  <% } %>\n  <% if (verse.v === 1) { %>\n    <% var className = verse.singleChapter ? \'c single-chapter\' : \'c\'; %>\n    <div class="<%= className %>"><%= verse.c %></div>\n  <% } %>\n  <div class="v">\n    <span class="n"><%= verse.v %></span>\n    <%= verse.t %>\n  </div>\n<% } %>'}),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},b=Object.prototype.hasOwnProperty,c=function(a,c){function e(){this.constructor=a}for(var d in c)b.call(c,d)&&(a[d]=c[d]);return e.prototype=c.prototype,a.prototype=new e,a.__super__=c.prototype,a};define("cs!app/book/book",["cs!lib/controller","text!./template.micro","text!./verses.micro"],function(b,d,e){var f;return f=function(b){function f(){this.data_loaded=a(this.data_loaded,this),this.onScroll=a(this.onScroll,this),this._adjustHeight=a(this._adjustHeight,this),f.__super__.constructor.apply(this,arguments)}return c(f,b),f.prototype.TARGET_TOP_OFFSET=0,f.prototype.LOAD_MARGIN=600,f.prototype.elements={versesEl:".verses",targetEl:".target"},f.prototype._adjustHeight=function(){return this.el.height(window.innerHeight)},f.prototype._scrollToTarget=function(){return this.el.scrollTop(this.el.scrollTop()+this.targetEl.position().top-this.TARGET_TOP_OFFSET)},f.prototype._measureTopScrollSpace=function(){return this.el.scrollTop()},f.prototype._measureBottomScrollSpace=function(){return this.versesEl.height()-this.el.scrollTop()-this.el.height()},f.prototype.init=function(){return this.mainTmpl=tmpl(d),this.versesTmpl=tmpl(e),$.subscribe("page/resize",this._adjustHeight),this._adjustHeight(),this.el.scroll(this.onScroll.debounce(200)),this.el.html(this.mainTmpl({})),this.refreshElements(),$.subscribe("server/data_loaded",this.data_loaded)},f.prototype.onScroll=function(){this._measureTopScrollSpace()<this.LOAD_MARGIN&&$.publish("book/top_reached");if(this._measureBottomScrollSpace()<this.LOAD_MARGIN)return $.publish("book/bottom_reached")},f.prototype._refreshDOM=function(){return $(".verses .c").prev(".v").addClass("last"),this.refreshElements()},f.prototype.data_loaded=function(a,b){var c;b.reload&&(this.versesEl.html(this.versesTmpl(b)),this._refreshDOM(),this._scrollToTarget()),b.append&&(this.versesEl.append(this.versesTmpl(b)),this._refreshDOM());if(b.prepend)return c=this.versesEl.height(),this.versesEl.prepend(this.versesTmpl(b)),this._refreshDOM(),this.el.scrollTop(this.el.scrollTop()+this.versesEl.height()-c)},f}(b)})}.call(this),define("text!app/toc/books.json",[],function(){return'\n{\n    "gen": {\n        "en_short": "Gen",\n        "en_long": "Genesis",\n        "ua_full": "<span>Перша книга Мойсеєва:</span> Буття",\n        "ua_short": "1 М.",\n        "titles": [{\n            "level": 2,\n            "t": "Книги Старого Заповіту"\n        }, {\n            "level": 3,\n            "t": "П\'ятикнижжя Мойсеєве"\n        }],\n        "n": 1,\n        "n_cath": 1,\n        "chapters": 50\n    },\n    "exod": {\n        "en_short": "Exod",\n        "en_long": "Exodus",\n        "ua_full": "<span>Друга книга Мойсеєва:</span> Вихід",\n        "ua_short": "2 М.",\n        "n": 2,\n        "n_cath": 2,\n        "chapters": 40\n    },\n    "lev": {\n        "en_short": "Lev",\n        "en_long": "Leviticus",\n        "ua_full": "<span>Третя книга Мойсеєва:</span> Левіт",\n        "ua_short": "З М.",\n        "n": 3,\n        "n_cath": 3,\n        "chapters": 27\n    },\n    "num": {\n        "en_short": "Num",\n        "en_long": "Numbers",\n        "ua_full": "<span>Четверта книга Мойсеєва:</span> Числа",\n        "ua_short": "4 М.",\n        "n": 4,\n        "n_cath": 4,\n        "chapters": 36\n    },\n    "deut": {\n        "en_short": "Deut",\n        "en_long": "Deuteronomy",\n        "ua_full": "<span>П\'ята книга Мойсеєва:</span> Повторення Закону",\n        "ua_short": "5 М.",\n        "n": 5,\n        "n_cath": 5,\n        "chapters": 34\n    },\n    "josh": {\n        "en_short": "Josh",\n        "en_long": "Joshua",\n        "ua_full": "Книга Ісуса Навина <span>(книга Єгошуї)</span>",\n        "ua_short": "Єг.",\n        "titles": [{\n            "level": 3,\n            "t": "Книги історичні"\n        }],\n        "n": 6,\n        "n_cath": 6,\n        "chapters": 24\n    },\n    "judg": {\n        "en_short": "Judg",\n        "en_long": "Judges",\n        "ua_full": "Книга Суддів",\n        "ua_short": "Суд.",\n        "n": 7,\n        "n_cath": 7,\n        "chapters": 21\n    },\n    "ruth": {\n        "en_short": "Ruth",\n        "en_long": "Ruth",\n        "ua_full": "Книга Рути",\n        "ua_short": "Рут",\n        "n": 8,\n        "n_cath": 8,\n        "chapters": 4\n    },\n    "1sam": {\n        "en_short": "1 Sam",\n        "en_long": "1 Samuel",\n        "ua_full": "Перша книга Самуїла <span>(або Перша книга царів)</span>",\n        "ua_short": "1 Сам.",\n        "n": 9,\n        "n_cath": 9,\n        "chapters": 31\n    },\n    "2sam": {\n        "en_short": "2 Sam",\n        "en_long": "2 Samuel",\n        "ua_full": "Друга книга Самуїла <span>(або Друга книга царів)</span>",\n        "ua_short": "2 Сам.",\n        "n": 10,\n        "n_cath": 10,\n        "chapters": 24\n    },\n    "1kgs": {\n        "en_short": "1 Kgs",\n        "en_long": "1 Kings",\n        "ua_full": "Перша книга царів",\n        "ua_short": "1 Цар.",\n        "n": 11,\n        "n_cath": 11,\n        "chapters": 22\n    },\n    "2kgs": {\n        "en_short": "2 Kgs",\n        "en_long": "2 Kings",\n        "ua_full": "Друга книга царів",\n        "ua_short": "2 Цар.",\n        "n": 12,\n        "n_cath": 12,\n        "chapters": 25\n    },\n    "1chr": {\n        "en_short": "1 Chr",\n        "en_long": "1 Chronicles",\n        "ua_full": "Перша книга хроніки",\n        "ua_short": "1 Хр.",\n        "n": 13,\n        "n_cath": 13,\n        "chapters": 29\n    },\n    "2chr": {\n        "en_short": "2 Chr",\n        "en_long": "2 Chronicles",\n        "ua_full": "Друга книга хроніки",\n        "ua_short": "2 Хр.",\n        "n": 14,\n        "n_cath": 14,\n        "chapters": 36\n    },\n    "ezra": {\n        "en_short": "Ezra",\n        "en_long": "Ezra",\n        "ua_full": "Книга Езри",\n        "ua_short": "Езд.",\n        "n": 15,\n        "n_cath": 15,\n        "chapters": 10\n    },\n    "neh": {\n        "en_short": "Neh",\n        "en_long": "Nehemiah",\n        "ua_full": "Книга Неємії",\n        "ua_short": "Неєм.",\n        "n": 16,\n        "n_cath": 16,\n        "chapters": 13\n    },\n    "esth": {\n        "en_short": "Esth",\n        "en_long": "Esther",\n        "ua_full": "Книга Естери",\n        "ua_short": "Ест.",\n        "n": 17,\n        "n_cath": 17,\n        "chapters": 10\n    },\n    "job": {\n        "en_short": "Job",\n        "en_long": "Job",\n        "ua_full": "Книга Йова",\n        "ua_short": "Йов",\n        "titles": [{\n            "level": 3,\n            "t": "Книги навчальні і поетичні"\n        }],\n        "n": 18,\n        "n_cath": 18,\n        "chapters": 42\n    },\n    "ps": {\n        "en_short": "Pss",\n        "en_long": "Psalms",\n        "ua_full": "Псалмів",\n        "ua_short": "Пс.",\n        "n": 19,\n        "n_cath": 19,\n        "chapters": 150\n    },\n    "prov": {\n        "en_short": "Prov",\n        "en_long": "Proverbs",\n        "ua_full": "Книга Приповістей Соломонових (Приповідок)",\n        "ua_short": "Пр.",\n        "n": 20,\n        "n_cath": 20,\n        "chapters": 31\n    },\n    "eccl": {\n        "en_short": "Eccl",\n        "en_long": "Ecclesiastes",\n        "ua_full": "Книга Екклезіястова, або Проповідника",\n        "ua_short": "Еккл.",\n        "n": 21,\n        "n_cath": 21,\n        "chapters": 12\n    },\n    "song": {\n        "en_short": "Song",\n        "en_long": "Song of Songs",\n        "ua_full": "Пісні Пісень <span>(Пісня над піснями Соломона)</span>",\n        "ua_short": "Пісн.",\n        "n": 22,\n        "n_cath": 22,\n        "chapters": 8\n    },\n    "isa": {\n        "en_short": "Isa",\n        "en_long": "Isaiah",\n        "ua_full": "Книга пророка Ісаї",\n        "ua_short": "Іс.",\n        "titles": [{\n            "level": 3,\n            "t": "Книги пророцькі"\n        }, {\n            "level": 4,\n            "t": "Книги великих пророків"\n        }],\n        "n": 23,\n        "n_cath": 23,\n        "chapters": 66\n    },\n    "jer": {\n        "en_short": "Jer",\n        "en_long": "Jeremiah",\n        "ua_full": "Книга пророка Єремії",\n        "ua_short": "Єр.",\n        "n": 24,\n        "n_cath": 24,\n        "chapters": 52\n    },\n    "lam": {\n        "en_short": "Lam",\n        "en_long": "Lamentations",\n        "ua_full": "Плач Єремії",\n        "ua_short": "Плач",\n        "n": 25,\n        "n_cath": 25,\n        "chapters": 5\n    },\n    "ezek": {\n        "en_short": "Ezek",\n        "en_long": "Ezekiel",\n        "ua_full": "Книга пророка Єзекиїла (Єзакіїля)",\n        "ua_short": "Єз.",\n        "n": 26,\n        "n_cath": 26,\n        "chapters": 48\n    },\n    "dan": {\n        "en_short": "Dan",\n        "en_long": "Daniel",\n        "ua_full": "Книга пророка Даниїла",\n        "ua_short": "Дан.",\n        "titles": [{\n            "level": 4,\n            "t": "Книги малих пророків"\n        }],\n        "n": 27,\n        "n_cath": 27,\n        "chapters": 12\n    },\n    "hos": {\n        "en_short": "Hos",\n        "en_long": "Hosea",\n        "ua_full": "Книга пророка Осії",\n        "ua_short": "Ос.",\n        "n": 28,\n        "n_cath": 28,\n        "chapters": 14\n    },\n    "joel": {\n        "en_short": "Joel",\n        "en_long": "Joel",\n        "ua_full": "Книга пророка Йоіла",\n        "ua_short": "Йоїл",\n        "n": 29,\n        "n_cath": 29,\n        "chapters": 4\n    },\n    "amos": {\n        "en_short": "Amos",\n        "en_long": "Amos",\n        "ua_full": "Книга пророка Амоса",\n        "ua_short": "Ам.",\n        "n": 30,\n        "n_cath": 30,\n        "chapters": 9\n    },\n    "obad": {\n        "en_short": "Obad",\n        "en_long": "Obadiah",\n        "ua_full": "Книга пророка Овдія",\n        "ua_short": "Ов.",\n        "n": 31,\n        "n_cath": 31,\n        "chapters": 1\n    },\n    "jonah": {\n        "en_short": "Jonah",\n        "en_long": "Jonah",\n        "ua_full": "Книга пророка Йони",\n        "ua_short": "Йона",\n        "n": 32,\n        "n_cath": 32,\n        "chapters": 4\n    },\n    "mic": {\n        "en_short": "Mic",\n        "en_long": "Micah",\n        "ua_full": "Книга пророка Михея",\n        "ua_short": "Мих.",\n        "n": 33,\n        "n_cath": 33,\n        "chapters": 7\n    },\n    "nah": {\n        "en_short": "Nah",\n        "en_long": "Nahum",\n        "ua_full": "Книга пророка Наума",\n        "ua_short": "Наум",\n        "n": 34,\n        "n_cath": 34,\n        "chapters": 3\n    },\n    "hab": {\n        "en_short": "Hab",\n        "en_long": "Habakkuk",\n        "ua_full": "Книга пророка Авакума",\n        "ua_short": "Ав.",\n        "n": 35,\n        "n_cath": 35,\n        "chapters": 3\n    },\n    "zeph": {\n        "en_short": "Zeph",\n        "en_long": "Zephaniah",\n        "ua_full": "Книга пророка Софонії",\n        "ua_short": "Соф.",\n        "n": 36,\n        "n_cath": 36,\n        "chapters": 3\n    },\n    "hag": {\n        "en_short": "Hag",\n        "en_long": "Haggai",\n        "ua_full": "Книга пророка Огія (Аггея)",\n        "ua_short": "Ог.",\n        "n": 37,\n        "n_cath": 37,\n        "chapters": 2\n    },\n    "zech": {\n        "en_short": "Zech",\n        "en_long": "Zechariah",\n        "ua_full": "Книга пророка Захарії",\n        "ua_short": "Зах.",\n        "n": 38,\n        "n_cath": 38,\n        "chapters": 14\n    },\n    "mal": {\n        "en_short": "Mal",\n        "en_long": "Malachi",\n        "ua_full": "Книга пророка Малахії",\n        "ua_short": "Мал.",\n        "n": 39,\n        "n_cath": 39,\n        "chapters": 4\n    },\n    "matt": {\n        "en_short": "Matt",\n        "en_long": "Matthew",\n        "ua_full": "<span>Євангеліє від св.</span> Матвія",\n        "ua_short": "Мт.",\n        "titles": [{\n            "level": 2,\n            "t": "Книги Нового Заповіту"\n        }, {\n            "level": 3,\n            "t": "Чотири Євангелія"\n        }],\n        "n": 40,\n        "n_cath": 40,\n        "chapters": 28\n    },\n    "mark": {\n        "en_short": "Mark",\n        "en_long": "Mark",\n        "ua_full": "<span>Євангеліє від св.</span> Марка",\n        "ua_short": "Мр.",\n        "n": 41,\n        "n_cath": 41,\n        "chapters": 16\n    },\n    "luke": {\n        "en_short": "Luke",\n        "en_long": "Luke",\n        "ua_full": "<span>Євангеліє від св.</span> Луки",\n        "ua_short": "Лк.",\n        "n": 42,\n        "n_cath": 42,\n        "chapters": 24\n    },\n    "john": {\n        "en_short": "John",\n        "en_long": "John",\n        "ua_full": "<span>Євангеліє від св.</span> Йоана",\n        "ua_short": "Ів.",\n        "n": 43,\n        "n_cath": 43,\n        "chapters": 21\n    },\n    "acts": {\n        "en_short": "Acts",\n        "en_long": "Acts",\n        "ua_full": "Дії святих апостолів",\n        "ua_short": "Діяння",\n        "titles": [{\n            "level": 3,\n            "t": "Книга історична"\n        }],\n        "n": 44,\n        "n_cath": 44,\n        "chapters": 28\n    },\n    "rom": {\n        "en_short": "Rom",\n        "en_long": "Romans",\n        "ua_full": "Послання св. апостола Павла до римлян",\n        "ua_short": "Рим.",\n        "titles": [{\n            "level": 3,\n            "t": "Послання апостола Павла"\n        }],\n        "n": 45,\n        "n_cath": 52,\n        "chapters": 16\n    },\n    "1cor": {\n        "en_short": "1 Cor",\n        "en_long": "1 Corinthians",\n        "ua_full": "Перше послання апостола Павла до коринтян",\n        "ua_short": "1 Кор.",\n        "n": 46,\n        "n_cath": 53,\n        "chapters": 16\n    },\n    "2cor": {\n        "en_short": "2 Cor",\n        "en_long": "2 Corinthians",\n        "ua_full": "Друге послання апостола Павла до коринтян",\n        "ua_short": "2 Кор.",\n        "n": 47,\n        "n_cath": 54,\n        "chapters": 13\n    },\n    "gal": {\n        "en_short": "Gal",\n        "en_long": "Galatians",\n        "ua_full": "Послання св. апостола Павла до галатів",\n        "ua_short": "Гал.",\n        "n": 48,\n        "n_cath": 55,\n        "chapters": 6\n    },\n    "eph": {\n        "en_short": "Eph",\n        "en_long": "Ephesians",\n        "ua_full": "Послання св. апостола Павла до ефесян",\n        "ua_short": "Еф.",\n        "n": 49,\n        "n_cath": 56,\n        "chapters": 6\n    },\n    "phil": {\n        "en_short": "Phil",\n        "en_long": "Philippians",\n        "ua_full": "Послання св. апостола Павла до филип\'ян",\n        "ua_short": "Фил.",\n        "n": 50,\n        "n_cath": 57,\n        "chapters": 4\n    },\n    "col": {\n        "en_short": "Col",\n        "en_long": "Colossians",\n        "ua_full": "Послання св. апостола Павла до колосян",\n        "ua_short": "Кол.",\n        "n": 51,\n        "n_cath": 58,\n        "chapters": 4\n    },\n    "1thess": {\n        "en_short": "1 Thess",\n        "en_long": "1 Thessalonians",\n        "ua_full": "Перше послання св. апостола Павла до солунян",\n        "ua_short": "1 Сол.",\n        "n": 52,\n        "n_cath": 59,\n        "chapters": 5\n    },\n    "2thess": {\n        "en_short": "2 Thess",\n        "en_long": "2 Thessalonians",\n        "ua_full": "Друге послання св. апостола Павла до солунян",\n        "ua_short": "2 Сол.",\n        "n": 53,\n        "n_cath": 60,\n        "chapters": 3\n    },\n    "1tim": {\n        "en_short": "1 Tim",\n        "en_long": "1 Timothy",\n        "ua_full": "Перше послання св. апостола Павла до Ти­мофія",\n        "ua_short": "1 Тим.",\n        "n": 54,\n        "n_cath": 61,\n        "chapters": 7\n    },\n    "2tim": {\n        "en_short": "2 Tim",\n        "en_long": "2 Timothy",\n        "ua_full": "Друге послання св. апостола Павла до Ти­мофія",\n        "ua_short": "2 Тим.",\n        "n": 55,\n        "n_cath": 62,\n        "chapters": 4\n    },\n    "titus": {\n        "en_short": "Titus",\n        "en_long": "Titus",\n        "ua_full": "Послання св. апостола Павла до Тита",\n        "ua_short": "Тит",\n        "n": 56,\n        "n_cath": 63,\n        "chapters": 3\n    },\n    "phlm": {\n        "en_short": "Phlm",\n        "en_long": "Philemon",\n        "ua_full": "Послання св. апостола Павла до Филимона",\n        "ua_short": "Филим.",\n        "n": 57,\n        "n_cath": 64,\n        "chapters": 1\n    },\n    "heb": {\n        "en_short": "Heb",\n        "en_long": "Hebrews",\n        "ua_full": "Послання до євреїв",\n        "ua_short": "Євр.",\n        "n": 58,\n        "n_cath": 65,\n        "chapters": 13\n    },\n    "jas": {\n        "en_short": "Jas",\n        "en_long": "James",\n        "ua_full": "Соборне послання св. апостола Якова",\n        "ua_short": "Як.",\n        "titles": [{\n            "level": 3,\n            "t": "Соборні послання"\n        }],\n        "n": 59,\n        "n_cath": 45,\n        "chapters": 5\n    },\n    "1pet": {\n        "en_short": "1 Pet",\n        "en_long": "1 Peter",\n        "ua_full": "Перше соборне послання св. апостола Петра",\n        "ua_short": "1 Петр.",\n        "n": 60,\n        "n_cath": 46,\n        "chapters": 5\n    },\n    "2pet": {\n        "en_short": "2 Pet",\n        "en_long": "2 Peter",\n        "ua_full": "Друге соборне послання св. апостола Петра",\n        "ua_short": "2 Петр.",\n        "n": 61,\n        "n_cath": 47,\n        "chapters": 3\n    },\n    "1john": {\n        "en_short": "1 John",\n        "en_long": "1 John",\n        "ua_full": "Перше соборне послання св. апостола Йоана",\n        "ua_short": "1 Ів.",\n        "n": 62,\n        "n_cath": 48,\n        "chapters": 5\n    },\n    "2john": {\n        "en_short": "2 John",\n        "en_long": "2 John",\n        "ua_full": "Друге соборне послання св. апостола Йоана",\n        "ua_short": "2 Ів.",\n        "n": 63,\n        "n_cath": 49,\n        "chapters": 1\n    },\n    "3john": {\n        "en_short": "3 John",\n        "en_long": "3 John",\n        "ua_full": "Третє соборне послання св. апостола Йоана",\n        "ua_short": "З Ів.",\n        "n": 64,\n        "n_cath": 50,\n        "chapters": 1\n    },\n    "jude": {\n        "en_short": "Jude",\n        "en_long": "Jude",\n        "ua_full": "Соборне послання св. апостола Юди",\n        "ua_short": "Юд.",\n        "n": 65,\n        "n_cath": 51,\n        "chapters": 1\n    },\n    "rev": {\n        "en_short": "Rev",\n        "en_long": "Revelation",\n        "ua_full": "Об\'явлення св. Йоана Богослова",\n        "ua_short": "Об.",\n        "titles": [{\n            "level": 3,\n            "t": "Книга пророцька"\n        }],\n        "n": 66,\n        "n_cath": 66,\n        "chapters": 22\n    }\n}'}),define("text!app/toc/template.micro",[],function(){return'<div class="books"></div>'}),define("text!app/toc/books.micro",[],function(){return'<% for (var book_id in books) { %>\n  <% var book = books[book_id]; %>\n  <% if (book.titles) for (var j=0; j<book.titles.length; j++) {%>\n    <% var title = book.titles[j]; %>\n    <h<%= title.level %>><%= title.t %></h<%= title.level %>>\n  <% } %>\n  <div class="book" data-target="<%= book_id %>"><%= book.ua_full %></div>\n<% } %>'}),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},b=Object.prototype.hasOwnProperty,c=function(a,c){function e(){this.constructor=a}for(var d in c)b.call(c,d)&&(a[d]=c[d]);return e.prototype=c.prototype,a.prototype=new e,a.__super__=c.prototype,a};define("cs!app/toc/toc",["cs!lib/controller","text!./books.json","text!./template.micro","text!./books.micro"],function(b,d,e,f){var g,h;return h=JSON.parse(d),g=function(b){function d(){this.bookClicked=a(this.bookClicked,this),this._adjustHeight=a(this._adjustHeight,this),d.__super__.constructor.apply(this,arguments)}return c(d,b),d.prototype.DEFAULT_TARGET="gen",d.prototype.elements={booksEl:".books"},d.prototype.events={"click .book":"bookClicked"},d.prototype.init=function(){var a=this;return this.mainTmpl=tmpl(e),this.booksTmpl=tmpl(f),this.el.html(this.mainTmpl({})),this.refreshElements(),this.booksEl.html(this.booksTmpl({books:h})),$.subscribe("page/resize",this._adjustHeight),this._adjustHeight(),$.subscribe("page/loaded",function(){return a._goto(a.DEFAULT_TARGET)})},d.prototype._adjustHeight=function(){var a,b;return b=parseInt(this.el.css("margin-top").replace("px",""),10),a=parseInt(this.el.css("margin-bottom").replace("px",""),10),this.el.height(window.innerHeight-b-a)},d.prototype._goto=function(a){return console.log("toc/goto_verse "+a),$.publish("toc/goto_verse",{target:a})},d.prototype.bookClicked=function(a){return this._goto($(a.currentTarget).attr("data-target"))},d}(b)})}.call(this),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}};define("cs!app/server",[],function(){var b;return b=function(){function b(){this.bookBottomReached=a(this.bookBottomReached,this),this.bookTopReached=a(this.bookTopReached,this),this.tocGotoVerse=a(this.tocGotoVerse,this)}return b.prototype.API_URL="http://127.0.0.1:8888/api",b.prototype.PART_SIZE=50,b.prototype.init=function(){return $.subscribe("toc/goto_verse",this.tocGotoVerse),$.subscribe("book/top_reached",this.bookTopReached),$.subscribe("book/bottom_reached",this.bookBottomReached)},b.prototype._loadData=function(a){var b,c,d,e=this;if(a.reload)this.prependCount=this.appendCount=0,this.beginningReached=this.endReached=!1,this.currentTargetVerse=a.target,d=-this.PART_SIZE,b=2*this.PART_SIZE;else if(a.prepend){if(this.beginningReached)return;d=-(this.prependCount+2)*this.PART_SIZE,b=-(this.prependCount+1)*this.PART_SIZE}else if(a.append){if(this.endReached)return;d=(this.appendCount+2)*this.PART_SIZE,b=(this.appendCount+3)*this.PART_SIZE}return c={target:this.currentTargetVerse,start:d,end:b},$.getJSON(this.API_URL,c,function(b){return a.prepend&&e.prependCount++,a.append&&e.appendCount++,b.beginningReached&&(e.beginningReached=!0),b.endReached&&(e.endReached=!0),a.verses=b.verses,$.publish("server/data_loaded",a)})},b.prototype.tocGotoVerse=function(a,b){return b.reload=!0,this._loadData(b)},b.prototype.bookTopReached=function(a,b){return b==null&&(b={}),b.prepend=!0,this._loadData(b)},b.prototype.bookBottomReached=function(a,b){return b==null&&(b={}),b.append=!0,this._loadData(b)},b}()})}.call(this),function(){define("cs!app/index",["cs!app/book/book","cs!app/toc/toc","cs!app/server"],function(a,b,c){return{run:function(){var d,e,f;return d=new a($("#book")),e=new c,f=new b($("#toc")),d.init(),e.init(),f.init(),$(window).resize(function(){return $.publish("page/resize")}),$.publish("page/loaded")}}})}.call(this),function(a,b){b=a({}),a.subscribe=function(a,c){b.on.call(b,a,c)},a.unsubscribe=function(a,c){b.off.call(b,a,c)},a.publish=function(a,c){b.trigger.call(b,a,c)}}(jQuery),define("lib/jquery.xxspubsub",function(){}),function(){var a={};this.tmpl=function b(c,d){var e=/\W/.test(c)?new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+c.replace(/[\r\t\n]/g," ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"):a[c]=a[c]||b(document.getElementById(c).innerHTML);return d?e(d):e}}(),define("lib/tmpl",function(){}),Function.prototype.debounce=function(a,b){var c=this,d;return function(){function h(){b||c.apply(f,g),d=null}var f=this,g=arguments;d?clearTimeout(d):b&&c.apply(f,g),d=setTimeout(h,a||100)}},define("lib/debounce",function(){}),function(){function b(a,b){return[].slice.call((b||document).querySelectorAll(a))}if(!window.addEventListener)return;var a=window.StyleFix={link:function(b){try{if(b.rel!=="stylesheet"||b.hasAttribute("data-noprefix"))return}catch(c){return}var d=b.href||b.getAttribute("data-href"),e=d.replace(/[^\/]+$/,""),f=b.parentNode,g=new XMLHttpRequest,h;g.onreadystatechange=function(){g.readyState===4&&h()},h=function(){var c=g.responseText;if(c&&b.parentNode&&(!g.status||g.status<400||g.status>600)){c=a.fix(c,!0,b),e&&(c=c.replace(/url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi,function(a,b,c){return/^([a-z]{3,10}:|\/|#)/i.test(c)?a:'url("'+e+c+'")'}),c=c.replace(RegExp("\\b(behavior:\\s*?url\\('?\"?)"+e,"gi"),"$1"));var d=document.createElement("style");d.textContent=c,d.media=b.media,d.disabled=b.disabled,d.setAttribute("data-href",b.getAttribute("href")),f.insertBefore(d,b),f.removeChild(b),d.media=b.media}};try{g.open("GET",d),g.send(null)}catch(c){typeof XDomainRequest!="undefined"&&(g=new XDomainRequest,g.onerror=g.onprogress=function(){},g.onload=h,g.open("GET",d),g.send(null))}b.setAttribute("data-inprogress","")},styleElement:function(b){if(b.hasAttribute("data-noprefix"))return;var c=b.disabled;b.textContent=a.fix(b.textContent,!0,b),b.disabled=c},styleAttribute:function(b){var c=b.getAttribute("style");c=a.fix(c,!1,b),b.setAttribute("style",c)},process:function(){b('link[rel="stylesheet"]:not([data-inprogress])').forEach(StyleFix.link),b("style").forEach(StyleFix.styleElement),b("[style]").forEach(StyleFix.styleAttribute)},register:function(b,c){(a.fixers=a.fixers||[]).splice(c===undefined?a.fixers.length:c,0,b)},fix:function(b,c){for(var d=0;d<a.fixers.length;d++)b=a.fixers[d](b,c)||b;return b},camelCase:function(a){return a.replace(/-([a-z])/g,function(a,b){return b.toUpperCase()}).replace("-","")},deCamelCase:function(a){return a.replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()})}};(function(){setTimeout(function(){b('link[rel="stylesheet"]').forEach(StyleFix.link)},10),document.addEventListener("DOMContentLoaded",StyleFix.process,!1)})()}(),function(a,b){function c(a,b,c,e,f){a=d[a];if(a.length){var g=RegExp(b+"("+a.join("|")+")"+c,"gi");f=f.replace(g,e)}return f}if(!window.StyleFix||!window.getComputedStyle)return;var d=window.PrefixFree={prefixCSS:function(a,b){var e=d.prefix;a=c("functions","(\\s|:|,)","\\s*\\(","$1"+e+"$2(",a),a=c("keywords","(\\s|:)","(\\s|;|\\}|$)","$1"+e+"$2$3",a),a=c("properties","(^|\\{|\\s|;)","\\s*:","$1"+e+"$2:",a);if(d.properties.length){var f=RegExp("\\b("+d.properties.join("|")+")(?!:)","gi");a=c("valueProperties","\\b",":(.+?);",function(a){return a.replace(f,e+"$1")},a)}return b&&(a=c("selectors","","\\b",d.prefixSelector,a),a=c("atrules","@","\\b","@"+e+"$1",a)),a=a.replace(RegExp("-"+e,"g"),"-"),a},property:function(a){return(d.properties.indexOf(a)?d.prefix:"")+a},value:function(a,b){return a=c("functions","(^|\\s|,)","\\s*\\(","$1"+d.prefix+"$2(",a),a=c("keywords","(^|\\s)","(\\s|$)","$1"+d.prefix+"$2$3",a),a},prefixSelector:function(a){return a.replace(/^:{1,2}/,function(a){return a+d.prefix})},prefixProperty:function(a,b){var c=d.prefix+a;return b?StyleFix.camelCase(c):c}};(function(){var a={},b=[],c={},e=getComputedStyle(document.documentElement,null),f=document.createElement("div").style,g=function(c){if(c.charAt(0)==="-"){b.push(c);var d=c.split("-"),e=d[1];a[e]=++a[e]||1;while(d.length>3){d.pop();var f=d.join("-");h(f)&&b.indexOf(f)===-1&&b.push(f)}}},h=function(a){return StyleFix.camelCase(a)in f};if(e.length>0)for(var i=0;i<e.length;i++)g(e[i]);else for(var j in e)g(StyleFix.deCamelCase(j));var k={uses:0};for(var l in a){var m=a[l];k.uses<m&&(k={prefix:l,uses:m})}d.prefix="-"+k.prefix+"-",d.Prefix=StyleFix.camelCase(d.prefix),d.properties=[];for(var i=0;i<b.length;i++){var j=b[i];if(j.indexOf(d.prefix)===0){var n=j.slice(d.prefix.length);h(n)||d.properties.push(n)}}d.Prefix=="Ms"&&!("transform"in f)&&!("MsTransform"in f)&&"msTransform"in f&&d.properties.push("transform","transform-origin"),d.properties.sort()})(),function(){function e(a,b){return c[b]="",c[b]=a,!!c[b]}var a={"linear-gradient":{property:"backgroundImage",params:"red, teal"},calc:{property:"width",params:"1px + 5%"},element:{property:"backgroundImage",params:"#foo"},"cross-fade":{property:"backgroundImage",params:"url(a.png), url(b.png), 50%"}};a["repeating-linear-gradient"]=a["repeating-radial-gradient"]=a["radial-gradient"]=a["linear-gradient"];var b={initial:"color","zoom-in":"cursor","zoom-out":"cursor",box:"display",flexbox:"display","inline-flexbox":"display",flex:"display","inline-flex":"display"};d.functions=[],d.keywords=[];var c=document.createElement("div").style;for(var f in a){var g=a[f],h=g.property,i=f+"("+g.params+")";!e(i,h)&&e(d.prefix+i,h)&&d.functions.push(f)}for(var j in b){var h=b[j];!e(j,h)&&e(d.prefix+j,h)&&d.keywords.push(j)}}(),function(){function f(a){return e.textContent=a+"{}",!!e.sheet.cssRules.length}var b={":read-only":null,":read-write":null,":any-link":null,"::selection":null},c={keyframes:"name",viewport:null,document:'regexp(".")'};d.selectors=[],d.atrules=[];var e=a.appendChild(document.createElement("style"));for(var g in b){var h=g+(b[g]?"("+b[g]+")":"");!f(h)&&f(d.prefixSelector(h))&&d.selectors.push(g)}for(var i in c){var h=i+" "+(c[i]||"");!f("@"+h)&&f("@"+d.prefix+h)&&d.atrules.push(i)}a.removeChild(e)}(),d.valueProperties=["transition","transition-property"],a.className+=" "+d.prefix,StyleFix.register(d.prefixCSS)}(document.documentElement),define("lib/prefixfree",function(){}),require({paths:{app:"/app",lib:"/lib"}},["cs!app/index","lib/jquery.xxspubsub","lib/tmpl","lib/debounce","lib/prefixfree"],function(a){a.run()}),define("main",function(){})