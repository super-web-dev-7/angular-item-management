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
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var rxjs_1 = require("rxjs");
var environment_1 = require("../../environments/environment");
var BACKEND_URL = environment_1.environment.apiUrl + "/user";
var AuthService = /** @class */ (function () {
    function AuthService(http, router) {
        this.http = http;
        this.router = router;
        this.authStatusListener = new rxjs_1.Subject();
    }
    AuthService.prototype.getToken = function () {
        return localStorage.getItem('token');
    };
    AuthService.prototype.getIsAuth = function () {
        return localStorage.getItem('currentUser') != undefined;
    };
    AuthService.prototype.getUserId = function () {
        return localStorage.getItem('currentUser');
    };
    AuthService.prototype.getAuthStatusListener = function () {
        return this.authStatusListener.asObservable();
    };
    AuthService.prototype.createUser = function (email, password) {
        var _this = this;
        var authData = { email: email, password: password };
        this.http.post(BACKEND_URL + "/signup", authData).subscribe(function () {
            _this.router.navigate(["/"]);
        }, function (error) {
            _this.authStatusListener.next(false);
        });
    };
    AuthService.prototype.login = function (email, password) {
        var _this = this;
        console.log("To login");
        var authData = { email: email, password: password };
        this.http
            .post(BACKEND_URL + "/login", authData)
            .subscribe(function (response) {
            console.log(response);
            var token = response.token;
            if (token) {
                var expiresInDuration = response.expiresIn;
                var userId = response.userId;
                localStorage.setItem('currentUser', userId);
                _this.authStatusListener.next(true);
                var now = new Date();
                var expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                console.log("logged in");
                _this.saveAuthData(token, expirationDate, userId);
                _this.router.navigate(["/"]);
            }
        }, function (error) {
            console.log(error);
            _this.authStatusListener.next(false);
        });
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        this.authStatusListener.next(false);
        this.clearAuthData();
        this.router.navigate(["/auth/signin"]);
    };
    AuthService.prototype.saveAuthData = function (token, expirationDate, userId) {
        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expirationDate.toISOString());
        localStorage.setItem("userId", userId);
    };
    AuthService.prototype.clearAuthData = function () {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("userId");
    };
    AuthService.prototype.getAuthData = function () {
        var token = localStorage.getItem("token");
        var expirationDate = localStorage.getItem("expiration");
        var userId = localStorage.getItem("userId");
        if (!token || !expirationDate) {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate),
            userId: userId
        };
    };
    AuthService = __decorate([
        core_1.Injectable({ providedIn: "root" }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map