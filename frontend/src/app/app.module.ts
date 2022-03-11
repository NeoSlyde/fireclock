import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthService } from "./auth/auth.service";
import { DummyAuthService } from "./auth/dummy_auth.service";
import { LangEnService } from "./lang/lang-en.service";
import { LangService } from "./lang/lang.service";
import { NavbarComponent } from "./navbar/navbar.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { RegisterPageComponent } from "./register-page/register-page.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainPageComponent,
    RegisterPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [
    { provide: LangService, useClass: LangEnService },
    { provide: AuthService, useClass: DummyAuthService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
