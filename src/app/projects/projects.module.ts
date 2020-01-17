import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectsRouts } from './projects.routing';

//NGX Bootstrap Components
import { CollapseModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap';

import { ModalModule } from 'ngx-bootstrap';
import { SharedModule } from '../@pages/components/shared.module';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectItemComponent } from './project-item/project-item.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ProjectsRouts),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers:[],
  declarations: [ProjectsListComponent, ProjectItemComponent]
})
export class ProjectsModule { }
