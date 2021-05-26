import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/authservice.service';
// import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  activeNode: string;
  isAuthenticated: any;
  constructor(public auth: AuthService) {
    auth.isUserAuthenicated().then((res) => {
      this.isAuthenticated = res.isUserLoggedIn;
    });
   }

  ngOnInit() {
  }

  logout(){
    this.auth.doLogOut();
  }

}
