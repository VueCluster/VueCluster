;(function(root,factory){
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        if (typeof root === 'undefined' || root !== Object(root)) {
            throw new Error('puglatizer: window does not exist or is not an object');
        }
        root.puglatizer = factory();
    }
}(this, function () {
    var pug = {
    	merge:function pug_merge(r,e){if(1===arguments.length){for(var t=r[0],a=1;a<r.length;a++)t=pug_merge(t,r[a]);return t}for(var g in e)if("class"===g){var n=r[g]||[];r[g]=(Array.isArray(n)?n:[n]).concat(e[g]||[])}else if("style"===g){var n=pug_style(r[g]),s=pug_style(e[g]);r[g]=n+(n&&s&&";")+s}else r[g]=e[g];return r},
    	classes:function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""},
    	style:function pug_style(r){if(!r)return"";if("object"==typeof r){var e="",t="";for(var n in r)pug_has_own_property.call(r,n)&&(e=e+t+n+":"+r[n],t=";");return e}return r=""+r,";"===r[r.length-1]?r.slice(0,-1):r},
    	attr:function pug_attr(t,e,n,f){return e!==!1&&null!=e&&(e||"class"!==t&&"style"!==t)?e===!0?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""},
    	attrs:function pug_attrs(t,r){var a="";for(var s in t)if(pug_has_own_property.call(t,s)){var u=t[s];if("class"===s){u=pug_classes(u),a=pug_attr(s,u,!1,r)+a;continue}"style"===s&&(u=pug_style(u)),a+=pug_attr(s,u,!1,r)}return a},
    	escape:function pug_escape(e){var a=""+e,t=(/["&<>]/).exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s},
    	rethrow:function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(i){pug_rethrow(n,null,r)}var a=3,o=t.split("\n"),h=Math.max(r-a,0),s=Math.min(o.length,r+a),a=o.slice(h,s).map(function(n,e){var t=e+h+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+a+"\n\n"+n.message,n}
    }

    var puglatizer = {}
    puglatizer["dashboard"] = {}
    puglatizer["dashboard"]["index"] = function template(r){var t,a,h="";try{a=1,h+="<h3>",a=1,h+="Dashboard</h3>"}catch(e){pug.rethrow(e,t,a)}return h};

    puglatizer["session"] = {}
    puglatizer["session"]["create"] = function template(o){var l,s,t="";try{s=1,t+='<div class="row" style="margin-top:100px">',s=2,t+='<div class="col-md-4 offset-md-4">',s=3,t+="<form>",s=4,t+='<div class="form-group">',s=5,t+="<label>",s=5,t+="Email</label>",s=6,t+='<input class="form-control" type="email" v-model="email"/></div>',s=7,t+='<div class="form-group">',s=8,t+="<label>",s=8,t+="Password</label>",s=9,t+='<input class="form-control" type="password" v-model="password"/></div>',s=10,t+="<hr/>",s=11,t+='<div class="form-group">',s=12,t+='<button class="btn btn-success" type="button" @click="login">',s=12,t+="Login</button></div></form></div></div>"}catch(r){pug.rethrow(r,l,s)}return t};

    puglatizer["session"]["destroy"] = function template(t){var e,r,c="";try{r=1,c+='<h3 class="text-center">',r=1,c+="Logging out...</h3>"}catch(n){pug.rethrow(n,e,r)}return c};

    puglatizer["session"]["index"] = function template(r){var t,e,u="";try{e=1,u+="<router-view></router-view>"}catch(o){pug.rethrow(o,t,e)}return u};


    return puglatizer;
}));
