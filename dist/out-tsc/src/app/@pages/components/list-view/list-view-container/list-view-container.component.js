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
var ListViewContainerComponent = /** @class */ (function () {
    function ListViewContainerComponent(el) {
        this.el = el;
        this._items = [];
        this.elems = [];
        this.fakeHeaderHidden = false;
        this.topClassAnimated = false;
        this.config = {};
        this.isPerfectScrollbarDisabled = false;
    }
    ListViewContainerComponent.prototype.ngOnInit = function () {
    };
    ListViewContainerComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.togglePerfectScrollbar();
        });
    };
    ListViewContainerComponent.prototype.onResize = function () {
        this.togglePerfectScrollbar();
    };
    ListViewContainerComponent.prototype.togglePerfectScrollbar = function () {
        this.isPerfectScrollbarDisabled = window.innerWidth < 1025;
    };
    ListViewContainerComponent.prototype.cacheElements = function () {
        var rootRect = this.el.nativeElement.getBoundingClientRect();
        var els = this.el.nativeElement.querySelectorAll('.list-view-group-container');
        for (var i = 0; i < els.length; i++) {
            var rect = els[i].getBoundingClientRect();
            var offsetTop = rect.top - rootRect.top;
            var headerElement = els[i].querySelector(".list-view-group-header");
            this.elems.push({
                'listHeight': rect.height,
                'headerHeight': headerElement.offsetHeight,
                'listOffset': offsetTop,
                'listBottom': rect.height + offsetTop,
                'animated': false
            });
        }
        this.computeHeader();
    };
    ListViewContainerComponent.prototype.computeHeader = function () {
        var currentTop = this.itemListWrapper.nativeElement.scrollTop;
        var offscreenElement, topElementBottom, topIndex = 0;
        var i = 0;
        while ((this.elems[i].listOffset - currentTop) <= 0) {
            this.topElement = this.elems[i];
            topIndex = i;
            topElementBottom = this.topElement.listBottom - currentTop;
            if (topElementBottom < -this.topElement.headerHeight) {
                offscreenElement = this.topElement;
            }
            i++;
            if (i >= this.elems.length) {
                break;
            }
        }
        if (topElementBottom < this.topElement.headerHeight && topElementBottom > 0) {
            this.fakeHeaderHidden = true;
            this.topElement.animated = true;
        }
        else {
            this.fakeHeaderHidden = false;
            if (this.topElement) {
                this.topElement.animated = false;
            }
        }
        if (this.topElement && this._items[topIndex]) {
            this.topHeader = this._items[topIndex]._itemHeading;
        }
    };
    __decorate([
        core_1.ViewChild('itemListWrapper', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], ListViewContainerComponent.prototype, "itemListWrapper", void 0);
    __decorate([
        core_1.HostListener("window:resize", []),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ListViewContainerComponent.prototype, "onResize", null);
    ListViewContainerComponent = __decorate([
        core_1.Component({
            selector: 'pg-list-view-container',
            templateUrl: './list-view-container.component.html',
            styleUrls: ['./list-view-container.component.scss']
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], ListViewContainerComponent);
    return ListViewContainerComponent;
}());
exports.ListViewContainerComponent = ListViewContainerComponent;
//# sourceMappingURL=list-view-container.component.js.map