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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
/** code from https://github.com/angular/material2 */
var bidi_1 = require("@angular/cdk/bidi");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var convert_1 = require("../util/convert");
var tab_label_directive_1 = require("./tab-label.directive");
var tabs_ink_bar_directive_1 = require("./tabs-ink-bar.directive");
var EXAGGERATED_OVERSCROLL = 64;
var pgTabsNavComponent = /** @class */ (function () {
    function pgTabsNavComponent(_elementRef, _ngZone, _renderer, _dir) {
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        this._dir = _dir;
        this._animated = true;
        this._hideBar = false;
        this._showPagination = true;
        this._showPaginationControls = false;
        this._disableScrollAfter = true;
        this._disableScrollBefore = true;
        this._scrollDistance = 0;
        this._selectedIndexChanged = false;
        this._realignInkBar = null;
        this._selectedIndex = 0;
        this._tabPositionMode = 'horizontal';
        this._tabPosition = 'top';
        this.Size = 'default';
        this._type = 'line';
    }
    Object.defineProperty(pgTabsNavComponent.prototype, "Animated", {
        get: function () {
            return this._animated;
        },
        set: function (value) {
            this._animated = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgTabsNavComponent.prototype, "Position", {
        get: function () {
            return this._tabPosition;
        },
        set: function (value) {
            this._tabPosition = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgTabsNavComponent.prototype, "HideBar", {
        get: function () {
            return this._hideBar;
        },
        set: function (value) {
            this._hideBar = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgTabsNavComponent.prototype, "Type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgTabsNavComponent.prototype, "ShowPagination", {
        get: function () {
            return this._showPagination;
        },
        set: function (value) {
            this._showPagination = convert_1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgTabsNavComponent.prototype, "PositionMode", {
        get: function () {
            return this._tabPositionMode;
        },
        set: function (value) {
            this._tabPositionMode = value;
            this._alignInkBarToSelectedTab();
            if (this.ShowPagination) {
                this._updatePagination();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgTabsNavComponent.prototype, "selectedIndex", {
        get: function () {
            return this._selectedIndex;
        },
        set: function (value) {
            this._selectedIndexChanged = this._selectedIndex !== value;
            this._selectedIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    pgTabsNavComponent.prototype._onContentChanges = function () {
        if (this.ShowPagination) {
            this._updatePagination();
        }
        this._alignInkBarToSelectedTab();
    };
    pgTabsNavComponent.prototype._scrollHeader = function (scrollDir) {
        // Move the scroll distance one-third the length of the tab list's viewport.
        this.scrollDistance += (scrollDir === 'before' ? -1 : 1) * this.viewWidthHeightPix / 3;
    };
    pgTabsNavComponent.prototype.ngAfterContentChecked = function () {
        if (this._tabLabelCount !== this._labelWrappers.length) {
            if (this.ShowPagination) {
                this._updatePagination();
            }
            this._tabLabelCount = this._labelWrappers.length;
        }
        if (this._selectedIndexChanged) {
            this._scrollToLabel(this._selectedIndex);
            if (this.ShowPagination) {
                this._checkScrollingControls();
            }
            this._alignInkBarToSelectedTab();
            this._selectedIndexChanged = false;
        }
        if (this._scrollDistanceChanged) {
            if (this.ShowPagination) {
                this._updateTabScrollPosition();
            }
            this._scrollDistanceChanged = false;
        }
    };
    pgTabsNavComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._realignInkBar = this._ngZone.runOutsideAngular(function () {
            var dirChange = _this._dir ? _this._dir.change : rxjs_1.of(null);
            var resize = typeof window !== 'undefined' ?
                rxjs_1.fromEvent(window, 'resize').pipe(operators_1.auditTime(10)) :
                rxjs_1.of(null);
            return rxjs_1.merge(dirChange, resize).pipe(operators_1.startWith(null)).subscribe(function () {
                if (_this.ShowPagination) {
                    _this._updatePagination();
                }
                _this._alignInkBarToSelectedTab();
            });
        });
    };
    pgTabsNavComponent.prototype._updateTabScrollPosition = function () {
        var scrollDistance = this.scrollDistance;
        if (this.PositionMode === 'horizontal') {
            var translateX = this._getLayoutDirection() === 'ltr' ? -scrollDistance : scrollDistance;
            this._renderer.setStyle(this._tabList.nativeElement, 'transform', "translate3d(" + translateX + "px, 0, 0)");
        }
        else {
            this._renderer.setStyle(this._tabList.nativeElement, 'transform', "translate3d(0," + -scrollDistance + "px, 0)");
        }
    };
    pgTabsNavComponent.prototype._updatePagination = function () {
        this._checkPaginationEnabled();
        this._checkScrollingControls();
        this._updateTabScrollPosition();
    };
    pgTabsNavComponent.prototype._checkPaginationEnabled = function () {
        this._showPaginationControls =
            this.tabListScrollWidthHeightPix > this.elementRefOffSetWidthHeight;
        if (!this._showPaginationControls) {
            this.scrollDistance = 0;
        }
    };
    pgTabsNavComponent.prototype._scrollToLabel = function (labelIndex) {
        var selectedLabel = this._labelWrappers
            ? this._labelWrappers.toArray()[labelIndex]
            : null;
        if (!selectedLabel) {
            return;
        }
        // The view length is the visible width of the tab labels.
        var labelBeforePos;
        var labelAfterPos;
        if (this.PositionMode === 'horizontal') {
            if (this._getLayoutDirection() === 'ltr') {
                labelBeforePos = selectedLabel.getOffsetLeft();
                labelAfterPos = labelBeforePos + selectedLabel.getOffsetWidth();
            }
            else {
                labelAfterPos = this._tabList.nativeElement.offsetWidth - selectedLabel.getOffsetLeft();
                labelBeforePos = labelAfterPos - selectedLabel.getOffsetWidth();
            }
        }
        else {
            labelBeforePos = selectedLabel.getOffsetTop();
            labelAfterPos = labelBeforePos + selectedLabel.getOffsetHeight();
        }
        var beforeVisiblePos = this.scrollDistance;
        var afterVisiblePos = this.scrollDistance + this.viewWidthHeightPix;
        if (labelBeforePos < beforeVisiblePos) {
            // Scroll header to move label to the before direction
            this.scrollDistance -= beforeVisiblePos - labelBeforePos + EXAGGERATED_OVERSCROLL;
        }
        else if (labelAfterPos > afterVisiblePos) {
            // Scroll header to move label to the after direction
            this.scrollDistance += labelAfterPos - afterVisiblePos + EXAGGERATED_OVERSCROLL;
        }
    };
    pgTabsNavComponent.prototype._checkScrollingControls = function () {
        // Check if the pagination arrows should be activated.
        this._disableScrollBefore = this.scrollDistance === 0;
        this._disableScrollAfter = this.scrollDistance === this._getMaxScrollDistance();
    };
    /**
     * Determines what is the maximum length in pixels that can be set for the scroll distance. This
     * is equal to the difference in width between the tab list container and tab header container.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    pgTabsNavComponent.prototype._getMaxScrollDistance = function () {
        return (this.tabListScrollWidthHeightPix - this.viewWidthHeightPix) || 0;
    };
    Object.defineProperty(pgTabsNavComponent.prototype, "scrollDistance", {
        get: function () {
            return this._scrollDistance;
        },
        /** Sets the distance in pixels that the tab header should be transformed in the X-axis. */
        set: function (v) {
            this._scrollDistance = Math.max(0, Math.min(this._getMaxScrollDistance(), v));
            // Mark that the scroll distance has changed so that after the view is checked, the CSS
            // transformation can move the header.
            this._scrollDistanceChanged = true;
            this._checkScrollingControls();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgTabsNavComponent.prototype, "viewWidthHeightPix", {
        get: function () {
            var PAGINATION_PIX = 0;
            if (this._showPaginationControls) {
                PAGINATION_PIX = 64;
            }
            if (this.PositionMode === 'horizontal') {
                return this._tabListContainer.nativeElement.offsetWidth - PAGINATION_PIX;
            }
            else {
                return this._tabListContainer.nativeElement.offsetHeight - PAGINATION_PIX;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgTabsNavComponent.prototype, "tabListScrollWidthHeightPix", {
        get: function () {
            if (this.PositionMode === 'horizontal') {
                return this._tabList.nativeElement.scrollWidth;
            }
            else {
                return this._tabList.nativeElement.scrollHeight;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgTabsNavComponent.prototype, "elementRefOffSetWidthHeight", {
        get: function () {
            if (this.PositionMode === 'horizontal') {
                return this._elementRef.nativeElement.offsetWidth;
            }
            else {
                return this._elementRef.nativeElement.offsetHeight;
            }
        },
        enumerable: true,
        configurable: true
    });
    pgTabsNavComponent.prototype._getLayoutDirection = function () {
        return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
    };
    pgTabsNavComponent.prototype._alignInkBarToSelectedTab = function () {
        if (this.Type !== 'fillup') {
            var selectedLabelWrapper = this._labelWrappers && this._labelWrappers.length
                ? this._labelWrappers.toArray()[this.selectedIndex].elementRef.nativeElement
                : null;
            if (this._inkBar) {
                this._inkBar.alignToElement(selectedLabelWrapper);
            }
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], pgTabsNavComponent.prototype, "Size", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgTabsNavComponent.prototype, "Animated", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgTabsNavComponent.prototype, "Position", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgTabsNavComponent.prototype, "HideBar", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgTabsNavComponent.prototype, "Type", null);
    __decorate([
        core_1.ContentChild('tabBarExtraContent', { static: true }),
        __metadata("design:type", core_1.TemplateRef)
    ], pgTabsNavComponent.prototype, "_tabBarExtraContent", void 0);
    __decorate([
        core_1.ContentChildren(tab_label_directive_1.pgTabLabelDirective),
        __metadata("design:type", core_1.QueryList)
    ], pgTabsNavComponent.prototype, "_labelWrappers", void 0);
    __decorate([
        core_1.ViewChild(tabs_ink_bar_directive_1.pgTabsInkBarDirective, { static: true }),
        __metadata("design:type", tabs_ink_bar_directive_1.pgTabsInkBarDirective)
    ], pgTabsNavComponent.prototype, "_inkBar", void 0);
    __decorate([
        core_1.ViewChild('tabListContainer', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], pgTabsNavComponent.prototype, "_tabListContainer", void 0);
    __decorate([
        core_1.ViewChild('tabList', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], pgTabsNavComponent.prototype, "_tabList", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], pgTabsNavComponent.prototype, "ShowPagination", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgTabsNavComponent.prototype, "PositionMode", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], pgTabsNavComponent.prototype, "selectedIndex", null);
    pgTabsNavComponent = __decorate([
        core_1.Component({
            selector: 'pg-tabs-nav',
            encapsulation: core_1.ViewEncapsulation.None,
            template: "\n  \n    <div class=\"nav-tabs-wrapper\" [class.scrolling]=\"_showPaginationControls\" #tabListContainer>\n      <span class=\"nav-tabs-navigator left btn btn-link\" (click)=\"_scrollHeader('before')\" [class.disabled]=\"_disableScrollBefore\" *ngIf=\"_showPaginationControls\">\n        <i class=\"pg pg-arrow_left\"></i>\n      </span>\n      <div class=\"nav-wrap\">\n          <ul class=\"nav nav-tabs nav-tabs-{{_type}} nav-tabs-{{_tabPosition}}\" [class.tabs-nav-animated]=\"Animated\" #tabList (cdkObserveContent)=\"_onContentChanges()\">\n            <div class=\"active-bar\" pg-tabs-ink-bar [hidden]=\"HideBar\" [Animated]=\"Animated\" [PositionMode]=\"PositionMode\" style=\"display: block;\"></div>\n            <ng-content></ng-content>\n          </ul>\n      </div>\n      <span class=\"nav-tabs-navigator right btn btn-link\" (click)=\"_scrollHeader('after')\" [class.disabled]=\"_disableScrollAfter\" *ngIf=\"_showPaginationControls\">\n        <i class=\"pg pg-arrow_right\"></i>\n      </span>\n    </div> \n  ",
            host: {}
        }),
        __param(3, core_1.Optional()),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.NgZone,
            core_1.Renderer2,
            bidi_1.Directionality])
    ], pgTabsNavComponent);
    return pgTabsNavComponent;
}());
exports.pgTabsNavComponent = pgTabsNavComponent;
//# sourceMappingURL=tabs-nav.component.js.map