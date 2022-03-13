import { Injectable } from "@angular/core";
import { Interval } from "../tasks/tasks.service";

@Injectable({
  providedIn: "root",
})
export abstract class LangService {
  appName(): string {
    return "FireClock";
  }
  abstract catchLine(): string;
  abstract registerNow(): string;
  abstract register(): string;
  abstract login(): string;
  abstract password(): string;
  abstract nickname(): string;
  abstract userAlreadyExists(): string;
  abstract userDoesntExists(): string;
  abstract wrongPassword(): string;
  abstract tasks(): string;
  abstract manageTasks(): string;
  abstract newTask(): string;
  abstract minutesPer(): string;
  abstract translateInterval(interval: Interval): string;
}
