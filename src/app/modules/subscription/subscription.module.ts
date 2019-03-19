import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubscriptionListComponent } from './components/subscription-list/subscription-list.component';
import { AddEditSubscriptionComponent } from './components/add-edit-subscription/add-edit-subscription.component';
import { SubscriptionService } from './services/subscription.service';
import { MatTableModule, MatSortModule } from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MessageListBoxComponent } from './components/message-list-box/message-list-box.component';
import { ProductLightBoxComponent } from './components/product-light-box/product-light-box.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { CustomvalidatorsComponent } from '../../library/shared/components/customvalidators/customvalidators.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { IpaddresslistComponent } from './components/ipaddresslist/ipaddresslist.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { HighlightPipe } from '../shared/components/highlight.pipe';

// import { Domain } from 'domain';



@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    CdkTableModule,
    SubscriptionRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    DeviceDetectorModule.forRoot()
    // Domain
  ],
  declarations: [SubscriptionListComponent, AddEditSubscriptionComponent, MessageListBoxComponent, ProductLightBoxComponent, UserlistComponent, CustomerListComponent, IpaddresslistComponent,HighlightPipe  ],
  providers: [SubscriptionService],
  exports: [AddEditSubscriptionComponent]
})
export class SubscriptionModule { }
