import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
@Injectable({ providedIn: "root" })
export class HttpService {
  private serverUrl = "http://localhost:8080/";
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<any> {
    return this.http.get(this.serverUrl + "users");
  }
}
