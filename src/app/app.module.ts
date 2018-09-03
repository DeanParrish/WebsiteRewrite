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
import { TestComponentComponent } from './test-component/test-component.component';

export const appRoutes: Routes = [
	{
	    path: '',
	    component: CustomerInfoComponent,
		//   resolve: {
		//     data: CategoriesResolver
		// 	}
	},
	{
	    path: 'customerinfo',
	    component: CustomerInfoComponent,
	    // resolve: {
	    //   data: CategoryQuestionsResolver
	  	// }
	},
	{
		path: 'test',
		component: TestComponentComponent,
		// resolve: {
		//   data: CategoryQuestionsResolver
		// }
},
];

@NgModule({
  declarations: [
    AppComponent,
		CustomerInfoComponent,
		CustomerInfoAddComponent,
		CustomerInfoDetailsComponent,
		TestComponentComponent
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
		CustomerService
	],
  bootstrap: [AppComponent]
})
export class AppModule {}
