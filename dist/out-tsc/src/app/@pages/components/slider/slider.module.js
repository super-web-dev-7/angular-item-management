"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
* Author : NG-ZORRO - ANT UI
* Github : https://github.com/NG-ZORRO/ng-zorro-antd
* Copyright Reserved : MIT LICENSE
* Modified : Ace Revox
*/
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var slider_handle_component_1 = require("./slider-handle.component");
var slider_marks_component_1 = require("./slider-marks.component");
var slider_step_component_1 = require("./slider-step.component");
var slider_track_component_1 = require("./slider-track.component");
var slider_component_1 = require("./slider.component");
var slider_service_1 = require("./slider.service");
var pgSliderModule = /** @class */ (function () {
    function pgSliderModule() {
    }
    pgSliderModule = __decorate([
        core_1.NgModule({
            exports: [slider_component_1.pgSliderComponent, slider_track_component_1.pgSliderTrackComponent, slider_handle_component_1.pgSliderHandleComponent, slider_step_component_1.pgSliderStepComponent, slider_marks_component_1.pgSliderMarksComponent],
            declarations: [slider_component_1.pgSliderComponent, slider_track_component_1.pgSliderTrackComponent, slider_handle_component_1.pgSliderHandleComponent, slider_step_component_1.pgSliderStepComponent, slider_marks_component_1.pgSliderMarksComponent],
            imports: [common_1.CommonModule, ngx_bootstrap_1.TooltipModule],
            providers: [slider_service_1.SliderService]
        })
    ], pgSliderModule);
    return pgSliderModule;
}());
exports.pgSliderModule = pgSliderModule;
//# sourceMappingURL=slider.module.js.map