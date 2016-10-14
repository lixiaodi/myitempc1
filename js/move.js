
(function () {

    var zhufengEffect = {
        Linear: function (t, b, c, d) {
            return c * t / d + b;
        },
    };


    function move(curEle, target, duration, effect, callback) {
        var tmpEffect = zhufengEffect.Linear;
        var ary = ["Linear", "Elastic-easeOut", "Back-easeOut", "Bounce-easeOut", "Expo-easeIn"];
        if (typeof effect === 'number') {
            var str = ary[effect % ary.length];
            ary = str.split('-');
            tmpEffect = ary.length >= 2 ? zhufengEffect[ary[0]][ary[1]] : zhufengEffect[ary[0]];
        } else if (typeof effect === 'object') {
            tmpEffect = effect.length >= 2 ? zhufengEffect[effect[0]][effect[1]] : zhufengEffect[effect[0]];
        } else if (typeof effect === 'function') {
            callback = effect
        }

        var begin = {};
        var change = {};

        for (var attr in target) {
            begin[attr] = utils.css(curEle, attr);
            change[attr] = target[attr] - begin[attr];
        }

        duration = duration || 1000;
        var time = 0;
        clearInterval(curEle.timer);

        curEle.timer = setInterval(function () {
            time += 10;

            if (time >= duration) {
                utils.css(curEle, target);
                clearInterval(curEle.timer);
                callback && callback.call(curEle);
                return;
            }

            for (var attr in target) {
                var curPos = tmpEffect(time, begin[attr], change[attr], duration);
                utils.css(curEle, attr, curPos)
            }
        }, 10)
    }

    window.animate = move;

})();