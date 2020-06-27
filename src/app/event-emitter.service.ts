import {Injectable, EventEmitter} from '@angular/core';
import {Subscription} from 'rxjs/internal/Subscription';

@Injectable({
    providedIn: 'root'
})
export class EventEmitterService {

    invokeItemListComponentFunction = new EventEmitter();
    invokeOnGetItemsByProjectWithPagination = new EventEmitter();
    getLatestItemEvents = new EventEmitter();
    getItemsOfList = new EventEmitter();
    subsVar: Subscription;

    constructor() {
    }

    onFilterRow(data) {
        this.invokeItemListComponentFunction.emit({type: 'filter', data: data});
    }

    onPageChange(data) {
        this.invokeOnGetItemsByProjectWithPagination.emit(data);
    }

    onSortChanged(data) {
        this.invokeItemListComponentFunction.emit(data);
    }
}
