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
  var Angled = scope.Angled || Angled || {
    $$exportAll: function(exportInstance, module) {
      for (var exported in Angled.$$require(module)) {
        if (!exportInstance.hasOwnProperty(exported)) {
          exportInstance[exported] = Angled.$$require(module)[exported];
        }
      }
    },
    $$importAll: function(toBeImported, module) {
      for (var exported in Angled.$$require(module)) {
        if (!toBeImported.hasOwnProperty(exported)) {
          toBeImported[exported] = Angled.$$require(module)[exported];
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
    $$modules: {}
  };
  
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
