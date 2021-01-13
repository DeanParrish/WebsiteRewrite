import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

import { AuthService } from '@auth0/auth0-angular/';

@Injectable({
  providedIn: 'root'
})
export class RecipeDataService {
  private headers = new HttpHeaders();
  private userID: string;

  public isIntialized = false;

  result: any;
  constructor(private _http: HttpClient, private auth: AuthService) {
    this.auth.idTokenClaims$.subscribe(res => {
      if(res != null){
        this.headers = this.headers.set('Authorization', 'Bearer ' + res.__raw);
        this.isIntialized = true;
        this.userID = res.sub;
      }
      
    })
   }

  getAllRecipes(){
    return this._http.get("/api/recipes", {headers: this.headers})
      .pipe(map((result: any) => this.result = result));
  }

  insertRecipe(values){
    return this._http.post("/api/insertrecipe", values, {headers: this.headers})
        .pipe(map((response: Response) => {
          console.log(response)
          return response;
      }))
  }

  updateRecipe(id, values){
    return this._http.put("/api/updaterecipe/" + id, values, {headers: this.headers})
      .pipe(map((response: Response) => {
        console.log(response)
        return response;
    })) 
  }
}
