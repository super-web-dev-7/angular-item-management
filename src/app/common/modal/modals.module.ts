import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ModalModule } from 'ngx-bootstrap';



@NgModule({
  declarations: [ModalComponent],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
  ],
  exports: [ModalComponent]
})
export class ModalsModule { }
