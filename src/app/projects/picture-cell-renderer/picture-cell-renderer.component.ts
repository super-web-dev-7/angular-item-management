import {Component, OnInit} from '@angular/core';
import {IFilterParams} from '@ag-grid-community/all-modules';

@Component({
    selector: 'app-picture-cell-renderer',
    templateUrl: './picture-cell-renderer.component.html',
    styleUrls: ['./picture-cell-renderer.component.scss']
})
export class PictureCellRendererComponent implements OnInit {
    params: any;
    eGui: any;

    constructor() {
    }

    ngOnInit() {
    }

    init(params: IFilterParams): void {
        // console.log(params);
        this.params = params;
        const tempDiv = document.createElement('div');
        if (this.params.value) {
            tempDiv.innerHTML =
                '<div class="d-flex flex-column align-items-center"><a style="line-height: 20px">' + this.params.value + '</a>' +
                '<button class="btn btn-light p-0" (click)="imageupload.click()">Upload</button>' +
                '<input type="file" #imageupload (change)="onChange($event)" class="hidden">' +
                '</div>';
        } else {
            tempDiv.innerHTML =
                '<div class="d-flex flex-column align-items-center justify-content-center h-100">' +
                '<button class="btn btn-light p-0" onClick="onChange($event)">Upload</button>' +
                '</div>' +
                '<input type="file" (change)="onChange($event)">';
        }
        this.eGui = tempDiv.firstChild;
    }

    getGui() {
        return this.eGui;
    }

    onChange(event) {
        // console.log(event);
    }

}
