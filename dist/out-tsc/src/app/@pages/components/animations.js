"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
var pgAnimations = /** @class */ (function () {
    function pgAnimations() {
    }
    pgAnimations.slideInOut = animations_1.trigger('slideInOut', [
        animations_1.state('true', animations_1.style({ height: '0px' })),
        animations_1.state('false', animations_1.style({ height: '*' })),
        animations_1.transition('1 => 0', animations_1.animate('500ms ease-in')),
        animations_1.transition('0 => 1', animations_1.animate('500ms ease-out'))
    ]);
    pgAnimations.fadeIn = animations_1.trigger('fadeIn', [
        animations_1.state('void', animations_1.style({ opacity: 0 })),
        animations_1.state('true', animations_1.style({ opacity: 1 })),
        animations_1.state('false', animations_1.style({ opacity: 0 })),
        animations_1.transition('* => true', animations_1.animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
        animations_1.transition('* => void', animations_1.animate('150ms cubic-bezier(0.4, 0.0, 1, 1)')),
    ]);
    return pgAnimations;
}());
exports.pgAnimations = pgAnimations;
//# sourceMappingURL=animations.js.map