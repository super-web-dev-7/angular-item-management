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
import { ItemsListComponent } from "./items-list/items-list.component";
import { ItemDetailsComponent } from "./item-details/item-details.component";
import { ItemsSelectionComponent } from "./items-selection/items-selection.component";
import { NewItemComponent } from "./new-item/new-item.component";
import { EditItemComponent } from './edit-item/edit-item.component';
import { EditSingleItemComponent } from './edit-single-item/edit-single-item.component';
import { BottomItemSelectComponent } from './bottom-item-select/bottom-item-select.component';
import { AddNewFieldComponent } from './add-new-field/add-new-field.component';
import { AgGridComponent } from './ag-grid/ag-grid.component';
// import { NumericEditorComponent } from './numeric-editor/numeric-editor.component';
import { AgGridModule } from 'ag-grid-angular';
import { FilterInputComponent } from './filter-input/filter-input.component';
import { DateEditorComponent } from './date-editor/date-editor.component';
import { ShowHideCheckboxComponent } from './show-hide-checkbox/show-hide-checkbox.component';
import { RowColumnDragComponent } from './row-column-drag/row-column-drag.component';
import { PaginationComponent } from './pagination/pagination.component';
import { GridEventsComponent } from './grid-events/grid-events.component';
import { CellEditComponent } from './cell-edit/cell-edit.component';
import { SetColumnItemsComponent } from './set-column-items/set-column-items.component';

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
    AgGridModule.withComponents([FilterInputComponent, DateEditorComponent]),
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
    NewItemComponent,
    EditItemComponent,
    EditSingleItemComponent,
    BottomItemSelectComponent,
    AddNewFieldComponent,
    AgGridComponent,
    FilterInputComponent,
    DateEditorComponent,
    ShowHideCheckboxComponent,
    RowColumnDragComponent,
    PaginationComponent,
    GridEventsComponent,
    CellEditComponent,
    SetColumnItemsComponent,
    // NumericEditorComponent
  ]
})
export class ProjectsModule {}
