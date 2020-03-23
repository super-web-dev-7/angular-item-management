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
var ContainerComponent = /** @class */ (function () {
    function ContainerComponent() {
        this._enableHorizontalContainer = false;
        this._extraClass = "";
        this._extraHorizontalClass = "";
    }
    Object.defineProperty(ContainerComponent.prototype, "extraClass", {
        set: function (value) {
            this._extraClass = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContainerComponent.prototype, "extraHorizontalClass", {
        set: function (value) {
            this._extraHorizontalClass = value;
        },
        enumerable: true,
        configurable: true
    });
    ContainerComponent.prototype.ngOnInit = function () {
        this._enableHorizontalContainer = pg.isHorizontalLayout;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ContainerComponent.prototype, "extraClass", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ContainerComponent.prototype, "extraHorizontalClass", null);
    ContainerComponent = __decorate([
        core_1.Component({
            selector: 'pg-container',
            templateUrl: './container.component.html',
            styleUrls: ['./container.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], ContainerComponent);
    return ContainerComponent;
}());
exports.ContainerComponent = ContainerComponent;
//# sourceMappingURL=container.component.js.map