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
var pgTabLabelDirective = /** @class */ (function () {
    function pgTabLabelDirective(elementRef) {
        this.elementRef = elementRef;
        this._disabled = false;
    }
    Object.defineProperty(pgTabLabelDirective.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    pgTabLabelDirective.prototype.getOffsetLeft = function () {
        return this.elementRef.nativeElement.offsetLeft;
    };
    pgTabLabelDirective.prototype.getOffsetWidth = function () {
        return this.elementRef.nativeElement.offsetWidth;
    };
    pgTabLabelDirective.prototype.getOffsetTop = function () {
        return this.elementRef.nativeElement.offsetTop;
    };
    pgTabLabelDirective.prototype.getOffsetHeight = function () {
        return this.elementRef.nativeElement.offsetHeight;
    };
    __decorate([
        core_1.Input(),
        core_1.HostBinding('class.nav-item-disabled'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgTabLabelDirective.prototype, "disabled", null);
    pgTabLabelDirective = __decorate([
        core_1.Directive({
            selector: '[pg-tab-label]',
            host: {
                '[class.nav-item]': 'true'
            }
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], pgTabLabelDirective);
    return pgTabLabelDirective;
}());
exports.pgTabLabelDirective = pgTabLabelDirective;
//# sourceMappingURL=tab-label.directive.js.map