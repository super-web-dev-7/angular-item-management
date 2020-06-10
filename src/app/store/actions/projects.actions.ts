import { Action, createAction, props } from '@ngrx/store'
import { IField } from '../../models/field.model'
import { IProject } from '@app/models/project';

export enum ProjectsActionTypes {
    GetProjects = '[PROJECTS] Get Projects',
    ProjectsLoaded = '[PROJECTS] Load success',
    BeginCreateProject = '[PROJECTS] Begin create project',
    SuccessCreateProject = '[PROJECTS] Success create project',
    BeginDeleteProject = '[PROJECTS] Begin delete project',
    SuccessDeleteProject = '[PROJECTS] Success delete project',
    ErrorProjects = '[PROJECTS] Error',
}

export const GetProjectsAction = createAction(
    ProjectsActionTypes.GetProjects
);

export const ProjectsLoadedAction = createAction(
    ProjectsActionTypes.ProjectsLoaded,
    props<{ payload }>()
);

export const BeginCreateProjectAction = createAction(
    ProjectsActionTypes.BeginCreateProject,
    props<{ payload: IProject }>()
);

export const SuccessCreateProjectAction = createAction(
    ProjectsActionTypes.SuccessCreateProject,
    props<{ payload }>()
);

export const BeginDeleteProjectAction = createAction(
    ProjectsActionTypes.BeginDeleteProject,
    props<{ payload: string }>()
);

export const SuccessDeleteProjectAction = createAction(
    ProjectsActionTypes.SuccessDeleteProject,
    props<{ payload }>()
);

export const ErrorProjectsAction = createAction(
    ProjectsActionTypes.ErrorProjects, props<Error>()
);