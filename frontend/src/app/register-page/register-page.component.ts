import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { UserAlreadyExistsException } from "../auth/auth.exceptions";
import { AuthService } from "../auth/auth.service";
import { LangService } from "../lang/lang.service";
import { HttpService } from "../service/http.service";

@Component({
  selector: "app-register-page",
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.sass"],
})
export class RegisterPageComponent {
  constructor(
    readonly authService: AuthService,
    readonly langService: LangService,
    readonly router: Router,
    readonly httpService: HttpService
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
        this.httpService.createUser(user).subscribe(
          (response) => {
            if (response && response.nickname === "ok") {
              alert("User crée");
            } else {
              alert("User Existe !");
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
