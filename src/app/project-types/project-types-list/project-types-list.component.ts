import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectTypeService } from '../project-type.service';
import { ProjectTypesState } from '@app/store/states/project-types.state';
import { Store } from '@ngrx/store';
import { getTypes } from '@app/store/reducers/project-types.reducer';
import * as  ProjectTypesActions from '@app/store/actions/project-types.actions';
import { CreateProjectTypeComponent } from '@app/common/common-forms/create-project-type/create-project-type.component';


@Component({
  selector: 'app-project-types-list',
  templateUrl: './project-types-list.component.html',
  styleUrls: ['./project-types-list.component.scss']
})
export class ProjectTypesListComponent implements OnInit {

  public projectTypes;

  @ViewChild("createProjectTypeModal", {static: false})
  public createProjectTypeModal: CreateProjectTypeComponent;
  
  constructor(private store: Store<ProjectTypesState>) {

  }

  ngOnInit() {
    this.store.select(getTypes)
      .subscribe(
        types => {
          this.projectTypes = types;
        }
      );

    this.store.dispatch(ProjectTypesActions.GetProjectTypesAction());
  }

  openCreateProjectType() {
    console.log(this.createProjectTypeModal);
    this.createProjectTypeModal.show();
  }

}
