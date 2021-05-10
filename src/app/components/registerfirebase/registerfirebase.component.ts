import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatDialog, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../services/authservice.service';

const googleLogoURL = 
"https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";

@Component({
  selector: 'app-registerfirebase',
  templateUrl: './registerfirebase.component.html',
  styleUrls: ['./registerfirebase.component.css']
})
export class RegisterfirebaseComponent implements OnInit {
  errorMessage: string;
  successMessage: string;
  registerForm: any;
  registerEmailClicked: boolean;
  constructor(private authService: AuthService, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private dialog: MatDialog) { 
    this.matIconRegistry.addSvgIcon("imgGoogle", this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
    this.registerForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl('', [Validators.required, Validators.minLength(10)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(10)])
    }, {validators: this.passwordErrorValidator});
  }

  ngOnInit(): void {
  }

  showEmailForm(){
    this.registerEmailClicked = true;
  }

  passwordErrorValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const repeatPassword = control.get('passwordConfirm');
    return password.value != repeatPassword.value ? { 'passwordError': true } : null;
  };

  loginWithGoogle(){
    this.authService.doGoogleLogin().then(res => {
      this.dialog.closeAll();
    }, rej => {
      this.errorMessage = rej;
    })
  }

  tryRegister(value){

    console.log(this.registerForm.errors);

    if(!this.registerForm.errors){
      this.authService.doRegister(value)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.successMessage = "Your account has been created";
        this.dialog.closeAll();
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      })
    };
    
    
  }

}
