import { Injectable } from '@angular/core';
import { User, ValidateUserModel } from '../view-models/user-model';
import { ApiService } from '../../../library/core/coreservice-index';
import { ApiParams } from '../../../library/core/services/api-service/view-models/api-params';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  params: ApiParams[] = [];
  para: ApiParams = {};
  ipAddress:any;
  access_key:any;
  take:any;

  constructor(private apiService: ApiService, private http: HttpClient) { }



  addNewUser(req: User) {
    return this.apiService.postData('/Subscriptions/CreateNewUser', req, null);
  }

  editUserDetails(req: User) {
    return this.apiService.postData('/Subscriptions/EditUserDetails', req, null);
  }

  getUserlist() {
    return this.apiService.getData('/Subscriptions/GetUserList', null);
  }

  validateUser(req: ValidateUserModel) {
    return this.apiService.postData('/Subscriptions/ValidateUser', req, null);
    // this.params = [];
    // this.para.Key = 'UserName';
    // this.para.Value = req;
    // this.params.push(this.para);
    // console.log(this.params);
    //return this.apiService.getData('/Subscriptions/ValidateUser', this.params);
  }

  validateIPAddress(res: string) {
    this.params = [];
    this.para.Key = 'ipaddress';
    this.para.Value = res;
    this.params.push(this.para);
    return this.apiService.getData('/Subscriptions/ValidateIPAddress', this.params);
  }

  deleteUser(res: string) {
    this.params = [];
    this.para.Key = 'UserId';
    this.para.Value = res;
    this.params.push(this.para);
    console.log(this.params);
    return this.apiService.deleteData('/Subscriptions/DeleteUser', this.params);
  }



  getIpAddress(ipAddress:any) {
    debugger;
    var apiroute1="http://api.ipstack.com/";
    var apiroute2=ipAddress;
    var apiroute3="?access_key=8191df8d1d7edab00d2c6454abf93e62";
    var fullapipath=apiroute1+apiroute2+apiroute3;
    
    return this.http.get(fullapipath).map(response => response);
    //.catch(this.handleError);
  }



}
interface ipdata {
  ip: string
}