import { AngledAnimationsCoreUtilitiesScheduleMicroTask } from '../AngledAnimationsCoreUtilities';
export class AngledAnimationsCorePlayersAnimationPlayer {
  get parentPlayer() { throw new Error("[Angled] NOT IMPLEMENTED: Base Classs") }
  set parentPlayer(player) { throw new Error("[Angled] NOT IMPLEMENTED: Base Class") }
}
export class AngledAnimationsCorePlayersNoopAnimationPlayer {
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