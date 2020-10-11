import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

declare var $: any;
@Component({
  selector: 'app-previous-reports',
  templateUrl: './previous-reports.component.html',
  styleUrls: ['./previous-reports.component.scss']
})
export class PreviousReportsComponent implements OnInit {

  userInfo;
  records;

  constructor(
    private router: Router,
    private http: HttpClient,
    private service: CommonService
  ) { }

  ngOnInit(): void {
    this.userInfo = this.service.retrieveUser();
    
    this.http.get(this.service.apiGetMatchHistoryUrl+this.userInfo['id']).subscribe((res) => {
      this.records = res['records'];
        $(document).ready(() => {
          $('#previousrecords').dataTable({
            "order": []
          });
        });
    },
    err => {
      console.log(err);
    });
  }

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hours = d.getHours(),
        minutes = d.getMinutes(),
        seconds = d.getSeconds();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
 
     const alignedDate = [year, month, day].join('/');
      const alignedTime = [this.pad(hours), this.pad(minutes), this.pad(seconds)].join(':');
    return alignedDate+' '+ alignedTime;
  }

  pad(num) { 
    return ("0"+num).slice(-2);
  }
}
