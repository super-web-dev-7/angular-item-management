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
var pgRetinaDirective = /** @class */ (function () {
    function pgRetinaDirective(El, renderer) {
        this.El = El;
        this.renderer = renderer;
        this.isRetina = false;
        this.isRetina = window.devicePixelRatio > 1;
    }
    Object.defineProperty(pgRetinaDirective.prototype, "src2x", {
        set: function (value) {
            this._srcRetina = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgRetinaDirective.prototype, "src1x", {
        set: function (value) {
            this._src = value;
        },
        enumerable: true,
        configurable: true
    });
    pgRetinaDirective.prototype.ngOnInit = function () {
        if (this.isRetina) {
            this.renderer.setAttribute(this.El.nativeElement, "src", this._srcRetina);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgRetinaDirective.prototype, "src2x", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgRetinaDirective.prototype, "src1x", null);
    pgRetinaDirective = __decorate([
        core_1.Directive({
            selector: '[pgRetina]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2])
    ], pgRetinaDirective);
    return pgRetinaDirective;
}());
exports.pgRetinaDirective = pgRetinaDirective;
//# sourceMappingURL=retina.directive.js.map