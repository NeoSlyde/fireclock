import { Injectable } from "@angular/core";
import { Interval } from "../tasks/tasks.service";
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

  logout(): string {
    return "Logout";
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

  newTask(): string {
    return "New Task";
  }

  minutesPer(): string {
    return "Minutes per";
  }
  translateInterval(interval: Interval): string {
    return interval;
  }
}
