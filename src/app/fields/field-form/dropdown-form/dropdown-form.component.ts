import { Component, OnInit, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dropdown-form',
  templateUrl: './dropdown-form.component.html',
  styleUrls: ['./dropdown-form.component.scss']
})
export class DropdownFormComponent implements OnInit {
  @Input()
  public fieldForm: FormGroup;
  @Input()
  public field;

  public dropdownForm: FormGroup = this.initDropdownForm();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.fieldForm.setControl("options", this.dropdownForm);
  }

  ngOnChanges(changes: SimpleChanges) {
    const field: SimpleChange = changes.field;
    this.initFormByField(field.currentValue);
  }

  initDropdownForm() {
    return this.fb.group({
      optionsForSelect: ['']
    });
  }

  initFormByField(field) {
    let options = {optionsForSelect: []};
    if(field.options) {
      options = field.options;
    }
    this.dropdownForm.patchValue(options);
  }
}
