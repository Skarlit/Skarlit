(function($) {
    var cards = [];
    var offsetCache = [];
    var cardWidth = 70;
    var cardHeight = 70;
    var gap = 20;
    var placeholder;

    // Scrolling configs
    var dsThreshold = 20;
    var dtThreshold = 100;
    var zOffset = 500;
    var spreadSqr = 70000;


    var fillCards = function(el, cardNum) {
        for(var i = 0; i < cardNum; i++) {
            var card = document.createElement("div");
            card.textContent = cards.length - placeholder;
            card.classList.add("card");
            var shadow = document.createElement('div');
            shadow.classList.add('shadow');
            shadow.textContent = cards.length - placeholder;
            card.appendChild(shadow);
            var boxShadow = document.createElement("div");
            boxShadow.classList.add("bshadow");
            card.appendChild(boxShadow);
            el.append(card);
            offsetCache.push($(card).offset().left);
            cards.push($(card));
        }
    };

    var fillPlaceholders = function(el,  num) {
        for(var i = 0; i < num; i++) {
            var card = document.createElement("div");
            card.classList.add("card");
            card.style['visibility'] = 'hidden';
            el.append(card);
            offsetCache.push($(card).offset().left);
            cards.push($(card));
        }
    };

    var gaussian = function(deltaX) {
        return zOffset * Math.exp(- deltaX*deltaX / spreadSqr);
    };


    //-30*Math.sin( Math.PI/ (oe - os)*cardPos - (os + oe) / 2 )

    var transformCards = function(el) {
        var startIndex = parseInt(el.scrollLeft() / (cardWidth + gap));
        var endIndex = Math.max(parseInt((el.scrollLeft() + el.width()) / (cardWidth + gap)));
        var center = el.scrollLeft() + el.width() / 2;
        var oe = offsetCache[endIndex];
        var os =  offsetCache[startIndex];
        for(var i = startIndex; i < endIndex; i++) {
            var cardPos = offsetCache[i] + cardWidth / 2;
            var degree =  (cardPos - center > 0 ? 60/zOffset : -60/zOffset) * gaussian(cardPos - center);
            if (Math.abs(degree) > 50) degree = 0;
            var transform =  'translateZ(' + gaussian(cardPos - center) +
                'px)  rotateY(' + degree + 'deg)';
            cards[i].css('transform', transform);
        }
    };


    var loadCards = function(el, num) {
        if (num)  {
            fillCards(el, num);
            return;
        }
        if (cards.length == 0) {
            var cardNum = parseInt(2*el.width() / cardWidth);
            fillCards(el, cardNum);
        } else if (cards[cards.length - 1].offset().left < el.width() + el.scrollLeft()) {
            var cardNum = parseInt(( 2 * el.width() + el.scrollLeft() ) / cardWidth)  - cards.length;
            fillCards(el, cardNum);
        }
    };

    var initSmoothScrolling = function(el) {
        // State variables
        var isMouseDown = false;
        var deltaS = 0;
        var t1 = 0;
        var t2 = Infinity;
        var prevX = null;

        var momentum = function(ds, dt) {
            var v = 100*ds / dt;
            var a = -0.1 * v;
            var t = - v / a;
            var dist = v*v / (-a);
            el.animate({
                scrollLeft:  '+=' + dist
            }, parseInt(t)* 50, 'linear', function() {
                deltaS = 0;
                prevX = null;
            })
        };

        $(document.body).on('mousedown', function(e) {
            el.stop();
            isMouseDown = true;
            t1 = e.timeStamp;
        });

        $(document.body).on('mousemove', function(e) {
            if (isMouseDown) {
                var dx = prevX ? (e.screenX - prevX) : 0;

                dx * deltaS < 0 ? deltaS = dx : deltaS += dx;

                el.scrollLeft(el.scrollLeft() + dx);
                prevX = e.screenX;
            }
        });
        $(document.body).on('mouseup', function(e) {
            isMouseDown = false;
            t2 = e.timeStamp;
            if (deltaS *deltaS > dsThreshold && t2 - t1 > dtThreshold) momentum(deltaS, t2 - t1);
            deltaS = 0;
            prevX = null;
        });

        $(document.body).on('mouseleave', function(e) {
            deltaS = 0;
            prevX = null;
        })

        $(window).on('resize', function() {
            transformCards(el);
        })
    };

    $.fn.slider = function() {
        var el  = $(this);
        placeholder = parseInt(el.width() /(2*  (cardWidth + gap)));
        fillPlaceholders(el, placeholder);
        loadCards(el, 100);
        fillPlaceholders(el, placeholder);
        initSmoothScrolling(el);
        transformCards(el);
        el.scroll( function(e) {
            //loadCards(el);
            transformCards(el);
        });
    }
})(jQuery);