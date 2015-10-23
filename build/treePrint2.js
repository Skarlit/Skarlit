webpackJsonp([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(378);


/***/ },

/***/ 378:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _tree = __webpack_require__(379);

	var _tree2 = _interopRequireDefault(_tree);

	//65-90, 97~122, 32  -> [0-25]U[26-51]U[52]
	function _charGen() {
	    var rand = parseInt(53 * Math.random());
	    if (rand <= 25) {
	        rand += 65;
	    } else if (rand <= 51) {
	        rand += 71;
	    } else {
	        rand = 32;
	    }
	    return String.fromCharCode(rand);
	}

	function stringGen(len) {
	    if (len < 1) return _charGen();
	    return _charGen() + stringGen(len - 1);
	}

	window.onload = function () {
	    var tree = new _tree2["default"]('ROOT');
	    for (var i = 0; i < 40; i++) {
	        tree.insert(stringGen(parseInt((10 + 10 * Math.random()) / 2)));
	    }
	    tree.printDepth();
	};

/***/ },

/***/ 379:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _node = __webpack_require__(380);

	var _node2 = _interopRequireDefault(_node);

	var Tree = (function () {
	    function Tree(string) {
	        _classCallCheck(this, Tree);

	        this.root = new _node2["default"](string);
	        this.padding = 15;
	        this.maxX = []; // store max x for each level;
	    }

	    _createClass(Tree, [{
	        key: "insert",
	        value: function insert(string) {
	            this.root.insert(string);
	        }
	    }, {
	        key: "printLevel",
	        value: function printLevel() {
	            var queue = [this.root];
	            var head = 0;
	            while (head < queue.length) {
	                console.log(queue[head]);
	                for (var i = 0; i < queue[head].children.length; i++) {
	                    queue.push(queue[head].children[i]);
	                }
	                head++;
	            }
	        }
	    }, {
	        key: "printDepth",
	        value: function printDepth() {
	            this.visit(this.root, 0);
	        }
	    }, {
	        key: "visit",
	        value: function visit(node, depth) {
	            // Handle leaves
	            if (!node.children || node.children.length == 0) {
	                if (this.maxX[depth]) {
	                    node.x = this.maxX[depth] + this.padding;
	                    this.maxX[depth] += node.val.length;
	                } else {
	                    this.maxX[depth] = 0;
	                    node.x = 0;
	                }
	                return;
	            }
	            for (var i = 0; i < node.children.length; i++) {
	                this.visit(node.children[i], depth + 1);
	            }
	            // Handle parent;
	            if (this.maxX[depth]) {
	                var x = (node.children[0] + node.children[node.children.length - 1]) / 2;
	                node.x = x;
	                this.maxX[depth] = node.children[node.children.length - 1] + this.padding;
	            } else {
	                this.maxX[depth] = 0;
	                node.x = 0;
	            }
	        }
	    }]);

	    return Tree;
	})();

	exports["default"] = Tree;
	module.exports = exports["default"];

/***/ },

/***/ 380:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Node = (function () {
	    function Node(string) {
	        _classCallCheck(this, Node);

	        this.val = string;
	        this.children = [];
	    }

	    _createClass(Node, [{
	        key: "insert",
	        value: function insert(string) {
	            if (Math.random() > 0.5 || this.children.length == 0) {
	                this.children.push(new Node(string));
	            } else {
	                this.children[parseInt(Math.random() * this.children.length)].insert(string);
	            }
	        }
	    }]);

	    return Node;
	})();

	exports["default"] = Node;
	module.exports = exports["default"];

/***/ }

});