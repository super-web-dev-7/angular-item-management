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
var card_component_1 = require("./card.component");
var progress_module_1 = require("../progress/progress.module");
var pgCardModule = /** @class */ (function () {
    function pgCardModule() {
    }
    pgCardModule_1 = pgCardModule;
    pgCardModule.forRoot = function () {
        return {
            ngModule: pgCardModule_1
        };
    };
    var pgCardModule_1;
    pgCardModule = pgCardModule_1 = __decorate([
        core_1.NgModule({
            declarations: [card_component_1.pgCard],
            exports: [card_component_1.pgCard],
            imports: [common_1.CommonModule, progress_module_1.ProgressModule]
        })
    ], pgCardModule);
    return pgCardModule;
}());
exports.pgCardModule = pgCardModule;
//# sourceMappingURL=card.module.js.map