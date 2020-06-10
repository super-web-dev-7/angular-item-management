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
import { ExpressionEditorComponent } from './expression-editor/expression-editor.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDropdownModule } from 'ngx-bootstrap';
import { FieldsFilterPipe } from './expression-editor/fields-filter.pipe';

@NgModule({
  declarations: [DropdownEditorComponent, SwitchEditorComponent, TextEditorComponent, MultiselectEditorComponent, ExpressionEditorComponent, FieldsFilterPipe],
  imports: [
    CommonModule,
    FontAwesomeModule,
    pgCardModule,
    PerfectScrollbarModule,
    FormsModule,
    pgSelectModule,
    FroalaEditorModule,
  ],
  exports: [DropdownEditorComponent, SwitchEditorComponent, TextEditorComponent, MultiselectEditorComponent, ExpressionEditorComponent]
})
export class FormModule {
}
