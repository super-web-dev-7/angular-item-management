import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { environment } from "../../environments/environment";
import { AuthData } from "./auth-data.model";

const BACKEND_URL = environment.apiUrl + "/user";

@Injectable({ providedIn: "root" })
export class AuthService {
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return localStorage.getItem('token');
  }

  getIsAuth() {
    return localStorage.getItem('currentUser') != undefined;
  }

  getUserId() {
    return localStorage.getItem('currentUser');
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post(BACKEND_URL + "/signup", authData).subscribe(
      () => {
        this.router.navigate(["/"]);
      },
      error => {
        this.authStatusListener.next(false);
      }
    );
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        BACKEND_URL + "/login",
        authData
      )
      .subscribe(
        response => {
          const token = response.token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            const userId = response.userId;
            localStorage.setItem('currentUser', userId);
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this.saveAuthData(token, expirationDate, userId);
            this.router.navigate(["/"]);
          }
        },
        error => {
          this.authStatusListener.next(false);
        }
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigate(["/auth/signin"]);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    };
  }
}
