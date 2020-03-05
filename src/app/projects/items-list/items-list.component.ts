import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from "@angular/core";
import { ItemsService } from "./items.service";
import { FieldService } from "../../fields/field.service";
import { HttpClient } from "@angular/common/http";
import { ModalDirective } from 'ngx-bootstrap';
// import { AllModules } from "@ag-grid-enterprise/all-modules";
// import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
// import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";
@Component({
  selector: "app-items-list",
  templateUrl: "./items-list.component.html",
  styleUrls: ["./items-list.component.scss"]
})
export class ItemsListComponent implements OnInit {
  // public modules: any[] = AllModules;
  popupVisi
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
  @Input() projectId;
  @Output() getShow: EventEmitter<any> = new EventEmitter();

  constructor(
    private itemsService: ItemsService,
    private fieldService: FieldService
  ) {

  }
  onGridReady(event) {
    localStorage.removeItem('gridHeader')
    this.ongridEventData = event
    this.gridApi = event.api;
    this.gridRows = event.api.rowModel.rowsToDisplay;
    this.gridApi.setSuppressClipboardPaste(false);
    // document.querySelectorAll(".ag-selection-checkbox").forEach((element) => {
    //   // console.log("=>element", element)
    //   element.setAttribute("style", "display: none");
    //   // this.itemCulomns[0]["checkboxSelection"] = true;
    // })
    //alert('hello');
    // document.getElementById('popupid').hidden = true
  }

  ngOnInit() {
    this.ongetItemsByProjectWithPagination(this.pageNo);
    // this.getItems()
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
              cellEditor: "datePicker"
            });
            this.components = { datePicker: this.getDatePicker() };

          }
          if (field.type == 5) {
            this.itemCulomns.push({
              headerName: field.label,
              field: field.techName,
              editable: true,
              resizable: true,
              cellEditor: "agSelectCellEditor",
              cellEditorParams: {
                values: field.optionsForSelect
              }
            });
          }
          if(field.type!=5 && field.type!=3 ){
            this.itemCulomns.push({
              headerName: field.label,
              field: field.techName,
              editable: true,
              resizable: true
            });
          }
        } else {
          this.itemCulomns = JSON.parse(localStorage.getItem('gridHeader'))
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

      });
      this.columnLoaded = true;
      this.itemCulomns[0]["headerCheckboxSelection"] = true;
      // this.itemCulomns[0]["headerCheckboxSelectionFilteredOnly"] = true;
      this.itemCulomns[0]["checkboxSelection"] = true;
      this.itemCulomns[0]["rowDrag"] = true;
      for (let j = 1; j < this.itemCulomns.length; j++) {
        this.itemCulomns[j]["headerCheckboxSelection"] = false;
        // this.itemCulomns[0]["headerCheckboxSelectionFilteredOnly"] = true;
        this.itemCulomns[j]["checkboxSelection"] = false;
        this.itemCulomns[j]["rowDrag"] = false;
      }

    });
    // console.log('this.itemCulomns=>', this.itemCulomns)
    this.defaultColDef = {
      width: 150,
      sortable: true,
      bSortable: false,
      filter: true,
      resizeable: true,
      editable: true
    };
    this.rowSelection = "multiple";
    // this.autoGroupColumnDef = { width: 150 };
    // this.rowModelType = "serverSide";
    // this.setheaderEliment()
    localStorage.setItem('pdata', 'true')
    // document.getElementById('popupid').hidden = true

  }
  itemsSelectionshow() {
    var popupVisi1 = document.getElementById('popupid')
    popupVisi1.hidden = false
    this.popupVisi = popupVisi1.hidden
  }
  getItems() {
    this.itemsService
      .getItemsByProject(this.projectId)
      .subscribe((items: any) => {
        this.items = items;
      });
    this.ongetItemsByProjectWithPagination(this.pageNo);
  }

  ongetItemsByProjectWithPagination(pageNo) {
    var data = {
      filter: [
        {
          techName: "TEXT1",
          value: "puneet"
        }
      ],
      sort: {
        techName: "TEXT1",
        direction: "desc"
      }
    }
    this.itemsService
      .ongetItemsByProjectWithPagination(this.projectId, data, pageNo)
      .subscribe((items: any) => {
        this.items = items;
      });
  }
  onSelectionChanged(event) {
    // console.log("Event==>",event);
    // console.log("GRID==>",this.gridRows);
    this.gridRows = '';
    this.gridRows = event.api.rowModel.rowsToDisplay;
    if (this.gridRows.findIndex(x => x.selected == true) > -1) {
      // console.log('11111');
      this.showAllCheckBox = true;
      // console.log(this.gridRows);
      var d = this.gridRows.filter(x => x.selected == true);
      this.selectedRows = d ? d.length : 0;
      document.querySelectorAll(".ag-selection-checkbox").forEach((element) => {
        element.setAttribute("style", "display: block");
      })
    } else {
      if (this.notreffress == true) {
        // console.log('111121212121');
        if (this.gridRows.findIndex(x => x.selected == false) > -1) {
          // console.log('2222222');
          this.showAllCheckBox = true;
          var d = this.gridRows.filter(x => x.selected == false);
          this.selectedRows = d ? d.length : 0;
          document.querySelectorAll(".ag-selection-checkbox").forEach((element) => {
            element.setAttribute("style", "display: block");
          })
        } else {
          // console.log('333333');
        }
      } else {
        // console.log('4444444');
        this.selectedRows = 0;
        this.showAllCheckBox = false;
        document.querySelectorAll(".ag-selection-checkbox").forEach((element) => {
          element.setAttribute("style", "display: none");
        })
      }

    }
  }

  oncellMouseOver(event) {
    if (!this.showAllCheckBox) {
      // if (!this.showAllCheckBox && event.event.target.firstElementChild && event.event.target.firstElementChild.className == "ag-cell-wrapper") {
      document.querySelectorAll(".ag-selection-checkbox").forEach((element) => {
        element.setAttribute("style", "display: none");
      });
      document.querySelectorAll(".ag-selection-checkbox")[event.node.id]
      var data = document.querySelectorAll(".ag-selection-checkbox")[event.node.id];
      if (data) {
        data.setAttribute("style", "display: block");
      }
    }
  }
  action(event) {
    if (event == "copy") {
      this.gridApi.copySelectedRowsToClipboard(false);
    }
  }

  onrowSelected(event) {
    document.getElementById('popupid').hidden = false
    if (event.node.selected == true) {
      this.SelectedRowData.push(event.data)
      this.noOfSelectedRows = this.SelectedRowData.length
    }
    if (event.node.selected == false) {
      this.remove_array_element(this.SelectedRowData, event.data)
    }
  }


  remove_array_element(array, n) {
    var index = array.indexOf(n);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  }

  getLatestitem(e) {
    this.getItems();
    // this.onGridReady(this.ongridEventData) 
    this.notreffress = true
    this.SelectedRowData = []
    if (this.notreffress == true) {
      if (this.gridRows.findIndex(x => x.selected == false) > -1) {

        this.showAllCheckBox = false;
        var d = this.gridRows.filter(x => x.selected == false);
        this.selectedRows = d ? d.length : 0;
        document.querySelectorAll(".ag-selection-checkbox").forEach((element) => {
          element.setAttribute("style", "display: none");
        })
      }
    }

  }

  onSingleItemSelect(event) {
    this.SelectedSingleRowData = event.data;
  }

  onrowDragEnd(event) {
    var data = {
      itemIds: [event.node.data._id],
      orderToPlace: event.overIndex
    }
    this.itemsService
      .changeOrder(data)
      .subscribe((result: any) => {
        if (result) {
          this.getItems();
        }
      });

  }

  oncellValueChanged(event) {
    this.dbclicked = false;
    localStorage.setItem('pdata', 'true')
    var data
    Object.keys(event.data).forEach((key, index) => {
      if (event.data[key] == event.newValue) {
        data = {
          _id: event.data._id,
          projectId: event.data.projectId,
        }
        data[key] = event.newValue;
      }
      if (event.oldValue != event.newValue) {
        this.itemsService
          .editItemByProject(data)
          .subscribe(result => {
            if (result) {
              this.dbclicked = false;
              localStorage.setItem('pdata', 'true')
              // this.getItems();
            }
          });
      }
    })
  }

  oncellDoubleClicked(event) {
    this.dbclicked = true;
    this.getShow.emit();
    localStorage.setItem('pdata', 'false')
  }
  oncolumnMoved(event) {
    const found = this.itemCulomns.find(element => element.headerName == event.column.userProvidedColDef.headerName);
    const index = this.itemCulomns.indexOf(found);
    this.move(this.itemCulomns, index, event.toIndex)
    localStorage.setItem('gridHeader', JSON.stringify(this.itemCulomns))
    this.ngOnInit()
    // this.setheaderEliment()
  }
  // setheaderEliment(){
  //   for(let i=0;this.itemCulomns.length;i++){
  //     if(i == 0){
  //       this.columnLoaded = true;
  //       this.itemCulomns[i]["headerCheckboxSelection"] = true;
  //       // this.itemCulomns[0]["headerCheckboxSelectionFilteredOnly"] = true;
  //       this.itemCulomns[i]["checkboxSelection"] = true;
  //       this.itemCulomns[i]["rowDrag"] = true;
  //     }else{
  //       this.columnLoaded = true;
  //       this.itemCulomns[i]["headerCheckboxSelection"] = false;
  //       // this.itemCulomns[0]["headerCheckboxSelectionFilteredOnly"] = true;
  //       this.itemCulomns[i]["checkboxSelection"] = false;
  //       this.itemCulomns[i]["rowDrag"] = false
  //     }
  //   }
  // }
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
  oncolumnValueChanged(event) {
  }
  calloninit(e) {
    this.fieldService.getFields().subscribe((fields: any) => {
      this.fields = fields
      fields.forEach(field => {
        // this.itemCulomns1.push({
        //   headerName: field.label,
        //   field: field.techName,
        //   editable: true,
        //   resizable: true,
        // });
        if (field.type == 3) {
          this.itemCulomns1.push({
            headerName: field.label,
            field: field.techName,
            editable: true,
            resizable: true,
            cellEditor: "datePicker"
          });
          this.components = { datePicker: this.getDatePicker() };

        }
        if (field.type == 5) {
          this.itemCulomns1.push({
            headerName: field.label,
            field: field.techName,
            editable: true,
            resizable: true,
            cellEditor: "agSelectCellEditor",
            cellEditorParams: {
              values: field.optionsForSelect
            }
          });
        }
        else {
          this.itemCulomns1.push({
            headerName: field.label,
            field: field.techName,
            editable: true,
            resizable: true
          });
        }
        this.itemCulomns = this.itemCulomns1;
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

      });

      this.columnLoaded = true;
      this.itemCulomns[0]["headerCheckboxSelection"] = true;
      // this.itemCulomns[0]["headerCheckboxSelectionFilteredOnly"] = true;
      this.itemCulomns[0]["checkboxSelection"] = true;
      this.itemCulomns[0]["rowDrag"] = true;
      for (let j = 1; j < this.itemCulomns.length; j++) {
        this.itemCulomns[j]["headerCheckboxSelection"] = false;
        // this.itemCulomns[0]["headerCheckboxSelectionFilteredOnly"] = true;
        this.itemCulomns[j]["checkboxSelection"] = false;
        this.itemCulomns[j]["rowDrag"] = false;
      }
    });

    this.defaultColDef = {
      width: 150,
      sortable: true,
      filter: true,
      resizeable: true,
      editable: true
    };
    this.rowSelection = "multiple";
    this.ngOnInit()
  }
  getDatePicker() {
    // console.log('i am here')
    function Datepicker() { }
    Datepicker.prototype.init = function (params) {
      // console.log('Inside 1');
      this.eInput = document.createElement("input");
      this.eInput.value = params.value;
      // console.log("getDatePicker--->>", this.eInput);
      this.eInput.setAttribute('type', 'date');
      //$(this.eInput).datepicker({ dateFormat: "dd/mm/yy" });
    };
    Datepicker.prototype.getGui = function () {
      // console.log('Inside 2');
      return this.eInput;
    };
    Datepicker.prototype.afterGuiAttached = function () {
      // console.log('Inside 3');
      this.eInput.focus();
      this.eInput.select();
    };
    Datepicker.prototype.getValue = function () {
      // console.log('Inside 4');
      return this.eInput.value;
    };
    Datepicker.prototype.destroy = function () { };
    Datepicker.prototype.isPopup = function () {
      return false;
    };
    return Datepicker;
  }

  onsortChanged(event) {
    console.log('event of short change----------__>', event)
  }
  getSort(event) {

  }

  moveToNext() {
    this.pageNo = this.pageNo + 1;
    this.ongetItemsByProjectWithPagination(this.pageNo)
  }
  moveToPrivious() {
    this.pageNo = this.pageNo - 1;
    this.ongetItemsByProjectWithPagination(this.pageNo)
  }
  moveToPageNo(pageNo) {
    this.pageNo = parseInt(pageNo);
    this.ongetItemsByProjectWithPagination(this.pageNo)
  }
}