import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { getFields, getSelectedField } from '@app/store/reducers/project-type.reducer';
import { Store } from '@ngrx/store';
import { IField } from '@app/models/field.model';
import { take } from 'rxjs/operators';
import { pgCard } from '@app/@pages/components/card/card.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldService } from '@app/fields/field.service';
import { ProjectTypeState } from '@app/store/states/project-type.state';
import { SelectFieldAction } from '@app/store/actions/project-type.actions';

@Component({
  selector: 'app-new-affected-field',
  templateUrl: './new-affected-field.component.html',
  styleUrls: ['./new-affected-field.component.scss']
})
export class NewAffectedFieldComponent implements OnInit {

  private fields: IField[];
  private selectedField: IField;
  private showForm: boolean = false;
  private newAffectedFieldForm: FormGroup = this.initForm();

  @ViewChild("newAffectedFieldCard", { static: false }) newAffectedFieldCard: pgCard;
  @ViewChild("triggerText", { static: false }) triggerTextElement: ElementRef;

  constructor(private store: Store<ProjectTypeState>,
    private fb: FormBuilder,
    private fieldService: FieldService) { }

  ngOnInit() {
    this.store.select(getFields)
      .subscribe(
        fields => {
          this.fields = fields.valueSeq().toArray();
        }
      );

    this.store.select(getSelectedField)
      .subscribe(
        field => {
          this.selectedField = field;
          if (this.newAffectedFieldCard) {
            this.newAffectedFieldCard.close();
          }
          this.newAffectedFieldForm.reset();
        }
      );
  }

  initForm() {
    return this.fb.group({
      affectedFieldId: ['', Validators.required],
      triggerText: ['', Validators.required],
      actionText: ['', Validators.required]
    });
  }

  show() {
    this.newAffectedFieldCard.open();
    setTimeout(() => {
      this.triggerTextElement.nativeElement.focus();
    });
  }

  hide() {
    this.newAffectedFieldCard.close();
  }

  onSave() {
    if (this.newAffectedFieldForm.valid) {
      const { affectedFieldId, triggerText, actionText } = this.newAffectedFieldForm.value;
      let affectedField = { fieldId: affectedFieldId, triggers: [{ triggerFieldText: triggerText, actionFieldText: actionText }] };
      this.fieldService.addAffectedField(this.selectedField._id, affectedField).pipe(take(1)).subscribe((field) => {
        this.store.dispatch(SelectFieldAction({payload: field}));
        this.hide();
      });
    } else {
      this.newAffectedFieldForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.newAffectedFieldForm.reset();
    this.hide();
  }
}
