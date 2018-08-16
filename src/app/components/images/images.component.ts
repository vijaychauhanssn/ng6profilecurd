import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import {ImageService} from '../../services/image.service';
import {AddImage} from '../../models/AddImage';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
	ImageForm:FormGroup;
    profiles:AddImage[];
  constructor(private imageservice:ImageService, private formbuilder : FormBuilder) 
  {
  	this.imageAdd();
  }

  imageAdd(){
  	this.ImageForm = this.formbuilder.group({
  		file: ['', Validators.required],
  		description: ['', Validators.required]
  	});
  }

  Addimage(file, description){
  		this.imageservice.Addimage(file, description);
  }

  ngOnInit() {
  this.imageservice.getImage().subscribe((data:AddImage[]) =>{
      this.profiles = data ;
    });
  }

}