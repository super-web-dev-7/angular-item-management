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
var convert_1 = require("../util/convert");
var select_component_1 = require("./select.component");
var pgOptionComponent = /** @class */ (function () {
    function pgOptionComponent(_Select) {
        this._Select = _Select;
        this._disabled = false;
    }
    Object.defineProperty(pgOptionComponent.prototype, "Value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            if (this._value === value) {
                return;
            }
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgOptionComponent.prototype, "Label", {
        get: function () {
            return this._label;
        },
        set: function (value) {
            if (this._label === value) {
                return;
            }
            this._label = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgOptionComponent.prototype, "Disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    pgOptionComponent.prototype.ngOnInit = function () {
        this._Select.addOption(this);
    };
    pgOptionComponent.prototype.ngOnDestroy = function () {
        this._Select.removeOption(this);
    };
    __decorate([
        core_1.ContentChild('OptionTemplate', { static: true }),
        __metadata("design:type", Object)
    ], pgOptionComponent.prototype, "OptionTemplate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgOptionComponent.prototype, "Value", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgOptionComponent.prototype, "Label", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgOptionComponent.prototype, "Disabled", null);
    pgOptionComponent = __decorate([
        core_1.Component({
            selector: 'pg-selectfx-option',
            encapsulation: core_1.ViewEncapsulation.None,
            template: "\n    <ng-content></ng-content>\n  ",
            styleUrls: []
        }),
        __metadata("design:paramtypes", [select_component_1.pgSelectFXComponent])
    ], pgOptionComponent);
    return pgOptionComponent;
}());
exports.pgOptionComponent = pgOptionComponent;
//# sourceMappingURL=option.component.js.map