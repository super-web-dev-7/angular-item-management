import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, take } from 'rxjs/operators';
import * as ProjectTypesActions from '@store/actions/project-types.actions';
import { environment } from 'environments/environment';
import { IField } from '@app/models/field.model';

@Injectable()
export class ProjectTypesEffects {
  constructor(private http: HttpClient, private action$: Actions) {}

  GetFields$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ProjectTypesActions.GetProjectTypesAction),
      mergeMap(action =>
        this.http.get(`${environment.apiUrl}/project-type`).pipe(
          map((types: IField[]) => {
            return ProjectTypesActions.ProjecctTypesLoadedAction({ payload: types });
          }),
          catchError((error: Error) => {
            return of(ProjectTypesActions.ErrorProjectTypesAction(error));
          })
        )
      ),
      take(1)
    )
  );
}

