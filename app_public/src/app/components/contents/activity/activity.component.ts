import { Component, OnInit } from '@angular/core';

import { Activity, AllActivities, StarhubDataService } from 'src/app/services/starhub-data.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  constructor(private starhubDataService: StarhubDataService,
    private authenticationService: AuthenticationService) { }

  public message: string = '';

  public process:string = 'Processing...';

  public activities: Activity[];

  public allAccountActivities: AllActivities[];

  public isSuperAdmin(): boolean {
    const { code } = this.authenticationService.getCurrentUser()
    return code !== 110111 ? false : true;
  }

  ngOnInit(): void {
    this.starhubDataService.getUserActivity()
      .then(activity => {
        if (activity.length > 0) {
          this.activities = (activity as Activity[]);
          this.process = '';
        } else {
          this.process = 'You have no activities yet.';
        }
      });
    this.getAllAccountActivity();
  }

  public showAllUserActivities: boolean = false;

  public toggleShowUserActivities(): void {
    this.showAllUserActivities = !this.showAllUserActivities;
  }

  private getAllAccountActivity(): void {
    this.starhubDataService.getAllUserActivity().then((activities) => {
      this.allAccountActivities = activities as AllActivities[];
      this.process = '';
    })
  }
}
