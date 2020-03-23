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
var request_animation_1 = require("../util/request-animation");
var convert_1 = require("../util/convert");
var pgTabsInkBarDirective = /** @class */ (function () {
    function pgTabsInkBarDirective(_renderer, _elementRef, _ngZone) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this._animated = false;
        this.PositionMode = 'horizontal';
    }
    Object.defineProperty(pgTabsInkBarDirective.prototype, "Animated", {
        get: function () {
            return this._animated;
        },
        set: function (value) {
            this._animated = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    pgTabsInkBarDirective.prototype.alignToElement = function (element) {
        var _this = this;
        this.show();
        this._ngZone.runOutsideAngular(function () {
            request_animation_1.reqAnimFrame(function () {
                /** when horizontal remove height style and add transfrom left **/
                if (_this.PositionMode === 'horizontal') {
                    _this._renderer.removeStyle(_this._elementRef.nativeElement, 'height');
                    _this._renderer.setStyle(_this._elementRef.nativeElement, 'transform', "translate3d(" + _this._getLeftPosition(element) + ", 0px, 0px)");
                    _this._renderer.setStyle(_this._elementRef.nativeElement, 'width', _this._getElementWidth(element));
                }
                else {
                    /** when vertical remove width style and add transfrom top **/
                    _this._renderer.removeStyle(_this._elementRef.nativeElement, 'width');
                    _this._renderer.setStyle(_this._elementRef.nativeElement, 'transform', "translate3d(0px, " + _this._getTopPosition(element) + ", 0px)");
                    _this._renderer.setStyle(_this._elementRef.nativeElement, 'height', _this._getElementHeight(element));
                }
            });
        });
    };
    pgTabsInkBarDirective.prototype.show = function () {
        this._renderer.setStyle(this._elementRef.nativeElement, 'visibility', 'visible');
    };
    pgTabsInkBarDirective.prototype.setDisplay = function (value) {
        this._renderer.setStyle(this._elementRef.nativeElement, 'display', value);
    };
    pgTabsInkBarDirective.prototype.hide = function () {
        this._renderer.setStyle(this._elementRef.nativeElement, 'visibility', 'hidden');
    };
    pgTabsInkBarDirective.prototype._getLeftPosition = function (element) {
        return element ? element.offsetLeft + 'px' : '0';
    };
    pgTabsInkBarDirective.prototype._getElementWidth = function (element) {
        return element ? element.offsetWidth + 'px' : '0';
    };
    pgTabsInkBarDirective.prototype._getTopPosition = function (element) {
        return element ? element.offsetTop + 'px' : '0';
    };
    pgTabsInkBarDirective.prototype._getElementHeight = function (element) {
        return element ? element.offsetHeight + 'px' : '0';
    };
    __decorate([
        core_1.Input(),
        core_1.HostBinding('class.nav-item-animated'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgTabsInkBarDirective.prototype, "Animated", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], pgTabsInkBarDirective.prototype, "PositionMode", void 0);
    pgTabsInkBarDirective = __decorate([
        core_1.Directive({
            selector: '[pg-tabs-ink-bar]',
            host: {
                '[class.nav-item]': 'true'
            }
        }),
        __metadata("design:paramtypes", [core_1.Renderer2,
            core_1.ElementRef,
            core_1.NgZone])
    ], pgTabsInkBarDirective);
    return pgTabsInkBarDirective;
}());
exports.pgTabsInkBarDirective = pgTabsInkBarDirective;
//# sourceMappingURL=tabs-ink-bar.directive.js.map