import { Component, OnInit, EventEmitter, Output, Inject} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl} from '@angular/forms';
import { CustomerDataService } from '../../services/customer-data.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-customer-info-add',
  templateUrl: './customer-info-add-modal.component.html',
  exportAs: 'newQuestionModal',
  styleUrls: ['../../styles/modals.scss']
})
export class CustomerInfoAddComponent implements OnInit {

  personForm: FormGroup;

  statesArray = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];


  constructor(private router: Router,
    private route: ActivatedRoute,
    public customerService: CustomerDataService,
    public thisDialogRef: MatDialogRef<CustomerInfoAddComponent>,
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
  }

  onCloseCancel() {
    this.thisDialogRef.close();
  }

  onSubmit(values){
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
    console.log("submit")
    // //create new question
    this.customerService.insertCustomer(data)
    .subscribe(res=> {
      console.log(res);
      console.log("dialog" + this.thisDialogRef);
      this.thisDialogRef.close(res)
    this.personForm.reset();
   // return res;
      //console.log("customerinfo: " + JSON.stringify(res))
    });

    
    // .then(question => {
    //   this.thisDialogRef.close(question);
    //   this.personForm.reset();
    // });
  }

}
