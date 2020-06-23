import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { ProjectsState } from '@app/store/states/projects.state';
import { Store, props } from '@ngrx/store';
import { getProjects } from '@app/store/reducers/projects-reducer';
import { IProject } from '@app/models/project';
import { GetProjectsAction } from '@app/store/actions/projects.actions';
import { CreateProjectComponent } from '@app/common/common-forms/create-project/create-project.component';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {

  projects: IProject[];
  constructor(private store: Store<ProjectsState>) { }

    @ViewChild("createProjectModal", {static: false})
    public createProjectModal: CreateProjectComponent;

  ngOnInit() {
    this.store.select(getProjects)
    .subscribe(
      projects => {
        this.projects = projects;
      }
    );

    this.store.dispatch(GetProjectsAction());
  }

  openCreateProject() {
    this.createProjectModal.show();
  }
}
