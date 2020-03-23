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
var router_1 = require("@angular/router");
var RootLayout = /** @class */ (function () {
    function RootLayout(toggler, router) {
        var _this = this;
        this.toggler = toggler;
        this.router = router;
        this._boxed = false;
        this._menuPin = false;
        this._pageContainerClass = "";
        this._contentClass = "";
        this._footer = true;
        this._menuDrawerOpen = false;
        //Mobile
        this._secondarySideBar = false;
        //Mobile
        this._mobileSidebar = false;
        //Mobile
        this._mobileHorizontalMenu = false;
        this._subscriptions = [];
        this.contentClass = "";
        this.pageWrapperClass = "";
        this.footer = true;
        if (this.layoutState) {
            pg.addClass(document.body, this.layoutState);
        }
        router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationEnd) {
                var root = _this.router.routerState.snapshot.root;
                while (root) {
                    if (root.children && root.children.length) {
                        root = root.children[0];
                    }
                    else if (root.data) {
                        //Custom Route Data here
                        _this._pageTitle = root.data["title"];
                        _this._layoutOption = root.data["layoutOption"];
                        _this._boxed = root.data["boxed"];
                        break;
                    }
                    else {
                        break;
                    }
                }
                //Reset Any Extra Layouts added from content pages
                pg.removeClass(document.body, _this.extraLayoutClass);
                //Close Sidebar and Horizonta Menu
                if (_this._mobileSidebar) {
                    _this._mobileSidebar = false;
                    pg.removeClass(document.body, "sidebar-open");
                    _this.toggler.toggleMobileSideBar(_this._mobileSidebar);
                }
                _this._mobileHorizontalMenu = false;
                _this.toggler.toggleMobileHorizontalMenu(_this._mobileHorizontalMenu);
                //Scoll Top
                _this.scrollToTop();
            }
            //Subscribition List
            _this._subscriptions.push(_this.toggler.pageContainerClass
                .subscribe(function (state) {
                _this._pageContainerClass = state;
            }));
            _this._subscriptions.push(_this.toggler.contentClass
                .subscribe(function (state) {
                _this._contentClass = state;
            }));
            _this._subscriptions.push(_this.toggler.bodyLayoutClass
                .subscribe(function (state) {
                if (state) {
                    _this.extraLayoutClass = state;
                    pg.addClass(document.body, _this.extraLayoutClass);
                }
            }));
            _this._subscriptions.push(_this.toggler.Applayout
                .subscribe(function (state) {
                _this.changeLayout(state);
            }));
            _this._subscriptions.push(_this.toggler.Footer
                .subscribe(function (state) {
                _this._footer = state;
            }));
            _this._subscriptions.push(_this.toggler.mobileHorizontaMenu
                .subscribe(function (state) {
                _this._mobileHorizontalMenu = state;
            }));
        });
    }
    ;
    /** @function changeLayout
    *   @description Add Document Layout Class
    */
    RootLayout.prototype.changeLayout = function (type) {
        this.layoutState = type;
        if (type) {
            pg.addClass(document.body, type);
        }
    };
    /** @function removeLayout
    *   @description Remove Document Layout Class
    */
    RootLayout.prototype.removeLayout = function (type) {
        pg.removeClass(document.body, type);
    };
    RootLayout.prototype.ngOnInit = function () {
    };
    RootLayout.prototype.ngOnDestroy = function () {
        for (var _i = 0, _a = this._subscriptions; _i < _a.length; _i++) {
            var sub = _a[_i];
            sub.unsubscribe();
        }
    };
    RootLayout.prototype.ngAfterViewInit = function () {
    };
    /** @function scrollToTop
    *   @description Force to scroll to top of page. Used on Route
    */
    RootLayout.prototype.scrollToTop = function () {
        var top = window.pageYOffset;
        if (top == 0) {
            var scroller = document.querySelector(".page-container");
            if (scroller)
                scroller.scrollTo(0, 0);
        }
        else {
            window.scrollTo(0, 0);
        }
    };
    /** @function openQuickView
    *   @description Show Quick View Component / Right Sidebar - Service
    */
    RootLayout.prototype.openQuickView = function ($e) {
        $e.preventDefault();
        this.toggler.toggleQuickView();
    };
    /** @function openSearch
    *   @description Show Quick Search Component - Service
    */
    RootLayout.prototype.openSearch = function ($e) {
        $e.preventDefault();
        this.toggler.toggleSearch(true);
    };
    /** @function toggleMenuPin
    *   @description Permanently Open / Close Main Sidebar
    */
    RootLayout.prototype.toggleMenuPin = function ($e) {
        if (pg.isVisibleSm()) {
            this._menuPin = false;
            return;
        }
        if (this._menuPin) {
            pg.removeClass(document.body, "menu-pin");
            this._menuPin = false;
        }
        else {
            pg.addClass(document.body, "menu-pin");
            this._menuPin = true;
        }
    };
    /** @function toggleMenuDrawer
    *   @description Open Main Sidebar Menu Drawer - Service
    */
    RootLayout.prototype.toggleMenuDrawer = function () {
        this._menuDrawerOpen = (this._menuDrawerOpen == true ? false : true);
        this.toggler.toggleMenuDrawer();
    };
    /** @function toggleMobileSidebar
    *   @description Open Main Sidebar on Mobile - Service
    */
    RootLayout.prototype.toggleMobileSidebar = function () {
        if (this._mobileSidebar) {
            this._mobileSidebar = false;
            pg.removeClass(document.body, "sidebar-open");
        }
        else {
            this._mobileSidebar = true;
            pg.addClass(document.body, "sidebar-open");
        }
        this.toggler.toggleMobileSideBar(this._mobileSidebar);
    };
    /** @function toggleHorizontalMenuMobile
    *   @description Open Secondary Sidebar on Mobile - Service
    */
    RootLayout.prototype.toggleSecondarySideBar = function () {
        console.log("hi");
        this._secondarySideBar = (this._secondarySideBar == true ? false : true);
        this.toggler.toggleSecondarySideBar(this._secondarySideBar);
    };
    /** @function toggleHorizontalMenuMobile
    *   @description Call Horizontal Menu Toggle Service for mobile
    */
    RootLayout.prototype.toggleHorizontalMenuMobile = function () {
        this._mobileHorizontalMenu = (this._mobileHorizontalMenu == true ? false : true);
        this.toggler.toggleMobileHorizontalMenu(this._mobileHorizontalMenu);
    };
    RootLayout.prototype.onResize = function () {
        this.autoHideMenuPin();
    };
    //Utils
    RootLayout.prototype.autoHideMenuPin = function () {
        if (window.innerWidth < 1025) {
            if (pg.hasClass(document.body, "menu-pin")) {
                pg.addClass(document.body, "menu-unpinned");
                pg.removeClass(document.body, "menu-pin");
            }
        }
        else {
            if (pg.hasClass(document.body, "menu-unpinned")) {
                pg.addClass(document.body, "menu-pin");
            }
        }
    };
    __decorate([
        core_1.ViewChild('root', { static: false }),
        __metadata("design:type", Object)
    ], RootLayout.prototype, "root", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], RootLayout.prototype, "contentClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], RootLayout.prototype, "pageWrapperClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], RootLayout.prototype, "footer", void 0);
    __decorate([
        core_1.HostListener("window:resize", []),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], RootLayout.prototype, "onResize", null);
    RootLayout = __decorate([
        core_1.Component({
            selector: 'root-layout',
            templateUrl: './root.component.html',
            styleUrls: ['./root.component.scss'],
        }),
        __metadata("design:paramtypes", [toggler_service_1.pagesToggleService, router_1.Router])
    ], RootLayout);
    return RootLayout;
}());
exports.RootLayout = RootLayout;
//# sourceMappingURL=root.component.js.map