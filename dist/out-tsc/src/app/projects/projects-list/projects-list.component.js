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
var projects_service_1 = require("../projects.service");
var ProjectsListComponent = /** @class */ (function () {
    function ProjectsListComponent(projectsService) {
        this.projectsService = projectsService;
    }
    ProjectsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.projectsService.getProjects().subscribe(function (projects) {
            _this.projects = projects;
        });
    };
    ProjectsListComponent = __decorate([
        core_1.Component({
            selector: 'app-projects-list',
            templateUrl: './projects-list.component.html',
            styleUrls: ['./projects-list.component.scss']
        }),
        __metadata("design:paramtypes", [projects_service_1.ProjectsService])
    ], ProjectsListComponent);
    return ProjectsListComponent;
}());
exports.ProjectsListComponent = ProjectsListComponent;
//# sourceMappingURL=projects-list.component.js.map