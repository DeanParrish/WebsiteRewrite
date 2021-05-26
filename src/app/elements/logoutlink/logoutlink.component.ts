import { Component, Inject, OnInit } from '@angular/core';
// import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { AuthService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-logoutlink',
  templateUrl: './logoutlink.component.html',
  styleUrls: ['./logoutlink.component.css']
})
export class LogoutlinkComponent implements OnInit {

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngOnInit(): void {}

  logout(): void {
    this.auth.doLogOut();
    location.reload();
  }

}
