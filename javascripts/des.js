
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
    this.cX  = cX;
    this.cY = cY;
    this.p = new Array(n);
    this.v = new Array(n);
    for(var i = 0; i < n; i++) {
        this.p[i] = new THREE.Vector3(cX* 2 * (Math.random() - 0.5), cY*2*(Math.random() - 0.5));
        this.v[i] = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5);
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

ParticleSystem.prototype._predict = function (i, j) {
    var dp =  (new THREE.Vector3).subVectors(this.p[j], this.p[i]);
    var dv =  (new THREE.Vector3).subVectors(this.v[j], this.v[i]);
    var dvdp = dp.dot(dv);
    var det = Math.pow(dvdp, 2) - dp.lengthSq()*dv.lengthSq() + 4 * dv.lengthSq() * this.r * this.r;
    if (det < 0) {
        return {};
    } else {
        var timeStamp = Math.max(-dvdp + det, -dvdp - det);
        if (timeStamp > 0) {
            return {
                type: 0,
                pair: [i, j],
                timeStamp: timeStamp / dv.lengthSq()
            }
        } else {
            return {}
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
            return (ty > tx ?  {type: 2, timeStamp: tx} : {type: 3, timeStamp: ty});
        } else {  // UP
            ty = (this.cY - this.p[i].y) / this.v[i].y;
            return (ty > tx ?  {type: 2, timeStamp: tx} : {type: 1, timeStamp: ty});
        }
    } else {  // RIGHT
        tx = (this.cX - this.p[i].x) / this.v[i].x;
        if (this.v[i].y < 0) {  // DOWN
            ty = - (this.p[i].y + this.cY) / this.v[i].y;
            return (ty > tx ?  {type: 4, timeStamp: tx} : {type: 3, timeStamp: ty});
        } else { // UP
            ty = (this.cY - this.p[i].y) / this.v[i].y;
            return (ty > tx ?  {type: 4, timeStamp: tx} : {type: 1, timeStamp: ty});
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


