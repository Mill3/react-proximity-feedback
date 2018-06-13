"use strict";

exports.__esModule = true;
exports.distancePoints = distancePoints;
exports.lineEq = lineEq;
/**
 * Distance between two points P1 (x1,y1) and P2 (x2,y3)
 *
 * @see https://github.com/codrops/ProximityFeedback/blob/master/js/nearby.js#L15
 *
 * @param {Integer} x1 x coordinate of point 1
 * @param {Integer} y1 y coordinate of point 1
 * @param {Integer} x2 x coordinate of point 2
 * @param {Integer} y2 y coordinate of point 2
 */
function distancePoints(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

/**
 * Round the number to *precision* numbers of decimal places
 *
 * (This solution is not without its flaws, but works for this use case)
 * @see https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Math/round
 *
 * @param {Float} number The number to round
 * @param {Integer} precision The number of max decimal places
 */
function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

/**
 * Equation of a line
 *
 * @see https://github.com/codrops/ProximityFeedback/blob/master/js/demo1.js#L15
 */
function lineEq(y2, y1, x2, x1, currentVal) {
  // y = mx + b
  var m = (y2 - y1) / (x2 - x1);
  var b = y1 - m * x1;
  var y = m * currentVal + b;

  return y > 1 ? 1 : precisionRound(y, 2);
}