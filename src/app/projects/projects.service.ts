import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class ProjectsService {
    constructor(private httpClient: HttpClient) { }
  
    public getProjects(){
      return this.httpClient.get(environment.apiUrl+"/project");
    }

  }