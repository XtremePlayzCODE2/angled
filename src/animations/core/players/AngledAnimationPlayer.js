const utilities = require("../AngledUtilities");

// Blank animation player
export class AngledAnimationPlayer {
  constructor() {}
  get parentPlayer() {
    throw new Error("[Angled] NOT IMPLEMENTED: Base class");
  }
  set parentPlayer(value) {
    throw new Error("[Angled] NOT IMPLEMENTED: Base class");
  }
}

// Noop animation player
export class AngledNoopAnimationPlayer {
  constructor() {
    this._onDoneFns = [];
    this._onStartFns = [];
    this._onDestroyFns = [];
    this._started = false;
    this._destroyed = false;
    this._finished = false;
    this.parentPlayer = null;
  }
  _onFinish() {
    if (!this.finished) {
      this._finished = true;
      this._onDoneFns.forEach((fn) => fn());
      this._onDoneFns = [];
    }
  }
  _onStart() {
    this._onStartFns.forEach((fn) => {
      return fn();
    });
    this._onStartFns = [];
  }
  onStart(fn) {
    this._onStartFns.push(fn);
  }
  onDone(fn) {
    this._onDoneFns.push(fn);
  }
  onDestroy(fn) {
    this._onDestroyFns.push(fn);
  }
  hasStarted() {
    return this._started;
  }
  init() {
    
  }
  play() {
    var dis = this;
    if (!this.hasStarted()) {
      utilities.scheduleMicroTask(() => dis._onFinish());
      
      this._onStart();
    }
    
    this._started = true;
  }
  pause() {
    
  }
  restart() {
    
  }
  finish() {
    this._onFinish();
  }
  destroy() {
    if (!this._destroyed) {
      this._destroyed = true;
      
      if (!this.hasStarted()) {
        this._onStart();
      }
      
      this.finish();
      this._onDestroyFns.forEach((fn) => fn());
      this._onDestroyFns = [];
    }
  }
  reset() {
    
  }
  setPosition(pos) {
    
  }
  getPosition() {
    return 0;
  }
}
