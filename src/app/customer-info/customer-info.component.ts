import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { CustomerService } from '../services/customer.services';
import { CustomerInfo } from '../../../sdk/models/CustomerInfo';

import { CustomerInfoAddComponent } from '../customer-info/customer-info-add/customer-info-add-modal.component';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit {
  data: CustomerInfo[];
  displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber1'];
  peopleSource: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public customerService: CustomerService,
  ) { }

  ngOnInit() {
    this.customerService.getCustomer()
    .then(res=> this.peopleSource = new MatTableDataSource(res));
    
  }

  openNewPersonModal(){
    let dialogRef = this.dialog.open(CustomerInfoAddComponent, {
      //data: { categorySlug: categorySlug }
    });

    dialogRef.afterClosed().subscribe(question => {
      if(question){
        //this.addQuestionToList(question);
        alert("HIT");
      }
    })
  }
  clickedPerson(person: CustomerInfo){
    alert(person.phoneNumber1);
  }

  filterTable(filterValue: string) {
    this.peopleSource.filter = filterValue.trim().toLowerCase();
  }

}
