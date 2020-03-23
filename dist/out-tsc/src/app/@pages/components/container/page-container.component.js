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
var pageContainer = /** @class */ (function () {
    function pageContainer(toggler) {
        this.toggler = toggler;
    }
    pageContainer.prototype.triggerMouseOverCall = function () {
        this.toggler.triggerPageContainerHover(true);
    };
    __decorate([
        core_1.HostListener('mouseenter', ["$event"]),
        core_1.HostListener('tap', ["$event"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], pageContainer.prototype, "triggerMouseOverCall", null);
    pageContainer = __decorate([
        core_1.Component({
            selector: 'page-container',
            template: '<ng-content></ng-content>',
            styleUrls: ['./page-container.scss'],
            encapsulation: core_1.ViewEncapsulation.None,
            host: {
                'class': 'page-container'
            }
        }),
        __metadata("design:paramtypes", [toggler_service_1.pagesToggleService])
    ], pageContainer);
    return pageContainer;
}());
exports.pageContainer = pageContainer;
//# sourceMappingURL=page-container.component.js.map