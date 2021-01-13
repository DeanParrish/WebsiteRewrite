import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-loginlink',
  templateUrl: './loginlink.component.html',
  styleUrls: ['./loginlink.component.css']
})
export class LoginlinkComponent implements OnInit {

  constructor(public auth: AuthService) {}

  ngOnInit(): void {}

  loginWithRedirect(): void {
    this.auth.loginWithRedirect();
  }

}
