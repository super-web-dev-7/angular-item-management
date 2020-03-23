"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var MenuComponent = /** @class */ (function () {
    function MenuComponent() {
        this.menuItems = [];
        this.currentItem = null;
        this.isPerfectScrollbarDisabled = false;
        this.config = {};
    }
    MenuComponent.prototype.ngOnInit = function () {
    };
    MenuComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.togglePerfectScrollbar();
        });
    };
    MenuComponent.prototype.onResize = function () {
        this.togglePerfectScrollbar();
    };
    MenuComponent.prototype.togglePerfectScrollbar = function () {
        this.isPerfectScrollbarDisabled = window.innerWidth < 1025;
    };
    Object.defineProperty(MenuComponent.prototype, "Items", {
        set: function (value) {
            this.menuItems = value;
        },
        enumerable: true,
        configurable: true
    });
    MenuComponent.prototype.toggleNavigationSub = function (event, item) {
        event.preventDefault();
        if (this.currentItem && this.currentItem != item) {
            this.currentItem["toggle"] = 'close';
        }
        this.currentItem = item;
        item.toggle = (item.toggle === 'close' ? 'open' : 'close');
    };
    __decorate([
        core_1.HostListener("window:resize", []),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MenuComponent.prototype, "onResize", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], MenuComponent.prototype, "Items", null);
    MenuComponent = __decorate([
        core_1.Component({
            selector: 'pg-menu-items',
            templateUrl: './menu.component.html',
            styleUrls: ['./menu.component.scss'],
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
        }),
        __metadata("design:paramtypes", [])
    ], MenuComponent);
    return MenuComponent;
}());
exports.MenuComponent = MenuComponent;
//# sourceMappingURL=menu.component.js.map