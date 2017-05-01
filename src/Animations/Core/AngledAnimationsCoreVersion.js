// Represents the version of Angled.Animations
export class AngledAnimationsCoreVersion {
  constructor(full) {
    this.full = full;
  }
  get major() { return this.full.split(".")[0]; }
  get minor() { return this.full.split(".")[1]; }
  get patch() { return this.full.split(".")[2]; }
}

export const ANGLED_ANIMATIONS_CORE_VERSION = new AngledAnimationsCoreVersion('1.3.0-BETA');