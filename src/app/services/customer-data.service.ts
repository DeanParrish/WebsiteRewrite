import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

// import { AuthService } from '@auth0/auth0-angular/';
import { Observable } from 'rxjs';
import { CssSelector } from '@angular/compiler';
import { AuthService } from './authservice.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {
  private headers = new HttpHeaders();

  public isIntialized = false;
  private isAuthenticated = null;

  result: any;
  constructor(private _http: HttpClient, private auth: AuthService) { 

    
  }

  getCustomer(){
    return this._http.get("/api/users",{ headers: new HttpHeaders({'Authorization': this.auth.getCurrentUserToken()}) })
      .pipe(map((result: any) => this.result = result));
  }

  insertCustomer(values){
    return this._http.post("/api/insertuser", values, {headers: new HttpHeaders({'Authorization': this.auth.getCurrentUserToken()})})
        .pipe(map((response: Response) => {
          return response;
      }))
}

updateCustomer(id, values){
    let data: any = {};
    data.firstName = values.firstName;
    data.lastName = values.lastName;
    data.phoneNumber1 = values.phoneNumber1;
    data.phoneNumber2 = values.phoneNumber2;
    data.phoneNumber3 = values.phoneNumber3;
    data.address = values.address;
    data.city = values.city;
    data.state = values.state;
    data.zip = values.zip;
    data.comments = values.comments;


    var url = "/api/updatecustomer/" + id;

    return this._http.put(url, values, {headers: new HttpHeaders({'Authorization': this.auth.getCurrentUserToken()})})
      .pipe(map((response: Response) => {
        return response;
    }))
}

deleteCustomer(id){
  var url = "/api/deletecustomer/" + id;

  return this._http.post(url, id, {headers: new HttpHeaders({'Authorization': this.auth.getCurrentUserToken()}) })
        .pipe(map((response: Response) => {
          return response;
      }))
}
}
