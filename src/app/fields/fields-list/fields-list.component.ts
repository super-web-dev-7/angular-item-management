import { Component, OnInit, Input, OnDestroy, ViewChild, SimpleChanges, OnChanges, AfterViewInit } from '@angular/core';
import { TypeRendererComponent } from './cell-renderer/type-renderer.component';
import { AgGridAngular } from 'ag-grid-angular';
import { IField } from '../../../models/IField';

@Component({
  selector: 'app-fields-list',
  templateUrl: './fields-list.component.html',
  styleUrls: ['./fields-list.component.scss']
})
export class FieldsListComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor() { }

  @Input()
  public fields: IField[];
  @Input()
  public filter = '';
  @Input()
  public onSelectField: Function;
  @Input()
  public rowsPerPage = 50;
  @Input()
  public multiSelect = false;
  @ViewChild('fieldsGrid', { static: false }) fieldsGrid: AgGridAngular;

  otherFields;

  public selectedField: IField;
  columnDefs = [];

  ngOnInit() {
    this.otherFields = [
      {type: 1, label: "Hi"},
      {type: 1, label: "Hi"},
      {type: 1, label: "Hi"},
      {type: 1, label: "Hi"},
      {type: 1, label: "Hi"},
      {type: 1, label: "Hi"}
    ];
    this.columnDefs = [
      {
        headerName: "",
        cellRendererFramework: TypeRendererComponent,
        field: "type",
        width: this.multiSelect ? 150 : 100,
        resizable: false,
        suppressSizeToFit: true,
        checkboxSelection: this.multiSelect,
        cellClass: "no-border"

      },
      {
        headerName: "Name",
        field: "label",
        cellClass: "no-border"
      }
    ]
  }

  ngAfterViewInit() {
    this.fieldsGrid.rowClicked.subscribe((row) => {
      this.selectField(row.data);
    });
    this.fieldsGrid.getRowNodeId = (data) => {
      return data._id;
    }
    this.fieldsGrid.rowSelection = this.multiSelect ? "multiple" : "single";

    this.fieldsGrid.gridReady.subscribe(() => {
      this.onGridReady();
    });
    this.fieldsGrid.getRowHeight = () => {
      return 55;
    };
  }

  onGridReady() {
   // this.fieldsGrid.api.sizeColumnsToFit();
  }

  selectField(field: IField) {
    this.selectedField = field;
    if (this.onSelectField) {
      this.onSelectField(field);
    }
  }

  addFieldAndSelect(field: IField) {
    this.fieldsGrid.api.deselectAll();
    this.fieldsGrid.api.insertItemsAtIndex(0, [field]);
    this.fieldsGrid.api.selectNode(this.fieldsGrid.api.getRowNode(field._id));
  }

  getSelected(): IField[] {
    return this.fieldsGrid.api.getSelectedRows();
  }

  ngOnDestroy() {
    // this.fieldsGrid.rowClicked.unsubscribe();
  }
}
