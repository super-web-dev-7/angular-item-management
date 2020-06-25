import {Component, OnInit} from '@angular/core';
import {IDoesFilterPassParams, IFilterParams, RowNode} from '@ag-grid-community/all-modules';
import {EventEmitterService} from '@app/event-emitter.service';
import {IFilterAngularComp} from '@ag-grid-community/angular';

@Component({
    selector: 'app-text-filter',
    templateUrl: './text-filter.component.html',
    styleUrls: ['./text-filter.component.scss']
})
export class TextFilterComponent implements OnInit, IFilterAngularComp {

    private params: IFilterParams;
    private valueGetter: (rowNode: RowNode) => any;
    public text = '';
    FilterInputType: any;
    invalid = false;

    types = [
        {id: 1, name: 'Equals'},
        {id: 2, name: 'Not Equals'},
        {id: 3, name: 'Contains'},
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
        if (params.node['rowModel'].rowsToDisplay.length > 0) {
            return this.text
                .toLowerCase()
                .split(' ')
                .every(filterWord => {
                    return (
                        this.valueGetter(params.node)
                    );
                });
        }
    }

    isFilterActive(): boolean {
        return this.text !== null && this.text !== undefined && this.text !== '';
    }

    onChange(newValue): void {
        if (this.text !== newValue) {
            this.text = newValue;
            const data = {
                searchText: this.text,
                techName: this.params.colDef.field
            };
            this.invalid = this.filterOption === undefined || this.filterOption === null;
            console.log(this.invalid);
            if (!this.invalid) {
                this.eventEmitterService.onfilterRow(data);
            }
        }
    }

    onSelectChange(event) {
        this.filterOption = event ? event.name : null;
        this.invalid = this.filterOption === undefined || this.filterOption === null;
        if (!this.invalid) {
            const data = {
                searchText: this.text,
                techName: this.params.colDef.field
            };
            this.eventEmitterService.onfilterRow(data);
        }
    }

    getModel(): any {
    }

    setModel(model: any): void {
    }

}
