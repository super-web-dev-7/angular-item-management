import {Component, OnInit, Input, ViewChild, Output, EventEmitter} from '@angular/core';
import {EventEmitterService} from '@app/event-emitter.service';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
    @Input() totalPage;
    @Input() totalItems;
    @Input() pageNo;
    @Input() datainarry;
    @Output() getLatestitem: EventEmitter<any> = new EventEmitter();

    constructor(private eventEmitterService: EventEmitterService) {
    }

    ngOnInit() {
    }

    moveToFirstPage() {
        this.datainarry = false;
        this.pageNo = 1;
        this.getLatestitem.emit();
        this.eventEmitterService.onPageChange(this.pageNo);
    }

    moveToLastPage() {
        this.datainarry = false;
        this.pageNo = this.totalPage;
        this.getLatestitem.emit();
        this.eventEmitterService.onPageChange(this.pageNo);
    }

    moveToNext() {
        this.datainarry = false;
        if (this.pageNo < this.totalPage) {
            this.pageNo = this.pageNo + 1;
            this.getLatestitem.emit();
            this.eventEmitterService.onPageChange(this.pageNo);
        }
    }

    moveToPrevious() {
        this.datainarry = false;
        if (this.pageNo > 1) {
            this.pageNo = this.pageNo - 1;
            this.getLatestitem.emit();
            this.eventEmitterService.onPageChange(this.pageNo);
        }
    }
}
