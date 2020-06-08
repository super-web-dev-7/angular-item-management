import { Component, OnInit, SimpleChanges, SimpleChange, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IField, IFieldOptions } from '../../../models/field.model';

@Component({
  selector: 'app-number-form',
  templateUrl: './number-form.component.html',
  styleUrls: ['./number-form.component.scss']
})
export class NumberFormComponent implements OnInit {
  @Input()
  public fieldForm: FormGroup;
  @Input() 
  public field: IField;

  public numberForm = this.initNumberForm();;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.fieldForm.setControl("options",  this.numberForm);
  }

  ngOnChanges(changes: SimpleChanges) {
    const field: SimpleChange = changes.field;
    this.initFormByField(field.currentValue);
  }

  initNumberForm() {
    return this.fb.group({
      minValue: [''],
      maxValue: [''],
      allowDecimal: [''],
    });
  }

  initFormByField(field: IField) {
    let options: IFieldOptions = {minValue: undefined, maxValue: undefined};
    if(field.options) {
      options = field.options;
    }
    this.numberForm.patchValue(options);
  }
}
