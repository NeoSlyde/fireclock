import { Component } from "@angular/core";
import { LangService } from "../lang/lang.service";
import { UnimplementedException } from "../misc/unimplemented-exception";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.sass"],
})
export class MainPageComponent {
  onRegisterNow() {
    throw new UnimplementedException("");
  }
  constructor(readonly langService: LangService) {}
}
