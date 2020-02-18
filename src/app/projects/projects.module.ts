import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ProjectsRouts } from "./projects.routing";
import { FormsModule } from "@angular/forms";

//NGX Bootstrap Components
import { CollapseModule, TabsModule } from "ngx-bootstrap";
import { BsDropdownModule } from "ngx-bootstrap";

import { ModalModule } from "ngx-bootstrap";
import { SharedModule } from "../@pages/components/shared.module";
import { ProjectsListComponent } from "./projects-list/projects-list.component";
import { ProjectBoxComponent } from "./project-box/project-box.component";
import { ProjectPageComponent } from "./project-page/project-page.component";
import { pgTabsModule } from "../@pages/components/tabs/tabs.module";
import { AgGridModule } from "ag-grid-angular";
import { ItemsListComponent } from "./items-list/items-list.component";
import { ItemDetailsComponent } from "./item-details/item-details.component";
import { ItemsSelectionComponent } from "./items-selection/items-selection.component";
import { NewItemComponent } from "./new-item/new-item.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ProjectsRouts),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    pgTabsModule,
    AgGridModule.withComponents([]),
    FormsModule
  ],
  providers: [],
  declarations: [
    ProjectsListComponent,
    ProjectBoxComponent,
    ProjectPageComponent,
    ItemsListComponent,
    ItemDetailsComponent,
    ItemsSelectionComponent,
    NewItemComponent
    
  ]
})
export class ProjectsModule {}
