
import * as projectTypes from '../actions/projects.actions';
import { createFeatureSelector, createSelector, createReducer, on, Action } from '@ngrx/store';
import * as Immutable from 'immutable';
import { initializeProjectsState, ProjectsState } from '../states/projects.state';


export const intialState = initializeProjectsState();

const reducer = createReducer(
  intialState,
  on(projectTypes.GetProjectsAction, state => state),
  on(projectTypes.ProjectsLoadedAction, (state: ProjectsState, { payload }) => {
    return {
      ...state,
      projects: payload
    };
  }),
  on(projectTypes.BeginCreateProjectAction, state => state),
  on(projectTypes.SuccessCreateProjectAction, (state: ProjectsState, { payload }) => {
    return {
      ...state,
      projects: [...state.projects, payload]
    };
  }),
  on(projectTypes.BeginDeleteProjectAction, state => state),
  on(projectTypes.SuccessDeleteProjectAction, (state: ProjectsState, { payload }) => {
    return {
      ...state,
      projects: state.projects.filter((project) => project._id != payload)
    };
  }),
);

export function ProjectsReducer(state: ProjectsState | undefined, action: Action) {
  return reducer(state, action);
}

export const getProjectsState = createFeatureSelector<ProjectsState>('projects');

export const getProjects = createSelector(getProjectsState,
  (state: ProjectsState) => state.projects);
