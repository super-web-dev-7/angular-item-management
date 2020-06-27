import {Component, OnInit, Input} from '@angular/core';
import {ItemsService} from '../items-list/items.service';
import {FieldService} from '@app/fields/field.service';
import {EventEmitterService} from '@app/event-emitter.service';
import * as moment from 'moment';

@Component({
    selector: 'app-cell-edit',
    templateUrl: './cell-edit.component.html',
    styleUrls: ['./cell-edit.component.scss']
})
export class CellEditComponent implements OnInit {
    @Input() celldbclicked;
    @Input() pageNo;

    constructor(
        private itemsService: ItemsService,
        private fieldService: FieldService,
        private eventEmitterService: EventEmitterService
    ) {
    }

    ngOnInit() {
    }

    onCellValueChanged(event) {
        if (event.newValue) {
            let data;
            data = {_id: event.data._id, projectId: event.data.projectId};
            if (event.column.colDef['groupId'] === 'date') {
                data[event.column.colId] = (new Date(event.data[event.colDef.colId])).getTime();
            } else {
                data[event.column.colId] = event.newValue;
            }

            if (event.oldValue !== event.newValue) {
                if (data._id) {
                    this.itemsService.editItemByProject(data).subscribe(result => {
                        if (result) {
                            this.celldbclicked = false;
                            localStorage.setItem('pdata', 'true');
                        }
                    });
                }
            }
        }
    }

}
