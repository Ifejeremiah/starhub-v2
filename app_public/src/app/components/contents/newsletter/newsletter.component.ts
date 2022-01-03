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

  ngOnInit(): void {
    this.getSubscribedEmails();
  }

  public subscribers: SubscribedEmails[];

  public message: string;

  private getSubscribedEmails(): void {
    this.starhubDataService.getAllSubscribedEmails()
      .then(users => this.subscribers = users as SubscribedEmails[])
      .catch((err) => {
        this.message = `Sorry, ${err.error.msg}`;
        this.subscribers = null;
      });
  }

  public deleteSubscriberEmail(email: string): void {
    if (window.confirm(`Delete "${email}" from Subscribed Emails?`) === true) {
      this.starhubDataService.deleteASubscribedEmail(email)
        .then((msg) => {
          this.message = msg.msg ? 'Subscribed Email deleted!' : null;
          window.setTimeout(() => { this.message = '' }, 4000);
          this.getSubscribedEmails();
        });
    } else { return null }
  }

}
