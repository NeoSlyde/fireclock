import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { User } from "../model/user.model";
import { HttpHeaders } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class HttpService {
  private serverUrl = "http://localhost:3200/";
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<any> {
    return this.http.get(this.serverUrl + "user-list");
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

  public login(user: any): Observable<User> {
    return this.http
      .post<User>(this.serverUrl + "login", user, this.httpOptions)
      .pipe(
        map((res) => {
          if (!!(res as any).error) throw new Error("User not found");
          return res;
        })
      );
  }

  public createTask(user: any): Observable<User> {
    return this.http.post<User>(
      this.serverUrl + "new-task",
      user,
      this.httpOptions
    );
  }
}
