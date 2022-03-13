import { Injectable } from "@angular/core";

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
}
