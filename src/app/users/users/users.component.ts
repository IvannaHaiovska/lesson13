import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { UsersService } from 'src/app/shared/service/users/users.service';
import { IUser } from 'src/app/shared/interface/user/user';
import { NotifyService } from 'src/app/shared/service/NotifyService/notify.service';
import { StorageService } from 'src/app/shared/service/storage/storage.service';

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
  public islogin!: boolean;
  public edit = false;
  public ifAdmin = false;
  public updateIndex!: number;
  public LogUser = {
    username: '',
    email: ''
  };

  constructor(
    private userService: UsersService,
    private notifyService: NotifyService,
    private storageService: StorageService
  ) {
  }
  ngOnInit(): void {
    this.GetUser();
    this.islogin = this.storageService.isLoggedIn();
  }

  GetUser() {
    this.userService.getAll().subscribe(res => {
      this.users = res;
      this.LogUser = this.users[this.users.length - 1];
      if (this.LogUser.username === 'admin') {
        this.ifAdmin = true;
      }
      else {
        this.ifAdmin = false;
      }
    });
  }

  Add(): void {
    if (this.nameExp.test(this.newUser.username)) {
      const newUser = {
        id: this.users.length + 1,
        username: this.newUser.username,
        email: `${this.newUser.username}@gmail.com`,
        password: this.newUser.username,
        created_at: new Date,
        updated_at: new Date,
      }
      this.userService.create(newUser).subscribe(() => {
        this.GetUser();
      });
      this.notifyService.showSuccess('User create', 'Success!');
    }
    else {
      this.notifyService.showError('User not create', 'Error!');
    }
    this.newUser.username = '';
  }

  EditUser(index: number) {
    this.edit = true;
    this.newUser.username = this.users[index].username;
    this.updateIndex = index;
  }
  DeleteUser(index: any) {
    this.userService.delete(this.users[index].id).subscribe((res) => {
      this.users.splice(index, 1);
    });
  }
  SaveEdit() {
    const newUser = {
      id: this.users[this.updateIndex].id,
      username: this.newUser.username,
      email: this.users[this.updateIndex].email,
      password: this.users[this.updateIndex].password,
      created_at: new Date,
      updated_at: new Date,
    }
    this.userService.update(this.users[this.updateIndex].id, newUser).subscribe(() => {
      this.users[this.updateIndex].username = newUser.username;
    });
    this.newUser.username = '';
    this.edit = false;
  }
}
