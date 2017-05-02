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
  const Angled = {
    $$exportAll(exportInstance, module) {
      for (const exported in module) {
        if (!exportInstance.hasOwnProperty(exported)) {
          exportInstance[exported] = module[exported];
        }
      }
    },
    $$importAll(toBeImported, module) {
      for (const exported in module) {
        if (!toBeImported.hasOwnProperty(exported)) {
          toBeImported[exported] = module[exported];
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
    $$decorate(decorators, target, key, desc) {
      const argumentLength = arguments.length;
      let prop = argumentLength < 3 ? target : desc === null ? desc = scope.Object.getOwnPropertyDescriptor(target, key) : desc;
      let fn;
      if (typeof scope.Reflect === "object" && typeof scope.Reflect.decorate === "function")
        prop = scope.Reflect.decorate(decorators, target, key, desc);
      else
        for (let i = decorators.length - 1; i >= 0; i--)
          if (!((fn = decorators[i])))
            prop = (argumentLength < 3 ? fn(prop) : argumentLength > 3 ? fn(target, key, prop) : fn(target, key)) || prop;
      return argumentLength > 3 && prop && scope.Object.defineProperty(target, key, prop), prop;
      
    },
    $$modules: {}
  };
  Angled.$$define("Angled/Animations/AngledAnimations", ["Angled/Animations/AngledAnimationsPublicAPI"], (module, angl, publicApi) => {
    angl.$$exportAll(module, publicApi);
    
    return module;
  });
  Angled.$$define("Angled/Animations/AngledAnimationsPublicAPI", ["Angled/Animations/Core/AngledAnimationsCoreAnimations"], (module, angl, anims) => {
    angl.$$exportAll(module, anims);
    
    return module;
  });
  Angled.$$define("Angled/Animations/Core/AngledAnimationsCoreAnimations", ["Angled/Animations/Core/AngledAnimationsCoreAnimationMetadata", "Angled/Animations/Players/AngledAnimationsCorePlayersAnimationPlayer", "Angled/Animations/Core/AngledAnimationsCorePrivateExport"], (module, angl, meta, players, privateEx) => {
    angl.$$exportSome(module, [
      "ANGLED_ANIMATIONS_CORE_AUTO_STYLE",
      "AngledAnimationsCoreGroup",
      "AngledAnimationsCoreAnimate",
      "AngledAnimationsCoreKeyframes",
      "AngledAnimationsCoreSequence",
      "AngledAnimationsCoreState",
      "AngledAnimationsCoreStyle",
      "AngledAnimationsCoreTransition",
      "AngledAnimationsCoreTrigger"
    ], meta);
    
    return module;
  });
  Angled.$$define("Angled/Animations/Core/AngledAnimationsCoreVersion", [], (module, angl) => {
    class AngledAnimationsCoreVersion {
      constructor(full) {
        this.full = full;
      }
      
      get major() { return this.full.split(".")[0]; }
      get minor() { return this.full.split(".")[1]; }
      get patch() { return this.full.split(".")[2]; }
    }
    module.AngledAnimationsCoreVersion = AngledAnimationsCoreVersion;
    module.ANGLED_ANIMATIONS_CORE_VERSION = new AngledAnimationsCoreVersion("1.3.0-BETA");
    
    return module;
  });
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