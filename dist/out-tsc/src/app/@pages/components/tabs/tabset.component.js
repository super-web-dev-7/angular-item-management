"use strict";
/** code from https://github.com/angular/material2 */
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
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var tabs_nav_component_1 = require("./tabs-nav.component");
var TabChangeEvent = /** @class */ (function () {
    function TabChangeEvent() {
    }
    return TabChangeEvent;
}());
exports.TabChangeEvent = TabChangeEvent;
var pgTabSetComponent = /** @class */ (function () {
    function pgTabSetComponent(_renderer) {
        this._renderer = _renderer;
        this._prefixCls = 'nav-tabs';
        this._tabPosition = 'top';
        this._tabPositionMode = 'horizontal';
        this._indexToSelect = 0;
        this._selectedIndex = null;
        this._isViewInit = false;
        this._tabs = [];
        this._tabAnimation = "";
        this._extra_tab_class = "";
        this._extra_tabcontent_class = "";
        this.Animated = true;
        this.ShowPagination = true;
        this.Hide = false;
        this.SelectChange = new core_1.EventEmitter(true);
        this.Size = 'default';
        this._type = 'line';
        this.tabs = [];
    }
    Object.defineProperty(pgTabSetComponent.prototype, "SelectedIndex", {
        get: function () {
            return this._selectedIndex;
        },
        set: function (value) {
            this._indexToSelect = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgTabSetComponent.prototype, "SelectedIndexChange", {
        get: function () {
            return this.SelectChange.pipe(operators_1.map(function (event) { return event.index; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgTabSetComponent.prototype, "TabPosition", {
        get: function () {
            return this._tabPosition;
        },
        set: function (value) {
            this._tabPosition = value;
            if ((this._tabPosition === 'top') || (this._tabPosition === 'bottom')) {
                this._tabPositionMode = 'horizontal';
            }
            else {
                this._tabPositionMode = 'vertical';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgTabSetComponent.prototype, "extraTabClass", {
        set: function (value) {
            this._extra_tab_class = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgTabSetComponent.prototype, "extraTabContentClass", {
        set: function (value) {
            this._extra_tabcontent_class = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgTabSetComponent.prototype, "Type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            if (this._type === value) {
                return;
            }
            this._type = value;
            this._setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgTabSetComponent.prototype, "tabAnimation", {
        set: function (value) {
            this._tabAnimation = value;
        },
        enumerable: true,
        configurable: true
    });
    pgTabSetComponent.prototype._setPosition = function (value) {
    };
    pgTabSetComponent.prototype._setClassMap = function () {
    };
    pgTabSetComponent.prototype.clickLabel = function (index) {
        if (this._tabs[index].Disabled) {
        }
        else {
            this.SelectedIndex = index;
            this._tabs[index].pgClick.emit();
        }
    };
    pgTabSetComponent.prototype.ngOnInit = function () {
        this._setClassMap();
    };
    pgTabSetComponent.prototype.ngAfterContentChecked = function () {
        var _this = this;
        // Clamp the next selected index to the bounds of 0 and the tabs length. Note the `|| 0`, which
        // ensures that values like NaN can't get through and which would otherwise throw the
        // component into an infinite loop (since Math.max(NaN, 0) === NaN).
        var indexToSelect = this._indexToSelect =
            Math.min(this._tabs.length - 1, Math.max(this._indexToSelect || 0, 0));
        // If there is a change in selected index, emit a change event. Should not trigger if
        // the selected index has not yet been initialized.
        if (this._selectedIndex !== indexToSelect && this._selectedIndex != null) {
            this.SelectChange.emit(this._createChangeEvent(indexToSelect));
        }
        // Setup the position for each tab and optionally setup an origin on the next selected tab.
        this._tabs.forEach(function (tab, index) {
            tab.position = index - indexToSelect;
            // If there is already a selected tab, then set up an origin for the next selected tab
            // if it doesn't have one already.
            if (_this._selectedIndex != null && tab.position === 0 && !tab.origin) {
                tab.origin = indexToSelect - _this._selectedIndex;
            }
        });
        this._selectedIndex = indexToSelect;
    };
    pgTabSetComponent.prototype.ngAfterViewInit = function () {
        this._isViewInit = true;
    };
    pgTabSetComponent.prototype._createChangeEvent = function (index) {
        var event = new TabChangeEvent();
        event.index = index;
        if (this._tabs && this._tabs.length) {
            event.tab = this._tabs[index];
            this._tabs.forEach(function (item, i) {
                if (i !== index) {
                    item.pgDeselect.emit();
                }
            });
            event.tab.pgSelect.emit();
        }
        return event;
    };
    Object.defineProperty(pgTabSetComponent.prototype, "inkBarAnimated", {
        get: function () {
            return (this.Animated === true) || (this.Animated.inkBar === true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(pgTabSetComponent.prototype, "tabPaneAnimated", {
        get: function () {
            return (this.Animated === true) || (this.Animated.tabPane === true);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", core_1.TemplateRef)
    ], pgTabSetComponent.prototype, "TabBarExtraTemplate", void 0);
    __decorate([
        core_1.ContentChild('TabBarExtraContent', { static: true }),
        __metadata("design:type", core_1.TemplateRef)
    ], pgTabSetComponent.prototype, "TabBarExtraContent", void 0);
    __decorate([
        core_1.ViewChild('tabNav', { static: true }),
        __metadata("design:type", tabs_nav_component_1.pgTabsNavComponent)
    ], pgTabSetComponent.prototype, "_tabNav", void 0);
    __decorate([
        core_1.ViewChild('tabContent', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], pgTabSetComponent.prototype, "_tabContent", void 0);
    __decorate([
        core_1.ViewChild('hostContent', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], pgTabSetComponent.prototype, "_hostContent", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], pgTabSetComponent.prototype, "Animated", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], pgTabSetComponent.prototype, "ShowPagination", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], pgTabSetComponent.prototype, "Hide", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], pgTabSetComponent.prototype, "SelectedIndex", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", rxjs_1.Observable),
        __metadata("design:paramtypes", [])
    ], pgTabSetComponent.prototype, "SelectedIndexChange", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], pgTabSetComponent.prototype, "SelectChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], pgTabSetComponent.prototype, "Size", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgTabSetComponent.prototype, "TabPosition", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgTabSetComponent.prototype, "extraTabClass", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgTabSetComponent.prototype, "extraTabContentClass", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgTabSetComponent.prototype, "Type", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], pgTabSetComponent.prototype, "tabAnimation", null);
    pgTabSetComponent = __decorate([
        core_1.Component({
            selector: 'pg-tabset',
            encapsulation: core_1.ViewEncapsulation.None,
            template: "\n    <div class=\"tab-wrapper tab-{{_tabPositionMode}} {{_tabPosition}} {{_type}} {{_extra_tab_class}}\"  #hostContent>\n      <pg-tabs-nav\n        #tabNav\n        [Size]=\"Size\"\n        [Type]=\"Type\"\n        [ShowPagination]=\"ShowPagination\"\n        [PositionMode]=\"_tabPositionMode\"\n        [Position]=\"_tabPosition\"\n        [Animated]=\"inkBarAnimated\"\n        [HideBar]=\"Hide\"\n        [selectedIndex]=\"SelectedIndex\"\n        >\n        <ng-template #tabBarExtraContent>\n          <ng-template [ngTemplateOutlet]=\"TabBarExtraTemplate || TabBarExtraContent\"></ng-template>\n        </ng-template>\n        <li\n          pg-tab-label\n          [disabled]=\"tab.disabled\"\n          (click)=\"clickLabel(i)\"\n          *ngFor=\"let tab of _tabs; let i = index\">\n          <a href=\"javascript:void(0);\" class=\"\" [class.active]=\"(SelectedIndex == i)&&!Hide\">\n          <ng-template [ngTemplateOutlet]=\"tab._tabHeading\"></ng-template>\n          </a>\n        </li>\n      </pg-tabs-nav>\n      <div class=\"tab-content-wrapper {{_extra_tabcontent_class}}\">\n        <div class=\"tab-content {{_tabAnimation}}\"\n          #tabContent\n          [class.animated]=\"tabPaneAnimated\"\n          [class.not-animated]=\"!tabPaneAnimated\"\n          [style.margin-left.%]=\"tabPaneAnimated&&(-SelectedIndex*100)\">\n          <pg-tab-body\n            class=\"tab-pane\"\n            [class.active]=\"(SelectedIndex == i)&&!Hide\"\n            [class.inactive]=\"(SelectedIndex != i)||Hide\"\n            [content]=\"tab.content\"\n            *ngFor=\"let tab of _tabs; let i = index\">\n          </pg-tab-body>\n        </div>\n      </div>\n    </div>",
            styleUrls: [
                './tabs.scss'
            ]
        }),
        __metadata("design:paramtypes", [core_1.Renderer2])
    ], pgTabSetComponent);
    return pgTabSetComponent;
}());
exports.pgTabSetComponent = pgTabSetComponent;
//# sourceMappingURL=tabset.component.js.map