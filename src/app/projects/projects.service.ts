import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProjectsService {
    constructor(private httpClient: HttpClient) {
    }

    public getProjects() {
        return this.httpClient.get(environment.apiUrl + '/project');
    }

    public archiveProject(projectId) {
        return this.httpClient.delete(environment.apiUrl+"/project/"+projectId);
      }

      public pinProject(projectId) {
        return this.httpClient.put(environment.apiUrl+"/project/pin/"+projectId, {});
      }
    
    public getFieldsByProject(projectId) {
        return this.httpClient.get(`${environment.apiUrl}/project/fields/${projectId}`);
    }

    public getProject(projectId) {
        return this.httpClient.get(`${environment.apiUrl}/project/${projectId}`);
    }

}
