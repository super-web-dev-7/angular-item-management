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
var core_2 = require("@angular/core");
var EditItemComponent = /** @class */ (function () {
    function EditItemComponent(itemsService) {
        this.itemsService = itemsService;
        this.callgetLatestitem = new core_2.EventEmitter();
        this.data = {};
    }
    EditItemComponent.prototype.ngOnInit = function () {
    };
    EditItemComponent.prototype.show = function () {
        var _this = this;
        this.fieldName.forEach(function (item) {
            _this[item] = "";
        });
        this.newItemPopup.show();
        this.data = {};
    };
    EditItemComponent.prototype.onChangeSelectValue = function (event) {
        this[event.target.name] = event.target.value;
    };
    EditItemComponent.prototype.onFieldValue = function (event) {
        this[event.target.name] = event.target.value;
    };
    EditItemComponent.prototype.onEditItem = function () {
        var _this = this;
        this.fieldName.forEach(function (item) {
            if (_this[item]) {
                _this.data[item] = _this[item];
            }
        });
        var entries = Object.entries(this.data);
        var data = {
            itemIds: [],
            updateFields: []
        };
        for (var j = 0; j < entries.length; j++) {
            var datasets = {
                techName: entries[j][0],
                value: entries[j][1]
            };
            data['updateFields'].push(datasets);
        }
        for (var i = 0; i < this.SelectedRowData.length; i++) {
            data['itemIds'].push(this.SelectedRowData[i]._id);
        }
        console.log('=+++++++++++?', data);
        this.itemsService
            .editItemByProject(data)
            .subscribe(function (result) {
            _this.callgetLatestitem.emit(result);
        });
        this.newItemPopup.hide();
    };
    __decorate([
        core_1.ViewChild("newItemPopup", { static: true }),
        __metadata("design:type", ngx_bootstrap_1.ModalDirective)
    ], EditItemComponent.prototype, "newItemPopup", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], EditItemComponent.prototype, "projectId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], EditItemComponent.prototype, "fieldType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], EditItemComponent.prototype, "fieldName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], EditItemComponent.prototype, "fieldslable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], EditItemComponent.prototype, "SelectedRowData", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], EditItemComponent.prototype, "fields", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_2.EventEmitter)
    ], EditItemComponent.prototype, "callgetLatestitem", void 0);
    EditItemComponent = __decorate([
        core_1.Component({
            selector: "app-edit-item",
            templateUrl: "./edit-item.component.html",
            styleUrls: ["./edit-item.component.scss"]
        }),
        __metadata("design:paramtypes", [items_service_1.ItemsService])
    ], EditItemComponent);
    return EditItemComponent;
}());
exports.EditItemComponent = EditItemComponent;
//# sourceMappingURL=edit-item.component.js.map