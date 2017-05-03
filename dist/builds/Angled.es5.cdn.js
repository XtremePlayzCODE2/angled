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
  var Angled = {
    $$exportAll: function(exportInstance, module) {
      for (var exported in module) {
        if (!exportInstance.hasOwnProperty(exported)) {
          exportInstance[exported] = module[exported];
        }
      }
    },
    $$importAll: function(toBeImported, module) {
      for (var exported in module) {
        if (!toBeImported.hasOwnProperty(exported)) {
          toBeImported[exported] = module[exported];
        }
      }
    },
    $$importSome: function(toBeImported, list, module) {
      for (var i = 0; i < list.length; i++) {
        var obj = module[list[i]];
        if (!toBeImported.hasOwnProperty(list[i])) {
          toBeImported[list[i]] = obj;
        }
      }
    },
    $$exportSome: function(exportInstance, list, module) {
      // They both do virtually the same
      Angled.$$importSome(exportInstance, list, module);
    },
    $$require: function(module, scope) {
      return (typeof scope !== "undefined" ? scope[module] : Angled.$$modules[module]);
    },
    $$define: function(module, requires, callback) {
      var args = [{}, Angled];
      for (var i = 0; i < requires.length; i++) {
        args.push(Angled.$$require(requires[i]));
      }
      Angled.$$modules[module] = callback.apply(scope, args);
    },
    $$decorate: function(decorators, target, key, desc) {
      var argumentLength = arguments.length;
      var prop = argumentLength < 3 ? target : desc === null ? desc = scope.Object.getOwnPropertyDescriptor(target, key) : desc;
      var fn;
      if (typeof scope.Reflect === "object" && typeof scope.Reflect.decorate === "function")
        prop = scope.Reflect.decorate(decorators, target, key, desc);
      else
        for (var i = decorators.length - 1; i >= 0; i--)
          if (!((fn = decorators[i])))
            prop = (argumentLength < 3 ? fn(prop) : argumentLength > 3 ? fn(target, key, prop) : fn(target, key)) || prop;
      return argumentLength > 3 && prop && scope.Object.defineProperty(target, key, prop), prop;
      
    },
    $$modules: {}
  };
  Angled.$$define("Angled/Animations/AngledAnimations", ["Angled/Animations/AngledAnimationsPublicAPI"], function (module, angl, publicApi) {
    angl.$$exportAll(module, publicApi);
    
    return module;
  });
  Angled.$$define("Angled/Animations/AngledAnimationsPublicAPI", ["Angled/Animations/Core/AngledAnimationsCoreAnimations"], function(module, angl, anims) {
    angl.$$exportAll(module, anims);
    
    return module;
  });
  Angled.$$define("Angled/Animations/Core/AngledAnimationsCoreAnimations", ["Angled/Animations/Core/AngledAnimationsCoreAnimationMetadata", "Angled/Animations/Players/AngledAnimationsCorePlayersAnimationPlayer", "Angled/Animations/Core/AngledAnimationsCorePrivateExport"], function(module, angl, meta, players, privateEx) {
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
  Angled.$$define("Angled/Animations/Core/AngledAnimationsCoreVersion", [], function(module, angl) {
    var AngledAnimationsCoreVersion = function(full) {
      this.full = full;
      this.major = (function() {return this.full.split(".")[0]});
      this.minor = (function() {return this.full.split(".")[1]});
      this.patch = (function() {return this.full.split(".")[2]});
    };
    module.AngledAnimationsCoreVersion = AngledAnimationsCoreVersion;
    module.ANGLED_ANIMATIONS_CORE_VERSION = new AngledAnimationsCoreVersion("1.3.0-BETA");
    
    return module;
  });
  return {
    HandleInternalDefinition: function() {
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