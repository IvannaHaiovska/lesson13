import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/service/storage/storage.service';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.css']
})
export class MyPageComponent implements OnInit {
  public islogin!:boolean;
  constructor(  private storageService: StorageService) { }

  ngOnInit(): void {
    this.islogin = this.storageService.isLoggedIn();
  }

}
