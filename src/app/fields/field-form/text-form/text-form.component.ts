import { Component, OnInit, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-text-form',
  templateUrl: './text-form.component.html',
  styleUrls: ['./text-form.component.scss']
})
export class TextFormComponent implements OnInit {
  @Input()
  public fieldForm: FormGroup
  @Input() 
  public field;

  public textForm = this.initTextForm();;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.fieldForm.setControl("options",  this.textForm);
  }

  ngOnChanges(changes: SimpleChanges) {
    const field: SimpleChange = changes.field;
    this.initFormByField(field.currentValue);
  }

  initTextForm() {
    return this.fb.group({
      minLength: [''],
      maxLength: ['']
    });
  }

  initFormByField(field) {
    let options = {minLength: '', maxLength: ''};
    if(field.options) {
      options = field.options;
    }
    this.textForm.patchValue(options);
  }
}
