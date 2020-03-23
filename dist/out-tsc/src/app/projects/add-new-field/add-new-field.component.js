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
var field_service_1 = require("../../fields/field.service");
var AddNewFieldComponent = /** @class */ (function () {
    function AddNewFieldComponent(fieldService) {
        this.fieldService = fieldService;
        this.getLatestitem = new core_1.EventEmitter();
        this.calloninit = new core_1.EventEmitter();
        this.filteredType = [];
    }
    AddNewFieldComponent.prototype.ngOnInit = function () {
    };
    AddNewFieldComponent.prototype.show = function () {
        var _this = this;
        this.newItemPopup.show();
        var x = this.fieldType.filter(function (v, i) { return _this.fieldType.indexOf(v) === i; });
        this.fieldType = x;
        console.log(this.fieldTypeWithNo);
    };
    AddNewFieldComponent.prototype.getFieldType = function (event) {
        console.log(event);
        this.SelectedfieldType = event.target.value;
    };
    AddNewFieldComponent.prototype.addField = function () {
        var _this = this;
        var typeNO;
        for (var i = 0; i < this.fieldTypeWithNo.length; i++) {
            if (this.fieldTypeWithNo[i].type == this.SelectedfieldType) {
                typeNO = this.fieldTypeWithNo[i].no;
            }
        }
        var data = {
            accountId: localStorage.getItem('currentUser'),
            type: typeNO,
            label: this.level
        };
        this.fieldService
            .addField(data)
            .subscribe(function (result) {
            if (result) {
                _this.calloninit.emit();
            }
        });
        this.newItemPopup.hide();
    };
    __decorate([
        core_1.ViewChild("newItemPopup", { static: true }),
        __metadata("design:type", ngx_bootstrap_1.ModalDirective)
    ], AddNewFieldComponent.prototype, "newItemPopup", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AddNewFieldComponent.prototype, "projectId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AddNewFieldComponent.prototype, "fieldType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AddNewFieldComponent.prototype, "fieldName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AddNewFieldComponent.prototype, "fields", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AddNewFieldComponent.prototype, "fieldTypeWithNo", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AddNewFieldComponent.prototype, "getLatestitem", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AddNewFieldComponent.prototype, "calloninit", void 0);
    AddNewFieldComponent = __decorate([
        core_1.Component({
            selector: 'app-add-new-field',
            templateUrl: './add-new-field.component.html',
            styleUrls: ['./add-new-field.component.scss']
        }),
        __metadata("design:paramtypes", [field_service_1.FieldService])
    ], AddNewFieldComponent);
    return AddNewFieldComponent;
}());
exports.AddNewFieldComponent = AddNewFieldComponent;
//# sourceMappingURL=add-new-field.component.js.map