import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-bottom-item-select',
  templateUrl: './bottom-item-select.component.html',
  styleUrls: ['./bottom-item-select.component.scss']
})
export class BottomItemSelectComponent implements OnInit {
  @ViewChild('selectedPopup', { static: true }) selectedPopup: ModalDirective;

  
  
  constructor() { }
  ngOnInit() {
  }

  show() {
    this.selectedPopup.show();
  }
}
