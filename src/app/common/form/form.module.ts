import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownEditorComponent } from './dropdown-editor/dropdown-editor.component';
import { SwitchEditorComponent } from './switch-editor/switch-editor.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { MultiselectEditorComponent } from './multiselect-editor/multiselect-editor.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { pgCardModule } from '../../@pages/components/card/card.module';
import { FormsModule } from '@angular/forms';
import { pgSelectModule } from '../../@pages/components/select/select.module';



@NgModule({
  declarations: [DropdownEditorComponent, SwitchEditorComponent, TextEditorComponent, MultiselectEditorComponent],
  imports: [
    CommonModule,
    pgCardModule,
    PerfectScrollbarModule,
    FormsModule,
    pgSelectModule,
  ],
  exports: [DropdownEditorComponent, SwitchEditorComponent, TextEditorComponent, MultiselectEditorComponent]
})
export class FormModule {
}
