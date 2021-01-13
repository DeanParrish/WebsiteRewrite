import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {RecipeDataService} from '../../../services/recipe-data.service';

import { AuthService } from '@auth0/auth0-angular/'

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
    this.auth.idTokenClaims$.subscribe(res => {
      this.userID = res.sub;
    })
  }

  ngOnInit() {
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
      data.userID = this.userID;
  
      this.recipeService.insertRecipe(data)
      .subscribe(res => {
        this.recipeForm.reset();
        this.router.navigateByUrl("/recipes");
      })
    }
  }
}
