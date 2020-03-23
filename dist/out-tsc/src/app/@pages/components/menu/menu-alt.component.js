"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var menu_component_1 = require("./menu.component");
var MenuAltComponent = /** @class */ (function (_super) {
    __extends(MenuAltComponent, _super);
    function MenuAltComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuAltComponent.prototype.ngOnInit = function () {
    };
    MenuAltComponent = __decorate([
        core_1.Component({
            selector: 'pg-menu-items-alt',
            templateUrl: './menu-alt.component.html',
            styleUrls: ['./menu-alt.scss'],
            animations: [
                animations_1.trigger('toggleHeight', [
                    animations_1.state('close', animations_1.style({
                        height: '0',
                        overflow: 'hidden',
                        marginBottom: '0',
                        display: 'none',
                    })),
                    animations_1.state('open', animations_1.style({
                        display: 'block',
                        height: '*',
                        marginBottom: '10px',
                        overflow: 'hidden',
                    })),
                    animations_1.transition('close => open', animations_1.animate('140ms ease-in')),
                    animations_1.transition('open => close', animations_1.animate('140ms ease-out'))
                ])
            ],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], MenuAltComponent);
    return MenuAltComponent;
}(menu_component_1.MenuComponent));
exports.MenuAltComponent = MenuAltComponent;
//# sourceMappingURL=menu-alt.component.js.map