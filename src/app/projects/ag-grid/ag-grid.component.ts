import { Component, OnInit, Input,ViewChild } from '@angular/core';
import { ShowHideCheckboxComponent } from '../show-hide-checkbox/show-hide-checkbox.component';
import { ItemsService } from "../items-list/items.service";
import { FieldService } from "../../fields/field.service";
@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.scss']
})

export class AgGridComponent implements OnInit {
  @ViewChild('showHideCheckboxComponent', { static: true }) showHideCheckboxComponent: ShowHideCheckboxComponent;

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
  @Input()  dbclicked;
  @Input()itemCulomns;
  @Input() fieldName;
  @Input() fieldType;
  @Input() fieldslable;
  @Input()  fieldTypeWithNo;
  @Input()  columnLoaded;
  constructor(
    private itemsService: ItemsService,
    private fieldService: FieldService,
  ) { }

  ngOnInit() {
  }
  setItemColumns(fields){
    fields.forEach(field => {
      if (!localStorage.getItem('gridHeader')) {
        if (field.type == 3) {
          this.itemCulomns.push({
            headerName: field.label,
            field: field.techName,
            editable: true,
            resizable: true,
            type:'date',
            cellEditor: 'DateEditorComponent',
            colId: field.techName,
            filter: 'FilterInputComponent',
            menuTabs: ['filterMenuTab'],
          });
        }
        if (field.type == 5) {
          if (field.optionsForSelect) {
            this.itemCulomns.push({
              headerName: field.label,
              field: field.techName,
              editable: true,
              resizable: true,
              colId: field.techName,
              type:'select',
              cellEditor: "agSelectCellEditor",
              filter: 'FilterInputComponent',
              menuTabs: ['filterMenuTab'],
              cellEditorParams: {
                values: field.optionsForSelect
              },
            });
          }
        }
        if (field.type == 1) {
          this.itemCulomns.push({
            headerName: field.label,
            field: field.techName,
            editable: true,
            resizable: true,
            colId: field.techName,
            type:'number',
            filter: 'FilterInputComponent',
            menuTabs: ['filterMenuTab'],
            valueGetter: function (params) {
              return params.data[field.techName];
            },
            valueSetter: function (params) {
              if (params.data[field.techName] !== params.newValue) {
                var data = parseInt(params.newValue)
                if (!data) {
                  params.newValue = parseInt(params.oldValue);
                } else {
                  params.data[field.techName] = parseInt(params.newValue);
                  return true;
                }

                return true;
              } else {
                return false;
              }
            }
          });
        }
        if (field.type != 5 && field.type != 3 && field.type != 1) {
          this.itemCulomns.push({
            headerName: field.label,
            field: field.techName,
            editable: true,
            colId: field.techName,
            resizable: true,
            type:'text',
            filter: 'FilterInputComponent',
            menuTabs: ['filterMenuTab'],
          });
        }
        this.fieldslable.push(field.label)
        this.fieldName.push(field.techName);
        if (field.type == 0) {
          this.fieldTypeWithNo.push({ type: "text", no: 0 })
          this.fieldType.push("text");
        } else if (field.type == 1) {
          this.fieldTypeWithNo.push({ type: "number", no: 1 })
          this.fieldType.push("number");
        } else if (field.type == 2) {
          this.fieldTypeWithNo.push({ type: "file", no: 2 })
          this.fieldType.push("file");
        } else if (field.type == 3) {
          this.fieldTypeWithNo.push({ type: "date", no: 3 })
          this.fieldType.push("date");
        } else if (field.type == 4) {
          this.fieldType.push("text");
        } else if (field.type == 5) {
          this.fieldTypeWithNo.push({ type: "select", no: 5 })
          this.fieldType.push("select");
        }
        else {
          this.fieldType.push("text");
        }

      }
      if (localStorage.getItem('gridHeader')) {
        this.fieldslable.push(field.label)
        this.fieldName.push(field.techName);
        if (field.type == 0) {
          this.fieldTypeWithNo.push({ type: "text", no: 0 })
          this.fieldType.push("text");
        } else if (field.type == 1) {
          this.fieldTypeWithNo.push({ type: "number", no: 1 })
          this.fieldType.push("number");
        } else if (field.type == 2) {
          this.fieldTypeWithNo.push({ type: "file", no: 2 })
          this.fieldType.push("file");
        } else if (field.type == 3) {
          this.fieldTypeWithNo.push({ type: "date", no: 3 })
          this.fieldType.push("date");
        } else if (field.type == 4) {
          this.fieldType.push("text");
        } else if (field.type == 5) {
          this.fieldTypeWithNo.push({ type: "select", no: 5 })
          this.fieldType.push("select");
        }
        else {
          this.fieldType.push("text");
        }
        this.itemCulomns = []
        this.itemCulomns = JSON.parse(localStorage.getItem('gridHeader'))
      }
    });
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
      this.showHideCheckboxComponent.hideSelectbox(event);
    } else if(this.SelectedRowData.length < this.TotalItems) {
      this.showHideCheckboxComponent.hideSelectbox(event);
    } else {
        this.showHideCheckboxComponent.showSelectbox(event);
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
  cellValueChanged(event){
    if (!event.newValue) {

      // this.ongetItemsByProjectWithPagination(this.pageNo); 
    } else {
      this.dbclicked = false;
      localStorage.setItem('pdata', 'true')
      var data
      Object.keys(event.data).forEach((key, index) => {
        if (event.data[key] == event.newValue) {
          if (event.colDef.cellEditor) {
            let date = new Date(event.newValue);
            data = {
              _id: event.data._id,
              projectId: event.data.projectId,
            }
            data[key] = date
          } else {
            data = {
              _id: event.data._id,
              projectId: event.data.projectId,
            }
            data[key] = event.newValue;
          }

        }
      })
      if (event.oldValue != event.newValue) {
        if (data._id) {
          this.itemsService
            .editItemByProject(data)
            .subscribe(result => {
              if (result) {
                //    this.ongetItemsByProjectWithPagination(this.pageNo); 
                this.dbclicked = false;
                localStorage.setItem('pdata', 'true')

              }
            });
        }
      }
    }
  }
}

