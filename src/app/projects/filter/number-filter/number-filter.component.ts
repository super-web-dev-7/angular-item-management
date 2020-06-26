import {Component, OnInit} from '@angular/core';
import {IDoesFilterPassParams, IFilterParams, RowNode} from '@ag-grid-community/all-modules';
import {EventEmitterService} from '@app/event-emitter.service';
import {IFilterAngularComp} from '@ag-grid-community/angular';

@Component({
    selector: 'app-number-filter',
    templateUrl: './number-filter.component.html',
    styleUrls: ['./number-filter.component.scss']
})
export class NumberFilterComponent implements OnInit, IFilterAngularComp {

    private params: IFilterParams;
    private valueGetter: (rowNode: RowNode) => any;
    public number;
    FilterInputType: any;
    invalid = false;

    types = [
        {id: 'EQUALS', name: 'Equals'},
        {id: 'NOT_EQUALS', name: 'Not Equals'},
        {id: 'LESS', name: 'Less'},
        {id: 'ABOVE', name: 'Above'},
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
        return this.number !== null && this.number !== undefined && this.number !== '';
    }

    onChange(newValue): void {
        if (this.number !== newValue) {
            this.number = newValue;
            this.invalid = this.filterOption === undefined || this.filterOption === null;
            if (!this.invalid) {
                const data = {
                    searchText: this.number ? this.number.toString() : '',
                    techName: this.params.colDef.field,
                    type: this.filterOption
                };
                this.eventEmitterService.onfilterRow(data);
            }
        }
    }

    onSelectChange(event) {
        this.filterOption = event ? event.id : null;
        this.invalid = this.filterOption === undefined || this.filterOption === null;
        if (!this.invalid) {
            const data = {
                searchText: this.number ? this.number.toString() : '',
                techName: this.params.colDef.field,
                type: this.filterOption
            };
            this.eventEmitterService.onfilterRow(data);
        }
    }

    getModel(): any {
    }

    setModel(model: any): void {
    }

}
