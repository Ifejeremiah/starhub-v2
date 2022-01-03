import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StarhubDataService } from 'src/app/services/starhub-data.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private router: Router,
    private starhubDataService: StarhubDataService) { }

  ngOnInit(): void {
  }

  public message: string = '';

  public user = { name: '', email: '', password: '', password2: '', userRole: '' }

  public onRegisterSubmit(): void {
    const { name, email, password, password2, userRole } = this.user;
    if (!name || !email || !password || !password2 || !userRole) {
      this.message = 'Please fill all fields';
    } else if (password.length < 8) {
      this.message = 'Please use at least 8 password characters';
    } else if (password !== password2) {
      this.message = 'Sorry, passwords do not match';
    } else {
      this.createNewAdminUser()
    }
    window.setTimeout(() => { this.message = '' }, 5000);
  }

  private createNewAdminUser(): void {
    this.starhubDataService.createNewUser(this.user)
      .then(() => { this.router.navigate(['dashboard', 'accounts']) })
      .catch(error => { this.message = `Sorry, ${error.error.error}` });
  }

}
