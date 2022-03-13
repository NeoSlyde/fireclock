import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, firstValueFrom, Observable } from "rxjs";
import {
  UserAlreadyExistsException,
  UserDoesntExistException,
  WrongPasswordException,
} from "./auth.exceptions";
import { AuthService, User } from "./auth.service";

const jsonContentTypeOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class HttpAuthService extends AuthService {
  constructor(readonly http: HttpClient) {
    super();
    // Fetch the current user on the backend when opening the app
    firstValueFrom(
      this.http.get<User | null>("/api/current-user", jsonContentTypeOptions)
    ).then((u) => this._currentUser.next(u));
  }

  _currentUser = new BehaviorSubject<User | null>(null);

  override currentUser(): Observable<User | null> {
    return this._currentUser;
  }

  override async login(nickname: string, password: string): Promise<void> {
    try {
      const user = await firstValueFrom(
        this.http.post<User>(
          "/api/login",
          { nickname, password },
          jsonContentTypeOptions
        )
      );
      this._currentUser.next(user);
    } catch (e: any) {
      if (e.error === "user not found")
        throw new UserDoesntExistException(nickname);
      else if (e.error === "wrong password") throw new WrongPasswordException();
      throw new Error("???");
    }
  }

  override async register(nickname: string, password: string): Promise<User> {
    try {
      const user = await firstValueFrom(
        this.http.post<User>(
          "/api/register",
          { nickname, password },
          jsonContentTypeOptions
        )
      );
      return user;
    } catch (e: any) {
      if (e.error === "user already exists")
        throw new UserAlreadyExistsException(nickname);
      throw new Error("???");
    }
  }

  override async logout(): Promise<void> {
    const res = await firstValueFrom(
      this.http.get<User>("/api/logout", jsonContentTypeOptions)
    );
    this._currentUser.next(null);
  }
}
