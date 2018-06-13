'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash.throttle');

var _lodash2 = _interopRequireDefault(_lodash);

var _MathUtils = require('./MathUtils');

var _MouseUtils = require('./MouseUtils');

var _MouseUtils2 = _interopRequireDefault(_MouseUtils);

var _createRef = require('create-react-ref/lib/createRef');

var _createRef2 = _interopRequireDefault(_createRef);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Based on Codrops article: Ideas for Proximity Feedback with Progressive Hover Effects
 * https://tympanus.net/codrops/2018/05/02/ideas-for-proximity-feedback-with-progressive-hover-effects/
 *
 * A small render prop component to provide proximity feedback of the mouse cursor and a DOM node (e.g. a button).
 *
 * ## Usage
 * You want to calculate the distance between the mouse cursor and a `button`. Wrap the button inside the `<ProximityFeedback>`
 * component and provide the `ref` attribute.
 *
 * ```javascript
 * <ProximityFeedback>
 *  {
 *    ({ref, distance}) => <button ref={ref}>The mouse is {distance}px away</button>
 *  }
 * </ProximityFeedback>
 * ```
 *
 * ## Props
 * You can pass two props to the `ProximityFeedback` component:
 * - `threshold`: When the mouse is between 0 and this `threshold` in px the proximity feedback will be
 *                triggered and calculated.
 * - `throttleInMs`: The time in milliseconds the proximity will be calculated. The lower the number the higher
 *                   is the frequency the proximity will be calculated. Defaults to 250.
 *
 * ## Render Props
 * You have access to these render props:
 *
 * ### ref
 * It is important that you pass-through this `ref` to the DOM node you want to calculate the proximity of.
 *
 * Example:
 * ```javascript
 * <ProximityFeedback>
 *  {({ref}) => <button ref={ref}>Hello World</button>}
 * </ProximityFeedback>
 * ```
 *
 * ### distance
 * The distance between the "`ref`ed" component and the mouse cursor in px. From 0 to the provided `threshold` prop.
 *
 * Example:
 * ```javascript
 * <ProximityFeedback>
 *  {
 *    ({ref, distance}) => <button ref={ref}>The mouse cursor is {distance}px away</button>
 *  }
 * </ProximityFeedback>
 * ```
 *
 * ### isNearby
 * A boolean value to represent if the cursor is `0 <= distance <= props.threshold`.
 *
 * Example:
 * ```javascript
 * <ProximityFeedback>
 *  {
 *    ({ref, isNearby}) => <button ref={ref}>The cursor is {isNearby ? 'nearby' : 'far away'}</button>
 *  }
 * </ProximityFeedback>
 * ```
 *
 * ### proximity
 * A float value from `0` to `1` rounded to two decimal places. When the distance of the mouse cursor
 * is >= `props.threshold` the `proximity` value is `0`. The proximity is `1` if the cursor is right on top of the
 * "`ref`ed" component.
 * It represents the value from `0%` proximity to `100%` proximity.
 *
 * Example:
 * ```javascript
 * <ProximityFeedback>
 *  {
 *    ({ref, proximity}) => {
 *      const outlineStyle = `3x solid rgba(255,0,0, ${proximity}`;
 *      return <button ref={ref} style={outlineStyle}>Come closer</button>
 *    }
 *  }
 * </ProximityFeedback>
 * ```
 */
var ProximityFeedback = (_temp2 = _class = function (_Component) {
  _inherits(ProximityFeedback, _Component);

  function ProximityFeedback() {
    var _temp, _this, _ret;

    _classCallCheck(this, ProximityFeedback);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      isNearby: false,
      distance: -1
    }, _this.ref = (0, _createRef2.default)(), _this.onMouseMove = function (event) {
      return (
        // see for vanilla js implementation:
        // https://github.com/codrops/ProximityFeedback/blob/master/js/nearby.js#L39
        requestAnimationFrame(function () {
          var mousePosition = (0, _MouseUtils2.default)(event);
          var documentScrolls = {
            left: document.body.scrollLeft + document.documentElement.scrollLeft,
            top: document.body.scrollTop + document.documentElement.scrollTop
          };
          var elementRectangle = _this.ref.current.getBoundingClientRect();
          var elementCoordinates = {
            x1: elementRectangle.left + documentScrolls.left,
            x2: elementRectangle.width + elementRectangle.left + documentScrolls.left,
            y1: elementRectangle.top + documentScrolls.top,
            y2: elementRectangle.height + elementRectangle.top + documentScrolls.top
          };
          var closestPoint = { x: mousePosition.x, y: mousePosition.y };

          if (mousePosition.x < elementCoordinates.x1) {
            closestPoint.x = elementCoordinates.x1;
          } else if (mousePosition.x > elementCoordinates.x2) {
            closestPoint.x = elementCoordinates.x2;
          }
          if (mousePosition.y < elementCoordinates.y1) {
            closestPoint.y = elementCoordinates.y1;
          } else if (mousePosition.y > elementCoordinates.y2) {
            closestPoint.y = elementCoordinates.y2;
          }

          var distance = Math.floor((0, _MathUtils.distancePoints)(mousePosition.x, mousePosition.y, closestPoint.x, closestPoint.y));
          var proximity = 1 - (0, _MathUtils.lineEq)(0, 1, 0, _this.props.threshold, distance);

          _this.setState({
            distance: distance,
            proximity: proximity,
            isNearby: distance <= _this.props.threshold
          });
        })
      );
    }, _this.throttled = (0, _lodash2.default)(_this.onMouseMove, _this.props.throttleInMs), _temp), _possibleConstructorReturn(_this, _ret);
  }

  ProximityFeedback.prototype.componentDidMount = function componentDidMount() {
    if (!this.ref || !this.ref.current) {
      throw new Error('ProximityFeedback needs a DOM node with a ref. Instuctions: https://github.com/ankri/react-proximity-feedback#ref');
    } else {
      window.addEventListener('mousemove', this.throttled);
    }
  };

  ProximityFeedback.prototype.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('mousemove', this.throttled);
  };

  ProximityFeedback.prototype.render = function render() {
    return this.props.children(_extends({ ref: this.ref }, this.state));
  };

  return ProximityFeedback;
}(_react.Component), _class.defaultProps = {
  threshold: 35,
  throttleInMs: 250
}, _temp2);
ProximityFeedback.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * When the mouse is between 0 and this `threshold` in px the proximity feedback will be triggered and calculated.
   */
  threshold: _propTypes2.default.number,
  /**
   * The time in milliseconds the proximity will be calculated. The lower the number the higher
   * is the frequency the proximity will be calculated. Defaults to 250.
   */
  throttleInMs: _propTypes2.default.number,

  /**
   * Render props function. Available render props
   * - ref
   * - distance
   * - isNearby
   * - proximity
   */
  children: _propTypes2.default.func
} : {};
exports.default = ProximityFeedback;
module.exports = exports['default'];