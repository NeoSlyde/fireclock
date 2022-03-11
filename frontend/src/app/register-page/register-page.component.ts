import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { UserAlreadyExistsException } from "../auth/auth.exceptions";
import { AuthService } from "../auth/auth.service";
import { LangService } from "../lang/lang.service";

@Component({
  selector: "app-register-page",
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.sass"],
})
export class RegisterPageComponent {
  constructor(
    readonly authService: AuthService,
    readonly langService: LangService,
    readonly router: Router
  ) {}

  onSubmit(self: NgForm) {
    const nickname = self.value.nickname;
    const password = self.value.password;
    this.authService
      .register(nickname, password)
      .catch((error) => {
        if (error instanceof UserAlreadyExistsException) {
          alert(this.langService.userAlreadyExists());
        } else {
          throw error;
        }
      })
      .then((user) => {
        this.router.navigateByUrl("");
      });
  }
}
