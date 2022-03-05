import { Injectable } from "@angular/core";
import { LangService } from "./lang.service";

@Injectable({
  providedIn: "root",
})
export class LangJpService extends LangService {
  constructor() {
    super();
  }

  override appName(): string {
    return "火の時計";
  }

  catchLine(): string {
    return "あなたの手のひらの上で、時間の力。";
  }

  registerNow(): string {
    return "登録";
  }
}
