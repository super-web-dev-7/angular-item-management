import { Component, OnInit, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { FieldType } from '../../models/FieldType';
import { faFunction, IconDefinition, faText, faHashtag, faImages, faCalendarDay, faThList } from '@fortawesome/pro-duotone-svg-icons';

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

  private typeText: string;
  private typeIcon: IconDefinition;
  private typeClass: string;

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    const type: SimpleChange = changes.type;
    if (type) {
      this.initField(type.currentValue);
    }
  }

  initField(type) {
    switch (type) {
      case FieldType.TEXT:
        this.typeText = "Text";
        this.typeIcon = faText;
        this.typeClass = "text";
        break;
      case FieldType.NUMBER:
        this.typeText = "Number";
        this.typeIcon = faHashtag;
        this.typeClass = "number";
        break;
      case FieldType.PICTURE:
        this.typeText = "Picture";
        this.typeIcon = faImages;
        this.typeClass = "picture";
        break;
      case FieldType.DATE:
        this.typeText = "Date";
        this.typeIcon = faCalendarDay;
        this.typeClass = "date";
        break;
      case FieldType.EXPRESSION:
        this.typeText = "Expression";
        this.typeIcon = faFunction;
        this.typeClass = "expression";
        break;
      case FieldType.DROPDOWN:
        this.typeText = "Selection List";
        this.typeIcon = faThList;
        this.typeClass = "dropdown";
        break;
    }
  }
}
