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
var tag_animations_1 = require("../../animations/tag-animations");
var convert_1 = require("../util/convert");
var pgTagComponent = /** @class */ (function () {
    function pgTagComponent(_elementRef, _render) {
        this._elementRef = _elementRef;
        this._render = _render;
        this._closable = false;
        this._prefixCls = 'label';
        this._closed = false;
        this._colorclass = "label-info";
        /** Event: emit before close */
        this.BeforeClose = new core_1.EventEmitter();
        // TODO: AnimationEvent is not subclass of Event, but all payloads should be unified
        /** Event: emit after close */
        this.Close = new core_1.EventEmitter();
    }
    Object.defineProperty(pgTagComponent.prototype, "Closable", {
        get: function () {
            return this._closable;
        },
        /** Whether tag is closable */
        set: function (value) {
            this._closable = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgTagComponent.prototype, "ColorClass", {
        set: function (value) {
            this._colorclass = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgTagComponent.prototype, "_dataShow", {
        get: function () {
            return !this._closed;
        },
        enumerable: true,
        configurable: true
    });
    pgTagComponent.prototype._afterClose = function (event) {
        if (this._closed) {
            this.Close.emit(event);
        }
    };
    Object.defineProperty(pgTagComponent.prototype, "_textClass", {
        get: function () {
            return this._prefixCls + "-text";
        },
        enumerable: true,
        configurable: true
    });
    pgTagComponent.prototype._close = function (event) {
        this.BeforeClose.emit(event);
        if (event.defaultPrevented) {
            return;
        }
        this._closed = true;
    };
    pgTagComponent.prototype.ngAfterViewInit = function () {
        this._render.addClass(this._elementRef.nativeElement, this._prefixCls + "-wrapper");
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgTagComponent.prototype, "Closable", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgTagComponent.prototype, "ColorClass", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], pgTagComponent.prototype, "color", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], pgTagComponent.prototype, "BeforeClose", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], pgTagComponent.prototype, "Close", void 0);
    __decorate([
        core_1.HostBinding('attr.data-show'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], pgTagComponent.prototype, "_dataShow", null);
    pgTagComponent = __decorate([
        core_1.Component({
            selector: 'pg-tag',
            encapsulation: core_1.ViewEncapsulation.None,
            animations: [
                tag_animations_1.tagAnimation
            ],
            template: "\n    <span *ngIf=\"!_closed\"\n      class=\"label\"\n      [ngClass]=\"_colorclass\"\n      [@tagAnimation]\n      (@tagAnimation.done)=\"_afterClose($event)\">\n      <span [class]=\"_textClass\"><ng-content></ng-content></span>\n      <i class=\"pg pg-close\" (click)=\"_close($event)\" *ngIf=\"Closable\"></i>\n    </span>\n  ",
            styleUrls: [
                './tag.scss',
            ]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.Renderer2])
    ], pgTagComponent);
    return pgTagComponent;
}());
exports.pgTagComponent = pgTagComponent;
//# sourceMappingURL=tag.component.js.map