export function setTransform(node, transform) {
  node.style.transform = transform;
  node.style.WebkitTransform = transform;
}

export function setTransition(node, transition) {
  node.style.transition = transition;
  node.style.WebkitTransition = transition;
}

let supportsPassive = false;
try {
  const opts = Object.defineProperty({}, 'passive', {
    get: function() {
      supportsPassive = true;
    },
  });
  window.addEventListener('testPassive', null, opts);
  window.removeEventListener('testPassive', null, opts);
} catch (e) {}

export function onPassiveScroll(node, callback) {
  const opts = supportsPassive ? { passive: true } : false;
  node.addEventListener('scroll', callback, opts);
  return function offPassiveScroll() {
    node.removeEventListener('scroll', callback, opts);
  };
}
