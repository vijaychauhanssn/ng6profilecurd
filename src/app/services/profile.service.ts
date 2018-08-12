import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AddProfile} from '../models/AddProfile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

 ApiUrl  = 'http://localhost:4000/profiles';

  constructor(private http:HttpClient) { 
  	console.log('Profile Service is working');
  }

  Addprofile(fname, lname, username, profile_img){
  			const obj = {
  				fname:fname,
  				lname:lname,
  				username:username,
  				profile_img:profile_img				
  			};
  			this.http.post(`${this.ApiUrl}/add`, obj)
  			.subscribe(res => console.log('Created'));
  }

  getProfile(){
  	return this.http.get(`${this.ApiUrl}`);
  }
 
 editAdUnit(id) {
      return this.http.get(`${this.ApiUrl}/edit/${id}`);
  }

    updateAdUnit(fname, lname,username,profile_img, id) {

    const obj = {
          fname:fname,
          lname:lname,
          username:username,
          profile_img:profile_img 
      };
      this.http.post(`${this.ApiUrl}/update/${id}`, obj)
        .subscribe(res => console.log('Done'));
    }

      deleteAdUnit(id) {
        return this.http.get(`${this.ApiUrl}/delete/${id}`);
      }
}
