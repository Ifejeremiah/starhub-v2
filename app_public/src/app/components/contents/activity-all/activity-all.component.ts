import { Component, OnInit } from '@angular/core';
import { StarhubDataService, Users } from 'src/app/services/starhub-data.service';

@Component({
  selector: 'app-activity-all',
  templateUrl: './activity-all.component.html',
  styleUrls: ['./activity-all.component.css']
})
export class ActivityAllComponent implements OnInit {

  constructor(private starhubDataService: StarhubDataService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  public users: Users[];

  public process: string = 'Processing...'; F

  private getUsers(): void {
    this.starhubDataService.getAllUsers()
      .then(users => {
        this.users = users;
        this.process = '';
      });
  }

  public roleClass(role) {
    if (role === 'super admin') {
      return 'label-success'
    } else if (role === 'admin') {
      return 'label-primary'
    } else if (role === 'user') {
      return 'label-warning'
    }
  }

}
