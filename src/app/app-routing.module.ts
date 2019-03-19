import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './library/shared/auth/login/component/login.component';
import { AuthenticatedCompany } from './library/core/services/auth-service/auth-service.guard';
import { AuthGuardService } from './library/shared/services/auth-guard.service';
import { BannedipComponent } from './library/shared/auth/bannedip/bannedip.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/subscription',
    pathMatch: 'full'
  },

  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'customer',
        loadChildren: './modules/customer/customer.module#CustomerModule',
         // canActivate: [AuthenticatedCompany]
      },
      {
        path: 'subscription',
        loadChildren: './modules/subscription/subscription.module#SubscriptionModule',
        canActivate: [AuthGuardService]
      },
      {
        path: 'login',
        loadChildren: './library/shared/auth/auth.module#AuthModule',        
      },
      {
        path: 'bannedip',
        component: BannedipComponent,        
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}) ]
})
export class AppRoutingModule {

}
