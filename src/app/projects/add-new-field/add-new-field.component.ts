import { Component, OnInit, ViewChild, Input, Output,EventEmitter } from '@angular/core';
import { ModalDirective } from "ngx-bootstrap";
import { FieldService } from "../../fields/field.service";

@Component({
  selector: 'app-add-new-field',
  templateUrl: './add-new-field.component.html',
  styleUrls: ['./add-new-field.component.scss']
})
export class AddNewFieldComponent implements OnInit {
  @ViewChild("newItemPopup", { static: true }) newItemPopup: ModalDirective;
  @Input() projectId;
  @Input() fieldType;
  @Input() fieldName;
  @Input() fields;
  @Input() fieldTypeWithNo
  @Output() getLatestitem: EventEmitter<any> = new EventEmitter();
  @Output() getfilelds: EventEmitter<any> = new EventEmitter();
  filteredType = [];
  level;
  SelectedfieldType;
  constructor(
    private fieldService: FieldService

  ) {

  }

  ngOnInit() {
  }
  show() {
    this.newItemPopup.show();
    let x = this.fieldType.filter((v, i) => this.fieldType.indexOf(v) === i)
    this.fieldType = x
  }
  getFieldType(event) {
    this.SelectedfieldType = event.target.value;
  }

  addField() {
    var typeNO
    for (let i = 0; i < this.fieldTypeWithNo.length; i++) {
      if (this.fieldTypeWithNo[i].type == this.SelectedfieldType) {
        typeNO = this.fieldTypeWithNo[i].no
      }
    }
    var data = {
      accountId: localStorage.getItem('currentUser'),
      type: typeNO,
      label: this.level
    }
    this.fieldService
      .addField(data)
      .subscribe((result: any) => {
        if (result) {
          this.getfilelds.emit();
        }
      });
      this.newItemPopup.hide()
  }

  

}
