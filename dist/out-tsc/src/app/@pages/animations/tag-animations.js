"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
exports.tagAnimation = animations_1.trigger('tagAnimation', [
    animations_1.state('*', animations_1.style({ opacity: 1, transform: 'scale(1)' })),
    animations_1.transition('void => *', [
        animations_1.style({ opacity: 0, transform: 'scale(0)' }),
        animations_1.animate('150ms linear')
    ]),
    animations_1.state('void', animations_1.style({ opacity: 0, transform: 'scale(0)' })),
    animations_1.transition('* => void', [
        animations_1.style({ opacity: 1, transform: 'scale(1)' }),
        animations_1.animate('150ms linear')
    ])
]);
//# sourceMappingURL=tag-animations.js.map