import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router'

import { StarhubDataService, Users } from 'src/app/services/starhub-data.service';

@Component({
  selector: 'app-update-user-details',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private starhubDataService: StarhubDataService,
    private router: Router) { }

  public id: string;

  public message: string;

  public process: string = 'Processing...';

  public userDetails: Users;

  public updateData = { name: '', email: '', password: '', password2: '', userRole: '' }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('userid');
      this.starhubDataService.getUserById(this.id).then(user => {
        this.userDetails = user;
        this.process = '';
      });
    });
  }

  public onRegisterSubmit(): void {
    const { password, password2 } = this.updateData;
    if (password && password.length < 8) {
      this.message = 'Please use at least 8 password characters';
    } else if (password && password !== password2) {
      this.message = 'Sorry, passwords do not match';
    } else {
      this.updateAdminUser()
    }
  }

  private updateAdminUser(): void {
    this.starhubDataService.updateUserById(this.id, this.updateData)
      .then(() => {
        this.router.navigate(['dashboard', 'accounts', this.id]);
      })
      .catch(error => {
        this.message = `Sorry, ${error.error.error}`;
      });
  }

  public removeErrorMessage(): void {
    this.message = '';
  }

}
