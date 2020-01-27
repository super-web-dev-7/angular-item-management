import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-items-selection',
  templateUrl: './items-selection.component.html',
  styleUrls: ['./items-selection.component.scss']
})
export class ItemsSelectionComponent implements OnInit {
  @ViewChild('selectedPopup', { static: true }) selectedPopup: ModalDirective;

  constructor() { }
  ngOnInit() {
  }

  show() {
    this.selectedPopup.show();
  }
}
