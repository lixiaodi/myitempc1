
(function () {

    var oBox = document.getElementById('box');
    var oBoxInner = oBox.getElementsByTagName('div')[0];
    var aDiv = oBoxInner.getElementsByTagName('div');
    var aImg = oBoxInner.getElementsByTagName('img');
    var oUl = oBox.getElementsByTagName('ul')[0];
    var aLi = oBox.getElementsByTagName('li');
    var oBtnLeft = oBox.getElementsByTagName('a')[0];
    var oBtnRight = oBox.getElementsByTagName('a')[1];

    var data = null;
    var step = 0;
    var timer = null;

    getData();
    function getData() {
        var xml = new XMLHttpRequest();
        xml.open('get', 'json/data.txt', false);
        xml.onreadystatechange = function () {
            if (xml.readyState == 4 && /^2\d{2}$/.test(xml.status)) {
                data = utils.jsonparse(xml.responseText);
            }
        };
        xml.send();
    }



    bind();
    function bind() {
        var strDiv = '';
        var strLi = '';
        for (var i = 0; i < data.length; i++) {
            strDiv += '<div><img realImg="' + data[i].imgSrc + '" alt=""></div>';
            strLi += 0 === i ? '<li class="on"></li>' : '<li></li>';
        }
        strDiv += '<div><img realImg="' + data[0].imgSrc + '" alt=""></div>';
        oBoxInner.innerHTML += strDiv;
        oBoxInner.style.width = aDiv.length * aDiv[0].offsetWidth + 'px';
        oUl.innerHTML += strLi;
    }


    setTimeout(lazyImg, 700);
    function lazyImg() {
        for (var i = 0; i < aImg.length; i++) {
            (function (index) {
                var curImg = aImg[index];
                var tmpImg = new Image;
                tmpImg.src = curImg.getAttribute('realImg');
                tmpImg.onload = function () {
                    curImg.src = this.src;
                    tmpImg = null;
                }
            })(i);
        }
    }


    timer = setInterval(autoMove, 2000);
    function autoMove() {
        if (step >= aDiv.length - 1) {
            step = 0;
            utils.css(oBoxInner, 'left', 0);
        }
        step++;
        animate(oBoxInner, {left: -step * 1000},700);
        bannerTip()
    }


    function bannerTip() {
        var tmpStep = step >= aLi.length ? 0 : step;
        for (var i = 0; i < aLi.length; i++) {
            aLi[i].className = i == tmpStep ? 'on' : null;
        }
    }


    oBox.onmousemove = function () {
        clearInterval(timer);
        oBtnLeft.style.display = 'block';
        oBtnRight.style.display = 'block';

    };

    oBox.onmouseout = function () {
        timer = setInterval(autoMove, 2000);
        oBtnLeft.style.display = 'none';
        oBtnRight.style.display = 'none';

    };


    handleChange();
    function handleChange() {
        for (var i = 0; i < aLi.length; i++) {
            aLi[i].index = i;
            aLi[i].onclick = function () {
                step = this.index;
                animate(oBoxInner, {left: -step * 1000},700);
                bannerTip();
            }
        }
    }


    oBtnRight.onclick = autoMove;
    oBtnLeft.onclick = function () {
        if (step <= 0) {
            step = aDiv.length - 1;
            utils.css(oBoxInner, 'left', -step * 1000);
        }
        step--;
        animate(oBoxInner, {left: -step * 1000});
        bannerTip();

    }


})();
