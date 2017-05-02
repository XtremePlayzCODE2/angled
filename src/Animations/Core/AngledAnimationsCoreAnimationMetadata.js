export const ANGLED_ANIMATIONS_CORE_AUTO_STYLE = '*';
// WARNING! This may trigger some people.
// (If you don't get my joke, triggered is getting filled with hate after seeing, hearing or experiencing something you can't stand)
export function AngledAnimationsCoreTrigger(name, definitions) {
  return {
    // WOAH TECHNOLOGY
    name,
    definitions
  }
}
export function AngledAnimationsCoreAnimate(timings, styles = null) {
  return {
    type: 4,
    // TSC didn't pick this up for some reason, it did the a:a, b:b
    styles,
    timings
  };
}
export function AngledAnimationsCoreGroup(steps) {
  return {
    type: 3,
    steps
  }
}
export function AngledAnimationsCoreSequence(steps) {
  return {
    type: 2,
    steps
  }
}
export function AngledAnimationsCoreStyle(tokens) {
  return {
    type: 6,
    styles: tokens
  }
}
export function AngledAnimationsCoreState(name, styles) {
  return {
    type: 0,
    name,
    styles
  }
}
export function AngledAnimationsCoreKeyframes(steps) {
  return {
    type: 5,
    steps
  }
}
export function AngledAnimationsCoreTransition(stateChangeExpr, steps) {
  return {
    type: 1,
    expr: stateChangeExpr,
    animation: steps
  }
}
// WOAH SUCH UNPROFESSIONALISM BUT DEAL WITH IT
/**

░░░░░░░░░░░░▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄░░░░░░░░░░░░░
░░░░░▄▄▄▄█▀▀▀░░░░░░░░░░░░▀▀██░░░░░░░░░░░
░░▄███▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█▄▄▄░░░░░░░
▄▀▀░█░░░░▀█▄▀▄▀██████░▀█▄▀▄▀████▀░░░░░░░
█░░░█░░░░░░▀█▄█▄███▀░░░░▀▀▀▀▀▀▀░▀▀▄░░░░░
█░░░█░▄▄▄░░░░░░░░░░░░░░░░░░░░░▀▀░░░█░░░░
█░░░▀█░░█░░░░▄░░░░▄░░░░░▀███▀░░░░░░░█░░░
█░░░░█░░▀▄░░░░░░▄░░░░░░░░░█░░░░░░░░█▀▄░░
░▀▄▄▀░░░░░▀▀▄▄▄░░░░░░░▄▄▄▀░▀▄▄▄▄▄▀▀░░█░░
░█▄░░░░░░░░░░░░▀▀▀▀▀▀▀░░░░░░░░░░░░░░█░░░
░░█░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▄██░░░░
░░▀█▄░░░░░░░░░░░░░░░░░░░░░░░░░▄▀▀░░░▀█░░
█▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█
█░░█▀▄ █▀▀ █▀█ █░░░░█░▄░█ █ ▀█▀ █░█░░█ ▀█▀░█
█░░█░█ █▀▀ █▀█ █░░░░▀▄▀▄▀ █ ░█░ █▀█░░█ ░█░░█
█░░▀▀░ ▀▀▀ ▀░▀ ▀▀▀░░░▀░▀░ ▀ ░▀░ ▀░▀░░▀ ░▀░░█
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
*/