import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { StarhubDataService, Users } from 'src/app/services/starhub-data.service';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './details-parent.component.html',
  styleUrls: ['./details-parent.component.css']
})
export class DetailsParentComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private starhubDataService: StarhubDataService
  ) { }

  public process: string = 'Processing...';

  public userDetails: Users;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('userid');
      this.starhubDataService.getUserById(id).then(user => {
        this.userDetails = user;
        this.process = '';
      });
    });
  }

}