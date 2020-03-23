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
var slider_marks_component_1 = require("./slider-marks.component");
var pgSliderStepComponent = /** @class */ (function () {
    function pgSliderStepComponent() {
        this._vertical = false;
        this._included = false;
        // Dynamic properties
        this.LowerBound = null;
        this.UpperBound = null;
    }
    Object.defineProperty(pgSliderStepComponent.prototype, "Vertical", {
        get: function () {
            return this._vertical;
        },
        set: function (value) {
            this._vertical = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSliderStepComponent.prototype, "Included", {
        get: function () {
            return this._included;
        },
        set: function (value) {
            this._included = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    pgSliderStepComponent.prototype.ngOnChanges = function (changes) {
        if (changes.MarksArray) {
            this.buildAttrs();
        }
        if (changes.MarksArray || changes.LowerBound || changes.UpperBound) {
            this.togglePointActive();
        }
    };
    pgSliderStepComponent.prototype.trackById = function (index, attr) {
        return attr.id;
    };
    pgSliderStepComponent.prototype.buildAttrs = function () {
        var orient = this.Vertical ? 'bottom' : 'left';
        var prefixCls = this.PrefixCls;
        this.attrs = this.MarksArray.map(function (mark) {
            var _a, _b;
            var value = mark.value, offset = mark.offset;
            return {
                id: value,
                value: value,
                offset: offset,
                style: (_a = {},
                    _a[orient] = offset + "%",
                    _a),
                classes: (_b = {},
                    _b[prefixCls + "-dot"] = true,
                    _b[prefixCls + "-dot-active"] = false,
                    _b)
            };
        });
    };
    pgSliderStepComponent.prototype.togglePointActive = function () {
        var _this = this;
        if (this.attrs && this.LowerBound !== null && this.UpperBound !== null) {
            this.attrs.forEach(function (attr) {
                var value = attr.value;
                var isActive = (!_this.Included && value === _this.UpperBound) ||
                    (_this.Included && value <= _this.UpperBound && value >= _this.LowerBound);
                attr.classes[_this.PrefixCls + "-dot-active"] = isActive;
            });
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], pgSliderStepComponent.prototype, "LowerBound", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], pgSliderStepComponent.prototype, "UpperBound", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", slider_marks_component_1.MarksArray)
    ], pgSliderStepComponent.prototype, "MarksArray", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], pgSliderStepComponent.prototype, "PrefixCls", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSliderStepComponent.prototype, "Vertical", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSliderStepComponent.prototype, "Included", null);
    pgSliderStepComponent = __decorate([
        core_1.Component({
            selector: 'pg-slider-step',
            encapsulation: core_1.ViewEncapsulation.None,
            template: "\n    <div class=\"{{PrefixCls}}-step\">\n      <span *ngFor=\"let attr of attrs; trackBy: trackById\" [ngClass]=\"attr.classes\" [ngStyle]=\"attr.style\"></span>\n    </div>\n  "
        })
    ], pgSliderStepComponent);
    return pgSliderStepComponent;
}());
exports.pgSliderStepComponent = pgSliderStepComponent;
//# sourceMappingURL=slider-step.component.js.map