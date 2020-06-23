import {Component, OnInit, ViewChild, Input, ɵConsole, Output} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {ItemsService} from '../items-list/items.service';
import {EventEmitter} from '@angular/core';
import {ProjectsService} from '../projects.service';

@Component({
    selector: 'app-edit-item',
    templateUrl: './edit-item.component.html',
    styleUrls: ['./edit-item.component.scss']
})


export class EditItemComponent implements OnInit {
    @ViewChild('newItemPopup', {static: true}) newItemPopup: ModalDirective;
    @Input() projectId;
    @Input() fieldType;
    @Input() fieldName;
    @Input() fieldslable;
    @Input() SelectedRowData;
    @Input() fields;
    @Output() callgetLatestitem: EventEmitter<any> = new EventEmitter();


    [key: string]: any;

    data = {};
    items;

    constructor(private itemsService: ItemsService, private projectsService: ProjectsService
    ) {
    }

    ngOnInit() {

    }

    show() {
        this.resetPopValues('show');
    }

    clearPopUpValues() {
        this.resetPopValues('hide');
    }

    onChangeSelectValue(event: any) {
        this[event.target.name] = (<HTMLInputElement>event.target).value;
    }

    onEditItem() {
        this.fields.forEach(fields => {
            if (fields.type === 3) {
                const date = new Date(this[fields.techName]);
                const dateTimeStamp = date.getTime();
                this[fields.techName] = dateTimeStamp;
            }
            if (this[fields.techName]) {
                this.data[fields.techName] = this[fields.techName];
            }
        });
        const entries = Object.entries(this.data);
        const data = {
            itemIds: [],
            updateFields: []
        };
        for (let j = 0; j < entries.length; j++) {
            const datasets = {
                techName: entries[j][0],
                value: entries[j][1]
            };
            data['updateFields'].push(datasets);
        }
        for (let i = 0; i < this.SelectedRowData.length; i++) {
            data['itemIds'].push(this.SelectedRowData[i]._id);
        }
        this.itemsService
            .editMassItemByProject(data)
            .subscribe(result => {
                this.callgetLatestitem.emit(result);
            });
        this.clearPopUpValues();
    }

    resetPopValues(value) {
        this.fieldName.forEach(item => {
            this[item] = '';
        });

        this.data = {};
        if (value === 'hide') {

            this.newItemPopup.hide();
            this.projectsService.getFieldsByProject(this.projectId).subscribe((fields: any) => {
                this.fields = '';
            });
        } else {

            this.newItemPopup.show();
            this.projectsService.getFieldsByProject(this.projectId).subscribe((fields: any) => {
                this.fields = fields;
            });
        }
        document.querySelectorAll('input').forEach(inputItem => {
            inputItem.value = '';
        });
        document.querySelectorAll('select').forEach(selectItem => {
            selectItem.value = null;
        });

    }
}
