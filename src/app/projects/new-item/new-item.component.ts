import { Component, OnInit, ViewChild, Input, Output } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap";
import { ItemsService } from "../items-list/items.service";
import { EventEmitter } from "@angular/core";
import { EventEmitterService } from '../../event-emitter.service';    

@Component({
  selector: "app-new-item",
  templateUrl: "./new-item.component.html",
  styleUrls: ["./new-item.component.scss"]
})
export class NewItemComponent implements OnInit {
  @ViewChild("newItemPopup", { static: true }) newItemPopup: ModalDirective;
  @Input() projectId;
  @Input() pageNo;
  @Input() fieldType;
  @Input() fieldName;
  @Input() fields;
  @Input() fieldslable;
  @Output() getLatestitem: EventEmitter<any> = new EventEmitter();

  
  [key: string]: any;
  data = {};

  constructor(private itemsService: ItemsService, private eventEmitterService: EventEmitterService) { }

  ngOnInit() { }

  show() {
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
        this.eventEmitterService.onPageChange(this.pageNo); 
            });
    this.resetPopValues();
    this.newItemPopup.hide();

  }
  resetPopValues(){
		this.fieldName.forEach(item => {
		  this[item] = "";
		});
	}
}
