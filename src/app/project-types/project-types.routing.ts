import { Routes } from '@angular/router';
import { ProjectTypesListComponent } from './project-types-list/project-types-list.component';
import { ProjectTypeDetailsComponent } from './project-type-details/project-type-details.component';
//Routes
export const ProjectsTypeRouts: Routes = [
  {
    path: '',
    component: ProjectTypesListComponent
  },
  {
    path: ':id',
    component: ProjectTypeDetailsComponent
  }
];
