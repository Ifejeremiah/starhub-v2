import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  public getCurrentUserName(): string {
    return this.authenticationService.getCurrentUser().name;
  }

  public greetUser(): string {
    function greet() {
      const hour = new Date().getHours();
      if (hour < 12) {
        return 'good morning';
      } else if (hour >= 12 && hour < 16) {
        return 'good afternoon';
      } else if (hour >= 16 && hour < 22) {
        return 'good evening';
      } else if (hour >= 22 && hour < 23) {
        return 'good night';
      }
    }
    return `Hi, ${greet()} `;
  }

}
