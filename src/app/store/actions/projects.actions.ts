import { Action, createAction, props } from '@ngrx/store'
import { IField } from '../../models/field.model'

export enum ProjectsActionTypes {
    GetProjects = '[PROJECTS] Get Projects',
    ProjectsLoaded = '[PROJECTS] Load success',
    BeginCreateProject = '[PROJECTS] Begin create project',
    SuccessCreateProject = '[PROJECTS] Success create project',
    ErrorProjects = '[PROJECTS] Error',
}

export const GetProjectsAction = createAction(
    ProjectsActionTypes.GetProjects
);

export const ProjectsLoadedAction = createAction(
    ProjectsActionTypes.ProjectsLoaded,
    props<{ payload }>()
);

export const BeginCreateProject = createAction(
    ProjectsActionTypes.BeginCreateProject
);

export const SuccessCreateProject = createAction(
    ProjectsActionTypes.SuccessCreateProject,
    props<{ payload }>()
);

export const ErrorProjectsAction = createAction(
    ProjectsActionTypes.ErrorProjects, props<Error>()
);