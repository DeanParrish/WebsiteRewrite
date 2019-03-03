import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { CustomerDataService } from '../services/customer-data.service';

import { CustomerInfoAddComponent } from '../customer-info/customer-info-add/customer-info-add-modal.component';
import { CustomerInfoDetailsComponent } from '../customer-info/customer-info-details/customer-info-details-modal.component';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit {
  //data: CustomerInfo[];
  displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber1'];
  //peopleSource: any;
  peopleSource = new MatTableDataSource();
  allData = new MatTableDataSource();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public customerService: CustomerDataService
  ) { }

  ngOnInit() {
    this.customerService.getCustomer()
    .subscribe(res=> {
      console.log(res);
      if(res.status == 200){
        this.peopleSource = new MatTableDataSource(res.data)
        this.allData = new MatTableDataSource(res.data)
      }
      //console.log("customerinfo: " + JSON.stringify(res))
    });
    
  }

  openNewPersonModal(){
    let dialogRef = this.dialog.open(CustomerInfoAddComponent, {
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log("close new");
        // this.customerService.getCustomer()
        //   .subscribe(res => {
        //     console.log(res);
        //     if(res.status == 200){
        //       this.peopleSource = new MatTableDataSource(res.data)
        //       this.allData = new MatTableDataSource(res.data)
        //     }
            
        //     //console.log(this.peopleSource)
        //   })
      if(res){
        console.log("close new");
        this.customerService.getCustomer()
          .subscribe(res => {
            console.log(res);
            if(res.status == 200){
              this.peopleSource = new MatTableDataSource(res.data)
              this.allData = new MatTableDataSource(res.data)
            }
            
            //console.log(this.peopleSource)
          })
      }
    })
  }

  openEditPersonModal(person){
    console.log("param from base customerinfo: " + JSON.stringify(person));
    let dialogRef = this.dialog.open(CustomerInfoDetailsComponent, {
      data: { person: person }
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log("after edit before: " + JSON.stringify(res))
      // this.customerService.getCustomer()
      //     .subscribe(res => {
      //       if(res.status == 200){
      //         this.peopleSource = new MatTableDataSource(res.data)
      //         this.allData = new MatTableDataSource(res.data)
      //       }
            
      //     })
      if(res){
        console.log("after edit")
        this.customerService.getCustomer()
          .subscribe(res => {
            if(res.status == 200){
              this.peopleSource = new MatTableDataSource(res.data)
              this.allData = new MatTableDataSource(res.data)
            }
            
          })
      }
    })
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
              this.peopleSource = new MatTableDataSource(res.data)
              this.allData = new MatTableDataSource(res.data)
            }
            
          })
    return res;
      //console.log("customerinfo: " + JSON.stringify(res))
    });
  }


  filterTable(filterValue: string) {
    console.log(filterValue.trim().toLowerCase());
    this.allData.filter = filterValue.trim().toLowerCase();
    console.log(this.peopleSource.filteredData);
    this.peopleSource.data = this.allData.filteredData;
    //this.peopleSource = new MatTableDataSource(this.peopleSource.filteredData);
    console.log("filter: " + this.peopleSource.filter);
  }

}
