import { Component, OnInit } from '@angular/core';
import { ProjectTypeService } from '../project-type.service';
import { ProjectTypesState } from '@app/store/states/project-types.state';
import { Store } from '@ngrx/store';
import { getTypes } from '@app/store/reducers/project-types.reducer';
import * as  ProjectTypesActions from '@app/store/actions/project-types.actions';


@Component({
  selector: 'app-project-types-list',
  templateUrl: './project-types-list.component.html',
  styleUrls: ['./project-types-list.component.scss']
})
export class ProjectTypesListComponent implements OnInit {

  public projectTypes;

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

}
