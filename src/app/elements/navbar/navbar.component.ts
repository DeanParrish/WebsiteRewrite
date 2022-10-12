import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  activeNode: string;
  constructor(public auth: AuthService) {

   }

  ngOnInit() {
  }

  logout(){
    this.auth.doLogOut();
  }

}
