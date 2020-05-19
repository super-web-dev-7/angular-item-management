import { Component, OnInit, Input } from '@angular/core';
import { ItemsService } from "../items-list/items.service";
import { FieldService } from "../../fields/field.service";
import { EventEmitterService } from '../../event-emitter.service';   
@Component({
  selector: 'app-cell-edit',
  templateUrl: './cell-edit.component.html',
  styleUrls: ['./cell-edit.component.scss']
})
export class CellEditComponent implements OnInit {
 @Input() celldbclicked
 @Input() pageNo

  constructor(
    private itemsService: ItemsService,
    private fieldService: FieldService,
    private eventEmitterService: EventEmitterService
  ) { }

  ngOnInit() {
  }

  oncellValueChanged(event) {
    if (event.newValue) {
      this.celldbclicked = false;
      localStorage.setItem('pdata', 'true')
      var data
      Object.keys(event.data).forEach((key, index) => {
        var date = new Date(event.data[key])
       var  NewDate
       var  Eventdate
       if(NewDate && Eventdate){
        NewDate =  event.newValue.getDate()
        Eventdate =  date.getDate()
       }

        // console.log(date.getDate(),event.newValue.getDate())
        if (event.data[key] == event.newValue || Eventdate ==  NewDate ) {
          if (event.column.colDef.type == 'date') {
            let date = new Date(event.newValue).getTime();
            data = { _id: event.data._id, projectId: event.data.projectId }
            data[key] = date
          } else {
            data = {_id: event.data._id,projectId: event.data.projectId }
            data[key] = event.newValue;
          }
        }
      })
      if (event.oldValue != event.newValue) {
        if (data._id) {
          this.itemsService.editItemByProject(data).subscribe(result => {
              if (result) {
                this.eventEmitterService.onPageChange(this.pageNo);
                this.celldbclicked = false;
                localStorage.setItem('pdata', 'true')
              }
          });
        }
      }
    }
  }

}
