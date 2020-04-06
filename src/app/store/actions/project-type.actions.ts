import { Action } from '@ngrx/store'
import { IField } from '../../models/field.model'

export enum ActionTypes {
    GetFields = '[PROJECT TYPE] Get Fields',
    FieldsLoaded = '[PROJECT TYPE] Load success',
    AddField = '[PROJECT TYPE] Add Field',
    RemoveField = '[PROJECT TYPE] Remove Field',
    UpdateField = '[PROJECT TYPE] Update Field',
}

export class AddField implements Action {
    readonly type = ActionTypes.AddField;

    constructor(public payload: IField) { }
}

export class RemoveField implements Action {
    readonly type = ActionTypes.RemoveField;

    constructor(public payload: IField) { }
}

export class UpdateField implements Action {
    readonly type = ActionTypes.UpdateField;

    constructor(public payload: IField) { }
}

export class GetFields implements Action {
    readonly type = ActionTypes.GetFields;
}

export class FieldsLoaded implements Action {
    readonly type = ActionTypes.FieldsLoaded;
    
    constructor(public payload: {[id: string]: IField}) {}
}

export type Actions = AddField | RemoveField | GetFields | FieldsLoaded | UpdateField;