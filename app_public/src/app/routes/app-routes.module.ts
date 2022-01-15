import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { LoginComponent } from '../components/login/login.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { OverviewComponent } from '../components/contents/overview/overview.component';
import { NewsletterComponent } from '../components/contents/newsletter/newsletter.component';
import { CreateComponent } from '../components/contents/accounts/create/create.component';
import { ListsComponent } from '../components/contents/accounts/lists/lists.component';
import { DetailsParentComponent } from '../components/contents/accounts/details-parent/details-parent.component';
import { UpdateComponent } from '../components/contents/accounts/update/update.component';
import { ActivityComponent } from '../components/contents/activity/activity.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent, children: [
      {
        path: 'overview',
        component: OverviewComponent
      }, {
        path: 'newsletter',
        component: NewsletterComponent
      },
      {
        path: 'accounts',
        component: ListsComponent
      },
      {
        path: 'accounts/new',
        component: CreateComponent
      },
      {
        path: 'accounts/:userid',
        component: DetailsParentComponent
      },
      {
        path: 'accounts/:userid/update',
        component: UpdateComponent
      },
      {
        path: 'activity',
        component: ActivityComponent
      }
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: '/dashboard' }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutesModule { }
