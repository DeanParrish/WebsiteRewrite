import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { CustomerInfoAddComponent } from './customer-info/customer-info-add/customer-info-add-modal.component';
import { CustomerInfoDetailsComponent } from './customer-info/customer-info-details/customer-info-details-modal.component';
import { SharedModule } from './shared/shared.module';

import {CustomerDataService } from './services/customer-data.service';
import { TestComponentComponent } from './test-component/test-component.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { DaycounterComponent } from './/components/projects/daycounter/daycounter.component';
import { CurrencyComponent } from './/components/projects/currency/currency.component';
import { ContactComponent } from './components/contact/contact.component';
import { NavbarComponent } from './elements/navbar/navbar.component';
import { InterativethumbnailComponent } from './components/interativethumbnail/interativethumbnail.component';
import { RecipepopupComponent } from './components/recipes/recipepopup/recipepopup.component';
import { AddrecipeComponent } from './components/recipes/addrecipe/addrecipe.component';
import { EditrecipepopupComponent } from './components/recipes/editrecipepopup/editrecipepopup.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserService } from './services/user-service.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { environment as env } from '../environments/environment';
import { LoginlinkComponent } from './elements/loginlink/loginlink.component';
import { LogoutlinkComponent } from './elements/logoutlink/logoutlink.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { RegisterfirebaseComponent } from './components/registerfirebase/registerfirebase.component';
import { LoginfirebaseComponent } from './components/loginfirebase/loginfirebase.component';
import { AuthGuard } from './authguard/authguard.component';
import { AuthService } from './services/authservice.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
//import { environment } from '../environments/environment';

//import { HomepagePipe } from './homepage.pipe';

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
		canActivate: [AuthGuard]
	},
	{
		path: 'contact',
		component: ContactComponent,
	},
	{
		path: 'recipes',
		component: RecipesComponent,
	},
	{
		path: 'recipes/addrecipe',
		component: AddrecipeComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'register',
		component: RegisterComponent,
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
		CurrencyComponent,
		ContactComponent,
		RecipesComponent,
		NavbarComponent,
		InterativethumbnailComponent,
		RecipepopupComponent,
		AddrecipeComponent,
		EditrecipepopupComponent,
		LoginComponent,
		RegisterComponent,
		LoginlinkComponent,
		LogoutlinkComponent,
		RegisterfirebaseComponent,
		LoginfirebaseComponent,
  ],
  imports: [
		provideFirebaseApp(() => initializeApp(env.firebase)),
		provideAuth(() => getAuth()),
		BrowserModule,
		BrowserAnimationsModule,
		SharedModule,
    RouterModule.forRoot(appRoutes,
      { useHash: false, relativeLinkResolution: 'legacy' }
	),
	// AuthModule.forRoot({
	// 	...env
	// })

	],
	entryComponents: [
		CustomerInfoComponent,
		CustomerInfoAddComponent,
		CustomerInfoDetailsComponent,
		RecipepopupComponent,
		EditrecipepopupComponent
	],
  providers: [
		CustomerDataService,
		NavbarComponent,
		UserService,
		AuthService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		   }
	],
  bootstrap: [AppComponent]
})
export class AppModule {}
