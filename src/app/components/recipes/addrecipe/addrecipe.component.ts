import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {RecipeDataService} from '../../../services/recipe-data.service';

@Component({
  selector: 'app-addrecipe',
  templateUrl: './addrecipe.component.html',
  styleUrls: ['./addrecipe.component.css']
})
export class AddrecipeComponent implements OnInit {

  name: string;
  recipeForm: FormGroup;
  ingredients: any = [{
    ingredientNumber: 0,
    ingredientName: ''
  }];
  steps: any = [{
    stepNumber: 0,
    stepInfo: ''
  }];
  constructor(private recipeService: RecipeDataService) { }

  ngOnInit() {
    this.recipeForm = new FormGroup({
      name: new FormControl(this.name, [
        Validators.required
      ]),
      category: new FormControl(),
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
  
      this.recipeService.insertRecipe(data)
      .subscribe(res => {
        this.recipeForm.reset();
      })
    }
  }
}
