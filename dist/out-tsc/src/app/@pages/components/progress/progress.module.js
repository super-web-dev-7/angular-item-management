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
var progress_component_1 = require("./progress.component");
var progress_config_1 = require("./progress.config");
var ProgressModule = /** @class */ (function () {
    function ProgressModule() {
    }
    ProgressModule_1 = ProgressModule;
    ProgressModule.forRoot = function () {
        return { ngModule: ProgressModule_1, providers: [progress_config_1.ProgressConfig] };
    };
    var ProgressModule_1;
    ProgressModule = ProgressModule_1 = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [progress_component_1.ProgressComponent],
            exports: [progress_component_1.ProgressComponent]
        })
    ], ProgressModule);
    return ProgressModule;
}());
exports.ProgressModule = ProgressModule;
//# sourceMappingURL=progress.module.js.map