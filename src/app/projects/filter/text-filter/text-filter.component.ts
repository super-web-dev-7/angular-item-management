import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDoesFilterPassParams, IFilterParams, RowNode} from '@ag-grid-community/all-modules';
import {EventEmitterService} from '@app/event-emitter.service';
import {NgSelectConfig} from '@ng-select/ng-select';
import {IFilterAngularComp} from '@ag-grid-community/angular';

@Component({
    selector: 'app-text-filter',
    templateUrl: './text-filter.component.html',
    styleUrls: ['./text-filter.component.scss']
})
export class TextFilterComponent implements OnInit {

    @Output() setFilterEvent: EventEmitter<any> = new EventEmitter();
    @Input() searchedText;
    @Input() items;
    private params: IFilterParams;
    private valueGetter: (rowNode: RowNode) => any;
    public text = '';
    FilterInputType: any;

    types = [
        {id: 1, name: 'Equals'},
        {id: 2, name: 'Not Equals'},
        {id: 3, name: 'Contains'},
    ];
    type: any;

    constructor(
        private eventEmitterService: EventEmitterService,
    ) {
    }

    ngOnInit() {
    }

    agInit(params: IFilterParams): void {
        this.params = params;
        console.log(this.params)
        this.valueGetter = params.valueGetter;
        this.FilterInputType = params.colDef['groupId'];
        localStorage.setItem('filterInputType', this.FilterInputType);
    }

    doesFilterPass(params: IDoesFilterPassParams): boolean {
        if (params.node['rowModel'].rowsToDisplay.length > 0) {
            return this.text
                .toLowerCase()
                .split(' ')
                .every(filterWord => {
                    return (
                        this.valueGetter(params.node)
                        // .toString()
                        // .toLowerCase()
                        // .indexOf(filterWord) >= 0
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
            // if(this.FilterInputType == 'number'){
            //   this.text  parseInt(this.text)
            // }
            const data = {
                searchText: this.text,
                tachname: this.params.colDef.field
            };
            this.eventEmitterService.onfilterRow(data);
            // this.params.filterChangedCallback();

        }
        // this.setFilterEvent.emit();
    }

    onSelectChange(event) {
        // this.params.hidePopup()
        console.log(event);
    }


    getModel(): any {
    }

}
