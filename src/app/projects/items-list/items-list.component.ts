import { Component, OnInit, Input } from "@angular/core";
import { ItemsService } from "./items.service";
import { FieldService } from "../../fields/field.service";

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

  @Input() projectId;
  constructor(
    private itemsService: ItemsService,
    private fieldService: FieldService
  ) {}

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
      this.itemCulomns[0]["headerCheckboxSelection"] = true;
      this.itemCulomns[0]["headerCheckboxSelectionFilteredOnly"] = true;
      this.itemCulomns[0]["checkboxSelection"] = true;
      this.itemCulomns[0]["rowDrag"] = true;
    });

    this.defaultColDef = {
      width: 150,
      sortable: true,
      filter: true,
      resizeable: true
    };
    this.rowSelection = "multiple";
  }
}
