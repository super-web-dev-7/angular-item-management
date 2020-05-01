import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ModalsModule } from '../modal/modals.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports:[CommonModule,
           ModalsModule,
           FormsModule,
           ReactiveFormsModule],
  declarations: [CreateProjectComponent
  ],
  exports: [CreateProjectComponent]
})
export class CommonFormsModule {
}
