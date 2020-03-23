"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var pagesToggleService = /** @class */ (function () {
    function pagesToggleService() {
        //Search Toggle
        this._searchToggle = new rxjs_1.Subject();
        this.searchToggle = this._searchToggle.asObservable();
        //Quickview Toggle
        this._quickViewToggle = new rxjs_1.Subject();
        this.quickViewToggle = this._quickViewToggle.asObservable();
        //Sidebar Toggle - Mobile
        this._sideBarToggle = new rxjs_1.Subject();
        this.sideBarToggle = this._sideBarToggle.asObservable();
        //Secondary Sidebar Toggle - Mobile
        this._secondarySideBarToggle = new rxjs_1.Subject();
        this.secondarySideBarToggle = this._secondarySideBarToggle.asObservable();
        //Horizontal Menu Toggle - Mobile
        this._mobileHorizontaMenu = new rxjs_1.Subject();
        this.mobileHorizontaMenu = this._mobileHorizontaMenu.asObservable();
        //Menu Pin Toggle
        this._menuPinToggle = new rxjs_1.Subject();
        this.menuPinToggle = this._menuPinToggle.asObservable();
        //Menu Pin Toggle
        this._menuDrawer = new rxjs_1.Subject();
        this.menuDrawer = this._menuDrawer.asObservable();
        //Page Wrapper Class
        this._pageContainerClass = new rxjs_1.Subject();
        this.pageContainerClass = this._pageContainerClass.asObservable();
        //Page Content Class
        this._contentClass = new rxjs_1.Subject();
        this.contentClass = this._contentClass.asObservable();
        //Header Class
        this._headerClass = new rxjs_1.Subject();
        this.headerClass = this._headerClass.asObservable();
        //Body Layout Class
        this._bodyLayoutClass = new rxjs_1.Subject();
        this.bodyLayoutClass = this._bodyLayoutClass.asObservable();
        //App Layout
        this._layout = new rxjs_1.Subject();
        this.Applayout = this._layout.asObservable();
        //Footer Visiblity
        this._footer = new rxjs_1.Subject();
        this.Footer = this._footer.asObservable();
        //Page Container Hover Event - Used for sidebar
        this._pageContainerHover = new rxjs_1.Subject();
        this.pageContainerHover = this._pageContainerHover.asObservable();
    }
    pagesToggleService.prototype.setContent = function (className) {
        this._contentClass.next(className);
    };
    pagesToggleService.prototype.setPageContainer = function (className) {
        this._pageContainerClass.next(className);
    };
    pagesToggleService.prototype.setHeaderClass = function (className) {
        this._headerClass.next(className);
    };
    pagesToggleService.prototype.setBodyLayoutClass = function (className) {
        this._bodyLayoutClass.next(className);
    };
    pagesToggleService.prototype.removeBodyLayoutClass = function (className) {
        this._bodyLayoutClass.next(className);
    };
    pagesToggleService.prototype.changeLayout = function (className) {
        this._layout.next(className);
    };
    pagesToggleService.prototype.toggleSearch = function (toggle) {
        this._searchToggle.next({ text: toggle });
    };
    pagesToggleService.prototype.toggleMenuPin = function (toggle) {
        this._menuPinToggle.next({ text: toggle });
    };
    pagesToggleService.prototype.toggleMenuDrawer = function () {
        this._menuDrawer.next();
    };
    pagesToggleService.prototype.toggleQuickView = function () {
        this._quickViewToggle.next();
    };
    pagesToggleService.prototype.toggleMobileSideBar = function (toggle) {
        this._sideBarToggle.next(toggle);
    };
    pagesToggleService.prototype.toggleSecondarySideBar = function (toggle) {
        this._secondarySideBarToggle.next(toggle);
    };
    pagesToggleService.prototype.toggleMobileHorizontalMenu = function (toggle) {
        this._mobileHorizontaMenu.next(toggle);
    };
    pagesToggleService.prototype.toggleFooter = function (toggle) {
        this._footer.next(toggle);
    };
    pagesToggleService.prototype.triggerPageContainerHover = function (toggle) {
        this._pageContainerHover.next(toggle);
    };
    pagesToggleService = __decorate([
        core_1.Injectable()
    ], pagesToggleService);
    return pagesToggleService;
}());
exports.pagesToggleService = pagesToggleService;
//# sourceMappingURL=toggler.service.js.map