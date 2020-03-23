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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
var core_1 = require("@angular/core");
var collapseset_component_1 = require("./collapseset.component");
var pgCollapseComponent = /** @class */ (function () {
    function pgCollapseComponent(_collapseSet, _elementRef) {
        this._collapseSet = _collapseSet;
        this._elementRef = _elementRef;
        this._disabled = false;
        this._active = false;
        this._el = this._elementRef.nativeElement;
        this._collapseSet.addTab(this);
    }
    Object.defineProperty(pgCollapseComponent.prototype, "Disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCollapseComponent.prototype, "Active", {
        get: function () {
            return this._active;
        },
        set: function (value) {
            var active = value;
            if (this._active === active) {
                return;
            }
            if (!this.Disabled) {
                this._active = active;
            }
        },
        enumerable: true,
        configurable: true
    });
    pgCollapseComponent.prototype.clickHeader = function ($event) {
        this.Active = !this.Active;
        /** trigger host collapseSet click event */
        this._collapseSet.pgClick(this);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], pgCollapseComponent.prototype, "Title", void 0);
    __decorate([
        core_1.Input(),
        core_1.HostBinding('class.disabled'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgCollapseComponent.prototype, "Disabled", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgCollapseComponent.prototype, "Active", null);
    pgCollapseComponent = __decorate([
        core_1.Component({
            selector: 'pg-collapse',
            templateUrl: './collapse.component.html',
            animations: [
                animations_1.trigger('collapseState', [
                    animations_1.state('inactive', animations_1.style({
                        opacity: '0',
                        height: 0
                    })),
                    animations_1.state('active', animations_1.style({
                        opacity: '1',
                        height: '*'
                    })),
                    animations_1.transition('inactive => active', animations_1.animate('125ms ease-in')),
                    animations_1.transition('active => inactive', animations_1.animate('125ms ease-out'))
                ])
            ],
            host: {
                '[class.card]': 'true',
                '[class.card-default]': 'true',
                '[class.m-b-0]': 'true',
            }
        }),
        __param(0, core_1.Host()),
        __metadata("design:paramtypes", [collapseset_component_1.pgCollapsesetComponent, core_1.ElementRef])
    ], pgCollapseComponent);
    return pgCollapseComponent;
}());
exports.pgCollapseComponent = pgCollapseComponent;
//# sourceMappingURL=collapse.component.js.map