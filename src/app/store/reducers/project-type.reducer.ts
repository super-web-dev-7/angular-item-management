
import * as FieldActions from '../actions/project-type.actions';
import { IField } from '../../models/field.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface ProjectTypeState {
    projectTypeId: number;
    fields: IField[];
};

const initialState: ProjectTypeState = {
    projectTypeId: 0,
    fields: [],
}

export function ProjectTypeReducer(state = initialState, action: FieldActions.Actions) {

    switch (action.type) {
        case FieldActions.ActionTypes.AddField:
            return {
                ...state,
                fields: [...state.fields, action.payload]
            };

        case FieldActions.ActionTypes.RemoveField:
            return {
                ...state,
                fields: [...state.fields.filter(item => item._id !== action.payload._id)]
            };

        case FieldActions.ActionTypes.FieldsLoaded:
            return {
                ...state,
                items: [...action.payload]
            };
        default:
            return state;
    }
}

export const getFieldsState = createFeatureSelector<ProjectTypeState>('projectType');

export const getFields = createSelector(getFieldsState,
  (state: ProjectTypeState) => state.fields);