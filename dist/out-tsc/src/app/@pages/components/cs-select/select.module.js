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
var forms_1 = require("@angular/forms");
var option_component_1 = require("./option.component");
var option_pipe_1 = require("./option.pipe");
var select_component_1 = require("./select.component");
var pgSelectfx = /** @class */ (function () {
    function pgSelectfx() {
    }
    pgSelectfx = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, overlay_1.OverlayModule],
            declarations: [option_pipe_1.OptionPipe, option_component_1.pgOptionComponent, select_component_1.pgSelectFXComponent],
            exports: [option_pipe_1.OptionPipe, option_component_1.pgOptionComponent, select_component_1.pgSelectFXComponent]
        })
    ], pgSelectfx);
    return pgSelectfx;
}());
exports.pgSelectfx = pgSelectfx;
//# sourceMappingURL=select.module.js.map