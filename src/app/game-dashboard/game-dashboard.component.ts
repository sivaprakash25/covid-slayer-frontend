import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-game-dashboard',
  templateUrl: './game-dashboard.component.html',
  styleUrls: ['./game-dashboard.component.scss']
})
export class GameDashboardComponent implements OnInit {

  userInfo;
  
  constructor(
    private router: Router,
    private service: CommonService
  ) { }

  ngOnInit(): void {
    this.userInfo = this.service.retrieveUser();
  }

}
