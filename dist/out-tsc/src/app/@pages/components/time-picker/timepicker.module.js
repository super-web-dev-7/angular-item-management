"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var overlay_1 = require("@angular/cdk/overlay");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var timepicker_inner_component_1 = require("./timepicker-inner.component");
var timepicker_component_1 = require("./timepicker.component");
var pg_util_module_1 = require("../util/pg-util.module");
var pgTimePickerModule = /** @class */ (function () {
    function pgTimePickerModule() {
    }
    pgTimePickerModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, overlay_1.OverlayModule, pg_util_module_1.pgUtilModule],
            declarations: [timepicker_component_1.pgTimePickerComponent, timepicker_inner_component_1.pgTimePickerInnerComponent],
            exports: [timepicker_component_1.pgTimePickerComponent, timepicker_inner_component_1.pgTimePickerInnerComponent]
        })
    ], pgTimePickerModule);
    return pgTimePickerModule;
}());
exports.pgTimePickerModule = pgTimePickerModule;
//# sourceMappingURL=timepicker.module.js.map