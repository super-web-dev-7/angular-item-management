import {Component, OnInit, Input, ViewChild, Output, EventEmitter} from '@angular/core';
import {EventEmitterService} from '@app/event-emitter.service';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
    @Input() gridApi;

    constructor(private eventEmitterService: EventEmitterService) {
    }

    ngOnInit() {
        // this.gridApi.paginationSetPageSize(10);
    }
}
