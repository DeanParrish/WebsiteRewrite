import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { CustomerInfoAddComponent } from './customer-info/customer-info-add/customer-info-add-modal.component';
import { CustomerInfoDetailsComponent } from './customer-info/customer-info-details/customer-info-details-modal.component';
import { SharedModule } from './shared/shared.module';

import { TestService } from './services/test.services';
import { CustomerService } from './services/customer.services';
import {CustomerDataService } from './services/customer-data.service';
import { TestComponentComponent } from './test-component/test-component.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { DaycounterComponent } from './projects/daycounter/daycounter.component';
import { CurrencyComponent } from './projects/currency/currency.component';

export const appRoutes: Routes = [
	{
	    path: '',
	    component: HomeComponent,
	},
	{
		path: 'home',
		component: HomeComponent,
	},	
	{
		path: 'projects',
		component: ProjectsComponent,
	},	
	{
		path: 'projects/daycounter',
		component: DaycounterComponent,
	},
	{
		path: 'projects/currencyconverter',
		component: CurrencyComponent,

	},
	{
	    path: 'customerinfo',
	    component: CustomerInfoComponent,
	},
	{
		path: 'test',
		component: TestComponentComponent,

},

];

@NgModule({
  declarations: [
    AppComponent,
		CustomerInfoComponent,
		CustomerInfoAddComponent,
		CustomerInfoDetailsComponent,
		TestComponentComponent,
		HomeComponent,
		ProjectsComponent,
		DaycounterComponent,
		CurrencyComponent
  ],
  imports: [
		BrowserModule,
		SharedModule,
    RouterModule.forRoot(appRoutes,
      { useHash: false }
    )
	],
	entryComponents: [
		CustomerInfoComponent,
		CustomerInfoAddComponent,
		CustomerInfoDetailsComponent
	],
  providers: [
		TestService,
		CustomerService,
		CustomerDataService
	],
  bootstrap: [AppComponent]
})
export class AppModule {}
