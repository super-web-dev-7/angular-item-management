import { Component, OnInit, ViewChild,Output, ViewContainerRef,EventEmitter,Input } from '@angular/core';
import {
  IAfterGuiAttachedParams,
  IDoesFilterPassParams,
  IFilterParams,
  RowNode,
} from '@ag-grid-community/all-modules';
// import { IFilterAngularComp } from'@ag-grid-community/angular';
import { ItemsListComponent } from '../items-list/items-list.component';
import { EventEmitterService } from '../../event-emitter.service';    
import { DateEditorComponent } from '../date-editor/date-editor.component';
@Component({
  selector: 'app-filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.scss']
})


export class FilterInputComponent implements OnInit {
  @Output() setFilterEvent: EventEmitter<any> = new EventEmitter();
  @Input() searchedText;
  @Input() items;
  private params: IFilterParams;
  private valueGetter: (rowNode: RowNode) => any;
  public text: string = '';
  FilterInputType: any;
  constructor( private eventEmitterService: EventEmitterService ) { }

  ngOnInit() {
    // this.setFilterEvent.emit("This is the child component");
  }
  // @ViewChild('input', { read: ViewContainerRef,static: false }) public input;

  agInit(params: IFilterParams): void {
    this.params = params;
    this.valueGetter = params.valueGetter; 
    this.FilterInputType=params.colDef['groupId']
  }

  doesFilterPass(params: IDoesFilterPassParams): boolean {
    if(params.node['rowModel'].rowsToDisplay.length > 0){
      return this.text
      .toLowerCase()
      .split(' ')
      .every(filterWord => {
        return (
          this.valueGetter(params.node)
            .toString()
            .toLowerCase()
            .indexOf(filterWord) >= 0
        );
      });
    }
  }
   isFilterActive(): boolean {
     return this.text !== null && this.text !== undefined && this.text !== '';
   }


  onChange(newValue): void {
    if (this.text !== newValue) {
      this.text = newValue;
      var data = {
        searchText:this.text,
        tachname:this.params.colDef.field
      }
      this.eventEmitterService.onfilterRow(data);  
      this.params.filterChangedCallback();

    }

    // this.setFilterEvent.emit();

    
  }

  
}
