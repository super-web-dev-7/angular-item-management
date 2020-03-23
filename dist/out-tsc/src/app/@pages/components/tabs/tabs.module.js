"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var observers_1 = require("@angular/cdk/observers");
// import { PortalModule } from '@angular/cdk/portal';
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var tab_body_component_1 = require("./tab-body.component");
var tab_label_directive_1 = require("./tab-label.directive");
var tab_component_1 = require("./tab.component");
var tabs_ink_bar_directive_1 = require("./tabs-ink-bar.directive");
var tabs_nav_component_1 = require("./tabs-nav.component");
var tabset_component_1 = require("./tabset.component");
var pgTabsModule = /** @class */ (function () {
    function pgTabsModule() {
    }
    pgTabsModule = __decorate([
        core_1.NgModule({
            declarations: [tab_component_1.pgTabComponent, tabset_component_1.pgTabSetComponent, tabs_nav_component_1.pgTabsNavComponent, tab_label_directive_1.pgTabLabelDirective, tabs_ink_bar_directive_1.pgTabsInkBarDirective, tab_body_component_1.pgTabBodyComponent],
            exports: [tab_component_1.pgTabComponent, tabset_component_1.pgTabSetComponent, tabs_nav_component_1.pgTabsNavComponent, tab_label_directive_1.pgTabLabelDirective, tabs_ink_bar_directive_1.pgTabsInkBarDirective, tab_body_component_1.pgTabBodyComponent],
            imports: [common_1.CommonModule, observers_1.ObserversModule]
        })
    ], pgTabsModule);
    return pgTabsModule;
}());
exports.pgTabsModule = pgTabsModule;
//# sourceMappingURL=tabs.module.js.map