import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {ItemsService} from '../items-list/items.service';
import {EventEmitterService} from '@app/event-emitter.service';
import * as moment from 'moment';
import * as jQuery from 'jquery';

declare var $: any;

@Component({
    selector: 'app-edit-single-item',
    templateUrl: './edit-single-item.component.html',
    styleUrls: ['./edit-single-item.component.scss']
})

export class EditSingleItemComponent implements OnInit {
    @ViewChild('newItemPopup', {static: false}) newItemPopup: ModalDirective;
    @Input() projectId;
    @Input() pageNo;
    @Input() fieldType;
    @Input() fieldName;
    @Input() celldbclicked;
    @Input() fields;
    @Input() fieldslable;
    @Output() getLatestitem: EventEmitter<any> = new EventEmitter();

    [key: string]: any;

    data = {};
    items;
    comment;
    SelectedSingleRowData = [];
    selectedRowComments = [];
    reverse = false;
    commentEditingMode = false;
    EditableCommentId;

    constructor(private itemsService: ItemsService, private eventEmitterService: EventEmitterService
    ) {
    }

    ngOnInit() {
        let tabcontent;
        tabcontent = document.getElementById('TabComment');
        if (tabcontent) {
            tabcontent.style.display = 'none';
        }

    }

    getItems(itemId) {
        const itemcomment = [];
        this.itemsService
            .getItemsByProject(this.projectId)
            .subscribe((items: any) => {
                const found = items.find(element => element._id === itemId);
                this.selectedRowComments = found.comments.reverse();
                this.selectedRowComments['itemid'] = found._id;
            });
    }

    submitValidation() {
        for (const field of this.fields) {
            if (field.readonly) {
                continue;
            }
            if (field.isRequired) {
                if (this.SelectedSingleRowData[field.techName] === null
                    || this.SelectedSingleRowData[field.techName] === undefined
                    || this.SelectedSingleRowData[field.techName] === ''
                ) {
                    return true;
                }
            }
        }
        return false;
    }

    show(event) {
        this.fieldName.forEach(item => {
            this.data[item] = '';
            this[item] = '';
        });
        $('#edit-form input[type="file"]').val('');
        $('#edit-form').validator('destroy');
        // this.SelectedSingleRowData = [];
        this.newItemPopup.config.ignoreBackdropClick = true;
        this.newItemPopup.config.backdrop = false;
        this.newItemPopup.config.keyboard = true;

        if (this.celldbclicked === true) {
            // this.newItemPopup.hide();
        } else {
            $('#edit-form select').selectpicker();
            $('#edit-form select').selectpicker('val', null);
            const popup = this.newItemPopup;
            this.SelectedSingleRowData = {...event.data};

            if (event.type === 'rowClicked') {
                if (this.celldbclicked === false || this.celldbclicked === undefined) {
                    setTimeout(function () {
                        if (localStorage.getItem('pdata') === 'true') {
                            popup.show();
                        }
                        if (localStorage.getItem('pdata') === 'false') {
                        }
                    }, 300);
                }
            }
            if (this.SelectedSingleRowData) {
                this.selectedRowComments = this.SelectedSingleRowData['comments'];
                this.selectedRowComments['itemid'] = this.SelectedSingleRowData['_id'];
                if (this.reverse === false) {
                    this.selectedRowComments.reverse();
                    this.reverse = true;
                }
                this.fields.forEach(field => {
                    if (field.type === 5) {
                        $('#edit-form select[name="' + field.techName + '"]')
                            .selectpicker('val', this.SelectedSingleRowData[field.techName]);
                    }
                });
            }

            const inputDatePickers = document.querySelectorAll('#edit-form input[type="date"]');
            inputDatePickers.forEach(inputDatePicker => {
                let date = event.data[(<HTMLInputElement>inputDatePicker).name];
                const itemId = this.fieldName.indexOf((<HTMLInputElement>inputDatePicker).name);
                date = moment(new Date(date), 'YYYY-MM-DD').format(this.fields[itemId].options.dateFormat);
                if (date === 'Invalid date') {
                    date = '';
                }
                inputDatePicker.setAttribute('data-date', date);
                this.SelectedSingleRowData[(<HTMLInputElement>inputDatePicker).name] = date;
                (<HTMLInputElement>inputDatePicker).value = date;
            });

            $('#edit-form button[type="submit"]').removeClass('disabled');
        }
    }

    onChangeSelectValue(event: any, date_format = 'YYYY-MM-DD') {
        if (event.target.type === 'date') {
            event.target.setAttribute('data-date', moment((<HTMLInputElement>event.target).value, 'YYYY-MM-DD').format(date_format));
        }

        if (event.target.type === 'select-multiple') {
            this[event.target.name] = [];
            this.SelectedSingleRowData[event.target.name] = [];
            for (const selectedOption of event.target.selectedOptions) {
                this[event.target.name].push(selectedOption.value);
                this.SelectedSingleRowData[event.target.name].push(selectedOption.value);
            }
        } else {
            this[event.target.name] = (<HTMLInputElement>event.target).value;
            this.SelectedSingleRowData[event.target.name] = (<HTMLInputElement>event.target).value;
        }
    }

    onEditItem(event) {
        const _this = this;
        $('#edit-form').validator();
        $('#edit-form select').selectpicker('val', function () {
            return _this[$(this).attr('name')];
        });
        const validator = $('#edit-form').data('bs.validator');
        validator.validate();
        if (!validator.hasErrors()) {
            _this.fields.forEach(field => {
                if (field.type === 3) {
                    const date = new Date(_this[field.techName]);
                    _this[field.techName] = date.getTime();
                }
                if (_this[field.techName]) {
                    _this.data[field.techName] = _this[field.techName];
                }
            });
            _this.data['_id'] = _this.SelectedSingleRowData['_id'];
            _this.data['projectId'] = _this.SelectedSingleRowData['projectId'];
            _this.itemsService
                .editItemByProject(_this.data)
                .subscribe(result => {
                    _this.eventEmitterService.onPageChange(_this.pageNo);
                });

            _this.SelectedSingleRowData = [];
            _this.data = {};
            _this.newItemPopup.hide();
        } else {
            return;
        }
    }

    addComment() {
        if (this.SelectedSingleRowData) {
            const data = {
                itemId: this.SelectedSingleRowData['_id'],
                comment: this.comment
            };
            this.itemsService
                .addComment(data, this.SelectedSingleRowData['_id'])
                .subscribe(result => {
                    if (result) {
                        this.getItems(data.itemId);
                        this.comment = '';
                        this.getLatestitem.emit();

                    }
                });
        }
    }

    editComment(id) {
        this.commentEditingMode = true;
        this.EditableCommentId = id;
    }

    mouseOutFromTaxtArea(event, commentID, comment) {
        const data = {
            itemId: this.selectedRowComments['itemid'],
            commentId: commentID,
            comment: event.target.value
        };
        this.itemsService
            .updateComment(data)
            .subscribe(result => {
                if (result) {
                    this.getItems(data.itemId);
                    this.commentEditingMode = false;
                }

            });
    }

    deleteComment(commentID) {
        const data = {
            itemId: this.selectedRowComments['itemid'],
            commentId: commentID,
        };
        this.itemsService
            .deleteComment(data)
            .subscribe(result => {
                if (result) {
                    this.getItems(data.itemId);
                }
            });
    }

    closeModel(event) {
        const selectedElement = document.querySelector('.ag-body-viewport div[role="rowgroup"] div[role="row"][selected="true"]');
        if (selectedElement) {
            selectedElement.setAttribute('selected', 'false');
        }
        this.newItemPopup.hide();
    }
}
