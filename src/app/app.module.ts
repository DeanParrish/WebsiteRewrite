import { BrowserModule } from '@angular/platform-browser';
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
		path: 'addrecipe',
		component: AddrecipeComponent,
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
		AddrecipeComponent
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
		CustomerInfoDetailsComponent,
		RecipepopupComponent
	],
  providers: [
		CustomerDataService,
		NavbarComponent
	],
  bootstrap: [AppComponent]
})
export class AppModule {}
