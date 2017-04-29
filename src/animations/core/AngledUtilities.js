export function scheduleMicroTask(cb) {
  Promise.resolve(null).then(cb);
}
