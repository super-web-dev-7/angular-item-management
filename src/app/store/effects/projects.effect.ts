import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, take } from 'rxjs/operators';
import * as ProjectActions from '@store/actions/projects.actions';
import { environment } from 'environments/environment';
import { IField } from '@app/models/field.model';
import { IProject } from '@app/models/project';

@Injectable()
export class ProjectsEffects {
  constructor(private http: HttpClient, private action$: Actions) { }

  GetProjects$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ProjectActions.GetProjectsAction),
      mergeMap(action =>
        this.http.get(`${environment.apiUrl}/project`).pipe(
          map((projects: IProject[]) => {
            return ProjectActions.ProjectsLoadedAction({ payload: projects });
          }),
          catchError((error: Error) => {
            return of(ProjectActions.ErrorProjectsAction(error));
          })
        )
      ),
      take(1)
    ),
  );

  CreateProject$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ProjectActions.BeginCreateProjectAction),
      mergeMap(action =>
        this.http.post(`${environment.apiUrl}/project`, action.payload).pipe(
          map((project: IProject[]) => {
            return ProjectActions.SuccessCreateProjectAction({ payload: project });
          }),
          catchError((error: Error) => {
            return of(ProjectActions.ErrorProjectsAction(error));
          })
        )
      )
    ),
  );

  DeleteProject$: Observable<Action> = createEffect(() =>
  this.action$.pipe(
    ofType(ProjectActions.BeginDeleteProjectAction),
    mergeMap(action =>
      this.http.delete(`${environment.apiUrl}/project/${action.payload}`).pipe(
        map((project: IProject) => {
          return ProjectActions.SuccessDeleteProjectAction({ payload: project._id });
        }),
        catchError((error: Error) => {
          return of(ProjectActions.ErrorProjectsAction(error));
        })
      )
    )
  ),
);
}
