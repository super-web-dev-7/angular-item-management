import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';

import { FieldsListComponent } from './fields-list/fields-list.component';
import { IField } from '../../models/IField';
import { ProjectTypeService } from '../project-types/project-type.service';
import { FieldFormComponent } from './field-form/field-form.component';
import { AddFieldComponent } from './add-field/add-field.component';

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
  private fields: IField[];
  private fieldsMap: {[id: string]: IField}
  public filterQuery = '';

  constructor(
    private projectTypesService: ProjectTypeService) { }

  ngOnInit() {
    this.projectTypesService.getFieldsByProjectType(this.projectTypeId).subscribe((
      (fields: IField[]) => {
        console.log(fields);
        this.fields = fields;
        this.initFieldsMap(this.fields);
      })
    );
  }

  private initFieldsMap(fields) {
    this.fieldsMap = {};
    fields.forEach((field: IField) => {
      this.fieldsMap[field._id] = field;
    });
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
            this.fields.unshift(field);
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
    let index = this.fields.findIndex(field => field._id == updatedField._id);
    this.fields[index] = updatedField;
    this.fieldsList.updateField(updatedField);
  }

  ngOnDestroy() {
    if (this.createdFielsSubscription) {
      this.createdFielsSubscription.unsubscribe();
    }
  }
}
