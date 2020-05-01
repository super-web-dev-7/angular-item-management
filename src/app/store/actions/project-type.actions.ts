import { Action, createAction, props } from '@ngrx/store'
import { IField } from '../../models/field.model'

export enum ActionTypes {
    GetFields = '[PROJECT TYPE] Get Fields',
    FieldsLoaded = '[PROJECT TYPE] Load success',
    AddField = '[PROJECT TYPE] Add Field',
    RemoveField = '[PROJECT TYPE] Remove Field',
    UpdateField = '[PROJECT TYPE] Update Field',
    SelectField = '[PROJECT TYPE] Select Field',
    ErrorFields = '[PROJECT TYPE] Error'
}

export const AddFieldAction = createAction(
    ActionTypes.AddField,
    props<{ payload: IField }>()
);

export const RemoveFieldAction = createAction(
    ActionTypes.RemoveField,
    props<{ payload: IField }>()
);

export const UpdateFieldAction = createAction(
    ActionTypes.UpdateField,
    props<{ payload: IField }>()
);

export const GetFieldsAction = createAction(
    ActionTypes.GetFields
);

export const FieldsLoadedAction = createAction(
    ActionTypes.FieldsLoaded,
    props<{ payload: { [id: string]: IField } }>()
);

export const SelectFieldAction = createAction(
    ActionTypes.SelectField,
    props<{ payload: IField }>()
);

export const ErrorFieldsAction = createAction(
    ActionTypes.ErrorFields, props<Error>()
);