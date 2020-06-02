import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { Title  } from "@angular/platform-browser";

@Component({
  selector: 'app-daycounter',
  templateUrl: './daycounter.component.html',
  styleUrls: ['./daycounter.component.css']
})
export class DaycounterComponent implements OnInit {

  dateCounterForm: FormGroup;
  returnText: string;
  comparisonType: string;
  constructor(private titleService: Title) { 
    this.titleService.setTitle("Dean Parrish - Day Counter")
  }

  ngOnInit() {
    this.dateCounterForm = new FormGroup({
      enterDate: new FormControl(),
      endDate: new FormControl(),
      })

      this.comparisonType = "endOfYear";
      this.dateCounterForm.controls.endDate.disable()
  }

  onSubmit(values){

    if(this.comparisonType == "endOfYear"){
      var diff = Math.abs(new Date(new Date().getFullYear(), 11, 31).valueOf() - new Date(values.enterDate).valueOf());
      var returnInDays = Math.floor(diff / (24*60*60*1000));

      this.returnText = "There are " + returnInDays + " days between the dates."
    }else{
      if(values.enterDate > values.endDate){
        this.returnText = "End date must be later than starting date";
      }else{
        var diff = Math.abs(new Date(values.endDate).valueOf() - new Date(values.enterDate).valueOf());
        var returnInDays = Math.floor(diff / (24*60*60*1000));

        this.returnText = "There are " + returnInDays + " days between the dates."
      }
      
    }  
  }

  comparisonChange(){
    //this.returnText = this.comparisonType;
    if(this.comparisonType == "endOfYear"){
      this.dateCounterForm.controls.endDate.disable()
    }else{
      this.dateCounterForm.controls.endDate.enable()
    }
  }

}
