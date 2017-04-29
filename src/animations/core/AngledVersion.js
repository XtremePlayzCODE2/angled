export class Version {
  constructor(full) {
    this.full = full;
  }
  get major() {
    return this.full.split('.')[0];
  }
  get minor() {
    return this.full.split('.')[1];
  }
  get patch() {
    return this.full.split('.').slice(2).join('.');
  }
}
export const VERSION = new Version('0.0.0-PLACEHOLDER');
