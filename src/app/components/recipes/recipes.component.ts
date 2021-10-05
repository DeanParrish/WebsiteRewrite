import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { MatDialog } from "@angular/material/dialog";
import { RecipepopupComponent } from "./recipepopup/recipepopup.component";
import { RecipeDataService } from "../../services/recipe-data.service";
import { Recipe } from "../../interfaces/recipe";
import { EditrecipepopupComponent } from "./editrecipepopup/editrecipepopup.component";

import { AuthService } from "../../services/authservice.service";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.scss"],
})
export class RecipesComponent implements OnInit {
  displayedColumns: string[] = ["name", "category", "actions"];
  recipeSource = new MatTableDataSource();
  recipeDisplayData = new MatTableDataSource();
  categories: string[] = [];
  categorySelected: string;
  uid: string;

  constructor(
    public recipeService: RecipeDataService,
    public dialog: MatDialog,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.auth.getCurrentUIDFromService().then((res) => {
      if (res != null) this.uid = res;

      this.recipeService.getAllRecipes().subscribe((res) => {
        for (var i in res.data) {
          if (
            this.categories === undefined ||
            this.categories.find((x) => x === res.data[i].category) ===
              undefined
          )
            this.categories.push(res.data[i].category);
        }
        this.recipeSource = new MatTableDataSource(res.data);
        this.recipeDisplayData = new MatTableDataSource(res.data);
      });

      this.recipeService.getCurrentUserRecipes();
    });
  }

  openDetails(recipe) {
    this.dialog.open(RecipepopupComponent, {
      data: recipe,
    });
  }

  editRecipe(recipe) {
    this.dialog.open(EditrecipepopupComponent, {
      data: recipe,
    });
  }

  recipeCategoryChange(category) {
    this.recipeDisplayData.filterPredicate = (data: Recipe, filter: string) => {
      return data.category == filter;
    };
    this.recipeDisplayData.filter = category;
    this.categorySelected = category;
  }

  public filterData = (value: string) => {
    this.recipeDisplayData.filterPredicate = (data: Recipe, filter: string) => {
      if (this.categorySelected != "") {
        return (
          data.name.indexOf(filter) > -1 &&
          data.category == this.categorySelected
        );
      } else {
        return data.name.indexOf(filter) > -1;
      }
    };
    this.recipeDisplayData.filter = value.trim();
  };

  filterUserReciple(e) {
    if (e.checked == true) {
      this.recipeDisplayData.filterPredicate = (
        data: Recipe,
        filter: string
      ) => {
        return data.userID == filter;
      };

      this.recipeDisplayData.filter = this.uid;
    } else {
      this.clearFilter();
    }
  }

  clearFilter() {
    this.recipeDisplayData.filter = "";
  }
}
