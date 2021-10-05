import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {RecipeDataService} from '../../../services/recipe-data.service';

import { AuthService } from '../../../services/authservice.service'

@Component({
  selector: 'app-addrecipe',
  templateUrl: './addrecipe.component.html',
  styleUrls: ['./addrecipe.component.scss']
})
export class AddrecipeComponent implements OnInit {

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
  userID: string;

  constructor(private recipeService: RecipeDataService, private auth: AuthService, private router: Router) { 

  }

  ngOnInit() {
    this.userID = this.auth.getCurrentUID()
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
  
  // TODO: Fix bug when adding ingredients/steps
  onSubmit(values){
    if(this.recipeForm.valid){
      var validatedSteps = [];
      //remove steps that have no content
      for(var i in this.steps){
        if(this.steps[i].stepInfo.trim() !=  ""){
          this.steps[i].stepNumber = validatedSteps.length;
          validatedSteps.push(this.steps[i]);
        }
      }

      var validatedIngredients = [];
      //remove steps that have no content
      for(var i in this.ingredients){
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
      data.userID = this.userID;
      data.description = values.description;

      if (values.isPrivate === true) {
        data.isPrivate = true;
      }else{
        data.isPrivate = false;
      }  

      this.recipeService.insertRecipe(data)
      .subscribe(res => {
        this.recipeForm.reset();
        this.router.navigateByUrl("/recipes");
      }, err => {
        if (err.status == 501) {
          this.auth.updateUserToken().then(res => {
            this.recipeService.insertRecipe(data).subscribe(res => {
              this.recipeForm.reset();
              this.router.navigateByUrl("/recipes");
            })
          })
        }
      })
    }
  }
}
