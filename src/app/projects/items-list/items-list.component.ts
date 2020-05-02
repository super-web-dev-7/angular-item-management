import { Component, OnInit, Input, Output, Directive, ViewChild, EventEmitter, AfterViewInit } from "@angular/core";
import { ItemsService } from "./items.service";
import { FieldService } from "../../fields/field.service";
import { HttpClient } from "@angular/common/http";
import { ModalDirective, idLocale } from 'ngx-bootstrap';
import { _ } from "ag-grid-community";
import { AgGridComponent } from '../ag-grid/ag-grid.component';
// @Directive({selector: 'child-directive'})
import { AllCommunityModules, Module } from '@ag-grid-community/all-modules';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';
import { FilterInputComponent } from '../filter-input/filter-input.component';
import { DateEditorComponent } from '../date-editor/date-editor.component';
import { EventEmitterService } from '../../event-emitter.service';
import { text } from "d3";

@Component({
  selector: "app-items-list",
  templateUrl: "./items-list.component.html",
  styleUrls: ["./items-list.component.scss"]
})

export class ItemsListComponent implements OnInit {
  @ViewChild('agGridComponent', { static: true }) agGridComponent: AgGridComponent;
  // @ViewChild('agGridComponent', { static: true } ) agGridComponent: AgGridComponent ; 

  @ViewChild('FilterInputComponent', { static: true }) FilterInputComponent: FilterInputComponent;

  public modules: Module[] = AllCommunityModules;
  private rowData;
  private frameworkComponents;
  // public modules: any[] = AllModules;
  popupVisi
  index = []
  copyDataLength = []
  itemCulomns = [];
  itemCulomns1 = []
  itemFields;
  items;
  defaultColDef;
  test = 0;
  columnLoaded = false;
  fieldName = [];
  fieldType = [];
  rowSelection = "";
  showAllCheckBox = false;
  selectedRows = 0;
  gridRows;
  gridApi;
  SelectedRowData = [];
  noOfSelectedRows = 0;
  Updateditems;
  pastType = '';
  fieldslable = []
  SelectedSingleRowData;
  notreffress = false
  ongridEventData;
  dbclicked
  data = {}
  fields;
  fieldTypeWithNo = []
  components;
  components1
  autoGroupColumnDef
  rowModelType
  sortingOrder
  pageNo = 1;
  TotalItems;
  clickOnHeader = 0;
  oldArrow;
  sortOrder;
  headerField;
  totalPage;
  @Input() projectId;
  @Output() getShow: EventEmitter<any> = new EventEmitter();
  itemFrom = 0
  ItemTO = 0
  filterIcon;
  searchedText
  searchedValue: any;
  oldSearchId: string;
  gridRowManage: any;
  querySelecterData: NodeListOf<Element>;
  RowIndex = []
  agHeaderCheckbox = false;
  agheader: boolean;
  openedSearchedBoxId: any;
  conditiononselect = false;
  datainarry = false;
  public detector: any;
  CustomeHeaderField: any;
  columnMoved: boolean;
  countCallingOfKeypress: number;
  dragEnterRowOrder: any;
  parms;
  @Input() itemSelectionView;
  itemSelectionViewI;
  constructor(
    private itemsService: ItemsService,
    private fieldService: FieldService,
    private eventEmitterService: EventEmitterService

  ) {
    this.frameworkComponents = { FilterInputComponent: FilterInputComponent, DateEditorComponent: DateEditorComponent };
  }


  onGridReady(event) {
    localStorage.removeItem('gridHeader')
    this.ongridEventData = event
    this.gridApi = event.api;
    this.gridRows = event.api.rowModel.rowsToDisplay;
    this.gridApi.setSuppressClipboardPaste(false);
    // this.onLoadCustonHtml();
  }
  onLoadCustonHtml() {
    this.agGridComponent.onCustomHtmlLoad();
  }

  ngOnInit() {
    if (this.eventEmitterService.subsVar==undefined) {    
      this.eventEmitterService.subsVar = this.eventEmitterService.    
      invokeItemListComponentFunction.subscribe((data:any) => {         
        //  this.searchedText = data.searchText 
         this.filterGridbyApi(data);
      });    
    }
    this.ongetItemsByProjectWithPagination(this.pageNo);
    this.countItemsByProject();
    this.GetFields();
    this.defaultColDef = {
      width: 150,
      resizeable: true,
      editable: true,
      sortable: true,
      filter: true,
      unSortIcon: true,
    };
    this.rowSelection = "multiple";
    this.autoGroupColumnDef = {
    };
    localStorage.setItem('pdata', 'true')
  }
  GetFields(){
    this.fields =[]
    this.itemCulomns=[]
    this.fieldName=[]
    this.fieldType=[]

    this.fieldService.getFields().subscribe((fields: any) => {
      this.fields = fields
      fields.forEach(field => {
        if (!localStorage.getItem('gridHeader')) {
          if (field.type == 3) {
            this.itemCulomns.push({
              headerName: field.label,
              field: field.techName,
              editable: true,
              resizable: true,
              type:'date',
              cellEditor: 'DateEditorComponent',
              colId: field.techName,
              filter: 'FilterInputComponent',
              menuTabs: ['filterMenuTab'],
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
                type:'select',
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
              type:'number',
              filter: 'FilterInputComponent',
              menuTabs: ['filterMenuTab'],
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
              type:'text',
              filter: 'FilterInputComponent',
              menuTabs: ['filterMenuTab'],
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

    });
  }
  getItems() {
    this.itemsService
      .countItemsByProject(this.projectId)
      .subscribe((count: any) => {
        this.TotalItems = count;
        this.totalPage = Math.ceil(this.TotalItems / 100);
        if (this.totalPage == 1) {
          this.pageNo = 1;
        }
        this.ongetItemsByProjectWithPagination(this.pageNo);
      });

  }

  countItemsByProject() {
    this.itemsService
      .countItemsByProject(this.projectId)
      .subscribe((count: any) => {
        this.TotalItems = count;
        this.totalPage = Math.ceil(this.TotalItems / 100);
        if (this.totalPage == 1) {
          this.pageNo = 1;
        }
      });
  }

  ongetItemsByProjectWithPagination(pageNo) {
    var data = {
      filter: [
        {
          techName: "",
          value: ""

        }
      ],
      sort: {
        techName: "",
        direction: ""
      }
    }
    this.itemsService
      .ongetItemsByProjectWithPagination(this.projectId, data, pageNo)
      .subscribe((items: any) => {
        this.items = items;
        this.countPaginetionValues();

      });

  }

  onSelectionChanged(event) {
    this.agGridComponent.SelectionChange(event);
    if (event.node.selected == true) {
      this.agGridComponent.add_array_element(event)
    }
    if (event.node.selected == false) {
      this.agGridComponent.remove_array_element(this.SelectedRowData, event.data)
    }
    if (this.SelectedRowData.length > 0) {
      this.itemSelectionView = true;
      this.itemSelectionViewI = true;
    }
    if (this.SelectedRowData.length == 0) {
      this.itemSelectionView = false;
      this.itemSelectionViewI = false;
    }
  }
  oncellMouseOver(event) {
    if (!this.showAllCheckBox && this.noOfSelectedRows == 0) {
      if (this.SelectedRowData.length == 0) {
        this.agGridComponent.hideSelectbox(event);
      }
      this.agGridComponent.showSelectbox(event);
    } else {
      if (this.SelectedRowData.length < this.TotalItems) {
        if (this.RowIndex.length) {
          if (this.RowIndex.filter(value => (value.page == this.pageNo && value.rowIndex.length > 0)).length > 0) {
          } else {
            this.agGridComponent.hideSelectbox(event);
          }
        }
        this.agGridComponent.showSelectbox(event);
      }
    }
  }
  oncellMouseOut(event) {
    if (!this.showAllCheckBox) {
      if (this.SelectedRowData.length == 0) {
        this.agGridComponent.hideSelectbox(event);
      }
    }
  }
  action(event) {
    if (event == "copy") {
      this.gridApi.copySelectedRowsToClipboard(false);
    }
  }
  getLatestitem(e) {
    this.getItems();
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
        this.agGridComponent.hideSelectbox(event);
      }
    }

  }

  onSingleItemSelect(event) {
    this.SelectedSingleRowData = event.data;
  }

  onrowDragEnter(event) {
    this.dragEnterRowOrder = event.api.rowModel.rowsToDisplay[0].data.order;
  }
  onrowDragEnd(event) {
    var data;
    if (event.overIndex == 0) {
      data = {
        itemIds: [event.node.data._id],
        orderToPlace: this.dragEnterRowOrder - 1
      }
    } else {
      data = {
        itemIds: [event.node.data._id],
        orderToPlace: event.api.rowModel.rowsToDisplay[event.overIndex - 1].data.order
      }
    }
    this.itemsService
      .changeOrder(data)
      .subscribe((result: any) => {
        if (result) {
          this.dragEnterRowOrder = null
          this.ongetItemsByProjectWithPagination(this.pageNo);
        }
      });

  }

  oncellValueChanged(event) {
    if (!event.newValue) {

      // this.ongetItemsByProjectWithPagination(this.pageNo); 
    } else {
      this.dbclicked = false;
      localStorage.setItem('pdata', 'true')
      var data
      Object.keys(event.data).forEach((key, index) => {
        if (event.data[key] == event.newValue) {
          if (event.colDef.cellEditor) {
            let date = new Date(event.newValue);
            data = {
              _id: event.data._id,
              projectId: event.data.projectId,
            }
            data[key] = date
          } else {
            data = {
              _id: event.data._id,
              projectId: event.data.projectId,
            }
            data[key] = event.newValue;
          }

        }
      })
      if (event.oldValue != event.newValue) {
        if (data._id) {
          this.itemsService
            .editItemByProject(data)
            .subscribe(result => {
              if (result) {
                //    this.ongetItemsByProjectWithPagination(this.pageNo); 
                this.dbclicked = false;
                localStorage.setItem('pdata', 'true')

              }
            });
        }
      }
    }

  }

  oncellDoubleClicked(event) {
    this.dbclicked = true;
    this.getShow.emit();
    localStorage.setItem('pdata', 'false')
  }

  oncolumnMoved(event) {
    const found = this.itemCulomns.find(element => element.headerName == event.column.userProvidedColDef.headerName);
    if (found) {
      const index = this.itemCulomns.indexOf(found);
      this.move(this.itemCulomns, index, event.toIndex)
      localStorage.setItem('gridHeader', JSON.stringify(this.itemCulomns))
      this.columnMoved = true;

    }

  }

  ondragStopped(event) {
    if (this.columnMoved) {
      this.ngOnInit()
    }
  }
  move(arr, old_index, new_index) {
    while (old_index < 0) {
      old_index += arr.length;
    }
    while (new_index < 0) {
      new_index += arr.length;
    }
    if (new_index >= arr.length) {
      var k = new_index - arr.length;
      while ((k--) + 1) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);

    return arr;
  }

  getfilelds(e) {
    this.GetFields();
    this.defaultColDef = {
      width: 150,
      sortable: true,
      filter: true,
      resizeable: true,
      editable: true,

    };
    this.rowSelection = "multiple";

    this.ngOnInit()
  }

  //  getDatePicker() {
  //
  //    function Datepicker() { }
  //    Datepicker.prototype.init = function (params) {
  //
  //      this.eInput = document.createElement("input");
  //      this.eInput.value = params.value;
  //      this.eInput.setAttribute('type', 'date');
  //    };
  //    Datepicker.prototype.getGui = function () {
  //      return this.eInput;
  //    };
  //    Datepicker.prototype.afterGuiAttached = function () {
  //      this.eInput.focus();
  //      this.eInput.select();
  //    };
  //    Datepicker.prototype.getValue = function () {
  //      return this.eInput.value;
  //    };
  //    Datepicker.prototype.destroy = function () { };
  //    Datepicker.prototype.isPopup = function () {
  //      return false;
  //    };
  //    return Datepicker;
  //  }

  moveToNext() {

    this.datainarry = false;
    if (this.pageNo < this.totalPage) {
      this.pageNo = this.pageNo + 1;
      this.ongetItemsByProjectWithPagination(this.pageNo)
    }
  }

  moveToPrivious() {
    this.datainarry = false;

    if (this.pageNo > 1) {
      this.pageNo = this.pageNo - 1;
      this.ongetItemsByProjectWithPagination(this.pageNo)
    }
  }

  moveToPageNo(pageNo) {
    this.pageNo = parseInt(pageNo);
    this.ongetItemsByProjectWithPagination(this.pageNo)


  }

  countPaginetionValues() {
    this.itemFrom = this.ItemTO + 1;
    this.ItemTO = this.ItemTO + this.items.length
  }

  sortGridbyApi(values) {
    // headerField = headerField.replace(/_1/g, "");
    // this.agGridComponent.hideFilterInput();
    var data
    data = {
      filter: [
        {
          techName: "",
          value: ""

        }
      ],
      sort: {
        techName: values[0].colId,
        direction: values[0].sort
      }
    }

    this.itemsService
      .ongetItemsByProjectWithPagination(this.projectId, data, this.pageNo)
      .subscribe((items: any) => {
        setTimeout(() => {
          this.items = items;
        }, 500);
        this.agHeaderCheckbox = false;
      });
  }

  filterGridbyApi(vales) {
    var data = {
      filter: [
        {
          techName: vales.tachname,
          value: vales.searchText
        }
      ],
      sort: {
        techName: "",
        direction: ""
      }
    }
    this.itemsService
      .ongetItemsByProjectWithPagination(this.projectId, data, this.pageNo)
      .subscribe((items: any) => {
        if (items.length > 0) {
          this.items = items;
        } else {
          this.items = [{
            _id: '5e4e36fdd4c40b0cf12378f0',
            DATE0: 'No Data Found !!'
          }]
        }

      });
  }

  onrowDataChanged(event) {
    this.agGridComponent.RowDataChanges(event)
  }
  cleanCheckboxes(e) {
    this.gridRows.forEach((row, i) => {
      row.setSelected(false);
    })
  }

  onsortChanged(e) {
    console.log(e.api.sortController.getSortModel())
    var data = e.api.sortController.getSortModel()
    this.sortGridbyApi(data)
  }
}