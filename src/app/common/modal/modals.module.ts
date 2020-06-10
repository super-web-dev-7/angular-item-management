import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ModalModule } from 'ngx-bootstrap';
import { ProgressModule } from '../../@pages/components/progress/progress.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ModalComponent],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    ProgressModule,
  ],
  exports: [ModalComponent]
})
export class ModalsModule { }
