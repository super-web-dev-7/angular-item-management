"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var projects_list_component_1 = require("./projects-list/projects-list.component");
var project_page_component_1 = require("./project-page/project-page.component");
//Routes
exports.ProjectsRouts = [
    {
        path: '',
        component: projects_list_component_1.ProjectsListComponent
    },
    {
        path: ':id',
        component: project_page_component_1.ProjectPageComponent
    }
];
//# sourceMappingURL=projects.routing.js.map