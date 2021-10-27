import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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

   }

  getAllRecipes(){
    var token = this.auth.getCurrentUserToken();
    if(token != null){
      return this._http.get("/api/recipes", {headers: new HttpHeaders({'Authorization': token})})
      .pipe(map((result: any) => this.result = result));
    }else{
      return this._http.get("/api/recipes")
      .pipe(map((result: any) => this.result = result))
    }
    // this.auth.isUserAuthenicated().then(res => {
    //   if(res == true){
    //     Promise.resolve(this._http.get("/api/recipes", {headers: new HttpHeaders({'Authorization': this.auth.getCurrentUserToken()})})
    //   .pipe(map((result: any) => this.result = result)));
    //   }else{
    //     Promise.resolve(this._http.get("/api/recipes")
    //   .pipe(map((result: any) => this.result = result)));
    //   }
    // })
    
  }

  getCurrentUserRecipes(){  
    var body = {
      "userID": this.auth.getCurrentUID()
    }
    return this._http.get("/api/userrecipes/" + this.auth.getCurrentUID(), {headers: new HttpHeaders({'Authorization': this.auth.getCurrentUserToken()})})
      .pipe(map((response: any) => {
        console.log(response)
        return response;
    }))
    
  }

  insertRecipe(values){

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
