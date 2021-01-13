import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-recipepopup',
  templateUrl: './recipepopup.component.html',
  styleUrls: ['./recipepopup.component.scss']
})
export class RecipepopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
