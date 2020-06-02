import { Component, OnInit, EventEmitter, Output, Inject} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl} from '@angular/forms';
//import { CustomerService } from '../../services/customer.services';
import { CustomerDataService } from '../../services/customer-data.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-customer-info-details',
  templateUrl: './customer-info-details-modal.component.html',
  exportAs: 'CustomerInfoDetailsComponent',
  styleUrls: ['../../styles/modals.scss']
})
export class CustomerInfoDetailsComponent implements OnInit {

  personForm: FormGroup;
  person: any;
  statesArray = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

  constructor(private router: Router,
    private route: ActivatedRoute,
    public customerService: CustomerDataService,
    public thisDialogRef: MatDialogRef<CustomerInfoDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,) { }

  ngOnInit() {
    this.person = this.modalData.person;

    this.personForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      phone1: new FormControl(),
      phone2: new FormControl(),
      phone3: new FormControl(),
      address: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      zip: new FormControl(),
      comments: new FormControl()
      })
      
      console.log(this.modalData)
      //set values
      this.personForm.controls["firstName"].setValue(this.modalData.person.firstName);
      this.personForm.controls["lastName"].setValue(this.modalData.person.lastName);
      this.personForm.controls["phone1"].setValue(this.modalData.person.phoneNumber1);
      this.personForm.controls["phone2"].setValue(this.modalData.person.phoneNumber2);
      this.personForm.controls["phone3"].setValue(this.modalData.person.phoneNumber3);
      this.personForm.controls["address"].setValue(this.modalData.person.address);
      this.personForm.controls["city"].setValue(this.modalData.person.city);
      this.personForm.controls["state"].setValue(this.modalData.person.state);
      this.personForm.controls["zip"].setValue(this.modalData.person.zip);
      this.personForm.controls["comments"].setValue(this.modalData.person.comments);
  }

  onCloseCancel() {
    this.thisDialogRef.close();
  }

  onSubmit(values){
    console.log(this.person);
    let data: any = {};
    data.firstName = values.firstName;
    data.lastName = values.lastName;
    data.phoneNumber1 = values.phone1;
    data.phoneNumber2 = values.phone2;
    data.phoneNumber3 = values.phone3;
    data.address = values.address;
    data.city = values.city;
    data.state = values.state;
    data.zip = values.zip;
    data.comments = values.comments;

    //update customer
    this.customerService.updateCustomer(this.person._id, data)
    .subscribe(res=> {
      console.log(res);
      console.log("dialog" + this.thisDialogRef);
      this.thisDialogRef.close(res);
    this.personForm.reset();
    return res;
      //console.log("customerinfo: " + JSON.stringify(res))
    });

    
      // .then(question => {
      //   this.thisDialogRef.close(question);
      //   this.personForm.reset();
      // });
  }

  deleteCustomer(person){
    console.log("delete: " + JSON.stringify(person));

    let data: any = {};

    this.customerService.deleteCustomer(person._id)
    .subscribe(res=> {
      console.log(res);
      this.customerService.getCustomer()
          .subscribe(res => {
            if(res.status == 200){
              this.thisDialogRef.close(res);
              this.personForm.reset();
            }
            return res;
          })
    
      //console.log("customerinfo: " + JSON.stringify(res))
    });
  }

}
