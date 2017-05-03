(function (exports) {
'use strict';

const ANGLED_ANIMATIONS_CORE_AUTO_STYLE = '*';
// WARNING! This may trigger some people.
// (If you don't get my joke, triggered is getting filled with hate after seeing, hearing or experiencing something you can't stand)
function AngledAnimationsCoreTrigger(name, definitions) {
  return {
    // WOAH TECHNOLOGY
    name,
    definitions
  }
}
function AngledAnimationsCoreAnimate(timings, styles = null) {
  return {
    type: 4,
    // TSC didn't pick this up for some reason, it did the a:a, b:b
    styles,
    timings
  };
}
function AngledAnimationsCoreGroup(steps) {
  return {
    type: 3,
    steps
  }
}
function AngledAnimationsCoreSequence(steps) {
  return {
    type: 2,
    steps
  }
}
function AngledAnimationsCoreStyle(tokens) {
  return {
    type: 6,
    styles: tokens
  }
}
function AngledAnimationsCoreState(name, styles) {
  return {
    type: 0,
    name,
    styles
  }
}
function AngledAnimationsCoreKeyframes(steps) {
  return {
    type: 5,
    steps
  }
}
function AngledAnimationsCoreTransition(stateChangeExpr, steps) {
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

// 1.4.0 or 2.0.0-rc feature: Reduce these long names?
function AngledAnimationsCoreUtilitiesScheduleMicroTask(cb) {
  Promise.resolve(null).then(cb);
}

class AngledAnimationsCorePlayersAnimationPlayer {
  get parentPlayer() { throw new Error("[Angled] NOT IMPLEMENTED: Base Classs") }
  set parentPlayer(player) { throw new Error("[Angled] NOT IMPLEMENTED: Base Class") }
}
class AngledAnimationsCorePlayersNoopAnimationPlayer {
  constructor() {
    this._onDoneFns = [];
    this._onStartFns = [];
    this._onDestroyFns = [];
    this._started = false;
    this._destroyed = false;
    this._finished = false;
    this.parentPlayer = null;
  }
  _onFinsh() {
    if (!this._finished) {
      this._finished = true;
      this._onDoneFns.forEach(fn => fn());
      this._onDoneFns = [];
    }
  }
  _onStart() {
    this._onStartFns.forEach(fn => fn());
    this._onStartFns = [];
  }
  onStart(fn) { this._onStartFns.push(fn); }
  onDone(fn) { this._onDoneFns.push(fn); }
  onDestroy(fn) { this._onDestroyFns.push(fn); }
  init() { /* Intentionally blank */ }
  play() {
    if (!this.hasStarted()) {
      AngledAnimationsCoreUtilitiesScheduleMicroTask(() => this._onFinish());
      this._onStart();
    }
    this._started = true;
  }
  pause() { /* Intentionally blank */ }
  restart() { /* Intentionally blank */ }
  finish() { this._onFinish(); }
  destroy() {
    if (!this._destroyed) {
      this._destroyed = true;
      if (!this.hasStarted()) {
        this._onStart();
      }
      this.finish();
      this._onDestroyFns.forEach(fn => fn());
      this._onDestroyFns = [];
    }
  }
  reset() { /* Intentionally blank */ }
  setPosition(p) { /* Intentionally blank */ }
  getPosition() { return 0; }
}

class AngledAnimationsCorePlayersAnimationGroupPlayer {
  constructor (_players) {
    this._players = _players;
    this._onDoneFns = [];
    this._onStartFns = [];
    this._onDestroyFns = [];
    this._finished = false;
    this._started = false;
    this._destroyed = false;
    this.parentPlayer = null;
    
    let count = 0;
    const total = this._players.length;
    
    if (total === 0) {
      AngledAnimationsCoreUtilitiesScheduleMicroTask(() => this._onFinish());
    } else {
      this._players.forEach(player => {
        player.parentPlayer = this;
        player.onDone(() => {
          if (++count >= total) {
            this._onFinish();
          }
        });
      });
    }
  }
  _onFinish() {
    if (!this._finished) {
      this._finished = true;
      this._onDoneFns.forEach(fn => fn());
      this._onDoneFns = [];
    }
  }
  init() { this._players.forEach(player => player.init()); }
  onStart(fn) { this.onStartFns.push(fn); }
  onDone(fn) { this._onDoneFns.push(fn); }
  onDestroy(fn) { this._onDestroyFns.push(fn); }
  hasStarted() { return this._started; }
  play() {
    if (!this.parentPlayer) {
      this.init();
    }
    if (!this.hasStarted()) {
      this._onStartFns.forEach(fn => fn());
      this._onStartFns = [];
      this._started = true;
    }
    this._players.forEach(player => player.play());
  }
  pause() { this._players.forEach(player => player.pause()); }
  restart() { this._players.forEach(player => player.restart()); }
  finish() {
    this._onFinish();
    this._players.forEach(player => player.finish());
  }
  destroy() {
    if (!this._destroyed) {
      this._onFinish();
      this._players.forEach(player => player.destroy());
      this._destroyed = true;
      this._onDestroyFns.forEach(fn => fn());
      this._onDestroyFns = [];
    }
  }
  reset() {
    this._players.forEach(player => player.reset());
    this._destroyed = false;
    this._finished = false;
    this._started = false;
  }
  setPosition(p) {
    this._players.forEach(player => { player.setPosition(p); });
  }
  getPosition() {
    let min = 0;
    this._players.forEach(player => {
      const p = player.getPosition();
      min = Math.min(p, min);
    });
    return min;
  }
  get players() { return this._players; }
}

// That was a handful to type, please 1.4.0, allow me to not have to get carpal tunnel surgery.
// Yes, 1.4.0 or 2.0.0-RC might be an API update that has almost no new features (2.0.0-RC will have lots more features as more 1.x releases come)

exports.ANGLED_ANIMATIONS_CORE_AUTO_STYLE = ANGLED_ANIMATIONS_CORE_AUTO_STYLE;
exports.AngledAnimationsCoreGroup = AngledAnimationsCoreGroup;
exports.AngledAnimationsCoreAnimate = AngledAnimationsCoreAnimate;
exports.AngledAnimationsCoreKeyframes = AngledAnimationsCoreKeyframes;
exports.AngledAnimationsCoreSequence = AngledAnimationsCoreSequence;
exports.AngledAnimationsCoreState = AngledAnimationsCoreState;
exports.AngledAnimationsCoreStyle = AngledAnimationsCoreStyle;
exports.AngledAnimationsCoreTransition = AngledAnimationsCoreTransition;
exports.AngledAnimationsCoreTrigger = AngledAnimationsCoreTrigger;
exports.AngledAnimationsCorePlayersAnimationPlayer = AngledAnimationsCorePlayersAnimationPlayer;
exports.AngledAnimationsCorePlayersNoopAnimationPlayer = AngledAnimationsCorePlayersNoopAnimationPlayer;
exports.ɵAngledAnimationsCoreAnimationGroupPlayer = AngledAnimationsCorePlayersAnimationGroupPlayer;

}((this.Angled = this.Angled || {})));
