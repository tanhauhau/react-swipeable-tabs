"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTransform = setTransform;
exports.setTransition = setTransition;
function setTransform(node, transform) {
  node.style.transform = transform;
  node.style.WebkitTransform = transform;
}

function setTransition(node, transition) {
  node.style.transition = transition;
  node.style.WebkitTransition = transition;
}