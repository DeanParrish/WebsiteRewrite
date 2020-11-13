import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  activeNode: string;
  constructor() {
    let test: string = "asdf";
   }

  ngOnInit() {
    console.log(this.activeNode)
  }

}
