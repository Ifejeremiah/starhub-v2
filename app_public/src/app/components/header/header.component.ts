import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  public doLogout(): void {
    this.authenticationService.logout();
    this.router.navigateByUrl('/');
  }

  public getUsername(): string {
    const user = this.authenticationService.getCurrentUser()
    return user ? user.name : 'Guest';
  }

  public getUserEmail(): string {
    const user = this.authenticationService.getCurrentUser()
    return user ? user.email : '';
  }

  public getUserRole(): string {
    return this.authenticationService.getCurrentUserRole()
  }

}
