import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() title;
  @Input() hideHeader = false;
  @Input() hideFooter = false;
  @ViewChild("popup", {static: true}) popup;
  
  constructor() { }

  ngOnInit() {
  }

  show() {
    this.popup.show();
  }

  hide() {
    
  }

}
