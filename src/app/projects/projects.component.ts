import { Component, OnInit } from '@angular/core';
//import { Parser } from '../../../node_modules/dbf-parser';
import { Title  } from "@angular/platform-browser";
import {NavbarComponent} from '../elements/navbar/navbar.component'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(private titleService: Title, private navBar: NavbarComponent) { 
    this.titleService.setTitle("Dean Parrish - Projects")
    this.navBar.activeNode = "Projects";
  }

  ngOnInit() {
    //var Parser = require('node-dbf');
    //var parser = new Parser('C:\Users\parri\Downloads\Customers_2018-09-28_16-23-51\Customers_2018-09-28_16-23-51');
  }

}
