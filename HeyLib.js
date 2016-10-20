/**
 HeyFrame
 @namespace HeyFrame
 @author Heekei
 @email heekei@foxmail.com
 @version 0.1.0
 @date 2016/10/7
*/
(function (window, undefined) {
    /**
     * @namespace HeyFrame
     * @constructor
     */
    var HeyFrame = function (arguments) {
        return new HeyFrame.fn.init(arguments);
    }
    HeyFrame.fn = HeyFrame.prototype = {
        constructor: HeyFrame,
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
                // _this.prototype = HeyFrame.fn;
                return _this;
            }
            else if (tp === "object") {
                this[0] = arguments;
                // $.dir(arguments);
                return this;
            }
        },
        sayHi: function () {
            console.log("this");
        },
        eq: function (index) {
            return new HeyFrame.fn.init(this[index]);
        },
        className: function () {
            return this[0].className;
        },
        addClass: function (param) {
            var _this = this;
            // HeyFrame.log(_this);
            for (var x in _this) {
                var oldArrClass = new String(_this[x].className).toString().split(" ");
                oldArrClass.push(param);
                var newStrClass = oldArrClass.join(" ");
                _this[x].className = newStrClass;
                // HeyFrame.log(_this);
            }
        },
        // etype,target,func
        // etype,func
        on: function (etype,/* target, */func) {
            var p = arguments;
            var _this = this;
            var len = _this.length;
            for (var x = 0; x < len; x++) {
                // $.dir(_this[x]);
                if (arguments.length == 2) {
                    _this[x].addEventListener(p[0], p[1]);
                }
                else {
                    _this[x].addEventListener(p[0], p[1], p[2]);
                }
            }
        },
        //etype,target,func
        //etype,func || etype
        off:function(){
            var p = arguments;
            var _this = this;
            var len = _this.length;
            for (var x = 0; x < len; x++) {
                if(p.length == 1){
                    _this[x].removeEventListener(p[0]);
                }
                else if (p.length == 2) {
                    _this[x].removeEventListener(p[0],null);
                }
                else {
                    _this[x].removeEventListener(p[0], p[1], p[2]);
                }
            }
        }
    };
    HeyFrame.log = function (params) {
        console.log(params);
    };
    HeyFrame.dir = function (params) {
        console.dir(params);
    };
    HeyFrame.getJSON = function(url,param,callback){
        // var cb;
        // (typeof callback =="string")?
        var callbackFunction = callback;
        cb = function(data){
            // setTimeout(function(){
            //     callbackFunction(data);
            // },0)
            callbackFunction(data);
        };
        s = document.createElement("script");
        s.src = url +("?"+ param + "&cb=cb");
        document.head.appendChild(s);
        // callbackFunction();
    }
    /**
     * 改造setInterval，使其支持传参
     * @method setTimer
     * @param func {Function}
     * @param param {Object}
     * @param delay {Number} the interval of timer
     * @return {Number} The return of  "setInterval" 
     */
    HeyFrame.setTimer = function (func, param, delay) {
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
    HeyFrame.resetRem = function (defaultFontsize, DesignDraftWidth) {
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
    HeyFrame.deepCopy = function (p, c) {
        var c = c || {};
        for (var i in p) {
            if (typeof p[i] === 'object') {
                c[i] = (p[i].constructor === Array) ? [] : {};
                HeyFrame.deepCopy(p[i], c[i]);
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
    HeyFrame.noConflict = function (obj) {
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
     */
    HeyFrame.DynamicCSS = function () {
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


    HeyFrame.fn.init.prototype = HeyFrame.fn;
    window.HeyFrame = window.$ = HeyFrame;
})(window);