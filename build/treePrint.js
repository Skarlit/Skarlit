webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(372);


/***/ },

/***/ 372:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _tree = __webpack_require__(373);

	var _tree2 = _interopRequireDefault(_tree);

	window.onload = function () {

	    var canvas = document.getElementById('canvas');
	    var ctx = canvas.getContext("2d");
	    var w = window.innerWidth;
	    var h = window.innerHeight;
	    canvas.width = w;
	    canvas.height = h;
	    var t = new _tree2["default"]();
	    var threshold = 6;
	    var counter = 0;
	    var nodes = 1;
	    var animationId;

	    function draw() {
	        animationId = window.requestAnimationFrame(draw);
	        counter++;
	        if (counter > threshold) {
	            t.insert(parseInt((Math.random() - 0.5) * 10000));
	            ctx.clearRect(0, 0, w, 1000);
	            t.print(w, ctx);
	            counter = 0;
	            nodes++;
	        }
	        if (nodes > 2000) {
	            window.cancelRequestAnimationFrame(animationId);
	            return;
	        }
	    }
	    draw();
	};

/***/ },

/***/ 373:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _node = __webpack_require__(374);

	var _node2 = _interopRequireDefault(_node);

	var Tree = (function () {
	    function Tree() {
	        _classCallCheck(this, Tree);

	        this.root = new _node2["default"]({
	            pos: 0,
	            key: 0,
	            depth: 1
	        });
	    }

	    _createClass(Tree, [{
	        key: "insert",
	        value: function insert(treeNode) {
	            this.root.insert(treeNode);
	        }
	    }, {
	        key: "print",
	        value: function print(width, ctx) {
	            this.root.printRecurse(0, width, width / 2, 10, ctx);
	        }
	    }]);

	    return Tree;
	})();

	exports["default"] = Tree;
	module.exports = exports["default"];

/***/ },

/***/ 374:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _config = __webpack_require__(375);

	var _config2 = _interopRequireDefault(_config);

	var scale = _config2["default"].depthScale;
	var r = _config2["default"].r;
	var strokeStyle = _config2["default"].lineStrokeStyle;
	var fillStyle = _config2["default"].circleFillStyle;

	var TreeNode = (function () {
	    function TreeNode(arg) {
	        _classCallCheck(this, TreeNode);

	        this.right = null;
	        this.left = null;
	        this.key = arg.key;
	        this.width = 0;
	        this.parent = arg.parent || null;
	        this.depth = arg.depth;
	    }

	    _createClass(TreeNode, [{
	        key: "insert",
	        value: function insert(key) {
	            if (key < this.key) {
	                if (this.left) {
	                    this.left.insert(key);
	                    this.width++;
	                } else {
	                    this.left = new TreeNode({ key: key, depth: this.depth + 1, parent: this });
	                    return 1;
	                }
	            } else {
	                if (this.right) {
	                    this.right.insert(key);
	                    this.width++;
	                } else {
	                    this.right = new TreeNode({ key: key, depth: this.depth + 1, parent: this });
	                    return 1;
	                }
	            }
	        }
	    }, {
	        key: "printRecurse",
	        value: function printRecurse(start, end, parentX, parentY, ctx) {
	            var mid = (end + start) / 2;
	            var x = this._isLeftChild() ? mid + 2 : mid - 2;
	            this._drawCircle(x, scale * this.depth, r, ctx);
	            this._drawLine(x, scale * this.depth - r, parentX, parentY + r, ctx);
	            var leftWidth = 0;
	            var rightWidth = 0;
	            if (this.left) {
	                leftWidth = this.left.width;
	            }
	            if (this.right) {
	                rightWidth = this.right.width;
	            }
	            var leftMaxWidth = (end - start) * leftWidth / (leftWidth + rightWidth);
	            if (this.left) {
	                this.left.printRecurse(start, start + leftMaxWidth, mid, scale * this.depth, ctx);
	            }
	            if (this.right) {
	                this.right.printRecurse(start + leftMaxWidth, end, mid, scale * this.depth, ctx);
	            }
	        }
	    }, {
	        key: "_drawBound",
	        value: function _drawBound(start, end, ctx) {
	            ctx.strokeStyle = strokeStyle;
	            ctx.beginPath();
	            ctx.lineWidth = 3;
	            ctx.moveTo(start, this.depth * scale - 10);
	            ctx.lineTo(start, this.depth * scale + 10);
	            ctx.stroke();
	            ctx.beginPath();
	            ctx.lineWidth = 3;
	            ctx.moveTo(end, this.depth * scale - 10);
	            ctx.lineTo(end, this.depth * scale + 10);
	            ctx.stroke();
	        }
	    }, {
	        key: "_isLeftChild",
	        value: function _isLeftChild() {
	            if (!this.parent) return true; // root
	            return this == this.parent.left;
	        }
	    }, {
	        key: "_drawCircle",
	        value: function _drawCircle(x, y, r, ctx) {
	            ctx.lineWidth = 1;
	            ctx.fillStyle = fillStyle;
	            ctx.beginPath();
	            ctx.arc(x, y, r, 0, 2 * Math.PI);
	            ctx.fill();
	        }
	    }, {
	        key: "_drawLine",
	        value: function _drawLine(x1, y1, x2, y2, ctx) {
	            ctx.lineWidth = 0.5;
	            ctx.strokeStyle = strokeStyle;
	            ctx.beginPath();
	            ctx.moveTo(x1, y1);
	            ctx.lineTo(x2, y2);
	            ctx.stroke();
	        }
	    }, {
	        key: "_updateWidth",
	        value: function _updateWidth() {
	            if (!this.parent) return;
	            if (this._isLeftChild() && this.parent._isLeftChild()) {
	                this.parent.width += 1;
	            } else if (!this._isLeftChild() && !this.parent._isLeftChild()) {
	                this.parent.width += 1;
	            }
	            if (this.parent) this.parent._updateWidth();
	        }
	    }, {
	        key: "_addWidth",
	        value: function _addWidth(unit) {
	            this.width += unit;
	            if (this.parent) this.parent._addWidth(unit);
	        }
	    }]);

	    return TreeNode;
	})();

	exports["default"] = TreeNode;
	module.exports = exports["default"];

/***/ },

/***/ 375:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Config = {
	    r: 1.5,
	    depthScale: 20,
	    lineStrokeStyle: "rgb(20, 200, 20)",
	    circleFillStyle: "rgb(255,20,20)"
	};

	exports["default"] = Config;
	module.exports = exports["default"];

/***/ }

});