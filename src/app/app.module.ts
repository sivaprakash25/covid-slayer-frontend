import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './alert/alert.component';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PreviousReportsComponent } from './previous-reports/previous-reports.component';
import { StartGameComponent } from './start-game/start-game.component';
import { GameDashboardComponent } from './game-dashboard/game-dashboard.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AlertComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    PreviousReportsComponent,
    StartGameComponent,
    GameDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    DataTablesModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
