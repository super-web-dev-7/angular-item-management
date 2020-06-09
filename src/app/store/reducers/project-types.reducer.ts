
import * as ProjectTypesActions from '../actions/project-types.actions';
import { createFeatureSelector, createSelector, createReducer, on, Action } from '@ngrx/store';
import { ProjectTypesState, initializeProjectTypesState } from '../states/project-types.state';


export const intialState = initializeProjectTypesState();

const reducer = createReducer(
  intialState,
  on(ProjectTypesActions.GetProjectTypesAction, state => state),
  on(ProjectTypesActions.ProjecctTypesLoadedAction, (state: ProjectTypesState, { payload }) => {
    return {
      ...state,
      types: payload
    };
  }),
  on(ProjectTypesActions.BeginCreateProjectTypeAction, state => state),
  on(ProjectTypesActions.SuccessCreateProjectTypeAction, (state: ProjectTypesState, { payload }) => {
    return {
      ...state,
      types: [...state.types, payload]
    };
  }),
);

export function ProjectTypesReducer(state: ProjectTypesState | undefined, action: Action) {
  return reducer(state, action);
}

export const getProjectTypesState = createFeatureSelector<ProjectTypesState>('projectTypes');

export const getTypes = createSelector(getProjectTypesState,
  (state: ProjectTypesState) => state.types);