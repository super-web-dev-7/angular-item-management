import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectsTypeRouts } from './project-types.routing';
import { ProjectTypesListComponent } from './project-types-list/project-types-list.component';
import { SharedModule } from '../@pages/components/shared.module';



@NgModule({
  declarations: [ProjectTypesListComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ProjectsTypeRouts),
  ]
})
export class ProjectTypesModule { }
