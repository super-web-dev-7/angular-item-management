import { Component, OnInit, Input } from '@angular/core';
import { FieldType } from '../../../models/FieldType';

@Component({
  selector: 'app-field-type',
  templateUrl: './field-type.component.html',
  styleUrls: ['./field-type.component.scss']
})
export class FieldTypeComponent implements OnInit {

  constructor() { }

  @Input()
  public type: FieldType;
  @Input()
  public isLarge = false;
  @Input()
  public boxClass: string;

  public typeText: string;

  ngOnInit() {
    switch (this.type) {
      case FieldType.TEXT:
        this.typeText = "Text";
        break;
      case FieldType.NUMBER:
        this.typeText = "Number";
        break;
      case FieldType.PICTURE:
        this.typeText = "Picture";
        break;
      case FieldType.DATE:
        this.typeText = "Date";
        break;
      case FieldType.EXPRESSION:
        this.typeText = "Expression";
        break;
      case FieldType.DROPDOWN:
        this.typeText = "Selection List";
        break;
    }
  }

}
