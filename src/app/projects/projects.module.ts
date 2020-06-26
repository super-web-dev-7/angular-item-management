import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ProjectsRouts} from './projects.routing';
import {FormsModule} from '@angular/forms';

// NGX Bootstrap Components
import {CollapseModule, TabsModule} from 'ngx-bootstrap';
import {BsDropdownModule} from 'ngx-bootstrap';

import {ModalModule} from 'ngx-bootstrap';
import {SharedModule} from '../@pages/components/shared.module';
import {ProjectsListComponent} from './projects-list/projects-list.component';
import {ProjectBoxComponent} from './project-box/project-box.component';
import {ProjectPageComponent} from './project-page/project-page.component';
import {pgTabsModule} from '../@pages/components/tabs/tabs.module';
import {ItemsListComponent} from './items-list/items-list.component';
import {ItemDetailsComponent} from './item-details/item-details.component';
import {ItemsSelectionComponent} from './items-selection/items-selection.component';
import {NewItemComponent} from './new-item/new-item.component';
import {EditItemComponent} from './edit-item/edit-item.component';
import {EditSingleItemComponent} from './edit-single-item/edit-single-item.component';
import {BottomItemSelectComponent} from './bottom-item-select/bottom-item-select.component';
import {AddNewFieldComponent} from './add-new-field/add-new-field.component';
import {AgGridComponent} from './ag-grid/ag-grid.component';
import {ModalsModule} from '@app/common/modal/modals.module';
import {CommonFormsModule} from '@app/common/common-forms/common-forms.module';
import {ProjectBoxActionsComponent} from './project-box-actions/project-box-actions.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
// import { NumericEditorComponent } from './numeric-editor/numeric-editor.component';
import {AgGridModule} from 'ag-grid-angular';
import {FilterInputComponent} from './filter-input/filter-input.component';
import {DateEditorComponent} from './editor/date-editor/date-editor.component';
import {ShowHideCheckboxComponent} from './show-hide-checkbox/show-hide-checkbox.component';
import {RowColumnDragComponent} from './row-column-drag/row-column-drag.component';
import {PaginationComponent} from './pagination/pagination.component';
import {GridEventsComponent} from './grid-events/grid-events.component';
import {CellEditComponent} from './cell-edit/cell-edit.component';
import {SetColumnItemsComponent} from './set-column-items/set-column-items.component';
import {TextEditorComponent} from '@app/projects/editor/text-editor/text-editor.component';
import {NumberEditorComponent} from '@app/projects/editor/number-editor/number-editor.component';
import {SelectEditorComponent} from '@app/projects/editor/select-editor/select-editor.component';
import {NgbDropdownModule, NgbModalModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {TextFilterComponent} from '@app/projects/filter/text-filter/text-filter.component';
import {NgSelectModule} from '@ng-select/ng-select';
import { NgpSortModule } from 'ngp-sort-pipe';
import { GridLoadPlaceholderComponent } from './grid-load-placeholder/grid-load-placeholder.component';
import {PictureCellRendererComponent} from '@app/projects/picture-cell-renderer/picture-cell-renderer.component';
import {ImageSliderComponent} from '@app/projects/picture-cell-renderer/image-slider/image-slider.component';
import {NumberFilterComponent} from '@app/projects/filter/number-filter/number-filter.component';
import {ExpressionFilterComponent} from '@app/projects/filter/expression-filter/expression-filter.component';
import {DropdownFilterComponent} from '@app/projects/filter/dropdown-filter/dropdown-filter.component';
import {PictureFilterComponent} from '@app/projects/filter/picture-filter/picture-filter.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FontAwesomeModule,
        RouterModule.forChild(ProjectsRouts),
        CollapseModule.forRoot(),
        BsDropdownModule.forRoot(),
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        pgTabsModule,
        AgGridModule.withComponents([
            FilterInputComponent,
            DateEditorComponent,
            TextEditorComponent,
            NumberEditorComponent,
            SelectEditorComponent,
            TextFilterComponent,
            NumberFilterComponent,
            ExpressionFilterComponent,
            DropdownFilterComponent,
            PictureFilterComponent,
            PictureCellRendererComponent
        ]),
        NgSelectModule,
        FormsModule,
        ModalsModule,
        CommonFormsModule,
        NgbTooltipModule,
        NgbDropdownModule,
        NgpSortModule,
        NgbModalModule
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
        ProjectBoxActionsComponent,
        FilterInputComponent,
        TextFilterComponent,
        NumberFilterComponent,
        ExpressionFilterComponent,
        DropdownFilterComponent,
        PictureFilterComponent,
        DateEditorComponent,
        TextEditorComponent,
        NumberEditorComponent,
        SelectEditorComponent,
        PictureCellRendererComponent,
        ShowHideCheckboxComponent,
        RowColumnDragComponent,
        PaginationComponent,
        GridEventsComponent,
        CellEditComponent,
        SetColumnItemsComponent,
        GridLoadPlaceholderComponent,
        ImageSliderComponent,

        // NumericEditorComponent
    ],
    entryComponents: [
        ImageSliderComponent
    ],
    exports: [
    ]
})
export class ProjectsModule {
}
