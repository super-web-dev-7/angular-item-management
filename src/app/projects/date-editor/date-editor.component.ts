import { Component, ElementRef, ViewChild } from '@angular/core';

//import { ICellEditorAngularComp } from '@ag-grid-community/angular';

@Component({
  selector: 'app-loading-overlay',
  template: `
    <div
      #flatpickrEl
      class="ag-input-wrapper custom-date-filter"
      role="presentation"
    >
      <input type="text" #eInput data-input style="width: 100%;" />
      <a class="input-button" title="clear" data-clear>
        <i class="fa fa-times"></i>
      </a>
    </div>
  `,
  styles: [
    `
      .custom-date-filter a {
        position: absolute;
        right: 20px;
        color: rgba(0, 0, 0, 0.54);
        cursor: pointer;
      }

      .custom-date-filter:after {
        position: absolute;
        content: '\f073';
        display: block;
        font-weight: 400;
        font-family: 'Font Awesome 5 Free';
        right: 5px;
        pointer-events: none;
        color: rgba(0, 0, 0, 0.54);
      }
    `,
  ],
})

export class DateEditorComponent {
@ViewChild('flatpickrEl', { read: ElementRef, static:false }) flatpickrEl: ElementRef;
  @ViewChild('eInput', { read: ElementRef, static:false }) eInput: ElementRef;
  private date: Date;
  private params: any;
  private picker: any;

  agInit(params: any): void {
    	this.params = params;
	  	//console.log("Datepicker====>>", this.params);
  }

  ngAfterViewInit(): void {
    // outputs `I am span`
    this.picker = flatpickr(this.flatpickrEl.nativeElement, {
      onChange: this.onDateChanged.bind(this),
      wrap: true,
    });

    this.picker.calendarContainer.classList.add('ag-custom-component-popup');
  }

  ngOnDestroy() {
 
  }

  onDateChanged(selectedDates) {
    	var date = selectedDates[0] || null;
	  	if(typeof date == undefined){
			this.date = this.params.value
	  	}else{
			this.date = date.getFullYear()+'-'+ (date.getMonth()+1)+'-'+date.getDate();
	  		this.params.value = this.date
		}	  	
  }

  getDate(): Date {
    return this.date;
  }
	
  getValue(): Date{ 
	  if(typeof this.date === 'undefined'){
			this.date = this.params.value
	  }
	  return this.date;
  }
  setDate(date: Date): void {
    this.date = date || null;
    this.picker.setDate(date);
  }

  setInputPlaceholder(placeholder: string): void {
    this.eInput.nativeElement.setAttribute('placeholder', placeholder);
  }
}
