import {Component, OnInit, ViewChild, OnDestroy, Input} from '@angular/core';

import {FieldsListComponent} from './fields-list/fields-list.component';
import {IField, IFieldOptions} from '../models/field.model';
import {ProjectTypeService} from '../project-types/project-type.service';
import {FieldFormComponent} from './field-form/field-form.component';
import {AddFieldComponent} from './add-field/add-field.component';
import {Store, select} from '@ngrx/store';
import {getFields, getProjectTypeState} from '@app/store/reducers/project-type.reducer';
import * as Immutable from 'immutable';
import {ProjectTypeState} from '@app/store/states/project-type.state';
import * as  ProjectTypeActions from '@app/store/actions/project-type.actions';
import {Observable} from 'rxjs';


@Component({
    selector: 'app-fields',
    templateUrl: './fields.component.html',
    styleUrls: ['./fields.component.scss']
})
export class FieldsComponent implements OnInit, OnDestroy {
    @Input()
    private projectTypeId;

    @ViewChild('fieldsList', {static: false})
    public fieldsList: FieldsListComponent;

    @ViewChild('fieldForm', {static: true})
    private fieldForm: FieldFormComponent;

    @ViewChild('addFieldModal', {static: true})
    private addFieldModal: AddFieldComponent;

    private createdFielsSubscription;
    private fieldsMap: Immutable.Map<string, IField>;
    private fields: IField[];
    public filterQuery = '';
    projectType$: Observable<ProjectTypeState>;

    constructor(private store: Store<ProjectTypeState>,
                private projectTypesService: ProjectTypeService) {
        this.projectType$ = this.store.pipe(select(getProjectTypeState));
    }

    ngOnInit() {
        this.store.select(getFields)
            .subscribe(
                fields => {
                    this.fieldsMap = fields;
                    this.fields = this.fieldsMap.valueSeq().toArray();
                }
            );

        this.store.dispatch(ProjectTypeActions.GetFieldsAction({payload: this.projectTypeId}));
    }

    openForm(field: IField) {
        this.fieldForm.open(field);
    }

    createField() {
        this.createdFielsSubscription = this.addFieldModal.openAndWaitForFinish().subscribe((createdFields: IField[]) => {
            if (createdFields) {
                const fieldIds = createdFields.map((field) => field._id);
                this.projectTypesService.addFieldToProjectType(this.projectTypeId, fieldIds).subscribe((result) => {
                    createdFields.forEach((field) => {
                        this.store.dispatch(ProjectTypeActions.AddFieldAction({payload: field}));
                        this.onSelectField(field);
                        this.fieldsList.addFieldAndSelect(field);
                    });
                });
            }
            this.createdFielsSubscription.unsubscribe();
        });
    }

    onSelectField = (field: IField) => {
        this.openForm(field);
    }

    updateFieldInList(updatedField: IField) {
        this.store.dispatch(ProjectTypeActions.UpdateFieldAction({payload: updatedField}));
        this.fieldsList.updateField(updatedField);
    }

    ngOnDestroy() {
        if (this.createdFielsSubscription) {
            this.createdFielsSubscription.unsubscribe();
        }
    }
}
