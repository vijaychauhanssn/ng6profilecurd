import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ProfileService} from '../../services/profile.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import {AddProfile} from '../../models/AddProfile';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
	profile: any = {};
	profileForm:FormGroup;

  constructor(
  	private route: ActivatedRoute,
    private router: Router,
    private profileservice: ProfileService,
    private fb: FormBuilder
  	)
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
     
 updateAdUnit(fname, lname, username, profile_img) {
      this.route.params.subscribe(params => {
          this.profileservice.updateAdUnit(fname, lname,username,profile_img, params['id']);
          this.router.navigate(['home']);
      });
    }

    ngOnInit() {
      this.route.params.subscribe(params => {
        this.profileservice.editAdUnit(params['id']).subscribe(res => {
          this.profile = res;
      });
    });
  }

}
