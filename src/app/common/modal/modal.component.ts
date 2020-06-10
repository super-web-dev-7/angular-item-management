import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalPosition, ModalSize } from './ModalEnums';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() title: string;
  @Input() hideHeader = false;
  @Input() hideFooter = false;
  @Input() onCancel: Function;
  @Input() position: ModalPosition;
  @Input() onClose: Function;
  @Input() size: ModalSize = ModalSize.MEDIUM;

  @ViewChild("popup", { static: true }) popup;

  private modalSizeEnum = ModalSize;
  private positionClass;
  private isLoading: boolean;

  constructor() { }

  ngOnInit() {
    if (!this.position) {
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
    if (this.onClose) {
      this.onClose();
    }
  }

  cancel() {
    if (this.onCancel) {
      this.onCancel();
    }
    if (this.onClose) {
      this.onClose();
    }
  }

  showLoader() {
    this.isLoading = true;
  }

  hideLoader() {
    this.isLoading = false;
  }
}