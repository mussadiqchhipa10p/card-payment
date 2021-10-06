import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  baseurl: string = 'https://localhost:44365/api/Authenticate/';
  constructor(private http: HttpClient) {}

  public login(username: string, password: string) {
    const user = {
      username: username,
      password: password,
    };
    this.http
      .post(`${this.baseurl}login`, user)
      .toPromise()
      .then((res) => this.setSession(res))
      .catch((err) => console.log(err));
  }

  private setSession(authResult: any) {
    console.log(authResult);
    localStorage.setItem('apitoken', authResult.token);
    localStorage.setItem('expiration', authResult.expiration);

    console.log(
      localStorage.getItem('apitoken'),
      localStorage.getItem('expiration')
    );
  }

  public isLogin() {
    const expire = localStorage.getItem('expiration');
    //check for expiration
    if (localStorage.getItem('apitoken')) {
      return true;
    } else {
      return false;
    }
  }

  public logout() {
    localStorage.removeItem('apitoken');
    localStorage.removeItem('expiration');
  }
}
