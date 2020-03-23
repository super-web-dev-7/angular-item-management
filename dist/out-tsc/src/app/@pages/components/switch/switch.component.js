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
var forms_1 = require("@angular/forms");
var convert_1 = require("../util/convert");
var pgSwitchComponent = /** @class */ (function () {
    function pgSwitchComponent() {
        this._disabled = false;
        this._prefixCls = 'toggle-switch';
        this._color = "primary";
        this._innerPrefixCls = this._prefixCls + "-inner ";
        this._checked = false;
        // ngModel Access
        this.onChange = function () { return null; };
        this.onTouched = function () { return null; };
    }
    pgSwitchComponent_1 = pgSwitchComponent;
    Object.defineProperty(pgSwitchComponent.prototype, "Size", {
        get: function () {
            return this._size;
        },
        set: function (value) {
            this._size = value;
            this.setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSwitchComponent.prototype, "Color", {
        set: function (value) {
            this._color = value;
            this.setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSwitchComponent.prototype, "Disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = convert_1.toBoolean(value);
            this.setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    pgSwitchComponent.prototype.onClick = function (e) {
        e.preventDefault();
        if (!this._disabled) {
            this.updateValue(!this._checked);
            this.onChange(this._checked);
        }
    };
    pgSwitchComponent.prototype.updateValue = function (value) {
        if (this._checked === value) {
            return;
        }
        this._checked = value;
        this.setClassMap();
    };
    pgSwitchComponent.prototype.setClassMap = function () {
        var _a;
        this._classMap = (_a = {},
            _a[this._prefixCls] = true,
            _a[this._prefixCls + "-checked"] = this._checked,
            _a[this._prefixCls + "-disabled"] = this._disabled,
            _a[this._prefixCls + "-small"] = this._size === 'small',
            _a[this._color] = this._color,
            _a);
    };
    pgSwitchComponent.prototype.writeValue = function (value) {
        this.updateValue(value);
    };
    pgSwitchComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    pgSwitchComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    pgSwitchComponent.prototype.setDisabledState = function (isDisabled) {
        this.Disabled = isDisabled;
    };
    pgSwitchComponent.prototype.ngOnInit = function () {
        this.setClassMap();
    };
    var pgSwitchComponent_1;
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgSwitchComponent.prototype, "Size", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgSwitchComponent.prototype, "Color", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSwitchComponent.prototype, "Disabled", null);
    __decorate([
        core_1.HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], pgSwitchComponent.prototype, "onClick", null);
    pgSwitchComponent = pgSwitchComponent_1 = __decorate([
        core_1.Component({
            selector: 'pg-switch',
            encapsulation: core_1.ViewEncapsulation.None,
            template: "\n    <span [ngClass]=\"_classMap\" tabindex=\"0\">\n      <span [ngClass]=\"_innerPrefixCls\">\n        <ng-template [ngIf]=\"_checked\">\n          <ng-content select=\"[checked]\"></ng-content>\n        </ng-template>\n        <ng-template [ngIf]=\"!_checked\">\n          <ng-content select=\"[unchecked]\"></ng-content>\n        </ng-template>\n      </span>\n    </span>\n  ",
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return pgSwitchComponent_1; }),
                    multi: true
                }
            ],
            styleUrls: [
                './switch.scss'
            ]
        })
    ], pgSwitchComponent);
    return pgSwitchComponent;
}());
exports.pgSwitchComponent = pgSwitchComponent;
//# sourceMappingURL=switch.component.js.map