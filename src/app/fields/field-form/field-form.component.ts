import { Component, OnInit, SimpleChanges, SimpleChange, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalComponent } from '../../common/modal/modal.component';
import { FieldService } from '../field.service';
import { IField } from '../../../models/IField';

@Component({
  selector: 'app-field-form',
  templateUrl: './field-form.component.html',
  styleUrls: ['./field-form.component.scss']
})
export class FieldFormComponent implements OnInit {

  @Input()
  public field: IField;

  @ViewChild("fieldFormModal", {static: true})
  public fieldFormModal: ModalComponent;

  public fieldsForm: FormGroup = this.initForm();

  constructor(private fb: FormBuilder, private fieldsService: FieldService) { }

  ngOnInit() {
    if(!this.field) {
      this.field = {} as IField;
    }
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
      isRequired: [''],
      minLength: [''],
      maxLength: ['']
    });
  }
  
  initFormByField(field) {
    if (field) {
      this.fieldsForm.patchValue(field);
    }
  }

  open() {
    this.fieldsForm.reset();
    this.fieldFormModal.show();
  }

  updateField() {
   // this.fieldsService.updateField(this.fieldsForm.value).subscribe((result) => {
   // })
  }
}
