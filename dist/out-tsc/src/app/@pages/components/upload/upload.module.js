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
var forms_1 = require("@angular/forms");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var progress_module_1 = require("../progress/progress.module");
var upload_btn_component_1 = require("./upload-btn.component");
var upload_list_component_1 = require("./upload-list.component");
var upload_component_1 = require("./upload.component");
var pgUploadModule = /** @class */ (function () {
    function pgUploadModule() {
    }
    pgUploadModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, ngx_bootstrap_1.TooltipModule, progress_module_1.ProgressModule],
            declarations: [upload_component_1.pgUploadComponent, upload_btn_component_1.pgUploadBtnComponent, upload_list_component_1.pgUploadListComponent],
            exports: [upload_component_1.pgUploadComponent]
        })
    ], pgUploadModule);
    return pgUploadModule;
}());
exports.pgUploadModule = pgUploadModule;
//# sourceMappingURL=upload.module.js.map