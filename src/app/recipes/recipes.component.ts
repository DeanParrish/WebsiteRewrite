import { Component, OnInit } from '@angular/core';
import { RecipeDataService } from '../services/recipe-data.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor(public recipeService: RecipeDataService) { }

  ngOnInit() {
    console.log("oninit")
    this.recipeService.getAllRecipes()
      .subscribe(res => {
        console.log(res);
      })
  }

}
