import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ShowHideCheckboxComponent } from '../show-hide-checkbox/show-hide-checkbox.component';
import { GridEventsComponent } from '../grid-events/grid-events.component';
import { ItemsService } from "../items-list/items.service";
import { FieldService } from "../../fields/field.service";
import { EventEmitterService } from '../../event-emitter.service';
import { FilterInputComponent } from '../filter-input/filter-input.component';
import { DateEditorComponent } from '../date-editor/date-editor.component';
import { RowColumnDragComponent } from '../row-column-drag/row-column-drag.component';
import { CellEditComponent } from '../cell-edit/cell-edit.component';
@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.scss']
})
export class AgGridComponent implements OnInit {
  @ViewChild('showHideCheckboxComponent', { static: true }) showHideCheckboxComponent: ShowHideCheckboxComponent;
  @ViewChild('gridEventsComponent', { static: true }) gridEventsComponent: GridEventsComponent;
  @ViewChild('FilterInputComponent', { static: true }) FilterInputComponent: FilterInputComponent;
  @ViewChild('RowColumnDragComponent', { static: true }) RowColumnDragComponent: RowColumnDragComponent;
  @ViewChild('cellEditComponent', { static: true }) cellEditComponent: CellEditComponent;
  @Input() pageNo; @Input() oldArrow; @Input() sortOrder; @Input() headerField; @Input() CustomeHeaderField;
  @Input() oldSearchId; @Input() fields; @Input() openedSearchedBoxId; @Input() searchedValue; @Input() agheader;
  @Input() agHeaderCheckbox; @Input() RowIndex; @Input() gridRows; @Input() showAllCheckBox; @Input() selectedRows;
  @Input() notreffress; @Input() SelectedRowData; @Input() TotalItems; @Input() noOfSelectedRows; @Input() itemSelectionView;
  @Input() itemSelectionViewI; columnMoved; @Input() datainarry; @Input() celldbclicked; @Input() itemCulomns;
  @Input() fieldName; @Input() fieldType; @Input() fieldslable; @Input() fieldTypeWithNo; @Input() columnLoaded; @Input() projectId;
  ongridEventData; gridApi; @Input() items
  @Output() getShow: EventEmitter<any> = new EventEmitter();
  dragEnterRowOrder: any;
  private frameworkComponents;
  defaultColDef; rowSelection = "";
  @Output("GetFields") GetFields: EventEmitter<any> = new EventEmitter();
  @Output("getItems") getItems: EventEmitter<any> = new EventEmitter();
  shorted = false;
  constructor(
    private itemsService: ItemsService,
    private fieldService: FieldService,
    private eventEmitterService: EventEmitterService
  ) { this.frameworkComponents = { FilterInputComponent: FilterInputComponent, DateEditorComponent: DateEditorComponent }; }

  ngOnInit() {
    this.defaultColDef = {
      width: 150,
      resizeable: true,
      editable: true,
      sortable: true,
      filter: true,

    };
    this.rowSelection = "multiple";
  }

  onGridReady(event) {
    localStorage.removeItem('gridHeader')
    this.ongridEventData = event
    this.gridApi = event.api;
    this.gridRows = event.api.rowModel.rowsToDisplay;
    this.gridApi.setSuppressClipboardPaste(false);
  }
  setItemColumns(fields) {
    this.fields = fields
    fields.forEach(field => {
      if (!localStorage.getItem('gridHeader')) {
        if (field.type == 3) {
          this.itemCulomns.push({
            headerName: field.label,
            field: field.techName,
            editable: true,
            resizable: true,
            groupId: "date",
            sortingOrder: ['asc', 'desc', null],
            cellEditor: 'DateEditorComponent',
            colId: field.techName,
            filter: 'FilterInputComponent',
            menuTabs: ['filterMenuTab'],
            valueGetter: function (params) {
              if (params.data[field.techName] != undefined) {
                var dateobj = new Date(params.data[field.techName]);
                dateobj.getDate()
                // var date = dateobj.getFullYear()+'-'+dateobj.getMonth()+'-'+ dateobj.getDate();
                dateobj.toString()
                return dateobj;
              }
              return dateobj;
            },

          });
        }
        if (field.type == 5) {
          if (field.optionsForSelect) {
            this.itemCulomns.push({
              headerName: field.label,
              field: field.techName,
              editable: true,
              resizable: true,
              colId: field.techName,
              groupId: "select",
              sortingOrder: ['asc', 'desc', null],
              cellEditor: "agSelectCellEditor",
              filter: 'FilterInputComponent',
              menuTabs: ['filterMenuTab'],
              cellEditorParams: {
                values: field.optionsForSelect
              },
            });
          }
        }
        if (field.type == 1) {
          this.itemCulomns.push({
            headerName: field.label,
            field: field.techName,
            editable: true,
            resizable: true,
            colId: field.techName,
            groupId: "number",
            filter: 'FilterInputComponent',
            menuTabs: ['filterMenuTab'],
            sortingOrder: ['asc', 'desc', null],
            valueGetter: function (params) {
              return params.data[field.techName];
            },
            valueSetter: function (params) {
              if (params.data[field.techName] !== params.newValue) {
                var data = parseInt(params.newValue)
                if (!data) {
                  params.newValue = parseInt(params.oldValue);
                } else {
                  params.data[field.techName] = parseInt(params.newValue);
                  return true;
                }
                return true;
              } else {
                return false;
              }
            }
          });
        }
        if (field.type != 5 && field.type != 3 && field.type != 1) {
          this.itemCulomns.push({
            headerName: field.label,
            field: field.techName,
            editable: true,
            colId: field.techName,
            resizable: true,
            groupId: "text",
            filter: 'FilterInputComponent',
            menuTabs: ['filterMenuTab'],
            sortingOrder: ['asc', 'desc', null],
          });
        }
        this.fieldslable.push(field.label)
        this.fieldName.push(field.techName);
        if (field.type == 0) {
          this.fieldTypeWithNo.push({ type: "text", no: 0 })
          this.fieldType.push("text");
        } else if (field.type == 1) {
          this.fieldTypeWithNo.push({ type: "number", no: 1 })
          this.fieldType.push("number");
        } else if (field.type == 2) {
          this.fieldTypeWithNo.push({ type: "file", no: 2 })
          this.fieldType.push("file");
        } else if (field.type == 3) {
          this.fieldTypeWithNo.push({ type: "date", no: 3 })
          this.fieldType.push("date");
        } else if (field.type == 4) {
          this.fieldType.push("text");
        } else if (field.type == 5) {
          this.fieldTypeWithNo.push({ type: "select", no: 5 })
          this.fieldType.push("select");
        }
        else {
          this.fieldType.push("text");
        }

      }
      if (localStorage.getItem('gridHeader')) {
        this.fieldslable.push(field.label)
        this.fieldName.push(field.techName);
        if (field.type == 0) {
          this.fieldTypeWithNo.push({ type: "text", no: 0 })
          this.fieldType.push("text");
        } else if (field.type == 1) {
          this.fieldTypeWithNo.push({ type: "number", no: 1 })
          this.fieldType.push("number");
        } else if (field.type == 2) {
          this.fieldTypeWithNo.push({ type: "file", no: 2 })
          this.fieldType.push("file");
        } else if (field.type == 3) {
          this.fieldTypeWithNo.push({ type: "date", no: 3 })
          this.fieldType.push("date");
        } else if (field.type == 4) {
          this.fieldType.push("text");
        } else if (field.type == 5) {
          this.fieldTypeWithNo.push({ type: "select", no: 5 })
          this.fieldType.push("select");
        }
        else {
          this.fieldType.push("text");
        }
        this.itemCulomns = []
        this.itemCulomns = JSON.parse(localStorage.getItem('gridHeader'))
      }
    });
    this.columnLoaded = true;
    this.itemCulomns[0]["headerCheckboxSelection"] = true;
    this.itemCulomns[0]["checkboxSelection"] = true;
    this.itemCulomns[0]["rowDrag"] = true;
    for (let j = 1; j < this.itemCulomns.length; j++) {
      this.itemCulomns[j]["headerCheckboxSelection"] = false;
      this.itemCulomns[j]["checkboxSelection"] = false;
      this.itemCulomns[j]["rowDrag"] = false;
    }
  }
  getLatestitem(e) {
    this.getItems.emit();
    this.notreffress = true
    this.SelectedRowData = []
    if (this.notreffress == true) {
      if (e == 'delete' || e == 'duplicate' || e.ok == 1) {
        if (e == 'duplicate') {
          this.notreffress = false;
        }
        var truerows = this.gridRows.findIndex(x => x.selected == true);
        this.gridRows[truerows].selected = false;
        this.RowIndex = [];
      }
      if (this.gridRows.findIndex(x => x.selected == false) > -1) {
        this.showAllCheckBox = false;
        var d = this.gridRows.filter(x => x.selected == false);
        this.selectedRows = d ? d.length : 0;
        this.showHideCheckboxComponent.hideSelectbox(event);
      }
    }
  }

  action(event) {
    if (event == "copy") {
      this.gridApi.copySelectedRowsToClipboard(false);
    }
  }
  oncellMouseOver(event) {
    this.gridEventsComponent.oncellMouseOver(event)
  }
  oncellMouseOut(event) {
    var found = this.SelectedRowData.find(element => element.page == this.pageNo);
    if (!this.showAllCheckBox) {
      if (this.SelectedRowData.length == 0) {
        this.showHideCheckboxComponent.hideSelectbox(event);
      }
    }
    if (!found) {
      this.showHideCheckboxComponent.hideSelectbox(event);

    }
  }
  onrowDragEnter(event) {
    this.dragEnterRowOrder = event.api.rowModel.rowsToDisplay[0].data.order;
  }
  onSelectionChanged(event) {
    this.gridEventsComponent.onSelectionChanged(event);
    this.RowIndex = this.gridEventsComponent.RowIndex
    this.gridRows = this.gridEventsComponent.gridRows
    this.showAllCheckBox = this.gridEventsComponent.showAllCheckBox
    this.selectedRows = this.gridEventsComponent.selectedRows
    this.notreffress = this.gridEventsComponent.notreffress
    this.itemSelectionView = this.gridEventsComponent.itemSelectionView
    this.itemSelectionViewI = this.gridEventsComponent.itemSelectionViewI
    this.SelectedRowData = this.gridEventsComponent.SelectedRowData
    this.noOfSelectedRows = this.gridEventsComponent.noOfSelectedRows
  }
  getfilelds(e) {
    this.GetFields.emit();
    this.defaultColDef = {
      width: 150, sortable: true, filter: true, rowDragManaged: true,
      resizeable: true, editable: true,
    };
    this.rowSelection = "multiple";
    this.ngOnInit()
  }
  oncellDoubleClicked(event) {
    this.celldbclicked = true;
    this.getShow.emit();
    localStorage.setItem('pdata', 'false')
  }
  onrowDragEnd(event) {
    var data;

      if(event.overIndex < event.node.childIndex && event.api.rowModel.rowsToDisplay[event.overIndex -1]){
        data = { itemIds: [event.node.data._id], orderToPlace: event.api.rowModel.rowsToDisplay[event.overIndex -1].data.order }
      }
     if (event.overIndex == 0) {
        data = { itemIds: [event.node.data._id], orderToPlace: this.dragEnterRowOrder - 1 }
      }
       else {    
        data = { itemIds: [event.node.data._id], orderToPlace: event.api.rowModel.rowsToDisplay[event.overIndex].data.order }
      }
    this.itemsService.changeOrder(data).subscribe((result: any) => {
      if (result) {
        this.dragEnterRowOrder = null
        data = {filter: [{ techName: "", value: "" }],sort: { techName:"", direction:"" } }
        this.itemsService.ongetItemsByProjectWithPagination(localStorage.getItem('ProjectId'), data, this.pageNo).subscribe((items: any) => {
          setTimeout(() => {
            this.items = items;
          }, 500);
          this.agHeaderCheckbox = false;
        });
      }
    });
  }

  ondragStopped(event) {
    this.setItemColumns(this.fields)
  }

  oncolumnMoved(event) {
    this.RowColumnDragComponent.columnMove(event);
    this.itemCulomns = this.RowColumnDragComponent.itemCulomns
    this.columnMoved = this.RowColumnDragComponent.columnMoved
  }
  onrowDataChanged(event) {
    this.gridEventsComponent.onrowDataChanged(event);
    this.SelectedRowData = this.gridEventsComponent.SelectedRowData
    this.gridRows = this.gridEventsComponent.gridRows
    this.RowIndex = this.gridEventsComponent.RowIndex
    this.datainarry = this.gridEventsComponent.datainarry
    this.columnMoved = this.gridEventsComponent.columnMoved
    this.TotalItems = this.gridEventsComponent.TotalItems
    this.selectedRows = this.gridEventsComponent.selectedRows
  }
  onsortChanged(e) {
    var data
    var data1 = e.api.sortController.getSortModel()
    if (data1[0]) {
      this.shorted =true
      this.gridApi.setSuppressRowDrag(true);
      data = {
        filter: [{ techName: "", value: "" }],
        sort: { techName: data1[0].colId, direction: data1[0].sort }
      }
      this.itemsService.ongetItemsByProjectWithPagination(localStorage.getItem('ProjectId'), data, this.pageNo).subscribe((items: any) => {
        setTimeout(() => {
          this.items = items;
        }, 500);
        this.agHeaderCheckbox = false;
      });
    } else {
      this.shorted =false;
      this.gridApi.setSuppressRowDrag(false);
      data = { filter: [{ techName: "", value: "" }], sort: { techName: "", direction: "" } }
      this.itemsService.ongetItemsByProjectWithPagination(localStorage.getItem('ProjectId'), data, this.pageNo).subscribe((items: any) => {
        this.items = items
      });
    }
  }
  oncellValueChanged(event) {
    this.cellEditComponent.oncellValueChanged(event)
    this.celldbclicked = this.cellEditComponent.celldbclicked
  }
}