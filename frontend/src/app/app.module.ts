import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LangEnService } from "./lang/lang-en.service";
import { LangFrService } from "./lang/lang-fr.service";
import { LangService } from "./lang/lang.service";
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [{ provide: LangService, useClass: LangFrService }],
  bootstrap: [AppComponent],
})
export class AppModule {}
