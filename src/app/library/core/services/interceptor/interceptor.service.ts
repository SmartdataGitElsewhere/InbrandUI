import { Injectable, Injector } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { MembershipService } from '../membership-service/membership.service';
import 'rxjs/add/operator/do';

@Injectable()
export class SvInterceptorService implements HttpInterceptor {
  membershipservice: MembershipService;

  constructor() {}
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request.headers.append('Content-Type', 'application/json');
    request.headers.append('If-Modified-Since', 'Mon, 26 Jul 1997 05:00:00 GMT');
    request.headers.append('Cache-Control', 'no-cache');
    request.headers.append('Pragma', 'no-cache');
    const token = localStorage.getItem('token');
    if( token != null){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ` + token
        }
        
      });
    } 
    return next.handle(request);
  }
}
