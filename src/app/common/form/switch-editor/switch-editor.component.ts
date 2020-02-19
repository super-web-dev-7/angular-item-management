import { Component, OnInit,forwardRef, HostBinding, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-switch-editor',
  templateUrl: './switch-editor.component.html',
  styleUrls: ['./switch-editor.component.scss'],
  providers: [     
    {       provide: NG_VALUE_ACCESSOR, 
            useExisting: forwardRef(() => SwitchEditorComponent),
            multi: true     
    }   
    ]
})
export class SwitchEditorComponent implements OnInit, ControlValueAccessor  {
  onChange;
  onTouched;
  public elemId;
  isDisabled = false;

  @Input()
  isChecked: boolean;
  @Input()
  label: string;

  constructor() {
    this.elemId = "switch_" + Math.random().toString(36).substring(2);
   }

  writeValue(obj: any): void {
    this.isChecked = obj;

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

  onSwitchChanged(e) {
    this.onChange(e.target.checked);
    this.onTouched(true);
  }
  ngOnInit() {
    
  }

}
