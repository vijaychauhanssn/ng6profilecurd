import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../services/profile.service';
import {AddProfile} from '../../models/AddProfile';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 profiles:AddProfile[];

  constructor(private profileservice:ProfileService) { }


  deleteAdUnit(id) {
    this.profileservice.deleteAdUnit(id).subscribe(res => {
      console.log('Deleted');
    });
  }
  ngOnInit() {
  	this.profileservice.getProfile().subscribe((data:AddProfile[]) =>{
  		this.profiles =data;
  	});
  }

}
