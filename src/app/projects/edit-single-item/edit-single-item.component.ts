import {Component, OnInit, ViewChild, Input, ɵConsole, Output, EventEmitter} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {ItemsService} from '../items-list/items.service';
import {EventEmitterService} from '../../event-emitter.service';

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
    // @Input() SelectedSingleRowData;
    @Input() celldbclicked;
    @Input() fields;
    @Input() fieldslable;
    @Output() getLatestitem: EventEmitter<any> = new EventEmitter();

    [key: string]: any;

    data = {};
    items;
    data1 = {};
    comment;
    SelectedSingleRowData = [];
    selectedRowComments = [];
    fieldWithData = [];
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

    show(event) {
        this.newItemPopup.config.ignoreBackdropClick = true;
        this.newItemPopup.config.backdrop = false;
        this.newItemPopup.config.keyboard = true;
        // this.git getItems(event.data._id)
        if (this.celldbclicked === true) {
            // this.newItemPopup.hide();
        } else {
            const popup = this.newItemPopup;
            this.SelectedSingleRowData = event.data;
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
            this.fieldName.forEach(item => {
                this.data[item] = '';
            });
        }

    }

    onChangeSelectValue(event: any) {
        this[event.target.name] = (<HTMLInputElement>event.target).value;
    }

    onFieldValuek(event: any) {
        this[event.target.name] = (<HTMLInputElement>event.target).value;
    }

    onEditItem() {
        this.fields.forEach(fields => {
            if (fields.type === 3) {
                const date = new Date(this[fields.techName]);
                const dateTimeStamp = date.getTime();
                this[fields.techName] = dateTimeStamp;
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


