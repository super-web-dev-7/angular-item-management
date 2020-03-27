import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap";
import { ItemsService } from "../items-list/items.service";

@Component({
  selector: "app-new-item",
  templateUrl: "./new-item.component.html",
  styleUrls: ["./new-item.component.scss"]
})
export class NewItemComponent implements OnInit {
  @ViewChild("newItemPopup", { static: true }) newItemPopup: ModalDirective;
  @Input() projectId;
  @Input() fieldType;
  @Input() fieldName;
  @Input() fields;
  @Input() fieldslable;

  
  [key: string]: any;
  data = {};

  constructor(private itemsService: ItemsService) { }

  ngOnInit() { }

  show() {
    this.fieldName.forEach(item => {
      this[item] = "";
    });
    this.newItemPopup.show();
  }

  onChangeSelectValue(event: any) {
    this[event.target.name] = (<HTMLInputElement>event.target).value;
  }
  onFieldValue(event: any) {
    this[event.target.name] = (<HTMLInputElement>event.target).value;
  }

  onAddItem() {
    this.fieldName.forEach(item => {
      if (this[item]) {
        this.data[item] = this[item];
      }
    });
    this.data["projectId"] = this.projectId;
    this.itemsService
      .newItemByProject(this.projectId, this.data)
      .subscribe(result => {

      });
    this.newItemPopup.hide();
  }
}
