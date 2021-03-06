import { AngledAnimationsCoreScheduleMicroTask } from '../AngledAnimationsCoreUtilities';
export class AngledAnimationsCorePlayersAnimationGroupPlayer {
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
      AngledAnimationsCoreScheduleMicroTask(() => this._onFinish());
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