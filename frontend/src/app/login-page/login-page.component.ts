import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import {
  UserDoesntExistException,
  WrongPasswordException,
} from "../auth/auth.exceptions";
import { AuthService } from "../auth/auth.service";
import { LangService } from "../lang/lang.service";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.sass"],
})
export class LoginPageComponent {
  constructor(
    readonly authService: AuthService,
    readonly langService: LangService,
    readonly router: Router
  ) {}

  onSubmit(self: NgForm) {
    const nickname = self.value.nickname;
    const password = self.value.password;

    this.authService
      .login(nickname, password)
      .then((user) => {
        this.router.navigateByUrl("");
      })
      .catch((error) => {
        if (error instanceof UserDoesntExistException) {
          alert(this.langService.userDoesntExists());
        } else if (error instanceof WrongPasswordException) {
          alert(this.langService.wrongPassword());
        } else {
          throw error;
        }
      });
  }
}
