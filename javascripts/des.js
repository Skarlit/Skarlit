
// compareTo (a, b) :  -1  a < b,  0 a == b,  1 a > b
var EventHeap = function(compareTo) {
    this.array = [null];
    this.last = 0;
    this.compareTo = compareTo;
};

EventHeap.prototype._swap = function(i, j) {
    var tmp = this.array[i];
    this.array[i] = this.array[j];
    this.array[j] = tmp;
};

EventHeap.prototype._min = function(idx, idy) {
    if (this.array[idx] && this.array[idy]) {
        if (this.compareTo(this.array[idx], this.array[idy]) > 0) {
            return idy;
        } else {
            return idx;
        }
    } else if (this.array[idx]) { return idx; }
    else if (this.array[idy]) { return idy;}
    else { return null; }
};

EventHeap.prototype._sink = function(idx) {
    var min;
    while (idx * 2 <= this.last) {
        min = this._min(idx*2 , idx*2 + 1);
        if (this.array[idx] > this.array[min]) {
            this._swap(idx, min);
            idx =  min;
        } else {
            return ;
        }
    }
};

EventHeap.prototype._swim = function(idx) {
    while (idx > 1) {
        if (this.array[idx] < this.array[parseInt(idx / 2)]) {
            this._swap(idx, parseInt(idx / 2));
            idx = parseInt(idx / 2);
        } else {
            return;
        }
    }
};

EventHeap.prototype.pop = function() {
    if (this.last == 0) return;
    this._swap(1, this.last);
    var tmp = this.array.pop();
    this.last--;
    this._sink(1);
    return tmp;
};

EventHeap.prototype.top = function() {
    return this.array[1];
};

EventHeap.prototype.insert = function(obj) {
    this.array.push(obj);
    this.last++;
    this._swim(this.last);
};

//a = new EventHeap(function(a, b) {
//    if ( a > b) { return 1;}
//    else if ( a < b) { return -1;}
//    else { return 0}
//});
//var result = [];
//var d = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
//
//for (var i = 0; i < d.length; i++) {
//    var tmp = d[i];
//    var idx = parseInt(Math.random() * i);
//    d[i] = d[idx];
//    d[idx] = tmp;
//}
//
//console.log(d);
//d.forEach(function(n) {
//    a.insert(n);
//})
//
////for(var i = 20; i > 0; i -- ) { a.insert(i) }
//for(var i = 0; i < 20; i++) { result.push( a.pop()) }
//console.log(result);


//Events = {

//}

function ParticleSystem(n, r, cX, cY) {
    this.r = r;
    this.collisionDist = 4* r * r * 1.01 // Allow for 1% error;
    this.cX  = cX;
    this.cY = cY;
    this.p = new Array(n);
    this.v = new Array(n);
    this.pointCloudGeo = new THREE.Geometry();
    this.pointCloudMat = new THREE.PointCloudMaterial({size: r});
    this.pointCloud = new THREE.PointCloud(this.pointCloudGeo, this.pointCloudMat);

    for(var i = 0; i < n; i++) {
        this.p[i] = new THREE.Vector3(cX* 2 * (Math.random() - 0.5), cY*2*(Math.random() - 0.5, 0));
        this.pointCloudGeo.vertices.push(this.p[i]);
        this.v[i] = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, 0);
    }
    this.eventHeap = new EventHeap(function(a, b) {
        if (a.timeStamp > b.timeStamp) {
            return 1;
        } else if (a.timeStamp < b.timeStamp) {
            return -1;
        } else {
            return 0;
        }
    });
}

ParticleSystem.prototype.predictAll = function () {
    var event;
    for(var i = 0; i < this.p.length; i++) {
        for(var j = i+1; j < this.p.length; j++) {
            event = this._predict(i, j)
            if(event) this.eventHeap.push(event);
        }
        event = this._predictWall(i);
        if (event) this.eventHeap.push(event);
    }
};

ParticleSystem.prototype.update = function(dt) {
    for(var i = 0; i < this.p.length ; i++) {
        this.p[i] = this.p[i].add(this.v[i].multiplyScalar(dt));
    }
};

ParticleSystem.prototype.handleEvent = function(e) {
    var valid = false;
    switch(e.type) {
        case 0:
            var dist = (new THREE.Vector3()).subVectors(this.p[e.pair[0]], this.p[e.pair[1]]);
            if(dist.lengthSq() < this.collisionDist) { // valid
                this._collide(e.pair[0], e.pair[1]);
                var event;
                for(var i = 0; i < this.p.length; i++) {
                    event = this._predict(e.pair[0], i);
                    if (event) this.eventHeap.push(event);
                    event = this._predict(e.pair[1], i);
                    if (event) this.eventHeap.push(event);
                }
                event = this._predictWall(e.pair[0]);
                if (event) this.eventHeap.push(event);
                event = this._predictWall(e.pair[1]);
                if (event) this.eventHeap.push(event);
            }
            return;
        case 1:
            if ( this.cY - this.p[e.idx].y < this.r) {
                this.v[e.idx].y = - this.v[e.idx].y;
                valid = true;
            }
            break;
        case 2:
            if (this.p[e.idx].x - this.cX < this.r) {
                this.v[e.idx].x = - this.v[e.idx].x;
                valid = true;
            }
            break;
        case 3:
            if (this.p[e.idx].y - this.cY < this.r) {
                this.v[e.idx].y = - this.v[e.idx].y;
                valid = true;
            }
            break;
        case 4:
            if (this.cX - this.p[e.idx].x < this.r) {
                this.v[e.idx].x = - this.v[e.idx].x;
                valid = true;
            }
            break;
    }
    if (valid) {
        var event;
        for (var i = 0; i < this.p.length; i++) {
            event = this._predict(e.idx, i);
            if (event) this.eventHeap.push(event);
        }
        event = this._predictWall(e.idx);
        if (event) this.eventHeap.push(event);
    }
};


ParticleSystem.prototype._predict = function (i, j) {
    if(i == j) return ;
    var dp =  (new THREE.Vector3).subVectors(this.p[j], this.p[i]);
    var dv =  (new THREE.Vector3).subVectors(this.v[j], this.v[i]);
    var dvdp = dp.dot(dv);
    var det = Math.pow(dvdp, 2) - dp.lengthSq()*dv.lengthSq() + 4 * dv.lengthSq() * this.r * this.r;
    if (det < 0) {
        return;
    } else {
        var timeStamp = Math.max(-dvdp + det, -dvdp - det);
        if (timeStamp > 0) {
            return {
                type: 0,
                pair: [i, j],
                timeStamp: timeStamp / dv.lengthSq()
            }
        } else {
            return;
        }
    }
};

/*
     1
  -------
 2|     | 4
  |     |
  -------
    3
 */

ParticleSystem.prototype._predictWall = function(i) {
    var tx;
    var ty;
    if (this.v[i].x < 0) {  //  LEFT
         tx = -(this.p[i].x + this.cX) / this.v[i].x;
        if (this.v[i].y < 0) {  // DOWN
            ty = - (this.p[i].y + this.cY) / this.v[i].y;
            return (ty > tx ?  {type: 2, idx: i,  timeStamp: tx} : {type: 3, idx: i, timeStamp: ty});
        } else {  // UP
            ty = (this.cY - this.p[i].y) / this.v[i].y;
            return (ty > tx ?  {type: 2, idx: i,timeStamp: tx} : {type: 1, idx: i, timeStamp: ty});
        }
    } else {  // RIGHT
        tx = (this.cX - this.p[i].x) / this.v[i].x;
        if (this.v[i].y < 0) {  // DOWN
            ty = - (this.p[i].y + this.cY) / this.v[i].y;
            return (ty > tx ?  {type: 4, idx: i, timeStamp: tx} : {type: 3, idx: i, timeStamp: ty});
        } else { // UP
            ty = (this.cY - this.p[i].y) / this.v[i].y;
            return (ty > tx ?  {type: 4, idx: i, timeStamp: tx} : {type: 1, idx: i, timeStamp: ty});
        }
    }
};

ParticleSystem.prototype._collide = function(i, j) {
    if (this.v[i].x * this.v[j].x < 0) {
        this.v[i].x = - this.v[i].x;
        this.v[j].x = - this.v[j].x;
    }
    if (this.v[i].y * this.v[j].y < 0) {
        this.v[i].y = - this.v[i].y;
        this.v[j].y = - this.v[j].y;
    }
};

ParticleSystem.prototype.draw = function() {

};

function Main() {
    // Set up scene
    var camera = new THREE.OrthographicCamera();

    var p = new ParticleSystem(400, 3, 20, 20);
    p.predictAll();
    // set up Clock
    var clock = new THREE.Clock();
    clock.start();
    var t = 0;

    var render = function() {
        window.requestAnimationFrame(this);
        p.draw();
        while (t > p.eventHeap.top.timeStamp) {
            p.handleEvent(p.eventHeap.pop());
        }
        var dt = clock.getDelta();
        t += dt;
        p.update(dt);
    }

    render();
}


