import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { ModalPosition } from './ModalPosition';
import { switchMap } from 'rxjs-compat/operator/switchMap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() title;
  @Input() hideHeader = false;
  @Input() hideFooter = false;
  @Input() onCancel: Function;
  @Input() position: ModalPosition;

  @ViewChild("popup", { static: true }) popup;

  private positionClass;
  private isLoading: boolean;

  constructor() { }

  ngOnInit() {
    if(!this.position) {
      this.positionClass = "slide-up";
      return;
    }
    switch (this.position.toString()) {
      case ModalPosition.TOP.toString():
        this.positionClass = "stick-up";
        break;
      case ModalPosition.RIGHT.toString():
        this.positionClass = "slide-right";
        break;
      case ModalPosition.CENTER.toString():
        this.positionClass = "slide-up";
        break;
    }
  }

  show() {
    this.popup.show();
  }

  hide() {
    this.popup.hide();
  }

  cancel() {
    this.onCancel();
  }

  showLoader() {
    this.isLoading = true;
  }

  hideLoader() {
    this.isLoading = false;
  }

}
