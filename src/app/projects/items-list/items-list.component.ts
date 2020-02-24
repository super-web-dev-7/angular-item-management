import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from "@angular/core";
import { ItemsService } from "./items.service";
import { FieldService } from "../../fields/field.service";
import { ModalDirective } from 'ngx-bootstrap';
import { json } from "d3";

@Component({
  selector: "app-items-list",
  templateUrl: "./items-list.component.html",
  styleUrls: ["./items-list.component.scss"]
})
export class ItemsListComponent implements OnInit {
  popupVisi
  copyDataLength=[]
  itemCulomns = [];
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
  fieldslable=[]
  SelectedSingleRowData;
  notreffress = false
  ongridEventData;
  @Input() projectId;

  constructor(
    private itemsService: ItemsService,
    private fieldService: FieldService
  ) {

  }
  onGridReady(event) {
    this.ongridEventData = event
    this.gridApi = event.api;
    this.gridRows = event.api.rowModel.rowsToDisplay;
    this.gridApi.setSuppressClipboardPaste(false);
    document.querySelectorAll(".ag-selection-checkbox").forEach((element) => {
      // console.log("=>element", element)
      element.setAttribute("style", "display: none");
      // this.itemCulomns[0]["checkboxSelection"] = true;
    })
    //alert('hello');
    // document.getElementById('popupid').hidden = true
  }

  ngOnInit() {
  //   var aa =[]
  //    aa =   JSON.parse(localStorage.getItem('copydata'))
  // this.copyDataLength = aa

  //     if(aa.length > 0){
  //    var input = document.getElementById("popupid");
  //     if (input) {
  //       console.log('run set')
  //        input.hidden = false;
  //    }

  //   }

    this.getItems();
    this.fieldService.getFields().subscribe((fields: any) => {
      fields.forEach(field => {

        this.itemCulomns.push({
          headerName: field.label,
          field: field.techName,
          editable: true,
          resizable: true
        });
        console.log('this.itemCulomns===++++>', this.itemCulomns)
        this.fieldslable.push(field.label)
        this.fieldName.push(field.techName);
        if (field.type == 0) {
          this.fieldType.push("text");
        } else if (field.type == 1) {
          this.fieldType.push("number");
        } else if (field.type == 2) {
          this.fieldType.push("file");
        } else {
          this.fieldType.push("text");
        }
      });

      this.columnLoaded = true;
      this.itemCulomns[0]["headerCheckboxSelection"] = true;
      // this.itemCulomns[0]["headerCheckboxSelectionFilteredOnly"] = true;
      this.itemCulomns[0]["checkboxSelection"] = true;
      this.itemCulomns[0]["rowDrag"] = true;
    });

    this.defaultColDef = {
      width: 150,
      sortable: true,
      filter: true,
      resizeable: true,
      editable: true
    };
    this.rowSelection = "multiple";

  }

  itemsSelectionshow(){
    var popupVisi1 = document.getElementById('popupid')
    popupVisi1.hidden = false 
    this.popupVisi = popupVisi1.hidden
  }
  getItems(){
    this.itemsService
      .getItemsByProject(this.projectId)
      .subscribe((items: any) => {
        this.items = items;
      });
  }
  onSelectionChanged(event) {
    console.log('event==onSelectionChanged=++++>',event)
    if (this.gridRows.findIndex(x => x.selected == true) > -1) {
      console.log('if=>',this.gridRows)

      this.showAllCheckBox = true;
      var d = this.gridRows.filter(x => x.selected == true);
      this.selectedRows = d ? d.length : 0;
      document.querySelectorAll(".ag-selection-checkbox").forEach((element) => {
        element.setAttribute("style", "display: block");
      })
    } else {
        if(this.notreffress == true){
          if (this.gridRows.findIndex(x => x.selected == false) > -1) {
            console.log('if=>',this.gridRows)
      
            this.showAllCheckBox = true;
            var d = this.gridRows.filter(x => x.selected == false);
            this.selectedRows = d ? d.length : 0;
            document.querySelectorAll(".ag-selection-checkbox").forEach((element) => {
              element.setAttribute("style", "display: block");
            })
          }
        }else{
          console.log('else=>',this.gridRows)
          this.selectedRows = 0;
          this.showAllCheckBox = false;
          document.querySelectorAll(".ag-selection-checkbox").forEach((element) => {
          element.setAttribute("style", "display: none");
        })
        }

    }
  }

  oncellMouseOver(event) {
    if (!this.showAllCheckBox ) {
    // if (!this.showAllCheckBox && event.event.target.firstElementChild && event.event.target.firstElementChild.className == "ag-cell-wrapper") {
      document.querySelectorAll(".ag-selection-checkbox").forEach((element) => {
        element.setAttribute("style", "display: none");
      });
      document.querySelectorAll(".ag-selection-checkbox")[event.node.id]
      var data =  document.querySelectorAll(".ag-selection-checkbox")[event.node.id];
      if(data){
        data.setAttribute("style", "display: block");
      }
    }
  }
  action(event) {
    if (event == "copy") {
      this.gridApi.copySelectedRowsToClipboard(false);
      console.log("action", this.gridApi)
    }
  }

  onrowSelected(event) {
    console.log('event=====+onrowSelected++>', event)
    document.getElementById('popupid').hidden = false

    if (event.node.selected == true) {
        this.SelectedRowData.push(event.data)
        this.noOfSelectedRows = this.SelectedRowData.length
      console.log('this.SelectedRowDat', this.noOfSelectedRows)
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

  getLatestitem(e){
    this.getItems();
    // this.onGridReady(this.ongridEventData) 
    this.notreffress = true
    this.SelectedRowData = []
    if(this.notreffress == true){
      if (this.gridRows.findIndex(x => x.selected == false) > -1) {
        console.log('if=>',this.gridRows)
  
        this.showAllCheckBox = false;
        var d = this.gridRows.filter(x => x.selected == false);
        this.selectedRows = d ? d.length : 0;
        document.querySelectorAll(".ag-selection-checkbox").forEach((element) => {
          element.setAttribute("style", "display: none");
        })
      }
    }  

  }


}