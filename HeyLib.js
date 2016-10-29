/**
 HeyLib
 @namespace HeyLib
 @author Heekei
 @email heekei@foxmail.com
 @version 0.1.1
 @date 2016/10/7
*/
(function (window, undefined) {
    /**
     * @namespace HeyLib
     * @constructor
     */
    var HeyLib = function (arguments) {
        return new HeyLib.fn.init(arguments);
    }
    HeyLib.fn = HeyLib.prototype = {
        constructor: HeyLib,
        init: function (arguments) {
            var tp = typeof arguments;
            if (tp === "string") {
                var _this = this;
                var doms = document.querySelectorAll(arguments);
                var lenOfDoms = doms.length;
                if (lenOfDoms == 0) return [];
                for (var x = 0; x < lenOfDoms; x++) {
                    _this[x] = doms[x];
                }

                _this.length = lenOfDoms;
                // _this.prototype = HeyLib.fn;
                return _this;
            }
            else if (tp === "object") {
                this[0] = arguments;
                // $.dir(arguments);
                return this;
            }
        },
        eq: function (index) {
            return new HeyLib.fn.init(this[index]);
        },
        className: function () {
            return this[0].className;
        },
        addClass: function (param) {
            var _this = this;
            // HeyLib.log(_this);
            for (var x in _this) {
                var oldArrClass = new String(_this[x].className).toString().split(" ");
                oldArrClass.push(param);
                var newStrClass = oldArrClass.join(" ");
                _this[x].className = newStrClass;
                // HeyLib.log(_this);
            }
        },
        // // etype,target,func
        // // etype,func
        // on: function (etype,/* target, */func) {
        //     var p = arguments;
        //     var _this = this;
        //     var len = _this.length;
        //     for (var x = 0; x < len; x++) {
        //         // $.dir(_this[x]);
        //         if (arguments.length == 2) {
        //             _this[x].addEventListener(p[0], p[1]);
        //         }
        //         else {
        //             _this[x].addEventListener(p[0], p[1], p[2]);
        //         }
        //     }
        // },
        // //etype,target,func
        // //etype,func || etype
        // off: function () {
        //     var p = arguments;
        //     var _this = this;
        //     var len = _this.length;
        //     for (var x = 0; x < len; x++) {
        //         if (p.length == 1) {
        //             _this[x].removeEventListener(p[0]);
        //         }
        //         else if (p.length == 2) {
        //             _this[x].removeEventListener(p[0], null);
        //         }
        //         else {
        //             _this[x].removeEventListener(p[0], p[1], p[2]);
        //         }
        //     }
        // }
    };
    HeyLib.log = function (params) {
        console.log(params);
    };
    HeyLib.dir = function (params) {
        console.dir(params);
    };
    // HeyLib.getJSON = function (url, param, callback) {
    //     // var cb;
    //     // (typeof callback =="string")?
    //     var callbackFunction = callback;
    //     cb = function (data) {
    //         // setTimeout(function(){
    //         //     callbackFunction(data);
    //         // },0)
    //         callbackFunction(data);
    //     };
    //     s = document.createElement("script");
    //     s.src = url + ("?" + param + "&cb=cb");
    //     document.head.appendChild(s);
    //     // callbackFunction();
    // }


    /**
     * 改造setInterval，使其支持传参
     * @method setTimer
     * @param func {Function}
     * @param param {Object}
     * @param delay {Number} the interval of timer
     * @return {Number} The return of  "setInterval" 
     */
    HeyLib.setTimer = function (func, param, delay) {
        return setInterval(function () {
            func(param);
        }, delay);
    };
    /**
     * 移动端 自适应屏幕 重置Rem比例
     * @method resetRem
     * @param defaultFontsize {Number} 默认html根元素字体大小
     * @param DesignDraftWidth {Number} 设计稿宽度
     * @return {void} 无返回值
     */
    HeyLib.resetRem = function (defaultFontsize, DesignDraftWidth) {
        var docEl = document.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                docEl.style.fontSize = defaultFontsize * (clientWidth / DesignDraftWidth) + 'px';
            };
        if (!document.addEventListener) return;
        window.addEventListener(resizeEvt, recalc, false);
        document.addEventListener('DOMContentLoaded', recalc, false);
    };
    /**
     * 深复制
     * @method deepCopy
     * @param p {Object} 原对象
     * @param [c={}] {Object} 新对象(可选)
     * @return {Object} 返回新对象
     */
    HeyLib.deepCopy = function (p, c) {
        var c = c || {};
        for (var i in p) {
            if (typeof p[i] === 'object') {
                c[i] = (p[i].constructor === Array) ? [] : {};
                HeyLib.deepCopy(p[i], c[i]);
            } else {
                c[i] = p[i];
            }
        }
        return c;
    };
    /** 
     * 释放 $ 变量
     * @method noConflict
     * @param [obj={}] {object} $释放对象(可选)
     * @return {void} 无返回值
     */
    HeyLib.noConflict = function (obj) {
        if (typeof obj !== "undefined") {
            window.$ = obj;
        }
        else {
            window.$ = undefined;
        }
    };
    /** 
     * 动态CSS
     * @method DynamicCSS
     * @param null
     * @return {void} 无返回值
     * @example class="dc-width-100px"
     */
    HeyLib.DynamicCSS = function () {
        var doms = document.querySelectorAll("[class]");

        for (var x in doms) {
            var reg = new RegExp("dc-([^ ]+)-([^ ]+)", "gi");
            // console.log(doms[x].className);
            var str = doms[x].className;
            var arr = [];
            while ((match = reg.exec(str)) != null) {
                arr.push(match);
            }
            for (key in arr) {
                doms[x].style[arr[key][1]] = arr[key][2];
            }

        }
    };
    /**
     * 多行字数限制
     * @param node {HTMLElement} 元素或元素集合
     * @param show {Number} 长度
     * @return null
     */
    HeyLib.hiddenChar = function (node, show) {
        for (var i = 0; i < node.length; i++) {
            var node_str = node[i].innerHTML;

            if (node_str.length > show) {
                var show_str = node_str.substr(0, show) + "...";
                node[i].innerHTML = show_str;
            }
        }
    };
    /**
     * getIE
     * @param null 
     * @return {Number} 返回IE版本：6|7|8|9|10
     */
    HeyLib.getIE = function () {
        var browser = navigator.appName
        var b_version = navigator.appVersion
        var version = b_version.split(";");
        var trim_Version = version[1] ? version[1].replace(/[ ]/g, "") : null;
        if (trim_Version != null) {
            if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE6.0") {
                return 6;
            } else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE7.0") {
                return 7;
            } else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE8.0") {
                return 8;
            } else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE9.0") {
                return 9;
            } else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE10.0") {
                return 10;
            }
        }
    }
    //加入收藏
    HeyLib.addFavorite2 = function () {
        var url = window.location;
        var title = document.title;
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("360se") > -1) {
            alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
        } else if (ua.indexOf("msie 8") > -1) {
            window.external.AddToFavoritesBar(url, title); //IE8
        } else if (document.all) {
            try {
                window.external.addFavorite(url, title);
            } catch (e) {
                alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
            }
        } else {
            alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
        }
    }
    //设为首页
    HeyLib.SetHomePage = function (obj) {
        var url = window.location;
        try {
            obj.style.behavior = 'url(#default#homepage)';
            obj.setHomePage(url);
        } catch (e) {
            if (window.netscape) {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                } catch (e) {
                    alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
                }
            } else {
                alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【" + url + "】设置为首页。");
            }
        }
    }
    HeyLib.fn.init.prototype = HeyLib.fn;
    window.HeyLib = window._$ = HeyLib;
})(window);