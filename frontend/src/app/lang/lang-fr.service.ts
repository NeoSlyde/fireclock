import { Injectable } from "@angular/core";
import { LangService } from "./lang.service";

@Injectable({
  providedIn: "root",
})
export class LangFrService extends LangService {
  constructor() {
    super();
  }

  override appName(): string {
    return "Horloge de Feu";
  }
  catchLine(): string {
    return "Le pouvoir du temps, dans la paume de vos mains.";
  }

  registerNow(): string {
    return "S'inscrire";
  }
}
