import { Component, OnInit, SimpleChanges, SimpleChange, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalComponent } from '../../common/modal/modal.component';
import { IField } from '../../../models/IField';
import { FieldService } from '../field.service';
import { ModalPosition } from '../../common/modal/ModalPosition';
import { FieldType } from '../../../models/FieldType';
import { auditTime } from 'rxjs/operators';

@Component({
  selector: 'app-field-form',
  templateUrl: './field-form.component.html',
  styleUrls: ['./field-form.component.scss']
})
export class FieldFormComponent implements OnInit {

  @Input()
  public field: IField;

  @ViewChild("fieldFormModal", { static: true })
  public fieldFormModal: ModalComponent;

  public fieldsForm: FormGroup = this.initForm();

  constructor(private fb: FormBuilder, private fieldService: FieldService) { }

  ngOnInit() {
    if (!this.field) {
      this.field = {} as IField;
    }
    this.fieldsForm.valueChanges.pipe(auditTime(3000)).subscribe(formData => {
      this.fieldService.updateField(this.fieldsForm.value).subscribe((result) => {
        console.log("Saving...");
        console.log(this.field);
        console.log(result);
      })
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const field: SimpleChange = changes.field;
    this.initFormByField(field.currentValue);
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

  open() {
    this.fieldsForm.reset();
    this.initFormByField(this.field);
    this.fieldFormModal.show();
  }

  updateField() {

  }

  getPosition() {
    return ModalPosition.RIGHT;
  }

  getFieldType() {
    return FieldType;
  }
}
