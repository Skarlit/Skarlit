webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(372);


/***/ },

/***/ 372:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _playerJs = __webpack_require__(373);

	var _playerJs2 = _interopRequireDefault(_playerJs);

	var App = (function (_React$Component) {
	    _inherits(App, _React$Component);

	    function App(props) {
	        _classCallCheck(this, App);

	        _get(Object.getPrototypeOf(App.prototype), "constructor", this).call(this, props);
	    }

	    _createClass(App, [{
	        key: "render",
	        value: function render() {
	            return _react2["default"].createElement(
	                "div",
	                null,
	                _react2["default"].createElement(_playerJs2["default"], { width: "800", height: "600" })
	            );
	        }
	    }]);

	    return App;
	})(_react2["default"].Component);

	window.onload = function () {
	    _react2["default"].render(_react2["default"].createElement(App, null), document.body);
	};

/***/ },

/***/ 373:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _three = __webpack_require__(371);

	var _three2 = _interopRequireDefault(_three);

	var Player = (function () {
	    function Player() {
	        _classCallCheck(this, Player);

	        this.videoSource = document.createElement('video');
	        this.videoSource.src = "./test/test.mp4";
	        this.canvas = document.createElement('canvas');
	        this.texture = new _three2["default"].Texture(this.canvas);
	        this.texture.minFilter = _three2["default"].NearestFilter;
	        this.texture.magFilter = _three2["default"].NearestFilter;
	        this.scene = new _three2["default"].Scene();
	    }

	    _createClass(Player, [{
	        key: "initScreen",
	        value: function initScreen(canvas, width, height) {
	            this.width = width;
	            this.height = height;
	            var left = width / -2,
	                right = width / 2,
	                top = height / 2,
	                bottom = height / -2,
	                near = 1,
	                far = 1000;
	            var topRightX = (right - left) / 2,
	                topRightY = (top - bottom) / 2;
	            this.videoSource.width = width;
	            this.videoSource.height = height;
	            this.canvas.width = width;
	            this.canvas.height = height;
	            this.ctx = this.canvas.getContext('2d');
	            document.body.appendChild(this.canvas);
	            document.body.appendChild(this.videoSource);
	            this.videoSource.controls = true;
	            this._initScreenMesh(topRightX, topRightY);
	            this._initLighting();
	            this.camera = new _three2["default"].OrthographicCamera(left, right, top, bottom, near, far);
	            this.camera.position.z = 1000;

	            this.renderer = new _three2["default"].WebGLRenderer({
	                canvas: canvas
	            });
	        }
	    }, {
	        key: "play",
	        value: function play() {
	            this.videoSource.play();
	            this._render();
	        }
	    }, {
	        key: "pause",
	        value: function pause() {
	            window.cancelRequestAnimationFrame(this.loopId);
	        }
	    }, {
	        key: "_initLighting",
	        value: function _initLighting() {
	            var light = new _three2["default"].AmbientLight(0xffffff);
	            this.scene.add(light);
	        }
	    }, {
	        key: "_initScreenMesh",
	        value: function _initScreenMesh(x, y) {
	            //var geometry = new THREE.BufferGeometry();
	            //var vertexPositions = [
	            //    [-x, -y,  0],
	            //    [ x, -y,  0],
	            //    [ x,  y,  0],
	            //    [ x,  y,  0],
	            //    [-x,  y,  0],
	            //    [-x, -y,  0]
	            //];
	            //var vertices = new Float32Array( vertexPositions.length * 3 ); // three components per vertex
	            //for ( var i = 0; i < vertexPositions.length; i++ )
	            //{
	            //    vertices[ i*3 + 0 ] = vertexPositions[i][0];
	            //    vertices[ i*3 + 1 ] = vertexPositions[i][1];
	            //    vertices[ i*3 + 2 ] = vertexPositions[i][2];
	            //}
	            //geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	            var geometry = new _three2["default"].BoxGeometry(200, 200, 1);
	            var material = new _three2["default"].MeshLambertMaterial({ color: 0xff0000, map: this.texture });
	            this.screenMesh = new _three2["default"].Mesh(geometry, material);
	            this.scene.add(this.screenMesh);
	        }
	    }, {
	        key: "_update",
	        value: function _update() {
	            this.ctx.drawImage(this.videoSource, 0, 0, this.width, this.height);
	            this.texture.needsUpdate = true;
	        }
	    }, {
	        key: "_render",
	        value: function _render() {
	            this.loopId = requestAnimationFrame(this._render.bind(this));
	            this._update();
	            this.renderer.render(this.scene, this.camera);
	        }
	    }]);

	    return Player;
	})();

	var PlayerView = (function (_React$Component) {
	    _inherits(PlayerView, _React$Component);

	    function PlayerView(props) {
	        _classCallCheck(this, PlayerView);

	        _get(Object.getPrototypeOf(PlayerView.prototype), "constructor", this).call(this, props);
	        this.player = new Player();
	    }

	    _createClass(PlayerView, [{
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            this.player.initScreen(_react2["default"].findDOMNode(this.refs.screen), this.props.width, this.props.height);
	            this.player.play();
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            return _react2["default"].createElement(
	                "div",
	                { ref: "wrapper", width: this.props.width, height: this.props.height },
	                _react2["default"].createElement("canvas", { ref: "screen", width: this.props.width, height: this.props.height, style: { backgroundColor: "black" } })
	            );
	        }
	    }]);

	    return PlayerView;
	})(_react2["default"].Component);

	exports["default"] = PlayerView;
	module.exports = exports["default"];

/***/ }

});