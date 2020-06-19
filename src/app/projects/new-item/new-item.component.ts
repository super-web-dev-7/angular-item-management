import {Component, OnInit, ViewChild, Input, Output, AfterViewInit} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {ItemsService} from '../items-list/items.service';
import {EventEmitter} from '@angular/core';
import {EventEmitterService} from '@app/event-emitter.service';
import * as moment from 'moment';
import {FieldService} from '@app/fields/field.service';

declare var $: any;

@Component({
    selector: 'app-new-item',
    templateUrl: './new-item.component.html',
    styleUrls: ['./new-item.component.scss']
})
export class NewItemComponent implements OnInit, AfterViewInit {
    @ViewChild('newItemPopup', {static: false}) newItemPopup: ModalDirective;
    @Input() projectId;
    @Input() pageNo;
    @Input() fieldType;
    @Input() fieldName;
    @Input() fields;
    @Input() fieldslable;
    @Output() getLatestitem: EventEmitter<any> = new EventEmitter();


    [key: string]: any;

    data = {};
    isDisable_Submit = true;

    constructor(
        private itemsService: ItemsService,
        private eventEmitterService: EventEmitterService,
        private fieldService: FieldService
    ) {
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        const component = this;
        $(document).ready(function () {
            // $('#new-item select').selectpicker();
            $(document).on('keyup', '.bs-searchbox input', function (e) {
                const selectElement = $(this).parent().parent().parent().find('select');
                const selectName = selectElement.attr('name') === undefined ?
                    selectElement.attr('ng-reflect-name')
                    : selectElement.attr('name');
                component.fields.forEach(field => {
                    if (field.techName === selectName) {
                        if (field.options.insertUnknown === true) {
                            const searchText = $(this).val();
                            if (searchText) {
                                let count = 0;
                                $(this).parent().parent().find('ul li').each(function (index, element) {
                                    if ($(element).text() === searchText) {
                                        count++;
                                    }
                                });
                                if (count !== 0) {
                                    $(this).parent().find('Button').remove('#add-option');
                                } else {
                                    if ($(this).parent().find('Button').length === 0) {
                                        $(this).parent().append('<Button class="btn btn-primary mt-3" id="add-option">Add Option</Button>');
                                    }
                                    $(this).parent().find('Button').text('Add { ' + searchText + ' } Option');
                                }
                            } else {
                                $(this).parent().find('Button').remove('#add-option');
                            }
                        }
                    }
                });
            });
            $(document).on('click', '#add-option', function (e) {
                const searchText = $(this).parent().find('input').val();
                const selectElement = $(this).parent().parent().parent().find('select');
                const selectElementName = selectElement.attr('name') === undefined ?
                    selectElement.attr('ng-reflect-name')
                    : selectElement.attr('name');
                component.updateField(selectElementName, searchText);
                // selectElement.prepend('<option>' + searchText + '</option>');
                selectElement.selectpicker();
                let selectElementValue = selectElement.selectpicker('val');
                if (typeof selectElementValue === 'string') {
                    selectElementValue = searchText;
                } else {
                    if (selectElementValue === null) {
                        selectElementValue = [];
                    }
                    selectElementValue.push(searchText);
                }
                selectElement.selectpicker('val', selectElementValue);
                selectElement.selectpicker('refresh');
                selectElement.selectpicker('val', selectElementValue);
            });
            $(document).on('click', 'button.dropdown-toggle', function () {
                $(this).parent().find('Button').remove('#add-option');
            });
        });
    }

    updateField(techName, searchText) {
        console.log('>>>>>>>>>>>>', techName, searchText);
        const newField = {};
        this.fields.forEach(field => {
            if (field.techName === techName) {
                newField['isRequired'] = field.isRequired;
                newField['label'] = field.label;
                newField['readonly'] = field.readonly;
                newField['type'] = field.type;
                newField['_id'] = field._id;
                const options = field.options;
                options.optionsForSelect.unshift({value: searchText});
                newField['options'] = options;
            }
        });
        this.fieldService.updateField(newField).subscribe(res => {
        });
    }

    show() {
        this.resetPopValues();
        this.newItemPopup.config.ignoreBackdropClick = true;
        this.newItemPopup.config.backdrop = false;
        this.newItemPopup.config.keyboard = true;
        this.newItemPopup.show();
    }

    hide() {
        this.resetPopValues();
        this.newItemPopup.hide();
    }

    submitValidation() {
        for (const field of this.fields) {
            if (field.readonly) {
                continue;
            }
            if (field.isRequired) {
                if (this[field.techName] === null
                    || this[field.techName] === undefined
                    || this[field.techName] === ''
                ) {
                    return true;
                }
            }
        }
        return false;
    }

    onChangeSelectValue(event: any, date_format = 'YYYY-MM-DD') {
        if (event.target.type === 'date') {
            event.target.setAttribute('data-date', moment((<HTMLInputElement>event.target).value, 'YYYY-MM-DD').format(date_format));
        }
        if (event.target.type === 'select-multiple') {
            this[event.target.name] = [];
            for (const selectedOption of event.target.selectedOptions) {
                this[event.target.name].push(selectedOption.value);
            }
        } else {
            this[event.target.name] = (<HTMLInputElement>event.target).value;
        }
    }

    onAddItem() {
        const _this = this;
        $('#new-item').validator().on('submit', function (event) {
            $('#new-item select').selectpicker('val', function () {
                console.log('value>>>>>', _this[$(this).attr('name')])
                return _this[$(this).attr('name')]
            });
            if (event.isDefaultPrevented()) {
                return;
            } else {
                _this.fields.forEach(item => {
                    if (_this[item.techName]) {
                        if (item.type === 3) {
                            const date = new Date(_this[item.techName]);
                            _this.data[item.techName] = date.getTime().toString();
                        } else {
                            _this.data[item.techName] = _this[item.techName];
                        }
                    }
                });
                _this.data['projectId'] = localStorage.getItem('ProjectId');
                _this.itemsService
                    .newItemByProject(localStorage.getItem('ProjectId'), _this.data)
                    .subscribe(result => {
                        _this.eventEmitterService.onPageChange(_this.pageNo);
                    });
                _this.resetPopValues();
                _this.newItemPopup.hide();
            }
        });
    }

    resetPopValues() {
        console.log(this.fields)
        this.fieldName.forEach(item => {
            this[item] = '';
        });
        $('#new-item select').selectpicker();
        $('#new-item select').selectpicker('val', null);
        $('#new-item').trigger('reset');
    }
}
