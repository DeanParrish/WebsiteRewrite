import { Routes } from '@angular/router';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { ContactComponent } from './components/contact/contact.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';



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
	{
		path: 'login',
		component: LoginComponent
		},
		{
		path: 'register',
		component: RegisterComponent
		}
];