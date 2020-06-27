import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {ItemsService} from './items.service';
import {AgGridComponent} from '../ag-grid/ag-grid.component';
import {ShowHideCheckboxComponent} from '../show-hide-checkbox/show-hide-checkbox.component';
import {EventEmitterService} from '@app/event-emitter.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {ProjectsService} from '../projects.service';

@Component({
    selector: 'app-items-list',
    templateUrl: './items-list.component.html',
    styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {
    @ViewChild('agGridComponent', {static: true}) agGridComponent: AgGridComponent;
    @ViewChild('showHideCheckboxComponent', {static: true}) showHideCheckboxComponent: ShowHideCheckboxComponent;
    itemColumns = [];
    items;
    columnLoaded = false;
    fieldName = [];
    fieldType = [];
    showAllCheckBox = false;
    gridRows;  // gridApi;
    SelectedRowData = [];
    noOfSelectedRows = 0;
    notreffress = false;
    fields;
    fieldTypeWithNo = [];
    pageNo = 1;
    TotalItems;
    celldbclicked;
    oldArrow;
    fieldsLabel = [];
    sortOrder;
    headerField;
    totalPage;
    searchedValue: any;
    oldSearchId: string;
    RowIndex = [];
    agHeaderCheckbox = false;
    agheader: boolean;
    openedSearchedBoxId: any;
    CustomeHeaderField: any;
    @Input() itemSelectionView;
    showGridPlaceholder = true;

    private projectId;

    subscription: any;
    filterSortData: any = {
        filter: [{techName: '', value: '', type: ''}],
        sort: {techName: '', direction: ''}
    };

    constructor(
        private itemsService: ItemsService,
        private router: Router,
        private route: ActivatedRoute,
        private projectService: ProjectsService,
        private eventEmitterService: EventEmitterService) {
        this.eventEmitterService.invokeOnGetItemsByProjectWithPagination.subscribe((page: any) => {
            this.pageNo = page;
            this.countItemsByProject();
        });

    }

    ngOnInit() {
        this.projectId = this.route.snapshot.params.id;
        localStorage.setItem('ProjectId', this.projectId);
        if (this.eventEmitterService.subsVar === undefined) {
            this.eventEmitterService.subsVar = this.eventEmitterService.invokeItemListComponentFunction.subscribe((data: any) => {
                this.filterSortGridByApi(data);
            });
        }
        if (this.eventEmitterService.subsVar === undefined) {
            this.eventEmitterService.subsVar = this.eventEmitterService.getLatestItemEvents.subscribe((data: any) => {
                this.agGridComponent.getLatestItem(data);
            });
        }
        if (this.eventEmitterService.subsVar === undefined) {
            this.eventEmitterService.subsVar = this.eventEmitterService.getItemsOfList.subscribe((data: any) => {
                this.onGetItemsByProjectWithPagination(this.pageNo);
            });
        }
        this.onGetItemsByProjectWithPagination(this.pageNo);
        this.countItemsByProject();
        this.GetFields();
        // this.autoGroupColumnDef = {};
        localStorage.setItem('pdata', 'true');
    }

    GetFields() {
        this.fields = [];
        this.itemColumns = [];
        this.fieldName = [];
        this.fieldType = [];
        this.projectService.getFieldsByProject(this.projectId).subscribe((fields: any) => {
            this.fields = fields;
            this.agGridComponent.setItemColumns(fields);
            this.columnLoaded = this.agGridComponent.columnLoaded;
            this.itemColumns = this.agGridComponent.itemColumns;
            this.itemColumns[0]['headerCheckboxSelection'] = true;
            this.itemColumns[0]['checkboxSelection'] = true;
            this.itemColumns[0]['rowDrag'] = true;
            for (let j = 1; j < this.itemColumns.length; j++) {
                this.itemColumns[j]['headerCheckboxSelection'] = false;
                this.itemColumns[j]['checkboxSelection'] = false;
                this.itemColumns[j]['rowDrag'] = false;
            }
        });
    }

    countItemsByProject() {
        this.itemsService.countItemsByProject(localStorage.getItem('ProjectId')).subscribe((count: any) => {
            this.TotalItems = count;
            this.totalPage = Math.ceil(this.TotalItems / 100);
            if (this.pageNo > this.totalPage) {
                this.pageNo = this.totalPage;
            }
            if (this.totalPage === 1) {
                this.pageNo = 1;
            }
            this.onGetItemsByProjectWithPagination(this.pageNo);
        });
    }

    onGetItemsByProjectWithPagination(pageNo) {
        this.filterSortData = {filter: [{techName: '', value: '', type: ''}], sort: {techName: '', direction: ''}};
        this.itemsService.onGetItemsByProjectWithPagination(localStorage.getItem('ProjectId'), this.filterSortData, pageNo)
            .subscribe((items: any) => {
                this.items = items;
                if (items.length === 0) {
                    this.showGridPlaceholder = false;
                }
        });
    }

    filterSortGridByApi(data) {
        if (data.type === 'filter') {
            const values = data.data;
            if (values.type === 'date') {
                if (values.searchText) {
                    const timeStamp = new Date(values.searchText);
                    const newTimeStamp: number = timeStamp.getTime();
                    this.filterSortData.filter[0].techName = values.techName;
                    this.filterSortData.filter[0].value = newTimeStamp.toString();
                    this.filterSortData.filter[0].type = values.type;
                } else {
                    this.filterSortData.filter[0].techName = '';
                    this.filterSortData.filter[0].value = '';
                    this.filterSortData.filter[0].type = '';
                }
            } else {
                if (values.searchText === '') {
                    if (values.type === 'HAS_IMAGE' || values.type === 'NO_IMAGE') {
                        this.filterSortData.filter[0].techName = values.techName;
                        this.filterSortData.filter[0].value = '';
                        this.filterSortData.filter[0].type = values.type;
                    } else {
                        this.filterSortData.filter[0].techName = '';
                        this.filterSortData.filter[0].value = '';
                        this.filterSortData.filter[0].type = '';
                    }
                } else {
                    this.filterSortData.filter[0].techName = values.techName;
                    this.filterSortData.filter[0].value = values.searchText;
                    this.filterSortData.filter[0].type = values.type;
                }
            }

            this.itemsService.onGetItemsByProjectWithPagination(
                localStorage.getItem('ProjectId'), this.filterSortData, this.pageNo).subscribe((items: any) => {
                this.items = items;
                if (items.length === 0) {
                    this.items = [{_id: localStorage.getItem('ProjectId'), [values.techName]: 'No Data Found !!'}];
                }
            });
        }

        if (data.type === 'sort') {
            const values = data.data;
            if (values) {
                this.filterSortData.sort.techName = values.colId;
                this.filterSortData.sort.direction = values.sort;
            } else {
                this.filterSortData.sort.techName = '';
                this.filterSortData.sort.direction = '';
            }
            this.itemsService.onGetItemsByProjectWithPagination(
                localStorage.getItem('ProjectId'), this.filterSortData, this.pageNo).subscribe((items: any) => {
                this.items = items;
                if (items.length === 0) {
                    this.items = [{_id: localStorage.getItem('ProjectId'), [values.techName]: 'No Data Found !!'}];
                }
            });
        }
    }
}
