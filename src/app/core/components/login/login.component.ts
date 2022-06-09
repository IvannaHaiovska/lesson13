import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/shared/service/auth/auth.service';
import { UsersService } from 'src/app/shared/service/users/users.service';
import { StorageService } from 'src/app/shared/service/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    username: null,
    email: null,
    password: null,
    password2: null,
    created_at: new Date,
    updated_at: new Date
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  public changeLog = true;
  public islogin = false;
  public register = false;
  public chooseItem = true;
  constructor(private authService: AuthService,
    private usersService: UsersService,
    private storageService: StorageService) { }

  ngOnInit(): void { }

  Register(): void {
    this.islogin = false;
    this.register = true;
    this.chooseItem = false;
  }

  Login(): void {
    this.islogin = true;
    this.register = false;
    this.chooseItem = false;
  }

  onRegister() {
    const newUser = {
      id: 1,
      username: this.form.username,
      email: this.form.email,
      password: this.form.password,
      created_at: new Date,
      updated_at: new Date,
    }
    this.changeLog = false;
    this.usersService.create(newUser).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.form = {
          username: '',
          email: '',
          password: '',
          password2: ''
        };
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    })
  }

  onLogin() {
    const { email, password } = this.form;
    this.authService.login(email, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    })
  }

}
