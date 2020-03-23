"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var items_service_1 = require("./items.service");
var field_service_1 = require("../../fields/field.service");
// import { AllModules } from "@ag-grid-enterprise/all-modules";
// import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
// import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";
var ItemsListComponent = /** @class */ (function () {
    function ItemsListComponent(itemsService, fieldService) {
        this.itemsService = itemsService;
        this.fieldService = fieldService;
        this.index = [];
        this.copyDataLength = [];
        this.itemCulomns = [];
        this.itemCulomns1 = [];
        this.test = 0;
        this.columnLoaded = false;
        this.fieldName = [];
        this.fieldType = [];
        this.rowSelection = "";
        this.showAllCheckBox = false;
        this.selectedRows = 0;
        this.SelectedRowData = [];
        this.noOfSelectedRows = 0;
        this.pastType = '';
        this.fieldslable = [];
        this.notreffress = false;
        this.data = {};
        this.fieldTypeWithNo = [];
        this.pageNo = 1;
        this.clickOnHeader = 0;
        this.getShow = new core_1.EventEmitter();
        this.itemFrom = 0;
        this.ItemTO = 0;
        this.RowIndex = [];
        this.agHeaderCheckbox = false;
    }
    ItemsListComponent.prototype.onGridReady = function (event) {
        var _this = this;
        localStorage.removeItem('gridHeader');
        this.ongridEventData = event;
        this.gridApi = event.api;
        this.gridRows = event.api.rowModel.rowsToDisplay;
        this.gridApi.setSuppressClipboardPaste(false);
        document.querySelectorAll(".ag-selection-checkbox").forEach(function (element) {
            var x = Math.floor((Math.random() * 99999) + 1);
            element.setAttribute("style", "display: none");
            element.setAttribute("id", 'row' + _this.pageNo + x);
        });
        var ele = document.getElementsByClassName("ag-header-viewport")[0];
        ele.addEventListener("click", function (event) {
            console.log(event);
            var iconClass = event['toElement'].getAttribute('class');
            var eventgrid = event['__agGridEventPath'];
            event['path'].forEach(function (e) {
                if (e && e.getAttribute && e.getAttribute("col-id")) {
                    if (_this.oldArrow) {
                        _this.oldArrow.setAttribute("style", "display: none");
                    }
                    if (_this.clickOnHeader == 0) {
                        var errow_up = document.createElement("SPAN");
                        errow_up.setAttribute("id", e.getAttribute("col-id"));
                        errow_up.setAttribute("style", "display: block");
                        var errow_up_icon = document.createElement("I");
                        errow_up_icon.setAttribute("class", "fa fa-long-arrow-up");
                        var aa = e.appendChild(errow_up);
                        aa.appendChild(errow_up_icon);
                        _this.oldArrow = errow_up;
                        _this.sortOrder = 'ASC';
                        _this.headerField = e.getAttribute("col-id");
                        if (iconClass != 'fa fa-bars' && iconClass != 'filterinput') {
                            console.log('iconClass=+++.', iconClass);
                            _this.sortGridbyApi(_this.sortOrder, _this.headerField, event['__agGridEventPath']);
                        }
                    }
                    if (_this.clickOnHeader == 1) {
                        var errow_up = document.createElement("SPAN");
                        errow_up.setAttribute("id", e.getAttribute("col-id"));
                        errow_up.setAttribute("style", "display: block");
                        var errow_up_icon = document.createElement("I");
                        errow_up_icon.setAttribute("class", "fa fa-long-arrow-down");
                        var aa = e.appendChild(errow_up);
                        aa.appendChild(errow_up_icon);
                        _this.oldArrow = errow_up;
                        _this.sortOrder = 'DESC';
                        _this.headerField = e.getAttribute("col-id");
                        if (iconClass != 'fa fa-bars' && iconClass != 'filterinput') {
                            console.log('iconClass=+++.', iconClass);
                            _this.sortGridbyApi(_this.sortOrder, _this.headerField, event['__agGridEventPath']);
                        }
                    }
                    if (_this.clickOnHeader == 2) {
                        _this.sortOrder = 'null';
                        _this.headerField = 'null';
                        console.log('sdsds=+>', _this.agheader);
                        if (iconClass != 'fa fa-bars' && iconClass != 'filterinput') {
                            console.log('iconClass=+++.', iconClass);
                            _this.sortGridbyApi(_this.sortOrder, _this.headerField, event['__agGridEventPath']);
                        }
                    }
                }
                _this.clickOnHeader = _this.clickOnHeader + 1;
                if (_this.clickOnHeader == 3) {
                    _this.clickOnHeader = 0;
                }
            });
        });
        document.querySelectorAll(".ag-header-cell").forEach(function (element) {
            var id = element.getAttribute("col-id");
            console.log('col-id', id);
            var filterIcon = document.createElement("SPAN");
            var filteredIcon = document.createElement("SPAN");
            filterIcon.setAttribute("style", "display: none");
            filterIcon.setAttribute("id", 'serico' + element.getAttribute("col-id"));
            filteredIcon.setAttribute("style", "display: none");
            filteredIcon.setAttribute("id", 'filterd' + element.getAttribute("col-id"));
            var filterIcon_icon = document.createElement("I");
            var filteredIcon_icon = document.createElement("I");
            filterIcon_icon.setAttribute("class", "fa fa-bars");
            filteredIcon_icon.setAttribute("class", "fa fa-filter");
            var aa = element.appendChild(filterIcon);
            var bb = element.appendChild(filteredIcon);
            aa.appendChild(filterIcon_icon);
            bb.appendChild(filteredIcon_icon);
            var filterDiv = document.createElement("DIV");
            filterDiv.setAttribute("class", "search_text_default");
            filterDiv.setAttribute("id", 'serinp' + element.getAttribute("col-id"));
            filterDiv.setAttribute("style", "display: none");
            _this.oldSearchId = 'serinp' + element.getAttribute("col-id");
            var filterInputBox = document.createElement("INPUT");
            filterInputBox.setAttribute("placeholder", 'search text....');
            filterInputBox.setAttribute("class", "filterinput");
            _this.fields.forEach(function (row) {
                if (row.techName == id) {
                    if (row.type == 1) {
                        filterInputBox.setAttribute("type", "number");
                    }
                }
            });
            var filteredIcon_hr = document.createElement("HR");
            var dd = element.appendChild(filterDiv);
            dd.appendChild(filterInputBox);
            dd.appendChild(filteredIcon_hr);
        });
        ele.addEventListener("mouseover", function (event) {
            event['path'].forEach(function (e) {
                if (e && e.getAttribute && e.getAttribute("col-id")) {
                    document.querySelectorAll(".ag-header-cell").forEach(function (element) {
                        var data = document.getElementById('serico' + element.getAttribute("col-id"));
                        data.setAttribute("style", "display: none");
                    });
                    var filterIcon_icon = document.getElementById('serico' + e.getAttribute("col-id"));
                    filterIcon_icon.setAttribute("style", "display: block");
                    filterIcon_icon.addEventListener("click", function (event) {
                        event['path'].forEach(function (e) {
                            if (e && e.getAttribute && e.getAttribute("col-id")) {
                                document.querySelectorAll(".ag-header-cell").forEach(function (element) {
                                    var data = document.getElementById('serinp' + element.getAttribute("col-id"));
                                    data.setAttribute("style", "display: none");
                                });
                                var singleInput = document.getElementById('serinp' + e.getAttribute("col-id"));
                                _this.openedSearchedBoxId = 'serinp' + e.getAttribute("col-id");
                                singleInput.setAttribute("style", "display: block");
                                singleInput.addEventListener("keyup", function (event) {
                                    console.log(e.getAttribute("col-id"));
                                    var filrtedtext = document.getElementById('filterd' + e.getAttribute("col-id"));
                                    filrtedtext.setAttribute("style", "display: block");
                                    var techename = e.getAttribute("col-id");
                                    _this.searchedValue = event.target['value'];
                                    _this.filterGridbyApi(techename);
                                });
                            }
                        });
                    });
                }
            });
        });
        var elim = document.getElementsByClassName("ag-row")[0];
        elim.addEventListener("click", function (event) {
            console.log('ddajh');
            document.querySelectorAll(".ag-header-cell").forEach(function (element) {
                var data = document.getElementById('serinp' + element.getAttribute("col-id"));
                data.setAttribute("style", "display: none");
            });
        });
        var agHeader = document.getElementsByClassName("ag-header-select-all")[0];
        agHeader.addEventListener("click", function (event) {
            _this.agheader = true;
            _this.agHeaderCheckbox = true;
        });
    };
    ItemsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ongetItemsByProjectWithPagination(this.pageNo);
        this.countItemsByProject();
        // this.getItems()
        this.fieldService.getFields().subscribe(function (fields) {
            _this.fields = fields;
            fields.forEach(function (field) {
                if (!localStorage.getItem('gridHeader')) {
                    if (field.type == 3) {
                        _this.itemCulomns.push({
                            headerName: field.label,
                            field: field.techName,
                            editable: true,
                            resizable: true,
                            cellEditor: "datePicker",
                        });
                        _this.components = { datePicker: _this.getDatePicker() };
                    }
                    if (field.type == 5) {
                        _this.itemCulomns.push({
                            headerName: field.label,
                            field: field.techName,
                            editable: true,
                            resizable: true,
                            cellEditor: "agSelectCellEditor",
                            cellEditorParams: {
                                values: field.optionsForSelect
                            },
                        });
                    }
                    if (field.type == 1) {
                        _this.itemCulomns.push({
                            headerName: field.label,
                            field: field.techName,
                            type: 'number',
                            editable: true,
                            resizable: true,
                            valueGetter: function (params) {
                                return params.data[field.techName];
                            },
                            valueSetter: function (params) {
                                if (params.data[field.techName] !== params.newValue) {
                                    params.data[field.techName] = parseInt(params.newValue);
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            }
                        });
                    }
                    if (field.type != 5 && field.type != 3 && field.type != 1) {
                        _this.itemCulomns.push({
                            headerName: field.label,
                            field: field.techName,
                            editable: true,
                            resizable: true,
                        });
                    }
                }
                else {
                    _this.itemCulomns = JSON.parse(localStorage.getItem('gridHeader'));
                }
                _this.fieldslable.push(field.label);
                _this.fieldName.push(field.techName);
                if (field.type == 0) {
                    _this.fieldTypeWithNo.push({ type: "text", no: 0 });
                    _this.fieldType.push("text");
                }
                else if (field.type == 1) {
                    _this.fieldTypeWithNo.push({ type: "number", no: 1 });
                    _this.fieldType.push("number");
                }
                else if (field.type == 2) {
                    _this.fieldTypeWithNo.push({ type: "file", no: 2 });
                    _this.fieldType.push("file");
                }
                else if (field.type == 3) {
                    _this.fieldTypeWithNo.push({ type: "date", no: 3 });
                    _this.fieldType.push("date");
                }
                else if (field.type == 4) {
                    _this.fieldType.push("text");
                }
                else if (field.type == 5) {
                    _this.fieldTypeWithNo.push({ type: "select", no: 5 });
                    _this.fieldType.push("select");
                }
                else {
                    _this.fieldType.push("text");
                }
            });
            _this.columnLoaded = true;
            _this.itemCulomns[0]["headerCheckboxSelection"] = true;
            // this.itemCulomns[0]["headerCheckboxSelectionFilteredOnly"] = true;
            _this.itemCulomns[0]["checkboxSelection"] = true;
            _this.itemCulomns[0]["rowDrag"] = true;
            for (var j = 1; j < _this.itemCulomns.length; j++) {
                _this.itemCulomns[j]["headerCheckboxSelection"] = false;
                // this.itemCulomns[0]["headerCheckboxSelectionFilteredOnly"] = true;
                _this.itemCulomns[j]["checkboxSelection"] = false;
                _this.itemCulomns[j]["rowDrag"] = false;
            }
        });
        // console.log('this.itemCulomns=>', this.itemCulomns)
        this.defaultColDef = {
            width: 150,
            // sortable: true,
            //  bSortable: false,
            // filter: true,
            resizeable: true,
            editable: true,
        };
        this.rowSelection = "multiple";
        this.autoGroupColumnDef = {};
        // this.rowModelType = "serverSide";
        // this.setheaderEliment()
        localStorage.setItem('pdata', 'true');
        // document.getElementById('popupid').hidden = true
    };
    ItemsListComponent.prototype.itemsSelectionshow = function () {
        var popupVisi1 = document.getElementById('popupid');
        popupVisi1.hidden = false;
        this.popupVisi = popupVisi1.hidden;
    };
    ItemsListComponent.prototype.getItems = function () {
        var _this = this;
        this.itemsService
            .getItemsByProject(this.projectId)
            .subscribe(function (items) {
            _this.items = items;
        });
        this.ongetItemsByProjectWithPagination(this.pageNo);
    };
    ItemsListComponent.prototype.countItemsByProject = function () {
        var _this = this;
        this.itemsService
            .countItemsByProject(this.projectId)
            .subscribe(function (count) {
            _this.TotalItems = count;
            _this.totalPage = Math.ceil(_this.TotalItems / 100);
        });
    };
    ItemsListComponent.prototype.ongetItemsByProjectWithPagination = function (pageNo) {
        var _this = this;
        var data = {
            filter: [
                {
                    techName: "",
                    value: ""
                }
            ],
            sort: {
                techName: "",
                direction: ""
            }
        };
        this.itemsService
            .ongetItemsByProjectWithPagination(this.projectId, data, pageNo)
            .subscribe(function (items) {
            _this.items = items;
            _this.countPaginetionValues();
            // if(this.showAllCheckBox == true){
            //   document.querySelectorAll(".ag-selection-checkbox").forEach((element) => {
            //     element.setAttribute("style", "display: block");
            //   })
            // }
        });
    };
    ItemsListComponent.prototype.onSelectionChanged = function (event) {
        var _this = this;
        console.log('event==++++>', event);
        var idx = this.RowIndex.findIndex(function (x) { return x.page == _this.pageNo; });
        if (idx > -1) {
            if (this.RowIndex[idx].rowIndex.includes(event.rowIndex)) {
                this.RowIndex[idx].rowIndex.splice(this.RowIndex[idx].rowIndex.indexOf(event.rowIndex), 1);
            }
            else {
                this.RowIndex[idx].rowIndex.push(event.rowIndex);
            }
        }
        else {
            this.RowIndex.push({ 'page': this.pageNo, 'rowIndex': [event.rowIndex] });
        }
        // localStorage.setItem('RowIndex', JSON.stringify(this.RowIndex))
        this.gridRows = '';
        this.gridRows = event.api.rowModel.rowsToDisplay;
        if (this.pageNo == 1) {
            localStorage.setItem('gridRows', this.gridRows);
        }
        if (this.gridRows.findIndex(function (x) { return x.selected == true; }) > -1) {
            this.showAllCheckBox = true;
            var d = this.gridRows.filter(function (x) { return x.selected == true; });
            this.selectedRows = d ? d.length : 0;
            document.querySelectorAll(".ag-selection-checkbox").forEach(function (element) {
                element.setAttribute("style", "display: block");
            });
        }
        else {
            if (this.notreffress == true) {
                if (this.gridRows.findIndex(function (x) { return x.selected == false; }) > -1) {
                    this.showAllCheckBox = true;
                    var d = this.gridRows.filter(function (x) { return x.selected == false; });
                    this.selectedRows = d ? d.length : 0;
                    document.querySelectorAll(".ag-selection-checkbox").forEach(function (element) {
                        element.setAttribute("style", "display: block");
                    });
                }
                else {
                }
            }
            else {
                this.selectedRows = 0;
                this.showAllCheckBox = false;
                document.querySelectorAll(".ag-selection-checkbox").forEach(function (element) {
                    element.setAttribute("style", "display: none");
                });
            }
        }
    };
    ItemsListComponent.prototype.oncellMouseOver = function (event) {
        if (!this.showAllCheckBox) {
            document.querySelectorAll(".ag-selection-checkbox").forEach(function (element) {
                element.setAttribute("style", "display: none");
            });
            document.querySelectorAll(".ag-selection-checkbox")[event.node.id];
            var data = document.querySelectorAll(".ag-selection-checkbox")[event.node.id];
            if (data) {
                data.setAttribute("style", "display: block");
            }
        }
    };
    ItemsListComponent.prototype.action = function (event) {
        if (event == "copy") {
            this.gridApi.copySelectedRowsToClipboard(false);
        }
    };
    ItemsListComponent.prototype.onrowSelected = function (event) {
        console.log('onrowSelected=>', event);
        document.getElementById('popupid').hidden = false;
        if (event.node.selected == true) {
            this.SelectedRowData.push(event.data);
            this.noOfSelectedRows = this.SelectedRowData.length;
        }
        if (event.node.selected == false) {
            this.remove_array_element(this.SelectedRowData, event.data);
        }
    };
    ItemsListComponent.prototype.remove_array_element = function (array, n) {
        var index = array.indexOf(n);
        if (index > -1) {
            array.splice(index, 1);
        }
        return array;
    };
    ItemsListComponent.prototype.getLatestitem = function (e) {
        this.getItems();
        this.notreffress = true;
        this.SelectedRowData = [];
        if (this.notreffress == true) {
            if (this.gridRows.findIndex(function (x) { return x.selected == false; }) > -1) {
                this.showAllCheckBox = false;
                var d = this.gridRows.filter(function (x) { return x.selected == false; });
                this.selectedRows = d ? d.length : 0;
                document.querySelectorAll(".ag-selection-checkbox").forEach(function (element) {
                    element.setAttribute("style", "display: none");
                });
            }
        }
    };
    ItemsListComponent.prototype.onSingleItemSelect = function (event) {
        this.SelectedSingleRowData = event.data;
    };
    ItemsListComponent.prototype.onrowDragEnd = function (event) {
        var _this = this;
        var data = {
            itemIds: [event.node.data._id],
            orderToPlace: event.overIndex
        };
        this.itemsService
            .changeOrder(data)
            .subscribe(function (result) {
            if (result) {
                _this.getItems();
            }
        });
    };
    ItemsListComponent.prototype.oncellValueChanged = function (event) {
        var _this = this;
        this.dbclicked = false;
        localStorage.setItem('pdata', 'true');
        var data;
        console.log(event);
        Object.keys(event.data).forEach(function (key, index) {
            if (event.data[key] == event.newValue) {
                if (event.colDef.cellEditor) {
                    var date = new Date(event.newValue);
                    data = {
                        _id: event.data._id,
                        projectId: event.data.projectId,
                    };
                    data[key] = date;
                }
                else {
                    data = {
                        _id: event.data._id,
                        projectId: event.data.projectId,
                    };
                    data[key] = event.newValue;
                }
            }
            // console.log('data=+++>', data)
            if (event.oldValue != event.newValue) {
                _this.itemsService
                    .editItemByProject(data)
                    .subscribe(function (result) {
                    if (result) {
                        _this.dbclicked = false;
                        localStorage.setItem('pdata', 'true');
                        // this.getItems();
                    }
                });
            }
        });
    };
    ItemsListComponent.prototype.oncellDoubleClicked = function (event) {
        this.dbclicked = true;
        this.getShow.emit();
        localStorage.setItem('pdata', 'false');
    };
    ItemsListComponent.prototype.oncolumnMoved = function (event) {
        var found = this.itemCulomns.find(function (element) { return element.headerName == event.column.userProvidedColDef.headerName; });
        var index = this.itemCulomns.indexOf(found);
        this.move(this.itemCulomns, index, event.toIndex);
        localStorage.setItem('gridHeader', JSON.stringify(this.itemCulomns));
        this.ngOnInit();
    };
    ItemsListComponent.prototype.move = function (arr, old_index, new_index) {
        while (old_index < 0) {
            old_index += arr.length;
        }
        while (new_index < 0) {
            new_index += arr.length;
        }
        if (new_index >= arr.length) {
            var k = new_index - arr.length;
            while ((k--) + 1) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr;
    };
    ItemsListComponent.prototype.oncolumnValueChanged = function (event) {
    };
    ItemsListComponent.prototype.calloninit = function (e) {
        var _this = this;
        this.fieldService.getFields().subscribe(function (fields) {
            _this.fields = fields;
            fields.forEach(function (field) {
                // this.itemCulomns1.push({
                //   headerName: field.label,
                //   field: field.techName,
                //   editable: true,
                //   resizable: true,
                // });
                if (field.type == 3) {
                    _this.itemCulomns1.push({
                        headerName: field.label,
                        field: field.techName,
                        editable: true,
                        resizable: true,
                        cellEditor: "datePicker"
                    });
                    _this.components = { datePicker: _this.getDatePicker() };
                }
                if (field.type == 5) {
                    _this.itemCulomns1.push({
                        headerName: field.label,
                        field: field.techName,
                        editable: true,
                        resizable: true,
                        cellEditor: "agSelectCellEditor",
                        cellEditorParams: {
                            values: field.optionsForSelect
                        }
                    });
                }
                else {
                    _this.itemCulomns1.push({
                        headerName: field.label,
                        field: field.techName,
                        editable: true,
                        resizable: true
                    });
                }
                _this.itemCulomns = _this.itemCulomns1;
                _this.fieldslable.push(field.label);
                _this.fieldName.push(field.techName);
                if (field.type == 0) {
                    _this.fieldTypeWithNo.push({ type: "text", no: 0 });
                    _this.fieldType.push("text");
                }
                else if (field.type == 1) {
                    _this.fieldTypeWithNo.push({ type: "number", no: 1 });
                    _this.fieldType.push("number");
                }
                else if (field.type == 2) {
                    _this.fieldTypeWithNo.push({ type: "file", no: 2 });
                    _this.fieldType.push("file");
                }
                else if (field.type == 3) {
                    _this.fieldTypeWithNo.push({ type: "date", no: 3 });
                    _this.fieldType.push("date");
                }
                else if (field.type == 4) {
                    _this.fieldType.push("text");
                }
                else if (field.type == 5) {
                    _this.fieldTypeWithNo.push({ type: "select", no: 5 });
                    _this.fieldType.push("select");
                }
                else {
                    _this.fieldType.push("text");
                }
            });
            _this.columnLoaded = true;
            _this.itemCulomns[0]["headerCheckboxSelection"] = true;
            // this.itemCulomns[0]["headerCheckboxSelectionFilteredOnly"] = true;
            _this.itemCulomns[0]["checkboxSelection"] = true;
            _this.itemCulomns[0]["rowDrag"] = true;
            for (var j = 1; j < _this.itemCulomns.length; j++) {
                _this.itemCulomns[j]["headerCheckboxSelection"] = false;
                // this.itemCulomns[0]["headerCheckboxSelectionFilteredOnly"] = true;
                _this.itemCulomns[j]["checkboxSelection"] = false;
                _this.itemCulomns[j]["rowDrag"] = false;
            }
        });
        this.defaultColDef = {
            width: 150,
            sortable: true,
            filter: true,
            resizeable: true,
            editable: true,
        };
        this.rowSelection = "multiple";
        this.ngOnInit();
    };
    ItemsListComponent.prototype.getDatePicker = function () {
        // console.log('i am here')
        function Datepicker() { }
        Datepicker.prototype.init = function (params) {
            // console.log('Inside 1');
            this.eInput = document.createElement("input");
            this.eInput.value = params.value;
            // console.log("getDatePicker--->>", this.eInput);
            this.eInput.setAttribute('type', 'date');
            //$(this.eInput).datepicker({ dateFormat: "dd/mm/yy" });
        };
        Datepicker.prototype.getGui = function () {
            // console.log('Inside 2');
            return this.eInput;
        };
        Datepicker.prototype.afterGuiAttached = function () {
            // console.log('Inside 3');
            this.eInput.focus();
            this.eInput.select();
        };
        Datepicker.prototype.getValue = function () {
            // console.log('Inside 4');
            return this.eInput.value;
        };
        Datepicker.prototype.destroy = function () { };
        Datepicker.prototype.isPopup = function () {
            return false;
        };
        return Datepicker;
    };
    ItemsListComponent.prototype.moveToNext = function () {
        if (this.pageNo < this.totalPage) {
            console.log(this.showAllCheckBox);
            this.pageNo = this.pageNo + 1;
            this.ongetItemsByProjectWithPagination(this.pageNo);
            // if(this.showAllCheckBox){
            //   document.querySelectorAll(".ag-selection-checkbox").forEach((element) => {
            //     element.setAttribute("style", "display: block");
            //   });
            // }
        }
    };
    ItemsListComponent.prototype.moveToPrivious = function () {
        if (this.pageNo > 1) {
            this.pageNo = this.pageNo - 1;
            this.ongetItemsByProjectWithPagination(this.pageNo);
        }
    };
    ItemsListComponent.prototype.moveToPageNo = function (pageNo) {
        this.pageNo = parseInt(pageNo);
        this.ongetItemsByProjectWithPagination(this.pageNo);
    };
    ItemsListComponent.prototype.countPaginetionValues = function () {
        this.itemFrom = this.ItemTO + 1;
        this.ItemTO = this.ItemTO + this.items.length;
    };
    ItemsListComponent.prototype.onrowsAfterSort = function (event) {
        var data = event.event.api.forEachNodeAfterFilterAndSort();
    };
    ItemsListComponent.prototype.sortGridbyApi = function (sortOrder, headerField, agGridEventPath) {
        var _this = this;
        document.querySelectorAll(".ag-header-cell").forEach(function (element) {
            var data = document.getElementById('serinp' + element.getAttribute("col-id"));
            data.setAttribute("style", "display: none");
        });
        var data = {
            filter: [
                {
                    techName: "",
                    value: ""
                }
            ],
            sort: {
                techName: headerField,
                direction: sortOrder
            }
        };
        if (!agGridEventPath) {
            this.itemsService
                .ongetItemsByProjectWithPagination(this.projectId, data, this.pageNo)
                .subscribe(function (items) {
                _this.items = items;
                _this.agHeaderCheckbox = false;
            });
        }
    };
    ItemsListComponent.prototype.filterGridbyApi = function (techname) {
        var _this = this;
        var data = {
            filter: [
                {
                    techName: techname,
                    value: this.searchedValue
                }
            ],
            sort: {
                techName: "",
                direction: ""
            }
        };
        this.itemsService
            .ongetItemsByProjectWithPagination(this.projectId, data, this.pageNo)
            .subscribe(function (items) {
            _this.items = items;
        });
    };
    ItemsListComponent.prototype.onrowDataChanged = function (event) {
        var _this = this;
        if (this.SelectedRowData.length == 0) {
            document.querySelectorAll(".ag-selection-checkbox").forEach(function (element, index) {
                element.setAttribute("style", "display: none");
            });
        }
        else {
            document.querySelectorAll(".ag-selection-checkbox").forEach(function (element, index) {
                element.setAttribute("style", "display: block");
            });
        }
        //  this.gridRows = event.api.rowModel.rowsToDisplay;
        document.querySelectorAll(".ag-row").forEach(function (ele, index) {
            if (_this.RowIndex) {
                _this.RowIndex.forEach(function (row) {
                    if (row.page == _this.pageNo) {
                        if (row.rowIndex.includes(parseInt(ele.getAttribute("row-id")))) {
                            var checkedEle = ele.getElementsByClassName("ag-icon-checkbox-checked");
                            var uncheckEle = ele.getElementsByClassName("ag-icon-checkbox-unchecked");
                            if (uncheckEle.length > 0) {
                                uncheckEle[0].classList.add("ag-hidden");
                            }
                            if (checkedEle.length > 0) {
                                checkedEle[0].classList.remove("ag-hidden");
                            }
                        }
                    }
                });
            }
        });
    };
    ItemsListComponent.prototype.oncellClicked = function (e) {
        document.querySelectorAll(".ag-header-cell").forEach(function (element) {
            var data = document.getElementById('serinp' + element.getAttribute("col-id"));
            data.setAttribute("style", "display: none");
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ItemsListComponent.prototype, "projectId", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ItemsListComponent.prototype, "getShow", void 0);
    ItemsListComponent = __decorate([
        core_1.Component({
            selector: "app-items-list",
            templateUrl: "./items-list.component.html",
            styleUrls: ["./items-list.component.scss"]
        }),
        __metadata("design:paramtypes", [items_service_1.ItemsService,
            field_service_1.FieldService])
    ], ItemsListComponent);
    return ItemsListComponent;
}());
exports.ItemsListComponent = ItemsListComponent;
//# sourceMappingURL=items-list.component.js.map