import { Component, OnInit, Input } from '@angular/core';
import { CheckboxRendererComponent } from '../checkbox-renderer/checkbox-renderer.component';

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.scss']
})
export class AgGridComponent implements OnInit {
  test = 0;
  @Input() pageNo;
  @Input() clickOnHeader;
  @Input() oldArrow;
  @Input() sortOrder;
  @Input() headerField;
  @Input() CustomeHeaderField;
  @Input() oldSearchId;
  @Input() fields;
  @Input() openedSearchedBoxId;
  @Input() searchedValue;
  @Input() agheader;
  @Input() agHeaderCheckbox;
  @Input() RowIndex;
  @Input() gridRows;
  @Input() showAllCheckBox;
  @Input() selectedRows;
  @Input() notreffress;
  @Input() SelectedRowData;
  @Input() TotalItems;
  @Input() noOfSelectedRows;
  @Input() itemSelectionView;
  @Input() columnMoved;
  @Input()  datainarry;
  constructor() { }

  hideSelectbox(event) {
    document.querySelectorAll(".ag-selection-checkbox").forEach((element) => {
      element.setAttribute("style", "display: none");
    });
  }
  showSelectbox(event) {
    document.querySelectorAll(".ag-selection-checkbox")[event.node.id]
    var data = document.querySelectorAll(".ag-selection-checkbox")[event.node.id];
    if (data) {
      data.setAttribute("style", "display: block");
    }
  }
  showCheckboxWithouEvent() {
    document.querySelectorAll(".ag-selection-checkbox").forEach((element) => {
      element.setAttribute("style", "display: block");
    })
  }

  ngOnInit() {
  }
  onCustomHtmlLoad() {
    document.querySelectorAll(".ag-selection-checkbox").forEach((element) => {
      var x = Math.floor((Math.random() * 99999) + 1);
      if (element) {
        element.setAttribute("style", "display: none");
        element.setAttribute("id", 'row' + this.pageNo + x);
      }
    });
  
    // var agHeader = document.getElementsByClassName("ag-header-select-all")[0]
    // agHeader.addEventListener("click", event => {
    //   var hederEliment = event['toElement'].getAttribute('class')
    //   if (hederEliment == 'ag-icon ag-icon-checkbox-unchecked') {
    //     this.agheader = true;
    //     this.agHeaderCheckbox = true;
    //   }
    //   if (hederEliment == 'ag-icon ag-icon-checkbox-checked') {
    //     this.agheader = false;
    //     this.agHeaderCheckbox = false;
    //   }
    // })
  }

  SelectionChange(event) {
    // document.getElementById('popupid').hidden = false
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
      this.showCheckboxWithouEvent();
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
              this.hideSelectbox(event)
            }
          }
        } else {
          this.showCheckboxWithouEvent();
        }
      }
    }

  }

  add_array_element(event){
    var result = ''
    result = this.SelectedRowData.find(elim => elim.order === event.data.order );
   if (result == undefined && result != event.data.order) {
     event.data['page'] = this.pageNo
   this.SelectedRowData.push(event.data)

   this.noOfSelectedRows = this.SelectedRowData.length

   }
  }

  remove_array_element(array, n) {
    var  result =''
    result = this.SelectedRowData.find(elim => elim._id === n._id);
    var index = this.SelectedRowData.indexOf(n);
    if (index > -1 && result['page'] == this.pageNo) {
      this.SelectedRowData.splice(index, 1);
    } else {
      var indx = this.SelectedRowData.indexOf(n);
       if(result['page'] == this.pageNo){
        this.SelectedRowData.splice(0, 1);
       }
    }
    return this.SelectedRowData;
  }
  RowDataChanges(event){
    this.columnMoved = false;
    if (this.SelectedRowData.length == 0) {
      this.hideSelectbox(event);
    } else if(this.SelectedRowData.length < this.TotalItems) {
      this.hideSelectbox(event);
    } else {
        this.showSelectbox(event);
    }
    this.gridRows = event.api.rowModel.rowsToDisplay;
    if (this.RowIndex) {
      this.datainarry = true
      this.RowIndex.forEach((row, i) => {
        if (row.page == this.pageNo) {
          event.api.forEachNode(function (rowNode, index) {
            var idx = index
            for (let a = 0; a < row.rowIndex.length; a++) {
              if (idx == row.rowIndex[a]) {
                rowNode.setSelected(true);
              }
            }
          });
        }
		if(this.SelectedRowData.length >= this.TotalItems){
			if (this.agHeaderCheckbox == true && this.agheader == true) {				
				event.api.selectAll();
			}
		}
      })
    }
  }
}
