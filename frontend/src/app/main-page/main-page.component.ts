import { Component } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { LangService } from "../lang/lang.service";
import { UnimplementedException } from "../misc/unimplemented-exception";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.sass"],
})
export class MainPageComponent {
  constructor(
    readonly langService: LangService,
    readonly authService: AuthService
  ) {}
}
