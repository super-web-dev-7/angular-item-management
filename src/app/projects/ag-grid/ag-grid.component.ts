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
  hideFilterInput(){
  document.querySelectorAll(".ag-header-cell").forEach((element) => {
    var data4 = document.getElementById('serinp' + element.getAttribute("col-id"));
    if (data4) {
      data4.setAttribute("style", "display: none")

    }
  });
}
  onCustomHtmlLoad() {
    document.querySelectorAll(".ag-selection-checkbox").forEach((element) => {
      var x = Math.floor((Math.random() * 99999) + 1);
      if (element) {
        element.setAttribute("style", "display: none");
        element.setAttribute("id", 'row' + this.pageNo + x);
      }
    });
    // var ele = document.getElementsByClassName("ag-header-viewport")[0]
    // ele.addEventListener("click", event => {
    //   var iconClass = event['toElement'].getAttribute('class')
    //   var eventgrid = event['__agGridEventPath']
    //   event['path'].forEach(e => {
    //     if (e && e.getAttribute && e.getAttribute("col-id")) {
    //       if (this.oldArrow) {
    //         this.oldArrow.setAttribute("style", "display: none");
    //       }
    //       if (this.clickOnHeader == 0) {
    //         var errow_up = document.createElement("SPAN")
    //         if (errow_up) {
    //           errow_up.setAttribute("id", e.getAttribute("col-id"));
    //           errow_up.setAttribute("style", "display: block");
    //         }
    //         var errow_up_icon = document.createElement("I")
    //         if (errow_up_icon) {
    //           errow_up_icon.setAttribute("class", "fa fa-long-arrow-up");
    //         }
    //         var aa = e.appendChild(errow_up);
    //         aa.appendChild(errow_up_icon);
    //         this.oldArrow = errow_up
    //         this.sortOrder = 'ASC';
    //         this.headerField = e.getAttribute("col-id");
    //         if (iconClass != 'fa fa-bars' && iconClass != 'filterinput') {
    //           //  this.sortGridbyApi(this.sortOrder, this.headerField, event['__agGridEventPath'])
    //         }
    //       }
    //       if (this.clickOnHeader == 1) {
    //         var errow_up = document.createElement("SPAN")
    //         errow_up.setAttribute("id", e.getAttribute("col-id"));
    //         errow_up.setAttribute("style", "display: block");
    //         var errow_up_icon = document.createElement("I")
    //         errow_up_icon.setAttribute("class", "fa fa-long-arrow-down");
    //         var aa = e.appendChild(errow_up);
    //         aa.appendChild(errow_up_icon);
    //         this.oldArrow = errow_up
    //         this.sortOrder = 'DESC'
    //         this.headerField = e.getAttribute("col-id");
    //         if (iconClass != 'fa fa-bars' && iconClass != 'filterinput') {
    //           //this.sortGridbyApi(this.sortOrder, this.headerField, event['__agGridEventPath'])
    //         }
    //       }
    //       if (this.clickOnHeader == 2) {
    //         this.sortOrder = 'null';
    //         this.headerField = 'null';
    //         this.CustomeHeaderField = e.getAttribute("col-id");
    //         if (iconClass != 'fa fa-bars' && iconClass != 'filterinput') {
    //           //  this.sortGridbyApi(this.sortOrder, this.headerField, event['__agGridEventPath'])
    //         }
    //       }
    //     }
    //     this.clickOnHeader = this.clickOnHeader + 1;
    //     if (this.clickOnHeader == 3) {
    //       this.clickOnHeader = 0;

    //     }
    //   })
    // });
    // ele.addEventListener("mouseover", event => {
    //   document.querySelectorAll(".ag-header-cell").forEach((element) => {
    //     console.log('dsfdbfb')
    //     var id = element.getAttribute("col-id")
    //     var filterIcon = document.createElement("SPAN")
    //     var filteredIcon = document.createElement("SPAN")
    //     filterIcon.setAttribute("style", "display: none");
    //     filterIcon.setAttribute("id", 'serico' + element.getAttribute("col-id"));
    //     filteredIcon.setAttribute("style", "display: none");
    //     filteredIcon.setAttribute("id", 'filterd' + element.getAttribute("col-id"));
    //     var filterIcon_icon = document.createElement("I")
    //     var filteredIcon_icon = document.createElement("I")
    //     if (filterIcon_icon) {
    //       filterIcon_icon.setAttribute("class", "fa fa-bars");
    //     }
    //     if (filteredIcon_icon) {
    //       filteredIcon_icon.setAttribute("class", "fa fa-filter");
    //     }
    //     var aa = element.appendChild(filterIcon);
    //     var bb = element.appendChild(filteredIcon);
    //     aa.appendChild(filterIcon_icon);
    //     bb.appendChild(filteredIcon_icon);

    //     var filterDiv = document.createElement("DIV")
    //     filterDiv.setAttribute("class", "search_text_default");
    //     filterDiv.setAttribute("id", 'serinp' + element.getAttribute("col-id"));
    //     filterDiv.setAttribute("name", element.getAttribute("col-id"))
    //     filterDiv.setAttribute("style", "display: none");
    //     this.oldSearchId = 'serinp' + element.getAttribute("col-id");
    //     var filterInputBox = document.createElement("INPUT");
    //     filterInputBox.setAttribute("placeholder", 'search text....')
    //     filterInputBox.setAttribute("class", "filterinput")
    //     this.fields.forEach(row => {
    //       if (row.techName == id) {
    //         if (row.type == 1) {
    //           filterInputBox.setAttribute("type", "number")
    //         }
    //       }
    //     }); var filteredIcon_hr = document.createElement("HR")
    //     var dd = element.appendChild(filterDiv);

    //     dd.appendChild(filterInputBox);
    //     dd.appendChild(filteredIcon_hr);
    //   });
    //   event['path'].forEach(e => {
    //     if (e && e.getAttribute && e.getAttribute("col-id")) {
    //       document.querySelectorAll(".ag-header-cell").forEach((element) => {
    //         var data = document.getElementById('serico' + element.getAttribute("col-id"));
    //         if (data) {
    //           data.setAttribute("style", "display: none")
    //         }
    //       });
    //       var filterIcon_icon = document.getElementById('serico' + e.getAttribute("col-id"));
    //       if (filterIcon_icon) {
    //         filterIcon_icon.setAttribute("style", "display: block");

    //       }
    //       if (filterIcon_icon) {
    //         filterIcon_icon.addEventListener("click", event => {
    //           event['path'].forEach(e => {
    //             if (e && e.getAttribute && e.getAttribute("col-id")) {
    //               document.querySelectorAll(".ag-header-cell").forEach((element) => {
    //                 var data = document.getElementById('serinp' + element.getAttribute("col-id"));
    //                 if (data) {
    //                   data.setAttribute("style", "display: none")
    //                 }
    //               });
    //               var singleInput = document.getElementById('serinp' + e.getAttribute("col-id"))
    //               this.openedSearchedBoxId = 'serinp' + e.getAttribute("col-id");
    //               if (singleInput) {
    //                 singleInput.setAttribute("style", "display: block")
    //               }
    //               singleInput.addEventListener("keyup", event => {
    //                 var filrtedtext = document.getElementById('filterd' + e.getAttribute("col-id"))
    //                 filrtedtext.setAttribute("style", "display: block")
    //               })
    //             }
    //           })
    //         })
    //       }

    //     }
    //   })
    // });
    // let timeout = null;
    // document.addEventListener("keyup", event => {
    //   clearTimeout(timeout);
    //   if (event['path'][1].getAttribute('class') == 'search_text_default') {
    //     timeout = setTimeout(() => {
    //       var techename = event['path'][1].getAttribute('name')
    //       this.searchedValue = event.target['value']
    //       // this.filterGridbyApi(techename);
    //     }, 1000);

    //   }
    // })
    // var elim = document.getElementsByClassName("ag-row")[0]
    // elim.addEventListener("click", event => {
    //   document.querySelectorAll(".ag-header-cell").forEach((element) => {
    //     var data = document.getElementById('serinp' + element.getAttribute("col-id"));
    //     data.setAttribute("style", "display: none")
    //   });
    // })
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
     // console.log('event.data=======+++>', event.data)
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
      // console.log('indx==+++++>',)
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
