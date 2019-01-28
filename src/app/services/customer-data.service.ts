import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {

  result: any;
  constructor(private _http: HttpClient) { }

  getCustomer(){
    return this._http.get("/api/users")
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
    return this._http.post("/api/insertuser", values)
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

    return this._http.put(url, values)
      .pipe(map((response: Response) => {
        console.log(response)
        return response;
    }))
    //return this.customerInfoApi.updateAttributes(id, data).toPromise();
}
}
