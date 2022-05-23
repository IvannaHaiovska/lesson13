import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreRoutingModule } from './core-routing.module';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyPageComponent } from './components/my-page/my-page.component';
import { UsersInfoComponent } from './components/users-info/users-info.component'; 
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    MyPageComponent,
    UsersInfoComponent,
    NotFoundComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    CoreRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 100000,
      positionClass: 'toast-top-right'
    }),
  ],
  exports: [
    RouterModule
  ]
})
export class CoreModule { }
