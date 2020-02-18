import { Component, OnInit } from '@angular/core';
import { IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-ag-grid-checkbox',
  templateUrl: './ag-grid-checkbox.component.html',
  styleUrls: ['./ag-grid-checkbox.component.scss']
})
export class AgGridCheckboxComponent {
  private params: any;
data = []
  agInit(params: any): void {
    this.params = params;
    
    // this.data.push(params.node.id);
    // console.log("=>>>params",this.data);
  }

  afterGuiAttached(params?: IAfterGuiAttachedParams): void {
    console.log("=>>after")
  }

  refresh(params: any): boolean {
    params.data.amount++;
    params.data.cbox = params.value
    console.log(params.value);
    params.api.refreshCells(params);
    return false;
  }


  constructor() { }


}
