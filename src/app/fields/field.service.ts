import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  constructor(private httpClient: HttpClient) { }

    public getFields(){
      return this.httpClient.get(`${environment.apiUrl}/field`);
    }
    public addField(data){   
      return this.httpClient.post(`${environment.apiUrl}/field`,data);
    }
}
