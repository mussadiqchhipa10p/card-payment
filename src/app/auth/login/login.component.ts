import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  message: string;
  constructor(private service: AuthenticationService) {}

  ngOnInit(): void {
    this.isuserlogedin();
  }

  login(form: NgForm): void {
    this.service.login(this.username, this.password);
    this.isuserlogedin();
  }

  isuserlogedin() {
    if (this.service.isLogin()) this.message = 'logged in';
    else this.message = 'not logged in';
  }
}
