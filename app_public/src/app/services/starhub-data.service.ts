import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { User } from '../classes/user';
import { Authresponse } from '../classes/authresponse';

@Injectable({
  providedIn: 'root'
})
export class StarhubDataService {

  constructor(private http: HttpClient) { }

  private apiBase: string = environment.apiBaseUrl;

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error);
  }

  public login(user: User): Promise<Authresponse> {
    return this.makeAuthApiCall('login', user);
  }

  private makeAuthApiCall(urlPath: string, user: User): Promise<Authresponse> {
    const url: string = `${this.apiBase}/${urlPath}`;
    return this.http
      .post(url, user)
      .toPromise()
      .then(response => response as Authresponse)
      .catch(this.handleError);
  }
}
