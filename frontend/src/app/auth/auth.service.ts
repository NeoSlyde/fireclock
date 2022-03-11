import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
export interface User {
  id: string;
  nickname: string;
}

@Injectable({
  providedIn: "root",
})
export abstract class AuthService {
  abstract getUserByNickname(nickname: string): Promise<User | null>;
  abstract currentUser(): Observable<User | null>;

  // Tries to login to the api using the given credentials.
  // On success, currentUser is updated with the new logged in user.
  // On failure, currentUser is set to null and an exception is thrown:
  //   - UserDoesntExistException
  //   - WrongPasswordException
  abstract login(nickname: string, password: string): Promise<void>;

  // Tries to register a new user using the given credentials.
  // This only registers the user, it does not log in.
  // If registration fails, an exception is thrown:
  //   - UserAlreadyExistsException
  abstract register(nickname: string, password: string): Promise<User>;

  // Updates a nickname. Can throw an exception:
  //   - UnauthenticatedException
  abstract updateCurrentUserNickname(newNickname: string): Promise<void>;

  // Updates the current user password. Can throw an exception:
  //   - UnauthenticatedException
  abstract updateCurrentUserPassword(newPassword: string): Promise<void>;

  // Deletes the current user. Can throw an exception:
  //   - UnauthenticatedException
  abstract deleteCurrentUser(): Promise<void>;

  // Can throw the exceptions of both login and register.
  async registerAndLogin(nickname: string, password: string): Promise<User> {
    const user = await this.register(nickname, password);
    await this.login(nickname, password);
    return user;
  }

  isAuthenticated(): Observable<boolean> {
    return this.currentUser().pipe(map((user) => !!user));
  }
}
