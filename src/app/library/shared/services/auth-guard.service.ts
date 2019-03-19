import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../../modules/subscription/services/user.service';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from './loader.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  ipaddress: string;
  ipAddress:any;
  ipdata: any;
  ipresponse: boolean = false;
  constructor(private router: Router, private userservice: UserService, private http: HttpClient, private loader : LoaderService) 
  { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    debugger;
    this.loader.Start();
    this.http.get<{ip:string}>('https://jsonip.com')
    .subscribe( data => {
      debugger;
      //console.log('th data', data);
      this.ipAddress = data.ip;  
      debugger;
      this.userservice.getIpAddress(this.ipAddress).subscribe(data => {
        debugger
        this.ipdata = data;
        this.ipaddress = this.ipdata.ip;      
        this.userservice.validateIPAddress(this.ipaddress).subscribe(res => {
          debugger;
          localStorage.setItem('ipaddress', this.ipaddress);
          localStorage.setItem('ipstatus','1');
          if (res.body.StatusCode == '400') {
            this.ipresponse = false;
            //this.router.navigate(['/bannedip']);
            this.router.navigate(['/login']);
            this.loader.Stop();
          }
          else {
            this.ipresponse = true;
            debugger;
            var token = localStorage.getItem('token');
            if (token != null) {
              return true;
            } else {
              this.router.navigate(['/login']);
            }
          }
        },
          err => {
            this.loader.Stop();
          });
      }, err1 => {
        this.loader.Stop();
        // this.http.get('https://jsonip.com')
        // .subscribe( data => {
        //   debugger
        //   this.ipdata = data;
        //   this.ipaddress = this.ipdata.ip;
        // })
      });
    })
    
    
    // if (this.ipresponse == true) {
    //   var token = localStorage.getItem('token');
    //   if (token != null) {
    //     return true;
    //   } else {
    //     this.router.navigate(['/login']);
    //   }
    // }
    debugger;
    var token = localStorage.getItem('token');
    //console.log('Token:',token);
    //var token = localStorage.getItem('business_token');
    if(token != null)
    {
      return true;
    }
    else
    {
    return false;
    }
  }

}
