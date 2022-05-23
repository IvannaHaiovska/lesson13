import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { UsersService } from 'src/app/shared/service/users/users.service';
import { IUser } from 'src/app/shared/interface/user/user';
import { NotifyService } from 'src/app/shared/service/NotifyService/notify.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public nameExp = /^[a-zA-Z]{1,20}$/;
  public users: Array<IUser> = [];
  public newUser = {
    username: '',
    email: '',
    password: '',
    created_at: '',
    updated_at: ''
  };

  constructor(
    private userService: UsersService,
    private toastr: ToastrService,
    private notifyService : NotifyService
  ) {
  }
  ngOnInit(): void {
    this.GetUser();
  }

  GetUser() {
    this.userService.getAll().subscribe(res => {
      this.users = res;
    });
  }

  Add(): void {
    if(this.nameExp.test(this.newUser.username)){
       const newUser = {
      id: 1,
      username: this.newUser.username,
      email: '',
      password: '',
      created_at: new Date,
      updated_at: new Date,
    }
    this.userService.create(newUser).subscribe(() => {
      this.GetUser();
    });
    this.notifyService.showSuccess('User create', 'Success!');
    }
   else{
    this.notifyService.showError('User not create', 'Error!');
   }
    this.newUser.username = '';
  }
  del(){
    this.userService.deleteAll().subscribe()
  }

}
