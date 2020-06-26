import {Component, OnInit} from '@angular/core';
import {IFilterAngularComp} from '@ag-grid-community/angular';
import {IDoesFilterPassParams, IFilterParams, RowNode} from '@ag-grid-community/all-modules';
import {EventEmitterService} from '@app/event-emitter.service';

@Component({
    selector: 'app-picture-filter',
    templateUrl: './picture-filter.component.html',
    styleUrls: ['./picture-filter.component.scss']
})
export class PictureFilterComponent implements OnInit, IFilterAngularComp {

    private params: IFilterParams;
    private valueGetter: (rowNode: RowNode) => any;
    FilterInputType: any;
    invalid = false;

    types = [
        {id: 'HAS_IMAGE', name: 'Has Picture'},
        {id: 'NO_IMAGE', name: 'Hasn\'t Picture'},
    ];
    type: any;
    filterOption: any;

    constructor(
        private eventEmitterService: EventEmitterService,
    ) {
    }

    ngOnInit() {
    }

    agInit(params: IFilterParams): void {
        this.params = params;
        this.valueGetter = params.valueGetter;
        this.FilterInputType = params.colDef['groupId'];
    }

    doesFilterPass(params: IDoesFilterPassParams): boolean {
        return true;
    }

    isFilterActive(): boolean {
        return false;
    }

    onSelectChange(event) {
        this.filterOption = event ? event.id : null;
        this.invalid = this.filterOption === undefined || this.filterOption === null;
        if (!this.invalid) {
            const data = {
                searchText: this.filterOption ? this.filterOption.toString() : '',
                techName: this.params.colDef.field,
                type: this.filterOption
            };
            this.eventEmitterService.onfilterRow(data);
        } else {
            const data = {
                searchText: '',
                techName: this.params.colDef.field,
                type: ''
            };
            this.eventEmitterService.onfilterRow(data);
        }
    }

    getModel(): any {
    }

    setModel(model: any): void {
    }

}
