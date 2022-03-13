import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import {
  UnauthenticatedException,
  UserAlreadyExistsException,
  UserDoesntExistException,
  WrongPasswordException,
} from "./auth.exceptions";
import { AuthService, User } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class DummyAuthService extends AuthService {
  _currentUserSubject = new BehaviorSubject<User | null>(null);

  _userDb: User[] = [];

  // Maps user ids to passwords
  _passwords: Map<string, string> = new Map();

  async _getUserByNickname(nickname: string): Promise<User | null> {
    const u = this._userDb.find(
      (u) => u.nickname.toLowerCase() === nickname.toLowerCase()
    );
    return u ?? null;
  }

  override currentUser(): Observable<User | null> {
    return this._currentUserSubject;
  }

  override async login(nickname: string, password: string): Promise<void> {
    const u = await this._getUserByNickname(nickname);
    if (u === null) throw new UserDoesntExistException(nickname);
    if (this._passwords.get(u.id) !== password)
      throw new WrongPasswordException();
    this._currentUserSubject.next(u ?? null);
  }

  override async logout(): Promise<void> {
    this._currentUserSubject.next(null);
  }

  override async register(nickname: string, password: string): Promise<User> {
    const u = await this._getUserByNickname(nickname);
    if (u !== null) throw new UserAlreadyExistsException(nickname);
    const user = { id: "user-" + Math.random(), nickname, password };
    this._userDb.push(user);
    this._passwords.set(user.id, password);
    return user;
  }
}
