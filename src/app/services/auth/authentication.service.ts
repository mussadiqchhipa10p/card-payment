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
    if (localStorage.getItem('apitoken')) {
      const expire = localStorage.getItem('expiration');
      if (expire) {
        let expirationDate = new Date(expire);
        let currentDate = new Date(Date());
        console.log(expirationDate, currentDate);
        if (currentDate < expirationDate) {
          return true;
        }
        return false;
      }
    }
    return false;
  }

  public logout() {
    localStorage.removeItem('apitoken');
    localStorage.removeItem('expiration');
  }
}
