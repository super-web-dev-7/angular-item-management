import {Component, OnInit} from '@angular/core';
import {ItemsService} from '@app/projects/items-list/items.service';
import {EventEmitterService} from '@app/event-emitter.service';
import {ICellRendererAngularComp} from '@ag-grid-community/angular';
import {ImageSliderComponent} from '@app/projects/picture-cell-renderer/image-slider/image-slider.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-picture-cell-renderer',
    templateUrl: './picture-cell-renderer.component.html',
    styleUrls: ['./picture-cell-renderer.component.scss']
})
export class PictureCellRendererComponent implements OnInit, ICellRendererAngularComp {
    params: any;

    constructor(
        private itemsService: ItemsService,
        private eventEmitterService: EventEmitterService,
        private modalService: NgbModal
    ) {
    }

    ngOnInit() {
    }

    agInit(params: any): void {
        this.params = params;
    }

    refresh(params: any): boolean {
        return false;
    }

    onChangeInput(event) {
        const data = {
            itemId: this.params.data._id,
            picture: event.target.files,
            fieldTechName: this.params.colDef.colId
        };
        this.itemsService.uploadImage(data).subscribe(res => {
            this.eventEmitterService.onPageChange(this.params.value.pageNo);
        });
    }

    showImageSliderPopUp() {
        const modalRef = this.modalService.open(ImageSliderComponent, { size: 'xl', centered: true });
        modalRef.componentInstance.fileLists = this.params.data[this.params.colDef.colId];
    }

}
