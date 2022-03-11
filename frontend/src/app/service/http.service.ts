import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { User } from "../model/user.model";
import { HttpHeaders } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class HttpService {
  private serverUrl = "http://localhost:3200/";
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<any> {
    return this.http.get(this.serverUrl + "register");
  }
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  public createUser(user: any): Observable<User> {
    return this.http.post<User>(
      this.serverUrl + "register",
      user,
      this.httpOptions
    );
  }
}
