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



@NgModule({
  declarations: [FieldsComponent, FieldsListComponent, FieldTypeComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(FieldsRouts),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    pgTabsModule,
    AgGridModule.withComponents([])
  ],
  exports: [FieldsComponent, FieldsListComponent, FieldTypeComponent]
})
export class FieldsModule { }
