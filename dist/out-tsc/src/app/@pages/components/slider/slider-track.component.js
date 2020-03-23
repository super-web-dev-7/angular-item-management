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
var pgSliderTrackComponent = /** @class */ (function () {
    function pgSliderTrackComponent() {
        this._vertical = false;
        this._included = false;
        this.style = {};
    }
    Object.defineProperty(pgSliderTrackComponent.prototype, "Vertical", {
        get: function () {
            return this._vertical;
        },
        set: function (value) {
            this._vertical = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgSliderTrackComponent.prototype, "Included", {
        get: function () {
            return this._included;
        },
        set: function (value) {
            this._included = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    pgSliderTrackComponent.prototype.ngOnChanges = function (changes) {
        if (changes.Included) {
            this.style.visibility = this.Included ? 'visible' : 'hidden';
        }
        if (changes.Vertical || changes.Offset || changes.Length) {
            if (this.Vertical) {
                this.style.bottom = this.Offset + "%";
                this.style.height = this.Length + "%";
            }
            else {
                this.style.left = this.Offset + "%";
                this.style.width = this.Length + "%";
            }
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], pgSliderTrackComponent.prototype, "Offset", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], pgSliderTrackComponent.prototype, "Length", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], pgSliderTrackComponent.prototype, "ClassName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSliderTrackComponent.prototype, "Vertical", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgSliderTrackComponent.prototype, "Included", null);
    pgSliderTrackComponent = __decorate([
        core_1.Component({
            selector: 'pg-slider-track',
            encapsulation: core_1.ViewEncapsulation.None,
            template: "\n    <div [class]=\"ClassName\" [ngStyle]=\"style\"></div>\n  "
        })
    ], pgSliderTrackComponent);
    return pgSliderTrackComponent;
}());
exports.pgSliderTrackComponent = pgSliderTrackComponent;
//# sourceMappingURL=slider-track.component.js.map