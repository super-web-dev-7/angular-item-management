import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { ItemsService } from "./items.service";
import { FieldService } from "../../fields/field.service";
import { AgGridCheckboxComponent } from '../ag-grid-checkbox/ag-grid-checkbox.component';

@Component({
  selector: "app-items-list",
  templateUrl: "./items-list.component.html",
  styleUrls: ["./items-list.component.scss"]
})
export class ItemsListComponent implements OnInit {
  itemCulomns = [];
  itemFields;
  items;
  defaultColDef;
  columnLoaded = false;
  fieldName = [];
  fieldType = [];
  rowSelection = "";
  showAllCheckBox = false;
  selectedRows = 0;
  gridRows;
  gridApi;

  
  @Input() projectId;
  constructor(
    private itemsService: ItemsService,
    private fieldService: FieldService
  ) {

  }
  onGridReady(event){
    this.gridApi = event.api;
    this.gridRows = event.api.rowModel.rowsToDisplay;
    this.gridApi.setSuppressClipboardPaste(false);
    document.querySelectorAll(".ag-selection-checkbox").forEach((element)=>{
      // console.log("=>element", element)
      element.setAttribute("style", "display: none");
      // this.itemCulomns[0]["checkboxSelection"] = true;
    })
  }

  ngOnInit() {
    this.itemsService
      .getItemsByProject(this.projectId)
      .subscribe((items: any) => {
        this.items = items;
      });
      
    this.fieldService.getFields().subscribe((fields: any) => {
      fields.forEach(field => {
        
        this.itemCulomns.push({
          headerName: field.label,
          field: field.techName,
          editable: true,
          resizable: true
        });
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
      // this.itemCulomns[0]["headerCheckboxSelection"] = true;
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
  onSelectionChanged(event){
    if(this.gridRows.findIndex(x=> x.selected == true) > -1){
      this.showAllCheckBox = true;
      var d = this.gridRows.filter(x=> x.selected == true);
      this.selectedRows = d ? d.length : 0;
      document.querySelectorAll(".ag-selection-checkbox").forEach((element)=>{
        element.setAttribute("style", "display: block");
      })
    }else{
      this.selectedRows = 0;
      this.showAllCheckBox = false;
      document.querySelectorAll(".ag-selection-checkbox").forEach((element)=>{
        element.setAttribute("style", "display: none");
      })
    }
   }

  oncellMouseOver(event){
    if(!this.showAllCheckBox  && event.event.target.firstElementChild && event.event.target.firstElementChild.className == "ag-cell-wrapper"){
      document.querySelectorAll(".ag-selection-checkbox").forEach((element)=>{
        element.setAttribute("style", "display: none");
      })
      var data = event.event.target.firstElementChild;
      data.querySelectorAll(".ag-selection-checkbox").forEach((element)=>{
        element.setAttribute("style", "display: block");
      })
    }
  }
  action(event){
    if(event == "copy"){
      this.gridApi.copySelectedRowsToClipboard(false);
      console.log("action", this.gridApi)
    }
  }
}
