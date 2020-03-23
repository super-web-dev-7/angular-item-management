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
var router_1 = require("@angular/router");
var projects_routing_1 = require("./projects.routing");
var forms_1 = require("@angular/forms");
//NGX Bootstrap Components
var ngx_bootstrap_1 = require("ngx-bootstrap");
var ngx_bootstrap_2 = require("ngx-bootstrap");
var ngx_bootstrap_3 = require("ngx-bootstrap");
var shared_module_1 = require("../@pages/components/shared.module");
var projects_list_component_1 = require("./projects-list/projects-list.component");
var project_box_component_1 = require("./project-box/project-box.component");
var project_page_component_1 = require("./project-page/project-page.component");
var tabs_module_1 = require("../@pages/components/tabs/tabs.module");
var ag_grid_angular_1 = require("ag-grid-angular");
var items_list_component_1 = require("./items-list/items-list.component");
var item_details_component_1 = require("./item-details/item-details.component");
var items_selection_component_1 = require("./items-selection/items-selection.component");
var new_item_component_1 = require("./new-item/new-item.component");
var edit_item_component_1 = require("./edit-item/edit-item.component");
var edit_single_item_component_1 = require("./edit-single-item/edit-single-item.component");
var bottom_item_select_component_1 = require("./bottom-item-select/bottom-item-select.component");
var add_new_field_component_1 = require("./add-new-field/add-new-field.component");
var ProjectsModule = /** @class */ (function () {
    function ProjectsModule() {
    }
    ProjectsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                shared_module_1.SharedModule,
                router_1.RouterModule.forChild(projects_routing_1.ProjectsRouts),
                ngx_bootstrap_1.CollapseModule.forRoot(),
                ngx_bootstrap_2.BsDropdownModule.forRoot(),
                ngx_bootstrap_3.ModalModule.forRoot(),
                ngx_bootstrap_1.TabsModule.forRoot(),
                tabs_module_1.pgTabsModule,
                ag_grid_angular_1.AgGridModule.withComponents([]),
                forms_1.FormsModule
            ],
            providers: [],
            declarations: [
                projects_list_component_1.ProjectsListComponent,
                project_box_component_1.ProjectBoxComponent,
                project_page_component_1.ProjectPageComponent,
                items_list_component_1.ItemsListComponent,
                item_details_component_1.ItemDetailsComponent,
                items_selection_component_1.ItemsSelectionComponent,
                new_item_component_1.NewItemComponent,
                edit_item_component_1.EditItemComponent,
                edit_single_item_component_1.EditSingleItemComponent,
                bottom_item_select_component_1.BottomItemSelectComponent,
                add_new_field_component_1.AddNewFieldComponent
            ]
        })
    ], ProjectsModule);
    return ProjectsModule;
}());
exports.ProjectsModule = ProjectsModule;
//# sourceMappingURL=projects.module.js.map