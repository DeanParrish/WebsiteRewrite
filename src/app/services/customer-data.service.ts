import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

import { AuthService } from '@auth0/auth0-angular/';
import { Observable } from 'rxjs';
import { CssSelector } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {
  private headers = new HttpHeaders();

  public isIntialized = false;

  result: any;
  constructor(private _http: HttpClient, private auth: AuthService) { 
    this.auth.idTokenClaims$.subscribe(res => {
      this.headers = this.headers.set('Authorization', 'Bearer ' + res.__raw);
      this.isIntialized = true;

    })
  }

  getCustomer(){
    return this._http.get("/api/users",{ headers: this.headers })
      .pipe(map((result: any) => this.result = result));
  }

  insertCustomer(values){
    // let data: any = {};
    // data.firstName = values.firstName;
    // data.lastName = values.lastName;
    // data.phoneNumber1 = values.phoneNumber1;
    // data.phoneNumber2 = values.phoneNumber2;
    // data.phoneNumber3 = values.phoneNumber3;
    // data.address = values.address;
    // data.city = values.city;
    // data.state = values.state;
    // data.zip = values.zip;
    // data.comments = values.comments;
    console.log("insertCustomer method")

    // let formData: FormData = new FormData(); 
    // formData.append('firstName', values.firstName); 
    // formData.append('comments', values.comments); 
    return this._http.post("/api/insertuser", values, {headers: this.headers})
        .pipe(map((response: Response) => {
          console.log(response)
          return response;
      }))
    
    // this._http.post("/api/insertuser", (req, res) => {
    //   console.log("insertCustomer request: ", req);
    //   //var myData = new 
    // });

    //return this.cu.create<CustomerInfo>(data).toPromise();
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

    console.log(id + "----" + values);

    var url = "/api/updatecustomer/" + id;
    console.log(url);

    return this._http.put(url, values, {headers: this.headers})
      .pipe(map((response: Response) => {
        console.log(response)
        return response;
    }))
    //return this.customerInfoApi.updateAttributes(id, data).toPromise();
}

deleteCustomer(id){
  let data: any = {};
    // data.firstName = values.firstName;
    // data.lastName = values.lastName;
    // data.phoneNumber1 = values.phoneNumber1;
    // data.phoneNumber2 = values.phoneNumber2;
    // data.phoneNumber3 = values.phoneNumber3;
    // data.address = values.address;
    // data.city = values.city;
    // data.state = values.state;
    // data.zip = values.zip;
    // data.comments = values.comments;

  var url = "/api/deletecustomer/" + id;

  return this._http.post(url, id, {headers: this.headers})
        .pipe(map((response: Response) => {
          console.log(response)
          return response;
      }))
}
}
