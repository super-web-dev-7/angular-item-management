import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap";
import { ItemsService } from "../items-list/items.service";
import { FieldService } from "../../fields/field.service";

@Component({
  selector: "app-new-item",
  templateUrl: "./new-item.component.html",
  styleUrls: ["./new-item.component.scss"]
})
export class NewItemComponent implements OnInit {
  @ViewChild("newItemPopup", { static: true }) newItemPopup: ModalDirective;
  @Input() projectId;
  @Input() itemColumnType;

  textField7: string = "";
  numberField9: string = "";
  itemsService = ItemsService;

  constructor() {}

  ngOnInit() {}

  show() {
    this.newItemPopup.show();
  }

  onAddItem() {}
}
