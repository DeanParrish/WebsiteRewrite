import { Component, OnInit, EventEmitter, Output, Inject} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl} from '@angular/forms';
import { CustomerService } from '../../services/customer.services';
import { CustomerInfo } from '../../../../sdk/models/CustomerInfo';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-customer-info-details',
  templateUrl: './customer-info-details-modal.component.html',
  exportAs: 'CustomerInfoDetailsComponent',
  styleUrls: ['../../styles/modals.scss']
})
export class CustomerInfoDetailsComponent implements OnInit {

  personForm: FormGroup;
  person: CustomerInfo;

  constructor(private router: Router,
    private route: ActivatedRoute,
    public customerService: CustomerService,
    public thisDialogRef: MatDialogRef<CustomerInfoDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,) { }

  ngOnInit() {
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
      this.personForm.controls["zip"].setValue(this.modalData.person.zip);
      this.personForm.controls["comments"].setValue(this.modalData.person.comments);
  }

  onCloseCancel() {
    this.thisDialogRef.close();
  }

  onSubmit(values){
    let data: any = {};
    data.firstName = values.firstName;
    data.lastName = values.lastName;
    data.comments = values.comments;

    // //create new question
    this.customerService.insertCustomer(data)
    .then(question => {
      this.thisDialogRef.close(question);
      this.personForm.reset();
    });
  }

}
