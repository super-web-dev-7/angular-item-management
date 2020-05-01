import { Component, OnInit, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IField } from '@app/models/field.model';
import { getFields } from '@app/store/reducers/project-type.reducer';
import { Store } from '@ngrx/store';
import { ProjectTypeState } from '@app/store/states/project-type.state';

@Component({
  selector: 'app-expression-form',
  templateUrl: './expression-form.component.html',
  styleUrls: ['./expression-form.component.scss']
})
export class ExpressionFormComponent implements OnInit {
    @Input()
    public fieldForm: FormGroup;
    @Input()
    public field: IField;

    private fields: IField[];
  
    public expressionForm: FormGroup = this.initExpressionForm();
  
    constructor(private fb: FormBuilder, 
                private store: Store<ProjectTypeState>) { }
  
    ngOnInit() {
      this.fieldForm.setControl("options", this.expressionForm);

      this.store.select(getFields)
      .subscribe(
        fields => {
          this.fields = fields.valueSeq().toArray();
        }
      );
    }
  
    ngOnChanges(changes: SimpleChanges) {
      const field: SimpleChange = changes.field;
      this.initFormByField(field.currentValue);
    }
  
    initExpressionForm() {
      return this.fb.group({
        expression: ['']
      });
    }
  
    initFormByField(field) {
      let options = {};
      if(field.options) {
        options = field.options;
      }
      this.expressionForm.patchValue(options);
    }
  }
  