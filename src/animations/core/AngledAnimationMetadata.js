export const ANGLED_AUTO_STYLE = "*";
export function angledTrigger(name, definitions) {
  return {
    name: name,
    definitions: definitions
  }
}
export function angledAnimate(timings, styles) {
  if (styles === void(0)) {
    styles = null;
  }
  
  return {
    type: 4, // Animate
    styles: styles,
    timings: timings
  }
}
export function angledGroup(steps) {
  return {
    type: 3, // Group
    steps: steps
  }
}
export function angledSequence(steps) {
  return {
    type: 2, // Sequence
    steps: steps
  }
}
export function angledStyle(tokens) {
  return {
    type: 6, // Style
    styles: tokens
  }
}
export function angledState(name, styles) {
  return {
    type: 0,
    name: name,
    styles: styles
  }
}
export function angledKeyframes(steps) {
  return {
    type: 5, // KeyframeSequence
    steps: steps
  }
}
export function angledTransition(stateChangeExpr, steps) {
  return {
    type: 1, // Transition
    expr: stateChangeExpr,
    animation: steps
  }
}
