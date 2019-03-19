import { Injectable } from '@angular/core';
import { ApiService } from '../../../library/core/coreservice-index';
import { ApiParams } from '../../../library/core/services/api-service/view-models/api-params';
import { IPAddress } from '../view-models/ipaddress-model';

@Injectable()
export class IpaddressService {

  params: ApiParams[] = [];
  para: ApiParams = {};
  constructor(private apiService: ApiService) { }

  getIPAddresslist() {
    return this.apiService.getData('/Subscriptions/GetIPAddressList', null);    
  }

  addNewIPAddress(req: IPAddress) {
    return this.apiService.postData('/Subscriptions/AddNewIPAddress', req, null);
  }

  editIPAddressDetails(req: IPAddress)
  {
    return this.apiService.postData('/Subscriptions/EditIPAddress', req, null);
  }

  deleteIPAddress(res: string) {
    this.params = [];
    this.para.Key = 'systemipid';
    this.para.Value = res;
    this.params.push(this.para);
    console.log(this.params);
    return this.apiService.deleteData('/Subscriptions/DeleteIPAddress', this.params);
  }

}
