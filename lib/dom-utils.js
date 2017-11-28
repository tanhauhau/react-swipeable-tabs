'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTransform = setTransform;
exports.setTransition = setTransition;
exports.onPassiveScroll = onPassiveScroll;
exports.requestIdleCallback = requestIdleCallback;
exports.cancelIdleCallback = cancelIdleCallback;
function setTransform(node, transform) {
  if (node) {
    node.style.transform = transform;
    node.style.WebkitTransform = transform;
  }
}

function setTransition(node, transition) {
  if (node) {
    node.style.transition = transition;
    node.style.WebkitTransition = transition;
  }
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

function requestIdleCallback(callback) {
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(callback);
  } else {
    return setTimeout(callback, 1);
  }
}

function cancelIdleCallback(id) {
  if ('requestIdleCallback' in window) {
    return window.cancelIdleCallback(id);
  } else {
    return clearTimeout(id);
  }
}