"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
Author : NG-ZORRO
Profile : https://github.com/NG-ZORRO
Repository : https://github.com/NG-ZORRO/ng-zorro-antd
version : 0.6
Modifed : Yes
*/
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var select_module_1 = require("../select/select.module");
var calendar_component_1 = require("./calendar.component");
var pgCalendarViewModule = /** @class */ (function () {
    function pgCalendarViewModule() {
    }
    pgCalendarViewModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, select_module_1.pgSelectModule, forms_1.FormsModule],
            declarations: [calendar_component_1.pgCalendarViewComponent],
            exports: [calendar_component_1.pgCalendarViewComponent]
        })
    ], pgCalendarViewModule);
    return pgCalendarViewModule;
}());
exports.pgCalendarViewModule = pgCalendarViewModule;
//# sourceMappingURL=calendar.module.js.map