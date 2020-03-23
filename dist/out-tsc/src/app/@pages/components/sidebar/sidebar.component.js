"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var toggler_service_1 = require("../../services/toggler.service");
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(appSidebar, toggler) {
        var _this = this;
        this.appSidebar = appSidebar;
        this.toggler = toggler;
        this.subscriptions = [];
        this.pin = false;
        this.drawer = false;
        this.sideBarWidth = 280;
        this.sideBarWidthCondensed = 280 - 70;
        this.subscriptions.push(this.toggler.sideBarToggle.subscribe(function (toggle) { _this.toggleMobile(toggle); }));
        this.subscriptions.push(this.toggler.pageContainerHover.subscribe(function (message) { _this.closeSideBar(); }));
        this.subscriptions.push(this.toggler.menuDrawer.subscribe(function (message) { _this.toggleDrawer(); }));
        this.mobileSidebar = false;
    }
    SidebarComponent.prototype.ngOnInit = function () {
    };
    SidebarComponent.prototype.ngOnDestroy = function () {
        for (var _i = 0, _a = this.subscriptions; _i < _a.length; _i++) {
            var subs = _a[_i];
            subs.unsubscribe();
        }
        clearTimeout(this.timer);
    };
    SidebarComponent.prototype.openSideBar = function () {
        if (pg.isVisibleSm() || pg.isVisibleXs())
            return false;
        if (this.pin)
            return false;
        this.style = 'translate3d(' + this.sideBarWidthCondensed + 'px, 0,0)';
        pg.addClass(document.body, "sidebar-visible");
    };
    SidebarComponent.prototype.closeSideBar = function () {
        if (pg.isVisibleSm() || pg.isVisibleXs())
            return false;
        if (this.pin)
            return false;
        this.style = 'translate3d(0,0,0)';
        pg.removeClass(document.body, "sidebar-visible");
        //this.drawer = false;
    };
    SidebarComponent.prototype.toggleMenuPin = function () {
        if (this.pin)
            this.pin = false;
        else
            this.pin = true;
    };
    SidebarComponent.prototype.toggleDrawer = function () {
        if (this.drawer)
            this.drawer = false;
        else
            this.drawer = true;
    };
    SidebarComponent.prototype.toggleMobile = function (toggle) {
        var _this = this;
        clearTimeout(this.timer);
        if (toggle) {
            this.mobileSidebar = toggle;
        }
        else {
            this.timer = setTimeout(function () {
                _this.mobileSidebar = toggle;
            }, 400);
        }
    };
    __decorate([
        core_1.HostBinding('style.transform'),
        __metadata("design:type", String)
    ], SidebarComponent.prototype, "style", void 0);
    __decorate([
        core_1.ContentChild('sideBarOverlay', { static: true }),
        __metadata("design:type", core_1.TemplateRef)
    ], SidebarComponent.prototype, "sideBarOverlay", void 0);
    __decorate([
        core_1.ContentChild('sideBarHeader', { static: true }),
        __metadata("design:type", core_1.TemplateRef)
    ], SidebarComponent.prototype, "sideBarHeader", void 0);
    __decorate([
        core_1.ContentChild('menuItems', { static: true }),
        __metadata("design:type", core_1.TemplateRef)
    ], SidebarComponent.prototype, "menuItems", void 0);
    __decorate([
        core_1.HostBinding('class.visible'),
        __metadata("design:type", Boolean)
    ], SidebarComponent.prototype, "mobileSidebar", void 0);
    __decorate([
        core_1.HostListener('mouseenter', ["$event"]),
        core_1.HostListener('click', ["$event"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], SidebarComponent.prototype, "openSideBar", null);
    SidebarComponent = __decorate([
        core_1.Component({
            selector: 'pg-sidebar',
            templateUrl: './sidebar.component.html',
            styleUrls: ['./sidebar.component.scss'],
            host: {
                'class': 'page-sidebar',
            },
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, toggler_service_1.pagesToggleService])
    ], SidebarComponent);
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;
//# sourceMappingURL=sidebar.component.js.map