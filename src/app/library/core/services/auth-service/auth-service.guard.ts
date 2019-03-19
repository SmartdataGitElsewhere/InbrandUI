import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MembershipService } from '../membership-service/membership.service';


@Injectable()
export class AuthenticatedCompany implements CanActivate {

  constructor(private membershipservice: MembershipService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      debugger;
      var token =localStorage.getItem('token');
      debugger
      if (token != null) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }

  }
}


