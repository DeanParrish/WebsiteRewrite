import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {RecipeDataService} from '../../../services/recipe-data.service';

@Component({
  selector: 'app-editrecipepopup',
  templateUrl: './editrecipepopup.component.html',
  styleUrls: ['./editrecipepopup.component.scss']
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
      isPrivate: new FormControl(),
      description: new FormControl()
    });

    this.recipeForm.patchValue({isPrivate: this.data.isPrivate, description: this.data.description})
    
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
      //clean up any empty ingredients/steps
      var validatedSteps = [];
      for(var i in this.ingredients){
        if(this.steps[i].stepInfo.trim() !=  ""){
          this.steps[i].stepNumber = validatedSteps.length;
          validatedSteps.push(this.steps[i]);
        }
      }

      var validatedIngredients = [];
      for(var i in this.steps){
        if(this.ingredients[i].ingredientName.trim() !=  ""){
          this.ingredients[i].ingredientNumber = validatedIngredients.length;
          validatedIngredients.push(this.ingredients[i]);
        }
      }

      let data: any = {};
      data.name = values.name;
      data.category = values.category;
      data.ingredients = validatedIngredients;
      data.steps = validatedSteps;
      data.link = values.link;
      data.isPrivate = values.isPrivate;
      data.description = values.description;

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
