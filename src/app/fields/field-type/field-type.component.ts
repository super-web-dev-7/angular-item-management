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
      case FieldType.Text:
        this.typeText = "Text";
        break;
      case FieldType.Number:
        this.typeText = "Number";
        break;
      case FieldType.Picture:
        this.typeText = "Picture";
        break;
      case FieldType.Date:
        this.typeText = "Date";
        break;
      case FieldType.Expression:
        this.typeText = "Expression";
        break;
      case FieldType.DropDown:
        this.typeText = "Selection List";
        break;
    }
  }

}
