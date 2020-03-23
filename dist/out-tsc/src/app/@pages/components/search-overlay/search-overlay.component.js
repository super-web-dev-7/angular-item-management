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
var fade_animations_1 = require("../../animations/fade-animations");
var toggler_service_1 = require("../../services/toggler.service");
var SearchOverlayComponent = /** @class */ (function () {
    function SearchOverlayComponent(el, toggler) {
        var _this = this;
        this.el = el;
        this.toggler = toggler;
        this._isEnabled = false;
        this.isVisible = false;
        this.value = "";
        this.toggleSubscription = this.toggler.searchToggle.subscribe(function (toggleValue) { _this.open(); });
    }
    SearchOverlayComponent.prototype.ngOnDestroy = function () {
        this.toggleSubscription.unsubscribe();
    };
    Object.defineProperty(SearchOverlayComponent.prototype, "isEnabled", {
        get: function () {
            return this._isEnabled;
        },
        set: function (isEnabled) {
            this.isEnabled = isEnabled;
        },
        enumerable: true,
        configurable: true
    });
    SearchOverlayComponent.prototype.close = function ($event) {
        $event.preventDefault();
        this.isVisible = false;
        this.value = "";
    };
    SearchOverlayComponent.prototype.open = function () {
        var _this = this;
        this.isVisible = true;
        this.value = "";
        setTimeout(function () {
            _this.searchField.nativeElement.focus();
        }, 200);
    };
    SearchOverlayComponent.prototype.onKeydownHandler = function (e) {
        var nodeName = e.target.nodeName;
        //Ignore When focus on input, textarea & contenteditable
        if (nodeName == 'INPUT' || nodeName == 'TEXTAREA' || e.target.contentEditable == "true") {
            return;
        }
        //Ignore Escape
        if (this.isVisible && e.keyCode == 27) {
            this.isVisible = false;
            this.value = "";
        }
        //Ignore Keyes
        if (e.which !== 0 && e.charCode !== 0 && !e.ctrlKey && !e.metaKey && !e.altKey && e.keyCode != 27) {
            this.isVisible = true;
            if (!this.value)
                this.value = String.fromCharCode(e.keyCode | e.charCode);
            this.searchField.nativeElement.focus();
        }
    };
    SearchOverlayComponent.prototype.searchKeyPress = function (event) {
        if (this.isVisible && event.keyCode == 27) {
            this.isVisible = false;
            this.value = "";
        }
    };
    SearchOverlayComponent.prototype.fadeInComplete = function () {
        console.log("compelete");
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], SearchOverlayComponent.prototype, "isEnabled", null);
    __decorate([
        core_1.ViewChild('searchField', { static: true }),
        __metadata("design:type", Object)
    ], SearchOverlayComponent.prototype, "searchField", void 0);
    __decorate([
        core_1.HostListener('document:keypress', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], SearchOverlayComponent.prototype, "onKeydownHandler", null);
    SearchOverlayComponent = __decorate([
        core_1.Component({
            selector: 'app-search-overlay',
            templateUrl: './search-overlay.component.html',
            animations: [
                fade_animations_1.fadeAnimation
            ],
            styleUrls: ['./search-overlay.component.scss']
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, toggler_service_1.pagesToggleService])
    ], SearchOverlayComponent);
    return SearchOverlayComponent;
}());
exports.SearchOverlayComponent = SearchOverlayComponent;
//# sourceMappingURL=search-overlay.component.js.map