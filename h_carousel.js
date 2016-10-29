/**
 * h_carousel
 * 
 * @description 横向-无缝-滑动-轮播
 * 
 * @version v0.1.0
 * 
 * @author Heekei <heekei@foxmail.com>
 * 
 * @site http://www.heekei.cn
 * 
 * @date 2016/10/29
 * 
 * @example 
 * 
 * html:
 * 
 *      <ul class="carousel">
 *          <li></li>
 *          <li></li>
 *          <li></li>
 *      </ul>
 * 
 * css:
 * 
 *      ul{
 *          position:absolute;
 *      }
 *      ul:after{
 *          content: " ";
 *          display: table;
 *          clear: both;
 *      }
 *      li{
 *          float:left;
 *      }
 * 
 * javascript:
 * 
 *      var a = new h_carousel({
 *          $container:$("ul"),
 *          ctrl:{
 *              prev:$(".prev"),
 *              next:$(".next")
 *          },
 *          autoPlay:false
 *          delay:3000,
 *          direction:0,
 *          hoverPause:false
 *      })
 * 
 */

/**
 * @param {Object} config 
 * 配置参数config
 * 
 * {Object} config.$container 必需，轮播容器的jquery对象
 * 
 * {Object=} [config.ctrl] 可选，轮播控制器object对象，例：{ prev : $prevCtrl ,  next : $nextCtrl }
 * 
 * {Boolean=} [config.autoPlay] 可选，自动播放，默认为true
 * 
 * {Boolean=true} [config.hoverPause] 可选，是否开启鼠标移动到轮播上暂停播放，默认为false,且该属性仅在autoPlay为true时，设置才生效
 * 
 * {Number=3000} [config.delay] 可选，轮播速度，单位毫秒，默认3000
 * 
 * {Number=0} [config.direction] 可选，自动播放方向，默认为从右到左
 */
function h_carousel(config) {
    var $ctn = config.$container;
    var $li = $ctn.find("li");
    // $ctn.css("width", $li.width() * $li.length);
    $ctn.css("width", $li.outerWidth(true) * $li.length);
    var that = this;
    var direction = config.direction || 0;//默认方向 从右到左
    var delay = config.delay || 3000;//默认间隔时间3000ms
    var Timer;
    this.IsPlaying = false;
    this.gopre = function () {
        if (this.IsPlaying == true) return false;
        this.IsPlaying = true;
        var offset = ($ctn.find("li").width()) * -1;
        $ctn.css("left", offset);
        var lastItem = $ctn.find("li").last();
        $ctn.prepend(lastItem);
        var that = this;
        $ctn.animate({ left: "0px" }, "slow", function () {
            that.IsPlaying = false;
        });
    }
    this.gonext = function () {
        if (this.IsPlaying == true) return false;
        this.IsPlaying = true;
        var offset = ($ctn.find("li").width()) * -1;
        var firstItem = $ctn.find("li").first();//即将隐藏的图片
        var that = this;
        $ctn.animate({ left: offset }, "slow", function () {
            $ctn.append(firstItem);//将即将隐藏的图片插入尾部；
            $(this).css("left", "0px");
            that.IsPlaying = false;
        });
    }
    // 停止
    this.stop = function () {
        clearInterval(this.Timer);
    }
    /**
     * play
     * @param {number} direction  0|1
     * @param {number} delay 
     * @example play(0,3000)
     */
    this.play = function (direc, interval) {
        direction = direc || direction;
        delay = interval || delay;
        if (direction == 1) {
            this.Timer = window.setInterval(that.gopre, delay);
        }
        else if (direction == 0) {
            this.Timer = window.setInterval(that.gonext, delay);
        }
    }
    if (typeof config.ctrl != "undefined") {
        //如果开启自动轮播，则为控制按钮添加hover暂停事件
        if (config.autoPlay != false) {
            config.ctrl.next.hover(function () {
                that.stop()
            }, function () {
                that.play()
            });
            config.ctrl.prev.hover(function () {
                that.stop()
            }, function () {
                that.play()
            });
        }

        config.ctrl.next.on("click", that.gonext);
        config.ctrl.prev.on("click", that.gopre);
    }
    if (config.autoPlay != false) { 
        this.play(); 
        if (config.hoverPause != false) {
            $ctn.hover(function () {
                that.stop()
            }, function () {
                that.play()
            });
        }
    }
}