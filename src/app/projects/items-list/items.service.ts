import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ItemsService {
  constructor(private httpClient: HttpClient) {}

  // requestOptions = {
  //   headers: new Headers(this.headerDict)
  // };

  public getItemsByProject(projectId) {
    return this.httpClient.get(
      `${environment.apiUrl}/item/project/${projectId}`
    );
  }

  public newItemByProject(projectId, data) {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    };
    return this.httpClient.post<any>(`${environment.apiUrl}/item`, data, {
      headers
    });
  }
}
