import { Component, OnInit } from '@angular/core';

import { UsersService } from 'src/app/shared/service/users/users.service';
import { IUser } from 'src/app/shared/interface/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public users: Array<IUser> = [];
  public newUser = {
    username: '',
    email: '',
    password: '',
    created_at: '',
    updated_at: ''
  };
  public user: Array<IUser> = [];
  constructor(
    private userService: UsersService
  ) { }

  ngOnInit(): void {
  }
  Submit(): void {
    const newUser = {
      id: 1,
      username: this.newUser.username,
      email: this.newUser.email,
      password: this.newUser.password,
      created_at: new Date,
      updated_at: new Date,
    }
    this.userService.create(newUser).subscribe();
  }
}
