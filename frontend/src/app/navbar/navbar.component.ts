import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LangService } from "../lang/lang.service";
import { HttpService } from "../service/http.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.sass"],
})
export class NavbarComponent implements OnInit {
  userLogin: FormGroup;

  constructor(
    readonly langService: LangService,
    private formBuilder: FormBuilder,
    private router: Router,
    private httpService: HttpService
  ) {
    this.userLogin = formBuilder.group({
      title: formBuilder.control("initial value", Validators.required),
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userLogin = this.formBuilder.group({
      userName: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  onSubmitForm() {
    const formValue = this.userLogin.value;
    console.log(formValue);
  }
}
