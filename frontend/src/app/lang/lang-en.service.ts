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
}
