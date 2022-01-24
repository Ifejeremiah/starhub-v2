import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Activity, StarhubDataService, Users } from 'src/app/services/starhub-data.service';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css']
})
export class ActivityDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private starhubDataService: StarhubDataService) { }

  public process: string = 'Processing...';

  public userDetail: Users;

  public userActivities: Activity[];

  public showMore: boolean = false;

  private counter: number = 10;

  ngOnInit(): void {
    this.getUser();
    this.getUserActivity(null);
  }

  private getUserIdFromParams(): string {
    let id: string;
    this.route.paramMap.subscribe((params: ParamMap) => {
      id = params.get('userid');
    });
    return id;
  }

  private doCheckLength(lists: any[], counter: number): any[] {
    let value, index = counter ? counter : 10;
    if (lists.length > 10 && index <= lists.length) {
      this.showMore = true;
      value = lists.splice(lists.length - index, lists.length);
    } else {
      this.showMore = false;
      value = lists;
    }
    return value;
  }

  public doShowMore(): void {
    this.counter += 10;
    this.getUserActivity(this.counter);
  }

  private getUser(): void {
    this.starhubDataService.getUserById(this.getUserIdFromParams())
      .then(user => {
        this.userDetail = (user as Users);
        this.process = '';
      });
  }

  private getUserActivity(counter: number): void {
    this.starhubDataService.getAUserActivity(this.getUserIdFromParams())
      .then(activities => {
        this.userActivities = this.doCheckLength(activities, counter);
      });
  }

}
