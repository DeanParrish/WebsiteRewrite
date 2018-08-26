import { Injectable } from '@angular/core';

import { CustomerInfoApi } from '../../../sdk/services/custom/CustomerInfo';
import { CustomerInfo } from '../../../sdk/models/CustomerInfo';

@Injectable()
export class CustomerService{
 constructor(private customerInfoApi: CustomerInfoApi) {}
	getCustomer(){
        return this.customerInfoApi.find<CustomerInfo>().toPromise();
    }

    insertCustomer(values){
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

        return this.customerInfoApi.create<CustomerInfo>(data).toPromise();
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

        return this.customerInfoApi.updateAttributes(id, data).toPromise();
    }
}