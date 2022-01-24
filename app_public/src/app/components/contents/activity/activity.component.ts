import { Component, OnInit } from '@angular/core';

import { Activity, StarhubDataService } from 'src/app/services/starhub-data.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  constructor(private starhubDataService: StarhubDataService,
    private authenticationService: AuthenticationService) { }

  public process: string = 'Processing...';

  public activities: Activity[];

  public showMore: boolean = false;

  private counter: number = 10;

  public isSuperAdmin(): boolean {
    const { code } = this.authenticationService.getCurrentUser();
    return code !== 110111 ? false : true;
  }

  ngOnInit(): void {
    this.getActivity(null);
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

  private getActivity(counter: number): void {
    this.starhubDataService.getUserActivity()
      .then(activity => {
        this.activities = this.doCheckLength(activity, counter);
        this.process = '';
      });
  }

  public doShowMore(): void {
    this.counter += 10;
    this.getActivity(this.counter);
  }

}
