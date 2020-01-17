import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private httpClient: HttpClient) { }

  public getItemsByProject(projectId){
    return this.httpClient.get(`${environment.apiUrl}/item/project/${projectId}`);
  }
}
