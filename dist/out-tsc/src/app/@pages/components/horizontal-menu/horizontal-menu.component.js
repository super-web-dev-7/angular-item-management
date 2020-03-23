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
var HorizontalMenuComponent = /** @class */ (function () {
    function HorizontalMenuComponent(toggler) {
        var _this = this;
        this.toggler = toggler;
        this.menuItems = [];
        this._renduerMenuItems = [];
        this._hideExtra = 0;
        this.currentItem = null;
        this._horizontalMobileMenu = false;
        //Simple hack flag to check if its wrapped
        this._wrapped = false;
        this._service = this.toggler.mobileHorizontaMenu
            .subscribe(function (state) {
            _this._horizontalMobileMenu = state;
            _this.closeHorizontalMenu();
        });
    }
    Object.defineProperty(HorizontalMenuComponent.prototype, "HideExtra", {
        set: function (value) {
            this._hideExtra = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalMenuComponent.prototype, "Items", {
        set: function (value) {
            this.menuItems = value;
            this._renduerMenuItems = this.menuItems.slice();
        },
        enumerable: true,
        configurable: true
    });
    HorizontalMenuComponent.prototype.ngOnInit = function () {
    };
    HorizontalMenuComponent.prototype.ngOnDestroy = function () {
        this._service.unsubscribe();
    };
    HorizontalMenuComponent.prototype.ngAfterContentInit = function () {
    };
    HorizontalMenuComponent.prototype.ngOnChanges = function () {
    };
    HorizontalMenuComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            if (pg.isVisibleSm() || pg.isVisibleXs())
                return false;
            _this._onContentChanges();
        });
    };
    HorizontalMenuComponent.prototype.closeHorizontalMenu = function () {
        if (!this.currentItem) {
            return;
        }
        this.currentItem["open"] = false;
        this.currentItem["opening"] = false;
        this.currentItem["ghost"] = {
            visibility: "hidden"
        };
    };
    HorizontalMenuComponent.prototype.toggleLink = function (event, item) {
        //Mobile
        if (pg.isVisibleSm() || pg.isVisibleXs()) {
            if (this.currentItem && this.currentItem != item) {
                this.currentItem["mToggle"] = 'close';
            }
            this.currentItem = item;
            item.mToggle = (item.mToggle === 'close' ? 'open' : 'close');
            return false;
        }
        //Desktop
        if (this.currentItem && this.currentItem != item) {
            this.currentItem["open"] = false;
            this.currentItem["opening"] = false;
            this.currentItem["ghost"] = {
                visibility: "hidden"
            };
        }
        this.currentItem = item;
        var elParent = event.currentTarget.parentNode;
        if (item["open"]) {
            var el = elParent.querySelector("ul");
            var rect = el.getBoundingClientRect();
            item.ghost = {
                width: rect.width + 'px',
                height: 0,
                zIndex: "auto"
            };
            item["open"] = false;
            setTimeout(function () {
                item["opening"] = false;
            }, 240);
        }
        else {
            item["open"] = true;
            setTimeout(function () {
                var el = elParent.querySelector("ul");
                var rect = el.getBoundingClientRect();
                item.ghost = {
                    height: "0",
                    width: rect.width + 'px',
                    zIndex: "auto"
                };
                item.ghost = {
                    width: rect.width + 'px',
                    height: rect.height + 'px',
                    zIndex: "auto"
                };
                setTimeout(function () {
                    item["opening"] = true;
                }, 140);
            }, 0);
        }
    };
    HorizontalMenuComponent.prototype.onResize = function (event) {
        var _this = this;
        clearTimeout(this.resizeId);
        this.resizeId = setTimeout(function () {
            if (pg.isVisibleSm() || pg.isVisibleXs()) {
                _this._renduerMenuItems = _this.menuItems.slice();
                return false;
            }
            _this._onContentChanges();
        }, 140);
    };
    HorizontalMenuComponent.prototype._onContentChanges = function () {
        //Cache User Items
        this._renduerMenuItems = this.menuItems.slice();
        var parentWidth = this._menuItemsList.nativeElement.offsetWidth;
        var children = this._menuItemsList.nativeElement.childNodes;
        var totalChildrenWidth = 0;
        var liCount = 0;
        for (var i = 0; i < children.length; i++) {
            if (children[i]["nodeName"] == "LI") {
                totalChildrenWidth = totalChildrenWidth + children[i].offsetWidth;
                if (totalChildrenWidth > this._menuWrapper.nativeElement.offsetWidth) {
                    this.wrap(liCount);
                    break;
                }
                liCount++;
            }
        }
        //@TODO:Will Force Wrap
        if (!this._wrapped)
            this.wrap(liCount);
    };
    HorizontalMenuComponent.prototype.wrap = function (startIndex) {
        this._wrapped = true;
        startIndex--;
        startIndex = startIndex - this._hideExtra;
        var temp = {
            type: "more",
            toggle: "close",
            submenu: []
        };
        for (var i = startIndex; i < this._renduerMenuItems.length; i++) {
            temp["submenu"].push(this._renduerMenuItems[i]);
        }
        this._renduerMenuItems.splice(startIndex, this._renduerMenuItems.length);
        this._renduerMenuItems.push(temp);
    };
    HorizontalMenuComponent.prototype.toggleHorizontalMenu = function () {
        if (this._horizontalMobileMenu) {
            this._horizontalMobileMenu = false;
        }
        else {
            this._horizontalMobileMenu = true;
        }
        this.toggler.toggleMobileHorizontalMenu(this._horizontalMobileMenu);
    };
    __decorate([
        core_1.ViewChild('menuItemsList', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], HorizontalMenuComponent.prototype, "_menuItemsList", void 0);
    __decorate([
        core_1.ViewChild('menuWrapper', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], HorizontalMenuComponent.prototype, "_menuWrapper", void 0);
    __decorate([
        core_1.ContentChild('mobileSidebarFooter', { static: true }),
        __metadata("design:type", core_1.TemplateRef)
    ], HorizontalMenuComponent.prototype, "mobileSidebarFooter", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], HorizontalMenuComponent.prototype, "HideExtra", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], HorizontalMenuComponent.prototype, "Items", null);
    __decorate([
        core_1.HostListener('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], HorizontalMenuComponent.prototype, "onResize", null);
    HorizontalMenuComponent = __decorate([
        core_1.Component({
            selector: 'pg-horizontal-menu',
            templateUrl: './horizontal-menu.component.html',
            styleUrls: ['./horizontal-menu.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [toggler_service_1.pagesToggleService])
    ], HorizontalMenuComponent);
    return HorizontalMenuComponent;
}());
exports.HorizontalMenuComponent = HorizontalMenuComponent;
//# sourceMappingURL=horizontal-menu.component.js.map