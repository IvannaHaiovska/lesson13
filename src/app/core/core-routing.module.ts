import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyPageComponent } from './components/my-page/my-page.component';
import { UsersInfoComponent } from './components/users-info/users-info.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuardService } from '../shared/service/authguard/auth.guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent,
  canActivate: [AuthGuardService] },
  {
    path: 'my-page', component: MyPageComponent,
    canActivate: [AuthGuardService]
  },
  { path: 'users/:id', component: UsersInfoComponent,
  canActivate: [AuthGuardService] },

  { path: 'users', loadChildren: () => import('../users/users.module').then(m => m.UsersModule),
  canActivate: [AuthGuardService] },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
