import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from 'src/app/shared/service/users/users.service';
import { IUser } from 'src/app/shared/interface/user/user';
import { NotifyService } from 'src/app/shared/service/NotifyService/notify.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/shared/service/storage/storage.service';

@Component({
  selector: 'app-users-info',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.css']
})
export class UsersInfoComponent implements OnInit {
  public user!: IUser;
  public users: Array<IUser> = [];
  public ifAdmin = false;
  public edit = false;
  public isEdit = false;
  public LogUser!: IUser;
  public fullDetail = false;
  public nameExp = /^[a-zA-Z]{1,20}$/;
  public iFedit = true;
  public updateIndex!: number;
  public newUser = {
    username: '',
    email: '',
    password: '',
    entitlements: '',
    createdAt: '',
    updatedAt: ''
  };
  public log: any;
  public selectedValue!: string;
  public valueSelect !: string;
  public hidePassword !: string;
  public entitlements = [
    { name: 'can_view_users' },
    { name: 'can_edit_users' },
    { name: 'can_delete_users' },
    { name: 'can_view_details' },
    { name: 'can_view_details_full' },
    { name: 'can_edit_users_full' }
  ]
  constructor(
    private userService: UsersService,
    private activatedRoute: ActivatedRoute,
    private notifyService: NotifyService,
    private router: Router,
    private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.GetUser();
    this.userService.getAll().subscribe(res => {
      this.users = res;
    });

    this.GetLoginUser()

  }

  GetLoginUser() {
    this.log = this.storageService.getUser();
    this.LogUser = this.log.user;
  }
  GetUser() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.userService.getOne(id).subscribe(res => {
      this.user = res;
      this.hidePassword = '*'.repeat(this.user.password.length);

      if ((this.LogUser.entitlements === 'can_view_details_full') || (this.LogUser.email === this.user.email) || (this.LogUser.username === 'admin') || (this.LogUser.entitlements === 'can_edit_users_full')) {
        this.fullDetail = true;
      }
      if (this.LogUser.entitlements === 'can_view_details') {
        this.iFedit = false;
      }
    });
  }

  Edit() {
    this.newUser.username = this.user.username;
    this.selectedValue = this.user.entitlements;
    this.isEdit = true;
    if (this.LogUser.entitlements === 'can_edit_users_full') {
      this.edit = true;
      this.fullDetail = false;
    }
  }

  Save() {
    this.valueSelect = this.selectedValue;
    if (this.nameExp.test(this.newUser.username)) {
      const newUser = {
        id: this.user.id,
        username: this.newUser.username,
        email: this.user.email,
        password: this.user.password,
        entitlements: this.valueSelect,
        createdAt: this.user.createdAt,
        updatedAt: new Date,
      }
      this.users.map(user => {
        this.userService.update(user.id, newUser).subscribe(() => {
          this.user.username = newUser.username;
          this.user.entitlements = newUser.entitlements
        });

      })
      this.notifyService.showSuccess('User update', 'Success!');
    }
    else {
      this.notifyService.showError('User not update', 'Error!');
    }
    this.newUser.username = '';
    this.edit = false;
    this.isEdit = false;
    this.fullDetail = true;
  }

  back() {
    if (this.edit == true) {
      let res = confirm("Do you want to leave the edit page?")
      if (res) {
        this.router.navigate(['users']);
      }
    }
    else {
      this.router.navigate(['users']);
    }


  }
}
