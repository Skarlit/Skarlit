class Clock {
    constructor() {
        this.oldTime = Date.now();
    }
    reset() {
        this.oldTime = Date.now();
    }
    getDelta() {
        var old = this.oldTime;
        this.oldTime = Date.now();
        return this.oldTime - old;
    }
}

class SyncAnimator {
    constructor() {
        this.queue = [];
        this.deltaT;
        this.clock = new Clock();
        this.clock.reset();
        this.run();
        window.onerror = this.stop.bind(this);
    }
    animate(e) {
        e.countDown = e.duration;
        e.callback = e.callback || function() {};
        this.queue.push(e);
    }
    run() {
        this.loopId = window.requestAnimationFrame(this.run.bind(this));
        this.deltaT = this.clock.getDelta();
        if (this.queue[0]) {
            this.queue[0].step.call(null, this.queue[0].countDown, this.deltaT);
            if (this.queue[0].countDown == 0) {
                (this.queue.shift()).callback();
                return;
            }
            if (this.queue[0].countDown - this.deltaT < 0) {
                this.queue[0].countDown = 0;
                return;
            }
            this.queue[0].countDown -= this.deltaT;
        }
    }
    flush() {
        this.queue = [];
    }
    stop() {
        window.cancelAnimationFrame(this.loopId);
    }
}

 var Animator = window.Animator = (function() {
    if (Animator) return;
    return new SyncAnimator();
})();

export default Animator;

