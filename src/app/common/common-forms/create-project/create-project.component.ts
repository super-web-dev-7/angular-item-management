import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalPosition, ModalSize } from '@app/common/modal/ModalEnums';
import { ModalComponent } from '@app/common/modal/modal.component';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ProjectTypesState } from '@app/store/states/project-types.state';
import { getTypes } from '@app/store/reducers/project-types.reducer';
import { GetProjectTypesAction } from '@app/store/actions/project-types.actions';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  createProjectForm = this.initForm();
  projectTypes;

  constructor(private store: Store<ProjectTypesState>, 
              private fb: FormBuilder) { }

  @ViewChild("createProjectModal", {static: true})
  public createProjectModal: ModalComponent;
  
  ngOnInit() {
    this.store.select(getTypes)
    .subscribe(
      types => {
        this.projectTypes = types;
      }
    );

  this.store.dispatch(GetProjectTypesAction());
  }

  getPosition() {
    return ModalPosition.CENTER;
  }

  getSize() {
    return ModalSize.MEDIUM;
  }

  show() {
    this.createProjectModal.show();
  }

  hide() {
    this.createProjectModal.hide();
  }

  initForm() {
    return this.fb.group({
      name: [''],
      description: [''],
      type: ['']
    });
  }

}
