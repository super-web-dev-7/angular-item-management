import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';

import { FieldsListComponent } from './fields-list/fields-list.component';
import { IField, IFieldOptions } from '../models/field.model';
import { ProjectTypeService } from '../project-types/project-type.service';
import { FieldFormComponent } from './field-form/field-form.component';
import { AddFieldComponent } from './add-field/add-field.component';
import { Store } from '@ngrx/store';
import { ProjectTypeState, getFields } from '@app/store/reducers/project-type.reducer';
import { UpdateField, FieldsLoaded, AddField } from '@app/store/actions/project-type.actions';
import * as Immutable from 'immutable';


@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss']
})
export class FieldsComponent implements OnInit, OnDestroy {
  @Input()
  private projectTypeId;

  @ViewChild("fieldsList", { static: false })
  public fieldsList: FieldsListComponent;

  @ViewChild("fieldForm", {static: true}) 
  private fieldForm: FieldFormComponent;

  @ViewChild("addFieldModal", {static: true}) 
  private addFieldModal: AddFieldComponent;

  private createdFielsSubscription;
  private fieldsMap: Immutable.Map<string, IField>;
  private fields: IField[];
  public filterQuery = '';

  constructor(private store: Store<ProjectTypeState>,
    private projectTypesService: ProjectTypeService) { }

  ngOnInit() {
    this.projectTypesService.getFieldsByProjectType(this.projectTypeId).subscribe((
      (fields: IField[]) => {
        this.store.dispatch(new FieldsLoaded(this.createFieldsMap(fields)))
      })
    );

    this.store.select(getFields)
    .subscribe(
      fields => {
        this.fieldsMap = fields;
        this.fields = this.fieldsMap.valueSeq().toArray();
      }
    );
  }

  private createFieldsMap(fields) {
    let fieldsMap: {[id: string]: IField} = {};
    fields.forEach((field: IField) => {
      fieldsMap[field._id] = field;
    });
    return fieldsMap;
  }

   openForm(field: IField) {
     this.fieldForm.open(field);
   }

  createField() {
    this.createdFielsSubscription = this.addFieldModal.openAndWaitForFinish().subscribe((createdFields: IField[]) => {
      if (createdFields) {
        const fieldIds = createdFields.map((field) => field._id);
        this.projectTypesService.addFieldToProjectType(this.projectTypeId, fieldIds).subscribe((result) => {
          createdFields.forEach((field) => {
            this.store.dispatch(new AddField(field));
            this.onSelectField(field);
            this.fieldsList.addFieldAndSelect(field);
          });
        });
      }
      this.createdFielsSubscription.unsubscribe();
    });
  }

   onSelectField = (field: IField) => {
     this.openForm(field);
   }

   updateFieldInList(updatedField: IField){
    this.store.dispatch(new UpdateField(updatedField));
    this.fieldsList.updateField(updatedField);
  }

  ngOnDestroy() {
    if (this.createdFielsSubscription) {
      this.createdFielsSubscription.unsubscribe();
    }
  }
}
