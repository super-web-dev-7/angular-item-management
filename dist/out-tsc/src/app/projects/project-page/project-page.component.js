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
var router_1 = require("@angular/router");
var ProjectPageComponent = /** @class */ (function () {
    function ProjectPageComponent(route) {
        this.route = route;
    }
    ProjectPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.route.params.subscribe(function (params) {
            _this.projectId = params['id'];
        });
        // localStorage.removeItem('copydata')
    };
    ProjectPageComponent.prototype.myfunc = function (event) {
        if (event.target.text) {
            if (event.target.text.trim() == "Items") {
                if (localStorage.getItem('copydata')) {
                    document.getElementById('popupid').hidden = false;
                }
            }
        }
    };
    ProjectPageComponent.prototype.ngAfterViewInit = function () {
        //alert('i ngAfterViewInit')
        // 
    };
    ProjectPageComponent = __decorate([
        core_1.Component({
            selector: 'app-project-page',
            templateUrl: './project-page.component.html',
            styleUrls: ['./project-page.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute])
    ], ProjectPageComponent);
    return ProjectPageComponent;
}());
exports.ProjectPageComponent = ProjectPageComponent;
//# sourceMappingURL=project-page.component.js.map