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
var pgTabBodyComponent = /** @class */ (function () {
    function pgTabBodyComponent() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", core_1.TemplateRef)
    ], pgTabBodyComponent.prototype, "content", void 0);
    pgTabBodyComponent = __decorate([
        core_1.Component({
            selector: 'pg-tab-body',
            encapsulation: core_1.ViewEncapsulation.None,
            template: "\n    <ng-template [ngTemplateOutlet]=\"content\"></ng-template>\n  ",
        })
    ], pgTabBodyComponent);
    return pgTabBodyComponent;
}());
exports.pgTabBodyComponent = pgTabBodyComponent;
//# sourceMappingURL=tab-body.component.js.map