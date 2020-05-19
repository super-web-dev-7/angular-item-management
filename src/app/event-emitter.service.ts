import { Injectable, EventEmitter } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription';    
    
@Injectable({    
  providedIn: 'root'    
})    
export class EventEmitterService {    
    
  invokeItemListComponentFunction = new EventEmitter();    
  invokeOngetItemsByProjectWithPagination= new EventEmitter();   
  getLatetsItemEvents = new EventEmitter();  
  getItemsOfList = new EventEmitter();  
  onshortRowdata =new EventEmitter();  
  subsVar: Subscription;    
    
  constructor() { }    
    
  onfilterRow(data) {    
    this.invokeItemListComponentFunction.emit(data);    
  } 
  onPageChange(data) {    
    this.invokeOngetItemsByProjectWithPagination.emit(data);    
  }    

  getLatetsItemEvent(data) {    
    this.getLatetsItemEvents.emit(data);    
  } 
  
  onshortRow(data){
    console.log('i am here ====+++++++>',data)
    this.onshortRowdata.emit(data);    
  }
  // GetItemsOfLists(data){
  //   this.getLatetsItemEvents.emit(data);  
  // }
}   