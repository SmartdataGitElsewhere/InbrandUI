import { Injectable } from '@angular/core';
import {ApiService} from '../../../library/core/coreservice-index';
import { ApiParams } from '../../../library/core/services/api-service/view-models/api-params';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class ProductService {
  params: ApiParams[] = [];
  para: ApiParams = {};
  constructor(private apiService: ApiService) { }

  GetProduct(req: string) {
    debugger
    this.params = [];
    this.para.Key = 'articleid';
    this.para.Value = req;
    this.params.push(this.para);
    console.log(this.params);
    return this.apiService.getData('/Subscriptions/GetArticles', this.params);
  }

}
