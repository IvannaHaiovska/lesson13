import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
    entitlements: '',
    createdAt: '',
    updatedAt: ''
  };
  public edit = false;
  public canEdit = false;
  public canDelete = false;
  public isLogUser!: boolean;
  public updateIndex!: number;
  public log: any;
  public LogUser!: IUser;

  constructor(
    private userService: UsersService,
    private notifyService: NotifyService,
    private router: Router,
    private storageService: StorageService
  ) {
  }
  ngOnInit(): void {
    this.GetUsers();
    this.GetLoginUser()
  }

  GetUsers() {
    this.userService.getAll().subscribe(res => {
      this.users = res;
    });

  }

  GetLoginUser() {
    this.log = this.storageService.getUser();
    this.LogUser = this.log.user;

    if ((this.LogUser.entitlements === 'can_edit_users') || (this.LogUser.entitlements === 'can_view_details_full') || (this.LogUser.entitlements === 'can_edit_users_full') || (this.LogUser.username === 'admin')) {
      this.canEdit = true;
    }
    else {
      this.canEdit = false;
    }
    if ((this.LogUser.entitlements === 'can_delete_users') || (this.LogUser.entitlements === 'can_view_details_full') || (this.LogUser.entitlements === 'can_edit_users_full') || (this.LogUser.username === 'admin')) {
      this.canDelete = true;
    }
    else {
      this.canDelete = false;
    }
  }

  detail(index: number) {
    if ((this.LogUser.email === this.users[index].email) || (this.LogUser.entitlements === 'can_view_details') || (this.LogUser.entitlements === 'can_view_details_full') || (this.LogUser.entitlements === 'can_edit_users_full') || (this.LogUser.username === 'admin')) {
      this.router.navigate([`users/${this.users[index].id}`]);
    }
    else {
      alert("You do not have access rights!")
    }
  }

  Add(): void {
    if (this.nameExp.test(this.newUser.username)) {
      const newUser = {
        id: this.users.length + 1,
        username: this.newUser.username,
        email: `${this.newUser.username}@gmail.com`,
        password: this.newUser.username,
        entitlements: 'can_view_users',
        createdAt: new Date,
        updatedAt: new Date,
      }
      this.userService.create(newUser).subscribe(() => {
        this.GetUsers();
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
      this.notifyService.showSuccess('User delete', 'Success!');
    });
  }
  SaveEdit() {
    const newUser = {
      id: this.users[this.updateIndex].id,
      username: this.newUser.username,
      email: this.users[this.updateIndex].email,
      password: this.users[this.updateIndex].password,
      entitlements: 'can_view_users',
      createdAt: this.users[this.updateIndex].createdAt,
      updatedAt: new Date,
    }
    this.userService.update(this.users[this.updateIndex].id, newUser).subscribe(() => {
      this.users[this.updateIndex].username = newUser.username;
    });
    this.newUser.username = '';
    this.edit = false;
  }
}
