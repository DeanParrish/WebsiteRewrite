import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {RecipeDataService} from '../../../services/recipe-data.service';

@Component({
  selector: 'app-editrecipepopup',
  templateUrl: './editrecipepopup.component.html',
  styleUrls: ['./editrecipepopup.component.css']
})
export class EditrecipepopupComponent implements OnInit {

  name: string;
  category: string;
  recipeForm: FormGroup;
  ingredients: any = [{
    ingredientNumber: 0,
    ingredientName: ''
  }];
  steps: any = [{
    stepNumber: 0,
    stepInfo: ''
  }];

  constructor(private recipeService: RecipeDataService, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              public thisDialogRef: MatDialogRef<EditrecipepopupComponent>) { }

  ngOnInit() {
    console.log(this.data)
    if(this.data){
      this.ingredients = this.data.ingredients;
      this.category = this.data.category;
      this.steps = this.data.steps;
      this.name = this.data.name;
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(this.name, [
        Validators.required
      ]),
      category: new FormControl(this.category, [
        Validators.required
      ]),
      link: new FormControl(),
    });
    
  }

  addIngredient(){
    this.ingredients.push({
      ingredientNumber: this.ingredients.length,
      ingredientName: ''
    });
  }
  addStep(){
    this.steps.push({
      stepNumber: this.steps.length,
      stepInfo: ''
    });
  }
  onSubmit(values){
    console.log(this.recipeForm.valid)
    if(this.recipeForm.valid){
      let data: any = {};
      data.name = values.name;
      data.category = values.category;
      data.ingredients = this.ingredients;
      data.steps = this.steps;
      data.link = values.link;

      this.recipeService.updateRecipe(this.data._id, data)
      .subscribe(res=> {
        this.thisDialogRef.close(res);
        this.recipeForm.reset();
        location.reload();
        return res;
        
    });
    }
  }

  onCloseCancel(){
    this.thisDialogRef.close();
    this.recipeForm.reset();
  }

}
