import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export abstract class BaseService {
  endPointBaseurl: string;
  headers: Headers;
  options: RequestOptions;
  originUrl: string;
  constructor(public http: Http) {
    this.endPointBaseurl = environment.eshopURL;
  }

  protected Get(param: any, apicontroller: string, actionname: string): Observable<any> {
    const params: URLSearchParams = new URLSearchParams();
    for (const key in param) {
      if (param.hasOwnProperty(key)) {
        const val = param[key];
        params.set(key, val);
      }
    }
    const loginSuccessObject = localStorage.getItem('loginSuccessObject') ? JSON.parse(localStorage.getItem('loginSuccessObject')) : null;
    this.headers = new Headers({
      'Content-Type': 'application/json',
      accessToken: loginSuccessObject.data.accessToken
    });
    this.options = new RequestOptions({
      headers: this.headers,
      search: params
    });
    return this.http
      .get(this.endPointBaseurl + apicontroller + '/' + actionname, this.options)
      .pipe(catchError(err => this.handleError('Get - ' + apicontroller + '/' + actionname, err)));
  }

  protected GetBlob(param: any, apicontroller: string, actionname: string): Observable<any> {
    const params: URLSearchParams = new URLSearchParams();
    for (const key in param) {
      if (param.hasOwnProperty(key)) {
        const val = param[key];
        params.set(key, val);
      }
    }
    this.options = new RequestOptions({
      headers: this.headers,
      search: params,
      responseType: 3
    });
    return this.http
      .get(this.endPointBaseurl + apicontroller + '/' + actionname, this.options)
      .pipe(catchError(err => this.handleError('Getblob - ' + apicontroller + '/' + actionname, err)));
  }

  protected Post(param: any, apicontroller: string, actionname: string): Observable<any> {
    const bodyVal = JSON.stringify(param);
    const loginSuccessObject = localStorage.getItem('loginSuccessObject') ? JSON.parse(localStorage.getItem('loginSuccessObject')) : null;
    this.headers = new Headers({
      'Content-Type': 'application/json',
      accessToken: loginSuccessObject.data.accessToken
    });
    this.options = new RequestOptions({ headers: this.headers, body: bodyVal });
    return this.http
      .post(this.endPointBaseurl + apicontroller + actionname, bodyVal, this.options)
      .pipe(catchError(err => this.handleError('Post - ' + apicontroller + '/' + actionname, err)));
  }

  protected Delete(param: any, apicontroller: string, actionname: string): Observable<any> {
    const loginSuccessObject = localStorage.getItem('loginSuccessObject') ? JSON.parse(localStorage.getItem('loginSuccessObject')) : null;
    this.headers = new Headers({
      'Content-Type': 'application/json',
      accessToken: loginSuccessObject.data.accessToken
    });
    const bodyval = JSON.stringify(param);
    this.options = new RequestOptions({ headers: this.headers, body: bodyval });
    return this.http
      .delete(this.endPointBaseurl + apicontroller + '/' + actionname, this.options)
      .pipe(catchError(err => this.handleError('Delete - ' + apicontroller + '/' + actionname, err)));
  }

  protected DeleteByURLParam(param: any, apicontroller: string, actionname: string): Observable<any> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('objectsToBeDeleted', param);
    this.options = new RequestOptions({
      headers: this.headers,
      search: params
    });
    return this.http
      .delete(this.endPointBaseurl + apicontroller + '/' + actionname, this.options)
      .pipe(catchError(err => this.handleError('Delete data by url param', err)));
  }

  protected GetJSON(fileURL: string): Observable<any> {
    return this.http.get(fileURL).pipe(catchError(err => this.handleError('JSON data error', err)));
  }

  protected handleError(MethodName: string, error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = error.body || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.log(error + MethodName + ' \nPlease contact Administrator \n');
    return Observable.throw('Something went wrong in \n' + MethodName + '  method \n Please contact Administrator \n');
  }
}
