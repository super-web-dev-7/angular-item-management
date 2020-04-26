import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectTypeService {

  constructor(private httpClient: HttpClient) { }
  
  public getProjectTypes() {
    return this.httpClient.get(environment.apiUrl+"/project-type");
  }

  public addFieldToProjectType(projectTypeId, fieldIds) {
    const addFieldParams = {projectTypeId, fieldIds: fieldIds};
    return this.httpClient.patch(environment.apiUrl+"/project-type/add-fields", addFieldParams);
  }

  public getFieldsByProjectType(projectTypeId) {
    return this.httpClient.get(environment.apiUrl+"/project-type/fields/projectTypeId/"+projectTypeId);
  }
}
