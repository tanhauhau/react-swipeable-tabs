export function setTransform(node, transform) {
  node.style.transform = transform;
  node.style.WebkitTransform = transform;
}

export function setTransition(node, transition) {
  node.style.transition = transition;
  node.style.WebkitTransition = transition;
}
