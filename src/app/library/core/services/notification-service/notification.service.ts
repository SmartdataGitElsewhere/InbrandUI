import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NotificationService {
  constructor(private toastr: ToastrService) {
    this.toastr.toastrConfig.closeButton = true;
    this.toastr.toastrConfig.autoDismiss = true;
    this.toastr.toastrConfig.tapToDismiss = true;
  }

  Success(body: { message: string, title: string }) {
    return this.toastr.success(body.message, body.title);
  }

  Error(body: { message: string, title: string }) {
    return this.toastr.error(body.message, body.title);
  }

  Warning(body: { message: string, title: string }) {
    return this.toastr.warning(body.message, body.title);
  }

  Info(body: { message: string, title: string }) {
    return this.toastr.info(body.message, body.title);
  }

  closeAllToaster() {
    this.toastr.clear();
  }


}
