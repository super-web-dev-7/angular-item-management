import { Component, OnInit, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalComponent } from '../../common/modal/modal.component';
import { IField } from '../../models/field.model';
import { FieldService } from '../field.service';
import { ModalPosition, ModalSize } from '../../common/modal/ModalEnums';
import { FieldType } from '../../models/FieldType';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { getSelectedField } from '@app/store/reducers/project-type.reducer';
import * as ProjectTypeActions from '@app/store/actions/project-type.actions';
import { ProjectTypeState } from '@app/store/states/project-type.state';

@Component({
  selector: 'app-field-form',
  templateUrl: './field-form.component.html',
  styleUrls: ['./field-form.component.scss']
})
export class FieldFormComponent implements OnInit, OnDestroy {
  @ViewChild("fieldFormModal", { static: true })
  public fieldFormModal: ModalComponent;

  @Output() fieldChanged = new EventEmitter<IField>();

  public fieldsForm: FormGroup = this.initForm();

  private field: IField;
  private subscription = new Subscription();
  private size = this.getSize();
  private position = this.getPosition();

  constructor(private store: Store<ProjectTypeState>,
    private fb: FormBuilder, 
    private fieldService: FieldService) { }

  ngOnInit() {
    let updateSubscription: Subscription;
    let changeSubscription = this.fieldsForm.valueChanges.pipe(
      debounceTime(1500)
    ).subscribe(formData => {
      if (this.fieldsForm.touched && this.fieldsForm.valid) {
        this.fieldFormModal.showLoader();
        updateSubscription = this.fieldService.updateField(this.fieldsForm.value).subscribe((result: IField) => {
          this.fieldFormModal.hideLoader();
          this.fieldChanged.emit(result);
        })
      }
    });
    this.subscription.add(changeSubscription);
    this.subscription.add(updateSubscription);

    this.store.select(getSelectedField)
    .subscribe(
      field => {
        this.field = field;
        this.fieldsForm.reset();
        this.initFormByField(this.field);
      }
    );
  }

  initForm() {
    return this.fb.group({
      _id: [''],
      label: [''],
      type: [''],
      isRequired: ['']
    });
  }

  initFormByField(field) {
    if (field) {
      this.fieldsForm.patchValue(field);
    }
  }

  open(field) {
    this.store.dispatch(ProjectTypeActions.SelectFieldAction({payload: field}));
    this.fieldFormModal.show();
  }

  getPosition() {
    return ModalPosition.RIGHT;
  }

  getSize() {
    return ModalSize.MEDIUM;
  }

  getFieldType() {
    return FieldType;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
