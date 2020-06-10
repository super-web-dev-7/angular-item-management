import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, forwardRef } from '@angular/core';
import { EditorSelection } from './selection';
import { faPlus, faMinus, faTimes, faDivide, faCaretDown, IconDefinition } from '@fortawesome/pro-light-svg-icons';;
import { IField } from '@app/models/field.model';
import { trigger, transition, style, animate } from '@angular/animations';
import { FieldType } from '@app/models/FieldType';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SwitchEditorComponent } from '../switch-editor/switch-editor.component';

@Component({
  selector: 'app-expression-editor',
  templateUrl: './expression-editor.component.html',
  styleUrls: ['./expression-editor.component.scss'],
  animations: [
    trigger('panelInOut', [
      transition('void => *', [
        style({ transform: 'translateY(-20%)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'translateY(-20%)' }))
      ])
    ])
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExpressionEditorComponent),
      multi: true
    }
  ]
})
export class ExpressionEditorComponent implements OnInit, ControlValueAccessor {

  private plainText = "";
  private formattedText = "";
  onChange;
  onTouched;
  isDisabled = false;
  addIcon: IconDefinition;
  subtractIcon;
  multIcon;
  divisionIcon;
  menuDownIcon;
  fieldRegexList = [];
  filterParams = { type: FieldType.NUMBER, label: "" }

  @Input() fieldsOptions: IField[];

  @ViewChild("expressionEditor", { static: false }) expressionEditor: ElementRef;

  private showFieldsOptions = false;

  constructor() {
    this.addIcon = faPlus;
    this.subtractIcon = faMinus;
    this.multIcon = faTimes;
    this.divisionIcon = faDivide;
    this.menuDownIcon = faCaretDown;
  }

  ngOnInit() {
  }

  writeValue(obj: any): void {
    console.log(obj);
    setTimeout(() => {
      if (this.expressionEditor) {
        this.expressionEditor.nativeElement.innerHTML = obj;
        this.onExpressionChange();
      }
    });
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

  onExpressionChange() {
    this.plainText = this.expressionEditor.nativeElement.innerText;
    this.formattedText = this.applyHighlights(this.plainText);
    let selection = new EditorSelection(this.expressionEditor.nativeElement);
    selection.saveCurrentSelection();
    this.expressionEditor.nativeElement.innerHTML = this.formattedText;
    selection.restoreSelection();
    this.onChange(this.plainText);
    this.onTouched(true);
  }

  applyHighlights(text) {
    let replacedText = text;
    this.fieldsOptions.forEach(field => {
      replacedText = replacedText.replace(new RegExp(field.label, 'g'), this.getFieldElement(field.label))
    });
    replacedText = replacedText
      //  .replace(/([a-zA-Z]+)/g,'<span class="text">$1</span>')
      .replace(/(?=[/])(?!\/mark)./g, this.getDivisionElement())
      .replace(/(?!<mark[^>]*?>)([0-9]+)(?![^<]*?<\/mark>)/g, this.getNumberElement("$1"))
      .replace(/([+])/g, this.getAddElement())
      .replace(/([*])/g, this.getMultElement())
      .replace(/([-])/g, this.getSubtractElement());
    return replacedText;
  }

  onToggleFields() {
    this.showFieldsOptions = !this.showFieldsOptions;
  }
  onAddClick() {
    this.onOperationClick('+');
  }

  onDivisionClick() {
    this.onOperationClick('/');
  }

  onMultClick() {
    this.onOperationClick('*');
  }

  onSubtractClick() {
    this.onOperationClick('-');
  }

  onFieldClick(field) {
    this.onOperationClick(field.label);
  }

  onOperationClick(operationText) {
    let text = this.expressionEditor.nativeElement.innerText;
    let selection = new EditorSelection(this.expressionEditor.nativeElement);
    selection.saveCurrentSelection();
    const pos = selection.getCurrentOffset();
    var textBefore = text.substring(0, pos);
    var textAfter = text.substring(pos, text.length);
    text = `${textBefore}${operationText}${textAfter}`;
    this.expressionEditor.nativeElement.innerHTML = text;
    this.onExpressionChange();
    selection.restoreSelectionPlus(operationText.length);
  }

  getDivisionElement() {
    return '<mark class="division">/</mark>';
  }

  getNumberElement(number) {
    return `<mark class="number">${number}</mark>`;
  }

  getFieldElement(field) {
    return `<mark class="field">${field}</mark>`;
  }

  getAddElement() {
    return '<mark class="add">+</mark>';
  }

  getMultElement() {
    return '<mark class="mult">*</mark>';
  }

  getSubtractElement() {
    return '<mark class="subtract">-</mark>';
  }
}
