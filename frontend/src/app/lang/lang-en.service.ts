import { Injectable } from "@angular/core";
import { LangService } from "./lang.service";

@Injectable({
  providedIn: "root",
})
export class LangEnService extends LangService {
  constructor() {
    super();
  }

  catchLine(): string {
    return "The power of time, in the palm of your hand.";
  }

  registerNow(): string {
    return "Register now";
  }

  register(): string {
    return "Register";
  }

  login(): string {
    return "Login";
  }
  password(): string {
    return "Password";
  }

  nickname(): string {
    return "Nickname";
  }

  userAlreadyExists(): string {
    return "User already exists";
  }

  userDoesntExists(): string {
    return "User doesn't exists";
  }

  wrongPassword(): string {
    return "Wrong Password";
  }

  tasks(): string {
    return "Tasks";
  }

  manageTasks(): string {
    return "Manage Tasks";
  }
}
