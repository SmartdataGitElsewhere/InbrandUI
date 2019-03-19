import { Injectable } from '@angular/core';
import { ApiService } from '../../../library/core/coreservice-index';
import { SubscriptionSearch, SubscriptionFilter, MultipleDomain } from '../view-models/subscription-search';
import { ApiParams } from '../../../library/core/services/api-service/view-models/api-params';
import { forEach } from '@angular/router/src/utils/collection';
import { Http } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class SubscriptionService {
  params: ApiParams[] = [];
  para: ApiParams = {};
  constructor(private apiService: ApiService,private http: Http) { }

  getSubscriptionSearch(req: SubscriptionFilter) {
    debugger;
    req.nextBillDate = req.nextBillDate['year'] + '-' + req.nextBillDate['month'] + '-' + req.nextBillDate['day'];
    req.fromDate = req.fromDate['year'] + '-' + req.fromDate['month'] + '-' + req.fromDate['day'];
    req.toDate = req.toDate['year'] + '-' + req.toDate['month'] + '-' + req.toDate['day'];
    return this.apiService.postData('/Subscriptions/GetSubscriptionSearch', req, null);
  }
  getSubscriptions() {
    return this.apiService.getData('/Subscriptions/GetSubscriptions', null);    
  }
  addSubscriptions(req: SubscriptionSearch[]) {
    for (let i = 0 ; i < req.length ; i++) {
      req[i].nextBillDate = req[i].nextBillDate['year'] + '-' + req[i].nextBillDate['month'] + '-' + req[i].nextBillDate['day'];
    }
    return this.apiService.postData('/Subscriptions/PostSubscriptions', req, null);
  }
  updateSubscription(req: SubscriptionSearch) {
    req.nextBillDate = req.nextBillDate['year'] + '-' + req.nextBillDate['month'] + '-' + req.nextBillDate['day'];
    return this.apiService.putData('/Subscriptions/PutSubscription', req, null);
  }
  deleteSubscription(res: string) {
    this.params = [];
    this.para.Key = 'id';
    this.para.Value = res;
    this.params.push(this.para);
    console.log(this.params);
    return this.apiService.deleteData('/Subscriptions/DeleteSubscription', this.params);
  }

  getSubscriptionById(req: string) {
    debugger;
    this.params = [];
    this.para.Key = 'id';
    this.para.Value = req;
    this.params.push(this.para);
    console.log(this.params);
    return this.apiService.getData('/Subscriptions/GetSubscription', this.params);
  }
  generateInvoice(req: SubscriptionSearch[]) {
     return this.apiService.postData('/Subscriptions/PostGenerateInvoice', req, null);
  }

  validateSubscriptionById(req: MultipleDomain[]) {
    return this.apiService.postData('/Subscriptions/ValidateSubscriptionById', req, null);
  }

  deleteMultiple(req: SubscriptionSearch[]) {
    debugger;
    return this.apiService.postData('/Subscriptions/DeleteMultiple', req, null);
 }

 exportToExcel(req: SubscriptionFilter) {
  debugger;
   req.nextBillDate = req.nextBillDate['year'] + '-' + req.nextBillDate['month'] + '-' + req.nextBillDate['day'];
   req.fromDate = req.fromDate['year'] + '-' + req.fromDate['month'] + '-' + req.fromDate['day'];
   req.toDate = req.toDate['year'] + '-' + req.toDate['month'] + '-' + req.toDate['day'];
   return this.apiService.postData1('/Subscriptions/ExportToExcel', req, null);
  //  let headers = new Headers();
  //  headers.append('Content-Type', 'application/json');
  //   headers.append('authorization', localStorage.getItem('token'));
  // const headers = new Headers({
  //   'Content-Type': 'application/json',
  //   'Authorization': localStorage.getItem('token')
  // })
//   let headers: HttpHeaders = new HttpHeaders();
// headers = headers.append('Content-Type', 'application/json');
// headers = headers.append('Authorization', localStorage.getItem('token'));
//    debugger;
   
//        // this.http.AuthorizationHeader(headers);
//    return this.http.post('http://localhost:65224/Subscriptions/ExportToExcel', {body: req,responseType: Blob,headers: headers});
//    // return this.http.post('http://localhost:65224/Subscriptions/ExportToExcel', {body: req,responseType: Blob});
// //   this.http.post('http://localhost:65224/Subscriptions/ExportToExcel',
// // {observe: 'response', responseType: 'blob'}
// // );
// // this.http.post( 'http://localhost:65224/Subscriptions/ExportToExcel', {
// //   responseType: 'blob',body: req,
// // }).map((res) => {
// //   return res.blob;
// // })
}

getAllSubscriptionsToExcel() {
  debugger;
  return this.apiService.getData1('/Subscriptions/GetSubscriptionsToExcel', null);    
}

getProduct_Customer(req: string) {
  debugger;
  this.params = [];
  this.para.Key = 'domainname';
  this.para.Value = req;
  this.params.push(this.para);
  return this.apiService.getData('/Subscriptions/GetCustomerProduct', this.params);
}


// deleteSubscription(res: string) {
 
//   console.log(this.params);
//   return this.apiService.deleteData('/Subscriptions/DeleteSubscription', this.params);
// }

searchMultipleDomain(req) {
  return this.apiService.postData('/Subscriptions/SearchMultipleDomain', req, null);
}
searchMultipleDomainslist(req) {
  return this.apiService.postData('/Subscriptions/SearchMultipleDomainList', req, null);
}
}

