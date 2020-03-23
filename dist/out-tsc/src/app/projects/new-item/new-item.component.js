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
var ngx_bootstrap_1 = require("ngx-bootstrap");
var items_service_1 = require("../items-list/items.service");
var NewItemComponent = /** @class */ (function () {
    function NewItemComponent(itemsService) {
        this.itemsService = itemsService;
        this.data = {};
    }
    NewItemComponent.prototype.ngOnInit = function () { };
    NewItemComponent.prototype.show = function () {
        var _this = this;
        this.fieldName.forEach(function (item) {
            _this[item] = "";
        });
        this.newItemPopup.show();
    };
    NewItemComponent.prototype.onChangeSelectValue = function (event) {
        this[event.target.name] = event.target.value;
    };
    NewItemComponent.prototype.onFieldValue = function (event) {
        this[event.target.name] = event.target.value;
    };
    NewItemComponent.prototype.onAddItem = function () {
        var _this = this;
        this.fieldName.forEach(function (item) {
            if (_this[item]) {
                _this.data[item] = _this[item];
            }
        });
        this.data["projectId"] = this.projectId;
        console.log(this.data);
        this.itemsService
            .newItemByProject(this.projectId, this.data)
            .subscribe(function (result) {
        });
        this.newItemPopup.hide();
    };
    __decorate([
        core_1.ViewChild("newItemPopup", { static: true }),
        __metadata("design:type", ngx_bootstrap_1.ModalDirective)
    ], NewItemComponent.prototype, "newItemPopup", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NewItemComponent.prototype, "projectId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NewItemComponent.prototype, "fieldType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NewItemComponent.prototype, "fieldName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NewItemComponent.prototype, "fields", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NewItemComponent.prototype, "fieldslable", void 0);
    NewItemComponent = __decorate([
        core_1.Component({
            selector: "app-new-item",
            templateUrl: "./new-item.component.html",
            styleUrls: ["./new-item.component.scss"]
        }),
        __metadata("design:paramtypes", [items_service_1.ItemsService])
    ], NewItemComponent);
    return NewItemComponent;
}());
exports.NewItemComponent = NewItemComponent;
//# sourceMappingURL=new-item.component.js.map