import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as ProjectTypeActions from '@store/actions/project-type.actions';
import { environment } from 'environments/environment';
import { IField } from '@app/models/field.model';

@Injectable()
export class ProjectTypeEffects {
  constructor(private http: HttpClient, private action$: Actions) {}

  GetFields$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ProjectTypeActions.GetFieldsAction),
      mergeMap(action =>
        this.http.get(`${environment.apiUrl}/project-type/fields/projectTypeId/${action.payload}`).pipe(
          map((fields: IField[]) => {
            return ProjectTypeActions.FieldsLoadedAction({ payload: this.createFieldsMap(fields) });
          }),
          catchError((error: Error) => {
            return of(ProjectTypeActions.ErrorFieldsAction(error));
          })
        )
      )
    )
  );

  private createFieldsMap(fields: IField[]) {
    let fieldsMap: {[id: string]: IField} = {};
    fields.forEach((field: IField) => {
      fieldsMap[field._id] = field;
    });
    return fieldsMap;
  }
}

