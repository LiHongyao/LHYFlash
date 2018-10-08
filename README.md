# # 使用指南

*.html 文件

```html
<!DOCTYPE html>
<html lang="zh-Hans">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>轮播图滚动封装效果演示</title>
    <link rel="stylesheet" href="./plugins/lhy-flash.css">
    <link rel="stylesheet" href="./css/index.css">
</head>
<body>
    <!-- 显示轮播图容器 -->
    <div id="flash-box"></div>

    <script src="./plugins/lhy-flash.js"></script>
    <script src="./js/index.js"></script>
</body>
</html>
```

*.js 文件

```js
(function() {
    var flash = new LHYFlash({
        id: "flash-box",
        imgs: [
            "./images/01.jpg",
            "./images/02.jpg",
            "./images/03.jpg",
            "./images/04.jpg",
            "./images/05.jpg",
            "./images/06.jpg",
        ]
    });
    console.log(flash);
})();
```

# # 参数解读

| 参数         | 描述                        | 数据类型     | 备注   |
| ---------- | ------------------------- | -------- | ---- |
| id         | 显示轮播图的容器id值               | String   | 必需   |
| imgs       | 图片名字集合（注：图片路径集合）          | Array    | 必需   |
| interval   | 轮播图切换时间间隔                 | Number   | 可选   |
| effect     | 轮播效果（default/fade/scroll） | String   | 可选   |
| duration   | 动画切换持续时间                  | Number   | 可选   |
| clickSlide | 点击轮播模块                    | Function | 可选   |

# # 类名解读

| 类名                          | 描述        |
| --------------------------- | --------- |
| . lhy-flash-wrapper         | 图片显示容器    |
| . lhy-flash-slide           | 轮播图内容模块   |
| . lhy-flash-pagination-item | 分页指示器     |
| . lhy-flash-pagination      | 分页指示器容器   |
| . lhy-flash-prev-btn        | 切换按钮（上一页） |
| . lhy-flash-last-btn        | 切换按钮（下一页） |

> 注：切换按钮用的是阿里矢量图（iconfont）字体图片，箭头颜色及大小可像设置字体样式一样设置。

# # 开发者注

该插件会持续更新和完善，如有bug或更好建议，可联系我：

TEL：15228885771

EMAIL：lihy_online@163.com

或直接提出issue，谢谢！



