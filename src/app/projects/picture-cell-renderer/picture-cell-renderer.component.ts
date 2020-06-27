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
    count: any;

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
        this.getCount();
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
            this.params.data[this.params.colDef.colId] = res.fields[this.params.colDef.cellEditorParams.option._id];
            this.getCount();
        });
    }

    showImageSliderPopUp() {
        const modalRef = this.modalService.open(ImageSliderComponent, { size: 'xl', centered: true });
        modalRef.componentInstance.fileLists = this.params.data[this.params.colDef.colId];
    }

    getCount() {
        let count;
        const fieldTechName = this.params.colDef.colId;
        if (this.params.data[fieldTechName] !== undefined) {
            if (typeof this.params.data[fieldTechName] === 'string') {
                count = '';
            } else {
                if (this.params.data[fieldTechName]) {
                    if (this.params.data[fieldTechName].length === 0) {
                        count = '';
                    } else if (this.params.data[fieldTechName].length === 1) {
                        count = '1 file';
                    } else {
                        count = this.params.data[fieldTechName].length + ' files';
                    }
                } else {
                    count = '';
                }
            }
        } else {
            count = '';
        }
        this.count = count;
    }
}
