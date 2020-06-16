import {Component, OnInit, ViewChild, Input, Output} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {ItemsService} from '../items-list/items.service';
import {EventEmitter} from '@angular/core';
import {EventEmitterService} from '@app/event-emitter.service';
import * as moment from 'moment';

@Component({
    selector: 'app-new-item',
    templateUrl: './new-item.component.html',
    styleUrls: ['./new-item.component.scss']
})
export class NewItemComponent implements OnInit {
    @ViewChild('newItemPopup', {static: true}) newItemPopup: ModalDirective;
    @Input() projectId;
    @Input() pageNo;
    @Input() fieldType;
    @Input() fieldName;
    @Input() fields;
    @Input() fieldslable;
    @Output() getLatestitem: EventEmitter<any> = new EventEmitter();


    [key: string]: any;

    data = {};
    isDisable_Submit = true;

    constructor(private itemsService: ItemsService, private eventEmitterService: EventEmitterService) {
    }

    ngOnInit() {
    }

    show() {
        this.resetPopValues();
        this.newItemPopup.show();
    }

    hide() {
        this.resetPopValues();
        this.newItemPopup.hide();
    }

    submitValidation() {
        for (const field of this.fields) {
            if (field.readonly) {
                continue;
            }
            if (field.isRequired) {
                if (this[field.techName] === null
                    || this[field.techName] === undefined
                    || this[field.techName] === ''
                ) {
                    return true;
                }
            }
        }
        return false;
    }

    onChangeSelectValue(event: any, date_format = 'YYYY-MM-DD') {
        if (event.target.type === 'date') {
            event.target.setAttribute('data-date', moment((<HTMLInputElement>event.target).value, 'YYYY-MM-DD').format(date_format));
        }
        this[event.target.name] = (<HTMLInputElement>event.target).value;
        this.isDisable_Submit = this.submitValidation();
    }

    onAddItem() {
        this.fields.forEach(item => {
            if (this[item.techName]) {
                if (item.type === 3) {
                    const date = new Date(this[item.techName]);
                    this.data[item.techName] = date.getTime().toString();
                } else {
                    this.data[item.techName] = this[item.techName];
                }
            }
        });
        this.data['projectId'] = localStorage.getItem('ProjectId');
        this.itemsService
            .newItemByProject(localStorage.getItem('ProjectId'), this.data)
            .subscribe(result => {
                this.eventEmitterService.onPageChange(this.pageNo);
            });
        this.resetPopValues();
        this.newItemPopup.hide();
    }

    resetPopValues() {
        this.fieldName.forEach(item => {
            this[item] = '';
        });
        document.querySelectorAll('input').forEach(inputItem => {
            inputItem.value = '';
        });
        document.querySelectorAll('select').forEach(selectItem => {
            selectItem.value = '';
        });
    }
}
