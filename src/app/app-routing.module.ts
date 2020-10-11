import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameDashboardComponent } from './game-dashboard/game-dashboard.component';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { PreviousReportsComponent } from './previous-reports/previous-reports.component';
import { RegisterComponent } from './register/register.component';
import { StartGameComponent } from './start-game/start-game.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path:'game',
    component: MainComponent,
    children:[
      { path: 'dashboard', component: GameDashboardComponent },
      { path: 'start', component: StartGameComponent },
      { path: 'reports', component: PreviousReportsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
