"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
exports.fadeAnimation = animations_1.trigger('fadeAnimation', [
    animations_1.state('void', animations_1.style({ opacity: 0 })),
    animations_1.state('true', animations_1.style({ opacity: 1 })),
    animations_1.state('false', animations_1.style({ opacity: 0 })),
    animations_1.transition('* => true', animations_1.animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
    animations_1.transition('* => void', animations_1.animate('150ms cubic-bezier(0.4, 0.0, 1, 1)')),
]);
//# sourceMappingURL=fade-animations.js.map