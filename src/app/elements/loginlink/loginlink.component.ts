import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/authservice.service';
import { LoginfirebaseComponent } from './../../components/loginfirebase/loginfirebase.component';
@Component({
  selector: 'app-loginlink',
  templateUrl: './loginlink.component.html',
  styleUrls: ['./loginlink.component.css']
})
export class LoginlinkComponent implements OnInit {

  constructor(public auth: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {}

  loginWithRedirect(): void {
   // this.auth.loginWithRedirect();
   let dialogRef = this.dialog.open(LoginfirebaseComponent, {
    height: '400px',
    width: '600px',
  });
  }

}
