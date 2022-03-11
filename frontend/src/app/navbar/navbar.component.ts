import { Component, OnInit } from "@angular/core";
import { LangService } from "../lang/lang.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.sass"],
})
export class NavbarComponent implements OnInit {
  constructor(readonly langService: LangService) {}
  ngOnInit(): void {}
}
