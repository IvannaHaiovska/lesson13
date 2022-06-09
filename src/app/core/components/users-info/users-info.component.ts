import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/service/storage/storage.service';

@Component({
  selector: 'app-users-info',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.css']
})
export class UsersInfoComponent implements OnInit {
  public islogin!:boolean;
  constructor(    private storageService: StorageService) {
    }
    ngOnInit(): void {
      this.islogin = this.storageService.isLoggedIn();
  }
}