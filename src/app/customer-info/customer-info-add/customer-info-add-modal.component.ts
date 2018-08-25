import { Component, OnInit, EventEmitter, Output, Inject} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl} from '@angular/forms';
import { CustomerService } from '../../services/customer.services';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-customer-info-add',
  templateUrl: './customer-info-add-modal.component.html',
  exportAs: 'newQuestionModal',
  styleUrls: ['../../styles/modals.scss']
})
export class CustomerInfoAddComponent implements OnInit {

  personForm: FormGroup;

  constructor(private router: Router,
    private route: ActivatedRoute,
    public customerService: CustomerService,
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
    data.comments = values.comments;

    // //create new question
    this.customerService.insertCustomer(data)
    .then(question => {
      this.thisDialogRef.close(question);
      this.personForm.reset();
    });
  }

}
