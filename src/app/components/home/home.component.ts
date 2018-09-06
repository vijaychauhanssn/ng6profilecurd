import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../services/profile.service';
import {AddProfile} from '../../models/AddProfile';
import { FormGroup,  FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {  ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 profiles:AddProfile[];


 constructor(
    private profileservice:ProfileService,
    private toastrService :ToastrService,
    private  fb :  FormBuilder ,
    private http: HttpClient) {
    this.form = this.fb.group({
      avatar: ['', Validators.required],
    });
  }

  deleteAdUnit(id) {
    this.profileservice.deleteAdUnit(id).subscribe(res => {
      console.log('Deleted');
    });
  }
  ngOnInit() {
  	this.profileservice.getProfile().subscribe((data:AddProfile[]) =>{
  		this.profiles = data ;
  	});
  }

  apiUrl = 'http://localhost:4000';

  form: FormGroup;
  loading = false;
  //imageSrc:string;
   imageSrc = '/assets/imgs/img_avatar1.png';

  result ; // data received from server after file upload


  onFileChange(files: FileList) {
    if (files && files.length > 0) {
      // For Preview
      const reader = new FileReader();
      const file = files[0];

      /* Browsers do not allow references to file paths due to security concerns.
        Therefore, you can not bind the file path to the img tag.
        Use the FileReader.readAsDataURL method to read the image file
        After obtaining the base64 encoded string data, bind it to the img tag. */
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result;
      };

      /* In the reactive form, input [type = "file"] is not supported.
        The value is not set in the form control when the file is selected
        https://github.com/angular/angular.io/issues/3466
        Set file.name to the form control for form validation. */
      this.avatar.setValue(file.name);
    }
  }

  onSubmit(files: FileList) {
    const formData = new FormData();
    formData.append('avatar', files[0]);

    this.loading = true;
    // Send data (payload = formData)
    console.log(formData.get('avatar'));

    // Send the form data to the server.
    this.http.post(`${this.apiUrl}/upload`, formData)
      .subscribe(res => {
        this.result = res;
        this.loading = false;
        this.avatar.setValue(null);
      });
  }

  get avatar() {
    return this.form.get('avatar');
  }
  //profile Deleted
  showSuccess() {
    this.toastrService.success( 'Profile Deleted!');
  }
}
