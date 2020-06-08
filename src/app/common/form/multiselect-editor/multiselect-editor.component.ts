import { Component, OnInit, Input, forwardRef, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-multiselect-editor',
  templateUrl: './multiselect-editor.component.html',
  styleUrls: ['./multiselect-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiselectEditorComponent),
      multi: true
    }
  ]

})
export class MultiselectEditorComponent implements OnInit, ControlValueAccessor {
  private onChange;
  private onTouched;
  private isDisabled = false;
  private options: { value: string }[];
  private newOption: { value: string };

  newOptionError = this.createEmptyError();

  constructor() { }

  @ViewChild("newOptionValue", { static: false })
  newOptionValueField: ElementRef;

  private clickedOutside = false;

  @HostListener('click')
  clickInside() {
    this.clickedOutside = false;
  }

  @HostListener('document:click')
  clickout() {
    if (this.clickedOutside) {
      if (this.newOption) {
        if (this.validateNewOption()) {
          this.afterAddNewOption();
        } else {
          this.onRemoveNewOption();
        }
      }
    }
    this.clickedOutside = true;
  }

  ngOnInit() {
  }

  writeValue(obj: any): void {
    let optionsToSet = [];
    if (obj && Array.isArray(obj)) {
      optionsToSet = [...obj];
    }
    this.options = optionsToSet;
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

  onOptionsChanged() {
    this.onChange(this.options);
    this.onTouched(true);
  }

  addEmptyOption() {
    if (this.validateNewOption()) {
      this.afterAddNewOption();
    }
    if (!this.newOption) {
      this.newOption = { value: '' };
      this.newOptionError = {empty: false, duplicated: false};
    }
    setTimeout(() => {
      if (this.newOptionValueField.nativeElement) {
        this.newOptionValueField.nativeElement.focus();
      }
    });
  }

  validateNewOption() {
    if(!this.newOption) {
      this.newOptionError = this.createEmptyError();
      return false;
    }
    let duplicated = this.options.find((option) => option.value === this.newOption.value);
    this.newOptionError = {empty: this.newOption.value === '',duplicated: duplicated !== undefined}
    return !this.newOptionError.empty && !this.newOptionError.duplicated;
  }

  afterAddNewOption() {
    if (this.validateNewOption()) {
      this.newOptionError = {empty: false, duplicated: false};
      console.log(this.newOption);
      console.log(this.options);
      this.options.unshift({ ...this.newOption });
      this.newOption = null;
      this.onOptionsChanged();
    } else {
      this.newOptionValueField.nativeElement.focus();
    }
  }

  onRemoveNewOption() {
    this.newOption = null;
  }

  onRemove(optionToRemove) {
    this.options = this.options.filter((option) => {
      return option.value !== optionToRemove.value;
    });
    this.onOptionsChanged();
  }

  createEmptyError() {
    return {empty: false, duplicated: false};
  }
}
