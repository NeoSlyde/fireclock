import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export abstract class LangService {
  appName(): string {
    return "FireClock";
  }
  abstract catchLine(): string;
}
