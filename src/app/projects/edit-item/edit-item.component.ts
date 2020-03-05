
import { Component, OnInit, ViewChild, Input, ɵConsole, Output } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap";
import { ItemsService } from "../items-list/items.service";
import { EventEmitter } from "@angular/core";

@Component({
  selector: "app-edit-item",
  templateUrl: "./edit-item.component.html",
  styleUrls: ["./edit-item.component.scss"]
})


export class EditItemComponent implements OnInit {
  @ViewChild("newItemPopup", { static: true }) newItemPopup: ModalDirective;
  @Input() projectId;
  @Input() fieldType;
  @Input() fieldName;
  @Input() fieldslable;
  @Input() SelectedRowData;
  @Input() fields;
  @Output() callgetLatestitem: EventEmitter<any> = new EventEmitter();


  [key: string]: any;
  data = {};
  items;
  constructor(private itemsService: ItemsService) { }

  ngOnInit() {
  }

  show() {
    this.fieldName.forEach(item => {
      this[item] = "";
    });
    this.newItemPopup.show();
    this.data = {}


  }

  onChangeSelectValue(event: any) {
    this[event.target.name] = (<HTMLInputElement>event.target).value;
  }

  onFieldValue(event: any) {
    this[event.target.name] = (<HTMLInputElement>event.target).value;
  }

  onEditItem() {
    this.fieldName.forEach(item => {
      if (this[item]) {
        this.data[item] = this[item];
      }
    });
    var entries = Object.entries(this.data)
    var data =
    {
      itemIds: [],
      updateFields: []
    }
    for (let j = 0; j < entries.length; j++) {
      var datasets = {
        techName: entries[j][0],
        value: entries[j][1]
      }
      data['updateFields'].push(datasets)
    }
    for (let i = 0; i < this.SelectedRowData.length; i++) {
      data['itemIds'].push(this.SelectedRowData[i]._id)
    }
    console.log('=+++++++++++?',data)
    this.itemsService
      .editItemByProject(data)
      .subscribe(result => {
        this.callgetLatestitem.emit(result);
      });
    this.newItemPopup.hide()

  }

}
