import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyPageComponent } from './components/my-page/my-page.component';
import { UsersInfoComponent } from './components/users-info/users-info.component'; 
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent}, 
  {path: 'dashboard', component: DashboardComponent},
  {path: 'my-page', component: MyPageComponent},
  {path: 'users/:id', component: UsersInfoComponent},

  {path: 'users', loadChildren: () => import('../users/users.module').then(m=>m.UsersModule)},
  
  {path: '', redirectTo:'login', pathMatch:'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
