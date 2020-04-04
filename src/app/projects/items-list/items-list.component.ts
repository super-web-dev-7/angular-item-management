import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from "@angular/core";
import { ItemsService } from "./items.service";
import { FieldService } from "../../fields/field.service";
import { HttpClient } from "@angular/common/http";
import { ModalDirective } from 'ngx-bootstrap';
import { _ } from "ag-grid-community";
import { json } from "d3";
import { JsonPipe } from "@angular/common";

@Component({
  selector: "app-items-list",
  templateUrl: "./items-list.component.html",
  styleUrls: ["./items-list.component.scss"]
})
export class ItemsListComponent implements OnInit {
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
    this.onLoadCustonHtml();
  }
  onLoadCustonHtml(){
    document.querySelectorAll(".ag-selection-checkbox").forEach((element) => {
      var x = Math.floor((Math.random() * 99999) + 1);
      if(element){
        element.setAttribute("style", "display: none");
        element.setAttribute("id", 'row' + this.pageNo + x);
      }

    })
    var ele = document.getElementsByClassName("ag-header-viewport")[0]
    ele.addEventListener("click", event => {
      var iconClass = event['toElement'].getAttribute('class')
      var eventgrid = event['__agGridEventPath']
      event['path'].forEach(e => {
        if (e && e.getAttribute && e.getAttribute("col-id")) {
          if (this.oldArrow) {
            this.oldArrow.setAttribute("style", "display: none");
          }
          if (this.clickOnHeader == 0) {
            var errow_up = document.createElement("SPAN")
            if(errow_up){
              errow_up.setAttribute("id", e.getAttribute("col-id"));
              errow_up.setAttribute("style", "display: block");
            }
            var errow_up_icon = document.createElement("I")
            if(errow_up_icon){
              errow_up_icon.setAttribute("class", "fa fa-long-arrow-up");
            }
            var aa = e.appendChild(errow_up);
            aa.appendChild(errow_up_icon);
            this.oldArrow = errow_up
            this.sortOrder = 'ASC';
            this.headerField = e.getAttribute("col-id");
            if (iconClass != 'fa fa-bars' && iconClass != 'filterinput') {
              this.sortGridbyApi(this.sortOrder, this.headerField, event['__agGridEventPath'])
            }
          }
          if (this.clickOnHeader == 1) {
            var errow_up = document.createElement("SPAN")
            errow_up.setAttribute("id", e.getAttribute("col-id"));
            errow_up.setAttribute("style", "display: block");
            var errow_up_icon = document.createElement("I")
            errow_up_icon.setAttribute("class", "fa fa-long-arrow-down");
            var aa = e.appendChild(errow_up);
            aa.appendChild(errow_up_icon);
            this.oldArrow = errow_up
            this.sortOrder = 'DESC'
            this.headerField = e.getAttribute("col-id");
            if (iconClass != 'fa fa-bars' && iconClass != 'filterinput') {
              this.sortGridbyApi(this.sortOrder, this.headerField, event['__agGridEventPath'])
            }
          }
          if (this.clickOnHeader == 2) {
            this.sortOrder = 'null';
            this.headerField ='null';
            this.CustomeHeaderField = e.getAttribute("col-id");
            if (iconClass != 'fa fa-bars' && iconClass != 'filterinput') {
              this.sortGridbyApi(this.sortOrder, this.headerField, event['__agGridEventPath'])
            }
          }
        }
        this.clickOnHeader = this.clickOnHeader + 1;
        if (this.clickOnHeader == 3) {
          this.clickOnHeader = 0;
          
        }
      })
    });

    ele.addEventListener("mouseover", event => {

    document.querySelectorAll(".ag-header-cell").forEach((element) => {
      var id = element.getAttribute("col-id")
      var filterIcon = document.createElement("SPAN")
      var filteredIcon = document.createElement("SPAN")
      filterIcon.setAttribute("style", "display: none");
      filterIcon.setAttribute("id", 'serico' + element.getAttribute("col-id"));
      filteredIcon.setAttribute("style", "display: none");
      filteredIcon.setAttribute("id", 'filterd' + element.getAttribute("col-id"));
      var filterIcon_icon = document.createElement("I")
      var filteredIcon_icon = document.createElement("I")
      if(filterIcon_icon){
        filterIcon_icon.setAttribute("class", "fa fa-bars");
      }
      if(filteredIcon_icon){
        filteredIcon_icon.setAttribute("class", "fa fa-filter");

      }

      var aa = element.appendChild(filterIcon);
      var bb = element.appendChild(filteredIcon);
      aa.appendChild(filterIcon_icon);
      bb.appendChild(filteredIcon_icon);

      var filterDiv = document.createElement("DIV")
      filterDiv.setAttribute("class", "search_text_default");
      filterDiv.setAttribute("id", 'serinp' + element.getAttribute("col-id"));
      filterDiv.setAttribute("style", "display: none");
      this.oldSearchId = 'serinp' + element.getAttribute("col-id");
      var filterInputBox = document.createElement("INPUT");
    
      filterInputBox.setAttribute("placeholder", 'search text....')
      filterInputBox.setAttribute("class", "filterinput")
      this.fields.forEach(row => {
        if (row.techName == id) {
          if (row.type == 1) {
            filterInputBox.setAttribute("type", "number")
          }
        }
      }); var filteredIcon_hr = document.createElement("HR")
      var dd = element.appendChild(filterDiv);

      dd.appendChild(filterInputBox);
      dd.appendChild(filteredIcon_hr);
    });
      event['path'].forEach(e => {
        if (e && e.getAttribute && e.getAttribute("col-id")) {
          document.querySelectorAll(".ag-header-cell").forEach((element) => {
            var data = document.getElementById('serico' + element.getAttribute("col-id"));
            if(data){
             data.setAttribute("style", "display: none")
            }
          });
          var filterIcon_icon = document.getElementById('serico' + e.getAttribute("col-id"));
          if(filterIcon_icon){
            filterIcon_icon.setAttribute("style", "display: block");

          }
          if(filterIcon_icon){
          filterIcon_icon.addEventListener("click", event => {
            event['path'].forEach(e => {
              if (e && e.getAttribute && e.getAttribute("col-id")) {
                document.querySelectorAll(".ag-header-cell").forEach((element) => {
                  var data = document.getElementById('serinp' + element.getAttribute("col-id"));
                  if(data){
                    data.setAttribute("style", "display: none")
                  }
                });
                var singleInput = document.getElementById('serinp' + e.getAttribute("col-id"))
                this.openedSearchedBoxId = 'serinp' + e.getAttribute("col-id");
                if(singleInput){
                  singleInput.setAttribute("style", "display: block")

                }
                singleInput.addEventListener("keyup", event => {
                  var filrtedtext = document.getElementById('filterd' + e.getAttribute("col-id"))
                  filrtedtext.setAttribute("style", "display: block")
                  var techename = e.getAttribute("col-id");
                  this.searchedValue = event.target['value']
                  this.filterGridbyApi(techename);
                })
              }
            })
          })
        }

        }
      })
    });

    var elim = document.getElementsByClassName("ag-row")[0]
    elim.addEventListener("click", event => {
      document.querySelectorAll(".ag-header-cell").forEach((element) => {
        var data = document.getElementById('serinp' + element.getAttribute("col-id"));
        data.setAttribute("style", "display: none")
      });
    })
    var agHeader = document.getElementsByClassName("ag-header-select-all")[0]
    agHeader.addEventListener("click", event => {
      this.agheader = true;
      this.agHeaderCheckbox = true;
    })
  }
  
  ngOnInit() {
    this.ongetItemsByProjectWithPagination(this.pageNo);
    this.countItemsByProject();
    
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
              cellEditor: "datePicker",
              colId:field.techName
            });
            this.components = { datePicker: this.getDatePicker() };

          }
          if (field.type == 5) {
            if(field.optionsForSelect){
              this.itemCulomns.push({
                headerName: field.label,
                field: field.techName,
                editable: true,
                resizable: true,
                colId:field.techName,
                cellEditor: "agSelectCellEditor",
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
              type: 'number',
              editable: true,
              resizable: true,
              colId:field.techName,
              valueGetter: function (params) {
                return params.data[field.techName];
              },
              valueSetter: function (params) {
                if (params.data[field.techName] !== params.newValue) {
                  params.data[field.techName] = parseInt(params.newValue);
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
              colId:field.techName,
              resizable: true,
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
        } else {
          this.itemCulomns = JSON.parse(localStorage.getItem('gridHeader'))
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
      resizeable: true,
      editable: true,
    };
    this.rowSelection = "multiple";
    this.autoGroupColumnDef = {

    };
    
    localStorage.setItem('pdata', 'true')
    
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

  countItemsByProject() {
    this.itemsService
      .countItemsByProject(this.projectId)
      .subscribe((count: any) => {
        this.TotalItems = count;
        this.totalPage = Math.ceil(this.TotalItems / 100);
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
    document.getElementById('popupid').hidden = false

    var idx = this.RowIndex.findIndex(x => x.page == this.pageNo);
    if (idx > -1) {
      if (this.RowIndex[idx].rowIndex.includes(event.rowIndex)) {
        if (event.node.selected == false) {
          this.RowIndex[idx].rowIndex.splice(this.RowIndex[idx].rowIndex.indexOf(event.rowIndex), 1);
        }
      } else {
        this.RowIndex[idx].rowIndex.push(event.rowIndex);
      }

    } else {
      this.RowIndex.push({ 'page': this.pageNo, 'rowIndex': [event.rowIndex], 'rowID': event.data._id })
    }
    
    this.gridRows = '';
    this.gridRows = event.api.rowModel.rowsToDisplay;

    if (this.pageNo == 1) {
      localStorage.setItem('gridRows', this.gridRows);
    }

    if (this.gridRows.findIndex(x => x.selected == true) > -1) {
      this.showAllCheckBox = true;
      var d = this.gridRows.filter(x => x.selected == true);
      this.selectedRows = d ? d.length : 0;
      document.querySelectorAll(".ag-selection-checkbox").forEach((element) => {
        element.setAttribute("style", "display: block");
      })
    } else {
      if (this.notreffress == true) {
        if (this.gridRows.findIndex(x => x.selected == false) > -1) {
          this.showAllCheckBox = true;
          var d = this.gridRows.filter(x => x.selected == false);
          this.selectedRows = d ? d.length : 0;
          document.querySelectorAll(".ag-selection-checkbox").forEach((element) => {
            element.setAttribute("style", "display: block");
          })
        }
      } else {
        this.selectedRows = 0;
        this.showAllCheckBox = false;
        //if (this.SelectedRowData.length == 0) {
          document.querySelectorAll(".ag-selection-checkbox").forEach((element) => {
            element.setAttribute("style", "display: none");
          })
        /*} else {
          document.querySelectorAll(".ag-selection-checkbox").forEach((element) => {
            element.setAttribute("style", "display: block");
          })
        }*/
      }
    }

    if (event.node.selected == true) {
      const result = this.SelectedRowData.find(elim => elim._id === event.data._id);
      
      if (result == undefined && result != event.data.order) {
        this.SelectedRowData.push(event.data)
        this.noOfSelectedRows = this.SelectedRowData.length
      }
    }

    if (event.node.selected == false) {
      this.remove_array_element(this.SelectedRowData, event.data)

    }

  }

  oncellMouseOver(event) {
    if (!this.showAllCheckBox) {
      if (this.SelectedRowData.length == 0) {
        document.querySelectorAll(".ag-selection-checkbox").forEach((element) => {
          element.setAttribute("style", "display: none");
        });
      }

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
  }


  remove_array_element(array, n) {
    var index = this.SelectedRowData.indexOf(n);
    if (index > -1) {
      this.SelectedRowData.splice(index, 1);
    } else {
      var indx = this.SelectedRowData.indexOf(n);
      this.SelectedRowData.splice(indx, 1);
    }

    return this.SelectedRowData;
  }

  getLatestitem(e) {
    this.getItems();
    this.notreffress = true
    this.SelectedRowData = []
    if (this.notreffress == true) {
      if( e == 'delete'){
        var truerows = this.gridRows.findIndex(x => x.selected == true);
        //truerows.each(row => {
          this.gridRows[truerows].selected = false;
        //});
        this.RowIndex = [];
      }
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
      orderToPlace: event.api.rowModel.rowsToDisplay[event.overIndex - 1].data.order
    }
    this.itemsService
      .changeOrder(data)
      .subscribe((result: any) => {
        if (result) {
          this.itemsService
          .getItemsByProject(this.projectId)
          .subscribe((items: any) => {
            this.items = items;
          });        }
      });

  }

  oncellValueChanged(event) {
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
    if (event.oldValue != event.newValue ) {
      if(data._id){
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
    }
  }

  oncellDoubleClicked(event) {
    this.dbclicked = true;
    this.getShow.emit();
    localStorage.setItem('pdata', 'false')
  }

  oncolumnMoved(event) {
     const found = this.itemCulomns.find(element => element.headerName == event.column.userProvidedColDef.headerName);
    if(found){
      const index = this.itemCulomns.indexOf(found);
       this.move(this.itemCulomns, index, event.toIndex)
        localStorage.setItem('gridHeader', JSON.stringify(this.itemCulomns))
        // this.itemCulomns = JSON.parse(localStorage.getItem('gridHeader'))
       //  this.ngOnInit()
    }

  }

  ondragStopped(event){
    this.ngOnInit()
    // this.onLoadCustonHtml()
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
       //////////////////  this code is not removable becouse it is refress the grid header please dont remove that./////////////
    this.fieldService.getFields().subscribe((fields: any) => {
      this.fields = fields
      fields.forEach(field => {
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
          if(field.optionsForSelect){
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
      editable: true,


    };
    this.rowSelection = "multiple";

     this.ngOnInit()
  }

  getDatePicker() {
    
    function Datepicker() { }
    Datepicker.prototype.init = function (params) {
      
      this.eInput = document.createElement("input");
      this.eInput.value = params.value;
      this.eInput.setAttribute('type', 'date');
    };
    Datepicker.prototype.getGui = function () {
      return this.eInput;
    };
    Datepicker.prototype.afterGuiAttached = function () {
      this.eInput.focus();
      this.eInput.select();
    };
    Datepicker.prototype.getValue = function () {
      return this.eInput.value;
    };
    Datepicker.prototype.destroy = function () { };
    Datepicker.prototype.isPopup = function () {
      return false;
    };
    return Datepicker;
  }

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

  onrowsAfterSort(event) {
    var data = event.event.api.forEachNodeAfterFilterAndSort();
  }

  sortGridbyApi(sortOrder, headerField, agGridEventPath) {
    headerField = headerField.replace( /_1/g, "" );
    document.querySelectorAll(".ag-header-cell").forEach((element) => {
      var data4 = document.getElementById('serinp' + element.getAttribute("col-id"));
      if(data4){
        data4.setAttribute("style", "display: none")

      }
    });

    var data 
    if(!this.searchedValue){
       data = {
        filter: [
          {
            techName: "",
            value: ""
  
          }
        ],
        sort: {
          techName: headerField,
          direction: sortOrder
        }
      }
    }

    if( this.searchedValue){


      if(sortOrder == 'null' && headerField== 'null'){
        sortOrder ='';
        headerField= this.CustomeHeaderField;
      }
        data = {
          filter: [
            {
              techName:headerField,
              value: this.searchedValue
    
            }
          ],
          sort: {
            techName: headerField,
            direction: sortOrder
          }
        }

    }
    if (!agGridEventPath) {
      this.itemsService
        .ongetItemsByProjectWithPagination(this.projectId, data, this.pageNo)
        .subscribe((items: any) => {
          this.items = items;
          this.agHeaderCheckbox = false;
        });
    }
``
  }

  filterGridbyApi(techname) {

    var data = {
      filter: [
        {
          techName: techname,
          value: this.searchedValue

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
        if(items.length > 0){
          this.items = items;
        } else{
          this.items = [{
            _id:'5e4e36fdd4c40b0cf12378f0',
            DATE0:'No Data Found !!'
          }]
        }

      });
  }

  onrowDataChanged(event) {
    if (this.SelectedRowData.length == 0) {
      document.querySelectorAll(".ag-selection-checkbox").forEach((element, index) => {
        element.setAttribute("style", "display: none");
      })
    } else {
      document.querySelectorAll(".ag-selection-checkbox").forEach((element, index) => {
        element.setAttribute("style", "display: block");
      })
    }

    this.gridRows = event.api.rowModel.rowsToDisplay;
    if (this.RowIndex) {
      this.datainarry = true
      this.RowIndex.forEach((row, i) => {
        if (row.page == this.pageNo) {
          event.api.forEachNode(function (rowNode, index) {
            var idx = index
            for (let a = 0; a < row.rowIndex.length; a++) {
              if (idx == row.rowIndex[a]) {
                rowNode.setSelected(true);
              }
            }
          });
        }
      })
    }
    //  });
  }

  oncellClicked(e) {
    document.querySelectorAll(".ag-header-cell").forEach((element) => {
      var data = document.getElementById('serinp' + element.getAttribute("col-id"));
      if(data){
        data.setAttribute("style", "display: none")

      }
    });
  }

  cleanCheckboxes(e){
      this.gridRows.forEach((row, i) => {
        row.setSelected(false);   
      })
    
  }
}