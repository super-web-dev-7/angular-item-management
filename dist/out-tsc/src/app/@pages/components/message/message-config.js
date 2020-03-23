"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
exports._MESSAGE_DEFAULT_CONFIG = new core_1.InjectionToken('_MESSAGE_DEFAULT_CONFIG');
exports._MESSAGE_CONFIG = new core_1.InjectionToken('_MESSAGE_CONFIG');
exports._MESSAGE_DEFAULT_CONFIG_PROVIDER = {
    provide: exports._MESSAGE_DEFAULT_CONFIG,
    useValue: {
        Position: 'top-right',
        Style: 'simple',
        Duration: 1500,
        Animate: true,
        PauseOnHover: true,
        MaxStack: 7,
    }
};
//# sourceMappingURL=message-config.js.map