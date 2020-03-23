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
var tabset_component_1 = require("./tabset.component");
var pgTabComponent = /** @class */ (function () {
    function pgTabComponent(pgTabSetComponent) {
        this.pgTabSetComponent = pgTabSetComponent;
        this.disabled = false;
        this.position = null;
        this.origin = null;
        this.pgSelect = new core_1.EventEmitter();
        this.pgClick = new core_1.EventEmitter();
        this.pgDeselect = new core_1.EventEmitter();
    }
    Object.defineProperty(pgTabComponent.prototype, "Disabled", {
        get: function () {
            return this.disabled;
        },
        set: function (value) {
            this.disabled = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgTabComponent.prototype, "content", {
        get: function () {
            return this._content;
        },
        enumerable: true,
        configurable: true
    });
    pgTabComponent.prototype.ngOnInit = function () {
        this.pgTabSetComponent._tabs.push(this);
    };
    pgTabComponent.prototype.ngOnDestroy = function () {
        this.pgTabSetComponent._tabs.splice(this.pgTabSetComponent._tabs.indexOf(this), 1);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgTabComponent.prototype, "Disabled", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], pgTabComponent.prototype, "pgSelect", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], pgTabComponent.prototype, "pgClick", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], pgTabComponent.prototype, "pgDeselect", void 0);
    __decorate([
        core_1.ContentChild('TabHeading', { static: true }),
        __metadata("design:type", core_1.TemplateRef)
    ], pgTabComponent.prototype, "_tabHeading", void 0);
    __decorate([
        core_1.ViewChild(core_1.TemplateRef, { static: true }),
        __metadata("design:type", core_1.TemplateRef)
    ], pgTabComponent.prototype, "_content", void 0);
    pgTabComponent = __decorate([
        core_1.Component({
            selector: 'pg-tab',
            template: "\n    <ng-template>\n      <ng-content></ng-content>\n    </ng-template>\n  ",
            styles: [],
            host: {
                '[class.ant-tabs-tabpane]': 'true'
            }
        }),
        __metadata("design:paramtypes", [tabset_component_1.pgTabSetComponent])
    ], pgTabComponent);
    return pgTabComponent;
}());
exports.pgTabComponent = pgTabComponent;
//# sourceMappingURL=tab.component.js.map