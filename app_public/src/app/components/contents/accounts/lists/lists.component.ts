import { Component, OnInit } from '@angular/core';

import { StarhubDataService, } from 'src/app/services/starhub-data.service';

@Component({
  selector: 'app-users',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  constructor(private starhubDataService: StarhubDataService) { }

  ngOnInit(): void {
    this.showAllUsers();
  }

  public message: string = 'Processing...'

  public users: any[];

  private showAllUsers(): void {
    this.starhubDataService.getAllUsers()
      .then(users => {
        this.users = users;
        this.message = '';
      });
  }

  public roleClass(role) {
    let background;
    if (role === 'super admin') {
      background = 'label-success'
    } else if (role === 'admin') {
      background = 'label-primary'
    } else if (role === 'user') {
      background = 'label-warning'
    }
    return background;
  }

}
