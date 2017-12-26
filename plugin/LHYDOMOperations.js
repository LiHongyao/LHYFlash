{
    let LHYDOMOperations = function () {
        
    };

    LHYDOMOperations.prototype = {
        /**
         * 事件添加（兼容IE浏览器）
         * @param el        事件对象
         * @param type      事件类型
         * @param callBack  事件回调（监听函数）
         */
        addEvent(el, type, callBack) {
            if (el.attachEvent) {
                el.attachEvent('on' + type, callBack);
            } else {
                el.addEventListener(type, callBack, false);
            }
        },
        /**
         * 移除事件监听（兼容IE浏览器）
         * @param el        事件对象
         * @param type      事件类型
         * @param callBack  事件回调（监听函数）
         */
        removeEvent(el, type, callBack) {
            if (el.detachEvent) {
                el.detachEvent('on' + type, callBack);
            } else {
                el.removeEventListener(type, callBack, false);
            }
        }
        ,
        /**
         * 获取非行内样式
         * @param el     目标元素节点
         * @param attr   对应属性键（key）
         * @returns {*}  对应属性值（value）
         */
        getStyle(el, attr) {
            // 兼容IE
            if (el.currentStyle) {
                return el.currentStyle[attr];
            } else {
                return getComputedStyle(el, null)[attr];
            }
        },
        /**
         * 扩展对象属性
         * @param oldObj  旧对象
         * @param newObj  新对象
         * @returns {*}   合成属性之后的旧对象
         */
        extend(oldObj, newObj) {
            for (let key in newObj) {
                oldObj[key] = newObj[key];
            }
            return oldObj;
        },
        /**
         * DOM 元素节点查询
         * @param Sel    CSS选择器，目前接受id、class及标签查询
         * @returns {*}  查询目标节点
         */
        get(Sel) {
            // 异常处理
            if (typeof Sel != 'string' || Sel == '' || /\s/.test(Sel) == true) {
                return null;
            }
            if (/^#/.test(Sel)) {
                return document.getElementById(Sel.slice(1));
            }
            if (/^\./.test(Sel)) {
                return document.getElementsByClassName(Sel.slice(1));
            }
            return document.getElementsByTagName(Sel);
        },
        /**
         * 回到顶部
         * @param options 配置参数
         * options -> {
         *   el： 触发元素节点
         *   duration: 持续时间
         *   pageScroll：页面滚动回调
         *   compete：回到顶部结束回调
         * }
         */
        scrollToTop(options) {
            let configs = {
                el: "",
                duration: 1000,
                pageScroll: "",
                complete: ""
            };
            options && this.extend(configs, options);
            let offset = null,
                interval = 15,
                duration = configs.duration,
                speed = null,
                timer = null;

            this.addEvent(window, "scroll", () => {
                offset = document.body.scrollTop || document.documentElement.scrollTop;
                configs.pageScroll && configs.pageScroll(offset);
            });

            this.addEvent(configs.el, "click", () => {
                speed = Math.ceil(offset / (duration / interval));
                timer = setInterval(() => {
                    if (offset > 0) {
                        document.body.scrollTop = document.documentElement.scrollTop = offset - speed;
                    } else {
                        clearInterval(timer);
                        document.body.scrollTop = document.documentElement.scrollTop = 0;
                        configs.complete && configs.complete();
                    }
                }, interval);
            });
        },
        /**
         * 将location.search转换为对象类型
         * @param searchStr location.search 值
         * @returns {*}     对象
         */
        convertSearch(searchStr) {
            // 异常处理
            if (!searchStr) {
                return null;
            }else {
                let str = searchStr.slice(1);
                let strArr = str.split('&');
                let obj = {};
                strArr.forEach(item => {
                    let arr = item.split('=');
                    let key = decodeURI(arr[0]);
                    let val = decodeURI(arr[1]);
                    obj[key] = val;
                });
                return obj;
            }
        }

    };
    window.$ = new LHYDOMOperations();
}





























































































