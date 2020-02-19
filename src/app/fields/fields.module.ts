import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { pgTabsModule } from '../@pages/components/tabs/tabs.module';
import { ModalModule, TabsModule } from 'ngx-bootstrap';
import { FieldsRouts } from './fields.routing';
import { SharedModule } from '../@pages/components/shared.module';
import { FieldsComponent } from './fields.component';
import { FieldsListComponent } from './fields-list/fields-list.component';
import { FieldTypeComponent } from './field-type/field-type.component';
import { AgGridModule } from 'ag-grid-angular';
import { TypeRendererComponent } from './fields-list/cell-renderer/type-renderer.component';
import { FieldFormComponent } from './field-form/field-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormModule } from '../common/form/form.module';
import { ModalsModule } from '../common/modal/modals.module';



@NgModule({
  declarations: [FieldsComponent, FieldsListComponent, FieldTypeComponent, FieldFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(FieldsRouts),
    TabsModule.forRoot(),
    FormModule,
    pgTabsModule,
    AgGridModule.withComponents([]),
    ReactiveFormsModule,
    ModalsModule
  ],
  exports: [FieldsComponent, FieldsListComponent, FieldTypeComponent, FieldFormComponent]
})
export class FieldsModule { }
