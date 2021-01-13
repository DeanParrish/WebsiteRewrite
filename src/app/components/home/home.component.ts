import { Component, OnInit } from '@angular/core';
import { Title  } from "@angular/platform-browser";
import {NavbarComponent} from '../../elements/navbar/navbar.component'
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private titleService: Title, private navBar: NavbarComponent, public auth: AuthService) { 
    this.titleService.setTitle("Dean Parrish - Home")
    this.navBar.activeNode = "Home";
  }

  ngOnInit() {
    this.navBar.activeNode = "Home";
    this.auth.user$.subscribe(
      (x) => (console.log(JSON.stringify(x)))
    )
  }

  test(){
    this.auth.isLoading$;
    
  }

}
