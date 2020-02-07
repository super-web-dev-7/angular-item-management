import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ItemsService {
  constructor(private httpClient: HttpClient) {}

  headerDict = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  requestOptions = {
    headers: new Headers(this.headerDict)
  };
  public getItemsByProject(projectId) {
    return this.httpClient.get(
      `${environment.apiUrl}/item/project/${projectId}`
    );
  }

  public newItemByProject(projectId, data) {
    data = JSON.stringify(data);
    return this.httpClient.post(
      `${environment.apiUrl}/item/project/${projectId}`,
      data
    );
  }
}
