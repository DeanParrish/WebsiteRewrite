import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
//import { ToastrService } from 'ngx-toastr';

import { AuthService } from "../services/authservice.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) 
  {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  // for accessing to form fields
  get fval() {
    return this.loginForm.controls;
  }

  onFormSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.auth
      .doEmailLogin({email: this.fval.email.value, pass: this.fval.password.value})
      .then(
        (data) => {
          this.router.navigate(["/"]);
        },
        (error) => {
          this.loading = false;
        }
      );
  }
}
