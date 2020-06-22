import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import flatpickr from 'flatpickr';
import * as moment from 'moment';
import {ICellEditorAngularComp} from '@ag-grid-community/angular';

@Component({
    selector: 'app-loading-overlay',
    template: `
        <div
                #flatpickrEl
                class="ag-input-wrapper custom-date-filter"
                role="presentation"
        >
            <input type="text" #eInput data-input [(ngModel)]="dateInputValue" style="width: 100%;"/>
        </div>
    `,
    styles: [
            `
            .custom-date-filter a {
                position: absolute;
                right: 20px;
                color: rgba(0, 0, 0, 0.54);
                cursor: pointer;
            }

            .custom-date-filter:after {
                position: absolute;
                content: '';
                display: block;
                font-weight: 400;
                font-family: 'Font Awesome 5 Free';
                right: 5px;
                pointer-events: none;
                color: rgba(0, 0, 0, 0.54);
            }
        `,
    ],
})

export class DateEditorComponent implements AfterViewInit, OnDestroy, ICellEditorAngularComp {
    @ViewChild('flatpickrEl', {read: ElementRef, static: false}) flatpickrEl: ElementRef;
    @ViewChild('eInput', {read: ElementRef, static: false}) eInput: ElementRef;
    private date: Date;
    private params: any;
    private picker: any;
    public datevalue;
    dateInputValue;

    agInit(params: any): void {
        this.params = params;
        this.dateInputValue = params.value;
    }

    ngAfterViewInit(): void {
        this.picker = flatpickr(this.flatpickrEl.nativeElement, {
            onChange: this.onDateChanged.bind(this),
            wrap: true
        });

        this.picker.calendarContainer.classList.add('ag-custom-component-popup');
    }

    ngOnDestroy() {

    }

    onDateChanged(selectedDates) {
        const date = selectedDates[0] || null;

        if (typeof date === 'undefined') {
            this.date = this.params.value;
            this.datevalue = this.params.value;
        } else {
            this.datevalue = moment(date, 'YYYY-MM-DD').format(this.params.option.options.dateFormat);
            this.date = date;
        }
    }

    getDate(): Date {
        return this.date;
    }

    getValue(): Date {
        if (typeof this.datevalue === 'undefined') {
            this.date = this.params.value;
            this.datevalue = this.params.value;
        }
        return this.datevalue;
    }

    setDate(date: Date): void {
        console.log(this.date)
        this.date = date || null;
        this.picker.setDate(date);
    }

    // setInputPlaceholder(placeholder: string): void {
    //   this.eInput.nativeElement.setAttribute('placeholder', placeholder);
    // }
}
