"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linearInterpolate = linearInterpolate;
function linearInterpolate(from, to, t) {
  return t === 0 ? from : t === 1 ? to : from + (to - from) * t;
}