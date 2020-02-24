import { Component, OnInit, ViewChild, Input, ɵConsole } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap";
import { ItemsService } from "../items-list/items.service";

@Component({
  selector: 'app-edit-single-item',
  templateUrl: './edit-single-item.component.html',
  styleUrls: ['./edit-single-item.component.scss']
})


export class EditSingleItemComponent implements OnInit {
  @ViewChild("newItemPopup", { static: true }) newItemPopup: ModalDirective;
  @Input() projectId;
  @Input() fieldType;
  @Input() fieldName;
  @Input() SelectedSingleRowData;
  
  [key: string]: any;
  data = {};
  items;
  constructor(private itemsService: ItemsService) {}

  ngOnInit() {
  }

  show() {
    this.fieldName.forEach(item => {
      this[item] = "";
    });
    this.newItemPopup.show();
  }

  openTabs(evt, tabID) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabID).style.display = "block";
    evt.currentTarget.className += " active";
  }


}
