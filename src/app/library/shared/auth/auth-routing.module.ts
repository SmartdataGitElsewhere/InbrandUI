import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/component/login.component';
import { BannedipComponent } from './bannedip/bannedip.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  //  { path: 'bannedip', component: BannedipComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
