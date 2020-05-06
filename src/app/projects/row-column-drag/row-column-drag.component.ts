import { Component, OnInit,Input } from '@angular/core';
import { ItemsService } from "../items-list/items.service";
import { FieldService } from "../../fields/field.service";
@Component({
  selector: 'app-row-column-drag',
  templateUrl: './row-column-drag.component.html',
  styleUrls: ['./row-column-drag.component.scss']
})
export class RowColumnDragComponent implements OnInit {
 @Input() itemCulomns;
 @Input() columnMoved;

  constructor(
    private itemsService: ItemsService,
    private fieldService: FieldService,
  ) { }

  ngOnInit() {
  }
  columnMove(event) {
    const found = this.itemCulomns.find(element => element.headerName == event.column.userProvidedColDef.headerName);
    if (found) {
      const index = this.itemCulomns.indexOf(found);
      this.addAndRemovecolumn(this.itemCulomns, index, event.toIndex)
      localStorage.setItem('gridHeader', JSON.stringify(this.itemCulomns))
      this.columnMoved = true;
      
    }
  }
  addAndRemovecolumn(arr, old_index, new_index) {
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
  }
}
