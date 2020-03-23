"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var overlay_1 = require("@angular/cdk/overlay");
var observers_1 = require("@angular/cdk/observers");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var datepicker_component_1 = require("./datepicker.component");
var rangepicker_component_1 = require("./rangepicker.component");
var calendar_module_1 = require("../calendar-view/calendar.module");
var timepicker_module_1 = require("../time-picker/timepicker.module");
var pg_util_module_1 = require("../util/pg-util.module");
var datepicker_scroller_component_1 = require("./datepicker-scroller.component");
var pgDatePickerModule = /** @class */ (function () {
    function pgDatePickerModule() {
    }
    pgDatePickerModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, timepicker_module_1.pgTimePickerModule, calendar_module_1.pgCalendarViewModule, forms_1.FormsModule, overlay_1.OverlayModule, pg_util_module_1.pgUtilModule, observers_1.ObserversModule],
            declarations: [datepicker_component_1.pgDatePickerComponent, rangepicker_component_1.pgRangePickerComponent, datepicker_scroller_component_1.pgDateScroller],
            exports: [datepicker_component_1.pgDatePickerComponent, rangepicker_component_1.pgRangePickerComponent]
        })
    ], pgDatePickerModule);
    return pgDatePickerModule;
}());
exports.pgDatePickerModule = pgDatePickerModule;
//# sourceMappingURL=datepicker.module.js.map