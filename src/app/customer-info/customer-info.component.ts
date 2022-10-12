import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerDataService } from '../services/customer-data.service';
import { Title  } from "@angular/platform-browser";
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { CustomerInfoAddComponent } from '../customer-info/customer-info-add/customer-info-add-modal.component';
import { CustomerInfoDetailsComponent } from '../customer-info/customer-info-details/customer-info-details-modal.component';
import { AuthService } from '../services/authservice.service';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber1'];
  isAuthorized = false;
  peopleSource = new MatTableDataSource();
  allData = new MatTableDataSource();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public customerService: CustomerDataService,
    private titleService: Title,
    private _http: HttpClient, 
    private auth: AuthService
  ) {
    this.titleService.setTitle("Dean Parrish - Customer Info")
   }

  ngOnInit() {
    this.customerService.getCustomer()
    .subscribe(res=> {
      if(res.status == 200){
        this.isAuthorized = true;
        this.peopleSource = new MatTableDataSource(res.data)
        this.allData = new MatTableDataSource(res.data)
      }else if(res.status == 403){
        "Hello forbidden";
      } 
    }, err => {
      this.handleErrors(err);
    });
    
  }

  handleErrors(err){
      if(err.status === 403){
        this.auth.loggedIn$.subscribe(res => {
          if(res == true)
            this.auth.updateUserToken().then(res => {
              if(res.updated == true)
                this.ngOnInit()
            })
        })
      } 
  }

  openNewPersonModal(){
    let dialogRef = this.dialog.open(CustomerInfoAddComponent, {
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.customerService.getCustomer()
          .subscribe(res => {
            if(res.status == 200){
              this.peopleSource = new MatTableDataSource(res.data)
              this.allData = new MatTableDataSource(res.data)
            }            
          }, err => {
            this.handleErrors(err);
          })
      }
    })
  }

  openEditPersonModal(person){
    let dialogRef = this.dialog.open(CustomerInfoDetailsComponent, {
      data: { person: person }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.customerService.getCustomer()
          .subscribe(res => {
            if(res.status == 200){
              this.peopleSource = new MatTableDataSource(res.data)
              this.allData = new MatTableDataSource(res.data)
            }
            
          }, err => {
            this.handleErrors(err);
          })
      }
    })
  }

  deleteCustomer(person){

    let data: any = {};

    this.customerService.deleteCustomer(person._id)
    .subscribe(res=> {
      this.customerService.getCustomer()
          .subscribe(res => {
            if(res.status == 200){
              this.peopleSource = new MatTableDataSource(res.data)
              this.allData = new MatTableDataSource(res.data)
            }
            
          })
    return res;
    }, err => {
      this.handleErrors(err);
    });
  }


  filterTable(filterValue: string) {
    this.allData.filter = filterValue.trim().toLowerCase();
    this.peopleSource.data = this.allData.filteredData;
  }

}
