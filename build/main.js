webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(157);

	var _componentNavbarJs = __webpack_require__(199);

	var _componentNavbarJs2 = _interopRequireDefault(_componentNavbarJs);

	var _viewExperimentJs = __webpack_require__(361);

	var _viewExperimentJs2 = _interopRequireDefault(_viewExperimentJs);

	var App = _react2["default"].createClass({
	    displayName: "App",

	    render: function render() {
	        return _react2["default"].createElement(
	            "div",
	            null,
	            _react2["default"].createElement(_componentNavbarJs2["default"], null),
	            this.props.children
	        );
	    }
	});

	var NotFound = _react2["default"].createClass({
	    displayName: "NotFound",

	    render: function render() {
	        return _react2["default"].createElement(
	            "h1",
	            null,
	            " Not Found"
	        );
	    }
	});

	window.onload = function () {
	    _react2["default"].render(_react2["default"].createElement(
	        _reactRouter.Router,
	        null,
	        _react2["default"].createElement(
	            _reactRouter.Route,
	            { path: "/", component: App },
	            _react2["default"].createElement(_reactRouter.Route, { path: "experiments", component: _viewExperimentJs2["default"] }),
	            _react2["default"].createElement(_reactRouter.Route, { path: "*", component: NotFound })
	        )
	    ), document.body);
	};

/***/ },

/***/ 199:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(157);

	var _materialUi = __webpack_require__(200);

	var _materialUi2 = _interopRequireDefault(_materialUi);

	var _mixinsMaterial_mixinJs = __webpack_require__(356);

	var _mixinsMaterial_mixinJs2 = _interopRequireDefault(_mixinsMaterial_mixinJs);

	var Tab = _materialUi2["default"].Tab;
	var Tabs = _materialUi2["default"].Tabs;

	var NavBar = _react2["default"].createClass({
	    displayName: "NavBar",

	    mixins: [_mixinsMaterial_mixinJs2["default"]],
	    render: function render() {
	        return _react2["default"].createElement(
	            Tabs,
	            null,
	            _react2["default"].createElement(Tab, { label: "About" }),
	            _react2["default"].createElement(Tab, { label: "Experiement" }),
	            _react2["default"].createElement(Tab, { label: "Other" })
	        );
	    }
	});

	exports["default"] = NavBar;
	module.exports = exports["default"];

/***/ },

/***/ 356:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _materialUi = __webpack_require__(200);

	var _materialUi2 = _interopRequireDefault(_materialUi);

	var _reactTapEventPlugin = __webpack_require__(357);

	var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

	// Initialize click/tap event for material ui.
	(0, _reactTapEventPlugin2["default"])();

	var ThemeManager = new _materialUi2["default"].Styles.ThemeManager();

	var ThemeMixin = {
	    childContextTypes: {
	        muiTheme: _react2["default"].PropTypes.object
	    },

	    getChildContext: function getChildContext() {
	        return {
	            muiTheme: ThemeManager.getCurrentTheme()
	        };
	    }
	};

	exports["default"] = ThemeMixin;
	module.exports = exports["default"];

/***/ },

/***/ 357:
/***/ function(module, exports, __webpack_require__) {

	module.exports = function injectTapEventPlugin () {
	  var React = __webpack_require__(1);
	  React.initializeTouchEvents(true);

	  __webpack_require__(69).injection.injectEventPluginsByName({
	    "ResponderEventPlugin": __webpack_require__(358),
	    "TapEventPlugin":       __webpack_require__(359)
	  });
	};


/***/ },

/***/ 358:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ResponderEventPlugin
	 */

	"use strict";

	var EventConstants = __webpack_require__(5);
	var EventPluginUtils = __webpack_require__(4);
	var EventPropagators = __webpack_require__(93);
	var SyntheticEvent = __webpack_require__(97);

	var accumulateInto = __webpack_require__(71);
	var keyOf = __webpack_require__(39);

	var isStartish = EventPluginUtils.isStartish;
	var isMoveish = EventPluginUtils.isMoveish;
	var isEndish = EventPluginUtils.isEndish;
	var executeDirectDispatch = EventPluginUtils.executeDirectDispatch;
	var hasDispatches = EventPluginUtils.hasDispatches;
	var executeDispatchesInOrderStopAtTrue =
	  EventPluginUtils.executeDispatchesInOrderStopAtTrue;

	/**
	 * ID of element that should respond to touch/move types of interactions, as
	 * indicated explicitly by relevant callbacks.
	 */
	var responderID = null;
	var isPressing = false;

	var eventTypes = {
	  /**
	   * On a `touchStart`/`mouseDown`, is it desired that this element become the
	   * responder?
	   */
	  startShouldSetResponder: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onStartShouldSetResponder: null}),
	      captured: keyOf({onStartShouldSetResponderCapture: null})
	    }
	  },

	  /**
	   * On a `scroll`, is it desired that this element become the responder? This
	   * is usually not needed, but should be used to retroactively infer that a
	   * `touchStart` had occured during momentum scroll. During a momentum scroll,
	   * a touch start will be immediately followed by a scroll event if the view is
	   * currently scrolling.
	   */
	  scrollShouldSetResponder: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onScrollShouldSetResponder: null}),
	      captured: keyOf({onScrollShouldSetResponderCapture: null})
	    }
	  },

	  /**
	   * On a `touchMove`/`mouseMove`, is it desired that this element become the
	   * responder?
	   */
	  moveShouldSetResponder: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onMoveShouldSetResponder: null}),
	      captured: keyOf({onMoveShouldSetResponderCapture: null})
	    }
	  },

	  /**
	   * Direct responder events dispatched directly to responder. Do not bubble.
	   */
	  responderMove: {registrationName: keyOf({onResponderMove: null})},
	  responderRelease: {registrationName: keyOf({onResponderRelease: null})},
	  responderTerminationRequest: {
	    registrationName: keyOf({onResponderTerminationRequest: null})
	  },
	  responderGrant: {registrationName: keyOf({onResponderGrant: null})},
	  responderReject: {registrationName: keyOf({onResponderReject: null})},
	  responderTerminate: {registrationName: keyOf({onResponderTerminate: null})}
	};

	/**
	 * Performs negotiation between any existing/current responder, checks to see if
	 * any new entity is interested in becoming responder, performs that handshake
	 * and returns any events that must be emitted to notify the relevant parties.
	 *
	 * A note about event ordering in the `EventPluginHub`.
	 *
	 * Suppose plugins are injected in the following order:
	 *
	 * `[R, S, C]`
	 *
	 * To help illustrate the example, assume `S` is `SimpleEventPlugin` (for
	 * `onClick` etc) and `R` is `ResponderEventPlugin`.
	 *
	 * "Deferred-Dispatched Events":
	 *
	 * - The current event plugin system will traverse the list of injected plugins,
	 *   in order, and extract events by collecting the plugin's return value of
	 *   `extractEvents()`.
	 * - These events that are returned from `extractEvents` are "deferred
	 *   dispatched events".
	 * - When returned from `extractEvents`, deferred-dispatched events contain an
	 *   "accumulation" of deferred dispatches.
	 * - These deferred dispatches are accumulated/collected before they are
	 *   returned, but processed at a later time by the `EventPluginHub` (hence the
	 *   name deferred).
	 *
	 * In the process of returning their deferred-dispatched events, event plugins
	 * themselves can dispatch events on-demand without returning them from
	 * `extractEvents`. Plugins might want to do this, so that they can use event
	 * dispatching as a tool that helps them decide which events should be extracted
	 * in the first place.
	 *
	 * "On-Demand-Dispatched Events":
	 *
	 * - On-demand-dispatched events are not returned from `extractEvents`.
	 * - On-demand-dispatched events are dispatched during the process of returning
	 *   the deferred-dispatched events.
	 * - They should not have side effects.
	 * - They should be avoided, and/or eventually be replaced with another
	 *   abstraction that allows event plugins to perform multiple "rounds" of event
	 *   extraction.
	 *
	 * Therefore, the sequence of event dispatches becomes:
	 *
	 * - `R`s on-demand events (if any)   (dispatched by `R` on-demand)
	 * - `S`s on-demand events (if any)   (dispatched by `S` on-demand)
	 * - `C`s on-demand events (if any)   (dispatched by `C` on-demand)
	 * - `R`s extracted events (if any)   (dispatched by `EventPluginHub`)
	 * - `S`s extracted events (if any)   (dispatched by `EventPluginHub`)
	 * - `C`s extracted events (if any)   (dispatched by `EventPluginHub`)
	 *
	 * In the case of `ResponderEventPlugin`: If the `startShouldSetResponder`
	 * on-demand dispatch returns `true` (and some other details are satisfied) the
	 * `onResponderGrant` deferred dispatched event is returned from
	 * `extractEvents`. The sequence of dispatch executions in this case
	 * will appear as follows:
	 *
	 * - `startShouldSetResponder` (`ResponderEventPlugin` dispatches on-demand)
	 * - `touchStartCapture`       (`EventPluginHub` dispatches as usual)
	 * - `touchStart`              (`EventPluginHub` dispatches as usual)
	 * - `responderGrant/Reject`   (`EventPluginHub` dispatches as usual)
	 *
	 * @param {string} topLevelType Record from `EventConstants`.
	 * @param {string} topLevelTargetID ID of deepest React rendered element.
	 * @param {object} nativeEvent Native browser event.
	 * @return {*} An accumulation of synthetic events.
	 */
	function setResponderAndExtractTransfer(
	    topLevelType,
	    topLevelTargetID,
	    nativeEvent) {
	  var shouldSetEventType =
	    isStartish(topLevelType) ? eventTypes.startShouldSetResponder :
	    isMoveish(topLevelType) ? eventTypes.moveShouldSetResponder :
	    eventTypes.scrollShouldSetResponder;

	  var bubbleShouldSetFrom = responderID || topLevelTargetID;
	  var shouldSetEvent = SyntheticEvent.getPooled(
	    shouldSetEventType,
	    bubbleShouldSetFrom,
	    nativeEvent
	  );
	  EventPropagators.accumulateTwoPhaseDispatches(shouldSetEvent);
	  var wantsResponderID = executeDispatchesInOrderStopAtTrue(shouldSetEvent);
	  if (!shouldSetEvent.isPersistent()) {
	    shouldSetEvent.constructor.release(shouldSetEvent);
	  }

	  if (!wantsResponderID || wantsResponderID === responderID) {
	    return null;
	  }
	  var extracted;
	  var grantEvent = SyntheticEvent.getPooled(
	    eventTypes.responderGrant,
	    wantsResponderID,
	    nativeEvent
	  );

	  EventPropagators.accumulateDirectDispatches(grantEvent);
	  if (responderID) {
	    var terminationRequestEvent = SyntheticEvent.getPooled(
	      eventTypes.responderTerminationRequest,
	      responderID,
	      nativeEvent
	    );
	    EventPropagators.accumulateDirectDispatches(terminationRequestEvent);
	    var shouldSwitch = !hasDispatches(terminationRequestEvent) ||
	      executeDirectDispatch(terminationRequestEvent);
	    if (!terminationRequestEvent.isPersistent()) {
	      terminationRequestEvent.constructor.release(terminationRequestEvent);
	    }

	    if (shouldSwitch) {
	      var terminateType = eventTypes.responderTerminate;
	      var terminateEvent = SyntheticEvent.getPooled(
	        terminateType,
	        responderID,
	        nativeEvent
	      );
	      EventPropagators.accumulateDirectDispatches(terminateEvent);
	      extracted = accumulateInto(extracted, [grantEvent, terminateEvent]);
	      responderID = wantsResponderID;
	    } else {
	      var rejectEvent = SyntheticEvent.getPooled(
	        eventTypes.responderReject,
	        wantsResponderID,
	        nativeEvent
	      );
	      EventPropagators.accumulateDirectDispatches(rejectEvent);
	      extracted = accumulateInto(extracted, rejectEvent);
	    }
	  } else {
	    extracted = accumulateInto(extracted, grantEvent);
	    responderID = wantsResponderID;
	  }
	  return extracted;
	}

	/**
	 * A transfer is a negotiation between a currently set responder and the next
	 * element to claim responder status. Any start event could trigger a transfer
	 * of responderID. Any move event could trigger a transfer, so long as there is
	 * currently a responder set (in other words as long as the user is pressing
	 * down).
	 *
	 * @param {string} topLevelType Record from `EventConstants`.
	 * @return {boolean} True if a transfer of responder could possibly occur.
	 */
	function canTriggerTransfer(topLevelType) {
	  return topLevelType === EventConstants.topLevelTypes.topScroll ||
	         isStartish(topLevelType) ||
	         (isPressing && isMoveish(topLevelType));
	}

	/**
	 * Event plugin for formalizing the negotiation between claiming locks on
	 * receiving touches.
	 */
	var ResponderEventPlugin = {

	  getResponderID: function() {
	    return responderID;
	  },

	  eventTypes: eventTypes,

	  /**
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {DOMEventTarget} topLevelTarget The listening component root node.
	   * @param {string} topLevelTargetID ID of `topLevelTarget`.
	   * @param {object} nativeEvent Native browser event.
	   * @return {*} An accumulation of synthetic events.
	   * @see {EventPluginHub.extractEvents}
	   */
	  extractEvents: function(
	      topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      nativeEvent) {
	    var extracted;
	    // Must have missed an end event - reset the state here.
	    if (responderID && isStartish(topLevelType)) {
	      responderID = null;
	    }
	    if (isStartish(topLevelType)) {
	      isPressing = true;
	    } else if (isEndish(topLevelType)) {
	      isPressing = false;
	    }
	    if (canTriggerTransfer(topLevelType)) {
	      var transfer = setResponderAndExtractTransfer(
	        topLevelType,
	        topLevelTargetID,
	        nativeEvent
	      );
	      if (transfer) {
	        extracted = accumulateInto(extracted, transfer);
	      }
	    }
	    // Now that we know the responder is set correctly, we can dispatch
	    // responder type events (directly to the responder).
	    var type = isMoveish(topLevelType) ? eventTypes.responderMove :
	      isEndish(topLevelType) ? eventTypes.responderRelease :
	      isStartish(topLevelType) ? eventTypes.responderStart : null;
	    if (type) {
	      var gesture = SyntheticEvent.getPooled(
	        type,
	        responderID || '',
	        nativeEvent
	      );
	      EventPropagators.accumulateDirectDispatches(gesture);
	      extracted = accumulateInto(extracted, gesture);
	    }
	    if (type === eventTypes.responderRelease) {
	      responderID = null;
	    }
	    return extracted;
	  }

	};

	module.exports = ResponderEventPlugin;


/***/ },

/***/ 359:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule TapEventPlugin
	 * @typechecks static-only
	 */

	"use strict";

	var EventConstants = __webpack_require__(5);
	var EventPluginUtils = __webpack_require__(4);
	var EventPropagators = __webpack_require__(93);
	var SyntheticUIEvent = __webpack_require__(106);
	var TouchEventUtils = __webpack_require__(360);
	var ViewportMetrics = __webpack_require__(74);

	var keyOf = __webpack_require__(39);
	var topLevelTypes = EventConstants.topLevelTypes;

	var isStartish = EventPluginUtils.isStartish;
	var isEndish = EventPluginUtils.isEndish;

	var isTouch = function(topLevelType) {
	  var touchTypes = [
	    topLevelTypes.topTouchCancel,
	    topLevelTypes.topTouchEnd,
	    topLevelTypes.topTouchStart,
	    topLevelTypes.topTouchMove
	  ];
	  return touchTypes.indexOf(topLevelType) >= 0;
	}

	/**
	 * Number of pixels that are tolerated in between a `touchStart` and `touchEnd`
	 * in order to still be considered a 'tap' event.
	 */
	var tapMoveThreshold = 10;
	var ignoreMouseThreshold = 750;
	var startCoords = {x: null, y: null};
	var lastTouchEvent = null;

	var Axis = {
	  x: {page: 'pageX', client: 'clientX', envScroll: 'currentPageScrollLeft'},
	  y: {page: 'pageY', client: 'clientY', envScroll: 'currentPageScrollTop'}
	};

	function getAxisCoordOfEvent(axis, nativeEvent) {
	  var singleTouch = TouchEventUtils.extractSingleTouch(nativeEvent);
	  if (singleTouch) {
	    return singleTouch[axis.page];
	  }
	  return axis.page in nativeEvent ?
	    nativeEvent[axis.page] :
	    nativeEvent[axis.client] + ViewportMetrics[axis.envScroll];
	}

	function getDistance(coords, nativeEvent) {
	  var pageX = getAxisCoordOfEvent(Axis.x, nativeEvent);
	  var pageY = getAxisCoordOfEvent(Axis.y, nativeEvent);
	  return Math.pow(
	    Math.pow(pageX - coords.x, 2) + Math.pow(pageY - coords.y, 2),
	    0.5
	  );
	}

	var dependencies = [
	  topLevelTypes.topMouseDown,
	  topLevelTypes.topMouseMove,
	  topLevelTypes.topMouseUp
	];

	if (EventPluginUtils.useTouchEvents) {
	  dependencies.push(
	    topLevelTypes.topTouchEnd,
	    topLevelTypes.topTouchStart,
	    topLevelTypes.topTouchMove
	  );
	}

	var eventTypes = {
	  touchTap: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onTouchTap: null}),
	      captured: keyOf({onTouchTapCapture: null})
	    },
	    dependencies: dependencies
	  }
	};

	var now = function() {
	  if (Date.now) {
	    return Date.now();
	  } else {
	    // IE8 support: http://stackoverflow.com/questions/9430357/please-explain-why-and-how-new-date-works-as-workaround-for-date-now-in
	    return +new Date;
	  }
	}

	var TapEventPlugin = {

	  tapMoveThreshold: tapMoveThreshold,

	  ignoreMouseThreshold: ignoreMouseThreshold,

	  eventTypes: eventTypes,

	  /**
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {DOMEventTarget} topLevelTarget The listening component root node.
	   * @param {string} topLevelTargetID ID of `topLevelTarget`.
	   * @param {object} nativeEvent Native browser event.
	   * @return {*} An accumulation of synthetic events.
	   * @see {EventPluginHub.extractEvents}
	   */
	  extractEvents: function(
	      topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      nativeEvent) {

	    if (isTouch(topLevelType)) {
	      lastTouchEvent = now();
	    } else {
	      if (lastTouchEvent && (now() - lastTouchEvent) < ignoreMouseThreshold) {
	        return null;
	      }
	    }

	    if (!isStartish(topLevelType) && !isEndish(topLevelType)) {
	      return null;
	    }
	    var event = null;
	    var distance = getDistance(startCoords, nativeEvent);
	    if (isEndish(topLevelType) && distance < tapMoveThreshold) {
	      event = SyntheticUIEvent.getPooled(
	        eventTypes.touchTap,
	        topLevelTargetID,
	        nativeEvent
	      );
	    }
	    if (isStartish(topLevelType)) {
	      startCoords.x = getAxisCoordOfEvent(Axis.x, nativeEvent);
	      startCoords.y = getAxisCoordOfEvent(Axis.y, nativeEvent);
	    } else if (isEndish(topLevelType)) {
	      startCoords.x = 0;
	      startCoords.y = 0;
	    }
	    EventPropagators.accumulateTwoPhaseDispatches(event);
	    return event;
	  }

	};

	module.exports = TapEventPlugin;


/***/ },

/***/ 360:
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule TouchEventUtils
	 */

	var TouchEventUtils = {
	  /**
	   * Utility function for common case of extracting out the primary touch from a
	   * touch event.
	   * - `touchEnd` events usually do not have the `touches` property.
	   *   http://stackoverflow.com/questions/3666929/
	   *   mobile-sarai-touchend-event-not-firing-when-last-touch-is-removed
	   *
	   * @param {Event} nativeEvent Native event that may or may not be a touch.
	   * @return {TouchesObject?} an object with pageX and pageY or null.
	   */
	  extractSingleTouch: function(nativeEvent) {
	    var touches = nativeEvent.touches;
	    var changedTouches = nativeEvent.changedTouches;
	    var hasTouches = touches && touches.length > 0;
	    var hasChangedTouches = changedTouches && changedTouches.length > 0;

	    return !hasTouches && hasChangedTouches ? changedTouches[0] :
	           hasTouches ? touches[0] :
	           nativeEvent;
	  }
	};

	module.exports = TouchEventUtils;


/***/ },

/***/ 361:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(157);

	var _materialUi = __webpack_require__(200);

	var _materialUi2 = _interopRequireDefault(_materialUi);

	var _mixinsMaterial_mixinJs = __webpack_require__(356);

	var _mixinsMaterial_mixinJs2 = _interopRequireDefault(_mixinsMaterial_mixinJs);

	var List = _materialUi2["default"].List;
	var ListItem = _materialUi2["default"].ListItem;
	var ContentInbox = _materialUi2["default"].ContextInbox;
	var ActionGrade = _materialUi2["default"].ActionGrade;
	var ContentSend = _materialUi2["default"].ContentSend;
	var ActionInfo = _materialUi2["default"].ActionInfo;
	var ListDivider = _materialUi2["default"].ListDivider;

	var Experiment = _react2["default"].createClass({
	    displayName: "Experiment",

	    mixins: [_mixinsMaterial_mixinJs2["default"]],
	    render: function render() {
	        return _react2["default"].createElement(
	            "div",
	            null,
	            _react2["default"].createElement(
	                List,
	                null,
	                _react2["default"].createElement(ListItem, { primaryText: "Inbox", leftIcon: _react2["default"].createElement(ContentInbox, null) }),
	                _react2["default"].createElement(ListItem, { primaryText: "Starred", leftIcon: _react2["default"].createElement(ActionGrade, null) }),
	                _react2["default"].createElement(ListItem, { primaryText: "Sent mail", leftIcon: _react2["default"].createElement(ContentSend, null) }),
	                _react2["default"].createElement(ListItem, { primaryText: "Drafts", leftIcon: _react2["default"].createElement(ContentDrafts, null) }),
	                _react2["default"].createElement(ListItem, { primaryText: "Inbox", leftIcon: _react2["default"].createElement(ContentInbox, null) })
	            ),
	            _react2["default"].createElement(ListDivider, null),
	            _react2["default"].createElement(
	                List,
	                null,
	                _react2["default"].createElement(ListItem, { primaryText: "All mail", rightIcon: _react2["default"].createElement(ActionInfo, null) }),
	                _react2["default"].createElement(ListItem, { primaryText: "Trash", rightIcon: _react2["default"].createElement(ActionInfo, null) }),
	                _react2["default"].createElement(ListItem, { primaryText: "Spam", rightIcon: _react2["default"].createElement(ActionInfo, null) }),
	                _react2["default"].createElement(ListItem, { primaryText: "Follow up", rightIcon: _react2["default"].createElement(ActionInfo, null) })
	            )
	        );
	    }
	});

	exports["default"] = Experiment;
	module.exports = exports["default"];

/***/ }

});