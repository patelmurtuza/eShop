import { Injectable } from '@angular/core';
import { Http } from 'angular.component';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable()
export class DBService extends BaseService {

    constructor(public http: Http) {
        super(http);
    }

    public DeleteById(param: any, apicontroller: string): Observable<any> {
        return this.DeleteByURLParam(param, apicontroller, 'DeleteById');
    }

    public DeleteByEntity(param: any, apicontroller: string): Observable<any> {
        param.Flag = param.flag;
        return this.Delete(param, apicontroller, 'deleteentity');
    }

    public DeleteUserPrefernces(
        param: any,
        apicontroller: string
    ): Observable<any> {
        return this.Delete(param, apicontroller, 'DeleteUserPrefernces');
    }

    public InsertUpdateData(param: any, apicontroller: string): Observable<any> {
        return this.Post(param, apicontroller, '/insertupdate');
    }

    public SendSMS(param: any, apicontroller: string): Observable<any> {
        return this.Post(param, apicontroller, 'sendsms');
    }

    public SendEmail(param: any, apicontroller: string): Observable<any> {
        return this.Post(param, apicontroller, 'sendemail');
    }

    public PostData(
        param: any,
        apicontroller: string,
        actionname: string
    ): Observable<any> {
        return this.Post(param, apicontroller, actionname);
    }

    public SearchData(param: any, apicontroller: string): Observable<any> {
        return this.Get(param, apicontroller, 'search');
    }

    public SearchDataForDetail(
        param: any,
        apicontroller: string
    ): Observable<any> {
        return this.Get(param, apicontroller, 'detail/search');
    }

    public GetData(
        param: any,
        apicontroller: string,
        actionname: string
    ): Observable<any> {
        return this.Get(param, apicontroller, actionname);
    }

}
