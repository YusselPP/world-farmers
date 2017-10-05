import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  private static apiBaseUrl = 'http://app.farmersoftheworld.org/api/';
  private static tokenName = 'access_token';

  public redirectUrl;

  constructor(private http: HttpClient) {}

  signupUser(email: string, password: string) {

  }

  signinUser(email: string, password: string) {
    const url = `${AuthService.apiBaseUrl}login`;

    return (
      this.http.post(url, { email: email, password: password}, { responseType: 'text'})
        .map(data => JSON.parse(data))
        .do(res => {
          if (res['error']) {
            throw new Error(res.error);
          } else {
            localStorage.setItem(AuthService.tokenName, res['access_token']);
          }
        })
    );
  }

  logout() {
    const url = `${AuthService.apiBaseUrl}logout`;

    this.http.post(url, {}).subscribe(res => {}, err => console.error(err));

    localStorage.removeItem(AuthService.tokenName);
  }

  isAuthenticated() {
    return tokenNotExpired(AuthService.tokenName);
  }
}
