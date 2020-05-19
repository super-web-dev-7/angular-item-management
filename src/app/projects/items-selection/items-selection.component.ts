import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { ItemsService } from "../items-list/items.service";
import { FieldService } from "../../fields/field.service";
import { EventEmitterService } from '../../event-emitter.service';    

import { iif } from 'rxjs';
import { retry } from 'rxjs/operators';
@Component({
  selector: 'app-items-selection',
  templateUrl: './items-selection.component.html',
  styleUrls: ['./items-selection.component.scss']
})
export class ItemsSelectionComponent implements OnInit {
  @ViewChild('selectedPopup', { static: true }) selectedPopup: ModalDirective;
  @Input() pageNo;
  @Input() projectId;
  @Input() fieldType;
  @Input() fieldName;
  @Input() fieldslable;
  @Input() SelectedRowData;
  @Input() fields;
  @Output() getLatestitem: EventEmitter<any> = new EventEmitter();
  @Output() cleanCheckboxes: EventEmitter<any> = new EventEmitter();
  copyData = []
  itemCulomns = [];
  itemFields;
  items;
  defaultColDef;
  test = 0;
  columnLoaded = false;
  rowSelection = "";
  showAllCheckBox = false;
  selectedRows = 0;
  gridRows;
  copyDataLength = [];
  gridApi;
  Updateditems;
  SelectedRowDatalength = []
  pastType = '';
  SelectedSingleRowData;
  copyDataLengthcount = 0
  afterPastPageNotReffress = false
  pastetype = ''
  @Input() itemSelectionView ;
  @Input() itemSelectionViewI;
  constructor(
    private itemsService: ItemsService,
    private fieldService: FieldService,
    private eventEmitterService: EventEmitterService

  ) {

  }
  ngOnInit() {
    this.copyDataLength = JSON.parse(localStorage.getItem('copydata'));
    this.pastetype= localStorage.getItem('pastetype')
    if(this.copyDataLength){
      this.copyDataLengthcount = this.copyDataLength.length
    }
  }

  show() {
    this.itemSelectionView = true;
    this.selectedPopup.show();
    this.SelectedRowData
  }
hide(){
  this.itemSelectionView = false;
  this.itemSelectionViewI  = false;
}
  copyItems(val) {
    localStorage.setItem('pastetype', 'copy')
    this.copyData = this.SelectedRowData;
    this.pastetype = 'copy';
    localStorage.setItem('copydata', JSON.stringify(this.copyData));
    this.copyDataLength = JSON.parse(localStorage.getItem('copydata'))
    this.copyDataLengthcount = this.copyDataLength.length
  }
  
  cut() {
    this.pastetype = 'cut';
    localStorage.setItem('pastetype', 'cut')
    this.copyData = this.SelectedRowData;
    localStorage.setItem('copydata', JSON.stringify(this.copyData));
    this.copyDataLength = JSON.parse(localStorage.getItem('copydata'))
    this.copyDataLengthcount = this.copyDataLength.length
  }

  paste() {
    this.afterPastPageNotReffress = true;
    if (this.pastType = 'copy') {
      this.copyData = (JSON.parse(localStorage.getItem('copydata')));
      var data = {
        itemIds: [],
        projectId: {}
      }
      for (let i = 0; i < this.copyData.length; i++) {
        data['itemIds'].push(this.copyData[i]._id)
        data.projectId = this.projectId
      }
      if (this.copyData.length > 0) {
        this.itemsService
          .Paste(data, this.pastType)
          .subscribe((result: any) => {
            if (result) {
              this.Updateditems = result;
              this.itemsService
                .getItemsByProject(this.projectId)
                .subscribe((items: any) => {
                  localStorage.removeItem('copydata')
                  this.getLatestitem.emit();
                  this.eventEmitterService.onPageChange('');
                  // document.getElementById('popupid').hidden = true
                  this.copyData = []
                  this.copyDataLengthcount = 0
                  localStorage.setItem('notreffress', 'ture')

                });
            }

          });
      }
    }
    if (this.pastType == 'cut') {
      this.copyData = (JSON.parse(localStorage.getItem('copydata')));
      var data = {
        itemIds: [],
        projectId: {}
      }
      for (let i = 0; i < this.copyData.length; i++) {
        data['itemIds'].push(this.copyData[i]._id)
        data.projectId = this.projectId
      }
      if (this.copyData.length > 0) {
        this.itemsService
          .Paste(data, this.pastType)
          .subscribe((result: any) => {
            if (result) {
              this.Updateditems = result;
              this.itemsService
                .getItemsByProject(this.projectId)
                .subscribe((items: any) => {
                  this.items = items;
                  this.getLatestitem.emit();
                  this.eventEmitterService.onPageChange('');

                  // document.getElementById('popupid').hidden = true
                  this.copyData = []
                  this.copyDataLengthcount = 0
                  localStorage.setItem('notreffress', 'true')

                });
            }
          });
      }

    }

  }

  deleteItems() {
    var data1 =
    {
      itemIds: []
    }
    for (let i = 0; i < this.SelectedRowData.length; i++) {
      data1['itemIds'].push(this.SelectedRowData[i]._id)
    }

    this.itemsService
      .deleteItemsByid(data1)
      .subscribe((result) => {
        if (result) {
              this.getLatestitem.emit('delete');  
              this.eventEmitterService.onPageChange(this.pageNo);
          
              this.SelectedRowData = []
              // document.getElementById('popupid').hidden = true
        }
      });
  }


  duplicateItems() {
   
    var data = {
      itemIds: [],
      projectId: {}
    }
    for (let i = 0; i < this.SelectedRowData.length; i++) {
      data['itemIds'].push(this.SelectedRowData[i]._id)
      data.projectId = this.SelectedRowData[i].projectId
    }
    if (this.SelectedRowData.length > 0) {
      this.itemsService
        .duplicateItems(data)
        .subscribe((result: any) => {
          if (result) {
            this.itemsService
              .getItemsByProject(this.projectId)
              .subscribe((items: any) => {
                 this.getLatestitem.emit('duplicate');
                this.eventEmitterService.onPageChange(this.pageNo);
              });
          }
        });
    }

  }
  remove_array_element(array, n) {
    var index = array.indexOf(n);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  }

  callgetLatestitem(e) {
    // this.closePopup()
    this.getLatestitem.emit(e);
    this.eventEmitterService.onPageChange(e);

  }

}
