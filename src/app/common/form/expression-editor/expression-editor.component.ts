import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { EditorSelection } from './selection';
import { faPlus, faMinus, faTimes, faDivide, faCaretDown, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IField } from '@app/models/field.model';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-expression-editor',
  templateUrl: './expression-editor.component.html',
  styleUrls: ['./expression-editor.component.scss'],
  animations: [
    trigger('panelInOut', [
        transition('void => *', [
            style({transform: 'translateY(-20%)'}),
            animate(100)
        ]),
        transition('* => void', [
            animate(100, style({transform: 'translateY(-20%)'}))
        ])
    ])
]
})
export class ExpressionEditorComponent implements OnInit, AfterViewInit {

  private plainText = "";
  private formattedText = "";
  private addIcon: IconDefinition;
  private subtractIcon;
  private multIcon;
  private divisionIcon;
  private menuDownIcon;
  private fieldRegexList = [];

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

  ngAfterViewInit() {

  }

  onExpressionChange(value) {
    this.plainText = this.expressionEditor.nativeElement.innerText;
    this.formattedText = this.applyHighlights(this.plainText);
    let selection = new EditorSelection(this.expressionEditor.nativeElement);
    selection.saveCurrentSelection();
    this.expressionEditor.nativeElement.innerHTML = this.formattedText;
    selection.restoreSelection();
  }

  applyHighlights(text) {
    let replacedText = text;
    replacedText = replacedText
      //  .replace(/([a-zA-Z]+)/g,'<span class="text">$1</span>')
      .replace(/([/])/g, this.getDivisionElement())
      .replace(/([0-9]+)/g, this.getNumberElement("$1"))
      .replace(/([+])/g, this.getAddElement())
      .replace(/([*])/g, this.getMultElement())
      .replace(/([-])/g, this.getSubtractElement());
      this.fieldsOptions.forEach(field => {
        console.log(field.label);
        console.log(replacedText.indexOf(field.label));
        replacedText = replacedText.replace(new RegExp(field.label, 'g'), this.getFieldElement(field.label))
      });
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
    this.onExpressionChange(text);
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
