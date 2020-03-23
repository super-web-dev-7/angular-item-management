"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//Angular Core
var animations_1 = require("@angular/platform-browser/animations");
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var http_2 = require("@angular/common/http");
var router_1 = require("@angular/router");
var forms_2 = require("@angular/forms");
//Routing
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
//Layouts
var layouts_1 = require("./@pages/layouts");
//Layout Service - Required
var toggler_service_1 = require("./@pages/services/toggler.service");
//Shared Layout Components
var sidebar_component_1 = require("./@pages/components/sidebar/sidebar.component");
var quickview_component_1 = require("./@pages/components/quickview/quickview.component");
var quickview_service_1 = require("./@pages/components/quickview/quickview.service");
var search_overlay_component_1 = require("./@pages/components/search-overlay/search-overlay.component");
var header_component_1 = require("./@pages/components/header/header.component");
var horizontal_menu_component_1 = require("./@pages/components/horizontal-menu/horizontal-menu.component");
var shared_module_1 = require("./@pages/components/shared.module");
var list_view_module_1 = require("./@pages/components/list-view/list-view.module");
var card_module_1 = require("./@pages/components/card/card.module");
//Basic Bootstrap Modules
var ngx_bootstrap_1 = require("ngx-bootstrap");
//Pages Globaly required Components - Optional
var tabs_module_1 = require("./@pages/components/tabs/tabs.module");
var switch_module_1 = require("./@pages/components/switch/switch.module");
var progress_module_1 = require("./@pages/components/progress/progress.module");
//Thirdparty Components / Plugins - Optional
var ngx_quill_1 = require("ngx-quill");
var ngx_perfect_scrollbar_1 = require("ngx-perfect-scrollbar");
var ngx_perfect_scrollbar_2 = require("ngx-perfect-scrollbar");
//Sample Blank Pages - Optional
var blank_corporate_component_1 = require("./@pages/layouts/blank-corporate/blank-corporate.component");
var auth_guard_1 = require("./auth/auth.guard");
var auth_interceptor_1 = require("./auth/auth-interceptor");
var card_social_component_1 = require("./@pages/components/card-social/card-social.component");
var blank_component_1 = require("./@pages/layouts/blank/blank.component");
var root_component_1 = require("./@pages/layouts/root/root.component");
var DEFAULT_PERFECT_SCROLLBAR_CONFIG = {
    suppressScrollX: true
};
//Hammer Config Overide
//https://github.com/angular/angular/issues/10541
var AppHammerConfig = /** @class */ (function (_super) {
    __extends(AppHammerConfig, _super);
    function AppHammerConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.overrides = {
            'pinch': { enable: false },
            'rotate': { enable: false }
        };
        return _this;
    }
    return AppHammerConfig;
}(platform_browser_1.HammerGestureConfig));
exports.AppHammerConfig = AppHammerConfig;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                layouts_1.CorporateLayout,
                sidebar_component_1.SidebarComponent, quickview_component_1.QuickviewComponent, search_overlay_component_1.SearchOverlayComponent, header_component_1.HeaderComponent, horizontal_menu_component_1.HorizontalMenuComponent,
                blank_component_1.BlankComponent,
                root_component_1.RootLayout,
                blank_corporate_component_1.BlankCorporateComponent,
                card_social_component_1.pgCardSocial,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_2.ReactiveFormsModule,
                http_1.HttpModule,
                http_2.HttpClientModule,
                shared_module_1.SharedModule,
                progress_module_1.ProgressModule,
                list_view_module_1.pgListViewModule,
                card_module_1.pgCardModule,
                router_1.RouterModule.forRoot(app_routing_1.AppRoutes),
                ngx_bootstrap_1.BsDropdownModule.forRoot(),
                ngx_bootstrap_1.AccordionModule.forRoot(),
                ngx_bootstrap_1.AlertModule.forRoot(),
                ngx_bootstrap_1.ButtonsModule.forRoot(),
                ngx_bootstrap_1.CollapseModule.forRoot(),
                ngx_bootstrap_1.ModalModule.forRoot(),
                ngx_bootstrap_1.ProgressbarModule.forRoot(),
                ngx_bootstrap_1.TabsModule.forRoot(),
                ngx_bootstrap_1.TooltipModule.forRoot(),
                ngx_bootstrap_1.TypeaheadModule.forRoot(),
                tabs_module_1.pgTabsModule,
                ngx_perfect_scrollbar_1.PerfectScrollbarModule,
                switch_module_1.pgSwitchModule,
                ngx_quill_1.QuillModule.forRoot()
            ],
            providers: [quickview_service_1.QuickviewService, toggler_service_1.pagesToggleService, {
                    provide: ngx_perfect_scrollbar_2.PERFECT_SCROLLBAR_CONFIG,
                    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
                },
                {
                    provide: platform_browser_1.HAMMER_GESTURE_CONFIG,
                    useClass: AppHammerConfig
                },
                auth_guard_1.AuthGuard,
                {
                    provide: http_2.HTTP_INTERCEPTORS,
                    useClass: auth_interceptor_1.AuthInterceptor,
                    multi: true
                }],
            bootstrap: [app_component_1.AppComponent],
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map