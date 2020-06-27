import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {FieldService} from '@app/fields/field.service';

@Component({
    selector: 'app-add-new-field',
    templateUrl: './add-new-field.component.html',
    styleUrls: ['./add-new-field.component.scss']
})
export class AddNewFieldComponent implements OnInit {
    @ViewChild('newItemPopup', {static: true}) newItemPopup: ModalDirective;
    @Input() projectId;
    @Input() fieldType;
    @Input() fieldName;
    @Input() fields;
    @Input() fieldTypeWithNo;
    @Output() getLatestItem: EventEmitter<any> = new EventEmitter();
    @Output() getFilelds: EventEmitter<any> = new EventEmitter();
    level;
    SelectedFieldType;

    constructor(
        private fieldService: FieldService
    ) {

    }

    ngOnInit() {
    }

    show() {
        this.newItemPopup.show();
        this.fieldType = this.fieldType.filter((v, i) => this.fieldType.indexOf(v) === i);
    }

    getFieldType(event) {
        this.SelectedFieldType = event.target.value;
    }

    addField() {
        let typeNO;
        for (let i = 0; i < this.fieldTypeWithNo.length; i++) {
            if (this.fieldTypeWithNo[i].type === this.SelectedFieldType) {
                typeNO = this.fieldTypeWithNo[i].no;
            }
        }
        const data = {
            accountId: localStorage.getItem('currentUser'),
            type: typeNO,
            label: this.level
        };
        this.fieldService
            .addField(data)
            .subscribe((result: any) => {
                if (result) {
                    this.getFilelds.emit();
                }
            });
        this.newItemPopup.hide();
    }


}
