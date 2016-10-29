/**
 * require
 * 
 * @description 异步加载外部js,可回调
 * @param {String} url  外部js地址
 * @param {Function=} callback 回调函数，可选
 */
function require(url, callback) {
    var script = document.createElement("script");
    script.src = url;
    script.async = "async";
    if (callback) {
        if (script.readyState) { //IE 
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" ||
                    script.readyState == "complete") {
                    script.onreadystatechange = null;
                    console.log(url + " has loaded");
                    callback();
                }
            };
        } else { //Others 
            script.onload = function () {
                console.log(url + " has loaded");
                callback();
            };
        }
    }
    document.head.appendChild(script);
}