(function() {
    // 轮播图1
    new LHYFlash({
        id: "flash1",
        effect: "default",
        imgs: [
            "./images/01.jpg",
            "./images/02.jpg",
            "./images/03.jpg",
            "./images/04.jpg",
            "./images/05.jpg",
            "./images/06.jpg",
        ]
    });
    // 轮播图2
    new LHYFlash({
        id: "flash2",
        effect: "fade",
        imgs: [
            "./images/01.jpg",
            "./images/02.jpg",
            "./images/03.jpg",
            "./images/04.jpg",
            "./images/05.jpg",
            "./images/06.jpg",
        ]
    });
    // 轮播图
    new LHYFlash({
        id: "flash3",
        effect: "scroll",
        imgs: [
            "./images/01.jpg",
            "./images/02.jpg",
            "./images/03.jpg",
            "./images/04.jpg",
            "./images/05.jpg",
            "./images/06.jpg",
        ]
    });
})();