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
var EditSingleItemComponent = /** @class */ (function () {
    function EditSingleItemComponent(itemsService) {
        this.itemsService = itemsService;
        this.getLatestitem = new core_1.EventEmitter();
        this.data = {};
        this.data1 = {};
        this.SelectedSingleRowData = [];
        this.selectedRowComments = [];
        this.fieldWithData = [];
        this.reverse = false;
    }
    EditSingleItemComponent.prototype.ngOnInit = function () {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementById("TabComment");
        tabcontent.style.display = "none";
    };
    EditSingleItemComponent.prototype.getItems = function (itemId) {
        var _this = this;
        var itemcomment = [];
        this.itemsService
            .getItemsByProject(this.projectId)
            .subscribe(function (items) {
            var found = items.find(function (element) { return element._id == itemId; });
            _this.selectedRowComments = found.comments.reverse();
            _this.selectedRowComments['itemid'] = found._id;
            // this.shortedcoment = shortedcoment.reverse();
            // this.selectedRowComments = shortedcoment;
        });
    };
    EditSingleItemComponent.prototype.show = function (event) {
        var _this = this;
        this.newItemPopup.config.ignoreBackdropClick = true;
        this.newItemPopup.config.backdrop = false;
        this.newItemPopup.config.keyboard = true;
        // this.getItems(event.data._id)
        if (this.dbclicked == true) {
            // this.newItemPopup.hide();
        }
        else {
            var popup = this.newItemPopup;
            this.SelectedSingleRowData = event.data;
            if (event.type == "rowClicked") {
                if (this.dbclicked == false || this.dbclicked == undefined) {
                    var db = this.dbclicked;
                    setTimeout(function () {
                        if (localStorage.getItem('pdata') == 'true') {
                            popup.show();
                        }
                        if (localStorage.getItem('pdata') == 'false') {
                            // popup.hide()
                        }
                    }, 300);
                }
            }
            // this.newItemPopup.show();
            if (this.SelectedSingleRowData) {
                this.selectedRowComments = this.SelectedSingleRowData['comments'];
                this.selectedRowComments['itemid'] = this.SelectedSingleRowData['_id'];
                if (this.reverse == false) {
                    this.selectedRowComments.reverse();
                    this.reverse = true;
                }
                // this.selectedRowComments = shorted;
            }
            // if (this.dbclicked == true) {
            //   this.newItemPopup.hide();
            // }
            this.fieldName.forEach(function (item) {
                _this.data[item] = '';
            });
        }
    };
    EditSingleItemComponent.prototype.openTabs = function (evt, tabID) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(tabID).style.display = "block";
        evt.currentTarget.className += " active";
    };
    EditSingleItemComponent.prototype.onChangeSelectValue = function (event) {
        this[event.target.name] = event.target.value;
    };
    EditSingleItemComponent.prototype.onFieldValuek = function (event) {
        this[event.target.name] = event.target.value;
    };
    EditSingleItemComponent.prototype.onEditItem = function () {
        var _this = this;
        this.fieldName.forEach(function (item) {
            if (_this[item]) {
                _this.data[item] = _this[item];
            }
        });
        console.log(this.SelectedSingleRowData);
        this.data["_id"] = this.SelectedSingleRowData['_id'];
        this.data["projectId"] = this.SelectedSingleRowData['projectId'];
        this.itemsService
            .editItemByProject(this.data)
            .subscribe(function (result) {
            console.log('projectId');
            _this.getLatestitem.emit();
        });
        // this.newItemPopup.hide()
    };
    EditSingleItemComponent.prototype.addComment = function () {
        var _this = this;
        if (this.SelectedSingleRowData) {
            var data = {
                itemId: this.SelectedSingleRowData['_id'],
                comment: this.comment
            };
            this.itemsService
                .addComment(data, this.SelectedSingleRowData['_id'])
                .subscribe(function (result) {
                if (result) {
                    _this.getItems(data.itemId);
                    _this.comment = '';
                }
            });
        }
    };
    EditSingleItemComponent.prototype.calledit = function (id) {
        document.getElementById(id).hidden = true;
        document.getElementById('text' + id).hidden = false;
        document.getElementById('date').hidden = true;
    };
    EditSingleItemComponent.prototype.mouseOutFromTaxtArea = function (event, commentID, comment) {
        var _this = this;
        var data = {
            itemId: this.selectedRowComments['itemid'],
            commentId: commentID,
            comment: event.target.value
        };
        this.itemsService
            .updateComment(data)
            .subscribe(function (result) {
            if (result) {
                _this.getItems(data.itemId);
                document.getElementById(commentID).hidden = false;
                document.getElementById('text' + commentID).hidden = true;
                document.getElementById('date').hidden = false;
            }
            ;
        });
    };
    EditSingleItemComponent.prototype.deleteComment = function (commentID) {
        var _this = this;
        var data = {
            itemId: this.selectedRowComments['itemid'],
            commentId: commentID,
        };
        this.itemsService
            .deleteComment(data)
            .subscribe(function (result) {
            if (result) {
                _this.getItems(data.itemId);
            }
        });
    };
    EditSingleItemComponent.prototype.closeModel = function (event) {
        this.newItemPopup.hide();
    };
    __decorate([
        core_1.ViewChild("newItemPopup", { static: false }),
        __metadata("design:type", ngx_bootstrap_1.ModalDirective)
    ], EditSingleItemComponent.prototype, "newItemPopup", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], EditSingleItemComponent.prototype, "projectId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], EditSingleItemComponent.prototype, "fieldType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], EditSingleItemComponent.prototype, "fieldName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], EditSingleItemComponent.prototype, "dbclicked", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], EditSingleItemComponent.prototype, "fields", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], EditSingleItemComponent.prototype, "fieldslable", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], EditSingleItemComponent.prototype, "getLatestitem", void 0);
    EditSingleItemComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-single-item',
            templateUrl: './edit-single-item.component.html',
            styleUrls: ['./edit-single-item.component.scss']
        }),
        __metadata("design:paramtypes", [items_service_1.ItemsService])
    ], EditSingleItemComponent);
    return EditSingleItemComponent;
}());
exports.EditSingleItemComponent = EditSingleItemComponent;
//# sourceMappingURL=edit-single-item.component.js.map