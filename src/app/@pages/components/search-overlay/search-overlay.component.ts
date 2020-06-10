import { Component, OnInit, OnDestroy,HostBinding,ElementRef,Input,HostListener,ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { fadeAnimation } from '../../animations/fade-animations';
import { pagesToggleService} from '../../services/toggler.service';
import { SearchResult } from './search-result';
@Component({
  selector: 'app-search-overlay',
  templateUrl: './search-overlay.component.html',
  animations   : [
    fadeAnimation
  ],
  styleUrls: ['./search-overlay.component.scss']
})
export class SearchOverlayComponent implements OnDestroy {
  toggleSubscription : Subscription;
  _isEnabled:boolean = false;
  isVisible:boolean = false;
  value:string = "";
  modal:SearchResult;

  constructor(private el: ElementRef,private toggler:pagesToggleService) {
    this.toggleSubscription = this.toggler.searchToggle.subscribe((toggleValue) => { this.open() });
  }
  ngOnDestroy() {
    this.toggleSubscription.unsubscribe();
  }

  @Input() set isEnabled(isEnabled: boolean) {
    this.isEnabled = isEnabled;
  }
  get isEnabled() {
    return this._isEnabled;
  }

  close($event){
    $event.preventDefault();
  	this.isVisible = false;
  	this.value = "";
  }

  open(){
    this.isVisible = true;
    this.value = "";
    setTimeout(()=>{   
      this.searchField.nativeElement.focus();
    },200);
  }
  @ViewChild('searchField', { static: true })
  searchField: any;

  fadeInComplete(){
  }
}
