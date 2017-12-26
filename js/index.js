



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








