import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import {ImageService} from '../../services/image.service';
@Component({
  selector: 'app-imagesedit',
  templateUrl: './imagesedit.component.html',
  styleUrls: ['./imagesedit.component.css']
})
export class ImageseditComponent implements OnInit {
	imageEdtiForm:FormGroup;

  constructor(private formbuilder:FormBuilder, private imageService:ImageService)
   {
   	this.imageedtiForm();
   }

   imageedtiForm(){
   	this.imageEdtiForm = this.formbuilder.group({
		   	image_document_id:['', Validators.required],
		   	image_name:['',Validators.required]	   		
   	});
   }

  ngOnInit() {
  }

}
