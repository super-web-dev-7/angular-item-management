
import * as ProjectTypeActions from '../actions/project-type.actions';
import { createFeatureSelector, createSelector, createReducer, on, Action } from '@ngrx/store';
import * as Immutable from 'immutable';
import { ProjectTypeState, initializeProjectTypeState } from '../states/project-type.state';


export const intialState = initializeProjectTypeState();

const reducer = createReducer(
    intialState,
    on(ProjectTypeActions.GetFieldsAction, state => state),
    on(ProjectTypeActions.AddFieldAction, (state: ProjectTypeState, { payload }) => {
        return {
            ...state,
            fields: state.fields.set(payload._id, payload)
        };
      }),
      on(ProjectTypeActions.RemoveFieldAction, (state: ProjectTypeState, { payload }) => {
        return {
            ...state,
            fields: state.fields.remove(payload._id)
        };
      }),
      on(ProjectTypeActions.UpdateFieldAction, (state: ProjectTypeState, { payload }) => {
        return {
            ...state,
            fields: state.fields.set(payload._id, payload)
        };
      }),
      on(ProjectTypeActions.SelectFieldAction, (state: ProjectTypeState, { payload }) => {
        return {
            ...state,
            selectedField: payload
        };
      }),
      on(ProjectTypeActions.FieldsLoadedAction, (state: ProjectTypeState, { payload }) => {
        return {
            ...state,
            fields: Immutable.Map(payload)
        };
      }),
  );

  export function ProjectTypeReducer(state: ProjectTypeState | undefined, action: Action) {
    return reducer(state, action);
  }

export const getProjectTypeState = createFeatureSelector<ProjectTypeState>('projectType');

export const getFields = createSelector(getProjectTypeState,
    (state: ProjectTypeState) => state.fields);

export const getSelectedField = createSelector(getProjectTypeState,
    (state: ProjectTypeState) => state.selectedField);