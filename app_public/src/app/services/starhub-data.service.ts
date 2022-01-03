import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { LoginCredentials } from '../classes/userLoginCredentials';
import { Authresponse } from '../classes/authresponse';
import { NewUser } from '../classes/new-user';
import { BROWSER_STORAGE } from '../classes/storage';

export class Users {
  _id: string;
  name: string;
  email: string;
  role: string;
  dateRegistered: string;
}

export class SubscribedEmails {
  _id: string;
  email: string;
  dateSubscribed: string;
}


@Injectable({
  providedIn: 'root'
})
export class StarhubDataService {
  constructor(private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage) { }

  private apiBase: string = environment.apiBaseUrl;

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error);
  }

  public login(user: LoginCredentials): Promise<Authresponse> {
    return this.makeAuthApiCall('login', user);
  }

  private makeAuthApiCall(urlPath: string, user: LoginCredentials): Promise<Authresponse> {
    const url: string = `${this.apiBase}/${urlPath}`;
    return this.http
      .post(url, user)
      .toPromise()
      .then(response => response as Authresponse)
      .catch(this.handleError);
  }

  private sendTokenInHeader() {
    return {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.storage.getItem('starhub-token')}` })
    }
  }

  public getAllUsers(): Promise<Users[]> {
    const url = `${this.apiBase}/users`;
    return this.http
      .get(url, this.sendTokenInHeader())
      .toPromise()
      .then(response => response as Users[])
      .catch(this.handleError);
  }

  private makeUserApiCall(userId: string, method: string, updateData): Promise<Users> {
    const url = `${this.apiBase}/users/${userId}`;
    const data = updateData ? updateData : null;
    if (method === 'get') {
      return this.http
        .get(url, this.sendTokenInHeader())
        .toPromise()
        .then(response => response as Users)
        .catch(this.handleError);
    } else if (method === 'put') {
      return this.http
        .put(url, data, this.sendTokenInHeader())
        .toPromise()
        .then(response => response as Users)
        .catch(this.handleError);
    } else if (method === 'delete') {
      return this.http
        .delete(url, this.sendTokenInHeader())
        .toPromise()
        .then(response => response as Users)
        .catch(this.handleError);
    }
  }

  public createNewUser(userData: NewUser): Promise<Authresponse> {
    const url = `${this.apiBase}/users`;
    return this.http
      .post(url, userData, this.sendTokenInHeader())
      .toPromise()
      .then(response => response as Authresponse)
      .catch(this.handleError);
  }

  public getUserById(userId: string): Promise<Users> {
    return this.makeUserApiCall(userId, 'get', null);
  }
  public updateUserById(userId: string, updateData): Promise<Users> {
    return this.makeUserApiCall(userId, 'put', updateData);
  }

  public deleteUserById(userId: string): Promise<Users> {
    return this.makeUserApiCall(userId, 'delete', null);
  }

  public getAllSubscribedEmails(): Promise<SubscribedEmails[]> {
    const url = `${this.apiBase}/email/subscribers/`;
    return this.http
      .get(url, this.sendTokenInHeader())
      .toPromise()
      .then(response => response as SubscribedEmails[])
      .catch(this.handleError);
  }

  public getASubscribedEmail(email: string): Promise<SubscribedEmails> {
    const url = `${this.apiBase}/email/subscribers/${email}`;
    return this.http.get(url, this.sendTokenInHeader())
      .toPromise()
      .then(email => email as SubscribedEmails);
  }

  public deleteASubscribedEmail(email: string): any {
    const url = `${this.apiBase}/email/subscribers/${email}`;
    return this.http.delete(url, this.sendTokenInHeader())
      .toPromise()
      .then(msg => msg);
  }

}

