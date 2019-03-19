import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubscriptionListComponent } from './components/subscription-list/subscription-list.component';
import { AddEditSubscriptionComponent } from './components/add-edit-subscription/add-edit-subscription.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { IpaddresslistComponent } from './components/ipaddresslist/ipaddresslist.component';


const routes: Routes = [
   { path: '', component: SubscriptionListComponent,  },

   { path: 'add-edit-subscription', component: AddEditSubscriptionComponent },
   { path: 'add-edit-subscription/:id', component: AddEditSubscriptionComponent },
   {path: 'userlist', component: UserlistComponent },
   {path: 'ipaddresslist', component: IpaddresslistComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionRoutingModule { }
