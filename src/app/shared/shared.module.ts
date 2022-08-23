import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";

// import { SDKBrowserModule } from '../../../sdk/index';
//import { SlugifyPipe } from './slugify.pipe';
// Material modules
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';



//import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';


@NgModule({
  declarations: [
    // BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    //HttpModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatDialogModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatChipsModule,
    MatInputModule,
    MatMenuModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatTabsModule,
    MatSelectModule,
    // SDKBrowserModule.forRoot(),
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatPaginatorModule
    //SlugifyPipe
  ],
  providers: [
    //SlugifyPipe
  ],
  exports: [
    // BreadcrumbComponent,
    CommonModule,
    //HttpModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    // Material modules
    MatDialogModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatChipsModule,
    MatInputModule,
    MatMenuModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatTabsModule,
    MatCheckboxModule,
    MatPaginatorModule
  ]
})
export class SharedModule { }
