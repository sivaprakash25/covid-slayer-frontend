import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  user = {
    email: '',
    password: ''
  };
  credentials = {};
  email = '';
  password = '';
  loggedIn = false;
  loginSubmitted = false;
  alert = {};
  constructor(
    private router: Router,
    private http: HttpClient,
    private service:CommonService
     ) { }

  ngOnInit(): void {
    if(sessionStorage['userDetails']) {
      this.router.navigate(['/game/dashboard']);
    }
    if(Object.keys(this.service.sharingAlert).length) {
      this.alert = Object.assign({},this.service.sharingAlert);
      this.service.sharingAlert={};
      this.service.focusOnAlert();
    }
  }

  submitFn(arg) {
    this.loginSubmitted = true;
    this.email = arg.email.trim();
    this.password = arg.password.trim();
    this.credentials = {
      "email": this.email, 
      "password": this.password 
    };
    this.http.post(this.service.apiLoginUrl, this.credentials).subscribe((res) => {
      this.loggedIn = true;
      sessionStorage['userDetails'] = JSON.stringify(res['userDetails']);
      this.router.navigate(['/game/dashboard']);
    }, err => {
      console.log(err);
      this.loggedIn = false;
      this.alert = {
        type: "danger",
        message: "Oops!! Something went wrong."
      };
      this.service.focusOnAlert();
    });
  }
}
