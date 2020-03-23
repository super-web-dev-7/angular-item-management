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
var root_component_1 = require("../root/root.component");
var CorporateLayout = /** @class */ (function (_super) {
    __extends(CorporateLayout, _super);
    function CorporateLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.menuLinks = [
            {
                label: "Projects",
                details: "12 New Updates",
                routerLink: "/projects",
                iconType: "pg",
                iconName: "home",
                thumbNailClass: "text-white"
            },
        ];
        return _this;
    }
    CorporateLayout.prototype.ngOnInit = function () {
        this.changeLayout("menu-pin");
        this.changeLayout("menu-behind");
        //Will sidebar close on screens below 1024
        this.autoHideMenuPin();
        this._footer = false;
    };
    CorporateLayout = __decorate([
        core_1.Component({
            selector: 'corporate-layout',
            templateUrl: './corporate.component.html',
            styleUrls: ['./corporate.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], CorporateLayout);
    return CorporateLayout;
}(root_component_1.RootLayout));
exports.CorporateLayout = CorporateLayout;
//# sourceMappingURL=corporate.component.js.map