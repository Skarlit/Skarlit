webpackJsonp([4],{0:function(e,t,i){e.exports=i(245)},245:function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function s(){var e=parseInt(53*Math.random());return 25>=e?e+=65:51>=e?e+=71:e=32,String.fromCharCode(e)}function r(e){return 1>e?s():s()+r(e-1)}var o=i(246),a=n(o);window.onload=function(){for(var e=new a["default"]("ROOT"),t=0;40>t;t++)e.insert(r(parseInt((10+10*Math.random())/2)));e.printDepth()}},246:function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),o=i(247),a=n(o),l=function(){function e(t){s(this,e),this.root=new a["default"](t),this.padding=15,this.maxX=[]}return r(e,[{key:"insert",value:function(e){this.root.insert(e)}},{key:"printLevel",value:function(){for(var e=[this.root],t=0;t<e.length;){console.log(e[t]);for(var i=0;i<e[t].children.length;i++)e.push(e[t].children[i]);t++}}},{key:"printDepth",value:function(){this.visit(this.root,0)}},{key:"visit",value:function(e,t){if(!e.children||0==e.children.length)return void(this.maxX[t]?(e.x=this.maxX[t]+this.padding,this.maxX[t]+=e.val.length):(this.maxX[t]=0,e.x=0));for(var i=0;i<e.children.length;i++)this.visit(e.children[i],t+1);if(this.maxX[t]){var n=(e.children[0]+e.children[e.children.length-1])/2;e.x=n,this.maxX[t]=e.children[e.children.length-1]+this.padding}else this.maxX[t]=0,e.x=0}}]),e}();t["default"]=l,e.exports=t["default"]},247:function(e,t){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),s=function(){function e(t){i(this,e),this.val=t,this.children=[]}return n(e,[{key:"insert",value:function(t){Math.random()>.5||0==this.children.length?this.children.push(new e(t)):this.children[parseInt(Math.random()*this.children.length)].insert(t)}}]),e}();t["default"]=s,e.exports=t["default"]}});