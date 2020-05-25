import { Component, OnInit, ViewChild, Input, Output } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap";
import { ItemsService } from "../items-list/items.service";
import { EventEmitter } from "@angular/core";
import { EventEmitterService } from '../../event-emitter.service';    
import { D } from "@angular/cdk/keycodes";

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
    this.fields.forEach(item => {
      if (this[item.techName]) {
        if(item.type ==3){
          var date = new Date(this[item.techName])
          this.data[item.techName] = date.getTime().toString();
        }else{
          this.data[item.techName] = this[item.techName];
        }
      }
    });
    this.data["projectId"] = localStorage.getItem('ProjectId');
    this.itemsService
      .newItemByProject(localStorage.getItem('ProjectId'), this.data)
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
