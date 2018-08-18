import { Component, ViewChild } from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { HttpClient } from '@angular/common/http';

import { NavigationCancel,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Profile';
  constructor(private _loadingBar: SlimLoadingBarService, private _router: Router, private http:HttpClient) {
    this._router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
            this.filesToUpload = [];
  }
  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this._loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this._loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this._loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this._loadingBar.stop();
    }
  }
result:any;
  imgupload(filetoupload){
    const obj = {
      filetoupload:filetoupload
    }
     this.http.post('http://localhost:3000/upload', obj).subscribe((result) => {
            console.log(result);
        }, (error) => {
            console.error(error);
        });
    }
  

  filesToUpload: Array<File>;


    upload() {
        this.makeFileRequest("http://localhost:3000/upload", [], this.filesToUpload).then((result) => {
            console.log(result);
        }, (error) => {
            console.error(error);
        });
    }

    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>> fileInput.target.files;
    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            for(var i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    }

}
