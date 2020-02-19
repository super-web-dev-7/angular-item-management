import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectsTypeRouts } from './project-types.routing';
import { ProjectTypesListComponent } from './project-types-list/project-types-list.component';
import { SharedModule } from '../@pages/components/shared.module';
import { ProjectTypeBoxComponent } from './project-type-box/project-type-box.component';
import { ProjectTypeDetailsComponent } from './project-type-details/project-type-details.component';
import { pgTabsModule } from '../@pages/components/tabs/tabs.module';
import { ModalModule, TabsModule } from 'ngx-bootstrap';
import { FieldsModule } from '../fields/fields.module';
import { FieldsListComponent } from '../fields/fields-list/fields-list.component';
import { FormModule } from '../common/form/form.module';
import { ModalComponent } from '../common/modal/modal.component';



@NgModule({
  declarations: [ProjectTypesListComponent, ProjectTypeBoxComponent, ProjectTypeDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ProjectsTypeRouts),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    pgTabsModule,
    FieldsModule
    ]
})
export class ProjectTypesModule { }
