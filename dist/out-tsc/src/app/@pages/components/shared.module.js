"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var observers_1 = require("@angular/cdk/observers");
var secondary_sidebar_component_1 = require("./secondary-sidebar/secondary-sidebar.component");
var quickview_service_1 = require("./quickview/quickview.service");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var parallax_directive_1 = require("./parallax/parallax.directive");
var breadcrumb_component_1 = require("./breadcrumb/breadcrumb.component");
var form_group_default_directive_1 = require("./forms/form-group-default.directive");
var view_directive_1 = require("./view/view.directive");
var collapse_module_1 = require("./collapse/collapse.module");
var ngx_perfect_scrollbar_1 = require("ngx-perfect-scrollbar");
var ngx_perfect_scrollbar_2 = require("ngx-perfect-scrollbar");
var container_component_1 = require("./container/container.component");
var page_container_component_1 = require("./container/page-container.component");
var router_1 = require("@angular/router");
var menu_component_1 = require("./menu/menu.component");
var menu_alt_component_1 = require("./menu/menu-alt.component");
var menu_icon_component_1 = require("./menu/menu-icon.component");
var list_item_component_1 = require("./list-view/list-item/list-item.component");
var list_view_container_component_1 = require("./list-view/list-view-container/list-view-container.component");
var retina_directive_1 = require("./retina/retina.directive");
var DEFAULT_PERFECT_SCROLLBAR_CONFIG = {
    suppressScrollX: true
};
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                observers_1.ObserversModule,
                ngx_bootstrap_1.TypeaheadModule.forRoot(),
                ngx_perfect_scrollbar_1.PerfectScrollbarModule,
                router_1.RouterModule
            ],
            declarations: [
                secondary_sidebar_component_1.SecondarySidebarComponent,
                parallax_directive_1.ParallaxDirective,
                breadcrumb_component_1.BreadcrumbComponent,
                form_group_default_directive_1.FormGroupDefaultDirective,
                view_directive_1.ViewDirective,
                container_component_1.ContainerComponent,
                page_container_component_1.pageContainer,
                menu_component_1.MenuComponent,
                menu_alt_component_1.MenuAltComponent,
                menu_icon_component_1.MenuIconComponent,
                list_item_component_1.ListItemComponent,
                list_view_container_component_1.ListViewContainerComponent,
                retina_directive_1.pgRetinaDirective,
            ],
            exports: [
                secondary_sidebar_component_1.SecondarySidebarComponent,
                parallax_directive_1.ParallaxDirective,
                breadcrumb_component_1.BreadcrumbComponent,
                form_group_default_directive_1.FormGroupDefaultDirective,
                view_directive_1.ViewDirective,
                collapse_module_1.pgCollapseModule,
                container_component_1.ContainerComponent,
                page_container_component_1.pageContainer,
                menu_component_1.MenuComponent,
                menu_alt_component_1.MenuAltComponent,
                menu_icon_component_1.MenuIconComponent,
                list_item_component_1.ListItemComponent,
                list_view_container_component_1.ListViewContainerComponent,
                retina_directive_1.pgRetinaDirective
            ],
            providers: [quickview_service_1.QuickviewService,
                {
                    provide: ngx_perfect_scrollbar_2.PERFECT_SCROLLBAR_CONFIG,
                    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
                }
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map