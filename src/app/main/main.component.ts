import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private router: Router,
    private service:CommonService
  ) { }

  ngOnInit(): void {
    if(!sessionStorage['userDetails']) {
      this.service.sharingAlert = {
        type: "danger",
        message: "Access denied! Please login to continue"
      };
      this.router.navigate(['/login']);
    }
  }

}
