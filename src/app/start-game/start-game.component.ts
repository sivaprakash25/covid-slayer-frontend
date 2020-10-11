import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

declare var $: any;
@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss']
})
export class StartGameComponent implements OnInit {

  userInfo;
  username;
  timerInterval;
  maxLimit;
  minValue;
  commentryMsg;
  randomPlayerHealthReduce;
  randomCoronaHealthReduce;
  randomPlayerHealthIncrease;
  maxPossibleHealthValue;
  arguments = {
    user_id: '',
    message: '',
    log_path: ''
  };
  matchstats = {
    user_id: '',
    result: '',
    log_path: ''
  }
  logPath = '';
  result = {
    status: '',
    description: ''
  };
  timer = 60;
  playerHealth = 100;
  coronoHealth = 100;

  constructor(
    private router: Router,
    private http: HttpClient,
    private service: CommonService
  ) { }

  ngOnInit(): void {
    this.userInfo = this.service.retrieveUser();
    this.username = this.userInfo.name.charAt(0).toUpperCase() + this.userInfo.name.slice(1);
    this.timerInterval = setInterval(() => {
      this.timer--;
      if(this.timer == 0) {
        this.runningCommentry(Array('Match time is over'));
        clearInterval(this.timerInterval);
        setTimeout(() => {
          this.matchEnd();
        }, 1000);
      }
    }, 1000);
  }

  matchEnd() {
    clearInterval(this.timerInterval);
    if(this.playerHealth > this.coronoHealth) {
      this.result.status = "win";
      this.result.description = "You Win! Play Again";
    } else if (this.playerHealth < this.coronoHealth) {
      this.result.status = "lose";
      this.result.description = "You Lose! Play Again";
    } else {
      this.result.status = "tie";
      this.result.description = "Match Tied! Play Again";
    }
    this.saveMatch();
    $('#resultModal').modal({backdrop: 'static', keyboard: false});
  }

  
  callAttack() {
    this.randomCoronaHealthReduce = this.getRandomNumber(10, 1);
    this.randomPlayerHealthReduce = this.getRandomNumber(10, 1);

    if(this.playerHealth - this.randomPlayerHealthReduce < 0) {
      this.playerHealth = 0;
    } else {
      this.playerHealth = this.playerHealth - this.randomPlayerHealthReduce;
    }

    if(this.coronoHealth - this.randomCoronaHealthReduce < 0) {
      this.coronoHealth = 0;
    } else {
      this.coronoHealth = this.coronoHealth - this.randomCoronaHealthReduce;
    }

    this.runningCommentry(Array('Corona Attack the '+ this.username +' by ' + this.randomPlayerHealthReduce, this.username + ' Attack the Corona by ' + this.randomCoronaHealthReduce));
    if(this.playerHealth == 0 || this.coronoHealth == 0) {
      this.matchEnd();
    }
  }

  callBlast() {
    this.randomCoronaHealthReduce = this.getRandomNumber(10, 10);
    this.randomPlayerHealthReduce = this.getRandomNumber(10, 1);
    if(this.playerHealth - this.randomPlayerHealthReduce < 0) {
      this.playerHealth = 0;
    } else {
      this.playerHealth = this.playerHealth - this.randomPlayerHealthReduce;
    }

    if(this.coronoHealth - this.randomCoronaHealthReduce < 0) {
      this.coronoHealth = 0;
    } else {
      this.coronoHealth = this.coronoHealth - this.randomCoronaHealthReduce;
    }
    this.runningCommentry(Array('Corona Attack the '+ this.username +' by ' + this.randomPlayerHealthReduce, this.username + ' Blast attack the Corona by ' + this.randomCoronaHealthReduce));

    if(this.playerHealth == 0 || this.coronoHealth == 0) {
      this.matchEnd();
    }
  }

  callHeal() {
    if(this.playerHealth < 100) {
      this.maxPossibleHealthValue = (100 - this.playerHealth);
      this.randomPlayerHealthIncrease = this.getRandomNumber(this.maxPossibleHealthValue);
      this.randomPlayerHealthReduce = this.getRandomNumber(10, 1);
      this.playerHealth = this.playerHealth + this.randomPlayerHealthIncrease;
      if(this.playerHealth - this.randomPlayerHealthReduce < 0) {
        this.playerHealth = 0;
      } else {
        this.playerHealth = this.playerHealth - this.randomPlayerHealthReduce;
      }
      this.runningCommentry(Array(this.username +' health heal by '+ this.randomPlayerHealthIncrease, 'Corona Attack the '+ this.username +' by ' + this.randomPlayerHealthReduce));
    } else {
      this.runningCommentry(Array(this.username +' has Full health. Can\'t able to heal'));
    }
    
  }

  callGiveUp() {
    this.runningCommentry(Array(this.username +' has give up the fight'));
    this.playerHealth = 0;
    setTimeout(() => {
      this.matchEnd();
    }, 1000);
  }

  dashboardRedirect() {
    $('#resultModal').modal('hide');
    this.router.navigate(['/game/dashboard']);
  }

  newGame() {
    location.reload();
  }

  getRandomNumber(maxLimit, minValue?: number) {
    if(minValue) {
      return Math.floor(Math.random() * maxLimit + minValue);
    } else {
      return Math.floor(Math.random() * maxLimit + 1);
    }
  }

  runningCommentry(commentryMsg) {
    var i = 0;
    while (i < commentryMsg.length) {
      $('#runningCommentry').append('<li>'+commentryMsg[i]+'</li>');
      $('.running-commentry-box').animate({scrollTop: $('#runningCommentry').prop("scrollHeight")}, 500);
      i++;
    }
    this.captureLogs(commentryMsg);
  }

  captureLogs(commentryMsg) {
    this.arguments['user_id'] = this.userInfo['id'];
    this.arguments['message'] = commentryMsg;
    this.arguments['log_path'] = this.logPath;
    this.http.post(this.service.apiSaveLogUrl, this.arguments).subscribe((res) => {
      this.logPath = res['log_path'];
      return true;
    }, err => {
      return true;
    });
  }

  saveMatch() {
    this.matchstats['user_id'] = this.userInfo['id'];
    this.matchstats['result'] = this.result.status;
    this.matchstats['log_path'] = this.logPath;
    this.http.post(this.service.apiSaveMatchUrl, this.matchstats).subscribe();
  }
}
