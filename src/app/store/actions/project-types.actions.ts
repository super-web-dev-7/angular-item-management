import { createAction, props } from '@ngrx/store'

export enum ActionTypes {
    GetProjectTypes = '[PROJECT TYPES] Get Project Types',
    ProjectTypesLoaded = '[PROJECT TYPES] Load success',
    ErrorProjectTypes = '[PROJECT TYPES] Error'
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