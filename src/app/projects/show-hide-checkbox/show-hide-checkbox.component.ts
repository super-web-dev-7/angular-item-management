import { Component, OnInit, ViewChild ,Input} from '@angular/core';
@Component({
  selector: 'app-show-hide-checkbox',
  templateUrl: './show-hide-checkbox.component.html',
  styleUrls: ['./show-hide-checkbox.component.scss']
})
export class ShowHideCheckboxComponent implements OnInit {
 @Input() pageNo;

  constructor() { }

  ngOnInit() {
  }
  hideSelectbox(event) {
    document.querySelectorAll(".ag-selection-checkbox").forEach((element) => {
      element.setAttribute("style", "display: none");
    });
  }
  showSelectbox(event) {
    document.querySelectorAll(".ag-selection-checkbox")[event.node.id]
    var data = document.querySelectorAll(".ag-selection-checkbox")[event.node.id];
    if (data) {
      data.setAttribute("style", "display: block");
    }
  }
  showCheckboxWithouEvent() {
    document.querySelectorAll(".ag-selection-checkbox").forEach((element) => {
      element.setAttribute("style", "display: block");
    })
  }


  onCustomHtmlLoad() {
    document.querySelectorAll(".ag-selection-checkbox").forEach((element) => {
      var x = Math.floor((Math.random() * 99999) + 1);
      if (element) {
        element.setAttribute("style", "display: none");
        element.setAttribute("id", 'row' + this.pageNo + x);
      }
    });
}
}