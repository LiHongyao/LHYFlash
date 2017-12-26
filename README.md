# LHYFlash
原生 js 轮播图组件

## 配置

| 属性            | 描述                                       |
| ------------- | ---------------------------------------- |
| id（必填）        | 依赖元素id值                                  |
| effect        | 轮播切换效果，支持 default/scroll/fade，默认为 default |
| autoPlay      | 自动切换时间，默认为3000毫秒，如果不需要自动切换，可设置其值为false。  |
| duration      | 设置图片切换持续时间                               |
| path（必填）      | 显示图片路径                                   |
| clickCallBack | 点击图片时的回调函数                               |

## 使用

```html
<div id="flash01" class="flash"></div>
<div id="flash02" class="flash"></div>
<div id="flash03" class="flash"></div>
```

```javascript
 new LHYFlash({
    id: "flash01",
    effect: "default",
    autoPlay: 5000,
    duration: 600,
    path: ["imgs/1.jpg", "imgs/2.jpg", "imgs/3.jpg", "imgs/4.jpg", "imgs/5.jpg", "imgs/6.jpg"],
    clickCallBack:function (idx) {
        console.log("点击了第" + idx + "张图片！");
    }
});


new LHYFlash({
    id: "flash02",
    effect: "scroll",
    autoPlay: 5000,
    duration: 600,
    path: ["imgs/1.jpg", "imgs/2.jpg", "imgs/3.jpg", "imgs/4.jpg", "imgs/5.jpg", "imgs/6.jpg"],
    clickCallBack:function (idx) {
        console.log("点击了第" + idx + "张图片！");
    }
});

new LHYFlash({
    id: "flash03",
    effect: "fade",
    autoPlay: 5000,
    duration: 600,
    path: ["imgs/1.jpg", "imgs/2.jpg", "imgs/3.jpg", "imgs/4.jpg", "imgs/5.jpg", "imgs/6.jpg"],
    clickCallBack:function (idx) {
        console.log("点击了第" + idx + "张图片！");
    }
});
```

## 演示地址

https://lihongyao.github.io/components/LHYFlash/index.html

