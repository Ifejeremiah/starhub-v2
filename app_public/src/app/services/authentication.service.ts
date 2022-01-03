import { Inject, Injectable } from '@angular/core';

import { LoginCredentials } from '../classes/userLoginCredentials';
import { Authresponse } from '../classes/authresponse';
import { BROWSER_STORAGE } from '../classes/storage';
import { StarhubDataService } from './starhub-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(@Inject(BROWSER_STORAGE) private storage: Storage,
    private starhubDataService: StarhubDataService) { }

  public getToken(): string {
    return this.storage.getItem('starhub-token');
  }

  public saveToken(token: string): void {
    this.storage.setItem('starhub-token', token);
  }

  public login(user: LoginCredentials): Promise<any> {
    return this.starhubDataService.login(user)
      .then((authResponse: Authresponse) => this.saveToken(authResponse.token));
  }

  public logout(): void {
    this.storage.removeItem('starhub-token');
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }

  public getCurrentUser() {
    if (this.isLoggedIn) {
      const token: string = this.getToken();
      const { name, email, code } = JSON.parse(atob(token.split('.')[1]));
      return { name, email, code };
    }
  }

  public getCurrentUserRole(): string {
    const { code } = this.getCurrentUser()
    if (code === 110111) {
      return 'Super Admin';
    } else if (code === 110011) {
      return 'Admin';
    } else {
      return 'User';
    }
  }

}
