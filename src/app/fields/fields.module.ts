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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalsModule } from '../common/modal/modals.module';
import { CreateFieldComponent } from './add-field/create-field/create-field.component';
import { ExistingFieldSelectComponent } from './add-field/existing-field-select/existing-field-select.component';
import { FieldTypeChooserComponent } from './add-field/create-field/field-type-chooser/field-type-chooser.component';
import { AddFieldComponent } from './add-field/add-field.component';
import { FormModule } from '../common/form/form.module';
import { DropdownFormComponent } from './field-form/dropdown-form/dropdown-form.component';
import { TextFormComponent } from './field-form/text-form/text-form.component';
import { pgCardModule } from '../@pages/components/card/card.module';
import { DateFormComponent } from './field-form/date-form/date-form.component';
import { NumberFormComponent } from './field-form/number-form/number-form.component';
import { pgCollapseModule } from '../@pages/components/collapse';
import { AffectedFieldsComponent } from './field-form/affected-fields/affected-fields.component';
import { AffectedFieldBoxComponent } from './field-form/affected-fields/affected-field-box/affected-field-box.component';
import { pgSelectModule } from '@app/@pages/components/select/select.module';
import { NewAffectedFieldComponent } from './field-form/affected-fields/new-affected-field/new-affected-field.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [FieldsComponent,
    FieldsListComponent,
    FieldTypeComponent,
    FieldFormComponent,
    CreateFieldComponent,
    ExistingFieldSelectComponent,
    FieldTypeChooserComponent,
    AddFieldComponent,
    TypeRendererComponent,
    DropdownFormComponent,
    TextFormComponent,
    DateFormComponent,
    NumberFormComponent,
    AffectedFieldsComponent,
    AffectedFieldBoxComponent,
    NewAffectedFieldComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedModule,
    RouterModule.forChild(FieldsRouts),
    TabsModule.forRoot(),
    FormsModule,
    pgTabsModule,
    pgCardModule,
    AgGridModule.withComponents([TypeRendererComponent]),
    ReactiveFormsModule,
    ModalsModule,
    FormModule,
    pgCollapseModule.forRoot(),
    pgSelectModule
  ],
  exports: [
    FieldsComponent,
    FieldsListComponent,
    FieldTypeComponent,
    FieldFormComponent,
    CreateFieldComponent,
    ExistingFieldSelectComponent,
    FieldTypeChooserComponent,
    AddFieldComponent]
})
export class FieldsModule { }
