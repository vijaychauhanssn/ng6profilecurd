import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

//FormModule
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditComponent } from './components/edit/edit.component';
import { HomeComponent } from './components/home/home.component';

//routing
import {AppRoutingModule} from './app.routing';

//profile service
import {ProfileService} from './services/profile.service';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    EditComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    SlimLoadingBarModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
