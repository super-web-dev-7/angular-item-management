import { Component, OnInit ,ViewChild, Input,Output} from '@angular/core';
import { ShowHideCheckboxComponent } from '../show-hide-checkbox/show-hide-checkbox.component';
import { EventEmitterService } from '../../event-emitter.service';    

@Component({
  selector: 'app-grid-events',
  templateUrl: './grid-events.component.html',
  styleUrls: ['./grid-events.component.scss']
})
export class GridEventsComponent implements OnInit {
  @ViewChild('showHideCheckboxComponent', { static: true }) showHideCheckboxComponent: ShowHideCheckboxComponent;

 @Input() SelectedRowData;
 @Input() TotalItems;
 @Input()agheader;
 @Input()agHeaderCheckbox;
 @Input()columnMoved;
 @Input()gridRows;
 @Input()RowIndex;
 @Input()datainarry;
 @Input()pageNo;
 @Input()dragEnterRowOrder;
 @Input()itemSelectionViewI;
 @Input()itemSelectionView;
 @Input()showAllCheckBox;
 @Input()agGridComponent;
 @Input() noOfSelectedRows;
// @Input() itemsService;
 @Input() celldbclicked;
  @Input() selectedRows;
  @Input() notreffress;

  constructor(private eventEmitterService: EventEmitterService) { }

  ngOnInit() {
  }
  onrowDataChanged(event) {
    this.columnMoved = false;
    if (this.SelectedRowData.length == 0) { this.showHideCheckboxComponent.hideSelectbox(event); } 
    else if (this.SelectedRowData.length < this.TotalItems) { this.showHideCheckboxComponent.hideSelectbox(event);} 
    else { this.showHideCheckboxComponent.showCheckboxWithouEvent(); }
    this.gridRows = event.api.rowModel.rowsToDisplay;
    if (this.RowIndex) {
      this.datainarry = true
      this.RowIndex.forEach((row, i) => {
        if (row.page == this.pageNo) {
          event.api.forEachNode(function (rowNode, index) {
            var idx = index
            for (let a = 0; a < row.rowIndex.length; a++) {
              if (idx == row.rowIndex[a]) { rowNode.setSelected(true); }
            }
          });
        }
        if (this.SelectedRowData.length >= this.TotalItems) {
          if (this.agHeaderCheckbox == true && this.agheader == true) { event.api.selectAll(); }
        }
      })
    }
  }

  onSelectionChanged(event) {
    var idx = this.RowIndex.findIndex(x => x.page == this.pageNo);
        if (idx > -1) {
      		if (this.RowIndex[idx].rowIndex.includes(event.rowIndex)) {
				if (event.node.selected == false) {
				  this.RowIndex[idx].rowIndex.splice(this.RowIndex[idx].rowIndex.indexOf(event.rowIndex), 1);
				}
			} else {
				this.RowIndex[idx].rowIndex.push(event.rowIndex);
			}
		} else {
		  this.RowIndex.push({ 'page': this.pageNo, 'rowIndex': [event.rowIndex], 'rowID': event.data._id })
		}
        this.gridRows = '';
        this.gridRows = event.api.rowModel.rowsToDisplay;
        if (this.pageNo == 1) {
            localStorage.setItem('gridRows', this.gridRows);
        }
        if (this.gridRows.findIndex(x => x.selected == true) > -1) {
            this.showAllCheckBox = true;
            var d = this.gridRows.filter(x => x.selected == true);
            this.selectedRows = d ? d.length : 0;
            this.showHideCheckboxComponent.showCheckboxWithouEvent();
        } else {
            if (this.notreffress == true) {
                if (this.gridRows.findIndex(x => x.selected == false) > -1) {
                    this.showAllCheckBox = true;
                    var d = this.gridRows.filter(x => x.selected == false);
                    this.selectedRows = d ? d.length : 0;
                }
            } else {
                this.selectedRows = this.SelectedRowData.length;
                if (this.SelectedRowData.length < this.TotalItems) {
                    if (this.RowIndex.length) {
                        if (this.RowIndex.filter(value => (value.page == this.pageNo && value.rowIndex.length > 0)).length > 0) {
                        } else {
                            this.showHideCheckboxComponent.hideSelectbox(event)
                        }
                    }
                } else {
                    this.showHideCheckboxComponent.showCheckboxWithouEvent();
                }
            }
        }
    if (event.node.selected == true) {
      this.add_array_element(event)
    }
    if (event.node.selected == false) {
      this.remove_array_element(this.SelectedRowData, event.data)
    }
    if (this.SelectedRowData.length > 0) {
      this.itemSelectionView = true;
      this.itemSelectionViewI = true;

    }
    if (this.SelectedRowData.length == 0) {
      this.itemSelectionView = false;
      this.itemSelectionViewI = false;
      this.showAllCheckBox = false;

    }
  }

  add_array_element(event) {
    var result = ''
    result = this.SelectedRowData.find(elim => elim.order === event.data.order);
    if (result == undefined && result != event.data.order) {
      event.data['page'] = this.pageNo
      this.SelectedRowData.push(event.data)
      this.noOfSelectedRows = this.SelectedRowData.length
      this.showHideCheckboxComponent.showCheckboxWithouEvent();
    }
  }
  remove_array_element(array, n) {
    var result = ''
    result = this.SelectedRowData.find(elim => elim._id === n._id);
    var index = this.SelectedRowData.indexOf(n);
    if (index > -1 && result['page'] == this.pageNo) {
      this.SelectedRowData.splice(index, 1);
    } else {
      var indx = this.SelectedRowData.indexOf(n);
      if (result['page'] == this.pageNo) {
        this.SelectedRowData.splice(0, 1);
      }
    }
    this.noOfSelectedRows = this.SelectedRowData.length
    return this.SelectedRowData;
  }
  oncellMouseOver(event) {
    if (!this.showAllCheckBox && this.noOfSelectedRows == 0) {
      if (this.SelectedRowData.length == 0) {
        this.showHideCheckboxComponent.hideSelectbox(event);
      }
      this.showHideCheckboxComponent.showSelectbox(event);
    } else {
      if (this.SelectedRowData.length < this.TotalItems) {
        if (this.RowIndex.length) {
          if (this.RowIndex.filter(value => (value.page == this.pageNo && value.rowIndex.length > 0)).length > 0) {
          } else {
            this.showHideCheckboxComponent.hideSelectbox(event);
          }
        }
        this.showHideCheckboxComponent.showSelectbox(event);
      }
    }
  }
}
