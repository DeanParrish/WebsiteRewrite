import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import {MatDialog} from '@angular/material/dialog';
import {RecipepopupComponent} from './recipepopup/recipepopup.component';
import { RecipeDataService } from '../../services/recipe-data.service';
import {Recipe} from '../../interfaces/recipe';
import { EditrecipepopupComponent } from './editrecipepopup/editrecipepopup.component';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'category', 'actions'];
  recipeSource = new MatTableDataSource();
  recipeDisplayData = new MatTableDataSource();
  categories: string[] = [];
  categorySelected: string;

  constructor(public recipeService: RecipeDataService, public dialog: MatDialog) { }

  ngOnInit() {
    console.log("oninit")
    this.recipeService.getAllRecipes()
      .subscribe(res => {
        console.log(res);
        for(var i in res.data){
          if(this.categories === undefined || this.categories.find(x=>x === res.data[i].category) === undefined)
            this.categories.push(res.data[i].category)
        }

        // var string = "hello, how, are";
        // var arr = ["hello", "how", "are"]
        this.recipeSource = new MatTableDataSource(res.data);
        this.recipeDisplayData = new MatTableDataSource(res.data);
      })

      
  }

  openDetails(recipe){
    this.dialog.open(RecipepopupComponent, {
      data: recipe
    });
  }

  editRecipe(recipe){
    this.dialog.open(EditrecipepopupComponent, {
      data: recipe
    });
  }

  recipeCategoryChange(category){
    console.log(category);
    this.recipeDisplayData.filterPredicate = (data: Recipe, filter: string) => {
      return data.category == filter;
     };
    this.recipeDisplayData.filter = category;
    this.categorySelected = category;
  }

public filterData = (value: string) => {
  console.log(value)
  this.recipeDisplayData.filterPredicate = (data: Recipe, filter: string) => {
    if(this.categorySelected != ""){
      return data.name.indexOf(filter) > -1 && data.category == this.categorySelected;
    }else{
      return data.name.indexOf(filter) > -1;
    }    
   };
    this.recipeDisplayData.filter = value.trim();
  }

}
