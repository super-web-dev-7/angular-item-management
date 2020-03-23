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
var slider_component_1 = require("./slider.component");
var pgSliderHandleComponent = /** @class */ (function () {
    function pgSliderHandleComponent(_slider) {
        this._slider = _slider;
        this.style = {};
        this._showToolTip = false;
    }
    Object.defineProperty(pgSliderHandleComponent.prototype, "Active", {
        set: function (value) {
            this._showToolTip = value;
        },
        enumerable: true,
        configurable: true
    });
    pgSliderHandleComponent.prototype.ngOnChanges = function (changes) {
        if (changes.Offset) {
            this._updateStyle();
        }
        if (changes.Value) {
            this._updateTooltipTitle(); // [For tooltip]
        }
    };
    pgSliderHandleComponent.prototype._updateTooltipTitle = function () {
        this.tooltipTitle = this.TipFormatter ? this.TipFormatter(this.Value) : "" + this.Value;
    };
    pgSliderHandleComponent.prototype._updateStyle = function () {
        this.style[this.Vertical ? 'bottom' : 'left'] = this.Offset + "%";
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], pgSliderHandleComponent.prototype, "ClassName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], pgSliderHandleComponent.prototype, "Vertical", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], pgSliderHandleComponent.prototype, "Offset", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], pgSliderHandleComponent.prototype, "Value", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], pgSliderHandleComponent.prototype, "TipFormatter", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSliderHandleComponent.prototype, "Active", null);
    pgSliderHandleComponent = __decorate([
        core_1.Component({
            selector: 'pg-slider-handle',
            encapsulation: core_1.ViewEncapsulation.None,
            template: "\n    <div [class]=\"ClassName\" [ngStyle]=\"style\">\n      <div class=\"tooltip fade top\" [class.show]=\"_showToolTip\" style=\"top: -33px;left: -7px;\">\n        <div class=\"tooltip-inner\">\n          <span>{{tooltipTitle}}</span>\n        </div>\n      </div>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [slider_component_1.pgSliderComponent])
    ], pgSliderHandleComponent);
    return pgSliderHandleComponent;
}());
exports.pgSliderHandleComponent = pgSliderHandleComponent;
//# sourceMappingURL=slider-handle.component.js.map