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

  async getUserByNickname(nickname: string): Promise<User | null> {
    const u = this._userDb.find(
      (u) => u.nickname.toLowerCase() === nickname.toLowerCase()
    );
    return u ?? null;
  }

  override currentUser(): Observable<User> {
    throw this._currentUserSubject;
  }

  override async login(nickname: string, password: string): Promise<void> {
    const u = await this.getUserByNickname(nickname);
    if (u === null) throw new UserDoesntExistException(nickname);
    if (this._passwords.get(u.id) !== password)
      throw new WrongPasswordException();
    this._currentUserSubject.next(u ?? null);
  }

  override async register(nickname: string, password: string): Promise<User> {
    const u = await this.getUserByNickname(nickname);
    if (u !== null) throw new UserAlreadyExistsException(nickname);
    const user = { id: "user-" + Math.random(), nickname };
    this._userDb.push(user);
    this._passwords.set(user.id, password);
    return user;
  }

  override async updateCurrentUserNickname(newNickname: string): Promise<void> {
    const u = this._currentUserSubject.value;
    if (u === null) throw new UnauthenticatedException();
    // Works because getUserByNickname returns a reference in the dummy db
    u.nickname = newNickname;
  }

  override async updateCurrentUserPassword(newPassword: string): Promise<void> {
    const u = this._currentUserSubject.value;
    if (u === null) throw new UnauthenticatedException();
    this._passwords.set(u.id, newPassword);
  }

  override async deleteCurrentUser(): Promise<void> {
    const u = this._currentUserSubject.value;
    if (u === null) throw new UnauthenticatedException();
    this._userDb = this._userDb.filter((u) => u.id !== u.id);
    this._passwords.delete(u.id);
  }
}
