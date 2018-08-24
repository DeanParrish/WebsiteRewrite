import { Routes } from '@angular/router';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { TestComponentComponent } from './test-component/test-component.component';

export const routes: Routes = [
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