import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AuthGuard } from './guards/auth.guard';

import { FrameworkComponent } from './components/framework/framework.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppRoutesModule } from './routes/app-routes.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { OverviewComponent } from './components/contents/overview/overview.component';
import { NewsletterComponent } from './components/contents/newsletter/newsletter.component';
import { CreateComponent } from './components/contents/accounts/create/create.component';
import { ListsComponent } from './components/contents/accounts/lists/lists.component';
import { MostRecentFirstPipe } from './pipes/most-recent-first.pipe';
import { DetailsParentComponent } from './components/contents/accounts/details-parent/details-parent.component';
import { DetailsComponent } from './components/contents/accounts/details/details.component';
import { UpdateComponent } from './components/contents/accounts/update/update.component';
import { ActivityComponent } from './components/contents/activity/activity.component';
import { ActivityDetailsComponent } from './components/contents/activity-details/activity-details.component';
import { ActivityAllComponent } from './components/contents/activity-all/activity-all.component';

@NgModule({
  declarations: [
    FrameworkComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    OverviewComponent,
    NewsletterComponent,
    CreateComponent,
    ListsComponent,
    MostRecentFirstPipe,
    DetailsParentComponent,
    DetailsComponent,
    UpdateComponent,
    ActivityComponent,
    ActivityDetailsComponent,
    ActivityAllComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutesModule
  ],
  providers: [AuthGuard],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
