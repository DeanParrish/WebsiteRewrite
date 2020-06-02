import { Routes } from '@angular/router';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { ContactComponent } from './components/contact/contact.component';
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
	    path: 'contact',
	    component: ContactComponent,
	    // resolve: {
	    //   data: CategoryQuestionsResolver
	  	// }
	},
	{
	    path: 'recipes',
	    component: RecipesComponent,
	},
];