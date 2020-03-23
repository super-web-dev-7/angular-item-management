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
var toggler_service_1 = require("../../services/toggler.service");
var SecondarySidebarComponent = /** @class */ (function () {
    function SecondarySidebarComponent(toggler) {
        this.toggler = toggler;
        this._toggleMobileSidebar = false;
    }
    SecondarySidebarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._service = this.toggler.secondarySideBarToggle
            .subscribe(function (state) {
            if (typeof (state) === "boolean") {
                _this._toggleMobileSidebar = state;
            }
            else {
                _this._toggleMobileSidebar = state.open;
                var rect = state.$event.target.getBoundingClientRect();
                _this._togglePosition = {
                    "position": "fixed",
                    "top": (rect.top + rect.height) + "px",
                    "left": rect.left + "px",
                    "transform": "translateX(-50%)"
                };
            }
        });
    };
    SecondarySidebarComponent.prototype.ngOnDestroy = function () {
        this._service.unsubscribe();
    };
    Object.defineProperty(SecondarySidebarComponent.prototype, "extraClass", {
        set: function (value) {
            this._extraClass = value;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], SecondarySidebarComponent.prototype, "extraClass", null);
    SecondarySidebarComponent = __decorate([
        core_1.Component({
            selector: 'pg-secondary-sidebar',
            templateUrl: './secondary-sidebar.component.html',
            styleUrls: ['./secondary-sidebar.component.scss']
        }),
        __metadata("design:paramtypes", [toggler_service_1.pagesToggleService])
    ], SecondarySidebarComponent);
    return SecondarySidebarComponent;
}());
exports.SecondarySidebarComponent = SecondarySidebarComponent;
//# sourceMappingURL=secondary-sidebar.component.js.map