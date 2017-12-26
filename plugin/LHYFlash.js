
;(function ($) {

    var LHYFlash = function (options) {
        /**
         * 默认配置
         * @type {{id: string, effect: string, autoPlay: number, duration: number, path: Array}}
         */
        this.config = {
            id: "",
            effect: "default",
            autoPlay: 3000,
            duration: 600,
            path: [],
            clickCallBack: ""
        }
        /**
         * 扩展默认配置
         */
        options && this.extend(this.config, options);
        /**
         * 属性变量定义
         * @type {LHYFlash}
         * @private
         */
        var _this   = this;

        this.prevBtn     = null;
        this.nextBtn     = null;
        this.flash       = null;
        this.idots       = null;
        this.imgs        = null;
        this.imgWrap     = null;
        this.timer       = null;
        this.imgCount    = this.config.path.length;
        this.parentNode  = document.getElementById(this.config.id);
        this.imgWidth    = this.parentNode.offsetWidth;
        this.curImgIdx   = 0;
        this.isAnimating = false;

        /**
         * 初始化
         */
        this.init();

        /**
         * 事件添加
         */
        this.nextBtn && this.addEvent(this.nextBtn, "click", this.clickNext.bind(this));
        this.prevBtn && this.addEvent(this.prevBtn, "click", this.clickPrev.bind(this));
        /*小圆点事件添加*/
        for(var i = 0, len = this.idots.length; i < len; i++) {
            this.idots[i].dataset.idx = i;
            this.addEvent(this.idots[i], "click", function (e) {
                e = e || event;
                var idx = e.target.dataset["idx"];
                if(idx == this.curImgIdx || this.isAnimating) {
                    return;
                }
                // offset = -(des - cur) * this.imgWidth
                var offset = _this.config.effect == "scroll" ? -(idx - _this.curImgIdx) * _this.imgWidth : 0;
                _this.curImgIdx = idx;
                _this.switchImg(offset);
                _this.switchIdot();
            });
        }
        /*图片事件添加*/
        for(var i = 0, len = this.imgs.length; i < len; i++) {
            this.addEvent(this.imgs[i], "click", function (e) {
                _this.config.clickCallBack && _this.config.clickCallBack(_this.curImgIdx);
            });
        }

        /**
         * 自动播放
         */
        if(this.config.autoPlay && !isNaN(this.config.autoPlay)) {
            this.play();
        }
        this.addEvent(this.flash, "mouseenter", this.stop.bind(this));
        this.addEvent(this.flash, "mouseleave", this.play.bind(this));
    };

    LHYFlash.prototype = {
        init: function () {
            /*定义变量*/
            var imgTags    = "",
                idotTags   = "",
                config     = this.config,
                length     = config.effect == "scroll" ?  this.imgCount + 2 : this.imgCount,
                left       = config.effect == "scroll" ? -this.imgWidth : 0,
                parentNode = this.parentNode;
            /*创建图片标签*/
            for(var i = 0, len = this.imgCount; i < length; i++) {
                imgTags  += "<lhy-img></lhy-img>";
                if(i < len) {
                    idotTags += "<lhy-idot></lhy-idot>";
                }
            }
            /*创建轮播图标签*/
            var htmlStr =
                      "<lhy-flash class='lhy-flash'>" +
                      "<lhy-imgs class='lhy-flash-img-wrap'>"  + imgTags  + "</lhy-imgs>"  +
                      "<lhy-idots>" + idotTags + "</lhy-idots>" +
                      "<lhy-btns>"  +
                          "<lhy-btn class='lhy-flash-prev-btn'></lhy-btn>" +
                          "<lhy-btn class='lhy-flash-next-btn'></lhy-btn>" +
                      "</lhy-btns>" +
                      "</lhy-flash>";
            /*初始化属性*/
            this.parentNode.innerHTML = htmlStr;
            this.imgs    = parentNode.getElementsByTagName("lhy-img");
            this.idots   = parentNode.getElementsByTagName("lhy-idot");
            this.prevBtn = parentNode.getElementsByClassName("lhy-flash-prev-btn")[0];
            this.nextBtn = parentNode.getElementsByClassName("lhy-flash-next-btn")[0];
            this.imgWrap = parentNode.getElementsByClassName("lhy-flash-img-wrap")[0];
            this.flash   = parentNode.getElementsByClassName("lhy-flash")[0];


            /*样式初始化*/
            switch (config.effect) {
                case "default": {
                    this.imgWrap.classList.add("default");
                    this.imgs[0].classList.add("lhy-show");
                }break;
                case  "scroll": {
                    this.imgWrap.classList.add("scroll");
                    this.imgWrap.style.cssText = "left:" + left + "px; width:" + (this.imgWidth * length) + "px";
                }break;
                case  "fade": {
                    this.imgWrap.classList.add("fade");
                    this.imgs[0].classList.add("lhy-show");
                }break;
            }
            this.idots[0].className = "lhy-active";


            /*图片设置*/
            var cssText   = "";
            for(var i = 0; i < length; i++) {
                if(config.effect == "scroll") {
                    switch (i) {
                        case 0: {
                            cssText = "background:url('" + this.config.path[this.imgCount - 1] + "');";
                        }break;
                        case (length - 1): {
                            cssText = "background:url('" + this.config.path[0] + "');";
                        }break;
                        default: {
                            cssText = "background:url('" + this.config.path[i - 1] + "');";
                        }
                    }
                }else {
                    cssText = "background:url('" + this.config.path[i] + "');";
                    if(config.effect == "fade") {
                        cssText += "transition: opacity " + (config.duration/1000).toFixed(2) + "s linear";
                    }
                }
                this.imgs[i].style.cssText = cssText;
            }
        },
        /**
         * 扩展对象属性
         * @param oldObj 旧对象
         * @param newObj 新对象
         * @returns {*}  扩展之后的旧对象
         */
        extend: function(oldObj, newObj) {
            var key = null;
            for (key in newObj) {
                oldObj[key] = newObj[key];
            }
            return oldObj;
        },
        /**
         * 事件添加
         * @param el       事件对象
         * @param type     事件类型
         * @param callBack 事件监听函数
         */
        addEvent: function(el, type, callBack) {
            if (el.attachEvent) {
                el.attachEvent('on' + type, callBack);
            } else {
                el.addEventListener(type, callBack, false);
            }
        },
        /**
         * 点击下一页按钮
         */
        clickNext: function () {
            if(this.isAnimating) {
                return;
            }
            this.curImgIdx = this.curImgIdx == this.imgCount - 1 ? 0 : ++this.curImgIdx;
            this.switchImg(- this.imgWidth);
            this.switchIdot();
        },
        /**
         * 点击上一页按钮
         */
        clickPrev: function() {
            if(this.isAnimating) {
                return;
            }
            this.curImgIdx = this.curImgIdx == 0 ? this.imgCount - 1 : --this.curImgIdx;
            this.switchImg(this.imgWidth);
            this.switchIdot();
        },
        /**
         * 播放
         */
        play: function () {
            var _this = this;
            _this.timer = setInterval(function () {
                _this.clickNext();
            }, parseInt(_this.config.autoPlay));
        },
        /**
         * 停止
         */
        stop: function () {
            clearInterval(this.timer);
            this.timer = null;
        },
        /**
         * 切换图片
         * @param offset 偏移量
         */
        switchImg: function (offset) {
            switch (this.config.effect) {
                // 默认切换效果
                case "default": case "fade" : {
                    var imgs = this.imgs;
                    for(var i = 0, len = imgs.length; i < len; i++) {
                        if(imgs[i].classList.contains("lhy-show")) {
                            imgs[i].classList.remove("lhy-show");
                            break;
                        }
                    }
                    imgs[this.curImgIdx].classList.add("lhy-show");
                }break;
                // 滚动切换效果
                case "scroll": {
                    var _this    = this,
                        imgWrap  = _this.imgWrap,
                        duration = _this.config.duration,
                        interval = 15,
                        frames   = duration / interval,
                        speed    = Math.ceil(offset / frames),
                        curLeft  = imgWrap.offsetLeft,
                        desLeft  = curLeft + offset;
                    _this.isAnimating = true;
                    var t = setInterval(function () {
                        curLeft = imgWrap.offsetLeft;
                        if((offset < 0 && curLeft > desLeft)||(offset > 0 && curLeft < desLeft)) {
                            imgWrap.style.left = curLeft + speed + "px";
                        }else {
                            clearInterval(t); t = null;
                            imgWrap.style.left = desLeft + "px";
                            _this.isAnimating = false;
                            // 重置
                            var maxLeft     = _this.config.effect == "scroll" ? -_this.imgWidth : 0,
                                minLeft     = _this.config.effect == "scroll" ? -_this.imgWidth * _this.imgCount : -_this.imgWidth * (_this.imgCount - 1);
                            if(imgWrap.offsetLeft < minLeft) {
                                imgWrap.style.left = maxLeft + "px";
                            }else if(imgWrap.offsetLeft > maxLeft) {
                                imgWrap.style.left = minLeft + "px";
                            }
                        }
                    }, interval);
                }break;
            }
        },
        /**
         * 切换小圆点
         */
        switchIdot: function () {
            for(var i = 0, len = this.imgCount; i < len; i++) {
                if(this.idots[i].classList.contains("lhy-active")) {
                    this.idots[i].classList.remove("lhy-active");
                    break;
                }
            }
            this.idots[this.curImgIdx].classList.add("lhy-active");
        }
    };

    $.LHYFlash = LHYFlash;
})(window);











