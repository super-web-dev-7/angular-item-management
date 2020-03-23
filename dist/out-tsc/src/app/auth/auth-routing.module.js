"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_signin_component_1 = require("./auth-signin/auth-signin.component");
var auth_signup_component_1 = require("./auth-signup/auth-signup.component");
var auth_reset_password_component_1 = require("./auth-reset-password/auth-reset-password.component");
var routes = [
    { path: "signin", component: auth_signin_component_1.AuthSigninComponent },
    { path: "signup", component: auth_signup_component_1.AuthSignupComponent },
    { path: "reset-password", component: auth_reset_password_component_1.AuthResetPasswordComponent },
];
var AuthRoutingModule = /** @class */ (function () {
    function AuthRoutingModule() {
    }
    AuthRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(routes)
            ],
            exports: [router_1.RouterModule]
        })
    ], AuthRoutingModule);
    return AuthRoutingModule;
}());
exports.AuthRoutingModule = AuthRoutingModule;
//# sourceMappingURL=auth-routing.module.js.map