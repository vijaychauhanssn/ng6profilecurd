import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { ProfileComponent } from './components/profile/profile.component';
import { EditComponent } from './components/edit/edit.component';
import { HomeComponent } from './components/home/home.component';

export const routes : Routes = [
			
		{
		path:'profile',
		component:ProfileComponent
		},
		{
		path:'edit/:id',
		component:EditComponent
		},
		{
		path:'home',
		component:HomeComponent
		}
		
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}