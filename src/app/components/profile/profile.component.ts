import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../services/profile.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm:FormGroup;
  constructor(
    private profileservice:ProfileService,
    private fb:FormBuilder ) 
     {
      this.createForm(); 
     }

     createForm(){
     	this.profileForm = this.fb.group({
     		fname:['', Validators.required],
     		lname:['', Validators.required],
     		username:['', Validators.required],
     		profile_img:['', Validators.required]
     	});
      }
     Addprofile(fname, lname, username, profile_img, file){
     	this.profileservice.Addprofile(fname, lname, username, profile_img, file);
     }

  ngOnInit() {
  }

}
