import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthService } from "./auth/auth.service";
import { LangFrService } from "./lang/lang-fr.service";
import { LangService } from "./lang/lang.service";
import { NavbarComponent } from "./navbar/navbar.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { RegisterPageComponent } from "./register-page/register-page.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { LoginPageComponent } from "./login-page/login-page.component";
import { TaskPageComponent } from "./task-page/task-page.component";
import { DummyAuthService } from "./auth/dummy-auth.service";
import { TasksService } from "./tasks/tasks.service";
import { DummyTasksService } from "./tasks/dummy-tasks.service";
import { ActivityService } from "./activities/activity.service";
import { DummyActivityService } from "./activities/dummy-activity.service";
import { SingleTaskPageComponent } from "./task-page/single-task-page/single-task-page.component";
import { MinutesToTimePipe } from "./misc/minutes-to-time.pipe";
import { HttpAuthService } from "./auth/http-auth.service";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainPageComponent,
    RegisterPageComponent,
    LoginPageComponent,
    TaskPageComponent,
    SingleTaskPageComponent,
    MinutesToTimePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: LangService, useClass: LangFrService },
    { provide: AuthService, useClass: HttpAuthService },
    { provide: TasksService, useClass: DummyTasksService },
    { provide: ActivityService, useClass: DummyActivityService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
