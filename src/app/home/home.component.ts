import { Component, OnInit } from '@angular/core';
import { Title  } from "@angular/platform-browser";
import {NavbarComponent} from '../elements/navbar/navbar.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private titleService: Title, private navBar: NavbarComponent) { 
    this.titleService.setTitle("Dean Parrish - Home")
    this.navBar.activeNode = "Home";
  }

  ngOnInit() {
    this.navBar.activeNode = "Home";
  }

}
