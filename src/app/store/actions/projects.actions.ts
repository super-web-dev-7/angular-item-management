import { Action, createAction, props } from '@ngrx/store'
import { IField } from '../../models/field.model'

export enum ProjectsActionTypes {
    GetProjects = '[PROJECTS] Get Projects',
    ProjectsLoaded = '[PROJECTS] Load success',
    ErrorProjects = '[PROJECTS] Error',
}

export const GetProjectsAction = createAction(
    ProjectsActionTypes.GetProjects
);

export const ProjectsLoadedAction = createAction(
    ProjectsActionTypes.ProjectsLoaded,
    props<{ payload }>()
);

export const ErrorProjectsAction = createAction(
    ProjectsActionTypes.ErrorProjects, props<Error>()
);