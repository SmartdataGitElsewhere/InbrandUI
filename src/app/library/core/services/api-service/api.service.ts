import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../../environments/environment';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

import { ApiParams } from '../api-service/view-models/api-params';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { debug } from 'util';


@Injectable()
export class ApiService {

  constructor(private http: HttpClient, private errorhandler: ErrorHandlerService) { }

  // common get method for all http requests
  getData(url: string, reqAPIParams: ApiParams[] | null): Observable<any> {
    let newHTTPParams = new HttpParams();
    if (reqAPIParams != null) {
      reqAPIParams.forEach(element => {
        newHTTPParams = newHTTPParams.append(element.Key, element.Value);
      });
    }
    return this.http.get<any>(this.getUrl(url), { params: newHTTPParams, observe: 'response' }).catch(this.handleError);
  }

  getData1(url: string, reqAPIParams: ApiParams[] | null): Observable<any> {
    let newHTTPParams = new HttpParams();
    if (reqAPIParams != null) {
      reqAPIParams.forEach(element => {
        newHTTPParams = newHTTPParams.append(element.Key, element.Value);
      });
    }
    return this.http.get(this.getUrl(url), { params: newHTTPParams, observe: 'response',responseType:'blob' }).catch(this.handleError);
  }

  // common post method for all http requests
   postData(url: string, data: any, reqAPIParams: ApiParams[]): Observable<any> {
     debugger;
    let newHTTPParams = new HttpParams();
    if (reqAPIParams != null) {
      reqAPIParams.forEach(element => {
        newHTTPParams = newHTTPParams.append(element.Key, element.Value);
      });
    }
    return this.http.post<any>(this.getUrl(url), data, { params: newHTTPParams, observe: 'response' }).catch(this.handleError);
  }

  postData1(url: string, data: any, reqAPIParams: ApiParams[]): Observable<any> {
    debugger;
   let newHTTPParams = new HttpParams();
   if (reqAPIParams != null) {
     reqAPIParams.forEach(element => {
       newHTTPParams = newHTTPParams.append(element.Key, element.Value);
     });
   }
   return this.http.post(this.getUrl(url), data, { params: newHTTPParams, observe: 'response',responseType:'blob' }).catch(this.handleError);
 }


  deleteData(url: string, reqAPIParams: ApiParams[] | null): Observable<any> {
    let httpParmas = new HttpParams();
    if (reqAPIParams != null) {
      reqAPIParams.forEach( el => { httpParmas = httpParmas.append(el.Key, el.Value); });
    }
    return this.http.delete<any>(this.getUrl(url), {params: httpParmas, observe: 'response'}).catch(this.handleError);
  }
  putData(url: string, data: any, reqAPIParams: ApiParams[]): Observable<any> {
    let newHTTPParams = new HttpParams();
    if (reqAPIParams != null) {
      reqAPIParams.forEach(element => {
        newHTTPParams = newHTTPParams.append(element.Key, element.Value);
      });
    }
    return this.http.post<any>(this.getUrl(url), data, { params: newHTTPParams, observe: 'response' }).catch(this.handleError);
  }

  // common error handling method
  public handleError = (error: Response) => {
    // Do messaging and error handling here

    console.log(error);
    // this.errorhandler.handleError(error.status);
    return Observable.throw(error);
  }

  // attach base url
  private getUrl(url: string): string {
    return environment.baseUrl + url;
  }

  // getToken(): string {
  //   const token = this.cookie.check('token') ? this.cookie.get('token') : null;
  //   return token;
  // }
}

