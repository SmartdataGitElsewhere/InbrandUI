import { ErrorHandler, Injectable } from '@angular/core';
import { StatusMessage, StatusCode } from '../../config/constants';
import { NotificationService } from '../../services/notification-service/notification.service';
import { debug } from 'util';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {
  constructor(private notificationservice: NotificationService) {}

  handleError(error) {
    switch (error) {
      case StatusCode.Unauthorized: {
        this.notificationservice.Warning({
          message: StatusMessage.Unauthorized,
          title: ''
        });
        break;
      }
      case StatusCode.BadRequest: {
        this.notificationservice.Warning({
          message: StatusMessage.BadRequest,
          title: ''
        });
        break;
      }
      case StatusCode.Forbidden: {
        this.notificationservice.Warning({
          message: StatusMessage.Forbidden,
          title: ''
        });
        break;
      }
      case StatusCode.InteralServerError: {
        this.notificationservice.Warning({
          message: StatusMessage.InteralServerError,
          title: ''
        });
        break;
      }
      case StatusCode.NotFound: {
        this.notificationservice.Warning({
          message: StatusMessage.NotFound,
          title: ''
        });
        break;
      }
      default: {
        this.notificationservice.Warning({
          message: error,
          title: ''
        });
      }
    }
  }
}
