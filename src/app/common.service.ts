import { Injectable } from '@angular/core';

declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  apiBaseUrl = 'http://localhost/covid-slayer-backend/public';
  apiRegisterUrl = this.apiBaseUrl+ '/api/register';
  apiLoginUrl = this.apiBaseUrl+ '/api/login';
  apiSaveLogUrl = this.apiBaseUrl+ '/api/log';
  apiSaveMatchUrl = this.apiBaseUrl+ '/api/savematch';
  apiGetMatchHistoryUrl = this.apiBaseUrl+ '/api/previousreport/';
  sharingAlert = {
  };
  constructor() { }

  focusOnAlert() {
    setTimeout(function(){
      $('html, body').animate({
        scrollTop: $("#common-alert").offset().top
      }, 1000);
    }, 10);
  }

  retrieveUser() {
    if(sessionStorage['userDetails']) {
      return JSON.parse(sessionStorage['userDetails']);
    }
  }
}
