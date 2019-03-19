import { Injectable } from '@angular/core';
import { ApiParams } from '../../../library/core/services/api-service/view-models/api-params';
import { ApiService } from '../../../library/core/coreservice-index';

@Injectable()
export class CustomerService {
  params: ApiParams[] = [];
  para: ApiParams = {};
  constructor(private apiService: ApiService) { }

  GetCustomerList(req: string) {
    debugger;
    this.params = [];
    this.para.Key = 'name';
    this.para.Value = req;
    this.params.push(this.para);
    console.log(this.params);
    return this.apiService.getData('/Subscriptions/GetCustomers', this.params);
  }

}
