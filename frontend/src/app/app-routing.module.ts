import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainPageComponent } from "./main-page/main-page.component";
import { RegisterPageComponent } from "./register-page/register-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { TaskPageComponent } from "./task-page/task-page.component";

const routes: Routes = [
  { path: "", component: MainPageComponent },
  { path: "register", component: RegisterPageComponent },
  { path: "login", component: LoginPageComponent },
  { path: "tasks", component: TaskPageComponent },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
