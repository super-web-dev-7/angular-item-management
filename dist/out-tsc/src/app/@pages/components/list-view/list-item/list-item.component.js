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
var list_view_container_component_1 = require("../list-view-container/list-view-container.component");
var ListItemComponent = /** @class */ (function () {
    function ListItemComponent(pgItemView) {
        this.pgItemView = pgItemView;
    }
    Object.defineProperty(ListItemComponent.prototype, "content", {
        get: function () {
            return this._content;
        },
        enumerable: true,
        configurable: true
    });
    ListItemComponent.prototype.ngOnInit = function () {
        this.pgItemView._items.push(this);
    };
    ListItemComponent.prototype.ngOnDestroy = function () {
        this.pgItemView._items.splice(this.pgItemView._items.indexOf(this), 1);
    };
    __decorate([
        core_1.ContentChild('ItemHeading', { static: true }),
        __metadata("design:type", core_1.TemplateRef)
    ], ListItemComponent.prototype, "_itemHeading", void 0);
    __decorate([
        core_1.ViewChild(core_1.TemplateRef, { static: true }),
        __metadata("design:type", core_1.TemplateRef)
    ], ListItemComponent.prototype, "_content", void 0);
    ListItemComponent = __decorate([
        core_1.Component({
            selector: 'pg-list-item',
            templateUrl: './list-item.component.html',
            styleUrls: ['./list-item.component.scss']
        }),
        __metadata("design:paramtypes", [list_view_container_component_1.ListViewContainerComponent])
    ], ListItemComponent);
    return ListItemComponent;
}());
exports.ListItemComponent = ListItemComponent;
//# sourceMappingURL=list-item.component.js.map