import { Injectable, EventEmitter } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription';    
    
@Injectable({    
  providedIn: 'root'    
})    
export class EventEmitterService {    
    
  invokeItemListComponentFunction = new EventEmitter();    
  invokeOngetItemsByProjectWithPagination= new EventEmitter();   
  getLatetsItemEvents = new EventEmitter();  
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
}   