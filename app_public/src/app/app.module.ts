import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { FrameworkComponent } from './components/framework/framework.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppRoutesModule } from './modules/app-routes.module';
import { AuthGuard } from './guards/auth.guard';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/dashboard-contents/home/home.component';
import { SubscribeComponent } from './components/dashboard-contents/subscribe/subscribe.component';


@NgModule({
  declarations: [
    FrameworkComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SubscribeComponent
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
