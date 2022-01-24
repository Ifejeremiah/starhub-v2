import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StarhubDataService, SubscribedEmails } from 'src/app/services/starhub-data.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {

  constructor(private starhubDataService: StarhubDataService,
    private router: Router) { }

  public subscribers: SubscribedEmails[];

  public process: string = 'Processing...';

  public message: string;

  public showMore: boolean = false;

  private counter: number = 10;

  ngOnInit(): void {
    this.getSubscribedEmails(null);
  }

  private doCheckLength(lists: any[], counter: number): any[] {
    let value, index = counter ? counter : 10;
    if (lists.length > 10 && index <= lists.length) {
      this.showMore = true;
      value = lists.splice(lists.length - index, lists.length);
    } else {
      this.showMore = false;
      value = lists;
    };
    return value;
  }

  private getSubscribedEmails(counter: number): void {
    this.starhubDataService.getAllSubscribedEmails()
      .then(emails => {
        this.subscribers = this.doCheckLength(emails, counter);
        this.process = '';
      })
  }

  public deleteEmail(email: string): void {
    if (window.confirm(`Delete "${email}" from Subscribed Emails?`) === true) {
      this.starhubDataService.deleteASubscribedEmail(email)
        .then((msg) => {
          this.message = msg.msg ? 'Subscribed Email deleted!' : null;
          window.setTimeout(() => { this.message = '' }, 4000);
          this.getSubscribedEmails(this.counter);
        });
    } else { return null }
  }

  public doShowMore(): void {
    this.counter += 10;
    this.getSubscribedEmails(this.counter);
  }

}
