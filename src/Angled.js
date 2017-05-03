export const Angled = {
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
        return typeof scope !== 'undefined' ? scope[module] : Angled.$$modules[module];
    },
    $$define(module, requires, callback) {
        const args = [
            {},
            Angled
        ];
        for (let i = 0; i < requires.length; i++) {
            args.push(Angled.$$require(requires[i]));
        }
        Angled.$$modules[module] = callback.apply(scope, args);
    },
    $$decorate(decorators, target, key, desc) {
        const argumentLength = arguments.length;
        let prop = argumentLength < 3 ? target : desc === null ? desc = scope.Object.getOwnPropertyDescriptor(target, key) : desc;
        let fn;
        if (typeof scope.Reflect === 'object' && typeof scope.Reflect.decorate === 'function')
            prop = scope.Reflect.decorate(decorators, target, key, desc);
        else
            for (let i = decorators.length - 1; i >= 0; i--)
                if (!(fn = decorators[i]))
                    prop = (argumentLength < 3 ? fn(prop) : argumentLength > 3 ? fn(target, key, prop) : fn(target, key)) || prop;
        return argumentLength > 3 && prop && scope.Object.defineProperty(target, key, prop), prop;
    },
    $$modules: {}
};