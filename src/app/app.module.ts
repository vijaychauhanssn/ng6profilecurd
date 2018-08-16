import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

//FormModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

//routing
import {AppRoutingModule} from './app.routing';
//profile service
import {ProfileService} from './services/profile.service';
import {ImageService} from './services/image.service';
//end service

import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditComponent } from './components/edit/edit.component';
import { HomeComponent } from './components/home/home.component';
import { ImagesComponent } from './components/images/images.component';
import { ImageseditComponent } from './components/imagesedit/imagesedit.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    EditComponent,
    HomeComponent,
    ImagesComponent,
    ImageseditComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    SlimLoadingBarModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ProfileService, ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
