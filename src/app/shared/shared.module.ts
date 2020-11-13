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
import {
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
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule,
  MatTabsModule,
  MatSelectModule,
} from '@angular/material';

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
  ]
})
export class SharedModule { }
