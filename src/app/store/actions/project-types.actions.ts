import { createAction, props } from '@ngrx/store'
import { IProjectType } from '@app/models/project-type.model';

export enum ActionTypes {
    GetProjectTypes = '[PROJECT TYPES] Get Project Types',
    ProjectTypesLoaded = '[PROJECT TYPES] Load success',
    ErrorProjectTypes = '[PROJECT TYPES] Error',
    BeginCreateProjectType = '[PROJECT TYPE] Begin create project type',
    SuccessCreateProjectType = '[PROJECT TYPES] Success create project type',
}

export const GetProjectTypesAction = createAction(
    ActionTypes.GetProjectTypes
);

export const ProjecctTypesLoadedAction = createAction(
    ActionTypes.ProjectTypesLoaded,
    props<{ payload }>()
);

export const ErrorProjectTypesAction = createAction(
    ActionTypes.ErrorProjectTypes, props<Error>()
);

export const BeginCreateProjectTypeAction = createAction(
    ActionTypes.BeginCreateProjectType,
    props<{ payload: IProjectType }>()
);

export const SuccessCreateProjectTypeAction = createAction(
    ActionTypes.SuccessCreateProjectType,
    props<{ payload }>()
);
