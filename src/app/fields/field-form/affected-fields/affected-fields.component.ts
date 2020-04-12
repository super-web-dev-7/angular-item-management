import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IField } from '@app/models/field.model';
import { getFields, ProjectTypeState } from '@app/store/reducers/project-type.reducer';
import * as Immutable from 'immutable';
import { Store } from '@ngrx/store';
import { NewAffectedFieldComponent } from './new-affected-field/new-affected-field.component';

@Component({
  selector: 'app-affected-fields',
  templateUrl: './affected-fields.component.html',
  styleUrls: ['./affected-fields.component.scss']
})
export class AffectedFieldsComponent implements OnInit {

  constructor(private store: Store<ProjectTypeState>) { }

  @Input() field: IField;

  @ViewChild("newAffectedField", {static: false}) newAffectedField: NewAffectedFieldComponent;

  private fieldsMap: Immutable.Map<string, IField>;

  ngOnInit() {
    this.store.select(getFields)
    .subscribe(
      fields => {
        this.fieldsMap = fields;
      }
    );
  }

  openNewAffectedFieldForm() {
    this.newAffectedField.show();
  }

  closeNewAffectedFieldForm() {
    this.newAffectedField.hide();
  }

  getFieldById(id) {
    let field = this.fieldsMap.get(id);
    return field;
  }
  
}
