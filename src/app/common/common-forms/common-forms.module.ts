import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ModalsModule } from '../modal/modals.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { pgSelectModule } from '@app/@pages/components/select/select.module';
import { CreateProjectTypeComponent } from './create-project-type/create-project-type.component';

@NgModule({
  imports:[CommonModule,
           ModalsModule,
           FormsModule,
           ReactiveFormsModule,
           pgSelectModule],
  declarations: [CreateProjectComponent, CreateProjectTypeComponent
  ],
  exports: [CreateProjectComponent, CreateProjectTypeComponent]
})
export class CommonFormsModule {
}
