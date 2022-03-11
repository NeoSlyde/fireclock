import { Component } from "@angular/core";
import { UnimplementedException } from "./misc/unimplemented-exception";
import { LangService } from "./lang/lang.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"],
})
export class AppComponent {
  onRegisterNow() {
    throw new UnimplementedException("");
  }
  constructor(readonly langService: LangService) {}
}
