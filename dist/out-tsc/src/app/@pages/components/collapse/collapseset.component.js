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
var pgCollapsesetComponent = /** @class */ (function () {
    function pgCollapsesetComponent() {
        this._accordion = false;
        this._horizontal = true;
        this.panels = [];
    }
    Object.defineProperty(pgCollapsesetComponent.prototype, "Accordion", {
        get: function () {
            return this._accordion;
        },
        set: function (value) {
            this._accordion = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgCollapsesetComponent.prototype, "Horizontal", {
        get: function () {
            return this._horizontal;
        },
        set: function (value) {
            this._horizontal = value;
        },
        enumerable: true,
        configurable: true
    });
    pgCollapsesetComponent.prototype.pgClick = function (collapse) {
        var _this = this;
        if (this.Accordion) {
            this.panels.map(function (item, index) {
                var curIndex = _this.panels.indexOf(collapse);
                if (index !== curIndex) {
                    item.Active = false;
                }
            });
        }
    };
    pgCollapsesetComponent.prototype.addTab = function (collapse) {
        this.panels.push(collapse);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgCollapsesetComponent.prototype, "Accordion", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgCollapsesetComponent.prototype, "Horizontal", null);
    pgCollapsesetComponent = __decorate([
        core_1.Component({
            selector: 'pg-collapseset',
            encapsulation: core_1.ViewEncapsulation.None,
            template: "\n    <div class=\"card-group\" [class.horizontal]=\"Horizontal\">\n      <ng-content></ng-content>\n    </div>\n  ",
        })
    ], pgCollapsesetComponent);
    return pgCollapsesetComponent;
}());
exports.pgCollapsesetComponent = pgCollapsesetComponent;
//# sourceMappingURL=collapseset.component.js.map