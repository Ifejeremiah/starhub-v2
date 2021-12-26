import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  public formError: string = '';

  public credentials = {
    email: '',
    password: ''
  }

  public onLoginSubmit() {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'Please fill all fields';
    } else {
      this.doLogin()
    }
  }

  private doLogin(): void {
    this.authenticationService.login(this.credentials)
      .then(() => {
        this.router.navigateByUrl('/dashboard');
      })
      .catch(err => { this.formError = err.error.message });
  }

}
