"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var auth_routing_module_1 = require("./auth-routing.module");
var auth_signin_component_1 = require("./auth-signin/auth-signin.component");
var auth_signup_component_1 = require("./auth-signup/auth-signup.component");
var auth_reset_password_component_1 = require("./auth-reset-password/auth-reset-password.component");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        core_1.NgModule({
            declarations: [
                auth_signin_component_1.AuthSigninComponent,
                auth_signup_component_1.AuthSignupComponent,
                auth_reset_password_component_1.AuthResetPasswordComponent
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                auth_routing_module_1.AuthRoutingModule
            ]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map