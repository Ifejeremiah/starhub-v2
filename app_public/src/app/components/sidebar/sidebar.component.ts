import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  public isSuperAdmin(): boolean {
    const { code } = this.authenticationService.getCurrentUser()
    return code === 110111 ? true : false;
  }

}
