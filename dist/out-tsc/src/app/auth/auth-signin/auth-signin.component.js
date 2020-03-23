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
var auth_service_1 = require("../auth.service");
var AuthSigninComponent = /** @class */ (function () {
    function AuthSigninComponent(authService) {
        this.authService = authService;
        this.isLoading = false;
    }
    AuthSigninComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authStatusSub = this.authService.getAuthStatusListener().subscribe(function (authStatus) {
            _this.isLoading = false;
        });
    };
    AuthSigninComponent.prototype.onLogin = function (form) {
        if (form.invalid) {
            return;
        }
        this.isLoading = true;
        this.authService.login(form.value.email, form.value.password);
    };
    AuthSigninComponent.prototype.ngOnDestroy = function () {
        this.authStatusSub.unsubscribe();
    };
    AuthSigninComponent = __decorate([
        core_1.Component({
            selector: 'app-auth-signin',
            templateUrl: './auth-signin.component.html',
            styleUrls: ['./auth-signin.component.scss']
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService])
    ], AuthSigninComponent);
    return AuthSigninComponent;
}());
exports.AuthSigninComponent = AuthSigninComponent;
//# sourceMappingURL=auth-signin.component.js.map