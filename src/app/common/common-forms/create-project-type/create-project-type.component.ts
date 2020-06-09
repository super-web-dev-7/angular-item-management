import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalSize, ModalPosition } from '@app/common/modal/ModalEnums';
import { Store } from '@ngrx/store';
import { ProjectTypesState } from '@app/store/states/project-types.state';
import { FormBuilder } from '@angular/forms';
import { ModalComponent } from '@app/common/modal/modal.component';
import { BeginCreateProjectTypeAction } from '@app/store/actions/project-types.actions';

@Component({
  selector: 'app-create-project-type',
  templateUrl: './create-project-type.component.html',
  styleUrls: ['./create-project-type.component.css']
})
export class CreateProjectTypeComponent implements OnInit {

  createProjectTypeForm = this.initForm();
  projectTypes;

  constructor(private store: Store<ProjectTypesState>, 
              private fb: FormBuilder) { }

  @ViewChild("createProjectTypeModal", {static: true})
  public createProjectTypeModal: ModalComponent;
  
  ngOnInit() {
    console.log("here");
  }

  getPosition() {
    return ModalPosition.CENTER;
  }

  getSize() {
    return ModalSize.MEDIUM;
  }

  show() {
    this.createProjectTypeModal.show();
  }

  hide() {
    this.createProjectTypeModal.hide();
  }

  initForm() {
    return this.fb.group({
      name: [''],
    });
  }

  onCreate() {
    let projectType = this.createProjectTypeForm.value;
    this.createProjectTypeModal.hide();
    this.createProjectTypeForm.reset();
    this.store.dispatch(BeginCreateProjectTypeAction({ payload: projectType }));
  }

}
