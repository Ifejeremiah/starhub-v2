import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';
import { LoginComponent } from '../components/login/login.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { HomeComponent } from '../components/dashboard-contents/home/home.component';
import { SubscribeComponent } from '../components/dashboard-contents/subscribe/subscribe.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent, children: [
      {
        path: 'home',
        component: HomeComponent
      }, {
        path: 'subscribers',
        component: SubscribeComponent
      }
    ]
  },
  { path: '**', redirectTo: '/dashboard' }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutesModule { }
