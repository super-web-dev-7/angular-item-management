"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var card_social_component_1 = require("./card-social.component");
// import { pgRetinaDirective } from '../retina/retina.directive';
var pgCardSocialModule = /** @class */ (function () {
    function pgCardSocialModule() {
    }
    pgCardSocialModule_1 = pgCardSocialModule;
    pgCardSocialModule.forRoot = function () {
        return {
            ngModule: pgCardSocialModule_1
        };
    };
    var pgCardSocialModule_1;
    pgCardSocialModule = pgCardSocialModule_1 = __decorate([
        core_1.NgModule({
            declarations: [card_social_component_1.pgCardSocial],
            exports: [card_social_component_1.pgCardSocial],
            imports: [common_1.CommonModule]
        })
    ], pgCardSocialModule);
    return pgCardSocialModule;
}());
exports.pgCardSocialModule = pgCardSocialModule;
//# sourceMappingURL=card-social.module.js.map