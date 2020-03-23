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
var ProgressComponent = /** @class */ (function () {
    function ProgressComponent() {
    }
    Object.defineProperty(ProgressComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            if (this.type == "circle") {
                this._value = (value / 100) * 360;
                if (this.value >= 50) {
                    this._value2 = true;
                }
            }
            else
                this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressComponent.prototype, "value2", {
        get: function () {
            return this._value2;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ProgressComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ProgressComponent.prototype, "color", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ProgressComponent.prototype, "thick", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ProgressComponent.prototype, "indeterminate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], ProgressComponent.prototype, "value", null);
    ProgressComponent = __decorate([
        core_1.Component({
            selector: 'pg-progress',
            templateUrl: './progress.component.html',
            styleUrls: ['./progress.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], ProgressComponent);
    return ProgressComponent;
}());
exports.ProgressComponent = ProgressComponent;
//# sourceMappingURL=progress.component.js.map