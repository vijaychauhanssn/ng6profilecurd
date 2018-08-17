import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AddImage} from '../models/AddImage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

ApiUrl  = 'http://localhost:8080';	
	
  constructor(private http:HttpClient) 
  {
  console.log('Image service is working');
  }

  Addimage(file, description){
  			const obj = {
  				file:file,
  				description:description
  			};
  			return this.http.post(`${this.ApiUrl}`, obj)
  			.subscribe(res => console.log('Created'));
  }
getImage(){
    return this.http.get(`${this.ApiUrl}`);
  }
  
}
