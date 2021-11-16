import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import {MatPaginator} from '@angular/material/paginator';
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
export class RecipesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ["name", "category", "actions"];
  recipeSource = new MatTableDataSource();
  recipeDisplayData = new MatTableDataSource();
  categories: string[] = [];
  categorySelected: string;
  uid: string;
  isAuthenticated: any;

  constructor(
    public recipeService: RecipeDataService,
    public dialog: MatDialog,
    private auth: AuthService
  ) {
    auth.isUserAuthenicated().then((res) => {
      this.isAuthenticated = res.isUserLoggedIn;
    });
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.auth.getCurrentUIDFromService().then((res) => {
      if (res != null) this.uid = res;
      this.recipeService.getAllRecipes().subscribe(data => {
        for (var i in data.data) {
          if (
            this.categories === undefined ||
            this.categories.find((x) => x === data.data[i].category) ===
              undefined
          )
            this.categories.push(data.data[i].category);
        }
        this.recipeSource = new MatTableDataSource(data.data);
        this.recipeDisplayData = new MatTableDataSource(data.data);
        this.recipeDisplayData.paginator = this.paginator;
      });

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

  filterData(value: string) {
    this.recipeDisplayData.filterPredicate = (data: Recipe, filter: string) => {
      if (this.categorySelected) {
        return (
          data.name.indexOf(filter) > -1 &&
          data.category == this.categorySelected
        );
      } else {
        return data.name.indexOf(filter) > -1;
      }
    };
    console.log(this.categorySelected);
    this.recipeDisplayData.filter = value;
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
