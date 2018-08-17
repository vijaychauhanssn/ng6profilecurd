import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AddImage} from '../models/AddImage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

ApiUrl  = 'http://localhost:4000/profiles';	
	
  constructor(private http:HttpClient) 
  {
  console.log('Image service is working');
  }

  Addimage(image, description){
  			const obj = {
  				image:image,
  				description:description
  			};
  			return this.http.post(`${this.ApiUrl}/addimg`, obj)
  			.subscribe(res => console.log('Created'));
  }
getImage(){
    return this.http.get(`${this.ApiUrl}`);
  }
  
}
