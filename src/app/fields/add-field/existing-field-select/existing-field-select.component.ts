import { Component, OnInit, EventEmitter, Output, OnDestroy, ViewChild, Input } from '@angular/core';
import { FieldService } from '../../field.service';
import { Subscription } from 'rxjs';
import { FieldsListComponent } from '../../fields-list/fields-list.component';
import { IField } from '../../../../models/IField';

@Component({
  selector: 'app-existing-field-select',
  templateUrl: './existing-field-select.component.html',
  styleUrls: ['./existing-field-select.component.scss']
})
export class ExistingFieldSelectComponent implements OnInit, OnDestroy {

  constructor(private fieldService: FieldService) { }
  
  public fields: IField[];
  public filterQuery: string;
  private subscription: Subscription;

  @Output() 
  public selectedFieldsOutput = new EventEmitter<IField[]>();
  @Input()
  public projectTypeFields: IField[];

  @ViewChild("fieldsList", {static: false})
  public fieldsList: FieldsListComponent;
  

  ngOnInit() {
    this.subscription = this.fieldService.getFields().subscribe((fields: IField[]) => {
      const projectTypeFieldsIds = this.projectTypeFields.map((field) => field._id);
      this.fields = fields.filter((field) => { return projectTypeFieldsIds.indexOf(field._id) === -1 })
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addFields() {
    this.selectedFieldsOutput.emit(this.fieldsList.getSelected());
  }
}
