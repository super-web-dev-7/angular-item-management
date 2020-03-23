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
var BottomItemSelectComponent = /** @class */ (function () {
    function BottomItemSelectComponent() {
    }
    BottomItemSelectComponent.prototype.ngOnInit = function () {
    };
    BottomItemSelectComponent.prototype.show = function () {
        console.log('selectedPopup');
        this.selectedPopup.show();
    };
    __decorate([
        core_1.ViewChild('selectedPopup', { static: true }),
        __metadata("design:type", ngx_bootstrap_1.ModalDirective)
    ], BottomItemSelectComponent.prototype, "selectedPopup", void 0);
    BottomItemSelectComponent = __decorate([
        core_1.Component({
            selector: 'app-bottom-item-select',
            templateUrl: './bottom-item-select.component.html',
            styleUrls: ['./bottom-item-select.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], BottomItemSelectComponent);
    return BottomItemSelectComponent;
}());
exports.BottomItemSelectComponent = BottomItemSelectComponent;
//# sourceMappingURL=bottom-item-select.component.js.map