import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LangEnService } from "./lang/lang-en.service";
import { LangService } from "./lang/lang.service";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [{ provide: LangService, useClass: LangEnService }],
  bootstrap: [AppComponent],
})
export class AppModule {}
