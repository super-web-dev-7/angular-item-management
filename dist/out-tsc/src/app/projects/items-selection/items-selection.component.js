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
var field_service_1 = require("../../fields/field.service");
var ItemsSelectionComponent = /** @class */ (function () {
    function ItemsSelectionComponent(itemsService, fieldService) {
        this.itemsService = itemsService;
        this.fieldService = fieldService;
        this.getLatestitem = new core_1.EventEmitter();
        this.copyData = [];
        this.itemCulomns = [];
        this.test = 0;
        this.columnLoaded = false;
        this.rowSelection = "";
        this.showAllCheckBox = false;
        this.selectedRows = 0;
        this.copyDataLength = [];
        this.SelectedRowDatalength = [];
        this.pastType = '';
        this.copyDataLengthcount = 0;
        this.afterPastPageNotReffress = false;
    }
    ItemsSelectionComponent.prototype.ngOnInit = function () {
        this.copyDataLength = JSON.parse(localStorage.getItem('copydata'));
        if (this.copyDataLength) {
            this.copyDataLengthcount = this.copyDataLength.length;
        }
    };
    ItemsSelectionComponent.prototype.show = function () {
        this.selectedPopup.show();
        this.SelectedRowData;
    };
    ItemsSelectionComponent.prototype.copyItems = function (val) {
        localStorage.setItem('pastetype', 'copy');
        this.copyData = this.SelectedRowData;
        localStorage.setItem('copydata', JSON.stringify(this.copyData));
        this.copyDataLength = JSON.parse(localStorage.getItem('copydata'));
        this.copyDataLengthcount = this.copyDataLength.length;
    };
    ItemsSelectionComponent.prototype.cut = function () {
        localStorage.setItem('pastetype', 'cut');
        this.copyData = this.SelectedRowData;
        localStorage.setItem('copydata', JSON.stringify(this.copyData));
        this.copyDataLength = JSON.parse(localStorage.getItem('copydata'));
    };
    ItemsSelectionComponent.prototype.paste = function () {
        var _this = this;
        this.afterPastPageNotReffress = true;
        if (this.pastType = 'copy') {
            this.copyData = (JSON.parse(localStorage.getItem('copydata')));
            var data = {
                itemIds: [],
                projectId: {}
            };
            for (var i = 0; i < this.copyData.length; i++) {
                data['itemIds'].push(this.copyData[i]._id);
                data.projectId = this.projectId;
            }
            if (this.copyData.length > 0) {
                this.itemsService
                    .Paste(data, this.pastType)
                    .subscribe(function (result) {
                    if (result) {
                        _this.Updateditems = result;
                        _this.itemsService
                            .getItemsByProject(_this.projectId)
                            .subscribe(function (items) {
                            localStorage.removeItem('copydata');
                            _this.getLatestitem.emit();
                            document.getElementById('popupid').hidden = true;
                            _this.copyData = [];
                            _this.copyDataLengthcount = 0;
                            localStorage.setItem('notreffress', 'ture');
                        });
                    }
                });
            }
        }
        if (this.pastType == 'cut') {
            this.copyData = (JSON.parse(localStorage.getItem('copydata')));
            var data = {
                itemIds: [],
                projectId: {}
            };
            for (var i = 0; i < this.copyData.length; i++) {
                data['itemIds'].push(this.copyData[i]._id);
                data.projectId = this.projectId;
            }
            if (this.copyData.length > 0) {
                this.itemsService
                    .Paste(data, this.pastType)
                    .subscribe(function (result) {
                    if (result) {
                        _this.Updateditems = result;
                        _this.itemsService
                            .getItemsByProject(_this.projectId)
                            .subscribe(function (items) {
                            _this.items = items;
                            _this.getLatestitem.emit();
                            document.getElementById('popupid').hidden = true;
                            _this.copyData = [];
                            _this.copyDataLengthcount = 0;
                            localStorage.setItem('notreffress', 'true');
                        });
                    }
                });
            }
        }
    };
    ItemsSelectionComponent.prototype.deleteItems = function () {
        var _this = this;
        console.log(this.SelectedRowData);
        var data1 = {
            itemIds: []
        };
        for (var i = 0; i < this.SelectedRowData.length; i++) {
            data1['itemIds'].push(this.SelectedRowData[i]._id);
        }
        this.itemsService
            .deleteItemsByid(data1)
            .subscribe(function (result) {
            if (result) {
                _this.itemsService
                    .getItemsByProject(_this.projectId)
                    .subscribe(function (items) {
                    _this.getLatestitem.emit();
                    _this.SelectedRowData = [];
                    document.getElementById('popupid').hidden = true;
                });
            }
        });
        // }
    };
    ItemsSelectionComponent.prototype.duplicateItems = function () {
        var _this = this;
        var data = {
            itemIds: [],
            projectId: {}
        };
        for (var i = 0; i < this.SelectedRowData.length; i++) {
            data['itemIds'].push(this.SelectedRowData[i]._id);
            data.projectId = this.SelectedRowData[i].projectId;
        }
        if (this.SelectedRowData.length > 0) {
            this.itemsService
                .duplicateItems(data)
                .subscribe(function (result) {
                if (result) {
                    _this.itemsService
                        .getItemsByProject(_this.projectId)
                        .subscribe(function (items) {
                        _this.getLatestitem.emit();
                        document.getElementById('popupid').hidden = true;
                    });
                }
            });
        }
    };
    ItemsSelectionComponent.prototype.closePopup = function () {
        document.getElementById('popupid').hidden = true;
    };
    ItemsSelectionComponent.prototype.remove_array_element = function (array, n) {
        var index = array.indexOf(n);
        if (index > -1) {
            array.splice(index, 1);
        }
        return array;
    };
    ItemsSelectionComponent.prototype.callgetLatestitem = function (e) {
        this.closePopup();
        this.getLatestitem.emit();
    };
    __decorate([
        core_1.ViewChild('selectedPopup', { static: true }),
        __metadata("design:type", ngx_bootstrap_1.ModalDirective)
    ], ItemsSelectionComponent.prototype, "selectedPopup", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ItemsSelectionComponent.prototype, "projectId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ItemsSelectionComponent.prototype, "fieldType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ItemsSelectionComponent.prototype, "fieldName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ItemsSelectionComponent.prototype, "fieldslable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ItemsSelectionComponent.prototype, "SelectedRowData", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ItemsSelectionComponent.prototype, "fields", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ItemsSelectionComponent.prototype, "getLatestitem", void 0);
    ItemsSelectionComponent = __decorate([
        core_1.Component({
            selector: 'app-items-selection',
            templateUrl: './items-selection.component.html',
            styleUrls: ['./items-selection.component.scss']
        }),
        __metadata("design:paramtypes", [items_service_1.ItemsService,
            field_service_1.FieldService])
    ], ItemsSelectionComponent);
    return ItemsSelectionComponent;
}());
exports.ItemsSelectionComponent = ItemsSelectionComponent;
//# sourceMappingURL=items-selection.component.js.map