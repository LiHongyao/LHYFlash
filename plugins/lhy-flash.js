class LHYFlash {
    // options：可选项/用户自定义参数
    /*
    {
        id：轮播图容器
        imgs: 图片名字集合
        interval: 轮播图切换时间间隔
        effect：轮播效果（default/fade/scroll）
        duration：动画切换持续时间
        clickSlide: 点击轮播图片回调
    }*/
    constructor(options) {
        // 1. 异常处理
        if(!options.id || !options.imgs) { 
            throw "LHYFlash: missing ‘id’ or ‘imgs’ parameter." 
        }
        // 2. 默认参数设置
        this.interval   = options.interval   || 3000;
        this.duration   = options.duration   || 500;
        this.effect     = options.effect     || "default";
        this.clickSlide = options.clickSlide || function() {};
        // 3. 加载元素
        this.container = document.getElementById(options.id);
        this.imgs      = options.imgs;
        this.length    = this.imgs.length;
        this.loadingFlash();
        // 4. 设置相关属性
        // > 图片显示容器
        this.wrapper    = this.container.querySelector('.lhy-flash-wrapper');
        // > 轮播内容模块
        this.slides     = Array.from(this.container.querySelectorAll('.lhy-flash-slide'));
        // > 下一页按钮
        this.nextBtn    = this.container.querySelector('.lhy-flash-next-btn');
        // > 上一页按钮
        this.prevBtn    = this.container.querySelector('.lhy-flash-prev-btn');
        // > 分页指示器集合
        this.paginationItems = Array.from(this.container.querySelectorAll('.lhy-flash-pagination-item'));
        // > 当前显示下标
        this.curIndex    = 1;
        // > 轮播定时器
        this.timer       = null;
        this.isAnimating = false;

        // 5. 默认样式
        // 相对定位，便于子视图绝对定位
        this.container.style.position = "relative";
        // 默认将第一个小圆点设置为显示状态
        this.paginationItems[0].classList.add('show');
        // 记录LHYPage实例
        var _this = this;
        // 默认系显示轮播内容
        if(this.effect === "scroll") {
            _this.container.style.overflow = "hidden";
            _this.updateSizeForScroll();
        }else {
            this.slides[0].classList.add('show');
        }
        // 6. 监听窗口
        window.onresize = function() {
            if(_this.effect === "scroll") {
                _this.updateSizeForScroll()
            }else {
                _this.container.style.height = _this.wrapper.offsetHeight + "px";
            }
        };
        window.onload = function() {
            _this.container.style.height = _this.wrapper.offsetHeight + "px";
        };
        // 7. 左右切换
        this.nextBtn.onclick = function() {
            if(_this.effect === "scroll" && _this.isAnimating === true) { return; }
            if(_this.curIndex == _this.length) {
                _this.curIndex = 1;
            }else {
                _this.curIndex++;
            }
            _this.tab(-_this.width);
            _this.updatePaginationItems();
        };
        this.prevBtn.onclick = function() {
            if(_this.effect === "scroll" && _this.isAnimating === true) { return; }
            if(_this.curIndex == 1) {
                _this.curIndex = _this.length;
            }else {
                _this.curIndex--;
            }
            _this.tab(_this.width);
            _this.updatePaginationItems();
        };
        // 8. 点击小圆点切换
        this.paginationItems.forEach(function(paginationItem, index) {
            paginationItem.dataset.index = index + 1;
            paginationItem.onclick = function(event) {
                event = event || e;
                var index = parseInt(event.target.dataset.index);
                if(_this.curIndex == index || (_this.effect === "scroll" && _this.isAnimating === true)) {
                    return;
                }
                if(_this.effect === "scroll") {
                    var offset = (index - _this.curIndex) * -_this.width;
                    _this.tab(offset);
                    _this.curIndex = index;
                    
                }else {
                    _this.curIndex = index;
                    _this.tab(offset);
                }
                _this.updatePaginationItems();
               
            };
        });
        // 9. 自动播放
        this.autoPlay();
        this.container.onmouseenter = this.stop.bind(this);
        this.container.onmouseleave = this.autoPlay.bind(this);
    }
    // 布局html结构
    loadingFlash() {
        var _this = this;
        var htmlStr = `
            <div class="${(function() {
                switch(_this.effect) {
                    case "scroll" : {return "lhy-flash-wrapper scroll"} break;
                    case "fade" : {return "lhy-flash-wrapper fade"} break;
                    case "default" : {return "lhy-flash-wrapper default"} break;
                }
            })()}">${(function(){
                // 显示图片，需做特殊处理，如果是滚动效果，则首尾需做特殊处理
                var slideArr = [];
                _this.imgs.forEach(function(imageName) {
                    slideArr.push(`<div class="lhy-flash-slide" ${(function() {
                        if(_this.effect === "fade") {
                            return `style="transition:opacity ${_this.duration / 1000}s linear"`;
                        }else {
                            return "";
                        }
                    })()}><img src="${imageName}" alt="图片加载失败..."></div>`);
                });
                // 处理首尾
                if(_this.effect === "scroll") {
                    slideArr.unshift(`<div class="lhy-flash-slide"><img src="${_this.imgs[_this.length - 1]}" alt="图片加载失败..."></div>`);
                    slideArr.push(`<div class="lhy-flash-slide"><img src="${_this.imgs[0]}" alt="图片加载失败..."></div>`);
                }
                return slideArr.join("");
            })()}</div>
            <div class="lhy-flash-pagination">${(function() {
                var paginationStr = "";
                for(var i = 0, len = _this.length; i < len; i++) {
                    paginationStr += "<span class='lhy-flash-pagination-item'></span>"
                }
                return paginationStr;
            })()}</div>
            <div class="lhy-flash-prev-btn">&#xe75b;</div>
            <div class="lhy-flash-next-btn">&#xe75c;</div>
        `;
        this.container.innerHTML = htmlStr;
    }
    // 初始化数据
    updateSizeForScroll() {
        var _this = this;
        // 1. 获取容器宽度
        this.width = this.container.offsetWidth;
        // 2. 更新lhy-flash-wrapper宽度
        this.wrapper.style.width = this.width * this.slides.length + "px";
        // 3. 更新lhy-flash-slide宽度
        this.slides.forEach(function(slide) {
            slide.style.width = _this.width + "px";
        });
        // 4. 更新容器高度
        this.container.style.height = this.wrapper.offsetHeight + "px";
        // 5. 更新偏移
        this.wrapper.style.left = -this.width + "px"; 
    }
    // 切换显示
    tab(offset) {
        if(this.effect === "scroll") {
            this.isAnimating = true;
            var curLeft  = parseInt(this.getStyle(this.wrapper, "left"));
            var desLeft  = curLeft + offset;
            var duration = 500;
            var interval = 10;
            var frames   = duration / interval;
            var speed    = offset / frames;
            var _this    = this;
            speed        = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            var timer    = setInterval(function() {
                curLeft  = parseInt(_this.getStyle(_this.wrapper, "left"));
                if((offset > 0 && curLeft <= desLeft) || (offset < 0 && curLeft >= desLeft)) {
                    _this.wrapper.style.left = curLeft +  speed + "px";
                }else {
                    clearInterval(timer);
                    _this.isAnimating = false;
                    _this.wrapper.style.left = desLeft + "px";
                    if(desLeft < -_this.length * _this.width) {
                        _this.wrapper.style.left = -_this.width + "px";
                    }else if(desLeft > -_this.width) {
                        _this.wrapper.style.left =  -_this.length * _this.width  + "px";
                    }
                }
            }, interval);
        }else {
            for(var i = 0, len = this.length; i < len; i++) {
                if(this.slides[i].classList.contains('show')) {
                    this.slides[i].classList.remove('show');
                    break;
                }
            }
            this.slides[this.curIndex - 1].classList.add('show');
        }
    }
    // 更新分页显示
    updatePaginationItems() {
        for(var i = 0, len = this.length; i < len; i++) {
            if(this.paginationItems[i].classList.contains('show')) {
                this.paginationItems[i].classList.remove('show');
                break;
            }
        }
        this.paginationItems[this.curIndex - 1].classList.add('show');
    }
    getStyle(el, attr) {
        // 兼容IE
        if (el.currentStyle) {
            return el.currentStyle[attr];
        } else {
            return getComputedStyle(el, null)[attr];
        }
    }
    // 自动播放
    autoPlay() {
        var _this = this;
        this.timer = setInterval(function() {
            _this.nextBtn.onclick();
        }, this.interval);
    }
    // 暂停播放
    stop() {
        clearInterval(this.timer);
    }
};



