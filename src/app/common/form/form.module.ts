import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownEditorComponent } from './dropdown-editor/dropdown-editor.component';
import { SwitchEditorComponent } from './switch-editor/switch-editor.component';
import { TextEditorComponent } from './text-editor/text-editor.component';



@NgModule({
  declarations: [DropdownEditorComponent, SwitchEditorComponent, TextEditorComponent],
  imports: [
    CommonModule
  ],
  exports: [DropdownEditorComponent, SwitchEditorComponent, TextEditorComponent]
})
export class FormModule {
}
