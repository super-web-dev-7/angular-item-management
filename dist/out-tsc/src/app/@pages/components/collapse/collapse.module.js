"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var collapse_component_1 = require("./collapse.component");
var collapseset_component_1 = require("./collapseset.component");
exports.PG_COLLAPSE_DIRECTIVES = [collapseset_component_1.pgCollapsesetComponent, collapse_component_1.pgCollapseComponent];
var pgCollapseModule = /** @class */ (function () {
    function pgCollapseModule() {
    }
    pgCollapseModule_1 = pgCollapseModule;
    pgCollapseModule.forRoot = function () {
        return {
            ngModule: pgCollapseModule_1
        };
    };
    var pgCollapseModule_1;
    pgCollapseModule = pgCollapseModule_1 = __decorate([
        core_1.NgModule({
            declarations: exports.PG_COLLAPSE_DIRECTIVES,
            exports: exports.PG_COLLAPSE_DIRECTIVES,
            imports: [common_1.CommonModule]
        })
    ], pgCollapseModule);
    return pgCollapseModule;
}());
exports.pgCollapseModule = pgCollapseModule;
//# sourceMappingURL=collapse.module.js.map