import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthService } from "./auth/auth.service";
import { DummyAuthService } from "./auth/dummy_auth.service";
import { LangEnService } from "./lang/lang-en.service";
import { LangService } from "./lang/lang.service";
import { NavbarComponent } from "./navbar/navbar.component";

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    { provide: LangService, useClass: LangEnService },
    { provide: AuthService, useClass: DummyAuthService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
