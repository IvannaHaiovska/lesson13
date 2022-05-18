import { Component, OnInit } from '@angular/core';

import { UsersService } from 'src/app/shared/service/users/users.service';
import { IUser } from 'src/app/shared/interface/user/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public routes = [
    { route: '/my-page', name: 'My Page' },
    { route: '/dashboard', name: 'Dashboard' },
    { route: '/users', name: 'Users' },
    { route: '/login', name: 'Logout' }
  ];
  public LogUser = {
    username: '',
    email: ''
  };
  public user: Array<IUser> = [];

  constructor(
    private userService: UsersService
  ) {
  }
  ngOnInit(): void {
    this.userService.getAll().subscribe(res => {
      this.user = res;
      console.log(res);
       console.log(this.user);
         this.LogUser = this.user[this.user.length - 1];
    });
  
   
    
  }

}
