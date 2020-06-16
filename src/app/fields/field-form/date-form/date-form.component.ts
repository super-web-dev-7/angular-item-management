import {Component, OnInit, Input, SimpleChanges, SimpleChange, OnChanges} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import * as moment from 'moment';

@Component({
    selector: 'app-date-form',
    templateUrl: './date-form.component.html',
    styleUrls: ['./date-form.component.scss']
})
export class DateFormComponent implements OnInit, OnChanges {

    @Input()
    public fieldForm: FormGroup;
    @Input()
    public field;

    private formatOptions;

    public dateForm: FormGroup = this.initDateForm();

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.fieldForm.setControl('options', this.dateForm);
        this.formatOptions = this.createDateFormatOptions();
    }

    createDateFormatOptions() {
        const date = new Date();
        const formatOptions = [];
        formatOptions.push({value: 'YYYY-MM-DD', label: `Standard (${moment(date).format('YYYY-MM-DD')})`});
        formatOptions.push({value: 'MMM D, YYYY', label: `Long (${moment(date).format('MMM D, YYYY')})`});
        formatOptions.push({value: 'MMM D, YYYY h:mm:ss a', label: `Long with time (${moment(date).format('MMM D, YYYY h:mm:ss a')})`});
        formatOptions.push({value: 'MM/DD/YYY', label: `Short (${moment(date).format('MM/DD/YYYY')})`});
        formatOptions.push({value: 'MM/DD/YYY', label: `Short day before month (${moment(date).format('DD/MM/YYYY')})`});
        return formatOptions;
    }

    ngOnChanges(changes: SimpleChanges) {
        const field: SimpleChange = changes.field;
        this.initFormByField(field.currentValue);
    }

    initDateForm() {
        return this.fb.group({
            dateFormat: ['']
        });
    }

    initFormByField(field) {
        let options = {};
        if (field.options) {
            options = field.options;
        }
        this.dateForm.patchValue(options);
    }
}
