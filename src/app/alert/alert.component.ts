import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() alert: object;
  @Output() alertChange = new EventEmitter<any>();
  

  resetAlert() {
    this.alert = {
      type: '',
      message: ''
    };
    this.alertChange.emit(this.alert);
  }
}
