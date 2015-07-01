(function($) {
    var cards = [];
    var cardWidth = 70;
    var cardHeight = 70;
    var gap = 20;

    // Scrolling configs
    var dsThreshold = 20;
    var dtThreshold = 100;

    var fillCards = function(el, cardNum) {
        for(var i = 0; i < cardNum; i++) {
            var card = document.createElement("div");
            card.textContent = cards.length;
            card.classList.add("card");
            el.append(card);
            cards.push($(card));
        }
    }

    var loadCards = function(el) {
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
            el.stop().animate({
                scrollLeft:  '+=' + dist
            }, parseInt(t)* 50, 'linear')
        };

        $(window).on('mousedown', function(e) {
            el.stop();
            isMouseDown = true;
            t1 = e.timeStamp;
        });

        $(window).on('mousemove', function(e) {
            if (isMouseDown) {
                var dx = prevX ? (e.screenX - prevX) : 0

                dx * deltaS < 0 ? deltaS = dx : deltaS += dx;

                el.scrollLeft(el.scrollLeft() + dx);
                prevX = e.screenX;
            }
        });
        $(window).on('mouseup', function(e) {
            isMouseDown = false;
            t2 = e.timeStamp;
            if (deltaS *deltaS > dsThreshold && t2 - t1 > dtThreshold) momentum(deltaS, t2 - t1);
            deltaS = 0;
        });
    };

    $.fn.slider = function() {
        var el  = $(this);
        loadCards(el);
        initSmoothScrolling(el);
        el.scroll( function(e) {
            loadCards(el);
        });
    }
})(jQuery);