import { Component, OnInit } from '@angular/core';

import { UsersService } from 'src/app/shared/service/users/users.service';
import { IUser } from 'src/app/shared/interface/user/user';
import { StorageService } from 'src/app/shared/service/storage/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public routes = [
    { route: '/my-page', name: 'My Page' },
    { route: '/dashboard', name: 'Dashboard' },
    { route: '/users', name: 'Users' }
  ];
  public LogUser = {
    username: '',
    email: ''
  };
  public users: Array<IUser> = [];
  public islogin!: boolean;

  constructor(
    private userService: UsersService,
    private storageService: StorageService
  ) {
  }
  ngOnInit(): void {
    this.userService.getAll().subscribe(res => {
      this.users = res;
      this.LogUser = this.users[this.users.length - 1];
    });

    this.islogin = this.storageService.isLoggedIn();
  }

  LogOut() {
    this.storageService.logOut();
  }

}
