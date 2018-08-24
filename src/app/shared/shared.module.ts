import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SDKBrowserModule } from '../../../sdk/index';
import { SlugifyPipe } from './slugify.pipe';
// import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
// Material modules
import {
  MatDialogModule,
  MatToolbarModule,
  MatListModule,
  MatButtonModule,
  MatChipsModule,
  MatInputModule,
  MatMenuModule,
} from '@angular/material';

//import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';


@NgModule({
  declarations: [
    // BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
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
    SDKBrowserModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    SlugifyPipe
  ],
  exports: [
    // BreadcrumbComponent,
    CommonModule,
    HttpModule,
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
    MatMenuModule
  ]
})
export class SharedModule { }
