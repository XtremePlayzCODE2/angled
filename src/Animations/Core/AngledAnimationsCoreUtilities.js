// 1.4.0 or 2.0.0-rc feature: Reduce these long names?
export function AngledAnimationsCoreUtilitiesScheduleMicroTask(cb) {
  Promise.resolve(null).then(cb);
}