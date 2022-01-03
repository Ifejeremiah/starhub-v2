import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { StarhubDataService, Users } from 'src/app/services/starhub-data.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  @Input() content: Users;

  constructor(private starhubDataService: StarhubDataService,
    private router: Router) { }

  ngOnInit(): void {
  }

  public message: string;

  public deleteCurrentUser(): void {
    if (window.confirm(`Delete ${this.content.name}'s account ?`) === true) {
      this.starhubDataService.deleteUserById(this.content._id)
        .then(() => {
          this.router.navigate(['dashboard', 'accounts']);
        }).catch(error => {
          this.message = `Error, ${error.error.error}!`;
          window.setTimeout(() => { this.message = '' }, 4000);
        });
    } else { return null }
  }

}
