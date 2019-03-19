import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { CookieService } from 'ngx-cookie-service'
import { ApiService } from '../api-service/api.service';


import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MembershipService {


  private roleId = '';

  constructor(private apiservice: ApiService,
    // private cookie: CookieService,
    private router: Router) { }

  // login(url: string, body: {}) {
  //   debugger;
  //   // logic for login
  //   // return this.apiService.postData('/api/Subscriptions/PostSubscriptions', req, null);
  //   return this.apiservice.postData(url, body, null)
  //     .map((res) => {
  //       debugger;
  //       if (res.body.access_token) {
  //         this.saveToken(res.body.access_token);
  //         return res;
  //         // return this.getUserByName('api/Account/GetuserDetailsByUserName',body);
  //       } else {
  //         return null;
  //       }
  //     });
  // }

  login(url: string, body: {}) {
    debugger;
    // logic for login
    // return this.apiService.postData('/api/Subscriptions/PostSubscriptions', req, null);
    return this.apiservice.postData(url, body, null)
      .map((res) => {
        debugger;
        if (res.body.access_token) {
          this.saveToken(res.body.access_token);
          return res;
          // return this.getUserByName('api/Account/GetuserDetailsByUserName',body);
        } else {
          return null;
        }
      }).catch((error: any) => {
        debugger;
        return Observable.throw(new Error(error._body));
      });
  }

  logout() {
    this.router.navigate(['/auth']);
  }



  isLoggedIn(): boolean {
    return this.getToken() ? true : false;
  }


  saveToken(token: string) {
    debugger;
    localStorage.setItem('token', token);
  }
  getToken(): string {
    debugger;
    return localStorage.getItem('token');
  }

  //   private setUserCookie(data: MembershipModel) {
  //   this.cookie.set('token', data.token);
  //   this.cookie.se`t('userId', data.userId);
  //   for (let i = 0; i < data.roleId.length; i++) {
  //     this.roleId = this.roleId + ',' + data.roleId[i];
  //   }
  //   this.cookie.set('roleId', this.roleId.substr(1));
  //   this.cookie.set('countryId', '');
  // }

  setCookie(key: string, value: string) {
    // this.cookie.set(key, value);
  }
}
