import { Component, OnInit } from '@angular/core';
import { Title  } from "@angular/platform-browser";
import {NavbarComponent} from '../../elements/navbar/navbar.component'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  constructor(private titleService: Title, private navBar: NavbarComponent) { 
    this.titleService.setTitle("Dean Parrish - Projects")
    this.navBar.activeNode = "Projects";
  }


}
