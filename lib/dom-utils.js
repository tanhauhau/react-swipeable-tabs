'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTransform = setTransform;
exports.setTransition = setTransition;
exports.onPassiveScroll = onPassiveScroll;
function setTransform(node, transform) {
  node.style.transform = transform;
  node.style.WebkitTransform = transform;
}

function setTransition(node, transition) {
  node.style.transition = transition;
  node.style.WebkitTransition = transition;
}

var supportsPassive = false;
try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function get() {
      supportsPassive = true;
    }
  });
  window.addEventListener('testPassive', null, opts);
  window.removeEventListener('testPassive', null, opts);
} catch (e) {}

function onPassiveScroll(node, callback) {
  var opts = supportsPassive ? { passive: true } : false;
  node.addEventListener('scroll', callback, opts);
  return function offPassiveScroll() {
    node.removeEventListener('scroll', callback, opts);
  };
}