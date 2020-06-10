import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-dropdown-editor',
  templateUrl: './dropdown-editor.component.html',
  styleUrls: ['./dropdown-editor.component.scss'],
  providers: [     
    {       provide: NG_VALUE_ACCESSOR, 
            useExisting: forwardRef(() => DropdownEditorComponent),
            multi: true     
    }   
    ]
})
export class DropdownEditorComponent  implements OnInit, ControlValueAccessor   {

  constructor() { }

  private onChange;
  private onTouched;
  private isDisabled = false;

  @Input()
  options: {value: string, label:string}[] = [];

  private selectedOption;

  ngOnInit() {
  }

  writeValue(obj: any): void {
    this.selectedOption = obj;
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

  onSelected() {
    this.onChange(this.selectedOption);
    this.onTouched(true);
  }
 

}
