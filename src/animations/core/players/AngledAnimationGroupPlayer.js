const utilities = require("../AngledUtilities");

export class AnimationGroupPlayer {
  constructor(_players) {
    var dis = this;
    this._players = _players;
    this._onDoneFns = [];
    this._onStartFns = [];
    this._onDestroyFns = [];
    this._finished = false;
    this._started = false;
    this._destroyed = false;
    this.parentPlayer = null;
    
    var count = 0;
    var total = this._players.length;
    
    if (total === 0) {
      utilities.scheduleMicroTask(() => dis._onFinish());
    } else {
      this._players.forEach((player) => {
        player.parentPlayer = dis;
        player.onDone(() => {
          if (++count >= total) {
            dis._onFinish();
          }
        });
      });
    }
  }
  _onFinish() {
    if (!this._finished) {
      this._finished = true;
      this._onDoneFns.forEach((fn) => fn());
      this._onDoneFns = [];
    }
  }
  init() {
    this._players.forEach((player) => player.init());
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
  play() {
    if (!this.parentPlayer) {
      this.init();
    }
    if (!this.hasStarted()) {
      this._onStartFns.forEach((fn) => fn());
      this._onStartFns = [];
      this._started = true;
    }
    this._players.forEach((player) => player.play());
  }
  pause() {
    this._players.forEach((player) => player.pause());
  }
  restart() {
    this._players.forEach((player) => player.restart());
  }
  finish() {
    this._onFinish();
    this._players.forEach((player) => player.finish());
  }
  destroy() {
    if (!this._destroyed) {
      this._onFinish();
      this._players.forEach((player) => player.destroy());
      this._destroyed = true;
      this._onDestroyFns.forEach((fn) => fn());
      this._onDestroyFns = [];
    }
  }
  reset() {
    this._players.forEach((player) => player.reset());
    this._destroyed = false;
    this._finished = false;
    this._started = false;
  }
  setPosition(p) {
    this._players.forEach((player) => {player.setPosition(p)});
  }
  getPosition() {
    var min = 0;
    this._players.forEach((player) => {
      var p = player.getPosition();
      min = Math.min(p, min);
    });
    return min;
  }
  get players() {
    return this._players;
  }
}
