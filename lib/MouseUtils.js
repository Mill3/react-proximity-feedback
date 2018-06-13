"use strict";

exports.__esModule = true;
exports.default = getMousePosition;
/**
 * Return the x and y coordinates of the mouse cursor.
 *
 * @see https://github.com/codrops/ProximityFeedback/blob/master/js/nearby.js#L18
 * @see http://www.quirksmode.org/js/events_properties.html#position
 *
 * @param {MouseEvent} mouseEvent The MouseEvent. Defaults to window.event
 */
function getMousePosition(mouseEvent) {
  var xPosition = mouseEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
  var yPosition = mouseEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  return { x: xPosition, y: yPosition };
}
module.exports = exports["default"];