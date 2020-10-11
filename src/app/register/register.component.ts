import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

declare var $: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user = {
    name: '',
    email: '',
    password: '',
    avatar: ''
  };
  userAvatar;
  alert = {
    type: '',
    message: ''
  };
  fileValidation = false;
  confirmPasswordValid = false;
  allowedExtensions;
  currentFileExtension;
  constructor(
    private router: Router,
    private http: HttpClient,
    private service: CommonService
    ) { }

  ngOnInit(): void {
    if(sessionStorage['userDetails']) {
      this.router.navigate(['/game/dashboard']);
    }
  }

  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      const avatarFile = event.target.files[0];

      this.allowedExtensions = ["jpg","jpeg","png","JPG","JPEG","JFIF","BMP","SVG"];
      this.currentFileExtension = avatarFile.name.split('.').pop();

      if(avatarFile.size > 500000 || !this.isInArray(this.allowedExtensions, this.currentFileExtension)) {
        this.fileValidation = true;
        $('#avatar').val('');
        return false;
      } else {
        this.fileValidation = false;
      }
      var reader = new FileReader();
  
      reader.onload = (event: ProgressEvent) => {
        this.userAvatar = (<FileReader>event.target).result;
      }
  
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.fileValidation = false;
    }
  }

  isInArray(array, word) {
      return array.indexOf(word.toLowerCase()) > -1;
  }
  userRegister(user) {
    this.fileValidation = false;
    if(user['password'] != user['confirmpassword']) {
      this.confirmPasswordValid = true;
      return false;
    } else {
      this.confirmPasswordValid = false;
    }
    user.avatar = this.userAvatar;
    this.http.post(this.service.apiRegisterUrl, user).subscribe((res) => {
      this.service.sharingAlert = {
        type: "success",
        message: "User registered successfully!! Please login to continue"
      };
      this.router.navigate(['/login']);
    }, err => {
      console.log(err);
      this.alert = {
        type: "danger",
        message: "Oops!! Something went wrong, Registration failed"
      };
      this.service.focusOnAlert();
    });
    
  }
}
