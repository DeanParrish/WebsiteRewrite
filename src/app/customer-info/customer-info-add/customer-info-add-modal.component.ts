import { Component, OnInit, EventEmitter, Output, Inject} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl} from '@angular/forms';
import { TestService } from '../../services/test.services';
// import { SlugifyPipe } from '../../shared/slugify.pipe';
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
    public testService: TestService,
    // private slugifyPipe: SlugifyPipe,
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
    this.testService.insertName(data)
    .then(question => {
      this.thisDialogRef.close(question);
      this.personForm.reset();
      console.log(this.testService.getNames())
    });
  }

}
