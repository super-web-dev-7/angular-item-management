import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';

import { FieldsListComponent } from './fields-list/fields-list.component';
import { IField } from '../../models/IField';
import { ProjectTypeService } from '../project-types/project-type.service';

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

  public selectedField: IField;
  private createdFielsSubscription;
  private fields: IField[];
  public filterQuery = '';

  constructor(
    private projectTypesService: ProjectTypeService) { }

  ngOnInit() {
    // this.onSelectField.bind(this);
    this.projectTypesService.getFieldsByProjectType(this.projectTypeId).subscribe((
      (fields: IField[]) => {
        this.fields = fields;
      })
    );
  }

  ngOnDestroy() {
    if (this.createdFielsSubscription) {
      this.createdFielsSubscription.unsubscribe();
    }
  }

  // openForm() {
  //   this.fieldForm.open();
  // }

  // createField() {
  //   this.createdFielsSubscription = this.addFieldModal.openAndWaitForFinish().subscribe((createdFields: IField[]) => {
  //     if (createdFields) {
  //       const fieldIds = createdFields.map((field) => field._id);
  //       this.projectTypesService.addFieldToProjectType(this.projectTypeId, fieldIds).subscribe((result) => {
  //         createdFields.forEach((field) => {
  //           this.fields.unshift(field);
  //           this.onSelectField(field);
  //           this.fieldsList.addFieldAndSelect(field);
  //         });
  //       });
  //     }
  //     this.createdFielsSubscription.unsubscribe();
  //   });
  // }

  // onSelectField = (field: IField) => {
  //   this.selectedField = field;
  //   this.openForm();
  // }
}
