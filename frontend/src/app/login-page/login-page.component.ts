import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { UserAlreadyExistsException } from "../auth/auth.exceptions";
import { AuthService } from "../auth/auth.service";
import { LangService } from "../lang/lang.service";
import { HttpService } from "../service/http.service";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.sass"],
})
export class LoginPageComponent {
  constructor(
    readonly authService: AuthService,
    readonly langService: LangService,
    readonly router: Router,
    readonly httpService: HttpService
  ) {}

  onSubmit(self: NgForm) {
    const nickname = self.value.nickname;
    const password = self.value.password;

    this.authService.login(nickname, password).then((user) => {
      this.httpService.login(user).subscribe(
        (response) => {
          if (response && response.nickname === "ok") {
            alert("Connecté!");
          } else {
            alert("Mauvais identifiant ou mot de passe !");
          }
        },
        (e) => {
          console.log("erreur", e);
        },
        () => {
          this.router.navigateByUrl("/");
        }
      );

      this.router.navigateByUrl("");
    });
  }
}
