import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IField } from '../../../../models/IField';
import { FieldService } from '../../field.service';

@Component({
  selector: 'app-create-field',
  templateUrl: './create-field.component.html',
  styleUrls: ['./create-field.component.scss']
})
export class CreateFieldComponent implements OnInit {

  constructor(private fb: FormBuilder, private fieldService: FieldService) { }


  @Output() 
  public createdFieldOutput = new EventEmitter<IField[]>();

  private createdField: IField;
  public createFieldForm: FormGroup = this.initForm();

  ngOnInit() {

  }

  initForm() {
    return this.fb.group({
      label: ['', [Validators.required, Validators.minLength(1)]],
      type: [null, [Validators.required]]
    });
  }

  
  isFormValid() {
    return this.createFieldForm.valid
  }

  reset() {
    this.createFieldForm.reset();
  }

  createField() {
    if (!this.createFieldForm.valid)
      return;
    this.fieldService.createField(this.createFieldForm.value).subscribe((field: IField) => {
      this.createdField = { ...this.createFieldForm.value, _id: field._id };
      this.createdFieldOutput.emit([this.createdField]);
    });
  }

}
