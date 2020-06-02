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
}
