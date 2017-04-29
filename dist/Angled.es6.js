(((factory, global) => {
  // We're in a Web environment.
  if (global === window) {
    const AngledWindowEnvironment = factory(global, 0);
    AngledWindowEnvironment.HandleInternalDefinition();
  } else if (typeof module !== `undefined` && typeof module.exports !== `undefined`) {
    const AngledNodeEnvironment = factory(global, 1);
    AngledNodeEnvironment.HandleInternalDefinition();
  } else if (typeof exports !== `undefined`) {
    const AngledCommonEnvironment = factory(global, 2);
    AngledCommonEnvironment.HandleInternalDefinition();
  } else {
    throw new Error("[Angled] Unsupported distribution platform!");
  }
}))((scope, platform) => {
  const Angled = scope.Angled || Angled || {
    $$exportAll(exportInstance, module) {
      for (const exported in Angled.$$require(module)) {
        if (!exportInstance.hasOwnProperty(exported)) {
          exportInstance[exported] = Angled.$$require(module)[exported];
        }
      }
    },
    $$importAll(toBeImported, module) {
      for (const exported in Angled.$$require(module)) {
        if (!toBeImported.hasOwnProperty(exported)) {
          toBeImported[exported] = Angled.$$require(module)[exported];
        }
      }
    },
    $$importSome(toBeImported, list, module) {
      for (let i = 0; i < list.length; i++) {
        const obj = module[list[i]];
        if (!toBeImported.hasOwnProperty(list[i])) {
          toBeImported[list[i]] = obj;
        }
      }
    },
    $$exportSome(exportInstance, list, module) {
      // They both do virtually the same
      Angled.$$importSome(exportInstance, list, module);
    },
    $$require(module, scope) {
      return (typeof scope !== "undefined" ? scope[module] : Angled.$$modules[module]);
    },
    $$define(module, requires, callback) {
      const args = [{}, Angled];
      for (let i = 0; i < requires.length; i++) {
        args.push(Angled.$$require(requires[i]));
      }
      Angled.$$modules[module] = callback.apply(scope, args);
    },
    $$modules: {}
  };
  
  return {
    HandleInternalDefinition() {
      if (platform === 0) {
        scope.Angled = Angled;
      } else if (platform === 1) {
        module.exports = Angled;
      } else if (platform === 2) {
        exports.Angled = Angled;
      }
    }
  }
}, this === window ? window : this);
