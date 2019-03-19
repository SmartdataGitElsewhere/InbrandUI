import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NotificationService } from './library/core/services/notification-service/notification.service';
import { MembershipService, ApiService } from './library/core/coreservice-index';
import { AuthenticatedCompany } from './library/core/services/auth-service/auth-service.guard';
import {  ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlerService } from './library/core/services/error-handler/error-handler.service';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { MatTableModule, MatSortModule, MatNativeDateModule, MatDatepickerModule,
      MatFormFieldModule, MatInputModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDialogModule} from '@angular/material';
import {ProductService} from './modules/products/Service/product.service';
import { LoaderComponent } from './library/shared/components/loader/loader.component';
import { LoaderService } from './library/shared/services/loader.service';
import { ConfirmBoxComponent } from './library/shared/components/confirm-box/confirm-box.component';
import { ConfirmBoxService } from './library/shared/services/confirm-box.service';
import { MsgBoxComponent } from './library/shared/components/msg-box/msg-box.component';
import { MsgBoxService } from './library/shared/services/msg-box.service';
import { AuthGuardService } from './library/shared/services/auth-guard.service';
import { NgIdleKeepaliveModule } from "@ng-idle/keepalive";
import { SvInterceptorService } from './library/core/services/interceptor/interceptor.service';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { UserService } from './modules/subscription/services/user.service';
import { CommonModule } from '@angular/common';
import { CustomerService } from './modules/products/Service/customer.service';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { IpaddressService } from './modules/subscription/services/ipaddress.service';
import { BannedipComponent } from './library/shared/auth/bannedip/bannedip.component';
import { HttpModule } from '@angular/http';
@NgModule({

  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      enableHtml: true,
      tapToDismiss: true
    }),
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ModalModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    ReactiveFormsModule,
    DeviceDetectorModule.forRoot(),
    HttpModule
  ],
  declarations: [
    AppComponent,
    LoaderComponent,
    MsgBoxComponent,
    ConfirmBoxComponent,
    BannedipComponent
  ],
  providers: [ApiService, MembershipService, ErrorHandlerService, NotificationService, AuthGuardService, AuthenticatedCompany, LoaderService,
    MsgBoxService, ConfirmBoxService, ProductService,BsModalService,UserService,CustomerService,IpaddressService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SvInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
