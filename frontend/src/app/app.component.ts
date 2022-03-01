import { Component, OnInit } from "@angular/core";
import { LangService } from "./lang/lang.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"],
})
export class AppComponent {
  constructor(readonly langService: LangService) {}
}
