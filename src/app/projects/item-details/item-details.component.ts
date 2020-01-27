import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  @ViewChild('itemPopup', { static: true }) itemPopup: ModalDirective;

  constructor() { }
  ngOnInit() {
  }

  show() {
    this.itemPopup.show();
  }
}
