import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {ItemsService} from '../items-list/items.service';
import {EventEmitterService} from '@app/event-emitter.service';
import * as moment from 'moment';

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
    isDisable_Submit = false;

    constructor(private itemsService: ItemsService, private eventEmitterService: EventEmitterService
    ) {}

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
        jQuery('input[type="file"]').val('');
        this.SelectedSingleRowData = [];
        this.newItemPopup.config.ignoreBackdropClick = true;
        this.newItemPopup.config.backdrop = false;
        this.newItemPopup.config.keyboard = true;

        if (this.celldbclicked === true) {
            // this.newItemPopup.hide();
        } else {
            const popup = this.newItemPopup;
            this.SelectedSingleRowData = {...event.data};
            this.isDisable_Submit = this.submitValidation();

            if (event.type === 'rowClicked') {
                if (this.celldbclicked === false || this.celldbclicked === undefined) {
                    const db = this.celldbclicked;
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
            }

            const inputDatePickers = document.querySelectorAll('#TabEdit input[type="date"]');
            inputDatePickers.forEach(inputDatePicker => {
                let date = event.data[(<HTMLInputElement>inputDatePicker).name];
                const itemId = this.fieldName.indexOf((<HTMLInputElement>inputDatePicker).name)
                date = moment(new Date(date), 'YYYY-MM-DD').format(this.fields[itemId].options.dateFormat)
                if (date === 'Invalid date') {
                    date = '';
                }
                inputDatePicker.setAttribute('data-date', date);
            });

            this.fieldName.forEach(item => {
                this.data[item] = '';
            });
        }
    }

    onChangeSelectValue(event: any, date_format = 'YYYY-MM-DD') {
        if (event.target.type === 'date') {
            event.target.setAttribute('data-date', moment((<HTMLInputElement>event.target).value, 'YYYY-MM-DD').format(date_format));
        }
        this[event.target.name] = (<HTMLInputElement>event.target).value;
        this.SelectedSingleRowData[event.target.name] = (<HTMLInputElement>event.target).value;
        this.isDisable_Submit = this.submitValidation();
    }

    onEditItem(event) {
        event.preventDefault();
        if (event.target.className.includes('disabled') === true) {
            return;
        }
        this.fields.forEach(fields => {
            if (fields.type === 3) {
                const date = new Date(this[fields.techName]);
                this[fields.techName] = date.getTime();
            }
            if (this[fields.techName]) {
                this.data[fields.techName] = this[fields.techName];
            }
        });
        this.data['_id'] = this.SelectedSingleRowData['_id'];
        this.data['projectId'] = this.SelectedSingleRowData['projectId'];
        this.itemsService
            .editItemByProject(this.data)
            .subscribe(result => {
                this.eventEmitterService.onPageChange(this.pageNo);
            });

        this.SelectedSingleRowData = [];
        this.newItemPopup.hide();
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
