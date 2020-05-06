import { Component, OnInit, Input ,ViewChild, Output, EventEmitter  } from '@angular/core';
import { EventEmitterService } from '../../event-emitter.service';    

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
@Input()totalPage;
@Input()pageNo ;
@Input() datainarry;
@Output() getLatestitem: EventEmitter <any> = new EventEmitter();

  constructor(private eventEmitterService: EventEmitterService) { }

  ngOnInit() {
  }
  moveToNext() {
    this.datainarry = false;
    if (this.pageNo < this.totalPage) {
      this.pageNo = this.pageNo + 1;
      this.getLatestitem.emit();
      this.eventEmitterService.onPageChange(this.pageNo);  
    }
  }
  moveToPrivious() {
    this.datainarry = false;
    if (this.pageNo > 1) {
      this.pageNo = this.pageNo - 1;
      this.getLatestitem.emit();
      this.eventEmitterService.onPageChange(this.pageNo);  
    }
  }
}
