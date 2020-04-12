
import * as FieldActions from '../actions/project-type.actions';
import { IField } from '../../models/field.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as Immutable from 'immutable';

export interface ProjectTypeState {
    projectTypeId: number;
    fields: Immutable.Map<string, IField>;
    selectedField: IField;
};

const initialState: ProjectTypeState = {
    projectTypeId: 0,
    fields: Immutable.Map(),
    selectedField: undefined
}

export function ProjectTypeReducer(state = initialState, action: FieldActions.Actions) {

    switch (action.type) {
        case FieldActions.ActionTypes.AddField:
            return {
                ...state,
                fields: state.fields.set(action.payload._id, action.payload)
            };

        case FieldActions.ActionTypes.RemoveField:
            return {
                ...state,
                fields: state.fields.remove(action.payload._id)
            };

        case FieldActions.ActionTypes.UpdateField:
            return {
                ...state,
                fields: state.fields.set(action.payload._id, action.payload)
            };

        case FieldActions.ActionTypes.SelectField:
            return {
                ...state,
                selectedField: action.payload
            };

        case FieldActions.ActionTypes.FieldsLoaded:
            return {
                ...state,
                fields: Immutable.Map(action.payload)
            };
        default:
            return state;
    }
}

export const getFieldsState = createFeatureSelector<ProjectTypeState>('projectType');

export const getFields = createSelector(getFieldsState,
    (state: ProjectTypeState) => state.fields);

export const getSelectedField = createSelector(getFieldsState,
    (state: ProjectTypeState) => state.selectedField);