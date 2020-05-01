import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, take } from 'rxjs/operators';
import * as ProjectActions from '@store/actions/projects.actions';
import { environment } from 'environments/environment';
import { IField } from '@app/models/field.model';

@Injectable()
export class ProjectsEffects {
  constructor(private http: HttpClient, private action$: Actions) { }

  GetFields$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ProjectActions.GetProjectsAction),
      mergeMap(action =>
        this.http.get(`${environment.apiUrl}/project`).pipe(
          map((projects: IField[]) => {
            console.log("Got projets");
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
}
