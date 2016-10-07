/**
 * HeyFrame 轮子
 * 
*/
(function (window, undefined) {
    var HeyFrame = function () {
        /**
         * 深复制
         * @param {object} p 原对象
         * @param {object} c 新对象
         */
        this.deepCopy = function (p, c) {
            var c = c || {};
            for (var i in p) {
                if (typeof p[i] === 'object') {
                    c[i] = (p[i].constructor === Array) ? [] : {};
                    deepCopy(p[i], c[i]);
                } else {
                    c[i] = p[i];
                }
            }
            return c;
        }
        /** 
         * 释放 $ 变量
         * @param {object} obj $释放对象(可选)
         * @return {void} 无返回值
         */
        this.noConflict = function (obj) {
            if (typeof obj !== "undefined") {
                window.$ = obj;
            }
            else {
                window.$ = undefined;
            }
        };
        /**
         * 移动端 自适应屏幕 重置Rem比例
         * @param {number} defaultFontsize 默认html根元素字体大小
         * @param {number} DesignDraftWidth 设计稿宽度
         * @return {void} 无返回值
         */
        this.resetRem = function (defaultFontsize, DesignDraftWidth) {
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
         * 复制原型 
         */
        this.fn = HeyFrame.prototype;
    }
    window.HeyFrame = window.$ = new HeyFrame();
})(window);
