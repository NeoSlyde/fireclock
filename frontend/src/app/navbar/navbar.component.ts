import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService, User } from "../auth/auth.service";
import { LangService } from "../lang/lang.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.sass"],
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor(
    readonly langService: LangService,
    readonly authService: AuthService
  ) {}
  currentUser: User | null = null;
  userSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.authService.currentUser().subscribe((user) => {
      this.currentUser = user;
    });
  }
  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
