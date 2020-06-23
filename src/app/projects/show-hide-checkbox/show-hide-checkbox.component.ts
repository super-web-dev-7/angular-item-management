import {Component, OnInit, ViewChild, Input} from '@angular/core';

@Component({
    selector: 'app-show-hide-checkbox',
    templateUrl: './show-hide-checkbox.component.html',
    styleUrls: ['./show-hide-checkbox.component.scss']
})
export class ShowHideCheckboxComponent implements OnInit {
    @Input() pageNo;
    @Input() shorted;

    constructor() {
    }

    ngOnInit() {
    }

    hideSelectbox(event) {
        document.querySelectorAll('.ag-selection-checkbox').forEach((element) => {
            element.setAttribute('style', 'display: none');
        });
    }

    showSelectbox(event) {
        const data = document.querySelector('.ag-center-cols-clipper div[row-index="'
            + event.rowIndex.toString() + '"] .ag-selection-checkbox');
        if (data) {
            data.setAttribute('style', 'display: block');
        }
    }

    showCheckboxWithoutEvent() {
        document.querySelectorAll('.ag-selection-checkbox').forEach((element) => {
            element.setAttribute('style', 'display: block');
        });
    }

    onCustomHtmlLoad() {
        document.querySelectorAll('.ag-selection-checkbox').forEach((element) => {
            var x = Math.floor((Math.random() * 99999) + 1);
            if (element) {
                element.setAttribute('style', 'display: none');
                element.setAttribute('id', 'row' + this.pageNo + x);
            }
        });
    }
}
