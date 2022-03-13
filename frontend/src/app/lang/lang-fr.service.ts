import { Injectable } from "@angular/core";
import { Interval } from "../tasks/tasks.service";
import { LangService } from "./lang.service";

@Injectable({
  providedIn: "root",
})
export class LangFrService extends LangService {
  constructor() {
    super();
  }

  catchLine(): string {
    return "Le pouvoir du temps, dans la paume de votre main.";
  }

  registerNow(): string {
    return "Creer un compte";
  }

  register(): string {
    return "Creer un compte";
  }

  login(): string {
    return "Se connecter";
  }
  logout(): string {
    return "Se déconnecter";
  }
  password(): string {
    return "Mot de passe";
  }

  nickname(): string {
    return "Pseudonyme";
  }

  userAlreadyExists(): string {
    return "L'utilisateur existe déjà";
  }

  userDoesntExists(): string {
    return "L'utilisateur n'existe pas";
  }

  wrongPassword(): string {
    return "Mot de passe incorrect";
  }

  tasks(): string {
    return "Taches";
  }

  manageTasks(): string {
    return "Gérer les taches";
  }

  newTask(): string {
    return "Nouvelle tache";
  }

  minutesPer(): string {
    return "Minutes par";
  }
  translateInterval(interval: Interval): string {
    switch (interval) {
      case "day":
        return "jour";
      case "week":
        return "semaine";
      case "month":
        return "mois";
      case "year":
        return "année";
    }
  }
}
