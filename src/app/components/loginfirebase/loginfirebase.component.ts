import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/authservice.service';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { RegisterfirebaseComponent } from './../registerfirebase/registerfirebase.component';
import { DomSanitizer } from '@angular/platform-browser';


const googleLogoURL = 
"https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";

@Component({
  selector: 'app-loginfirebase',
  templateUrl: './loginfirebase.component.html',
  styleUrls: ['./loginfirebase.component.css']
})
export class LoginfirebaseComponent implements OnInit {
  errorMessage: string;
  successMessage: string;
  registerForm: any;
  loginEmailClicked: boolean;
  constructor(private authService: AuthService, private dialog: MatDialog, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer,) { 
    this.matIconRegistry.addSvgIcon("imgGoogle", this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  loginWithEmail(value){
    this.authService.doEmailLogin(value)
    .then(res => {
      this.errorMessage = "";
      this.successMessage = "Your account has been created";
      this.dialog.closeAll();
      location.reload();
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    });
  }

  loginWithGoogle(){
    this.authService.doGoogleLogin().then(res =>{
      this.dialog.closeAll();
    })

  }

  registerRedirect(): void {
    // this.auth.loginWithRedirect();
    let dialogRef = this.dialog.open(RegisterfirebaseComponent, {
     height: '400px',
     width: '600px',
   });

}

showEmailForm(){
  this.loginEmailClicked = true;
}

}
