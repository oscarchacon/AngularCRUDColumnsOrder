import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class BaseService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  protected baseApiUrl: string;

  constructor(protected http: HttpClient) {
    this.baseApiUrl = `${environment.baseUrl}/api`;
  }

  private log(message: string) {
    console.log(message);
  }

  protected get(endpoint: string, params?: any, reqOpts?: any, headers?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }
    if (headers) {
      reqOpts.headers = this.setHeaders(headers);
    }
    if (params) {
      reqOpts.params = this.setParams(params);
    }

    return this.http.get<any>(`${this.baseApiUrl}/${endpoint}`, reqOpts);
  }

  protected post(endpoint: string, body: any, headers?: any , params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {};
    }
    if (headers) {
      reqOpts.headers = this.setHeaders(headers);
    }
    if (params) {
      reqOpts.params = this.setParams(params);
    }
    return this.http.post(`${this.baseApiUrl}/${endpoint}`, body, reqOpts);
  }

  protected put(endpoint: string, body: any, headers?: any , params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {};
    }
    if (headers) {
      reqOpts.headers = this.setHeaders(headers);
    }
    if (params) {
      reqOpts.params = this.setParams(params);
    }
    return this.http.put(`${this.baseApiUrl}/${endpoint}`, body, reqOpts);
  }

  protected delete(endpoint: string, reqOpts?: any, headers?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }
    if (headers) {
      reqOpts.headers = this.setHeaders(headers);
    }
    return this.http.delete(`${this.baseApiUrl}/${endpoint}`, reqOpts);
  }

  protected patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(`${this.baseApiUrl}/${endpoint}`, body, reqOpts);
  }

  timezone(lat, lng) {
    // TODO: Cambiar Key para  google apis
    // tslint:disable-next-line: max-line-length
    return this.http.get('https://maps.googleapis.com/maps/api/timezone/json?location=' + lat + ',' + lng + '&timestamp=' + new Date().getTime() / 1000 + '&key=AIzaSyB3PlzlhobsZ8tXcr5gBx14uq348T-uKjM');
  }

  private setHeaders(headers: any): HttpHeaders {
    let headersReturn = this.httpOptions.headers;
    // tslint:disable-next-line: forin
    for (let k in headers) {
      headersReturn = headersReturn.set(k, String(headers[k]));
    }
    return headersReturn;
  }

  private setParams(params: any): HttpParams {
    let paramsReturn = new HttpParams();
    // tslint:disable-next-line: forin
    for (let k in params) {
      paramsReturn = paramsReturn.set(k, params[k]);
    }
    return paramsReturn;
  }
}
