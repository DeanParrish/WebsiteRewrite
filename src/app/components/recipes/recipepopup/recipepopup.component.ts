import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-recipepopup',
  templateUrl: './recipepopup.component.html',
  styleUrls: ['./recipepopup.component.css']
})
export class RecipepopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
