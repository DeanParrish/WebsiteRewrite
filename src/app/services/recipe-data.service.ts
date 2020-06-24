import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeDataService {

  result: any;
  constructor(private _http: HttpClient) { }

  getAllRecipes(){
    return this._http.get("/api/recipes")
      .pipe(map((result: any) => this.result = result));
  }

  insertRecipe(values){
    return this._http.post("/api/insertrecipe", values)
        .pipe(map((response: Response) => {
          console.log(response)
          return response;
      }))
  }

  updateRecipe(id, values){
    return this._http.put("/api/updaterecipe/" + id, values)
      .pipe(map((response: Response) => {
        console.log(response)
        return response;
    })) 
  }
}
