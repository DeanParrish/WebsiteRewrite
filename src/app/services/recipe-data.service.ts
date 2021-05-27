import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

import { AuthService } from './authservice.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeDataService {
  private headers = new HttpHeaders();
  private userInfo: any;

  public isIntialized = false;

  result: any;
  constructor(private _http: HttpClient, private auth: AuthService) {
    // this.auth.getCurrentUser().then(res => {
    //   if(res != null){
    //     this.isIntialized = true;
    //     this.userInfo = res;
    //   }
      
    // })
   }

  getAllRecipes(){
    return this._http.get("/api/recipes", {headers: this.headers})
      .pipe(map((result: any) => this.result = result));
  }

  insertRecipe(values){
    console.log(this.auth.getCurrentUserToken())
    return this._http.post("/api/insertrecipe", values, {headers: new HttpHeaders({'Authorization': this.auth.getCurrentUserToken()}) })
        .pipe(map((response: Response) => {
          console.log(response)
          return response;
      }))
  }

  updateRecipe(id, values){
    return this._http.put("/api/updaterecipe/" + id, values, {headers: new HttpHeaders({'Authorization': this.auth.getCurrentUserToken()}) })
      .pipe(map((response: Response) => {
        console.log(response)
        return response;
    })) 
  }
}
