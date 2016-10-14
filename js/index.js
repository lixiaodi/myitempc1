/*-----------------------------轮播图--------------------------------*/
//大banner轮播
var bannerUl = document.getElementById('bigBanner');
var oLis = bannerUl.getElementsByTagName('div');
var bannerDiv = document.getElementById('banner-wrap');

bannerDiv.onmouseover = function () {
    clearInterval(Carousel);
};
bannerDiv.onmouseout = function () {
    Carousel = setInterval("nextBanner('next')", 3000);
};
var oBtns = document.getElementById('bannerBtn').getElementsByTagName('a');
for (var i = 0; i < oBtns.length; i++) {
    oBtns[i].index = i;
    oBtns[i].onmouseover = function () {
        for (var i = 0; i < oBtns.length; i++) {
            oBtns[i].className = null;
            oLis[i].className = null;
            if (this.index == i) {
                oBtns[i].className = 'active';
                oLis[this.index].className = 'active';
            }
        }
    }
}
var leftBtn = document.getElementById('previousImg');
var rightBtn = document.getElementById('nextImg');
leftBtn.onclick = function () {
    nextBanner('previous');
};

rightBtn.onclick = function () {
    nextBanner('next');
};

function nextBanner(type) {
    for (var i = 0; i < oBtns.length; i++) {
        if (oBtns[i].classList.contains('active')) {
            oBtns[i].classList.remove('active');
            if (type == 'next') {
                var index = (i + 1) == oBtns.length ? 0 : i + 1;
            }
            else {
                var index = i == 0 ? oBtns.length - 1 : i - 1;
            }
            oBtns[index].className = 'active';
            oLis[i].className = null;
            oLis[index].className = 'active';
            break;
        }
    }
}

var Carousel = setInterval("nextBanner('next')", 3000);
















