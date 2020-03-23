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
var ViewDirective = /** @class */ (function () {
    function ViewDirective(parallaxEl, renderer) {
        this.parallaxEl = parallaxEl;
        this.renderer = renderer;
    }
    ViewDirective.prototype.onClick = function (e) {
        e.preventDefault();
        if (this.parentView != null) {
            var parent = document.getElementById(this.parentView);
            if (parent) {
                if (this.animationType != null) {
                    pg.toggleClass(parent, this.animationType);
                }
                else {
                    pg.toggleClass(parent, 'push-parrallax');
                }
            }
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ViewDirective.prototype, "parentView", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ViewDirective.prototype, "animationType", void 0);
    __decorate([
        core_1.HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ViewDirective.prototype, "onClick", null);
    ViewDirective = __decorate([
        core_1.Directive({
            selector: '[pg-view-trigger]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2])
    ], ViewDirective);
    return ViewDirective;
}());
exports.ViewDirective = ViewDirective;
//# sourceMappingURL=view.directive.js.map