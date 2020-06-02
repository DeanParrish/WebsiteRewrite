import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { Title  } from "@angular/platform-browser";
import {NavbarComponent} from '../../elements/navbar/navbar.component'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private titleService: Title, private navBar: NavbarComponent) { 
    this.titleService.setTitle("Dean Parrish - Contact")
    this.navBar.activeNode = "Contact";
  }

  ngOnInit() {
  }

}
