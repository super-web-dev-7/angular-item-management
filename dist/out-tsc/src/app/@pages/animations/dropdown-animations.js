"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
exports.dropDownAnimation = animations_1.trigger('dropDownAnimation', [
    animations_1.state('bottom', animations_1.style({
        opacity: 1,
        transform: 'scaleY(1)',
        transformOrigin: '0% 0%'
    })),
    animations_1.transition('void => bottom', [
        animations_1.style({
            opacity: 0,
            transform: 'scaleY(0)',
            transformOrigin: '0% 0%'
        }),
        animations_1.animate('150ms cubic-bezier(0.25, 0.8, 0.25, 1)')
    ]),
    animations_1.state('top', animations_1.style({
        opacity: 1,
        transform: 'scaleY(1)',
        transformOrigin: '0% 100%'
    })),
    animations_1.transition('void => top', [
        animations_1.style({
            opacity: 0,
            transform: 'scaleY(0)',
            transformOrigin: '0% 100%'
        }),
        animations_1.animate('150ms cubic-bezier(0.25, 0.8, 0.25, 1)')
    ]),
    animations_1.transition('* => void', [
        animations_1.animate('250ms 100ms linear', animations_1.style({ opacity: 0 }))
    ])
]);
exports.scaleInAnimation = animations_1.trigger('scaleInAnimation', [
    animations_1.state('close', animations_1.style({
        height: '0',
        opacity: '0',
        transform: 'scale(0.7)',
    })),
    animations_1.state('open', animations_1.style({
        display: 'block',
        opacity: '1',
        transform: 'scale(1)',
    })),
    animations_1.transition('close => open', animations_1.animate('140ms ease-in')),
    animations_1.transition('open => close', animations_1.animate('140ms ease-out'))
]);
//# sourceMappingURL=dropdown-animations.js.map