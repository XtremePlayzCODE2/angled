(function (factory, global) {
  // We're in a Web environment.
  if (global === window) {
    var AngledWindowEnvironment = factory(global, 0);
    AngledWindowEnvironment.HandleInternalDefinition();
  } else if (typeof module !== `undefined` && typeof module.exports !== `undefined`) {
    var AngledNodeEnvironment = factory(global, 1);
    AngledNodeEnvironment.HandleInternalDefinition();
  } else if (typeof exports !== `undefined`) {
    var AngledCommonEnvironment = factory(global, 2);
    AngledCommonEnvironment.HandleInternalDefinition();
  } else {
    throw new Error("[Angled] Unsupported distribution platform!");
  }
})(function (scope, platform) {
  
}, this instanceof window ? window : this);
