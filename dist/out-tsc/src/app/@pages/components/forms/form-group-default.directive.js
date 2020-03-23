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
var FormGroupDefaultDirective = /** @class */ (function () {
    function FormGroupDefaultDirective(El, renderer) {
        this.El = El;
        this.renderer = renderer;
        this._isActive = false;
    }
    FormGroupDefaultDirective.prototype.onclick = function () {
        if (this._isActive)
            return;
        this._isActive = true;
        var inputEl = this.El.nativeElement.querySelector("input");
        if (inputEl) {
            inputEl.focus();
        }
    };
    FormGroupDefaultDirective.prototype.ngOnInit = function () {
        var _this = this;
        var inputEl = this.El.nativeElement.querySelector("input");
        if (inputEl) {
            this.renderer.listen(inputEl, 'focus', function (event) {
                _this._isActive = true;
            });
            this.renderer.listen(inputEl, 'focusout', function (event) {
                _this._isActive = false;
            });
        }
    };
    __decorate([
        core_1.HostBinding('class.focused'),
        __metadata("design:type", Boolean)
    ], FormGroupDefaultDirective.prototype, "_isActive", void 0);
    __decorate([
        core_1.HostListener('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], FormGroupDefaultDirective.prototype, "onclick", null);
    FormGroupDefaultDirective = __decorate([
        core_1.Directive({
            selector: '[pgFormGroupDefault]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2])
    ], FormGroupDefaultDirective);
    return FormGroupDefaultDirective;
}());
exports.FormGroupDefaultDirective = FormGroupDefaultDirective;
//# sourceMappingURL=form-group-default.directive.js.map