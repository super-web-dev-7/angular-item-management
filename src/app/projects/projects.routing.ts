import { Routes } from '@angular/router';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectPageComponent } from './project-page/project-page.component';

//Routes
export const ProjectsRouts: Routes = [
  {
    path: '',
    component: ProjectsListComponent
  },
  {
    path: ':id',
    component: ProjectPageComponent
  }
];
