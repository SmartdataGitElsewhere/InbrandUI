import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MembershipService } from '../../../../core/services/membership-service/membership.service';
import { NotificationService } from '../../../../core/coreservice-index';
import { Subscription } from 'rxjs/Subscription';
import { LoginModel } from '../../../viewmodels/login-model';
import { ROUTES } from '@angular/router/src/router_config_loader';
import { LoaderService } from '../../../services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../../modules/subscription/services/user.service';
import { ValidateUserModel } from '../../../../../modules/subscription/view-models/user-model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {


  loginForm: FormGroup;
  service: Subscription;
  loginModel: LoginModel = {};
  ipaddress : string;
  ipdata : any;
  validateusermodel : ValidateUserModel = {};

  constructor(
    private fb: FormBuilder,
    private router: Router, private activateRoute: ActivatedRoute,
    private membershipservice: MembershipService,
    private notificationservice: NotificationService,
    private loderservice: LoaderService,
    private toster : ToastrService,
    private userservice : UserService
  ) {
    localStorage.removeItem('token');
  }
  
  ngOnInit() {
    this.loderservice.Start();
    debugger;
      if(localStorage.getItem('ipstatus') != '1')
      {
        debugger
        this.validateIPAddress();
        localStorage.setItem('ipstatus','0');
      }
      else
      {
        this.loderservice.Stop();
        localStorage.setItem('ipstatus','0');
      }
    //this.loginModel.username = 'admin';
    //this.loginModel.password = 'aA123456!';
  }

  validateIPAddress()
  {
    debugger;
    this.userservice.validateIPAddress(localStorage.getItem('ipaddress')).subscribe(res => {
      debugger
      if(res.body.StatusCode == '400')
      {
         //this.router.navigate(['/bannedip']);
         this.router.navigate(['/login']);
         this.loderservice.Stop();
      }
      else
      {
        this.loderservice.Stop();
      }
    }, err => 
    {
        this.toster.error(err.error);
        this.loderservice.Stop();
    });
  }



  // createForm() {
  //   this.loginForm = this.fb.group({
  //     Username: ['rajukumar54321@smgmail.com', [Validators.required, Validators.email]],
  //     Password: ['123456', Validators.required]
  //   });
  // }

  doLogin() {
    debugger;
    this.loderservice.Start();
    this.loginModel.grant_type = 'password';
    const data = 'grant_type=password&username=' + this.loginModel.username + '&password=' + this.loginModel.password;
    localStorage.removeItem('token');
    this.service = this.membershipservice.login('/token', data).subscribe(res => {
      if (res) { 
        debugger;
        localStorage.setItem("token",res.body.access_token);
        this.validateusermodel.UserName = this.loginModel.username;
        //this.validateusermodel.IPAddress = this.ipaddress;
        this.userservice.validateUser(this.validateusermodel).subscribe(res => {
          debugger
          localStorage.setItem("IsadminRole", res.body.Isadmin);
          if(res.body.StatusCode == '400')
          {
            this.toster.error(res.body.Message);
            this.loderservice.Stop();
          }
          else
          {
            this.router.navigate(['/subscription']);
          }   
        }, err => 
        {
            this.toster.error(err.error);
            this.loderservice.Stop();
        });
    } 
    else {
        // this.notificationservice.Warning({ message: 'Invalid Username password', title: '' });
      }

    }, err => {  
      debugger;
      this.toster.error('Invalid Username Or Password');
      //this.notificationservice.Warning({ message: 'Invalid Username Or Password', title: 'Error' });
      this.loderservice.Stop();
     });
    // this.notificationservice.Success({ message: 'Logged In Successfully', title: '' });
    // 

    // this.router.navigate(['/subscription']);
  }
  ngOnDestroy(): void {
   // this.service.unsubscribe();
  }
}
