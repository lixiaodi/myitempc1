var utils = (function () {
    var flag = 'getComputedStyle' in window;

    function makeArray(arg) {

        var ary = [];
        try {

            ary = Array.prototype.slice.call(arg);
        } catch (e) {

            for (var i = 0; i < arg.length; i++) {

                ary.push(arg[i]);
            }
        }
        return ary;
    }

    function jsonparse(str) {
        return 'JSON' in window ? JSON.parse(str) : eval('(' + str + ')');
    }

    function offset(curEle) {
        var l = curEle.offsetLeft;
        var t = curEle.offsetTop;
        var par = curEle.offsetParent;
        while (par) {
            if (navigator.userAgent.indexOf('MSIE 8.0') === -1) {
                l += par.clientLeft;
                t += par.clientTop;
            }
            l += par.offsetLeft;
            t += par.offsetTop;
            par = par.offsetParent;
        }
        return {left: l, top: t}
    }

    function win(attr, value) {

        if (typeof value == 'undefined') {

            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = document.body[attr] = value;
    }

    function rnd(n, m) {

        n = Number(n);
        m = Number(m);

        if (isNaN(n) && isNaN(m)) {

            return Math.random();
        }
        if (n > m) {

            var temp = m;
            m = n;
            n = temp;
        }
        return Math.round(Math.random() * (m - n) + n);
    }

    function getByClass(strClass, parent) {
        parent = parent || document;
        if (flag) {
            return Array.prototype.slice.call(parent.getElementsByClassName(strClass));
        }
        var aryClass = strClass.replace(/(^ +)|( +$)/g, '').split(/\s+/g);
        var nodeList = parent.getElementsByTagName('*');
        var ary = [];
        for (var i = 0; i < nodeList.length; i++) {

            var curEle = nodeList[i];
            var bOk = true;
            for (var j = 0; j < aryClass.length; j++) {

                var reg = new RegExp('\\b' + aryClass[j] + '\\b');
                if (!reg.test(curEle.className)) {
                    bOk = false;
                    break;
                }
            }
            if (bOk) {

                ary[ary.length] = curEle;
            }
        }
        return ary;
    }

    function hasClass(curEle, cName) {

        var reg = new RegExp('(^| +)' + cName + '( +|$)');
        return reg.test(curEle.className);
    }

    function addClass(curEle, strClass) {

        var aryClass = strClass.replace(/(^ +)|( +$)/g, '').split(/\s+/g);

        for (var i = 0; i < aryClass.length; i++) {

            var curClass = aryClass[i];

            //如果元素身上没有这个class名的话，我们才添加这个class名；
            if (!this.hasClass(curEle, curClass)) {

                curEle.className += ' ' + curClass;
            }
        }
    }

    function removeClass(curEle, strClass) {

        var aryClass = strClass.replace(/(^ +)|( +$)/g, '').split(/\s+/g);
        for (var i = 0; i < aryClass.length; i++) {

            var reg = new RegExp('(^| +)' + aryClass[i] + '( +|$)');


            if (this.hasClass(curEle, aryClass[i])) {

                curEle.className = curEle.className.replace(reg, ' ').replace(/(^ +)|( +$)/g, '').replace(/\s+/g, ' ');

            }
        }
    }

    function getCss(curEle, attr) {
        var val = null;
        var reg = null;
        if ('getComputedStyle' in window) {
            val = getComputedStyle(curEle, false)[attr];
        } else {
            if (attr === 'opacity') {
                val = curEle.currentStyle.filter;//'alpha(opacity=10)'
                reg = /^alpha\(opacity[=:](\d+)\)$/i;
                return reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = curEle.currentStyle[attr];
            }
        }
        reg = /^([+-])?(\d+(\.\d+)?(px|pt|rem|em))$/i;
        return reg.test(val) ? parseFloat(val) : val;
    }

    function setCss(curEle, attr, value) {

        if (attr == 'float') {

            curEle.style.cssFloat = value;
            curEle.style.styleFloat = value;
            return;
        }
        if (attr == 'opacity') {

            curEle.style.opacity = value;
            curEle.style.filter = 'alpha(opacity=' + (value * 100) + ')';
            return;
        }
        var reg = /^(width|height|top|right|bottom|left|((margin|padding)(top|right|bottom|left)?))$/i;
        if (reg.test(attr)) {
            if (!(value === 'auto' || value.toString().indexOf('%') !== -1)) {
                value = parseFloat(value) + 'px';
            }
        }
        curEle.style[attr] = value;
    }

    function setGroupCss(curEle, opt) {

        for (var attr in opt) {

            this.setCss(curEle, attr, opt[attr]);
        }
    }

    function css(curEle) {

        var arg2 = arguments[1];
        if (typeof arg2 === 'string') {

            var arg3 = arguments[2];
            if (arg3 == undefined) {

                return this.getCss(curEle, arg2);
            } else {

                this.setCss(curEle, arg2, arg3)
            }
        }
        if (arg2.toString() === '[object Object]') {

            this.setGroupCss(curEle, arg2);
        }
    }

    function getChildren(curEle, tagName) {

        var nodeList = curEle.childNodes;
        var ary = [];
        for (var i = 0; i < nodeList.length; i++) {

            var cur = nodeList[i];

            if (cur.nodeType == 1) {

                if (tagName !== undefined) {

                    if (cur.tagName.toLowerCase() == tagName.toLowerCase()) {

                        ary.push(cur);
                    }
                } else {

                    ary.push(cur);
                }
            }

        }
        return ary;
    }

    function prev(curEle) {

        if (flag) {

            return curEle.previousElementSibling;
        }

        var pre = curEle.previousSibling;
        while (pre && pre.nodeType !== 1) {

            pre = pre.previousSibling;
        }
        return pre;
    }

    function prevAll(curEle) {

        var pre = this.prev(curEle);
        var ary = [];

        while (pre) {

            ary.push(pre);
            pre = this.prev(pre);
        }
        return ary;
    }

    function next(curEle) {

        if (flag) {

            return curEle.nextElementSibling;
        }

        var nex = curEle.nextSibling;
        while (nex && nex.nodeType !== 1) {

            nex = nex.nextSibling;
        }
        return nex;
    }

    function nextAll(curEle) {

        var nex = this.next(curEle);
        var ary = [];

        while (nex) {

            ary.push(nex);
            nex = this.next(nex);
        }
        return ary;
    }

    function sibling(curEle) {

        var ary = [];
        var pre = this.prev(curEle);
        var nex = this.next(curEle);

        if (pre) ary.push(pre);
        if (nex) ary.push(nex);
        return ary;
    }

    function siblings(curEle) {

        var ary1 = this.nextAll(curEle);
        var ary2 = this.prevAll(curEle);

        return ary1.concat(ary2);
    }

    function firstChild(curEle) {

        var childs = this.getChildren(curEle);
        return childs[0];
    }

    function lastChild(curEle) {

        var childs = this.getChildren(curEle);

        return childs[childs.length - 1];
    }

    function index(curEle) {

        return this.prevAll(curEle).length;
    }

    function appendChild(parent, curEle) {
        parent.appendChild(curEle);
    }

    function prependChild(parent, curEle) {
        var first = this.firstChild(parent);
        //查看父容器下是否有第一个子元素，如果有第一个子元素，插入第一个子元素的前面
        if (first) {
            parent.insertBefore(curEle, first);
        } else {
            parent.appendChild(curEle);
        }
    }

    function insertBefore(newEle, oldEle) {
        oldEle.parentNode.insertBefore(newEle, oldEle);
    }

    function insertAfter(newEle, oldEle) {
        var nex = this.next(oldEle);
        if (nex) {
            oldEle.parentNode.insertBefore(newEle, nex);
        } else {
            oldEle.parentNode.appendChild(newEle);
        }
    }

    return {
        //1-->jsonParse：把JSON格式的字符串转成JSON格式的数据
        jsonparse: jsonparse,
        //2-->rnd:取一定返回的随机整数
        rnd: rnd,
        //3-->makeArray:类数组转数组
        makeArray: makeArray,
        //4-->在一定范围内，通过class名获取元素
        getByClass: getByClass,
        //5-->hasClass:检查元素身上是否有某个class名
        hasClass: hasClass,
        //6-->addClass:给元素身上添加一组class名； 添加时：先判断没有，才添加
        addClass: addClass,
        //7-->removeClass:删除元素身上的一组class名
        removeClass: removeClass,
        //8-->getCss:获取元素的非行间样式；
        getCss: getCss,
        //9-->setCss:设置一个样式
        setCss: setCss,
        //10-->setGroupCss:给元素身上设置一组样式
        setGroupCss: setGroupCss,
        //11-->css:可以获取和设置的三种方法合为一体；
        css: css,
        //12-->offset:盒子模型的偏移量
        offset: offset,
        //13-->win:浏览器盒子模型兼容
        win: win,
        //14-->getChildren:获取当前元素下，所有子元素，并且可以通过元素标签筛选
        getChildren: getChildren,
        //15-->prev:上一个哥哥元素
        prev: prev,
        //16-->prevAll:所有的哥哥元素
        prevAll: prevAll,
        //17-->next:下一个弟弟元素
        next: next,
        //18-->nextAll：所有的弟弟元素
        nextAll: nextAll,
        //19-->sibling：上一个哥哥+下一个弟弟 组成一个数组
        sibling: sibling,
        //20-->siblings:所有的哥哥+所有的弟弟；
        siblings: siblings,
        //21-->firstChild:第一个子元素
        firstChild: firstChild,
        //22-->lastChild：最后一个子元素
        lastChild: lastChild,
        //23-->index：有多少个哥哥就排行第几；
        index: index,
        //24-->appendChild当前元素插入到父容器的末尾；
        appendChild: appendChild,
        //25-->当前元素插入到父容器的最开始：即插入到第一个元素的前面；
        prependChild: prependChild,
        //26-->把新元素插入到指定元素的前面；
        insertBefore: insertBefore,
        //27-->把新元素插入旧元素的后面；即：把新元素插入到旧元素下一项的前面；
        insertAfter: insertAfter
    }
})();