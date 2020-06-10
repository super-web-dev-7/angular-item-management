import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldType } from '../../../../models/FieldType';

@Component({
  selector: 'app-field-type-chooser',
  templateUrl: './field-type-chooser.component.html',
  styleUrls: ['./field-type-chooser.component.scss'],
  providers: [     
    {       provide: NG_VALUE_ACCESSOR, 
            useExisting: forwardRef(() => FieldTypeChooserComponent),
            multi: true     
    }   
    ]
})
export class FieldTypeChooserComponent implements OnInit, ControlValueAccessor {

  constructor() { }

  public choosedType: FieldType;
  private onChange: Function;
  private onTouched: Function;
  private isDisabled: boolean;
  private typeList: FieldType[] = [];

  ngOnInit() {
    this.initTypes();
    console.log(this.typeList);
  }

  writeValue(obj: any): void {
    this.choosedType = obj;

  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onTypeSelected(type) {
    this.choosedType = type;
    this.onChange(type);
    this.onTouched(true);
  }

  initTypes() {
    Object.keys(FieldType).forEach((type) => {
      if (!isNaN(Number(type))) {
        let typeNum = Number.parseInt(type);
        this.typeList.push(typeNum);
      }
    });
  }

}
