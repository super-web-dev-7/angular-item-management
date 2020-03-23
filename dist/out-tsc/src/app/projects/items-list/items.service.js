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
var environment_1 = require("../../../environments/environment");
var ItemsService = /** @class */ (function () {
    function ItemsService(httpClient) {
        this.httpClient = httpClient;
    }
    // requestOptions = {
    //   headers: new Headers(this.headerDict)
    // };
    ItemsService.prototype.getItemsByProject = function (projectId) {
        return this.httpClient.get(environment_1.environment.apiUrl + "/item/project/" + projectId);
    };
    ItemsService.prototype.newItemByProject = function (projectId, data) {
        var headers = {
            Authorization: "Bearer " + localStorage.getItem("token")
        };
        return this.httpClient.post(environment_1.environment.apiUrl + "/item", data, {
            headers: headers
        });
    };
    ItemsService.prototype.Paste = function (data, type) {
        var headers = {
            Authorization: "Bearer " + localStorage.getItem("token")
        };
        if (localStorage.getItem('pastetype') == 'copy') {
            return this.httpClient.post(environment_1.environment.apiUrl + "/item/duplicate", data, {
                headers: headers
            });
        }
        if (localStorage.getItem('pastetype') == 'cut') {
            return this.httpClient.put(environment_1.environment.apiUrl + "/item/paste", data, {
                headers: headers
            });
        }
    };
    ItemsService.prototype.editItemByProject = function (data) {
        var headers = {
            Authorization: "Bearer " + localStorage.getItem("token")
        };
        return this.httpClient.put(environment_1.environment.apiUrl + "/item", data, {
            headers: headers
        });
    };
    ItemsService.prototype.editSingleItemByProject = function (data) {
        var headers = {
            Authorization: "Bearer " + localStorage.getItem("token")
        };
        return this.httpClient.put(environment_1.environment.apiUrl + "/item/mass", data, {
            headers: headers
        });
    };
    ItemsService.prototype.deleteItemsByid = function (data) {
        var headers = {
            Authorization: "Bearer " + localStorage.getItem("token")
        };
        return this.httpClient.delete(environment_1.environment.apiUrl + "/item/mass-delete", data);
    };
    ItemsService.prototype.deleteSingleItemByid = function (id) {
        var headers = {
            Authorization: "Bearer " + localStorage.getItem("token")
        };
        return this.httpClient.delete(environment_1.environment.apiUrl + "/item/" + id, {
            headers: headers
        });
    };
    ItemsService.prototype.duplicateItems = function (data) {
        var headers = {
            Authorization: "Bearer " + localStorage.getItem("token")
        };
        return this.httpClient.post(environment_1.environment.apiUrl + "/item/duplicate", data, {
            headers: headers
        });
    };
    ItemsService.prototype.changeOrder = function (data) {
        var headers = {
            Authorization: "Bearer " + localStorage.getItem("token")
        };
        return this.httpClient.put(environment_1.environment.apiUrl + "/item/change-order", data, {
            headers: headers
        });
    };
    ItemsService.prototype.addComment = function (data, id) {
        var headers = {
            Authorization: "Bearer " + localStorage.getItem("token")
        };
        return this.httpClient.post(environment_1.environment.apiUrl + "/item/add-comment", data, {
            headers: headers
        });
    };
    ItemsService.prototype.updateComment = function (data) {
        var headers = {
            Authorization: "Bearer " + localStorage.getItem("token")
        };
        return this.httpClient.put(environment_1.environment.apiUrl + "/item/update-comment", data, {
            headers: headers
        });
    };
    ItemsService.prototype.deleteComment = function (data) {
        var headers = {
            Authorization: "Bearer " + localStorage.getItem("token")
        };
        return this.httpClient.post(environment_1.environment.apiUrl + "/item/delete-comment", data);
    };
    ItemsService.prototype.ongetItemsByProjectWithPagination = function (projectId, data, pageNO) {
        var headers = {
            Authorization: "Bearer " + localStorage.getItem("token")
        };
        return this.httpClient.post(environment_1.environment.apiUrl + "/item/project/" + projectId + '/pageNumber/' + pageNO + '/itemsPerPage/100', data);
    };
    ItemsService.prototype.countItemsByProject = function (id) {
        var headers = {
            Authorization: "Bearer " + localStorage.getItem("token")
        };
        return this.httpClient.get(environment_1.environment.apiUrl + "/item/total/project/" + id);
    };
    ItemsService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], ItemsService);
    return ItemsService;
}());
exports.ItemsService = ItemsService;
//# sourceMappingURL=items.service.js.map