import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

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
    console.log(this.activeNode)
  }

}
